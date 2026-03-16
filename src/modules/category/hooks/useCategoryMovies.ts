import { useState, useEffect } from 'react';
import { searchMovies } from '../../../services/movie.service';
import type { MovieSearchResult } from '../../../types/movie.types';

interface UseCategoryMoviesReturn {
  movies: MovieSearchResult[];
  loading: boolean;
  error: string;
}

export function useCategoryMovies(query: string): UseCategoryMoviesReturn {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchMovies() {
      if (!query) return;
      
      setLoading(true);
      setError('');
      
      try {
        const { results, error: apiError } = await searchMovies(query, 1);
        if (!cancelled) {
          if (apiError) {
            setError(apiError);
          } else {
            setMovies(results || []);
          }
        }
      } catch (err) {
        if (!cancelled) setError('Failed to fetch movies');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMovies();
    return () => { cancelled = true; };
  }, [query]);

  return { movies, loading, error };
}
