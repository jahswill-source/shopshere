import { FaSearch } from "react-icons/fa";
import ProductCard from "./ProductCard";

function ProductList({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
  formatPrice,
  clearFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="empty-results">
        <FaSearch />

        <h3>No products found</h3>

        <p>
          Try another search or select a different category.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={clearFilters}
        >
          Show All Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
}

export default ProductList;