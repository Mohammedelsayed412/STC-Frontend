import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ICartItem } from "./interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQuantity(
  items: ICartItem[],
  id: number
): number | undefined {
  const item = items.find((item) => item.id === id);
  return item?.quantity;
}
