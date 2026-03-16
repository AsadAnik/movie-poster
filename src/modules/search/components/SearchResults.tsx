import { motion, AnimatePresence } from 'framer-motion';
import { MovieCard } from '../../../components/ui/MovieCard';
import type { MovieSearchResult } from '../../../types/movie.types';

interface SearchResultsProps {
  movies: MovieSearchResult[];
}

export const SearchResults = ({ movies }: SearchResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mb-10 w-full"
    >
      <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-primary-500 pl-4 py-1">
        Search Results
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        <AnimatePresence>
          {movies.map((movie, i) => (
            <motion.div
              key={movie.imdbID}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
