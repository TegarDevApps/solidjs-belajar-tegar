import { createSignal } from 'solid-js'
import LoginForm from '../components/LoginForm'
import '../styles/index.css'

function Login() {
  const [isLogin, setIsLogin] = createSignal(true)

  return (
    <div class="auth-container">
      <div class="form-box">
        <h1 class='text-1xl'>ini halaman login</h1>
        <LoginForm
          isLogin={isLogin()}
          onToggle={() => setIsLogin(!isLogin())}
        />
      </div>
    </div>
  )
}

export default Login
