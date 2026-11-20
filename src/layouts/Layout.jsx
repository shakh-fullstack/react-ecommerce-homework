import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div className="page-shell">
      <Header />

      <main className="container main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
