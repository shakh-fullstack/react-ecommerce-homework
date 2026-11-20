import { useStore } from "../context/store";
import { CATEGORIES } from "../data/products";
import { CheckCircleIcon, CloseIcon, HeartIcon } from "./Icons";

function FilterBar({ resultsCount }) {
  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    onlyWishlist,
    setOnlyWishlist,
    onlyInStock,
    setOnlyInStock,
    sortBy,
    setSortBy,
    t,
  } = useStore();

  const trimmedQuery = searchQuery.trim();

  return (
    <section className="filter-bar" aria-label={t("filter.ariaLabel")}>
      <div className="filter-categories">
        {CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            className={`filter-tab ${category === key ? "active" : ""}`}
            onClick={() => setCategory(key)}
          >
            {t(`category.${key}`)}
          </button>
        ))}
      </div>

      <div className="filter-controls">
        {trimmedQuery && (
          <button
            type="button"
            className="search-chip"
            onClick={() => setSearchQuery("")}
            aria-label={t("filter.clearSearch")}
          >
            <span>{t("filter.searchChip", { query: trimmedQuery })}</span>
            <CloseIcon />
          </button>
        )}

        <button
          type="button"
          className={`wishlist-toggle ${onlyInStock ? "active" : ""}`}
          aria-pressed={onlyInStock}
          onClick={() => setOnlyInStock(!onlyInStock)}
        >
          <CheckCircleIcon />
          <span>{t("filter.onlyInStock")}</span>
        </button>

        <button
          type="button"
          className={`wishlist-toggle ${onlyWishlist ? "active" : ""}`}
          aria-pressed={onlyWishlist}
          onClick={() => setOnlyWishlist(!onlyWishlist)}
        >
          <HeartIcon filled={onlyWishlist} />
          <span>{t("filter.onlyWishlist")}</span>
        </button>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">{t("filter.sortDefault")}</option>
          <option value="price-asc">{t("filter.sortAsc")}</option>
          <option value="price-desc">{t("filter.sortDesc")}</option>
        </select>

        <span className="results-count">{t("filter.results", { count: resultsCount })}</span>
      </div>
    </section>
  );
}

export default FilterBar;
