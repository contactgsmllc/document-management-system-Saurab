import {
  Calendar,
  Download,
  Eye,
  FileText,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";

export default function DocumentManager({ role, companyId, companies: companiesProp = [] }) {
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState(companiesProp);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(companyId);

  const companiesFetchedRef = useRef(false);
  const usersFetchedRef = useRef(false);
  const lastSelectedCompanyRef = useRef(null);
  const companiesFetchingRef = useRef(false);
  const usersFetchingRef = useRef(false);

  const token = localStorage.getItem("authToken");

  const authHeaders = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  // Initialize companies from prop or fetch if needed (only once)
  useEffect(() => {
    if (companiesProp && companiesProp.length > 0) {
      // Companies provided as prop, use them and mark as fetched
      setCompanies(companiesProp);
      companiesFetchedRef.current = true;
      companiesFetchingRef.current = false;
    } else if (role !== "USER" && !companiesFetchedRef.current && !companiesFetchingRef.current) {
      // No prop provided and not fetched/fetching yet, fetch now
      companiesFetchingRef.current = true;
      fetchCompanies();
    }
  }, [companiesProp, role]);

  // Fetch documents when company changes
  useEffect(() => {
    if (selectedCompany && selectedCompany !== lastSelectedCompanyRef.current) {
      fetchDocuments();
      lastSelectedCompanyRef.current = selectedCompany;
    }
  }, [selectedCompany]);

  // Fetch users only once
  useEffect(() => {
    if (role !== "USER" && !usersFetchedRef.current && !usersFetchingRef.current) {
      usersFetchingRef.current = true;
      fetchUsers();
    }
  }, [role]);
  // Helper to get user email by ID
  const getUserEmail = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.email : `${id}`;
  };

  // Helper to get file type
  const getFileType = (filename = "") => {
    const ext = filename.split(".").pop().toLowerCase();
    return ext;
  };

  const isPreviewSupported = (filename) => {
    const ext = getFileType(filename);
    return ["pdf", "png", "jpg", "jpeg", "gif", "webp"].includes(ext);
  };

  // Fetch all users (admin endpoint only)
  const fetchUsers = async () => {
    // Double check to prevent race conditions
    if (usersFetchedRef.current || usersFetchingRef.current) return;
    
    usersFetchingRef.current = true;
    
    try {
      const res = await api.get("/admin/users/list");
      setUsers(res.data);
      usersFetchedRef.current = true;
    } catch (error) {
      console.error("Failed to fetch users", error);
      usersFetchedRef.current = false; // Reset on error so it can retry
    } finally {
      usersFetchingRef.current = false;
    }
  };

  // Fetch companies (only if not provided as prop)
  const fetchCompanies = async () => {
    // Double check to prevent race conditions
    if (companiesFetchedRef.current || companiesFetchingRef.current) return;
    if (companiesProp && companiesProp.length > 0) return; // Don't fetch if prop exists
    
    companiesFetchingRef.current = true;
    
    try {
      const { data } = await api.get("/admin/companies/list");
      setCompanies(data);
      companiesFetchedRef.current = true;
    } catch (error) {
      console.error("Failed to fetch companies", error);
      companiesFetchedRef.current = false; // Reset on error so it can retry
    } finally {
      companiesFetchingRef.current = false;
    }
  };

  // Fetch documents for selected company
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/admin/companies/${selectedCompany}/documents`
      );

      // No complex normalization needed anymore!
      // Just ensure fallback if somehow missing (defensive)
      const normalizedDocs = data.map((doc) => ({
        ...doc,
        status: doc.status || "ACTIVE", // safe fallback
      }));

      setDocuments(normalizedDocs);
    } catch (error) {
      console.error("Failed to fetch documents", error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  // Upload files
  const uploadFile = async (files) => {
    if (!files.length) return;
    if (!selectedCompany) {
      alert("Please select a company first");
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);

        await api.post(`/admin/companies/${selectedCompany}/documents`, form);
      }

      fetchDocuments();

      alert("Documents uploaded successfully!");
    } catch (error) {
      alert("Failed to upload documents");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  // Delete document
  const deleteDoc = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      await api.delete(
        `/admin/companies/${selectedCompany}/documents/${id}/permanent`
      );

      setDocuments((docs) => docs.filter((doc) => doc.id !== id));
      alert("Document deleted successfully!");
    } catch (error) {
      alert("Failed to delete document");
      console.error("Delete document error:", error);
    }
  };

  // Toggle document active / inactive
  const toggleDocumentStatus = async (doc) => {
    if (!doc.status) {
      console.error("Document status unknown, cannot toggle:", doc);
      return;
    }

    try {
      let updatedDoc = { ...doc };

      if (doc.status === "ACTIVE") {
        // Soft delete → make INACTIVE
        await api.delete(
          `/admin/companies/${selectedCompany}/documents/${doc.id}`
        );
        updatedDoc.status = "INACTIVE";
      } else {
        // Reactivate → make ACTIVE
        await api.put(
          `/admin/companies/${selectedCompany}/documents/${doc.id}/reactivate`
        );
        updatedDoc.status = "ACTIVE";
      }

      // Update UI after successful backend response
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? updatedDoc : d))
      );
    } catch (error) {
      console.error("Failed to toggle document status", error);
      alert("Failed to update document status");
    }
  };

  // Preview document
 

const previewDoc = async (doc) => {
  if (!isPreviewSupported(doc.filename)) {
    alert("Preview is only available for PDF and image files.");
    return;
  }

  try {
    const res = await api.get(
      `/admin/companies/${selectedCompany}/documents/${doc.id}`,
      { responseType: "blob" }
    );

    const url = URL.createObjectURL(res.data);
    setPreview({ url, name: doc.filename });
  } catch (error) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      alert(
        error.response?.data?.message ||
        "You are not allowed to preview this document"
      );
      return; // ⛔ STOP here — do NOT logout
    }

    alert("Failed to preview document");
    console.error("Preview document error:", error);
  }
};


  // Download document
  const downloadDoc = async (doc) => {
    try {
      const res = await api.get(
        `/admin/companies/${selectedCompany}/documents/${doc.id}`,
        {
          responseType: "blob", // Very important for file downloads
        }
      );

      const url = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.filename;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download document");
      console.error("Download document error:", error);
    }
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format file size in human-readable form
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  // Filter documents based on searchEmail
  const filteredDocuments = documents.filter((doc) => {
    if (!searchEmail) return true;
    const userEmail = getUserEmail(doc.uploadedBy).toLowerCase();
    return userEmail.includes(searchEmail.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Company Selection & Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="w-full sm:w-auto">
            {role !== "USER" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Company
                </label>
                <div className="relative">
                  <select
                    className="w-full sm:w-[200px] px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm bg-white appearance-none cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
                    value={selectedCompany || ""}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-500">
                      Choose a company...
                    </option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id} className="py-2">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <label className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 text-sm transition-colors cursor-pointer">
              <Upload size={18} />
              <span>Choose Files</span>
              <input
                type="file"
                multiple
                onChange={(e) => uploadFile(Array.from(e.target.files))}
                className="hidden"
                disabled={!selectedCompany || uploading}
              />
            </label>
          </div>
        </div>

        {/* Filter by Uploader */}
        <div className="w-full sm:w-[250px] mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Uploader
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm"
            />
            {searchEmail && (
              <button
                onClick={() => setSearchEmail("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {uploading && (
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm font-medium">Uploading documents...</span>
          </div>
        )}
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2
              className="animate-spin mx-auto mb-3 text-gray-400"
              size={32}
            />
            <p className="text-gray-500">Loading documents...</p>
          </div>
        ) : !selectedCompany ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="mx-auto mb-3 text-gray-300" size={48} />
            <p>Please select a company to view documents</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="mx-auto mb-3 text-gray-300" size={48} />
            {searchEmail ? (
              <>
                <p>No documents found matching "{searchEmail}"</p>
                <button
                  onClick={() => setSearchEmail("")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filter
                </button>
              </>
            ) : (
              <>
                <p>No documents found</p>
                <p className="text-sm mt-1">Upload documents to get started</p>
              </>
            )}
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="mx-auto mb-3 text-gray-300" size={48} />
            <p>No documents found</p>
            <p className="text-sm mt-1">Upload documents to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Document Name
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Size
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Upload Date
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Uploaded By
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText
                          className="text-blue-600 shrink-0"
                          size={20}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {doc.filename}
                          </div>
                          <div className="md:hidden text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(
                              doc.uploadDate || doc.uploadedAt || doc.createdAt
                            )}
                          </div>
                          <div className="md:hidden text-xs text-gray-500 mt-0.5">
                            {formatFileSize(doc.size)}
                          </div>
                          {doc.uploadedBy && (
                            <div className="lg:hidden text-xs text-gray-500 mt-0.5">
                              By: {getUserEmail(doc.uploadedBy)}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {formatFileSize(doc.size)}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                      {formatDate(
                        doc.uploadDate || doc.uploadedAt || doc.createdAt
                      )}
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-600">
                      {getUserEmail(doc.uploadedBy)}
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        {/* Active / Inactive Toggle */}
                        <button
                          onClick={() => toggleDocumentStatus(doc)}
                          className={`px-2 py-1 text-xs rounded-full font-medium transition-colors
      ${
        doc.status === "ACTIVE"
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
                          title={
                            doc.status === "ACTIVE" ? "Deactivate" : "Activate"
                          }
                        >
                          {doc.status === "ACTIVE" ? "Active" : "Inactive"}
                        </button>

                        <button
                          onClick={() => previewDoc(doc)}
                          disabled={!isPreviewSupported(doc.filename)}
                          className={`p-1 rounded transition-colors
    ${
      isPreviewSupported(doc.filename)
        ? "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        : "text-gray-300 cursor-not-allowed"
    }`}
                          title={
                            isPreviewSupported(doc.filename)
                              ? "Preview"
                              : "Preview not supported"
                          }
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => downloadDoc(doc)}
                          className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full h-full sm:w-[95vw] sm:h-[95vh] flex flex-col">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900 truncate pr-4">
                {preview.name}
              </h3>
              <button
                onClick={() => {
                  URL.revokeObjectURL(preview.url);
                  setPreview(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-1 hover:bg-gray-100 rounded"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-2 sm:p-4">
              {getFileType(preview.name) === "pdf" ? (
                <iframe
                  src={preview.url}
                  className="w-full h-full border-0 rounded"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="max-w-full max-h-full mx-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
