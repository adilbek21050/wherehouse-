import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../store";
import "./WereHouse.css";
export default function WereHouse() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.warehouse.products);
  const search = useSelector((state) => state.warehouse.search);
console.log(products);
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
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
        onChange={(e) => dispatch(setSearch(e.target.value))}
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
            <h2 className="productName">{product.name}</h2>
            <h4>{product.color}</h4>
            <p>
              <strong>Остаток:</strong>{" "}
              <span
                style={{
                  color: product.stock <= 3 ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {product.stock} шт.
              </span>
            </p>
            <p>{product.barcode}</p>
            <p>
              <strong>Место хранения:</strong>{" "}
              Стеллаж-{product.rack} / Ярус-{product.level}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
