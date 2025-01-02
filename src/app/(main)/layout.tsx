"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PagesURLS } from "@/constants/urls";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface RootLayoutProps {
  children: React.ReactNode;
}

const ListingsLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname: any = usePathname();
  const totalQuantity: any = useCartStore((state) => state.totalQuantity);

  return (
    <>
      <header className="flex justify-between bg-purple-950 px-7 py-2 items-center gap-y-3 mb-10 text-slate-600">
        <Image
          src={"/logo.png"}
          alt="stc_logo"
          width={60}
          height={60}
          className="rounded-md"
        />
        <div className="flex gap-x-6">
          <Link
            href={PagesURLS.products}
            className={`px-4 py-2 text-lg ${
              pathname.includes(PagesURLS.products)
                ? "text-white"
                : "text-gray-400"
            }`}
          >
            Products
          </Link>
          <Link
            href={PagesURLS.cart}
            className={`px-4 py-2 text-lg ${
              pathname.includes(PagesURLS.cart) ? "text-white" : "text-gray-400"
            }`}
          >
            Cart
          </Link>
        </div>
        <Link href={PagesURLS.cart}>
          <div className="relative">
            {totalQuantity > 0 && (
              <span className="absolute bottom-[22px] right-2 text-white text-xs font-medium">
                {totalQuantity}
              </span>
            )}
            <ShoppingCart width={30} height={30} className="text-white" />
          </div>
        </Link>
      </header>
      {children}
    </>
  );
};
export default ListingsLayout;
