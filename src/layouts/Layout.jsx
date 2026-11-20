import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import OrderModal from "../components/OrderModal";
import { useStore } from "../context/store";

function Layout() {
  const { notice, hideNotice, t } = useStore();

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(hideNotice, 3500);
    return () => clearTimeout(timer);
  }, [notice, hideNotice]);

  return (
    <div className="page-shell">
      <Header />

      <main className="container main-content">
        <Outlet />
      </main>

      <OrderModal />

      {notice && (
        <div key={notice.id} className="toast" role="status">
          {t(notice.key, notice.params)}
        </div>
      )}

      <ScrollRestoration />
    </div>
  );
}

export default Layout;
