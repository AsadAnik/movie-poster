import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { StoreProvider, useStore } from './store';
import { Navbar } from './components/layout/Navbar';
import Search from './modules/search/search';
import CategoryPage from './modules/category/category';
import Login from './pages/Login';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function LayoutWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search' || location.pathname === '/';
  const isCategoryPage = location.pathname.startsWith('/category/');
  
  // Only add top padding if it's NOT a full-screen hero page (Search) or custom-header page (Category)
  const shouldAddPadding = !isSearchPage && !isCategoryPage;

  return (
    <div className="relative z-10 flex flex-col flex-1">
      <Navbar />
      <main className={`flex-1 w-full relative ${shouldAddPadding ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative bg-[#0f172a]">
          {/* Main Background with subtle gradients */}
          <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-background to-background pointer-events-none" />
          
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/search" replace />} />
              <Route path="/search" element={<Search />} />
              <Route path="/category/:query" element={<CategoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route 
                path="/watchlist" 
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </LayoutWrapper>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
