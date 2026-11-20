import { useStore } from "../context/store";
import { SearchIcon } from "./Icons";

function EmptyState({ searchQuery, onReset }) {
  const { t } = useStore();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <SearchIcon size={26} />
      </div>

      <h3 className="empty-state-title">{t("empty.title")}</h3>
      <p className="empty-state-desc">
        {searchQuery
          ? t("empty.withQuery", { query: searchQuery })
          : t("empty.withFilters")}{" "}
        {t("empty.hint")}
      </p>

      <button type="button" className="empty-state-btn" onClick={onReset}>
        {t("empty.reset")}
      </button>
    </div>
  );
}

export default EmptyState;
