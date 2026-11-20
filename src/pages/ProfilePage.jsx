import { Link, Navigate, useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { ArrowLeftIcon, BagIcon, LogoutIcon } from "../components/Icons";
import { useStore } from "../context/store";
import { getInitials } from "../utils/user";

function ProfilePage() {
  const { user, orders, wishlist, logout, showNotice, t } = useStore();
  const navigate = useNavigate();

  // Faqat tizimga kirganlar uchun
  if (!user) return <Navigate to="/login" replace />;

  const myOrders = orders.filter((order) => order.userEmail === user.email);

  const details = [
    { label: t("profile.name"), value: user.name },
    { label: t("profile.email"), value: user.email },
    { label: t("profile.phone"), value: user.phone || t("profile.notProvided") },
    { label: t("profile.ordersCount"), value: myOrders.length },
    { label: t("profile.wishlistCount"), value: wishlist.length },
  ];

  // Avval bosh sahifaga o'tamiz, keyin chiqamiz (/login ga otib ketmasligi uchun)
  const handleLogout = async () => {
    await navigate("/");
    logout();
    showNotice("notice.loggedOut");
  };

  return (
    <section className="cart-page-section" aria-label={t("profile.badge")}>
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">{t("profile.badge")}</span>
          <h2 className="cart-page-title">{user.name}</h2>
          <p className="cart-page-subtitle">{t("profile.subtitle")}</p>
        </div>

        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>{t("common.backToShop")}</span>
        </Link>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-card">
          <div className="cart-header">
            <h3 className="cart-title">
              <BagIcon />
              <span>
                {t("profile.myOrders")} ({myOrders.length})
              </span>
            </h3>
          </div>

          {myOrders.length > 0 ? (
            <div className="orders-grid profile-orders">
              {myOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="profile-empty">
              <p>{t("profile.noOrders")}</p>
              <Link to="/" className="empty-state-btn">
                {t("profile.startShopping")}
              </Link>
            </div>
          )}
        </div>

        <aside className="cart-summary-card">
          <div className="profile-card-head">
            <span className="profile-avatar-lg">{getInitials(user.name)}</span>
            <div className="profile-user-info">
              <p className="profile-user-name">{user.name}</p>
              <p className="profile-user-email">{user.email}</p>
            </div>
          </div>

          <div className="cart-summary profile-details">
            {details.map((row) => (
              <div key={row.label} className="summary-row">
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>

          <button type="button" className="profile-menu-item is-danger" onClick={handleLogout}>
            <span className="profile-menu-left">
              <LogoutIcon />
              <span>{t("profile.logout")}</span>
            </span>
          </button>
        </aside>
      </div>
    </section>
  );
}

export default ProfilePage;
