import { useState } from "react";
import api from "../services/api";

export default function OrderList({ orders, onOrderCancelled }) {
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const cancelOrder = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      setError("");
      await api.put(`/orders/${id}/cancel`);
      onOrderCancelled();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="order-card">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div>
            <strong>Customer:</strong> {order.customerName}
          </div>
          <div>
            <strong>Status:</strong> {order.status}
          </div>
          <div>
            <strong>Total:</strong> ₹{order.totalAmount}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>

          <button className="order-actions" onClick={() => toggleExpand(order.id)}>
            {expandedId === order.id ? "Hide Details" : "View Details"}
          </button>

          {order.status === "created" && (
            <button
              className="order-actions"
              onClick={() => cancelOrder(order.id)}
              style={{ marginLeft: "10px" }}
            >
              Cancel Order
            </button>
          )}

          {expandedId === order.id && (
            <div style={{ marginTop: "10px" }}>
              <h4>Items</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product ID: {item.productId}, Qty: {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
