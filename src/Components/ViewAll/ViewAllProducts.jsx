import React from "react";
import { formatCurrency } from "../../helpers/currencyHelper";

export default function ViewAllProducts({ products }) {
  return (
    <div className="view-all-products">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{formatCurrency(product.price)}</p>
        </div>
      ))}
    </div>
  );
}
