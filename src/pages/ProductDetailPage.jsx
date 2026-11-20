import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CartIcon,
  CheckCircleIcon,
  DeviceIcon,
  HeartIcon,
  ScaleIcon,
  StarIcon,
} from "../components/Icons";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/store";
import NotFoundPage from "./NotFoundPage";

const PLANS = [3, 6, 12];

function ProductDetailPage() {
  const { id } = useParams();
  const {
    catalog,
    findProduct,
    isInWishlist,
    toggleWishlist,
    isInCompare,
    toggleCompare,
    addToCart,
    getCartQuantity,
    getProductReviews,
    addReview,
    user,
    showNotice,
    formatMoney,
    t,
  } = useStore();

  const product = findProduct(id);
  const [months, setMonths] = useState(12);
  const [author, setAuthor] = useState(user?.name ?? "");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  if (!product) return <NotFoundPage />;

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const inCart = getCartQuantity(product.id);
  const isOut = product.stock === 0;
  const isLimitReached = !isOut && inCart >= product.stock;
  const isCartDisabled = isOut || isLimitReached;

  const monthlyPayment = Math.round(product.price / months);
  const reviews = getProductReviews(product.id);
  const related = catalog
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  let cartLabel = t("product.addToCart");
  if (isOut) cartLabel = t("product.unavailable");
  else if (inCart > 0) cartLabel = t("product.inCart", { count: inCart });

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview(product.id, { author, rating, comment });
    setComment("");
    showNotice("notice.reviewAdded");
  };

  return (
    <section className="cart-page-section">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">{product.categoryLabel}</span>
          <h2 className="cart-page-title">{product.title}</h2>
          <p className="cart-page-subtitle">{product.specs}</p>
        </div>

        <Link to="/" className="auth-back-btn">
          <ArrowLeftIcon />
          <span>{t("common.backToShop")}</span>
        </Link>
      </div>

      <div className="detail-grid">
        <div className={`detail-visual ${isOut ? "product-visual--out" : ""}`}>
          <span className={`stock-badge ${isOut ? "stock-badge--out" : ""}`}>
            {isOut
              ? t("product.outOfStock")
              : t("product.inStock", { count: product.stock })}
          </span>
          <DeviceIcon type={product.icon} />
        </div>

        <div className="cart-summary-card">
          <div className="product-meta">
            <span className="product-category">{product.categoryLabel}</span>
            <span className="product-rating">
              <StarIcon />
              {product.rating}
            </span>
          </div>

          <p className="detail-price">{formatMoney(product.price)}</p>

          <div className="detail-installment-box">
            <p className="checkout-heading">{t("product.installmentTitle")}</p>
            <div className="installment-tabs">
              {PLANS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`installment-tab ${months === m ? "active" : ""}`}
                  onClick={() => setMonths(m)}
                >
                  {t("common.months", { count: m })}
                </button>
              ))}
            </div>
            <div className="detail-installment-result">
              <strong>
                {t("common.perMonth", { price: formatMoney(monthlyPayment) })}
              </strong>
              <span>
                {t("product.installmentTotal", { price: formatMoney(product.price) })}
              </span>
            </div>
          </div>

          <div className="detail-perks">
            <div className="detail-perk">
              <CheckCircleIcon />
              <span>{t("product.warranty")}</span>
            </div>
            <div className="detail-perk">
              <CheckCircleIcon />
              <span>{t("product.fastDelivery")}</span>
            </div>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className={`btn-add-cart detail-cart-btn ${isCartDisabled ? "is-disabled" : ""}`}
              disabled={isCartDisabled}
              onClick={() => addToCart(product.id)}
            >
              <CartIcon />
              <span>{cartLabel}</span>
            </button>

            <button
              type="button"
              className={`header-pill ${isLiked ? "is-liked-pill" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <HeartIcon filled={isLiked} />
            </button>

            <button
              type="button"
              className={`header-pill ${isCompared ? "is-compared-pill" : ""}`}
              onClick={() => toggleCompare(product.id)}
            >
              <ScaleIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mijozlar sharhlari */}
      <div className="cart-page-grid detail-reviews-grid">
        <div className="cart-items-card">
          <h3 className="cart-summary-title">
            {t("product.reviewsTitle", { count: reviews.length })}
          </h3>

          {reviews.length === 0 ? (
            <p className="cart-page-subtitle">{t("product.noReviews")}</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((rev) => (
                <article key={rev.id} className="order-card">
                  <div className="order-top">
                    <span className="order-id">{rev.author}</span>
                    <span className="product-rating">
                      <StarIcon />
                      {rev.rating}.0 • {rev.date}
                    </span>
                  </div>
                  <p className="order-meta">{rev.comment}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <form className="cart-summary-card auth-form" onSubmit={handleReviewSubmit}>
          <h3 className="cart-summary-title">{t("product.leaveReview")}</h3>

          <input
            type="text"
            className="form-field"
            placeholder={t("product.yourName")}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />

          <select
            className="form-field"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {t("product.rating")}: {star} ★
              </option>
            ))}
          </select>

          <textarea
            className="form-field review-textarea"
            placeholder={t("product.commentPlaceholder")}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            required
          />

          <button type="submit" className="btn-checkout">
            {t("product.submitReview")}
          </button>
        </form>
      </div>

      {/* O'xshash mahsulotlar */}
      {related.length > 0 && (
        <div className="related-section">
          <h3 className="orders-title">{t("product.relatedTitle")}</h3>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetailPage;
