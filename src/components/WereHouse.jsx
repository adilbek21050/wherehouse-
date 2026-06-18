import React, { useEffect, useState } from "react";

const defaultProducts = [
  {
    id: 1,
    barcode: "4601234567890",
    name: "Молоко 1л",
    price: 85,
    stock: 24,
    rack: "A",
    level: "2",
  },
  {
    id: 2,
    barcode: "4601234567891",
    name: "Хлеб белый",
    price: 45,
    stock: 15,
    rack: "A",
    level: "2",
  },
  {
    id: 3,
    barcode: "4601234567892",
    name: "Сахар 1кг",
    price: 72,
    stock: 8,
    rack: "A",
    level: "2",
  },
  {
    id: 4,
    barcode: "4601234567893",
    name: "Чай черный",
    price: 120,
    stock: 31,
    rack: "A",
    level: "2",
  },
  {
    id: 5,
    barcode: "4601234567894",
    name: "Кофе растворимый",
    price: 350,
    stock: 5,
    rack: "A",
    level: "2",
  },
];

export default function App() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("warehouse_products");
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem(
      "warehouse_products",
      JSON.stringify(products)
    );
  }, [products]);

  const updateProduct = (id, field, value) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.barcode.includes(search)
  );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>Учет товаров на складе</h1>

      <input
        type="text"
        placeholder="Поиск по названию или штрихкоду..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {filteredProducts.length === 0 ? (
        <p>Товар не найден.</p>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{product.name}</h2>

          


            <p>
              <strong>Остаток:</strong>{" "}
              <span
                style={{
                  color:
                    product.stock <= 5 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {product.stock} шт.
              </span>
            </p>

            <p>
              <strong>Место хранения:</strong>{" "}
              Стеллаж-{product.rack} / Ярус-{product.level}
            </p>

            <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div>
                <label>Стеллаж</label>
                <br />
                <select
                  value={product.rack}
                  onChange={(e) =>
                    updateProduct(
                      product.id,
                      "rack",
                      e.target.value
                    )
                  }
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div>
                <label>Ярус</label>
                <br />
                <select value={product.level}
                  onChange={(e) => updateProduct(product.id, "level",e.target.value  ) }>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}