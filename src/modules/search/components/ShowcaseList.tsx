import { motion } from 'framer-motion';
import { ShowcaseCarousel } from './ShowcaseCarousel';
import type { ShowcaseItem } from '../types/search.types';

interface ShowcaseListProps {
  showcases: ShowcaseItem[];
}

export const ShowcaseList = ({ showcases }: ShowcaseListProps) => {
  return (
    <div className="space-y-24 mt-4">
      {showcases.map((showcase, index) => (
        <motion.div
          key={showcase.query}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
        >
          <ShowcaseCarousel
            title={showcase.title}
            query={showcase.query}
          />
        </motion.div>
      ))}
    </div>
  );
};
