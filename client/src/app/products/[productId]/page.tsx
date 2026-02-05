"use client";
import { useParams } from "next/navigation";
import ProductDetails from "@/components/Product/ProductDetails";

const ProductPage = () => {
  const params = useParams();
  let productId = params?.productId;

  // normalize to a string
  if (Array.isArray(productId)) {
    productId = productId[0]; // take the first element
  }

  // guard against missing ID
  if (!productId) return <div className="text-center py-20">Invalid product ID</div>;

  return <ProductDetails productId={productId} />;
};

export default ProductPage;
