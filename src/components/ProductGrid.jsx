import { useStore } from "../context/store";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  const { t } = useStore();

  return (
    <section className="product-grid" aria-label={t("product.catalog")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
