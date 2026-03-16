import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useCategoryMovies } from './hooks/useCategoryMovies';

// Atomic Components
import { CategoryBackground } from './components/CategoryBackground';
import { CategoryHeader } from './components/CategoryHeader';
import { MovieCarousel } from './components/MovieCarousel';
import type { MovieCarouselHandle } from './components/MovieCarousel';
import { MovieInfo } from './components/MovieInfo';
import { ProgressStrip } from './components/ProgressStrip';
import { CategoryLoader } from './components/CategoryLoader';

export default function CategoryPage() {
  const { query } = useParams<{ query: string }>();
  const { movies, loading } = useCategoryMovies(query || '');
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
    <div className="relative min-h-screen bg-[#050811] overflow-x-hidden flex flex-col">
      {/* Immersive Background Transition */}
      <CategoryBackground activeMovie={activeMovie} />

      {/* Premium Header */}
      <CategoryHeader 
        query={query || ''} 
        movieCount={movies.length} 
      />

      {/* Main Showcase Stage */}
      <div className="flex-1 flex flex-col relative z-20 justify-center pt-8 md:pt-12">
        {/* The Carousel Platform */}
        <MovieCarousel
          ref={carouselRef}
          movies={movies}
          activeIndex={activeIndex}
          onScroll={handleScroll}
          onSelect={setActiveIndex}
          itemWidth={ITEM_WIDTH}
        />

        {/* Info Strip */}
        <MovieInfo activeMovie={activeMovie} />
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
