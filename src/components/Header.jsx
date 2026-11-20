import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import { LANGUAGES } from "../i18n/translations";
import ProfileDropdown from "./ProfileDropdown";
import {
  CartIcon,
  HeartIcon,
  MoonIcon,
  ScaleIcon,
  SearchIcon,
  SlidersIcon,
  SunIcon,
  UserIcon,
} from "./Icons";

function Header() {
  const {
    searchQuery,
    setSearchQuery,
    wishlist,
    onlyWishlist,
    setOnlyWishlist,
    compareIds,
    cartCount,
    user,
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
  } = useStore();

  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const themeLabel = theme === "dark" ? t("header.themeToLight") : t("header.themeToDark");

  // "/" tugmasi bosilganda qidiruv inputiga fokus tushadi
  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target.tagName;
      if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (!isHomePage) navigate("/");
  };

  const handleWishlistClick = () => {
    if (isHomePage) {
      setOnlyWishlist(!onlyWishlist);
    } else {
      setOnlyWishlist(true);
      navigate("/");
    }
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <div className="brand-mark">TB</div>
          <div>
            <p className="brand-title">TexnoBozor</p>
            <p className="brand-subtitle">{t("header.brandSubtitle")}</p>
          </div>
        </Link>

        <div className="header-search">
          <span className="header-search-icon">
            <SearchIcon />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            className="header-search-input"
            placeholder={t("header.searchPlaceholder")}
            aria-label={t("header.searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="header-actions">
          <select
            className="header-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label={t("header.language")}
          >
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="header-pill header-icon-btn"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/compare" className="header-pill" title={t("header.compare")}>
            <ScaleIcon />
            <span>{t("header.compare")}</span>
            <span className="pill-count">{compareIds.length}</span>
          </Link>

          <button
            type="button"
            className="header-pill"
            aria-pressed={onlyWishlist}
            onClick={handleWishlistClick}
          >
            <HeartIcon filled={onlyWishlist} />
            <span>{t("header.wishlist")}</span>
            <span className="pill-count">{wishlist.length}</span>
          </button>

          <Link to="/cart" className="header-pill header-pill--dark">
            <CartIcon />
            <span>{t("header.cart")}</span>
            <span className="pill-count">{cartCount}</span>
          </Link>

          <Link to="/admin" className="header-pill" title={t("header.admin")}>
            <SlidersIcon />
            <span>{t("header.admin")}</span>
          </Link>

          <div className="header-divider" aria-hidden="true" />

          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link to="/login" className="header-pill">
                <UserIcon />
                <span>{t("header.login")}</span>
              </Link>

              <Link to="/register" className="header-pill header-pill--brand">
                <span>{t("header.register")}</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
