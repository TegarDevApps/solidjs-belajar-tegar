import { createMemo, createSignal } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "blog", label: "Blog", path: "/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
    { id: "about", label: "About", path: "/about", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { id: "todolist", label: "Todolist", path: "/todolist", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },  
];


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed());
  };

  const activeItem = createMemo(() => {
    const currentPath = location.pathname;
    const foundItem = menuItems.find(item => currentPath.startsWith(item.path));
    return foundItem ? foundItem.id : "";
  });

  const handleNavigation = (item: MenuItem) => {
    navigate(item.path);
  };

  return (
    <aside 
      class={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed() ? "w-16" : "w-64"
      }`}
    >
      <div class="h-full flex flex-col">
        <div class="h-16 flex items-center px-4 border-b border-gray-200">
          <div class={`flex items-center ${isCollapsed() ? "justify-center" : "space-x-2"}`}>
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span class="text-white font-bold">B</span>
              </div>
            </div>
            {!isCollapsed() && (
              <div class="flex-1">
                <h1 class="text-xl font-bold text-blue-600">Bloginfo.</h1>
              </div>
            )}
          </div>
          <button 
            onClick={toggleCollapse} 
            class="ml-auto rounded-md hover:bg-gray-100 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isCollapsed() ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto py-4">
          <div class="px-3 mb-6">
            <h2 class={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${isCollapsed() ? "text-center" : ""}`}>
              {!isCollapsed() ? "General" : ""}
            </h2>
            <nav class="mt-3 space-y-1">
              {menuItems.map((item) => (
                <button
                    onClick={() => handleNavigation(item)}
                    class={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                    activeItem() === item.id
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    } ${isCollapsed() ? "justify-center" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={`h-5 w-5 ${
                      activeItem() === item.id ? "text-blue-500" : "text-gray-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d={item.icon}
                    />
                  </svg>
                  {!isCollapsed() && <span class="ml-3">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200">
          <button
            class={`flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 ${
              isCollapsed() ? "justify-center" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {!isCollapsed() && <span class="ml-3">Log out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;