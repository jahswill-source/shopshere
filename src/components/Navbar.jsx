import {
  FaStore,
  FaShoppingCart,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Navbar({
  cartCount,
  darkMode,
  setDarkMode,
  setCartOpen,
  resetSearch,
  setAuthMode,
}) {
  return (
    <header className="navbar">
      <a
        href="#home"
        className="logo"
        onClick={resetSearch}
      >
        <FaStore />

        <span>
          Shop<span className="logo-accent">Sphere</span>
        </span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#categories">Categories</a>
      </nav>

      <div className="nav-actions">

        <button
          className="icon-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="login-button"
          onClick={() => setAuthMode("login")}
        >
          Login
        </button>

        <button
          className="register-button"
          onClick={() => setAuthMode("register")}
        >
          Create Account
        </button>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          <FaShoppingCart />

          <span>Cart</span>

          <span className="cart-count">
            {cartCount}
          </span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;