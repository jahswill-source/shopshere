import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaTimes,
  FaShoppingCart,
} from "react-icons/fa";

function Cart({
  cart,
  cartCount,
  cartTotal,
  formatPrice,
  changeQuantity,
  removeFromCart,
  setCartOpen,
  showNotice,
}) {
  return (
    <div
      className="cart-overlay"
      onClick={() => setCartOpen(false)}
    >
      <aside
        className="cart-panel"
        onClick={(event) => event.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>

            <p>{cartCount} item(s)</p>
          </div>

          <button
            className="icon-button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <FaShoppingCart />

            <h3>Your cart is empty</h3>

            <p>Add products to see them here.</p>

            <button
              className="primary-button"
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p>{formatPrice(item.price)}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <FaMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <FaPlus />
                      </button>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>

                <strong>
                  {formatPrice(cartTotal)}
                </strong>
              </div>

              <button
                className="primary-button checkout-button"
                onClick={() =>
                  showNotice(
                    "Demo checkout: payment has not been configured."
                  )
                }
              >
                Proceed to Checkout
              </button>

              <button
                className="secondary-button"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;