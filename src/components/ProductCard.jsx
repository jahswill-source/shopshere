import {
  FaHeart,
  FaStar,
} from "react-icons/fa";

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
  formatPrice,
}) {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <button
          type="button"
          className={
            isWishlisted
              ? "wishlist-button selected"
              : "wishlist-button"
          }
          onClick={() => toggleWishlist(product.id)}
          aria-label={`Toggle ${product.name} wishlist`}
          title="Add to wishlist"
        >
          <FaHeart />
        </button>

        <span className="product-category">
          {product.category}
        </span>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <FaStar />

          <span>{product.rating}</span>
        </div>

        <h3>{product.name}</h3>

        <div className="product-bottom">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            className="add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;