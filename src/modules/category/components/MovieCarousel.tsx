import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MovieSearchResult } from '../../../types/movie.types';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  movies: MovieSearchResult[];
  activeIndex: number;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onSelect: (index: number) => void;
  itemWidth: number;
}

export interface MovieCarouselHandle {
  scrollTo: (index: number) => void;
}

export const MovieCarousel = forwardRef<MovieCarouselHandle, MovieCarouselProps>(
  ({ movies, activeIndex, onScroll, onSelect, itemWidth }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollTo = (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
        });
      }
    };

    useImperativeHandle(ref, () => ({
      scrollTo
    }));

    return (
      <div className="relative w-full overflow-visible">
        <div 
          ref={containerRef}
          onScroll={onScroll}
          className="flex items-center gap-[15px] md:gap-[25px] overflow-x-auto scrollbar-hide snap-x snap-mandatory px-[calc(50vw-90px)] md:px-[calc(50vw-120px)] py-20 no-scrollbar"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory'
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              index={index}
              activeIndex={activeIndex}
              onClick={() => {
                onSelect(index);
                scrollTo(index);
              }}
            />
          ))}
        </div>

        {/* Large Floating Controls - Desktop Only */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full px-12 md:px-24 hidden md:flex justify-between pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const newIndex = activeIndex - 1;
              if (newIndex >= 0) {
                onSelect(newIndex);
                scrollTo(newIndex);
              }
            }}
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto backdrop-blur-xl disabled:opacity-0 transition-opacity"
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const newIndex = activeIndex + 1;
              if (newIndex < movies.length) {
                onSelect(newIndex);
                scrollTo(newIndex);
              }
            }}
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center pointer-events-auto backdrop-blur-xl disabled:opacity-0 transition-opacity"
            disabled={activeIndex === movies.length - 1}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>
      </div>
    );
  }
);
