
function CartSummary() {
  return (
    <aside className="cart-summary-card">
      <h3 className="cart-summary-title">Buyurtmani rasmiylashtirish</h3>

      <div className="promo-section">
        <div className="promo-row">
          <input type="text" className="promo-input" placeholder="Promo kod (masalan: SALE10)"/>
          <button type="button" className="btn-promo">Qo‘llash</button>
        </div>

        <p className="promo-status">SALE10 qo‘llandi — 10% chegirma</p>
      </div>

      <div className="checkout-form">
        <p className="checkout-heading">Buyurtma ma’lumotlari</p>
        <input type="text" className="form-field" placeholder="Ismingiz" />

        <input type="tel" className="form-field" placeholder="+998 90 123 45 67"/>

        <div className="delivery-options">
          <button type="button" className="delivery-chip active"> Kuryer orqali <span>30 000 so'm</span></button>
          <button type="button" className="delivery-chip">Olib ketish<span>Bepul</span></button>
        </div>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Mahsulotlar</span>
          <span>6 900 000 so'm</span>
        </div>

        <div className="summary-row summary-row--discount">
          <span>Chegirma (10%)</span>
          <span>− 690 000 so'm</span>
        </div>

        <div className="summary-row">
          <span>Yetkazib berish</span>
          <span>30 000 so'm</span>
        </div>

        <div className="summary-total">
          <span>Jami summa</span>
          <span>6 240 000 so'm</span>
        </div>

      </div>

      <button type="button" className="btn-checkout">
        Buyurtma berish
      </button>
      
    </aside>
  );
}

export default CartSummary;