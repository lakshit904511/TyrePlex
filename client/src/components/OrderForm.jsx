import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrderForm() {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ productId: "", qty: 1 }]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [items, products]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      setError("Failed to load products");
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    let sum = 0;

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        sum += product.price * item.qty;
      }
    });

    setTotal(sum);
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    if (!customerName) {
      setError("Customer name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await api.post("/orders", {
        customerName,
        items: items.map((i) => ({
          productId: i.productId,
          qty: Number(i.qty),
        })),
      });

      setCustomerName("");
      setItems([{ productId: "", qty: 1 }]);
      setTotal(0);
      setSuccess("Order created successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitOrder}>
      <h2>Create Order</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div>
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <h4>Items</h4>

      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.productId}
            onChange={(e) =>
              handleItemChange(index, "productId", e.target.value)
            }
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (₹{p.price})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              handleItemChange(index, "qty", Number(e.target.value))
            }
          />

          {items.length > 1 && (
            <button type="button" onClick={() => removeItem(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addItem}>
        Add Item
      </button>

      <h3>Total: ₹{total}</h3>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Order"}
      </button>
    </form>
  );
}
