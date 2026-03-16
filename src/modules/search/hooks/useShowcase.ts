import { useState, useEffect } from 'react';
import { searchMovies } from '../../../services/movie.service';
import type { MovieSearchResult } from '../../../types/movie.types';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface UseShowcaseReturn {
  movies: MovieSearchResult[];
  loading: boolean;
}

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────

/**
 * Fetches the top-10 movies for a given showcase category query.
 * Used by the `ShowcaseCarousel` component on the landing state of Search.
 */
export function useShowcase(query: string): UseShowcaseReturn {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchShowcase() {
      setLoading(true);
      const { results } = await searchMovies(query);

      if (!cancelled) {
        setMovies(results ? results.slice(0, 10) : []);
        setLoading(false);
      }
    }

    fetchShowcase();

    // Cleanup – prevents setting state on unmounted component
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { movies, loading };
}
