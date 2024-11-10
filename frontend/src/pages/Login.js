// // src/Login.js
// import React, { useState } from 'react';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch('http://localhost:4000/api/authentication/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();
//         if (response.ok) {
//             setMessage('Login successful');
//         } else {
//             setMessage(data.message || 'Login failed');
//         }
//     };

//     return (
//         <div>
//             <h2>Login Page</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign in</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email or mobile phone number
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm text-gray-600">
                  Your password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Log in
            </button>

            <div className="text-xs text-center text-gray-600">
              By continuing, you agree to the{' '}
              <a href="#" className="underline">Terms of use</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>.
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forget your password
              </a>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-center text-sm">
              {message}
            </div>
          )}
        </div>

        {/* Create account section */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 mb-4">
            New to our community
          </div>
          <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"> 
          <a href="/signup">Create an account</a>
          </button>
        </div>

        {/* Footer */}
        <div className="w-full h-px bg-gray-200 my-8"></div>

        <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700">Help Center</a>
          <a href="#" className="hover:text-gray-700">Terms of Service</a>
          <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        </div>

      </div>
    </div>
  );
};

export default Login;