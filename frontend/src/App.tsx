import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import FoodPage from './pages/FoodPage';
import DiaryPage from './pages/DiaryPage';
import ProfilePage from './pages/ProfilePage';
import AiRecipePage from './pages/AiRecipePage';
import RecipePage from './pages/RecipePage';
import CatalogPage from './pages/CatalogPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <div style={{ paddingBottom: '70px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/calendar" element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            } />
            <Route path="/catalog" element={
              <PrivateRoute>
                <CatalogPage />
              </PrivateRoute>
            } />
            <Route path="/category/:type/:value" element={
              <PrivateRoute>
                <CategoryPage />
              </PrivateRoute>
            } />
            <Route path="/diary" element={
              <PrivateRoute>
                <DiaryPage />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route path="/ai" element={
              <PrivateRoute>
                <AiRecipePage />
              </PrivateRoute>
            } />
            <Route path="/recipe/:id" element={
              <PrivateRoute>
                <RecipePage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
        {localStorage.getItem('token') && <BottomNav />}
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;