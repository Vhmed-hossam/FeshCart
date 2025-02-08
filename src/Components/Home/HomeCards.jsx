import React from "react";
import { formatCurrency } from "../../helpers/currencyHelper";

export default function HomeCards({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{formatCurrency(product.price)}</p>
    </div>
  );
}
