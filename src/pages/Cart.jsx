import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import Navbar from "../components/Navbar";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.cartQty || 1),
    0,
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Shopping Cart</h2>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            {/* Image */}
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />

            {/* Name */}
            <div style={{ flex: 2, paddingLeft: "10px" }}>{item.name}</div>

            {/* Price */}
            <div style={{ flex: 1 }}>₹ {item.price}</div>

            {/* Quantity */}
            <div style={{ flex: 1 }}>
              <p>{item.cartQty || 1}</p>
            </div>

            {/* Delete */}
            <div style={{ flex: 1, cursor: "pointer" }}>
              <span onClick={() => removeFromCart(item.id)}>🗑️</span>
            </div>
          </div>
        ))}

        {/* Total */}
        <div
          style={{
            marginTop: "20px",
            borderTop: "2px solid black",
            paddingTop: "10px",
          }}
        >
          <h3>Total: ₹ {totalAmount}</h3>
        </div>
      </div>
    </>
  );
}

export default Cart;
