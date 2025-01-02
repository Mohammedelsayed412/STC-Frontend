import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import CustomTooltip from "@/components/ui/custom/tooltip-custom";
import { IProduct } from "@/lib/interfaces";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: IProduct;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <Card key={product.id} className="flex flex-col p-8 h-full gap-2 max-w-[300px] mx-auto">
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
            className="absolute top-1 right-1.5 bg-yellow-400 rounded-2xl text-xs px-2 py-1"
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
        {product?.countAvailable < 3 && (
          <span className="text-xs text-red-500">
            {`Only ${product?.countAvailable} available in stock`}
          </span>
        )}
      </CardContent>
      <Button variant={"outline"}>
        <Image
          className="mr-2"
          src={"/add-to-cart.svg"}
          alt="Add to cart"
          width={20}
          height={20}
        />
        <p className="text-base">Add To Cart</p>
      </Button>
    </Card>
  );
}

export default ProductCard;
