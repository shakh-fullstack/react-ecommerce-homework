import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import OrdersSection from "../components/OrdersSection";

function HomePage({
  products,
  wishlist,
  onlyWishlist,
  onToggleWishlist,
  onToggleOnlyWishlist,
  onResetWishlistFilter,
}) {
  const filteredProducts = onlyWishlist
    ? products.filter((product) => wishlist.includes(product.id))
    : products;

  return (
    <>
      <FilterBar
        onlyWishlist={onlyWishlist}
        onToggleOnlyWishlist={onToggleOnlyWishlist}
        resultsCount={filteredProducts.length}
      />
      <ProductGrid
        products={filteredProducts}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onResetFilter={onResetWishlistFilter}
      />
      <OrdersSection />
    </>
  );
}

export default HomePage;
