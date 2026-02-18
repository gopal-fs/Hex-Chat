
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'


const App = () => {
  const {user}=useContext(AuthContext)
  
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">

      <Routes>
        <Route path='/login' element={user?<Navigate to='/' />:<LoginPage />} />
        <Route path='/' element={user?<HomePage />:<Navigate to='/login' />} />
        <Route path='/profile' element={user?<ProfilePage />:<Navigate to='/login' />} />
      </Routes>
      <Toaster position='top-center' reverseOrder={false} />
    </div>

  )
}

export default App