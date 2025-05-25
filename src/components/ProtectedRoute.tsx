import type { Component } from 'solid-js';
import { onMount, createSignal, Show, onCleanup } from 'solid-js';
import { Navigate } from '@solidjs/router';
import { isAuthenticated, getAuthState } from '../utils/auth';

interface ProtectedRouteProps {
  component: Component;
}

const ProtectedRoute: Component<ProtectedRouteProps> = (props) => {
  const [loading, setLoading] = createSignal(true);
  const [authenticated, setAuthenticated] = createSignal(false);

  // Check auth state periodically
  const checkAuthState = () => {
    const authState = getAuthState();
    setAuthenticated(authState.isAuthenticated);
    setLoading(false);
  };

  onMount(() => {
    checkAuthState();
    
    const interval = setInterval(checkAuthState, 5000);
    
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
            <p class="mt-4 text-gray-600">Verifying access...</p>
          </div>
        </div>
      }
    >
      <Show 
        when={authenticated() && isAuthenticated()} 
        fallback={<Navigate href="/login" />}
      >
        <props.component />
      </Show>
    </Show>
  );
};

export default ProtectedRoute;