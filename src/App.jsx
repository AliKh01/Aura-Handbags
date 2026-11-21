import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Admin from "./pages/Admin/Admin";

function App() {
  useEffect(() => {
  const testConnection = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Supabase connection failed:", error.message);
      return;
    }

    console.log("Supabase connected successfully!");
  };

  testConnection();
}, []);
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;