// components/LoginForm.tsx
import { createSignal, Show } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { setAuthenticated } from '../utils/auth';

interface LoginFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const [rememberMe, setRememberMe] = createSignal(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email() || !password() || (!props.isLogin && !username())) {
      setError('Semua field harus diisi!');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email())) {
      setError('Format email tidak valid!');
      setLoading(false);
      return;
    }

    // Password validation for registration
    if (!props.isLogin && password().length < 6) {
      setError('Password minimal 6 karakter!');
      setLoading(false);
      return;
    }

    const endpoint = props.isLogin ? '/api/login' : '/api/register';
    const payload = props.isLogin 
      ? { email: email(), password: password() }
      : { username: username(), email: email(), password: password() };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `${props.isLogin ? 'Login' : 'Registrasi'} gagal`);
      }

      // Set authentication state
      const user = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      };
      
      setAuthenticated(user, data.token);

      // Show success message
      const action = props.isLogin ? 'Login' : 'Registrasi';
      alert(`${action} berhasil! Selamat datang, ${user.username}`);

      // Navigate to dashboard
      navigate('/dashboard');

    } catch (err: any) {
      setError(err.message || `Terjadi kesalahan saat ${props.isLogin ? 'login' : 'registrasi'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-1">
        {props.isLogin ? 'Welcome Back!' : 'Ayo Bergabung 🎉'}
      </h2>
      <p class="text-sm text-gray-500 text-center mb-6">
        {props.isLogin
          ? 'We missed you! Please enter your details.'
          : 'Daftar untuk mulai pengalaman baru'}
      </p>

      <form onSubmit={handleSubmit} class="space-y-4">
        <Show when={!props.isLogin}>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username()}
              onInput={(e) => setUsername(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading()}
            />
          </div>
        </Show>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading()}
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              type={showPassword() ? "text" : "password"}
              placeholder={props.isLogin ? "Enter Password" : "Create a password"}
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              disabled={loading()}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword())}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              disabled={loading()}
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPassword() ? (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <Show when={props.isLogin}>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe()}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading()}
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>
        </Show>

        {error() && (
          <div class="bg-red-50 border border-red-200 rounded-md p-3">
            <p class="text-red-600 text-sm">{error()}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading()}
          class={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {loading() ? (
            <div class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {props.isLogin ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : (
            props.isLogin ? 'Sign in' : 'Create account'
          )}
        </button>
        
        <Show when={props.isLogin}>
          <div class="relative flex py-3 items-center">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="flex-shrink mx-4 text-sm text-gray-500">Sign in with</span>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
          
        </Show>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        {props.isLogin ? "Don't have an account?" : "Sudah punya akun?"}{' '}
        <A
          href={props.isLogin ? "/register" : "/login"}
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          {props.isLogin ? 'Sign up' : 'Login di sini'}
        </A>
      </p>
    </>
  );
};

export default LoginForm;