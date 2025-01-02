"use client";

import React, { useEffect, useState } from "react";
import { ICartItem, ICartProduct, IProduct } from "@/lib/interfaces";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { fetchCart } from "./actions";
import CartProduct from "./components/cart-product";
import { Card } from "@/components/ui/card";

function Cart() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const cartItems: any = useCartStore((state) => state.cartItems);
  const editCart: any = useCartStore((state) => state.editCart);
  const totalQuantity: any = useCartStore((state) => state.totalQuantity);
  const totalPrice: any = useCartStore((state) => state.totalPrice);
  const setInitialCart: any = useCartStore((state) => state.setInitialCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await fetchCart();
        setInitialCart(cartData)
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
    <div className="flex gap-5 mb-10 mx-5 sm:mx-20 ">
      {cartProducts?.length > 0 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-5">
            {cartProducts?.map((elem: ICartProduct) => {
              return (
                <div key={elem?.id}>
                  <CartProduct
                    cartProduct={elem}
                    editCart={editCart}
                    cartItems={cartItems}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="min-w-72">
        <Card className="flex flex-col items-start p-8 gap-4 mx-auto">
          <p className="font-medium">Order Summary</p>
          <div className="w-full pl-2 grid grid-cols-2">
            <p>{`Subtotal (${totalQuantity}) `}</p>
            <p className="ml-auto">{totalPrice}</p>
          </div>
          <p></p>
        </Card>
      </div>
    </div>
  );
}

export default Cart;
