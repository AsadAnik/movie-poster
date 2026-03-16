import { motion, AnimatePresence } from 'framer-motion';

interface SearchHeroHeaderProps {
  isActive: boolean;
}

export const SearchHeroHeader = ({ isActive }: SearchHeroHeaderProps) => {
  return (
    <AnimatePresence>
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20, height: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, scale: 0.95, y: -20, height: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-center mb-6 md:mb-10 w-full overflow-hidden"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-primary-300 tracking-tight mb-4 md:mb-6 leading-tight drop-shadow-2xl px-4">
            Find your next <br className="hidden md:block" /> favorite movie
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md pb-4 px-6">
            Search from millions of movies and build your personal watchlist with ease.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
