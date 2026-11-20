import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, DeviceIcon } from "../components/Icons";
import { useStore } from "../context/store";

const DEVICE_ICONS = ["laptop", "headphones", "keyboard", "watch", "mouse"];
const PRODUCT_CATEGORIES = ["laptops", "audio", "accessories"];

function AdminPage() {
  const {
    catalog,
    adjustStock,
    updateProductPrice,
    addProduct,
    resetInventory,
    showNotice,
    formatMoney,
    t,
  } = useStore();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("laptops");
  const [icon, setIcon] = useState("laptop");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("5");
  const [specs, setSpecs] = useState("");

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (!title.trim() || !price || !specs.trim()) return;

    const created = addProduct({ title, category, icon, price, stock, specs });
    showNotice("notice.productAdded", { title: created.title });
    setTitle("");
    setPrice("");
    setStock("5");
    setSpecs("");
  };

  return (
    <section className="cart-page-section">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">{t("admin.badge")}</span>
          <h2 className="cart-page-title">{t("admin.title")}</h2>
          <p className="cart-page-subtitle">{t("admin.subtitle")}</p>
        </div>

        <div className="header-actions">
          <button type="button" className="btn-clear" onClick={resetInventory}>
            {t("admin.resetInventory")}
          </button>
          <Link to="/" className="auth-back-btn">
            <ArrowLeftIcon />
            <span>{t("common.backToShop")}</span>
          </Link>
        </div>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-card">
          <div className="cart-header">
            <h3 className="cart-title">
              {t("admin.inventoryList", { count: catalog.length })}
            </h3>
          </div>

          <ul className="cart-page-list">
            {catalog.map((item) => (
              <li key={item.id} className="cart-page-item">
                <div className="cart-item-thumb">
                  <DeviceIcon type={item.icon} />
                </div>

                <div className="cart-page-item-info">
                  <span className="product-category">{item.categoryLabel}</span>
                  <Link to={`/product/${item.id}`} className="product-title-link">
                    <p className="cart-page-item-name">{item.title}</p>
                  </Link>
                  <p className="cart-page-item-specs">{item.specs}</p>
                  <p className="cart-page-item-unit">{formatMoney(item.price)}</p>
                </div>

                <div className="cart-page-item-controls">
                  <input
                    type="number"
                    className="form-field admin-price-input"
                    value={item.price}
                    step={50000}
                    min={1000}
                    onChange={(event) => updateProductPrice(item.id, event.target.value)}
                    aria-label={t("admin.productPrice")}
                  />

                  <div className="qty-stepper">
                    <button
                      type="button"
                      className="qty-btn"
                      disabled={item.stock === 0}
                      onClick={() => adjustStock(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.stock}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => adjustStock(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-promo"
                    onClick={() => adjustStock(item.id, 5)}
                  >
                    +5
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form className="cart-summary-card auth-form" onSubmit={handleAddProduct}>
          <h3 className="cart-summary-title">{t("admin.addTitle")}</h3>

          <div className="auth-field-group">
            <label className="auth-label">{t("admin.productTitle")}</label>
            <input
              type="text"
              className="form-field"
              placeholder="iPad Air M2"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="auth-row-2">
            <div className="auth-field-group">
              <label className="auth-label">{t("admin.productCategory")}</label>
              <select
                className="form-field"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {t(`category.${cat}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="auth-field-group">
              <label className="auth-label">{t("admin.productIcon")}</label>
              <select
                className="form-field"
                value={icon}
                onChange={(event) => setIcon(event.target.value)}
              >
                {DEVICE_ICONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="auth-row-2">
            <div className="auth-field-group">
              <label className="auth-label">{t("admin.productPrice")}</label>
              <input
                type="number"
                className="form-field"
                placeholder="7500000"
                min={1000}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-label">{t("admin.productStock")}</label>
              <input
                type="number"
                className="form-field"
                min={0}
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label">{t("admin.productSpecs")}</label>
            <input
              type="text"
              className="form-field"
              placeholder="8GB RAM • 256GB • Wi-Fi"
              value={specs}
              onChange={(event) => setSpecs(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-checkout">
            {t("admin.addSubmit")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminPage;
