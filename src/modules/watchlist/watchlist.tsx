import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store';
import { MovieCard } from '../../components/ui/MovieCard';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Watchlist() {
  const { watchlist, user } = useStore();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <Film className="w-24 h-24 text-primary-500 mb-8 opacity-50" />
        <h2 className="text-3xl font-bold text-white mb-4">You need to log in!</h2>
        <p className="text-on-surface mb-8">Sign in to start creating your personal watchlist.</p>
        <Link to="/login" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-medium text-white transition-colors duration-200">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
            My Watchlist
          </h1>
          <p className="text-on-surface text-lg">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved.
          </p>
        </div>
      </motion.div>

      {watchlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 py-32 glass-card rounded-3xl mt-8"
        >
          <div className="w-24 h-24 bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Film className="w-12 h-12 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your watchlist is empty</h2>
          <p className="text-on-surface mb-8 max-w-md mx-auto">
            Looks like you haven't added any movies yet. Head over to the search page to find some great titles!
          </p>
          <Link to="/" className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-xl font-medium text-white shadow-lg shadow-primary-500/20 transition-all">
            Find Movies
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {watchlist.map((movie) => (
              <motion.div
                key={movie.imdbID}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <MovieCard movie={movie} isWatchlist={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
