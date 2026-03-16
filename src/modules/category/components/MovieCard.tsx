import { motion } from 'framer-motion';
import type { MovieSearchResult } from '../../../types/movie.types';

interface MovieCardProps {
  movie: MovieSearchResult;
  index: number;
  activeIndex: number;
  onClick: () => void;
}

export const MovieCard = ({ movie, index, activeIndex, onClick }: MovieCardProps) => {
  const isActive = index === activeIndex;
  const absDistance = Math.abs(index - activeIndex);

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.15 : 0.75,
        opacity: isActive ? 1 : 0.2,
        y: isActive ? -15 : 0,
        zIndex: 50 - absDistance
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="min-w-[180px] md:min-w-[240px] max-w-[180px] md:max-w-[240px] aspect-[2/3] snap-center cursor-pointer relative"
      onClick={onClick}
    >
      <div className={`w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl transition-all duration-700 ${isActive ? 'ring-4 ring-primary-500 ring-offset-8 ring-offset-[#050811] shadow-primary-500/20' : ''}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/bg-cover.avif'}
          className="w-full h-full object-cover"
          alt={movie.Title}
        />

        {/* Perspective Overlay for non-active */}
        {!isActive && <div className="absolute inset-0 bg-black/40 transition-opacity" />}
      </div>

      {/* Decorative Glow for Active */}
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute -inset-4 bg-primary-500/10 blur-[60px] rounded-[3rem] -z-10"
        />
      )}
    </motion.div>
  );
};
