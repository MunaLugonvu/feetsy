import React, { useState } from "react";
import useFetch from "./services/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState();

  const { data: product, loading, error } = useFetch(`products/${id}`);
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What Size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))} 
      </select>
      <p>
        <button  disabled={!sku} 
        className="btn btn-primary"
          onClick={() =>{
            props.addToCart(id,sku)
            navigate("/cart")
          }
          }>
          {" "}
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
