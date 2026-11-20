import { useStore } from "../context/store";
import OrderCard from "./OrderCard";

function OrdersSection() {
  const { orders, t } = useStore();

  return (
    <section className="orders-section" aria-label={t("orders.title")}>
      <div className="orders-header">
        <div>
          <h2 className="orders-title">{t("orders.title")}</h2>
          <p className="orders-subtitle">{t("orders.subtitle")}</p>
        </div>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}

export default OrdersSection;
