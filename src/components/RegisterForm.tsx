import { createSignal, Show } from 'solid-js';

const RegisterForm = () => {
  const [username, setUsername] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    setError('');

    if (!username() || !email() || !password() || !confirmPassword()) {
      setError('Semua field harus diisi.');
      return;
    }

    if (password().length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    if (password() !== confirmPassword()) {
      setError('Password dan Konfirmasi tidak cocok.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username(),
          email: email(),
          password: password(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registrasi gagal.');
        return;
      }

      const data = await response.json();
      alert(`Registrasi berhasil! Selamat datang, ${data.username || username()}`);

      // Tunggu sebentar agar notifikasi terlihat, lalu redirect
      window.location.href = '/dashboard';

    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat menghubungi server.');
    }
  };


  return (
    <>
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-1">
        Create an Account
      </h2>
      <p class="text-sm text-gray-500 text-center mb-6">
        Mulai pengalaman barumu hari ini!
      </p>

      <form onSubmit={handleRegister} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              type={showPassword() ? "text" : "password"}
              placeholder="Create a password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword())}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showPassword() ? (
                  <path stroke-Linecap="round" stroke-Linejoin="round" stroke-Width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path stroke-Linecap="round" stroke-Linejoin="round" stroke-Width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div class="relative">
            <input
              type={showConfirmPassword() ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword()}
              onInput={(e) => setConfirmPassword(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword())}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showConfirmPassword() ? (
                  <path stroke-Linecap="round" stroke-Linejoin="round" stroke-Width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path stroke-Linecap="round" stroke-Linejoin="round" stroke-Width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {error() && <p class="text-red-500 text-sm">{error()}</p>}

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
        
        <div class="relative flex py-3 items-center">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="flex-shrink mx-4 text-sm text-gray-500">Or register with</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>
        
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <a 
          href="/login" 
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Login di sini
        </a>
      </p>
    </>
  );
};

export default RegisterForm;