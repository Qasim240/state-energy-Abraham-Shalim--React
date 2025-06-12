import './App.css'
import MainLayout from './components/MainLayout'
import Collection from './components/ui/pages/Collection'
import DetailPage from './components/ui/pages/DetailPage'
import Home from './components/ui/pages/Home'
import Login from './components/ui/pages/Login'
import { Routes, Route } from 'react-router-dom'
import CartDetails from './components/ui/pages/CartDetails'
import AddUSerInfo from './components/ui/pages/AddUSerInfo'
import LoanFinance from './components/ui/pages/LoanFinance'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainLayout ><Home /></MainLayout>} />
        <Route path="/collection" element={<MainLayout ><Collection /></MainLayout>} />
        <Route path="/cart-details" element={<MainLayout ><CartDetails /></MainLayout>} />
        <Route path="/user-info" element={<MainLayout ><AddUSerInfo /></MainLayout>} />
        <Route path="/loan-finance" element={<MainLayout ><LoanFinance /></MainLayout>} />
        <Route
          path="/collection/:category"
          element={<MainLayout><DetailPage /></MainLayout>}
        />
      </Routes>
    </>
  )
}

export default App
