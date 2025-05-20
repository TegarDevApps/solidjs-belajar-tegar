import { createSignal } from 'solid-js'

interface LoginFormProps {
  isLogin: boolean
  onToggle: () => void
}

const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [username, setUsername] = createSignal('')
  const [error, setError] = createSignal('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setError('')

    if (!email() || !password() || (!props.isLogin && !username())) {
      setError('Semua field harus diisi!')
      return
    }

    alert(`${props.isLogin ? 'Login' : 'Register'} berhasil!\nEmail: ${email()}`)
  }

  return (
    <>
      <h2>{props.isLogin ? 'Selamat Datang Kembali 👋' : 'Ayo Bergabung 🎉'}</h2>
      <p class="desc">
        {props.isLogin
          ? 'Silakan login untuk melanjutkan'
          : 'Daftar untuk mulai pengalaman baru'}
      </p>

      <form onSubmit={handleSubmit}>
        {!props.isLogin && (
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
        )}
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

        {error() && <p class="error">{error()}</p>}

        <button type="submit">{props.isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p class="toggle">
        {props.isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
        <span onClick={props.onToggle}>
          {props.isLogin ? 'Daftar di sini' : 'Login di sini'}
        </span>
      </p>
    </>
  )
}

export default LoginForm
