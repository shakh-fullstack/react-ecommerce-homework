import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import { ArrowLeftIcon, CartIcon } from "../components/Icons";

function CartPage() {
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      name: "Sony WH-1000XM5",
      category: "Audio",
      specs: "Active Noise Cancelling • 30 soat batareya",
      unitPrice: "4 200 000 so'm",
      subtotal: "4 200 000 so'm",
      quantity: 1,
      icon: "headphones",
    },
    {
      id: 2,
      name: "Keychron K2 Pro",
      category: "Aksessuarlar",
      specs: "Mexanik klaviatura • Bluetooth / USB-C",
      unitPrice: "1 350 000 so'm",
      subtotal: "2 700 000 so'm",
      quantity: 2,
      icon: "keyboard",
    },
  ];

  return (
    <section className="cart-page-section" aria-label="Savat sahifasi">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">Savat</span>
          <h2 className="cart-page-title">Savatingiz</h2>
          <p className="cart-page-subtitle">
            3 ta mahsulot tanlangan — buyurtmani rasmiylashtiring
          </p>
        </div>

        <button
          type="button"
          className="auth-back-btn"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-card">
          <div className="cart-header">
            <h3 className="cart-title">
              <CartIcon />
              <span>Tanlangan mahsulotlar (3)</span>
            </h3>
            <button type="button" className="btn-clear">
              Savatni tozalash
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
