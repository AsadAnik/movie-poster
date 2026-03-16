import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryHeaderProps {
  query: string;
  movieCount: number;
}

export const CategoryHeader = ({ query, movieCount }: CategoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="relative z-50 px-4 md:px-8 py-3 md:py-5 flex items-center justify-between">
      <motion.button
        whileHover={{ x: -10 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 md:gap-4 text-white hover:text-primary-400 transition-all group"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-500/50 group-hover:bg-primary-500/10">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <p className="font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">Explore More</p>
      </motion.button>

      <div className="text-center absolute left-1/2 -translate-x-1/2 w-full pointer-events-none px-20">
        <h1 className="text-sm md:text-xl lg:text-2xl font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] italic truncate">
          {query.replace('+', ' ')}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] hidden lg:block">Archive Capacity</p>
        <div className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-lg text-white font-black text-[8px] md:text-[10px]">
          {movieCount} FILMS
        </div>
      </div>
    </header>
  );
};
