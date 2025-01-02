"use client";

import React from "react";
import { ICartItem, IProduct } from "@/lib/interfaces";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import CartProduct from "./components/cart-product";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PagesURLS } from "@/constants/urls";

function Cart() {
  const router = useRouter();
  const cartItems: ICartItem[] = useCartStore((state) => state.cartItems);
  const editCart: any = useCartStore((state) => state.editCart);
  const totalQuantity: any = useCartStore((state) => state.totalQuantity);
  const totalPrice: any = useCartStore((state) => state.totalPrice);
  const clearCart: any = useCartStore((state) => state.clearCart);

  const checkout = () => {
    clearCart();
    toast.success("Your order is placed successfully with id 2175.");
    router.push(PagesURLS.orders);
  };

  return (
    <div className="mb-10 mx-5 sm:mx-32 xl:mx-64">
      {cartItems?.length > 0 && (
        <p className="text-2xl font-semibold mb-6">Shopping Cart</p>
      )}
      {cartItems?.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="w-full flex flex-col">
            <div className="grid grid-cols-1 gap-5">
              {cartItems?.map((elem: ICartItem) => {
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
              <p className="font-semibold">Order Summary</p>
              <div className="w-full pl-2 grid grid-cols-2 gap-2">
                <p>{`Subtotal (${totalQuantity}) `}</p>
                <p className="ml-auto font-semibold">SAR {totalPrice}</p>
                <p>{`Shipping Fee`}</p>
                <p className="ml-auto text-emerald-500">FREE</p>
              </div>
              <Button
                variant={"primary"}
                className="w-full font-semibold text-base"
                onClick={() => {
                  checkout();
                }}
              >
                Checkout
              </Button>
            </Card>
            <Button
              className="w-full mt-4 px-8"
              variant={"destructive"}
              onClick={() => {
                clearCart();
              }}
            >
              {/* TODO ==> must show dialog to validate action */}
              <Trash2 width={20} height={20} className="mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      )}
      {cartItems?.length === 0 && (
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
    </div>
  );
}

export default Cart;
