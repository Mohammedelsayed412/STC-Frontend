"use client";

import React, { useEffect, useState } from "react";
import { ICartItem, ICartProduct, IProduct } from "@/lib/interfaces";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { fetchCart } from "./actions";
import CartProduct from "./components/cart-product";

function Cart() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const editCart: any = useCartStore((state) => state.editCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData: ICartProduct[] = await fetchCart();

        setCartProducts(cartData);
        setTotalPages(totalPages);
      } catch (error: any) {
        setCartProducts([]);
        setTotalPages(totalPages);
        toast.error("Issue happened, Please try again later");
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <>
      {cartProducts?.length > 0 && (
        <div className="mb-10 mx-5 sm:mx-20">
          <div className="grid grid-cols-1 gap-5">
            {cartProducts?.map((elem: ICartProduct) => {
              return (
                <div key={elem?.id}>
                  <CartProduct cartProduct={elem} editCart={editCart} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
