import { useEffect, useState } from "react";
import api from "../services/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const ITEMS_PER_PAGE = 5;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
      setError("");
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // pagination logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-container">
      <h2>Products</h2>

      <ProductForm onProductAdded={fetchProducts} />

      <ProductList products={paginatedProducts} />

      {/* Pagination Controls */}
      {products.length > ITEMS_PER_PAGE && (
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
