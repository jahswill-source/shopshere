import { useState } from "react";
import { FaTimes, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function AuthModal({ mode, setAuthMode, onClose, showNotice }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  function handleSubmit(event) {
    event.preventDefault();

    showNotice(
      "Demo only: connect an authentication service to create real accounts."
    );

    onClose();
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="auth-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="auth-heading">
          <h2>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <p>
            {isRegister
              ? "Join ShopSphere and discover amazing products."
              : "Login to your ShopSphere account."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="auth-input">
              <FaUser />

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-input">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input">
            <FaLock />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() =>
              setAuthMode(isRegister ? "login" : "register")
            }
          >
            {isRegister ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;