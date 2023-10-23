import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
