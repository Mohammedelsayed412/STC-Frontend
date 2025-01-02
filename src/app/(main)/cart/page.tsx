"use client";

import React, { useEffect, useState } from "react";
import { ICartItem, ICartProduct, IProduct } from "@/lib/interfaces";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { fetchCart } from "./actions";
import CartProduct from "./components/cart-product";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const cartItems: any = useCartStore((state) => state.cartItems);
  const editCart: any = useCartStore((state) => state.editCart);
  const totalQuantity: any = useCartStore((state) => state.totalQuantity);
  const totalPrice: any = useCartStore((state) => state.totalPrice);
  const setInitialCart: any = useCartStore((state) => state.setInitialCart);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cartData = await fetchCart();
        setInitialCart(cartData);
      } catch (error: any) {
        setInitialCart([]);
        toast.error("Issue happened, Please try again later");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {cartItems?.length > 0 && !isLoading && (
        <div className="flex flex-col lg:flex-row gap-5 mb-10 mx-5 sm:mx-32 xl:mx-64">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-5">
              {cartItems?.map((elem: ICartProduct) => {
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
      )}
      {cartItems?.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-8 text-center">
          <div className="mb-6">
            <ShoppingCart className="w-16 h-16 text-slate-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Looks like you haven't added anything to your cart yet. Start
            shopping to find amazing products!
          </p>
          <Link
            href="/products"
            className={`${buttonVariants({ variant: "outline" })}`}
          >
            Start Shopping
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Cart;
