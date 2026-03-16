import { motion } from 'framer-motion';

interface ProgressStripProps {
  movieCount: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const ProgressStrip = ({ movieCount, activeIndex, onSelect }: ProgressStripProps) => {
  return (
    <footer className="px-6 md:px-12 py-4 md:py-6 flex flex-col items-center gap-3">
      <div className="flex gap-1.5 md:gap-2.5">
        {Array.from({ length: movieCount }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full overflow-hidden"
            animate={{
              width: i === activeIndex ? (window.innerWidth < 768 ? 30 : 50) : (window.innerWidth < 768 ? 6 : 10),
              backgroundColor: i === activeIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.1)"
            }}
            onClick={() => onSelect(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </footer>
  );
};
