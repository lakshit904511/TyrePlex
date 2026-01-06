import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#2c3e50",
        padding: "12px",
      }}
    >
      <Link to="/products" style={linkStyle}>
        Products
      </Link>
      <Link to="/create-order" style={linkStyle}>
        Create Order
      </Link>
      <Link to="/orders" style={linkStyle}>
        Orders
      </Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
  fontWeight: "bold",
};
