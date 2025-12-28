import React, { useEffect, useState, useCallback, useRef } from "react";
import api from "../../api/axios.js";
import DashboardNavbar from "../../components/DashboardNavbar.jsx";

import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Folder,
  X,
  Loader2,
  User,
} from "lucide-react";
import Sidebar from "../../components/UserSidebar";

const formatDateTime = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
};

const getFileIcon = (contentType) => {
  if (contentType?.includes("pdf"))
    return <FileText className="w-5 h-5 text-red-500" />;
  if (contentType?.includes("image"))
    return <FileText className="w-5 h-5 text-blue-500" />;
  if (contentType?.includes("excel") || contentType?.includes("sheet"))
    return <FileText className="w-5 h-5 text-green-500" />;
  if (contentType?.includes("word") || contentType?.includes("document"))
    return <FileText className="w-5 h-5 text-blue-600" />;
  return <FileText className="w-5 h-5 text-gray-500" />;
};

//  Main Component

export default function UserDashboard() {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");
  const [currentUser, setCurrentUser] = useState(null);
  const lastFetchedTabRef = useRef(null);
  const isFetchingRef = useRef(false);



 


  // Get companyId and userId from stored userData
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const companyId = userData.companyId;
  const userId = userData.userId;

  // Fetch current user details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userId) {
        try {
          const { data } = await api.get(`/users/${userId}`);
          setCurrentUser(data);
        } catch (error) {
          console.error("Failed to fetch current user:", error);
        }
      }
    };
    fetchCurrentUser();
  }, [userId]);

  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    if (!companyId) return;
    
    // Prevent concurrent/duplicate calls
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    if (!uploading) {
      setLoading(true);
    }
    setError("");

    try {
      const response = await api.get(
        `/users/companies/${companyId}/documents`
      );

      if (response.data && Array.isArray(response.data)) {
       let mappedData = response.data.map((doc) => ({
        id: doc.id,
        filename: doc.filename,
         size: doc.size,
         contentType: doc.contentType,
        uploadedBy: doc.uploadedByUserId || doc.user || "Unknown",
          uploadedAt: doc.uploadedAt,
           status: doc.status, 
             }));
               



        mappedData.sort((a, b) => {
          const dateA = new Date(a.uploadedAt).getTime();
          const dateB = new Date(b.uploadedAt).getTime();
          return dateB - dateA;
        });

        setDocuments(mappedData);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (err.response?.status === 403) {
        setError("Access denied. You don't have permission.");
      } else {
        setError(err.response?.data?.message || "Failed to load documents");
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [companyId, uploading]);


  useEffect(() => {
    // Only fetch if we haven't already fetched for this tab/company combination
    if (activeTab === "documents" && companyId) {
      const fetchKey = `${activeTab}-${companyId}`;
      if (lastFetchedTabRef.current !== fetchKey) {
        lastFetchedTabRef.current = fetchKey;
        fetchDocuments();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, companyId]);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0 || !companyId) return;

    setUploading(true);
    setError("");

    try {
      const uploadPromises = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        uploadPromises.push(
          api.post(`/users/companies/${companyId}/documents`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );
      }

      await Promise.all(uploadPromises);
      await fetchDocuments();
      setActiveTab("documents");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

const toggleDocumentStatus = async (doc) => {
  try {
    if (doc.status === "ACTIVE") {
      // Soft delete sets status to INACTIVE
      await api.delete(`/users/companies/${companyId}/documents/${doc.id}`);
      // Update state locally instead of refetching
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id ? { ...d, status: "INACTIVE" } : d
        )
      );
    } else {
      // Reactivate document
      await api.put(`/users/companies/${companyId}/documents/${doc.id}/reactivate`);
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id ? { ...d, status: "ACTIVE" } : d
        )
      );
    }
  } catch (err) {
    console.error("Toggle failed", err);
    setError("Failed to update document status");
  }
};



  const deleteDocument = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    setError("");
    try {
      await api.delete(`/users/companies/${companyId}/documents/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const previewDocument = async (doc) => {
    setPreviewLoading(true);
    setPreview({
      name: doc.filename || doc.name || "Document",
      url: null,
      type: null,
    });
    setError("");

    try {
      const response = await api.get(
        `/users/companies/${companyId}/documents/${doc.id}`,
        {
          responseType: "blob",
        }
      );
      const blob = response.data;
      const fileType =
        blob.type || doc.contentType || "application/octet-stream";
      const url = URL.createObjectURL(blob);

      setPreview({
        name: doc.filename || doc.name || "Document",
        url: url,
        type: fileType,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Preview failed");
      setPreview(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const downloadDocument = async (doc) => {
    setError("");
    try {
      const response = await api.get(
        `/users/companies/${companyId}/documents/${doc.id}`,
        {
          responseType: "blob",
        }
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.filename || doc.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Download failed");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
 





  return (
    <div className="min-h-screen bg-gray-50 flex">
          <DashboardNavbar />
        

      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
       /* mobileMenuOpen={mobileOpen}*/
        currentUser={currentUser}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 ml-16 lg:ml-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
              {activeTab === "documents" && "My Documents"}
              {activeTab === "upload" && "Upload Files"}
            </h1>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={() => setError("")}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Documents
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Drag and drop files here, or click to browse
                  </p>

                  <label className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 mr-2" />
                    <span className="font-medium">Browse Files</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      onClick={(e) => (e.target.value = null)}
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.txt,.csv,.zip"
                    />
                  </label>

                  <p className="text-xs text-gray-500 mt-4">
                    Max file size: 50MB • Supported: PDF, Images, Office files,
                    TXT, CSV, ZIP
                  </p>
                </div>

                {uploading && (
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-3" />
                    <span className="text-blue-700 font-medium">
                      Uploading files...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              {loading ? (
                <div className="p-12 text-center text-gray-500">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                  <p>Loading documents...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No documents found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Upload your first document to get started
                  </p>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Upload Documents
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          File Name
                        </th>
                        <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Size
                        </th>
                        <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Uploaded By
                        </th>
                        <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                          Date
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {documents.map((doc) => (
                       <tr key={doc.id} className="hover:bg-gray-50">
  <td className="px-4 sm:px-6 py-4">
    <div className="flex items-center gap-3">
      {getFileIcon(doc.contentType)}
      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
        {doc.filename}
      </div>
    </div>
  </td>

  <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
    {formatFileSize(doc.size)}
  </td>

  <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-600">
    {doc.uploadedBy}
  </td>

  <td className="hidden sm:table-cell px-6 py-4 text-xs text-gray-600">
    {formatDateTime(doc.uploadedAt)}
  </td>

  <td className="px-4 sm:px-6 py-4 text-right">
    <div className="flex justify-end gap-2 items-center">
      <button
        onClick={() => previewDocument(doc)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={() => downloadDocument(doc)}
        className="text-green-600 hover:text-green-800"
      >
        <Download size={16} />
      </button>

<button
  onClick={() => toggleDocumentStatus(doc)}
  className={`px-3 py-1 rounded-full text-xs font-semibold  ${
    doc.status === "ACTIVE"
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-red-100 text-red-800 border-red-400"
  }`}
>
  {doc.status === "ACTIVE" ? "Active" : "Inactive"}
</button>



      <button
        onClick={() => deleteDocument(doc.id)}
        className="text-red-600 hover:text-red-800"
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
          )}
        </div>
      </main>
      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 truncate">
                {preview.name}
              </h3>
              <div className="flex gap-2">
                {!previewLoading && (
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = preview.url;
                      link.download = preview.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-gray-800 text-sm flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}

                <button
                  onClick={() => {
                    if (preview.url) URL.revokeObjectURL(preview.url);
                    setPreview(null);
                  }}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>

            <div className="p-4 max-h-[70vh] overflow-auto">
              {previewLoading || !preview.url ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Preparing preview...</p>
                </div>
              ) : (
                <>
                  {preview.type === "application/pdf" ? (
                    <iframe
                      src={preview.url}
                      title={preview.name}
                      className="w-full h-[65vh] border-0"
                    />
                  ) : preview.type.startsWith("image/") ? (
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="max-w-full max-h-[65vh] mx-auto"
                    />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">
                        Preview not available for this file type
                      </p>
                      <a
                        href={preview.url}
                        download={preview.name}
                        className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-gray-800 inline-flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download File
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
