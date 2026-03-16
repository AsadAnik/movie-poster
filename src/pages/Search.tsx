import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Loader2, ChevronRight } from 'lucide-react';
import { searchMovies } from '../lib/api';
import type { MovieSearchResult } from '../lib/api';
import { MovieCard } from '../components/ui/MovieCard';

function ShowcaseCarousel({ title, query }: { title: string, query: string }) {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShowcase() {
      const { results } = await searchMovies(query);
      if (results) {
        setMovies(results.slice(0, 10)); // Top 10 for the carousel
      }
      setLoading(false);
    }
    fetchShowcase();
  }, [query]);

  if (loading) {
    return (
      <div className="py-6 animate-pulse">
        <div className="h-8 w-48 bg-surface-hover/30 rounded-lg mb-6"></div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="min-w-[220px] h-[330px] bg-surface-hover/30 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6 pr-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        <button className="hidden sm:flex items-center text-sm text-primary-400 font-bold hover:text-primary-300 transition-colors uppercase tracking-wider">
          See more <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
        {movies.map(movie => (
          <div key={movie.imdbID} className="min-w-[220px] max-w-[220px] snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function fetchMovies() {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        return;
      }
      setLoading(true);
      setError('');
      
      const { results, error: apiError } = await searchMovies(debouncedQuery);
      
      if (apiError) {
        setError(apiError);
      } else {
        setMovies(results || []);
      }
      setLoading(false);
    }
    
    fetchMovies();
  }, [debouncedQuery]);

  const SHOWCASES = [
    { title: "Trending Action", query: "batman" },
    { title: "Sci-Fi Masterpieces", query: "star wars" },
    { title: "Epic Adventures", query: "avengers" },
    { title: "Magic & Mystery", query: "harry potter" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white tracking-tight mb-4">
          Find your next favorite movie
        </h1>
        <p className="text-on-surface text-lg max-w-2xl mx-auto">
          Search from millions of movies and build your personal watchlist with ease.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-8 md:mb-12 relative z-20"
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-on-surface group-focus-within:text-primary-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 md:py-5 glass bg-surface/80 rounded-2xl text-lg md:text-xl text-white placeholder-on-surface/50 border border-white/10 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-xl hover:bg-surface/90"
            placeholder="Search for movies, like 'Inception', 'Joker'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <Loader2 className="h-6 w-6 text-primary-400 animate-spin" />
            </div>
          )}
        </div>
      </motion.div>

      <div className="min-h-[400px]">
        {/* State 1: Error Display */}
        {error && query.trim() && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 glass-card rounded-2xl max-w-2xl mx-auto border-red-500/20"
          >
            <p className="text-red-400 text-lg">{error}</p>
          </motion.div>
        )}

        {/* State 2: No Results For Search */}
        {!loading && !error && movies.length === 0 && debouncedQuery.trim() && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-12 py-24 glass-card rounded-2xl"
          >
            <p className="text-on-surface text-xl">No movies found for "{debouncedQuery}".</p>
          </motion.div>
        )}

        {/* State 3: Active Search Results */}
        {movies.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              <AnimatePresence>
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* State 4: Default Landing Showcases (Netflix style) */}
        {!debouncedQuery.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 mt-4"
          >
            {SHOWCASES.map((showcase) => (
              <ShowcaseCarousel key={showcase.query} title={showcase.title} query={showcase.query} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
