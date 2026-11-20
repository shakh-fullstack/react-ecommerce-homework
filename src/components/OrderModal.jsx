import { useEffect } from "react";
import { useStore } from "../context/store";
import { CloseIcon } from "./Icons";

function OrderModal() {
  const { selectedOrder, setSelectedOrder, cancelOrder, formatMoney, t } = useStore();

  useEffect(() => {
    if (!selectedOrder) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedOrder(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedOrder, setSelectedOrder]);

  if (!selectedOrder) return null;

  const isCanceled = selectedOrder.status === "canceled";
  const months = selectedOrder.installmentMonths || 0;
  const monthlyText =
    months > 0
      ? t("orders.paymentInstallment", {
          months,
          monthly: formatMoney(Math.round(selectedOrder.total / months)),
        })
      : t("orders.paymentFull");

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={() => setSelectedOrder(null)}
    >
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3 className="modal-title">
            {t("orders.receiptTitle", { id: selectedOrder.id })}
          </h3>
          <button
            type="button"
            className="modal-close-btn"
            aria-label={t("common.close")}
            onClick={() => setSelectedOrder(null)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>{t("orders.customer")}</span>
            <strong>{selectedOrder.customer}</strong>
          </div>

          {selectedOrder.phone && (
            <div className="summary-row">
              <span>{t("orders.phone")}</span>
              <span>{selectedOrder.phone}</span>
            </div>
          )}

          <div className="summary-row">
            <span>{t("checkout.delivery")}</span>
            <span>{t(`delivery.${selectedOrder.delivery}`)}</span>
          </div>

          <div className="summary-row">
            <span>{t("orders.payment")}</span>
            <span>{monthlyText}</span>
          </div>

          <div className="summary-row">
            <span>{t("orders.statusLabel")}</span>
            <span
              className={`order-status ${isCanceled ? "order-status--canceled" : ""}`}
            >
              {t(`orders.status.${selectedOrder.status}`)}
            </span>
          </div>

          <div className="modal-items-box">
            <p className="checkout-heading">{t("orders.items")}</p>
            <p className="order-meta">{selectedOrder.itemsSummary}</p>
          </div>

          <div className="summary-total">
            <span>{t("checkout.total")}</span>
            <span>{formatMoney(selectedOrder.total)}</span>
          </div>
        </div>

        <div className="modal-actions">
          {!isCanceled && (
            <button
              type="button"
              className="btn-cancel-order"
              onClick={() => cancelOrder(selectedOrder.id)}
            >
              {t("orders.cancel")}
            </button>
          )}
          <button
            type="button"
            className="empty-state-btn"
            onClick={() => setSelectedOrder(null)}
          >
            {t("common.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
