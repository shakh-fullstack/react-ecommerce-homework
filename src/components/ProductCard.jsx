import { Link } from "react-router-dom";
import { useStore } from "../context/store";
import { CartIcon, DeviceIcon, HeartIcon, ScaleIcon, StarIcon } from "./Icons";

function ProductCard({ product }) {
  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    toggleCompare,
    addToCart,
    getCartQuantity,
    formatMoney,
    t,
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const inCart = getCartQuantity(product.id);

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 2;
  const isLimitReached = !isOut && inCart >= product.stock;
  const isCartDisabled = isOut || isLimitReached;

  const monthly12 = formatMoney(Math.round(product.price / 12));

  let cartLabel = t("product.addToCart");
  if (isOut) cartLabel = t("product.unavailable");
  else if (inCart > 0) cartLabel = t("product.inCart", { count: inCart });

  return (
    <article className="product-card">
      <div className={`product-visual ${isOut ? "product-visual--out" : ""}`}>
        <span
          className={`stock-badge ${
            isOut ? "stock-badge--out" : isLow ? "stock-badge--low" : ""
          }`}
        >
          {isOut ? t("product.outOfStock") : t("product.inStock", { count: product.stock })}
        </span>

        <button
          type="button"
          className={`compare-btn ${isCompared ? "is-active" : ""}`}
          aria-label={isCompared ? t("product.removeFromCompare") : t("product.addToCompare")}
          aria-pressed={isCompared}
          title={isCompared ? t("product.removeFromCompare") : t("product.addToCompare")}
          onClick={() => toggleCompare(product.id)}
        >
          <ScaleIcon />
        </button>

        <button
          type="button"
          className={`wishlist-btn ${isLiked ? "is-liked" : ""}`}
          aria-label={isLiked ? t("product.removeFromWishlist") : t("product.addToWishlist")}
          aria-pressed={isLiked}
          onClick={() => toggleWishlist(product.id)}
        >
          <HeartIcon filled={isLiked} />
        </button>

        <Link to={`/product/${product.id}`} className="product-visual-link">
          <DeviceIcon type={product.icon} />
        </Link>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.categoryLabel}</span>
          <span className="product-rating">
            <StarIcon />
            {product.rating}
          </span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`} className="product-title-link">
            {product.title}
          </Link>
        </h3>
        <p className="product-specs">{product.specs}</p>

        <span className="installment-chip">
          {t("product.installmentFrom", { price: monthly12 })}
        </span>

        <div className="product-footer">
          <span className="product-price">{formatMoney(product.price)}</span>

          <button
            type="button"
            className={`btn-add-cart ${isCartDisabled ? "is-disabled" : ""}`}
            disabled={isCartDisabled}
            title={isLimitReached ? t("product.limitReached") : undefined}
            onClick={() => addToCart(product.id)}
          >
            <CartIcon />
            <span>{cartLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
