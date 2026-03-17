import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from './hooks/useSearch';
import { SearchHero } from './components/SearchHero';
import { SearchResults } from './components/SearchResults';
import { ShowcaseList } from './components/ShowcaseList';
import { NoResults } from './components/NoResults';
import { SHOWCASES } from './constants/search.constants';

export default function Search() {
  const { query, setQuery, debouncedQuery, movies, loading, error } = useSearch();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = query.trim().length > 0;

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleClearSearch = () => {
    setQuery('');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const showNoResults = !loading && (movies.length === 0 && (debouncedQuery.trim() || error === "Movie not found!"));

  return (
    <div className="w-full relative min-h-screen bg-background">
      {/* Hero Section (Search Area) */}
      <SearchHero 
        query={query}
        setQuery={setQuery}
        loading={loading}
        isActive={isActive}
        isMobile={isMobile}
        onScrollDown={handleScrollDown}
      />

      {/* Main Content Area (Results / Showcases) */}
      <div className={`relative z-10 w-full mx-auto transition-all duration-500 ${isActive ? 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-0' : 'py-24 md:py-32 min-h-[500px]'}`}>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mb-4"></div>
            <p className="text-white/60 font-medium animate-pulse">Searching for "{query}"...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && error !== "Movie not found!" && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 glass-card rounded-2xl max-w-2xl mx-auto border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
          >
            <p className="text-red-400 text-lg font-medium">{error}</p>
          </motion.div>
        )}

        {/* No Results */}
        {showNoResults && (
          <NoResults query={debouncedQuery} onClear={handleClearSearch} />
        )}

        {/* Active Results */}
        {movies.length > 0 && (
          <SearchResults movies={movies} />
        )}

        {/* Default Landing Showcases */}
        {!isActive && !debouncedQuery.trim() && movies.length === 0 && (
          <ShowcaseList showcases={SHOWCASES} />
        )}
      </div>
    </div>
  );
}
