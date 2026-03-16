import { motion } from 'framer-motion';
import { SearchX, ArrowLeft } from 'lucide-react';

interface NoResultsProps {
  query: string;
  onClear: () => void;
}

export const NoResults = ({ query, onClear }: NoResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 md:py-16 px-4 md:px-6 glass-card rounded-[2rem] border-white/5 max-w-xl mx-auto shadow-2xl relative overflow-hidden text-center"
    >
      {/* Cinematic background effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="mb-4 md:mb-6 p-4 bg-white/5 rounded-full border border-white/10 shadow-inner relative"
      >
        <SearchX className="w-8 h-8 md:w-10 md:h-10 text-primary-400 opacity-80" />
        <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full -z-10" />
      </motion.div>

      <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-3 uppercase tracking-tighter italic">
        Scene Missing
      </h3>

      <p className="text-on-surface/80 text-base md:text-lg max-w-md mb-6 md:mb-8 leading-tight font-medium">
        We couldn't find any footage for <span className="text-white underline decoration-primary-500 underline-offset-4">"{query}"</span>.
      </p>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="flex items-center gap-3 px-6 py-2.5 md:px-8 md:py-3.5 bg-gradient-to-r from-primary-600 to-primary-400 text-white font-bold text-sm md:text-base rounded-xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 uppercase tracking-widest border border-white/10"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        <span>Back to Spotlight</span>
      </motion.button>
    </motion.div>
  );
};
