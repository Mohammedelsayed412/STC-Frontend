import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { IProduct } from "@/lib/interfaces";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: IProduct;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <Card key={product.id} className="flex flex-col p-8 h-full gap-2">
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
        <p className="font-medium ">{product?.name}</p>
        <p className=" text-muted-foreground text-sm">{product?.brand}</p>
        <div className="flex gap-1 items-center">
          <span className="text-sm"> In stock: </span>
          <span className="text-base">{product?.countAvailable}</span>
        </div>
        <div className="flex items-start ">
          <span className="text-xs text-emerald-500 mr-0.5 mt-1">SAR</span>
          <span className="font-medium text-emerald-500">{product?.price}</span>
        </div>
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
