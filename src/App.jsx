import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import { useAuthContext } from './context/AuthContext'

function App() {

  const { currentUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='dashboard' element={currentUser ? <Dashboard /> : <Navigate to="/"/>} />
            <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
