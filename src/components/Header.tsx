import { createSignal } from "solid-js";

const Header = () => {
  const [notifications, setNotifications] = createSignal(5);
  
  return (
    <header class="bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div class="flex-1">
          <div class="relative max-w-md">
            <input
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div class="absolute left-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="ml-4 flex items-center">
          <div class="relative">
            <button class="flex items-center focus:outline-none">
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications() > 0 && (
                  <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications()}
                  </span>
                )}
              </div>
            </button>
          </div>
          <div class="ml-4">
            <button class="flex items-center focus:outline-none">
              <img
                class="h-8 w-8 rounded-full object-cover"
                src="/profile-avatar.jpg"  
                alt="User profile"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/dummy.jpg";
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;