import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/moviesearch.css'
import { LoginWrapper } from './assets/LoginContext'
import { AuthWrapper } from './assets/AuthContext'
import Home from './routes/Home'
import Header from './components/Header'
import Movies from './routes/Movies'
import Movie from './routes/Movie'
import Footer from './components/Footer'
import People from './routes/People'
import NavigationReset from './assets/NavigationReset'
import Login from './components/Login'
import Register from './routes/Register'

export const API_URL = import.meta.env.VITE_API_URL;

function Moviesearch() {

  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
          <LoginWrapper>
            <NavigationReset />
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <Login />
              <main className="flex-grow-1">
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/movies' element={<Movies />} />
                  <Route path='/movie' element={<Movie />} />
                  <Route path='/people' element={<People />} />
                  <Route path='/register' element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LoginWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </>
  )
}

export default Moviesearch
