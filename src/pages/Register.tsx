import '../styles/index.css';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-8">
          <div class="flex justify-center mb-6">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <span class="ml-2 text-xl font-bold text-gray-800">Bloginfo.</span>
            </div>
          </div>
          
          <RegisterForm />
          
          <div class="mt-6 text-center">
            <a href="/" class="text-sm text-blue-500 hover:text-blue-600">
              Home page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;