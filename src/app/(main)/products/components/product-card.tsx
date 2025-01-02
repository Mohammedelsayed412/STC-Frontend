import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomTooltip from "@/components/ui/custom/tooltip-custom";
import { CartAction } from "@/lib/enums";
import { IProduct } from "@/lib/interfaces";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: IProduct;
  editCart: any;
  getQuantityById: any;
}
function ProductCard({ product, editCart, getQuantityById }: ProductCardProps) {
  const addToCart = (product: IProduct) => {
    editCart(CartAction.ADD, product);
    toast.success("This item has been added to your cart");
  };

  const deleteFromCart = (product: IProduct) => {
    editCart(CartAction.DELETE, product);
    toast.warning("This item has been removed from your cart");
  };
  return (
    <Card
      key={product.id}
      className="flex flex-col p-8 h-full gap-2 max-w-[300px] mx-auto"
    >
      <div className="relative">
        <Image
          src={product?.image}
          alt={product?.name}
          width={240}
          height={140}
          className="rounded-lg mx-auto"
        />
        {product?.isBestSeller && (
          <Badge
            className="absolute top-1 right-1.5 bg-yellow-400 rounded-2xl text-xs px-1"
            variant="outline"
          >
            Best Seller
          </Badge>
        )}
      </div>

      <CardContent className="p-0 mt-2 h-full">
        <CustomTooltip info={product?.name}>
          <p className="font-medium truncate">{product?.name}</p>
        </CustomTooltip>
        <p className=" text-muted-foreground text-sm">{product?.brand}</p>
        <div className="flex items-start mt-1.5">
          <span className="text-xs  mr-0.5 mt-[0.5px]">SAR</span>
          <span className="font-medium ">{product?.price}</span>
        </div>
        {product?.countAvailable < 3 && product?.countAvailable > 0 && (
          <span className="text-xs text-red-500">
            {`Only ${product?.countAvailable} available in stock`}
          </span>
        )}
      </CardContent>
      {getQuantityById(product?.id) ? (
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteFromCart(product);
          }}
        >
          <Image
            className="mr-2"
            src={"/remove-from-cart.svg"}
            alt="Remove From Cart"
            width={20}
            height={20}
          />
          Remove From Cart
        </Button>
      ) : product?.countAvailable > 0 ? (
        <Button
          variant={"outline"}
          onClick={() => {
            addToCart(product);
          }}
        >
          <Image
            className="mr-2"
            src={"/add-to-cart.svg"}
            alt="Add to cart"
            width={20}
            height={20}
          />
          Add To Cart
        </Button>
      ) : (
        <Button variant={"outline"} disabled={true}>
          <Image
            className="mr-2"
            src={"/out-of-stock.svg"}
            alt="Out of stock"
            width={24}
            height={24}
          />
          Out of stock
        </Button>
      )}
    </Card>
  );
}

export default ProductCard;
