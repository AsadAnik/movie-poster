import { useState, useEffect } from 'react';
import { searchMovies } from '../../../services/movie.service';
import type { MovieSearchResult } from '../../../types/movie.types';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface UseSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;
  movies: MovieSearchResult[];
  loading: boolean;
  error: string;
}

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────

/**
 * Manages the full search flow:
 *  - Raw query state (bound to the input)
 *  - Debounced query (500ms delay before triggering API)
 *  - Movie results, loading, and error state
 */
export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debounce the raw query by 500ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch movies whenever the debounced query changes
  useEffect(() => {
    async function fetchMovies() {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      const { results, error: apiError } = await searchMovies(debouncedQuery);

      if (apiError) {
        setError(apiError);
        setMovies([]);
      } else {
        setMovies(results || []);
      }

      setLoading(false);
    }

    fetchMovies();
  }, [debouncedQuery]);

  return { query, setQuery, debouncedQuery, movies, loading, error };
}
