import { CartIcon, DeviceIcon, HeartIcon, StarIcon } from "./Icons";

function ProductCard({ product, isLiked, onToggleWishlist }) {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 2;

  return (
    <article className="product-card">
      <div className={`product-visual ${isOut ? "product-visual--out" : ""}`}>
        <span
          className={`stock-badge ${
            isOut ? "stock-badge--out" : isLow ? "stock-badge--low" : ""
          }`}
        >
          {isOut ? "Tugagan" : `Omborda: ${product.stock} ta`}
        </span>

        <button
          type="button"
          className={`wishlist-btn ${isLiked ? "is-liked" : ""}`}
          aria-label="Sevimlilarga qo'shish"
          onClick={onToggleWishlist}
        >
          <HeartIcon filled={isLiked} />
        </button>

        <DeviceIcon type={product.icon} />
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating">
            <StarIcon />
            {product.rating}
          </span>
        </div>

        <h3 className="product-title">{product.title}</h3>
        <p className="product-specs">{product.specs}</p>

        <div className="product-footer">
          <span className="product-price">{product.price}</span>

          <button
            type="button"
            className={`btn-add-cart ${isOut ? "is-disabled" : ""}`}
            disabled={isOut}
          >
            <CartIcon />
            <span>{isOut ? "Mavjud emas" : "Savatga"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;