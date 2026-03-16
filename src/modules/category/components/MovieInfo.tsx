import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MovieSearchResult } from '../../../types/movie.types';

interface MovieInfoProps {
  activeMovie: MovieSearchResult | null;
}

export const MovieInfo = ({ activeMovie }: MovieInfoProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-auto min-h-[160px] md:h-44 relative flex flex-col items-center py-4 md:py-0">
      <AnimatePresence mode="wait">
        {activeMovie && (
          <motion.div
            key={activeMovie.imdbID}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center text-center px-4 md:px-8"
          >
            <h2 className="text-xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 md:mb-3 leading-tight md:leading-none drop-shadow-xl max-w-[90vw] md:max-w-none">
              {activeMovie.Title}
            </h2>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-400" />
                <span className="text-white/80 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">{activeMovie.Year}</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary-400 fill-primary-400" />
                <span className="text-white/80 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">8.5 / 10</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/movie/${activeMovie.imdbID}`)}
              className="mt-4 md:mt-6 px-6 py-2 md:px-10 md:py-3 border border-white/20 rounded-full text-white font-black uppercase tracking-[0.3em] text-[8px] md:text-[9px] transition-all flex items-center gap-2"
            >
              <Play className="w-3 h-3 fill-current" />
              View Experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
