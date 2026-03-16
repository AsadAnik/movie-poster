import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { SearchHeroBackground } from './SearchHeroBackground';
import { SearchHeroHeader } from './SearchHeroHeader';

interface SearchHeroProps {
  query: string;
  setQuery: (value: string) => void;
  loading: boolean;
  isActive: boolean;
  isMobile: boolean;
  onScrollDown: () => void;
}

export const SearchHero = ({
  query,
  setQuery,
  loading,
  isActive,
  isMobile,
  onScrollDown
}: SearchHeroProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const heroIsActive = isActive || isFocused;

  return (
    <motion.div
      animate={{ minHeight: heroIsActive ? (isMobile ? '40vh' : '35vh') : '100vh' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden"
    >
      <SearchHeroBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-10 md:pt-16 mt-4 md:mt-8">
        <SearchHeroHeader isActive={heroIsActive} />

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-3xl z-20"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <SearchBar value={query} onChange={setQuery} loading={loading} />
        </motion.div>
      </div>

      {/* Animated Scrolling Indicator (Bottom) */}
      {!heroIsActive && query.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2"
          onClick={onScrollDown}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-xl"
          >
            <ArrowDown className="w-5 h-5 text-white/70" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
