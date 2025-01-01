"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PagesURLS } from "@/constants/urls";
import { ShoppingCart } from "lucide-react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const ListingsLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname: any = usePathname();

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between bg-white px-7 py-2 items-center gap-y-3">
        <Image src={"/logo.png"} alt="stc_logo" width={60} height={60} />
        <div className="flex gap-x-6">
          <Link
            href={PagesURLS.products}
            className={`px-4 py-2 text-lg ${
              pathname.includes(PagesURLS.products) ? "text-brandingRed" : ""
            }`}
          >
            Products
          </Link>
          <Link
            href={PagesURLS.cart}
            className={`px-4 py-2 text-lg ${
              pathname.includes(PagesURLS.cart) ? "text-brandingRed" : ""
            }`}
          >
            Cart
          </Link>
        </div>
        <div className="rounded-full p-2 bg-gray-50">
          <ShoppingCart width={30} height={30} className="text-purple-900 " />
        </div>
      </header>
      {children}
    </>
  );
};
export default ListingsLayout;
