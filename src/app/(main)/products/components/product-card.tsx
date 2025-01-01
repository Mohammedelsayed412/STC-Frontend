import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { IProduct } from "@/lib/interfaces";
import React from "react";

interface ProductCardProps {
  product: IProduct;
}
function ProductCard({ product }: ProductCardProps) {
  return (
      <Card key={product.id} className="flex flex-col p-8 h-full">
        <div className="flex flex-col h-full">

          <CardDescription
            id="description"
            className="text-slate-500 mb-6 h-full break-words max-w-max"
          >
          </CardDescription>

          <CardContent className="p-0">
          </CardContent>
        </div>
      </Card>
  );
}

export default ProductCard;
