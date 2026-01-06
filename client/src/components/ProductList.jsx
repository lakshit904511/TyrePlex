import { useState } from "react";
import api from "../services/api";

export default function ProductList({ products }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const startEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({});
    setError("");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async (id) => {
    try {
      setError("");

      await api.put(`/products/${id}`, {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await api.delete(`/products/${id}`);
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cannot delete product. It may be used in an order."
      );
    }
  };

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="product-table" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {editId === product.id ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                ) : (
                  product.name
                )}
              </td>

              <td>{product.sku}</td>

              <td>
                {editId === product.id ? (
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                  />
                ) : (
                  product.price
                )}
              </td>

              <td>
                {editId === product.id ? (
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                  />
                ) : (
                  product.stock
                )}
              </td>

              <td>
                {editId === product.id ? (
                  <>
                    <button onClick={() => saveEdit(product.id)}>
                      Save
                    </button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
