import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../store";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.warehouse.products);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode.includes(search)
  );

  return (
    <div className="container">
      <h1>Админ панель</h1>
      <input
        type="text"
        placeholder="Поиск по названию или штрихкоду..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "15px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <div style={search.length === 0 ? { display: "none" } : { display: "block" }} className="productList"> 
      {filteredProducts.length === 0 ? (
        <p>Товар не найден.</p>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <h2>{product.name}</h2>
              <span>Штрихкод: {product.barcode}</span>
            </div>
            
            <div className="product-controls" style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
              <div>
                <label>Стеллаж</label>
                <br />
                <select
                  value={product.rack}
                  onChange={(e) =>
                    dispatch(
                      updateProduct(product.id, {
                        rack: e.target.value,
                      })
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
                <select
                  value={product.level}
                  onChange={(e) =>
                    dispatch(
                      updateProduct(product.id, {
                        level: e.target.value,
                      })
                    )
                  }
                >
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
    </div>
  );
}

export default Admin;
