import DetailsModal from "../../components/DetailsModal";
import DocumentManager from "../../components/DocumentManager.jsx";
import CompanyModal from "../../components/modals/CompanyModal.jsx";
import UserModal from "../../components/modals/UserModal.jsx";

import {
  Building2,
  CheckCircle,
  Edit2,
  FileText,
  LogOut,
  Menu,
  PlusCircle,
  Trash2,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

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
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const itemsPerPage = 10;

  const userRole = localStorage.getItem("role");
  const companyId = localStorage.getItem("companyId");

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

  useEffect(() => {
    fetchCompanies();
    fetchUsers();
    fetchPendingUsers();
  }, []);

  // Adjust page when data or tab changes
  useEffect(() => {
    const items =
      activeTab === "users"
        ? users
        : activeTab === "pending"
        ? pendingUsers
        : activeTab === "companies"
        ? companies
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
      const { data } = await api.get("/admin/companies/list");
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
      const { data } = await api.get("/admin/users");
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

  const isUserPending = (userId) => pendingUsers.some((u) => u.id === userId);

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

  const toggleStatus = async ({ type, id, isActive }) => {
    const confirmMsg = isActive
      ? "Are you sure you want to deactivate this?"
      : "Are you sure you want to activate this?";

    if (!window.confirm(confirmMsg)) return;

    try {
      if (type === "user") {
        if (isActive) {
          await api.delete(`/admin/users/${id}`);
        } else {
          await api.put(`/admin/users/${id}/reactivate`);
        }
        await Promise.all([fetchUsers(), fetchPendingUsers()]);
      }

      if (type === "company") {
        if (isActive) {
          await api.delete(`/admin/companies/${id}/permanent`);
        } else {
          await api.put(`/admin/companies/${id}/reactivate`);
        }
        await fetchCompanies();
      }

      alert(isActive ? "Deactivated successfully" : "Activated successfully");
    } catch (error) {
      alert("Failed to update status");
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${userId}/permanent`);
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
      await api.delete(`/admin/companies/${companyId}/permanent`);
      await fetchCompanies();
      alert("Company deleted successfully!");
    } catch (error) {
      alert("Failed to delete company");
    }
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

  const getFilteredUsers = () => filterUsers(users, userFilter);
  const getFilteredPendingUsers = () =>
    filterUsers(pendingUsers, pendingFilter);

  const getCurrentItems = () => {
    if (activeTab === "users") return getFilteredUsers();
    if (activeTab === "pending") return getFilteredPendingUsers();
    if (activeTab === "companies") return companies;
    return [];
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { id: "users", label: "All Users", icon: Users },
    {
      id: "pending",
      label: "Pending Users",
      icon: UserPlus,
      badge: pendingUsers.length,
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
                onClick={() => {
                  setEditingCompanyId(null);
                  setCompanyModalOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm transition-colors"
              >
                <PlusCircle size={18} /> <span>Add Company</span>
              </button>
            )}

            {(activeTab === "users" || activeTab === "pending") && (
              <button
                onClick={() => {
                  setEditingUser(null);
                  setUserModalOpen(true);
                }}
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
                    {companies.map((company) => (
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
                    {users.length === 0 ? (
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
                                      toggleStatus({
                                        type: "user",
                                        id: user.id,
                                        isActive: user.status === "ACTIVE",
                                      })
                                    }
                                    className={`px-2 py-1 text-xs rounded-full font-medium transition-colors cursor-pointer ${
                                      user.status === "ACTIVE"
                                        ? "bg-green-200 text-green-700 hover:bg-green-200"
                                        : "bg-red-200 text-red-500 hover:bg-gray-300"
                                    }`}
                                    title={
                                      user.status === "ACTIVE"
                                        ? "Deactivate"
                                        : "Activate"
                                    }
                                  >
                                    {user.status === "ACTIVE"
                                      ? "Active"
                                      : "Inactive"}
                                  </button>

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
                                    onClick={() => {
                                      setEditingUser(user);
                                      setUserModalOpen(true);
                                    }}
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
                    {pendingUsers.length === 0 ? (
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
                    {companies.length === 0 ? (
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
                          {paginate(companies).map((company) => (
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
                                      toggleStatus({
                                        type: "company",
                                        id: company.id,
                                        isActive: company.status === "ACTIVE",
                                      })
                                    }
                                    className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                                      company.status === "ACTIVE"
                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    }`}
                                    title={
                                      company.status === "ACTIVE"
                                        ? "Deactivate company"
                                        : "Activate company"
                                    }
                                  >
                                    {company.status === "ACTIVE"
                                      ? "Active"
                                      : "Inactive"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingCompanyId(company.id);
                                      setCompanyModalOpen(true);
                                    }}
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
      <CompanyModal
        open={companyModalOpen}
        companyId={editingCompanyId}
        onClose={() => setCompanyModalOpen(false)}
        onSuccess={fetchCompanies}
      />

      <UserModal
        open={userModalOpen}
        user={editingUser}
        companies={companies}
        onClose={() => setUserModalOpen(false)}
        onSuccess={() => {
          fetchUsers();
          fetchPendingUsers();
        }}
      />

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
