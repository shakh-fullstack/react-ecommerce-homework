import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import { getInitials, getShortName } from "../utils/user";
import { BagIcon, ChevronDownIcon, HeartIcon, LogoutIcon, UserIcon } from "./Icons";

function ProfileDropdown() {
  const { user, orders, wishlist, logout, setOnlyWishlist, showNotice, t } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Tashqariga bosilganda yoki Escape bosilganda yopiladi
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const myOrdersCount = orders.filter((order) => order.userEmail === user.email).length;
  const initials = getInitials(user.name);

  const toggleMenu = (event) => {
    event.preventDefault(); // <details> ning o'zi ochilib-yopilishini to'xtatamiz
    setIsOpen((prev) => !prev);
  };

  const goTo = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const showWishlist = () => {
    setOnlyWishlist(true);
    goTo("/");
  };

  // Avval bosh sahifaga o'tamiz, keyin chiqamiz (/profile dan /login ga otib ketmasligi uchun)
  const handleLogout = async () => {
    setIsOpen(false);
    await navigate("/");
    logout();
    showNotice("notice.loggedOut");
  };

  return (
    <details ref={dropdownRef} className="profile-dropdown" open={isOpen}>
      <summary className="profile-trigger" onClick={toggleMenu}>
        <span className="profile-avatar-sm">{initials}</span>
        <span className="profile-trigger-name">{getShortName(user.name)}</span>
        <span className="profile-trigger-chevron">
          <ChevronDownIcon />
        </span>
      </summary>

      <div className="profile-menu">
        <div className="profile-menu-head">
          <span className="profile-avatar-lg">{initials}</span>
          <div className="profile-user-info">
            <p className="profile-user-name">{user.name}</p>
            <p className="profile-user-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-menu-list">
          <button
            type="button"
            className={`profile-menu-item ${pathname === "/profile" ? "is-active" : ""}`}
            onClick={() => goTo("/profile")}
          >
            <span className="profile-menu-left">
              <UserIcon />
              <span>{t("profile.myProfile")}</span>
            </span>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => goTo("/profile")}>
            <span className="profile-menu-left">
              <BagIcon />
              <span>{t("profile.myOrders")}</span>
            </span>
            <span className="profile-menu-badge">{myOrdersCount}</span>
          </button>

          <button type="button" className="profile-menu-item" onClick={showWishlist}>
            <span className="profile-menu-left">
              <HeartIcon />
              <span>{t("profile.myWishlist")}</span>
            </span>
            <span className="profile-menu-badge">{wishlist.length}</span>
          </button>
        </div>

        <div className="profile-menu-footer">
          <button
            type="button"
            className="profile-menu-item is-danger"
            onClick={handleLogout}
          >
            <span className="profile-menu-left">
              <LogoutIcon />
              <span>{t("profile.logout")}</span>
            </span>
          </button>
        </div>
      </div>
    </details>
  );
}

export default ProfileDropdown;
