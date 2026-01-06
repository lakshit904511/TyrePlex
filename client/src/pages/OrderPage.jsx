import { useEffect, useState } from "react";
import api from "../services/api";
import OrderList from "../components/OrderList";

const ITEMS_PER_PAGE = 5;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
      setError("");
    } catch {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // pagination logic
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-container">
      <h2>Orders</h2>

      <OrderList
        orders={paginatedOrders}
        onOrderCancelled={fetchOrders}
      />

      {/* Pagination Controls */}
      {orders.length > ITEMS_PER_PAGE && (
        <div style={{ marginTop: "15px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
