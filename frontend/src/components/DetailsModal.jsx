import React from "react";
import { X, User, Building2, Mail, MapPin, Phone, Calendar, CheckCircle, XCircle } from "lucide-react";

const DetailsModal = ({
  open,
  onClose,
  type, // "user" | "company"
  loading,
  data,
}) => {
  if (!open) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {type === "user" ? (
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={20} />
              </div>
            ) : (
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="text-blue-600" size={20} />
              </div>
            )}
            <h3 className="text-lg font-semibold text-blue-900">
              {type === "user" ? "User Details" : "Company Details"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto mb-3"></div>
              <p>Loading details...</p>
            </div>
          ) : type === "user" && data ? (
            <div className="space-y-4">
              {/* User Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  User Information
                </h4>
                
                <div className="flex items-start gap-3">
                  <Mail className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{data.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm font-medium text-gray-900">{data.role?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {data.approved ? (
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                  ) : (
                    <XCircle className="text-yellow-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Approval Status</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        data.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {data.approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              {data.company && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Company Information
                  </h4>
                  
                  <div className="flex items-start gap-3">
                    <Building2 className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="text-xs text-gray-500">Company Name</p>
                      <p className="text-sm font-medium text-gray-900">{data.company.name || "N/A"}</p>
                    </div>
                  </div>

                  {data.company.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm font-medium text-gray-900">{data.company.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : type === "company" && data ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Company Name</p>
                    <p className="text-sm font-medium text-gray-900">{data.name || "N/A"}</p>
                  </div>
                </div>

                {data.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{data.address}</p>
                    </div>
                  </div>
                )}

                {data.state && (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">State</p>
                      <p className="text-sm font-medium text-gray-900">{data.state}</p>
                    </div>
                  </div>
                )}

                {data.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{data.email}</p>
                    </div>
                  </div>
                )}

                {data.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{data.phone}</p>
                    </div>
                  </div>
                )}

                {data.createdAt && (
                  <div className="flex items-start gap-3">
                    <Calendar className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Created At</p>
                      <p className="text-sm font-medium text-gray-900">{formatDate(data.createdAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;