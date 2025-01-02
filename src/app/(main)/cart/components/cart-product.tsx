import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomTooltip from "@/components/ui/custom/tooltip-custom";
import { CartAction } from "@/lib/enums";
import { ICartProduct } from "@/lib/interfaces";
import { getQuantity } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface CartProductProps {
  cartProduct: ICartProduct;
  editCart: any;
  cartItems: any;
}
function CartProduct({ cartProduct, editCart, cartItems }: CartProductProps) {
  console.log("cartProduct", cartProduct);

  const addToCart = (id: number, productPrice: number) => {
    editCart(id, CartAction.ADD, productPrice);
  };

  const subtractToCart = (id: number, productPrice: number) => {
    editCart(id, CartAction.SUBTRACT, productPrice);
  };

  const deleteFromCart = (id: number, productPrice: number) => {
    editCart(id, CartAction.DELETE, productPrice);
    toast.warning("This item has been removed from your cart");
  };
  return (
    <Card
      key={cartProduct.id}
      className="flex items-start p-4 md:p-8 gap-4 mx-auto"
    >
      <div className="min-w-36 min-h-20">
        <Image
          src={cartProduct?.image}
          alt={cartProduct?.name}
          width={140}
          height={80}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <CardContent className="p-0">
          <p className="font-medium text-base">{cartProduct?.name}</p>

          <span className=" text-muted-foreground text-sm">Get it </span>
          <span className="text-emerald-500 text-sm">Tomorrow</span>
          <div className="flex items-center gap-0.5 mt-1.5">
            <span className="text-xs">SAR</span>
            <span className="font-medium text-lg">{cartProduct?.price}</span>
          </div>
        </CardContent>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <Button
            variant={"outline"}
            onClick={() => {
              deleteFromCart(cartProduct?.id, cartProduct?.price);
            }}
          >
            <Trash2 width={16} height={16} className="mr-2" />
            Remove
          </Button>
          <Badge
            className="flex justify-between bg-purple-950 rounded-lg"
            variant="outline"
          >
            <Button
              disabled={cartProduct?.quantity <= 1}
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-purple-800 hover:text-white"
              onClick={() => {
                subtractToCart(cartProduct?.id, cartProduct?.price);
              }}
            >
              <Minus width={20} height={20} />
            </Button>
            <p className="text-base font-medium text-white mx-2">
              {cartProduct?.quantity}
            </p>
            <Button
              disabled={cartProduct?.quantity >= cartProduct?.countAvailable}
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                addToCart(cartProduct?.id, cartProduct?.price);
              }}
            >
              <Plus width={20} height={20} />
            </Button>
          </Badge>
        </div>
      </div>
    </Card>
  );
}

export default CartProduct;
