import React from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import Container from "@/components/Shared/Container";

const ProductsPage: React.FC = () => {
  return (
    <Container>
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
        <ProductGrid />
      </main>
    </Container>
  );
};

export default ProductsPage;
