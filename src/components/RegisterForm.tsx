import { createSignal } from 'solid-js'

const RegisterForm = () => {
  const [username, setUsername] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [confirmPassword, setConfirmPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [success, setSuccess] = createSignal('')

  const handleRegister = (e: Event) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!username() || !email() || !password() || !confirmPassword()) {
      setError('Semua field harus diisi.')
      return
    }

    if (password().length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    if (password() !== confirmPassword()) {
      setError('Password dan Konfirmasi tidak cocok.')
      return
    }

    setSuccess(`Registrasi berhasil!\nSelamat datang, ${username()}`)
  }

  return (
    <>
      <h2>Daftar Sekarang 🚀</h2>
      <p class="desc">Mulai pengalaman barumu hari ini!</p>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={username()}
          onInput={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword()}
          onInput={(e) => setConfirmPassword(e.currentTarget.value)}
        />

        {error() && <p class="error">{error()}</p>}
        {success() && <p class="success">{success()}</p>}

        <button type="submit">Register</button>
      </form>

      <p class="toggle">
        Sudah punya akun?{' '}
        <span onClick={() => window.location.href = '/login'}>Login di sini</span>
      </p>
    </>
  )
}

export default RegisterForm
