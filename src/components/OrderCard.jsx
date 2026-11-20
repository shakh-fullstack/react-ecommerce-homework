import { useStore } from "../context/store";

function OrderCard({ order }) {
  const { formatMoney, setSelectedOrder, cancelOrder, t } = useStore();
  const isCanceled = order.status === "canceled";

  return (
    <article className="order-card">
      <div className="order-top">
        <span className="order-id">
          {order.id} — {order.customer}
        </span>
        <span className={`order-status ${isCanceled ? "order-status--canceled" : ""}`}>
          {t(`orders.status.${order.status}`)}
        </span>
      </div>

      <p className="order-meta">{order.itemsSummary}</p>

      <div className="order-bottom">
        <span className="order-delivery">{t(`delivery.${order.delivery}`)}</span>
        <span className="order-total">{formatMoney(order.total)}</span>
      </div>

      <div className="order-actions">
        <button
          type="button"
          className="order-action-btn"
          onClick={() => setSelectedOrder(order)}
        >
          {t("orders.viewReceipt")}
        </button>

        {!isCanceled && (
          <button
            type="button"
            className="order-action-btn order-action-btn--danger"
            onClick={() => cancelOrder(order.id)}
          >
            {t("orders.cancel")}
          </button>
        )}
      </div>
    </article>
  );
}

export default OrderCard;
