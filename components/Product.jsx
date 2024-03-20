import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/product.css";

const Product = () => {
  const [prod, setProd] = useState({
    id: 0,
    name: "",
    product_image: "",
    price: "",
  });

  const router = useRouter();
  const { productId } = router.query; // This corresponds to the [productId].js file in your pages directory

  useEffect(() => {
    // Only attempt to fetch data when productId is available
    if (productId) {
      getProduct();
    }
  }, [productId]);

  const getProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/${productId}/`
      ); // Make sure API_URL is correctly configured
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProd(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const handleCheckout = () => {
    router.push(`/checkout/${prod.id}`);
  };

  return (
    <div className="container">
      <div className="card">
        {/* Next.js uses a basePath which can simplify how static assets are referred */}
        <img
          src={"http://localhost:8000/" + prod.product_image}
          alt=""
          className="p_img"
        />
        <div>
          <h3>{prod.name}</h3>
          <p>$ {prod.price}</p>
        </div>
        <button onClick={handleCheckout} className="btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Product;
