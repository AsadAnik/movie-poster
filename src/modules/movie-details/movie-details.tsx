import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Star, Calendar, Clock, Heart, Trash2, Award } from 'lucide-react';
import { getMovieDetails } from '../../lib/api';
import type { MovieDetails as IMovieDetails } from '../../lib/api';
import { useStore } from '../../store';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isInWatchlist, addToWatchlist, removeFromWatchlist, user } = useStore();

  useEffect(() => {
    async function fetchDetails() {
      if (!id) return;
      setLoading(true);
      const data = await getMovieDetails(id);
      if (data && data.Response === 'True') {
        setMovie(data);
      } else {
        setError("Could not find movie details.");
      }
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-surface hover:bg-surface-hover rounded-xl text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const isWatched = isInWatchlist(movie.imdbID);

  const toggleWatchlist = () => {
    if (!user) {
      alert("Please login first to manage your watchlist.");
      return;
    }
    if (isWatched) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist({
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Type: movie.Type,
        Poster: movie.Poster,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <motion.button 
        whileHover={{ x: -4 }}
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center text-on-surface hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Results
      </motion.button>

      <div className="flex flex-col md:flex-row gap-12 items-start relative">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full md:w-1/3 lg:w-1/4 rounded-3xl overflow-hidden glass shadow-2xl shrink-0"
        >
          {movie.Poster !== 'N/A' ? (
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-surface flex items-center justify-center text-on-surface">
              No Poster Available
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="flex-1 space-y-8 z-10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-primary-300/80 font-medium">
              <span className="flex items-center gap-1.5 bg-primary-900/40 px-3 py-1 rounded-full border border-primary-500/20">
                <Calendar className="w-4 h-4" /> {movie.Year}
              </span>
              <span className="flex items-center gap-1.5 bg-primary-900/40 px-3 py-1 rounded-full border border-primary-500/20">
                <Clock className="w-4 h-4" /> {movie.Runtime}
              </span>
              <span className="flex items-center gap-1.5 bg-primary-900/40 px-3 py-1 rounded-full border border-primary-500/20">
                <Star className="w-4 h-4 text-yellow-500" /> {movie.imdbRating} / 10
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.Genre.split(', ').map((g) => (
              <span key={g} className="px-4 py-1.5 bg-surface rounded-full text-sm font-medium border border-white/5 shadow-sm text-on-surface">
                {g}
              </span>
            ))}
          </div>

          <div className="p-6 glass-card rounded-3xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Synopsis</h3>
              <p className="text-on-surface/90 leading-relaxed text-lg">
                {movie.Plot}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <strong className="text-white block mb-1 uppercase text-xs tracking-wider">Director</strong>
                <p className="text-on-surface font-medium">{movie.Director}</p>
              </div>
              <div>
                <strong className="text-white block mb-1 uppercase text-xs tracking-wider">Cast</strong>
                <p className="text-on-surface font-medium">{movie.Actors}</p>
              </div>
            </div>

            {movie.Awards !== 'N/A' && (
              <div className="pt-4 border-t border-white/10 flex items-start gap-3">
                <Award className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-on-surface italic">{movie.Awards}</p>
              </div>
            )}
          </div>

          <motion.div 
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleWatchlist}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold shadow-xl transition-all ${
                isWatched 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                  : 'bg-primary-600 text-white hover:bg-primary-500 shadow-primary-600/20 border border-transparent'
              }`}
            >
              {isWatched ? (
                <>
                  <Trash2 className="w-6 h-6" />
                  <span>Remove from Watchlist</span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6" />
                  <span>Add to Watchlist</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Huge background poster blur for premium vibe */}
      {movie.Poster !== 'N/A' && (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-[0.03]">
          <img src={movie.Poster} className="w-full h-full object-cover blur-3xl scale-110" />
        </div>
      )}
    </div>
  );
}
