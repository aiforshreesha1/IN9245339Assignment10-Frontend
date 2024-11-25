import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store';
import { logout } from '../lib/slices/authSlice';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              E-Commerce
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                <ShoppingCart className="w-5 h-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
                <span className="ml-1 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                  {items.length}
                </span>
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                    <User className="w-5 h-5 mr-1" />
                    <span className="hidden md:inline">Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <p>&copy; 2024 E-Commerce Innomatics. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;