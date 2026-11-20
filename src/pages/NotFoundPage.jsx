import { Link } from "react-router-dom";
import { SearchIcon } from "../components/Icons";
import { useStore } from "../context/store";

// isError=true bo'lsa — kutilmagan xatolik matni, aks holda 404
function NotFoundPage({ isError = false }) {
  const { t } = useStore();

  return (
    <section className="cart-page-section">
      <div className="empty-state">
        <div className="empty-state-icon">
          <SearchIcon size={26} />
        </div>
        <h3 className="empty-state-title">
          {isError ? t("notFound.errorTitle") : `404 — ${t("notFound.title")}`}
        </h3>
        <p className="empty-state-desc">
          {isError ? t("notFound.errorDesc") : t("notFound.desc")}
        </p>
        <Link to="/" className="empty-state-btn">
          {t("notFound.home")}
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
