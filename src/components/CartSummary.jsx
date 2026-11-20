import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import { isValidPhone } from "../utils/validators";

const PROMO_CODE = "SALE10";
const PROMO_PERCENT = 10;
const INSTALLMENT_PLANS = [0, 3, 6, 12];

const DELIVERY_PRICES = {
  courier: 30000,
  pickup: 0,
};

function CartSummary() {
  const { cartTotal, user, placeOrder, showNotice, formatMoney, t } = useStore();
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isPromoInvalid, setIsPromoInvalid] = useState(false);

  const [customerName, setCustomerName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [delivery, setDelivery] = useState("courier");
  const [installmentMonths, setInstallmentMonths] = useState(0);
  const [formError, setFormError] = useState("");

  const discount = isPromoApplied ? Math.round((cartTotal * PROMO_PERCENT) / 100) : 0;
  const deliveryPrice = DELIVERY_PRICES[delivery];
  const total = cartTotal - discount + deliveryPrice;
  const monthlyAmount =
    installmentMonths > 0 ? Math.round(total / installmentMonths) : total;

  const handleApplyPromo = () => {
    const isValid = promoInput.trim().toUpperCase() === PROMO_CODE;
    setIsPromoApplied(isValid);
    setIsPromoInvalid(!isValid);
  };

  const handleCheckout = () => {
    if (!customerName.trim() || !phone.trim()) {
      setFormError("errors.checkoutRequired");
      return;
    }
    if (!isValidPhone(phone)) {
      setFormError("errors.phoneInvalid");
      return;
    }

    const order = placeOrder({
      customer: customerName.trim(),
      phone: phone.trim(),
      delivery,
      total,
      installmentMonths,
    });

    showNotice("notice.orderPlaced", { id: order.id });
    navigate("/");
  };

  return (
    <aside className="cart-summary-card">
      <h3 className="cart-summary-title">{t("checkout.title")}</h3>

      <div className="promo-section">
        <div className="promo-row">
          <input
            type="text"
            className="promo-input"
            placeholder={t("checkout.promoPlaceholder")}
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleApplyPromo()}
          />
          <button type="button" className="btn-promo" onClick={handleApplyPromo}>
            {t("checkout.apply")}
          </button>
        </div>

        {isPromoApplied && (
          <p className="promo-status">
            {t("checkout.promoApplied", { code: PROMO_CODE, percent: PROMO_PERCENT })}
          </p>
        )}
        {isPromoInvalid && (
          <p className="promo-status promo-status--error">
            {t("checkout.promoInvalid", { code: PROMO_CODE })}
          </p>
        )}
      </div>

      <div className="checkout-form">
        <p className="checkout-heading">{t("checkout.details")}</p>

        <input
          type="text"
          className="form-field"
          placeholder={t("checkout.namePlaceholder")}
          value={customerName}
          onChange={(event) => {
            setCustomerName(event.target.value);
            setFormError("");
          }}
        />

        <input
          type="tel"
          className="form-field"
          placeholder="+998 90 123 45 67"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            setFormError("");
          }}
        />

        <div className="delivery-options">
          {Object.entries(DELIVERY_PRICES).map(([key, price]) => (
            <button
              key={key}
              type="button"
              className={`delivery-chip ${delivery === key ? "active" : ""}`}
              aria-pressed={delivery === key}
              onClick={() => setDelivery(key)}
            >
              {t(`checkout.${key}`)}
              <span>{price ? formatMoney(price) : t("checkout.free")}</span>
            </button>
          ))}
        </div>

        <p className="checkout-heading">{t("checkout.paymentMethod")}</p>
        <div className="installment-tabs">
          {INSTALLMENT_PLANS.map((months) => (
            <button
              key={months}
              type="button"
              className={`installment-tab ${installmentMonths === months ? "active" : ""}`}
              onClick={() => setInstallmentMonths(months)}
            >
              {months === 0 ? t("checkout.payFull") : t("common.months", { count: months })}
            </button>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>{t("checkout.items")}</span>
          <span>{formatMoney(cartTotal)}</span>
        </div>

        {isPromoApplied && (
          <div className="summary-row summary-row--discount">
            <span>{t("checkout.discount", { percent: PROMO_PERCENT })}</span>
            <span>− {formatMoney(discount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>{t("checkout.delivery")}</span>
          <span>{formatMoney(deliveryPrice)}</span>
        </div>

        <div className="summary-total">
          <span>{t("checkout.total")}</span>
          <span>{formatMoney(total)}</span>
        </div>

        {installmentMonths > 0 && (
          <div className="summary-row summary-row--installment">
            <span>{t("checkout.monthlyPayment", { months: installmentMonths })}</span>
            <strong>{formatMoney(monthlyAmount)}</strong>
          </div>
        )}
      </div>

      {formError && (
        <p className="form-error" role="alert">
          {t(formError)}
        </p>
      )}

      <button type="button" className="btn-checkout" onClick={handleCheckout}>
        {t("checkout.submit")}
      </button>
    </aside>
  );
}

export default CartSummary;
