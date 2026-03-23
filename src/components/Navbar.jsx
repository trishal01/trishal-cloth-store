import { Link, useLocation } from "react-router-dom";
import { PRIMARY_COLOR } from "../utils/constants";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 20px",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: PRIMARY_COLOR }}>Store</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Products */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: isActive("/") ? PRIMARY_COLOR : "#333",
            fontWeight: isActive("/") ? "bold" : "normal",
          }}
        >
          Products
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          style={{
            textDecoration: "none",
            color: isActive("/cart") ? PRIMARY_COLOR : "#333",
            fontWeight: isActive("/cart") ? "bold" : "normal",
          }}
        >
          🛒 Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
