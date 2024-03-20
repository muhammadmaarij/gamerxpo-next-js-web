// pages/product/[productId].js
import React from "react";
import { useRouter } from "next/router";
import Product from "../../components/Product";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <Product productId={productId} />;
};

export default ProductPage;
