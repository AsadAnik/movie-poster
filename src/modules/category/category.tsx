import { useParams, useNavigate } from 'react-router-dom';
import { useCategoryMovies } from './hooks/useCategoryMovies';
import { CategoryLoader } from './components/CategoryLoader';
import { MovieCard } from '../../components/ui/MovieCard';
import { ChevronLeft } from 'lucide-react';

export default function CategoryPage() {
  const { query } = useParams<{ query: string }>();
  const { movies, loading } = useCategoryMovies(query || '');
  const navigate = useNavigate();

  if (loading) return <CategoryLoader />;

  return (
    <div className="min-h-screen bg-[#050811] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary-500 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Category</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              {query}
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-white/40 text-sm font-medium">Found {movies.length} Results</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
