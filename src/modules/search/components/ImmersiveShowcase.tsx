import React, { useState, useRef } from 'react';
import { useFeaturedMovies } from '../hooks/useFeaturedMovies';
import type { ShowcaseItem } from '../types/search.types';

// Atomic Components from Category Module
import { CategoryBackground } from '../../category/components/CategoryBackground';
import { MovieCarousel } from '../../category/components/MovieCarousel';
import type { MovieCarouselHandle } from '../../category/components/MovieCarousel';
import { MovieInfo } from '../../category/components/MovieInfo';
import { ProgressStrip } from '../../category/components/ProgressStrip';
import { CategoryLoader } from '../../category/components/CategoryLoader';

import type { MovieSearchResult } from '../../../types/movie.types';

interface FeaturedMovie extends MovieSearchResult {
  categoryQuery: string;
}

interface ImmersiveShowcaseProps {
  showcases: ShowcaseItem[];
  onActiveMovieChange?: (movie: FeaturedMovie) => void;
}

export function ImmersiveShowcase({ showcases }: ImmersiveShowcaseProps) {
  const { movies, loading } = useFeaturedMovies(showcases);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<MovieCarouselHandle>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Constants for layout - Responsive
  const POSTER_WIDTH = isMobile ? 180 : 240;
  const POSTER_GAP = isMobile ? 15 : 25;
  const ITEM_WIDTH = POSTER_WIDTH + POSTER_GAP;

  if (loading) return <CategoryLoader />;
  if (movies.length === 0) return null;

  const activeMovie = movies[activeIndex];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / ITEM_WIDTH);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < movies.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    carouselRef.current?.scrollTo(index);
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col min-h-[600px] md:min-h-[800px] justify-center isolate">
      {/* Immersive Background Transition */}
      <div className="absolute inset-0 z-0">
          <CategoryBackground activeMovie={activeMovie} isFixed={false} />
      </div>

      {/* Main Showcase Stage */}
      <div className="flex-1 flex flex-col relative z-20 justify-center">
        {/* The Carousel Platform */}
        <MovieCarousel
          ref={carouselRef}
          movies={movies}
          activeIndex={activeIndex}
          onScroll={handleScroll}
          onSelect={setActiveIndex}
          itemWidth={ITEM_WIDTH}
        />

        {/* Info Strip with category query for the "View All" button */}
        <MovieInfo 
          activeMovie={activeMovie} 
          categoryQuery={activeMovie.categoryQuery} 
        />
      </div>

      {/* Dynamic Progress Strip */}
      <ProgressStrip 
        movieCount={movies.length} 
        activeIndex={activeIndex} 
        onSelect={handleSelect}
      />
    </div>
  );
}
