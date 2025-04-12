import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Moviesearch from './Moviesearch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Moviesearch />
  </StrictMode>,
)
