import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { ArrowLeftIcon, CartIcon } from "../components/Icons";
import { useStore } from "../context/store";

function CartPage() {
  const { cartItems, cartCount, clearCart, t } = useStore();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page-section" aria-label={t("cart.ariaLabel")}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <CartIcon />
          </div>
          <h3 className="empty-state-title">{t("cart.emptyTitle")}</h3>
          <p className="empty-state-desc">{t("cart.emptyDesc")}</p>
          <Link to="/" className="empty-state-btn">
            {t("common.backToShop")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page-section" aria-label={t("cart.ariaLabel")}>
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">{t("cart.badge")}</span>
          <h2 className="cart-page-title">{t("cart.title")}</h2>
          <p className="cart-page-subtitle">{t("cart.subtitle", { count: cartCount })}</p>
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
              <CartIcon />
              <span>{t("cart.selected", { count: cartCount })}</span>
            </h3>
            <button type="button" className="btn-clear" onClick={clearCart}>
              {t("cart.clear")}
            </button>
          </div>

          <ul className="cart-page-list">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <CartSummary />
      </div>
    </section>
  );
}

export default CartPage;
