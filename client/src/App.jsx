import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrdersPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/create-order" element={<CreateOrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
