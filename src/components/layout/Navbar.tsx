import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store';
import { Film, User, LogOut, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if the user has scrolled past the hero section (e.g., beyond window.innerHeight * 0.5)
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  // Hide if we are on Category page (which has its own header) 
  // OR if we are on Search page and haven't scrolled yet
  const isSearchRoute = location.pathname === '/';
  const isCategoryRoute = location.pathname.startsWith('/category/');
  const shouldHideNavbar = isCategoryRoute || (isSearchRoute && !isScrolled);

  return (
    <AnimatePresence>
      {!shouldHideNavbar && (
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
        >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors">
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
              <Film className="w-8 h-8" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">FlickPicks</span>
          </Link>

          <div className="flex items-center space-x-6">
            <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-white' 
                    : 'text-on-surface hover:text-white'
                }`}
              >
                Search
              </Link>
            </motion.div>

            {user && (
              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link
                  to="/watchlist"
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                    location.pathname === '/watchlist' ? 'text-primary-400' : 'text-on-surface hover:text-primary-300'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Watchlist</span>
                </Link>
              </motion.div>
            )}

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-on-surface hidden md:block">
                  {user.email}
                </span>
                <motion.button
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            ) : (
              location.pathname !== '/login' && (
                <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-full transition-colors shadow-lg shadow-primary-600/20"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
      </motion.nav>
      )}
    </AnimatePresence>
  );
}
