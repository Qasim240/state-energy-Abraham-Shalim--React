import './App.css'
import MainLayout from './components/MainLayout'
import Collection from './components/ui/pages/Collection'
import DetailPage from './components/ui/pages/DetailPage'
import Home from './components/ui/pages/Home'
import Login from './components/ui/pages/Login'
import { Routes, Route } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainLayout ><Home /></MainLayout>} />
        <Route path="/collection" element={<MainLayout ><Collection /></MainLayout>} />
        <Route path="/detail" element={<MainLayout ><DetailPage /></MainLayout>} />
      </Routes>
    </>
  )
}

export default App
