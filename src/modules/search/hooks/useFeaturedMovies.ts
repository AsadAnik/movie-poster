import { useState, useEffect } from 'react';
import { searchMovies } from '../../../services/movie.service';
import type { MovieSearchResult } from '../../../types/movie.types';
import type { ShowcaseItem } from '../types/search.types';

interface FeaturedMovie extends MovieSearchResult {
  categoryQuery: string;
}

export function useFeaturedMovies(showcases: ShowcaseItem[]) {
  const [movies, setMovies] = useState<FeaturedMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if we don't have movies yet
    if (movies.length > 0) {
      setLoading(false);
      return;
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          showcases.map(async (s) => {
            const { results } = await searchMovies(s.query, 1);
            return (results || []).slice(0, 3).map(m => ({
              ...m,
              categoryQuery: s.query
            }));
          })
        );
        setMovies(results.flat());
      } catch (err) {
        console.error('Failed to fetch featured movies', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [showcases, movies.length]);

  return { movies, loading };
}
