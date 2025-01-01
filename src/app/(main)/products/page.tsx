// "use client";

import React, { useEffect } from "react";
import { fetchProducts } from "./actions";
import { IProduct } from "@/lib/interfaces";
import ProductCard from "./components/product-card";

async function Products() {
  const products: IProduct[] = await fetchProducts();
  return (
    <div className="mx-5 sm:mx-20 grid sm:grid-cols-1 xl:grid-cols-3 gap-5">
      {products?.map((elem: IProduct) => {
        return (
          <div key={elem?.id}>
            <ProductCard product={elem}/>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
