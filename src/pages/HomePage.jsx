import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import OrdersSection from "../components/OrdersSection";
import EmptyState from "../components/EmptyState";
import { useStore } from "../context/store";

function sortProducts(list, sortBy) {
  if (sortBy === "price-asc") return [...list].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

function HomePage() {
  const {
    catalog,
    searchQuery,
    category,
    onlyWishlist,
    onlyInStock,
    wishlist,
    sortBy,
    resetFilters,
  } = useStore();

  const query = searchQuery.trim().toLowerCase();

  // 1) qidiruv  2) kategoriya  3) faqat sevimlilar  4) faqat mavjudlari
  const filteredProducts = catalog.filter((product) => {
    const matchesSearch =
      !query ||
      [product.title, product.categoryLabel, product.specs].some((text) =>
        text.toLowerCase().includes(query)
      );
    const matchesCategory = category === "all" || product.category === category;
    const matchesWishlist = !onlyWishlist || wishlist.includes(product.id);
    const matchesStock = !onlyInStock || product.stock > 0;

    return matchesSearch && matchesCategory && matchesWishlist && matchesStock;
  });

  // 5) saralash
  const visibleProducts = sortProducts(filteredProducts, sortBy);

  return (
    <>
      <FilterBar resultsCount={visibleProducts.length} />

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <EmptyState searchQuery={searchQuery.trim()} onReset={resetFilters} />
      )}

      <OrdersSection />
    </>
  );
}

export default HomePage;
