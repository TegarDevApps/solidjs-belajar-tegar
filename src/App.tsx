import { lazy, Suspense } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import { onMount, createSignal, Show } from 'solid-js';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import Blog from './pages/Blog';
// import About from './pages/About';
// import Todolist from './pages/todolis/Todolist';
// import ProtectedRoute from './components/ProtectedRoute';
// import { GuestRoute } from './components/GuestRoute';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Todolist = lazy(() => import('./pages/todolis/Todolist'));
const GuestRoute = lazy(() => import('./components/GuestRoute'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));


import { isAuthenticated, initializeAuth } from './utils/auth';

export default function App() {
  const [loading, setLoading] = createSignal(true);
  const [authInitialized, setAuthInitialized] = createSignal(false);

  onMount(async () => {
    try {
      // Initialize auth state on app start
      await initializeAuth();
      setAuthInitialized(true);
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setAuthInitialized(true); // Still set to true to show the app
    } finally {
      setLoading(false);
    }
  });

  return (
    <Show
      when={!loading() && authInitialized()}
      fallback={
        <div class="min-h-screen flex items-center justify-center bg-gray-50">
          <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-6 text-lg text-gray-600">Initializing application...</p>
            <p class="mt-2 text-sm text-gray-500">Please wait a moment</p>
          </div>
        </div>
      }
    >
      {/* Bungkus router dengan Suspense untuk loading fallback saat lazy loading */}
      <Suspense fallback={<div>Loading page...</div>}>
        <Router>
          <Route
            path="/"
            component={() =>
              isAuthenticated() ? <Navigate href="/dashboard" /> : <Navigate href="/login" />
            }
          />
          <Route path="/login" component={() => <GuestRoute component={Login} />} />
          <Route path="/register" component={() => <GuestRoute component={Register} />} />
          <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
          <Route path="/todolist" component={() => <ProtectedRoute component={Todolist} />} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
          <Route
            path="*"
            component={() => (
              <div class="min-h-screen flex items-center justify-center bg-gray-50">
                <div class="text-center">
                  <h1 class="text-6xl font-bold text-gray-300">404</h1>
                  <p class="text-xl text-gray-600 mt-4">Page not found</p>
                  <div class="mt-6">
                    <a
                      href={isAuthenticated() ? '/dashboard' : '/login'}
                      class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      {isAuthenticated() ? 'Go to Dashboard' : 'Go to Login'}
                    </a>
                  </div>
                </div>
              </div>
            )}
          />
        </Router>
      </Suspense>
    </Show>
  );
}