import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import PokemonDetails from './components/PokemonDetails/PokemonDetails.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pokemon-search"
            element={<App />}
          >
            <Route
              path="pokemon/:name"
              element={<PokemonDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
