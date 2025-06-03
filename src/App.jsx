import './App.css'
import MainLayout from './components/MainLayout'
import Home from './components/ui/pages/Home'
import Login from './components/ui/pages/Login'
import { Routes, Route } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<MainLayout ><Home /></MainLayout>} />
      </Routes>
    </>
  )
}

export default App
