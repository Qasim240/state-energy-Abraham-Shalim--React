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
import CustomerSignature from './components/ui/pages/CustomerSignature'
import AllOrder from './components/ui/pages/AllOrder'
import SingleInvoice from './components/ui/pages/SingleInvoice'

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
        <Route path="/customer-signature" element={<MainLayout ><CustomerSignature /></MainLayout>} />
        <Route path="/all-orders" element={<MainLayout ><AllOrder /></MainLayout>} />
        <Route path="/single-invoice" element={<MainLayout ><SingleInvoice /></MainLayout>} />
        <Route
          path="/collection/:category"
          element={<MainLayout><DetailPage /></MainLayout>}
        />
      </Routes>
    </>
  )
}

export default App
