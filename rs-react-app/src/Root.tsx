import App from './App';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import AboutPage from './pages/About/About';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { ThemeProvider } from './context/ThemeContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Root() {
  return (
    <div id='root'>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter basename="/pokemon-search">

            <Navbar />

            <Routes>
              <Route path="/about" element={<AboutPage />} />

              <Route path="/search" element={<App />}>
                <Route
                  path="pokemon/:name"
                  element={<PokemonDetails />}
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>

          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider></div>
  );
}