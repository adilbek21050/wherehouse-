import React, { useState } from "react";

export default function App() {
  const products = [
    {
      id: 1,
      barcode: "4601234567890",
      name: "Молоко 1л",
      price: 85,
      stock: 24,
      location: "Стеллаж-A / Ярус-2",
    },
    {
      id: 2,
      barcode: "4601234567891",
      name: "Хлеб белый",
      price: 45,
      stock: 15,
      location: "Стеллаж-A / Ярус-2",
    },
    {
      id: 3,
      barcode: "4601234567892",
      name: "Сахар 1кг",
      price: 72,
      stock: 8,
      location: "Стеллаж-A / Ярус-2",
    },
    {
      id: 4,
      barcode: "4601234567893",
      name: "Чай черный",
      price: 120,
      stock: 31,
      location: "Стеллаж-A / Ярус-2",
    },
    {
      id: 5,
      barcode: "4601234567894",
      name: "Кофе растворимый",
      price: 350,
      stock: 5,
      location: "Стеллаж-A / Ярус-2",
    },
  ];

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (value) => {
    setSearch(value);

    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.barcode.includes(value)
    );

    setFilteredProducts(result);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Учет товаров на складе</h1>

      <input
        type="text"
        placeholder="Поиск по названию или штрихкоду..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
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
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{product.name}</h2>

            <p>
              <strong>Штрихкод:</strong> {product.barcode}
            </p>

            <p>
              <strong>Цена:</strong> {product.price} сом
            </p>

            <p>
              <strong>Остаток:</strong>{" "}
              <span
                style={{
                  color: product.stock <= 5 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {product.stock} шт.
              </span>
            </p>

            <p>
              <strong>Местоположение:</strong> {product.location}
            </p>
          </div>
        ))
      )}
    </div>
  );
}