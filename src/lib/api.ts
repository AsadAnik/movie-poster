const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy';
const BASE_URL = 'https://www.omdbapi.com/';

export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export async function searchMovies(query: string, page = 1): Promise<{ results: MovieSearchResult[]; total: number; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
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
