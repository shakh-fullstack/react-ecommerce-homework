import { CartIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";
import { Link } from "react-router-dom";

function Header({ wishlistCount, onlyWishlist, onWishlistClick, onBrandClick }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand">
          <div className="brand-mark">TB</div>
          <div onClick={onBrandClick}>
            <p className="brand-title">TexnoBozor</p>
            <p className="brand-subtitle">Zamonaviy texnika do‘koni</p>
          </div>
        </Link>

        <div className="header-search">
          <span className="header-search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="header-search-input"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
          />
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="header-pill"
            aria-pressed={onlyWishlist}
            onClick={onWishlistClick}
          >
            <HeartIcon filled={onlyWishlist || wishlistCount > 0} />
            <span>Sevimlilar</span>
            <span className="pill-count">{wishlistCount}</span>
          </button>

          <Link to="/cart" className="header-pill header-pill--dark">
            <CartIcon />
            <span>Savat</span>
            <span className="pill-count">3</span>
          </Link>

          <div className="header-divider" aria-hidden="true" />

          <Link to="/login" className="header-pill">
            <UserIcon />
            <span>Kirish</span>
          </Link>

          <Link to="/register" className="header-pill header-pill--brand">
            <span>Ro‘yxatdan o‘tish</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
