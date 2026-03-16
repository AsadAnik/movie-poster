import { motion } from 'framer-motion';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────

export function SearchBar({ value, onChange, loading }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value.trim().length === 0) {
      e.currentTarget.blur();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="max-w-3xl mx-auto mb-8 md:mb-12 relative z-20"
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-on-surface group-focus-within:text-primary-400 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 md:pl-12 pr-4 py-3.5 md:py-5 glass bg-surface/80 rounded-2xl text-base md:text-xl text-white placeholder-on-surface/50 border border-white/10 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-xl hover:bg-surface/90"
          placeholder="Search movies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <Loader2 className="h-6 w-6 text-primary-400 animate-spin" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
