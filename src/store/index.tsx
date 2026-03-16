import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { MovieSearchResult } from '../types/movie.types';

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────

interface User {
  id: string;
  email: string;
}

interface StoreContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  watchlist: MovieSearchResult[];
  addToWatchlist: (movie: MovieSearchResult) => void;
  removeFromWatchlist: (imdbID: string) => void;
  isInWatchlist: (imdbID: string) => boolean;
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ─────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('movie_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [watchlist, setWatchlist] = useState<MovieSearchResult[]>([]);

  useEffect(() => {
    if (user) {
      const storedList = localStorage.getItem(`watchlist_${user.id}`);
      setWatchlist(storedList ? JSON.parse(storedList) : []);
    } else {
      setWatchlist([]);
    }
  }, [user]);

  const login = (email: string) => {
    const id = btoa(email).substring(0, 10);
    const newUser = { id, email };
    setUser(newUser);
    localStorage.setItem('movie_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movie_user');
  };

  const addToWatchlist = (movie: MovieSearchResult) => {
    if (!user) return;
    setWatchlist((prev) => {
      const updated = [...prev, movie];
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWatchlist = (imdbID: string) => {
    if (!user) return;
    setWatchlist((prev) => {
      const updated = prev.filter((m) => m.imdbID !== imdbID);
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const isInWatchlist = (imdbID: string): boolean => {
    return watchlist.some((m) => m.imdbID === imdbID);
  };

  return (
    <StoreContext.Provider
      value={{ user, login, logout, watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
