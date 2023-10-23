import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import { useAuthContext } from './context/AuthContext'
import PostDetails from './pages/PostDetails'
import Header from './components/Header'
import UserProfile from './pages/UserProfile'

function App() {

  const { currentUser } = useAuthContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={currentUser ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path='login' element={!currentUser ? <Main /> : <Navigate to="/" />} />
          <Route path='register' element={!currentUser ? <Register /> : <Navigate to="/" />} />
          <Route path='post/:id' element={currentUser ? <PostDetails /> : <Navigate to="/login" />} />
          <Route path='user/:id' element={currentUser ? <UserProfile /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
