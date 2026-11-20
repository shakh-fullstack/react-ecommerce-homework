import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { products } from "../data/products";

function Layout() {
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
        <Outlet
          context={{
            products,
            wishlist,
            onlyWishlist,
            onToggleWishlist: toggleWishlist,
            onToggleOnlyWishlist: () => setOnlyWishlist((prev) => !prev),
            onResetWishlistFilter: () => setOnlyWishlist(false),
          }}
        />
      </main>
    </div>
  );
}

export default Layout;
