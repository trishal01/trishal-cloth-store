import { useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { PRIMARY_COLOR } from "../utils/constants";

function ProductListing() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://my-json-server.typicode.com/Gulzeesh/demo/products");

  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState({
    gender: [],
    colour: [],
    type: [],
    price: [],
  });

  const { addToCart } = useContext(CartContext);

  const filteredProducts = products.filter((item) => {
    const search = searchText.toLowerCase().trim();

    // 🔍 SEARCH LOGIC
    const matchesSearch = search
      ? search.split(" ").every((word) => {
          const name = item.name?.toLowerCase() || "";
          const colour = item.colour?.toLowerCase() || "";
          const type = item.type?.toLowerCase() || "";

          return (
            name.includes(word) || colour.includes(word) || type.includes(word)
          );
        })
      : true;

    // FILTER LOGIC
    const matchesGender =
      filters.gender.length === 0 ||
      filters.gender.some(
        (g) => g.toLowerCase() === item.gender?.toLowerCase(),
      );

    const matchesColour =
      filters.colour.length === 0 ||
      filters.colour.some((c) => {
        const colour = item.colour?.toLowerCase() || "";
        const name = item.name?.toLowerCase() || "";

        return (
          colour.includes(c.toLowerCase()) || name.includes(c.toLowerCase())
        );
      });

    const matchesType =
      filters.type.length === 0 ||
      filters.type.some((t) => t.toLowerCase() === item.type?.toLowerCase());

    const matchesPrice =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        if (range === "0-250") return item.price >= 0 && item.price <= 250;
        if (range === "251-450") return item.price >= 251 && item.price <= 450;
        if (range === "451+") return item.price >= 451;
        return false;
      });

    return (
      matchesSearch &&
      matchesGender &&
      matchesColour &&
      matchesType &&
      matchesPrice
    );
  });

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[category].includes(value);

      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter((v) => v !== value) // remove
          : [...prev[category], value], // add
      };
    });
  };

  if (loading) return <h2>products loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            padding: "20px",
            borderRight: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "6px",
            marginBottom: "15px",
          }}
        >
          <h3>Filters</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "10px" }}>Gender</p>
            {["Men", "Women"].map((g) => (
              <div key={g} style={{ marginBottom: "5px" }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleFilterChange("gender", g)}
                  />
                  {g}
                </label>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "10px" }}>Colour</p>
            {["Red", "Blue", "Green"].map((c) => (
              <div key={c} style={{ marginBottom: "5px" }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleFilterChange("colour", c)}
                  />
                  {c}
                </label>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "10px" }}>Type</p>
            {["Polo", "Hoodie", "Basic"].map((t) => (
              <div key={t} style={{ marginBottom: "5px" }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleFilterChange("type", t)}
                  />
                  {t}
                </label>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "15px",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "10px" }}>Price</p>
            {["0-250", "251-450", "451+"].map((p) => (
              <div key={p} style={{ marginBottom: "5px" }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleFilterChange("price", p)}
                  />
                  {p}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-button-container"
              style={{ padding: "10px", width: "60%" }}
            />
          </div>

          {/* Products */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <img
                  src={item.imageURL}
                  alt={item.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListing;
