import { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { products } from "./data/products";

function App() {
  const [wishlist, setWishlist] = useState([1, 3]);
  const [onlyWishlist, setOnlyWishlist] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleWishlistClick = () => {
    if (location.pathname === "/") {
      setOnlyWishlist((prev) => !prev);
    } else {
      setOnlyWishlist(true);
      navigate("/");
    }
  };

  const handleBrandClick = () => {
    setOnlyWishlist(false);
    navigate("/");
  };

  return (
    <div className="page-shell">
      <Header
        wishlistCount={wishlist.length}
        onlyWishlist={onlyWishlist}
        onWishlistClick={handleWishlistClick}
        onBrandClick={handleBrandClick}
      />

      <main className="container main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                wishlist={wishlist}
                onlyWishlist={onlyWishlist}
                onToggleWishlist={toggleWishlist}
                onToggleOnlyWishlist={() => setOnlyWishlist((prev) => !prev)}
                onResetWishlistFilter={() => setOnlyWishlist(false)}
              />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/login"
            element={
              <section className="auth-section" aria-label="Kirish">
                <LoginPage />
              </section>
            }
          />
          <Route
            path="/register"
            element={
              <section className="auth-section" aria-label="Ro'yxatdan o'tish">
                <RegisterPage />
              </section>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
