import { useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AuthModal from "./components/AuthModal";
import { products } from "./data/products";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [darkMode, setDarkMode] = useState(false);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [authMode, setAuthMode] = useState(null);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty",
    "Sports",
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(activeSearch.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeSearch, category, sort]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function handleSearch(event) {
    event.preventDefault();

    setActiveSearch(search.trim());
  }

  function clearSearch() {
    setSearch("");
    setActiveSearch("");
  }

  function resetSearch() {
    clearSearch();
    setCategory("All");
    setSort("default");
  }

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showNotice(`${product.name} added to cart!`);
  }

  function changeQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  function toggleWishlist(id) {
    setWishlist((previousWishlist) =>
      previousWishlist.includes(id)
        ? previousWishlist.filter(
            (item) => item !== id
          )
        : [...previousWishlist, id]
    );
  }

  function showNotice(message) {
    setNotice(message);

    setTimeout(() => {
      setNotice("");
    }, 2500);
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        cartCount={cartCount}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setCartOpen={setCartOpen}
        resetSearch={resetSearch}
        setAuthMode={setAuthMode}
      />

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              WELCOME TO SHOPSPHERE
            </span>

            <h1>
              Your One-Stop Shop
              <br />
              <span>for Everything You Need</span>
            </h1>

            <p>
              Find great products at great prices.
              Shop smarter and discover something new.
            </p>

            <SearchBar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              clearSearch={clearSearch}
            />

            <div className="search-tips">
              Popular searches: Headphones, Smart Watch, Shoes
            </div>
          </div>
        </section>

        <section className="shop-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                OUR COLLECTION
              </span>

              <h2>
                {activeSearch
                  ? `Results for "${activeSearch}"`
                  : "Featured Products"}
              </h2>

              <p>
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="sort-control">
              <label htmlFor="sort">Sort by:</label>

              <select
                id="sort"
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
              >
                <option value="default">Featured</option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>
              </select>
            </div>
          </div>

          <div className="category-list" id="categories">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <ProductList
            products={filteredProducts}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            formatPrice={formatPrice}
            clearFilters={resetSearch}
          />
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          ShopSphere
        </a>

        <p>Discover more. Shop smarter.</p>

        <p>
          © {new Date().getFullYear()} ShopSphere
        </p>
      </footer>

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {cartOpen && (
        <Cart
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          formatPrice={formatPrice}
          changeQuantity={changeQuantity}
          removeFromCart={removeFromCart}
          setCartOpen={setCartOpen}
          showNotice={showNotice}
        />
      )}
      {
        authMode && (
          <AuthModal
          mode={authMode}
          setAuthMode={setAuthMode}
          onClose={() =>
            setAuthMode(null) }
            showNotice={showNotice}
            />
        )
      }
    </div>
  );
}

export default App;