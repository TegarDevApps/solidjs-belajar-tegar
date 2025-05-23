import type { Component } from 'solid-js';
import { onMount, createSignal, Show, onCleanup } from 'solid-js';
import { Navigate } from '@solidjs/router';
import { isAuthenticated, getAuthState } from '../utils/auth';

interface GuestRouteProps {
  component: Component;
}

const GuestRoute: Component<GuestRouteProps> = (props) => {
  const [loading, setLoading] = createSignal(true);
  const [authenticated, setAuthenticated] = createSignal(false);

  // Check auth state periodically
  const checkAuthState = () => {
    const authState = getAuthState();
    setAuthenticated(authState.isAuthenticated);
    setLoading(false);
  };

  onMount(() => {
    // Initial check
    checkAuthState();
    
    // Set up periodic check (optional)
    const interval = setInterval(checkAuthState, 5000); // Check every 5 seconds
    
    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <Show 
      when={!loading()} 
      fallback={
        <div class="min-h-screen flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      }
    >
      <Show 
        when={!authenticated() && !isAuthenticated()} 
        fallback={<Navigate href="/dashboard" />}
      >
        <props.component />
      </Show>
    </Show>
  );
};

export { GuestRoute };
export default GuestRoute;