import { useState } from "react";
import api from "../services/api";

export default function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic UI validation
    if (form.name.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/products", {
        name: form.name,
        sku: form.sku,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      // reset form
      setForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      // refresh product list
      onProductAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add Product</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
