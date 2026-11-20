import OrderCard from "./OrderCard";

function OrdersSection() {
  const orders = [
    {
      id: "#1024",
      customer: "Azizbek Karimov",
      itemsSummary: "MacBook Air M2 (1x), Logitech MX Master 3S (1x)",
      delivery: "Kuryer orqali",
      status: "Qabul qilindi",
      total: "13 610 000 so'm",
    },
    {
      id: "#1023",
      customer: "Malika Rustamova",
      itemsSummary: "Sony WH-1000XM5 (1x)",
      delivery: "Do‘kondan olib ketish",
      status: "Qabul qilindi",
      total: "4 200 000 so'm",
    },
  ];

  return (
    <section className="orders-section" aria-label="So'nggi buyurtmalar">

      <div className="orders-header">
        <div>
          <h2 className="orders-title">So‘nggi buyurtmalar</h2>
          <p className="orders-subtitle">Tasdiqlangan buyurtmalar ro‘yxati</p>
        </div>
      </div>

      <div className="orders-grid">{orders.map((order) => (<OrderCard key={order.id} order={order} />))}</div>
    </section>
  );
}

export default OrdersSection;