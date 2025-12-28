import { Building2, FileText, LogOut, Menu, UserPlus, Users, X } from "lucide-react";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  pendingCount,
  isOpen,
  toggleSidebar,
  currentUser
}) => {
  const menuItems = [
    {
      id: "users",
      label: "All Users",
      icon: Users,
    },
    {
      id: "pending",
      label: "Pending Users",
      icon: UserPlus,
      badge: pendingCount,
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2,
    },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        /*className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg"
      >*/
       className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          /*className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"*/
          className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-black bg-opacity-50 z-30"

        />
      )}

      {/* Sidebar */}
      <aside
        /*className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${*/
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-blue-900">
            {currentUser?.firstName ? `Hi ${currentUser.firstName}` : "Admin Panel"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
            {currentUser?.email || "Manage your files"}
            </p>
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
                    // Close sidebar on mobile after selection
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
    </>
  );
};

export default AdminSidebar;
