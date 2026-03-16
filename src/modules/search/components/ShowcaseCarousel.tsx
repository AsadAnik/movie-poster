import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useShowcase } from '../hooks/useShowcase';
import { MovieCard } from '../../../components/ui/MovieCard';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface ShowcaseCarouselProps {
  title: string;
  query: string;
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function ShowcaseCarousel({ title, query }: ShowcaseCarouselProps) {
  const { movies, loading } = useShowcase(query);

  if (loading) {
    return (
      <div className="py-6 animate-pulse">
        <div className="h-8 w-48 bg-surface-hover/30 rounded-lg mb-6" />
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[220px] h-[330px] bg-surface-hover/30 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4 md:mb-6 pr-2 px-1">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase italic">{title}</h2>
        <Link
          to={`/category/${encodeURIComponent(query)}`}
          className="flex items-center text-[10px] md:text-sm text-primary-400 font-bold hover:text-primary-300 transition-colors uppercase tracking-[0.2em]"
        >
          See more <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        </Link>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide no-scrollbar px-1">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="min-w-[160px] md:min-w-[220px] max-w-[160px] md:max-w-[220px] snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
