import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

function ProductGrid({ products, wishlist, onToggleWishlist, onResetFilter }) {
  if (products.length === 0) {
    return <EmptyState onReset={onResetFilter} />;
  }

  return (
    <section className="product-grid" aria-label="Mahsulotlar katalogi">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isLiked={wishlist.includes(product.id)}
          onToggleWishlist={() => onToggleWishlist(product.id)}
        />
      ))}
    </section>
  );
}

export default ProductGrid;
