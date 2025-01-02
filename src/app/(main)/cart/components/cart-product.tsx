import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomTooltip from "@/components/ui/custom/tooltip-custom";
import { CartAction } from "@/lib/enums";
import { ICartProduct } from "@/lib/interfaces";
import { getQuantity } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface CartProductProps {
  cartProduct: ICartProduct;
  editCart: any;
  cartItems: any;
}
function CartProduct({ cartProduct, editCart, cartItems }: CartProductProps) {
  const addToCart = (id: number, productPrice: number) => {
    editCart(id, CartAction.ADD, productPrice);
  };

  const deleteFromCart = (id: number) => {
    editCart(id, CartAction.DELETE);
    toast.warning("This item has been removed from your cart");
  };
  return (
    <Card key={cartProduct.id} className="flex items-start p-4 md:p-8 gap-4 mx-auto">
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
          <div className="flex flex-col gap-1 md:flex-row justify-between">
            <CustomTooltip info={cartProduct?.name}>
              <p className="font-medium text-base md:text-xl">
                {cartProduct?.name}
              </p>
            </CustomTooltip>
            <Badge className="rounded-lg bg-purple-950 max-w-[86px]">
              <p className="text-xs text-white">
                Quantity: {cartProduct?.quantity}
              </p>
            </Badge>
          </div>
          <span className=" text-muted-foreground text-sm">Get it </span>
          <span className="text-emerald-500 text-sm">Tomorrow</span>
          <div className="flex items-center gap-0.5 mt-1.5">
            <span className="text-xs">SAR</span>
            <span className="font-medium text-lg">{cartProduct?.price}</span>
          </div>
        </CardContent>
        <div>
          <Button variant={"outline"}>
            <Trash2 width={16} height={16} className="mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CartProduct;
