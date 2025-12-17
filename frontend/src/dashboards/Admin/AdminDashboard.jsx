import DocumentManager from "../../components/DocumentManager.jsx";
import DetailsModal from "../../components/DetailsModal";

import api from "../../api/axios.js";
import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  UserPlus,
  PlusCircle,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  LogOut,
  Menu,
  X,
  FileText,
  Hash,
  MapPin,
  Phone,
  User,
  Mail,
  Calendar,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userFilter, setUserFilter] = useState({ company: "", email: "" });
  const [pendingFilter, setPendingFilter] = useState({
    company: "",
    email: "",
  });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsType, setDetailsType] = useState(""); // "user" | "company"
  const [detailsData, setDetailsData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const itemsPerPage = 10;

  const userRole = localStorage.getItem("role");
const companyId = localStorage.getItem("companyId");


  // Add status === "ACTIVE" filter as per instructions
  const activeUsers = users.filter((user) => user.status === "ACTIVE");
  const activePendingUsers = pendingUsers.filter(
    (user) => user.status === "ACTIVE"
  );
  const activeCompanies = companies.filter(
    (company) => company.status === "ACTIVE"
  );

  const showUserDetails = async (userId) => {
    setDetailsType("user");
    setDetailsOpen(true);
    setDetailsLoading(true);

    try {
      const { data } = await api.get(`/admin/users/${userId}`);
      setDetailsData(data);
    } catch (err) {
      alert("Failed to load user details");
      setDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  const showCompanyDetails = async (companyId) => {
    setDetailsType("company");
    setDetailsOpen(true);
    setDetailsLoading(true);

    try {
      const { data } = await api.get(`/admin/companies/${companyId}`);
      setDetailsData(data);
    } catch (err) {
      alert("Failed to load company details");
      setDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  const [companyForm, setCompanyForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contact_person: "",
    email: "",
    phone: "",
    einNumber: "",
  });

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    companyId: "",
  });

  useEffect(() => {
    fetchCompanies();
    fetchUsers();
    fetchPendingUsers();
  }, []);

  // Adjust page when data or tab changes
  useEffect(() => {
    const items =
      activeTab === "users"
        ? activeUsers
        : activeTab === "pending"
        ? activePendingUsers
        : activeTab === "companies"
        ? activeCompanies
        : [];
    const total = Math.ceil(items.length / itemsPerPage);
    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }
  }, [
    users,
    pendingUsers,
    companies,
    activeTab,
    currentPage,
    userFilter,
    pendingFilter,
  ]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/users/companies");
      setCompanies(data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch companies");
        console.error("Fetch companies error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/users");
      setUsers(data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch users");
        console.error("Fetch users error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/users/pending");
      setPendingUsers(data);
    } catch (error) {
      console.error("Fetch pending users error:", error);
      alert("Failed to fetch pending users");
    } finally {
      setLoading(false);
    }
  };

  const isUserPending = (userId) =>
    activePendingUsers.some((u) => u.id === userId);

  const createCompany = async () => {
    if (!companyForm.name.trim()) return alert("Company name is required");

    try {
      await api.post("/admin/companies", {
        name: companyForm.name.trim(),
        address: companyForm.address.trim(),
        city: companyForm.city.trim(),
        state: companyForm.state.trim(),
        zipCode: companyForm.zipCode.trim(),
        contact_person: companyForm.contact_person.trim(),
        email: companyForm.email.trim(),
        phone: companyForm.phone.trim(),
        einNumber: companyForm.einNumber.trim(),
      });

      setCompanyForm({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        contact_person: "",
        email: "",
        phone: "",
        einNumber: "",
      });
      setShowModal(false);
      await fetchCompanies();
      alert("Company created successfully!");
    } catch (error) {
      alert(
        "Failed to create company: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const createUser = async () => {
    if (
      !userForm.email.trim() ||
      !userForm.password.trim() ||
      !userForm.companyId
    ) {
      return alert("Please fill all fields");
    }

    try {
      await api.post("/admin/users", {
        email: userForm.email.trim(),
        password: userForm.password.trim(),
        companyId: parseInt(userForm.companyId),
      });

      setUserForm({ email: "", password: "", companyId: "" });
      setShowModal(false);
      await Promise.all([fetchUsers(), fetchPendingUsers()]);
      alert("User created successfully!");
    } catch (error) {
      alert("Failed to create user");
      console.error(error);
    }
  };

  const toggleApproval = async (userId, approve) => {
    const confirmMsg = approve
      ? "Are you sure you want to approve this user?"
      : "Are you sure you want to disapprove this user and send them back to pending?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await api.put(`/admin/users/${userId}/approve`, null, {
        params: { approve },
      });
      await Promise.all([fetchUsers(), fetchPendingUsers()]);
      alert(
        approve
          ? "User approved successfully!"
          : "User disapproved and moved to pending!"
      );
    } catch (error) {
      alert(
        "Failed to update approval status: " +
          (error.response?.data?.message || "")
      );
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      await Promise.all([fetchUsers(), fetchPendingUsers()]);
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const deleteCompany = async (companyId) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      await api.delete(`/admin/companies/${companyId}`);
      await fetchCompanies();
      alert("Company deleted successfully!");
    } catch (error) {
      alert("Failed to delete company");
    }
  };

  const updateCompany = async () => {
    if (!companyForm.name.trim()) return alert("Company name is required");

    try {
      await api.put(`/admin/companies/${selectedItem.id}`, {
        name: companyForm.name.trim(),
      });
      setShowModal(false);
      await fetchCompanies();
      alert("Company updated successfully!");
    } catch (error) {
      alert("Failed to update company");
    }
  };

  const updateUser = async () => {
    if (!userForm.email.trim()) return alert("Email is required");
    if (!userForm.companyId) return alert("Please select a company");

    const payload = {
      email: userForm.email.trim(),
      companyId: parseInt(userForm.companyId),
    };
    if (userForm.password?.trim()) payload.password = userForm.password.trim();

    try {
      await api.put(`/admin/users/${selectedItem.id}`, payload);
      closeModal();
      await Promise.all([fetchUsers(), fetchPendingUsers()]);
      alert("User updated successfully!");
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    if (type === "editCompany" && item) {
      setCompanyForm({ ...companyForm, name: item.name });
    } else if ((type === "createUser" || type === "editUser") && item) {
      setUserForm({
        email: item.email,
        password: "",
        companyId: item.company?.id || "",
      });
    } else if (type === "createUser") {
      setUserForm({ email: "", password: "", companyId: "" });
    } else if (type === "createCompany") {
      setCompanyForm({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        contact_person: "",
        email: "",
        phone: "",
        einNumber: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedItem(null);
    setCompanyForm({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contact_person: "",
      email: "",
      phone: "",
      einNumber: "",
    });
    setUserForm({ email: "", password: "", companyId: "" });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
  };

  const paginate = (items) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = (items) => Math.ceil(items.length / itemsPerPage);

  const filterUsers = (userList, filter) => {
    return userList.filter((user) => {
      const matchesCompany = filter.company
        ? user.company?.id?.toString() === filter.company
        : true;
      const matchesEmail = filter.email
        ? user.email.toLowerCase().includes(filter.email.toLowerCase())
        : true;
      return matchesCompany && matchesEmail;
    });
  };

  const getFilteredUsers = () => filterUsers(activeUsers, userFilter);
  const getFilteredPendingUsers = () =>
    filterUsers(activePendingUsers, pendingFilter);

  const getCurrentItems = () => {
    if (activeTab === "users") return getFilteredUsers();
    if (activeTab === "pending") return getFilteredPendingUsers();
    if (activeTab === "companies") return activeCompanies;
    return [];
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { id: "users", label: "All Users", icon: Users },
    {
      id: "pending",
      label: "Pending Users",
      icon: UserPlus,
      badge: activePendingUsers.length,
    },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-blue-900">Admin Panel</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your system</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setCurrentPage(1);
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        isActive
                          ? "bg-white text-blue-900"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 ml-16 lg:ml-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
              {activeTab === "users" && "All Users"}
              {activeTab === "pending" && "Pending Users"}
              {activeTab === "companies" && "Companies"}
              {activeTab === "documents" && "Documents"}
            </h1>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Add Button */}
          <div className="mb-4 flex justify-end">
            {activeTab === "companies" && (
              <button
                onClick={() => openModal("createCompany")}
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors"
              >
                <PlusCircle size={18} /> <span>Add Company</span>
              </button>
            )}

            {(activeTab === "users" || activeTab === "pending") && (
              <button
                onClick={() => openModal("createUser")}
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors"
              >
                <UserPlus size={18} /> <span>Add User</span>
              </button>
            )}
          </div>

          {/* Filter Section */}
          {(activeTab === "users" || activeTab === "pending") && (
            <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Filter by Company
                  </label>
                  <select
                    value={
                      activeTab === "users"
                        ? userFilter.company
                        : pendingFilter.company
                    }
                    onChange={(e) =>
                      activeTab === "users"
                        ? setUserFilter({
                            ...userFilter,
                            company: e.target.value,
                          })
                        : setPendingFilter({
                            ...pendingFilter,
                            company: e.target.value,
                          })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">All Companies</option>
                    {activeCompanies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Filter by Email
                  </label>
                  <input
                    type="text"
                    placeholder="Search email..."
                    value={
                      activeTab === "users"
                        ? userFilter.email
                        : pendingFilter.email
                    }
                    onChange={(e) =>
                      activeTab === "users"
                        ? setUserFilter({
                            ...userFilter,
                            email: e.target.value,
                          })
                        : setPendingFilter({
                            ...pendingFilter,
                            email: e.target.value,
                          })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>
              {((activeTab === "users" &&
                (userFilter.company || userFilter.email)) ||
                (activeTab === "pending" &&
                  (pendingFilter.company || pendingFilter.email))) && (
                <button
                  onClick={() =>
                    activeTab === "users"
                      ? setUserFilter({ company: "", email: "" })
                      : setPendingFilter({ company: "", email: "" })
                  }
                  className="mt-3 text-xs text-blue-900 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {/* Users Tab */}
                {activeTab === "users" && (
                  <div className="overflow-x-auto">
                    {activeUsers.length === 0 ? (
                      <div className="p-12 text-center text-gray-500">
                        No users found
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Email
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Company
                            </th>
                            <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Status
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {paginate(getFilteredUsers()).map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 sm:px-6 py-4">
                                <button
                                  onClick={() => showUserDetails(user.id)}
                                  className="text-sm font-medium text-blue-700 hover:underline cursor-pointer"
                                >
                                  {user.email}
                                </button>

                                <div className="sm:hidden text-xs text-gray-500 mt-1">
                                  {user.company?.name}
                                </div>
                              </td>
                              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                                {user.company?.name}
                              </td>
                              <td className="hidden sm:table-cell px-6 py-4">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    isUserPending(user.id)
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {isUserPending(user.id)
                                    ? "Pending"
                                    : "Approved"}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-right ">
                                <div className="flex justify-end gap-4 ">
                                  <button
                                    onClick={() =>
                                      toggleApproval(
                                        user.id,
                                        isUserPending(user.id) ? true : false
                                      )
                                    }
                                    className={
                                      isUserPending(user.id)
                                        ? "text-green-600 hover:text-green-800"
                                        : "text-orange-600 hover:text-orange-800"
                                    }
                                    title={
                                      isUserPending(user.id)
                                        ? "Approve user"
                                        : "Disapprove user"
                                    }
                                  >
                                    {isUserPending(user.id) ? (
                                      <CheckCircle size={16} />
                                    ) : (
                                      <XCircle size={16} />
                                    )}
                                  </button>

                                  <button
                                    onClick={() => openModal("editUser", user)}
                                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete user"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Pending Tab */}
                {activeTab === "pending" && (
                  <div className="overflow-x-auto">
                    {activePendingUsers.length === 0 ? (
                      <div className="p-12 text-center text-gray-500">
                        No pending users
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Email
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Company
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {paginate(getFilteredPendingUsers()).map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 sm:px-6 py-4">
                                <button
                                  onClick={() => showUserDetails(user.id)}
                                  className="text-sm font-medium text-blue-700 hover:underline cursor-pointer"
                                >
                                  {user.email}
                                </button>

                                <div className="md:hidden text-xs text-gray-500 mt-1">
                                  {user.company?.name}
                                </div>
                              </td>
                              <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                                {user.company?.name}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() =>
                                      toggleApproval(user.id, true)
                                    }
                                    className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200"
                                  >
                                    <CheckCircle size={14} />{" "}
                                    <span>Approve</span>
                                  </button>
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                                  >
                                    <Trash2 size={14} /> <span>Reject</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Companies Tab */}
                {activeTab === "companies" && (
                  <div className="overflow-x-auto">
                    {activeCompanies.length === 0 ? (
                      <div className="p-12 text-center text-gray-500">
                        No companies found
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 sm:px-8 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                              Company Name
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {paginate(activeCompanies).map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50">
                              <td className="pl-8 py-4">
                                <button
                                  onClick={() => showCompanyDetails(company.id)}
                                  className="text-sm font-medium text-blue-700 hover:underline cursor-pointer"
                                >
                                  {company.name || "N/A"}
                                </button>
                              </td>

                              <td className="px-4 sm:px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() =>
                                      openModal("editCompany", company)
                                    }
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => deleteCompany(company.id)}
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
                    )}
                  </div>
                )}
                {activeTab === "documents" && (
                  <div>
                    <DocumentManager role={userRole} companyId={companyId} />
                  </div>
                )}

                {/* Pagination */}
                {getCurrentItems().length > itemsPerPage && (
                  <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages(getCurrentItems())}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(
                            totalPages(getCurrentItems()),
                            currentPage + 1
                          )
                        )
                      }
                      disabled={currentPage === totalPages(getCurrentItems())}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-blue-900">
                {modalType === "createCompany" && "Add New Company"}
                {modalType === "editCompany" && "Edit Company"}
                {modalType === "createUser" && "Add User"}
                {modalType === "editUser" && "Edit User"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {(modalType === "createCompany" ||
                modalType === "editCompany") && (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                  {/* Basic Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-blue-100 rounded">
                        <Building2 className="text-blue-600" size={14} />
                      </div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Basic Information
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={companyForm.name}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                          placeholder="Enter company name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          EIN Number
                        </label>
                        <div className="relative">
                          <Hash
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="text"
                            value={companyForm.einNumber}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                einNumber: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                            placeholder="12-3456789"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-green-100 rounded">
                        <MapPin className="text-green-600" size={14} />
                      </div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Address Details
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={companyForm.address}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                          placeholder="124 Flower Street"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            City
                          </label>
                          <input
                            type="text"
                            value={companyForm.city}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                            placeholder="San Francisco"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            State
                          </label>
                          <input
                            type="text"
                            value={companyForm.state}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                state: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors uppercase text-sm"
                            placeholder="CA"
                            maxLength="2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          value={companyForm.zipCode}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                          placeholder="95105"
                          maxLength="10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-purple-100 rounded">
                        <User className="text-purple-600" size={14} />
                      </div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Contact Information
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Contact Person
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="text"
                            value={companyForm.contact_person}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                contact_person: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                            placeholder="Kim John"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="email"
                            value={companyForm.email}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                            placeholder="contact@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="tel"
                            value={companyForm.phone}
                            onChange={(e) =>
                              setCompanyForm({
                                ...companyForm,
                                phone: e.target.value,
                              })
                            }
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors text-sm"
                            placeholder="+1-415-555-1234"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(modalType === "createUser" || modalType === "editUser") && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password{" "}
                      {modalType === "editUser" &&
                        "(leave blank to keep current)"}
                      {modalType === "createUser" && "(required)"}
                    </label>
                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder={
                        modalType === "editUser"
                          ? "Leave blank to keep current"
                          : "Enter password"
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <select
                      value={userForm.companyId}
                      onChange={(e) =>
                        setUserForm({ ...userForm, companyId: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="">Select a company</option>
                      {activeCompanies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modalType === "createCompany") createCompany();
                  else if (modalType === "editCompany") updateCompany();
                  else if (modalType === "createUser") createUser();
                  else if (modalType === "editUser") updateUser();
                }}
                className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-gray-800"
              >
                {modalType.startsWith("create") ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        type={detailsType}
        loading={detailsLoading}
        data={detailsData}
      />
    </div>
  );
};

export default AdminDashboard;
