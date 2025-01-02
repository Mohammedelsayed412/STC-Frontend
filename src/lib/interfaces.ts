export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  countAvailable: number;
  brand: string;
  isBestSeller: boolean;
  quantity: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  name: string;
  image: string;
  price: number;
  countAvailable: number;
}

