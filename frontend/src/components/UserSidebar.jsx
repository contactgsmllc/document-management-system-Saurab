import React from "react";
import { Upload, Folder, LogOut, X, Menu } from "lucide-react";

export default function Sidebar({ 
  sidebarOpen, 
  toggleSidebar, 
  activeTab, 
  setActiveTab, 
  handleLogout,
  currentUser,
  companyName,
}) {
  const menuItems = [
    { id: "documents", label: "My Documents", icon: Folder },
    { id: "upload", label: "Upload Files", icon: Upload },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}

      className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg">

        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>





      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
         
         className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-30"

        />
      )}

      {/* Sidebar */}
      <aside
       
      
  className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 w-64`}
     >

        <div className="flex flex-col h-full">
          {/* Header */}
        
          <div className="p-6 border-b border-gray-200">
  <h2 className="text-lg font-bold text-blue-900">
    {currentUser?.firstName
      ? `${currentUser.firstName} ${currentUser?.lastName || ""}`
      : "User"}
  </h2>

  <p className="text-sm text-gray-600 mt-1">
    {currentUser?.email || ""}
  </p>

  <p className="text-xs text-blue-700 font-medium mt-1">
    {companyName || "No Company Assigned"}
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
}