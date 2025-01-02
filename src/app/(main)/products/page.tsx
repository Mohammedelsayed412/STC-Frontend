"use client";

import React, { useEffect, useState } from "react";
import { editCartItems, fetchProducts } from "./actions";
import { ICartItem, IProduct } from "@/lib/interfaces";
import ProductCard from "./components/product-card";
import PaginationComponent from "./components/pagination";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const cartItems: ICartItem[] = useCartStore((state) => state.cartItems);
  const editCart: any = useCartStore((state) => state.editCart);
  const getQuantityById: any = useCartStore((state) => state.getQuantityById);

  useEffect(() => {
    const editCartAction = async () => {
      console.log('inn');
      
      try {
        await editCartItems(cartItems);
      } catch (error) {}
    };
    editCartAction();
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { productsData, totalPages } = await fetchProducts(currentPage);

        setProducts(productsData);
        setTotalPages(totalPages);
      } catch (error: any) {
        setProducts([]);
        setTotalPages(totalPages);
        toast.error("Issue happened, Please try again later");
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <>
      {products?.length > 0 && (
        <div className="mb-10 mx-5 sm:mx-20">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products?.map((elem: IProduct) => {
              return (
                <div key={elem?.id}>
                  <ProductCard
                    product={elem}
                    editCart={editCart}
                    getQuantityById={getQuantityById}
                  />
                </div>
              );
            })}
          </div>

          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  );
}

export default Products;
