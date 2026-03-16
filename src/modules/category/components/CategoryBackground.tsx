import { motion, AnimatePresence } from 'framer-motion';
import type { MovieSearchResult } from '../../../types/movie.types';

interface CategoryBackgroundProps {
  activeMovie: MovieSearchResult | null;
}

export const CategoryBackground = ({ activeMovie }: CategoryBackgroundProps) => {
  return (
    <AnimatePresence mode="wait">
      {activeMovie && (
        <motion.div
          key={activeMovie.imdbID}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-0"
        >
          <img
            src={activeMovie.Poster !== 'N/A' ? activeMovie.Poster : '/bg-cover.avif'}
            className="w-full h-full object-cover blur-[120px] scale-125"
            alt="Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/90" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
