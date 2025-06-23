import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './components/MainLayout';
import Collection from './components/ui/pages/Collection';
import DetailPage from './components/ui/pages/DetailPage';
import Home from './components/ui/pages/Home';
import Login from './components/ui/pages/Login';
import CartDetails from './components/ui/pages/CartDetails';
import AddUSerInfo from './components/ui/pages/AddUSerInfo';
import LoanFinance from './components/ui/pages/LoanFinance';
import CustomerSignature from './components/ui/pages/CustomerSignature';
import AllOrder from './components/ui/pages/AllOrder';
import SingleInvoice from './components/ui/pages/SingleInvoice';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import SelectAppointement from './components/ui/pages/SelectAppointement';
import Userprofile from './components/ui/pages/Userprofile';

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>

          <Route element={<MainLayout />}>
            <Route path="/profile" element={<Userprofile />} />
            <Route path="/select-appointment" element={<SelectAppointement />} />
            <Route path="/home" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/cart-details" element={<CartDetails />} />
            <Route path="/user-info" element={<AddUSerInfo />} />
            <Route path="/loan-finance" element={<LoanFinance />} />
            <Route path="/customer-signature" element={<CustomerSignature />} />
            <Route path="/all-orders" element={<AllOrder />} />
            <Route path="/invoice/:orderId" element={<SingleInvoice />} />
            <Route path="/collection/:category/:cartId?" element={<DetailPage />} />

          </Route>
        </Route>
      </Routes>

      <ToastContainer

        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
}

export default App;

