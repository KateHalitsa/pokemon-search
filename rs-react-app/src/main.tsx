import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonDetails from './components/PokemonDetails/PokemonDetails.tsx'
import AboutPage from './pages/About/About.tsx'
import Navbar from'./components/Navbar/Navbar.tsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ThemeProvider } from './context/ThemeContext.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <StrictMode>
        <ErrorBoundary>
          <BrowserRouter  basename="/pokemon-search">
                <Navbar />

            <Routes>

              <Route path="/about" element={<AboutPage />} />

              <Route
                path="/search"
                element={<App />}
              >
                <Route
                  path="pokemon/:name"
                  element={<PokemonDetails />}
                />
              </Route>
              <Route
                  path="*"
                  element={<NotFoundPage />}
                />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>
    </ThemeProvider>
  </Provider>
)
