"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Facilities', path: '/facilities' },
  ];

  if (user) {
    navLinks.push(
      { name: 'My Bookings', path: '/my-bookings' },
      { name: 'Add Facility', path: '/add-facility' },
      { name: 'Manage My Facilities', path: '/manage-facilities' }
    );
  }

  return (
    <nav className="fixed w-full z-50 glass border-b-0 border-card-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient">SportNest</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <Link href="/profile" className="flex items-center gap-2 hover:opacity-85 transition-all">
                    {user.image ? (
                      <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-primary/20" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="text-sm text-gray-300 font-medium">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-card border border-card-border hover:bg-white/5 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-primary hover:bg-primary-dark text-secondary px-6 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]"
                >
                  Login
                </Link>
              )
            )}
          </div>

          {/* Mobile menu controls */}
          <div className="md:hidden flex items-center gap-3">
            {!loading && (
              user ? (
                <Link 
                  href="/profile" 
                  className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-primary/20 hover:opacity-85 transition-opacity"
                >
                  {user.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-primary/40 transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-card-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!loading && (
              user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-white/5"
                >
                  Login
                </Link>
              )
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
