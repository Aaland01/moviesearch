import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/moviesearch.css'
import { LoginWrapper } from './components/LoginContext'
import Home from './routes/Home'
import Logout from './components/Logout'
import Header from './components/Header'

export const API_URL = import.meta.env.VITE_API_URL;

function Moviesearch() {

  return (
    <>
      <BrowserRouter>
        <LoginWrapper>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            {/* TEMPORARY LOGOUT, want it to be global modal */}
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </LoginWrapper>
      </BrowserRouter>
    </>
  )
}

export default Moviesearch
