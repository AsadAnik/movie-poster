import type { MovieSearchResult, MovieDetails } from '../types/movie.types';

// ─────────────────────────────────────────────
//  OMDB API Service
// ─────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy';
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL || 'https://www.omdbapi.com/';

export async function searchMovies(
  query: string,
  page = 1
): Promise<{ results: MovieSearchResult[]; total: number; error?: string }> {
  try {
    const res = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    );
    const data = await res.json();
    if (data.Response === 'True') {
      return { results: data.Search, total: parseInt(data.totalResults, 10) || 0 };
    } else {
      return { results: [], total: 0, error: data.Error };
    }
  } catch (err: any) {
    return { results: [], total: 0, error: err.message || 'Something went wrong' };
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    if (data.Response === 'True') {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
