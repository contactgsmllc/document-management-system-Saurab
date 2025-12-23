import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Building2, X } from "lucide-react";
import api from "../../api/axios";

const UserModal = ({ open, onClose, user, onSuccess }) => {
  const isEdit = Boolean(user);

  const [form, setForm] = useState({
  email: "",
  password: "",
  companyId: "",
  firstName: "",
  middleName: "",
  lastName: "",
});


  useEffect(() => {
    if (user) {
     setForm({
  email: user.email,
  password: "",
  companyId: user.company?.id || "",
  firstName: user.firstName || "",
  middleName: user.middleName || "",
  lastName: user.lastName || "",
});

    }
  }, [user]);

  const [companies, setCompanies] = useState([]);
const [loadingCompanies, setLoadingCompanies] = useState(false);
useEffect(() => {
  if (!open) return;

  setLoadingCompanies(true);
  api.get("/users/companies/list")
    .then(res => setCompanies(res.data))
    .finally(() => setLoadingCompanies(false));
}, [open]);

  const handleSubmit = async () => {
    if (!form.email || !form.companyId || !form.firstName || !form.lastName) {
  return alert("Please fill all required fields");
}


    try {
      if (isEdit) {
        await api.put(`/admin/users/${user.id}`, {
  email: form.email,
  companyId: Number(form.companyId),
  firstName: form.firstName,
  middleName: form.middleName || null,
  lastName: form.lastName,
  ...(form.password && { password: form.password }),
});

      } else {
        await api.post(`/admin/users`, {
  email: form.email,
  password: form.password,
  companyId: Number(form.companyId),
  firstName: form.firstName,
  middleName: form.middleName || null,
  lastName: form.lastName,
});

      }

      onSuccess();
      onClose();
    } catch {
      alert("Failed to save user");
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-md shadow-2xl transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-xl text-gray-800">
              {isEdit ? "Edit User" : "Add User"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors duration-200 group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* First Name */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    First Name *
  </label>
  <input
    placeholder="First name"
    value={form.firstName}
    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
</div>

{/* Middle Name */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Middle Name (optional)
  </label>
  <input
    placeholder="Middle name"
    value={form.middleName}
    onChange={(e) => setForm({ ...form, middleName: e.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
</div>

{/* Last Name */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Last Name *
  </label>
  <input
    placeholder="Last name"
    value={form.lastName}
    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
  />
</div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEdit ? "New Password " : "Password *"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder={isEdit ? "New Password " : "Password"}
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={form.companyId}
                onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">Select company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-gray-50 rounded-b-xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserModal;