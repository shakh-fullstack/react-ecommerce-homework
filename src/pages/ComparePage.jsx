import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CartIcon,
  DeviceIcon,
  ScaleIcon,
  StarIcon,
  TrashIcon,
} from "../components/Icons";
import { useStore } from "../context/store";

function ComparePage() {
  const { compareItems, toggleCompare, clearCompare, addToCart, formatMoney, t } =
    useStore();

  if (compareItems.length === 0) {
    return (
      <section className="cart-page-section">
        <div className="empty-state">
          <div className="empty-state-icon">
            <ScaleIcon />
          </div>
          <h3 className="empty-state-title">{t("compare.emptyTitle")}</h3>
          <p className="empty-state-desc">{t("compare.emptyDesc")}</p>
          <Link to="/" className="empty-state-btn">
            {t("common.backToShop")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page-section">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">{t("compare.badge")}</span>
          <h2 className="cart-page-title">{t("compare.title")}</h2>
          <p className="cart-page-subtitle">
            {t("compare.subtitle", { count: compareItems.length })}
          </p>
        </div>

        <div className="header-actions">
          <button type="button" className="btn-clear" onClick={clearCompare}>
            {t("compare.clear")}
          </button>
          <Link to="/" className="auth-back-btn">
            <ArrowLeftIcon />
            <span>{t("common.backToShop")}</span>
          </Link>
        </div>
      </div>

      <div className="cart-items-card compare-table-wrap">
        <table className="compare-table">
          <tbody>
            <tr>
              <th>{t("compare.fieldProduct")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  <div className="compare-product-head">
                    <div className="cart-item-thumb">
                      <DeviceIcon type={item.icon} />
                    </div>
                    <Link to={`/product/${item.id}`} className="product-title-link">
                      <strong>{item.title}</strong>
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldCategory")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>{item.categoryLabel}</td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldPrice")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  <strong>{formatMoney(item.price)}</strong>
                </td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldInstallment")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  {t("common.perMonth", {
                    price: formatMoney(Math.round(item.price / 12)),
                  })}
                </td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldRating")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  <span className="product-rating">
                    <StarIcon />
                    {item.rating}
                  </span>
                </td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldSpecs")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>{item.specs}</td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldStock")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  {item.stock === 0
                    ? t("product.outOfStock")
                    : t("product.inStock", { count: item.stock })}
                </td>
              ))}
            </tr>

            <tr>
              <th>{t("compare.fieldAction")}</th>
              {compareItems.map((item) => (
                <td key={item.id}>
                  <div className="compare-actions">
                    <button
                      type="button"
                      className={`btn-add-cart ${item.stock === 0 ? "is-disabled" : ""}`}
                      disabled={item.stock === 0}
                      onClick={() => addToCart(item.id)}
                    >
                      <CartIcon />
                      <span>
                        {item.stock === 0
                          ? t("product.unavailable")
                          : t("product.addToCart")}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => toggleCompare(item.id)}
                      aria-label={t("cart.remove")}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ComparePage;
