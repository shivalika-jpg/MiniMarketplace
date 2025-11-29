import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sell from './pages/Sell';
import { logout, isLoggedIn } from './util/auth';

function App(){
  return (
    <BrowserRouter>
      <nav className="w-full bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CircleStore
              </h1>
            </Link>
            
            <div className="flex gap-8 items-center">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Home
              </Link>
              <Link 
                to="/sell" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Sell
              </Link>

              {isLoggedIn() ? (
                <button 
                  onClick={() => { logout(); window.location='/'; }} 
                  className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-indigo-600 font-medium transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/sell" element={<Sell/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
