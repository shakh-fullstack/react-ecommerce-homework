import { useStore } from "../context/store";
import { DeviceIcon, TrashIcon } from "./Icons";

function CartItemCard({ item }) {
  const { addToCart, decreaseQuantity, removeFromCart, formatMoney, t } = useStore();
  const isMaxQuantity = item.quantity >= item.stock;

  return (
    <li className="cart-page-item">
      <div className="cart-item-thumb">
        <DeviceIcon type={item.icon} />
      </div>

      <div className="cart-page-item-info">
        <span className="product-category">{item.categoryLabel}</span>
        <p className="cart-page-item-name">{item.title}</p>
        <p className="cart-page-item-specs">{item.specs}</p>
        <p className="cart-page-item-unit">
          {t("cart.unitPrice", { price: formatMoney(item.price) })}
        </p>
      </div>

      <div className="cart-page-item-controls">
        <div className="qty-stepper">
          <button
            type="button"
            className="qty-btn"
            aria-label={t("cart.decrease")}
            onClick={() => decreaseQuantity(item.id)}
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            aria-label={t("cart.increase")}
            disabled={isMaxQuantity}
            title={isMaxQuantity ? t("cart.maxStock", { count: item.stock }) : undefined}
            onClick={() => addToCart(item.id)}
          >
            +
          </button>
        </div>

        <span className="cart-page-item-subtotal">{formatMoney(item.subtotal)}</span>

        <button
          type="button"
          className="btn-remove-item"
          aria-label={t("cart.remove")}
          onClick={() => removeFromCart(item.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default CartItemCard;
