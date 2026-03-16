import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Plus, Trash2 } from 'lucide-react';
import type { MovieSearchResult } from '../../types/movie.types';
import { useStore } from '../../store';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface MovieCardProps {
  movie: MovieSearchResult;
  isWatchlist?: boolean;
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function MovieCard({ movie, isWatchlist = false }: MovieCardProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, user } = useStore();

  const watched = isInWatchlist(movie.imdbID);

  const handleWatchlistAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert('Please login first to add movies to your watchlist');
      return;
    }
    if (watched) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl overflow-hidden group relative flex flex-col h-full"
    >
      <Link to={`/movie/${movie.imdbID}`} className="flex-1 flex flex-col h-full">
        <div className="relative aspect-[2/3] overflow-hidden w-full bg-surface">
          {movie.Poster !== 'N/A' ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-hover text-on-surface">
              No Poster
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 right-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWatchlistAction}
              className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all ${
                watched
                  ? 'bg-primary-500/80 text-white'
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              {isWatchlist ? (
                <Trash2 className="w-5 h-5 text-red-400 hover:text-red-300" />
              ) : watched ? (
                <Heart className="w-5 h-5 fill-current" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-primary-400 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-sm text-on-surface mt-1 flex-1">{movie.Year}</p>
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="inline-block py-1 px-3 bg-primary-900/40 text-primary-300 text-xs rounded-full border border-primary-500/20 font-medium">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
