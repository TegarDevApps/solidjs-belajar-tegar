// components/Header.tsx
import { createSignal, Show } from "solid-js";
import { getUser, logout } from "../utils/auth";

const Header = () => {
  const [notifications, setNotifications] = createSignal(5);
  const [showDropdown, setShowDropdown] = createSignal(false);
  
  const user = getUser();
  
  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      logout();
    }
  };

  return (
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Search Section */}
        <div class="flex-1 max-w-md">
          <div class="relative">
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

        {/* Right Section - Notifications & User */}
        <div class="ml-4 flex items-center space-x-4">
          {/* Notifications */}
          <div class="relative">
            <button class="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <Show when={notifications() > 0}>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {notifications() > 9 ? '9+' : notifications()}
                </span>
              </Show>
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div class="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown())}
              class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* Avatar */}
              <div class="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
              
              {/* User Info */}
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900">
                  {user?.username || 'Guest'}
                </p>
                <p class="text-xs text-gray-500">
                  {user?.email || 'guest@example.com'}
                </p>
              </div>
              
              {/* Chevron */}
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <Show when={showDropdown()}>
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div class="px-4 py-2 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{user?.username || 'Guest'}</p>
                  <p class="text-xs text-gray-500">{user?.email || 'guest@example.com'}</p>
                </div>
                
                <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div class="flex items-center">
                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </div>
                </a>
                
                <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div class="flex items-center">
                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </div>
                </a>
                
                <div class="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <div class="flex items-center">
                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            </Show>
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      <Show when={showDropdown()}>
        <div 
          class="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      </Show>
    </header>
  );
};

export default Header;