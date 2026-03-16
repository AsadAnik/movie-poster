import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function EmptyWatchlist() {
  return (
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
        Looks like you haven't added any movies yet. Head over to the search page to find some great
        titles!
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 rounded-xl font-medium text-white shadow-lg shadow-primary-500/20 transition-all"
      >
        Find Movies
      </Link>
    </motion.div>
  );
}
