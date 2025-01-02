export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  countAvailable: number;
  brand: string;
  isBestSeller: boolean;
}

export interface ICartItem {
  id: number;
  quantity: number;
}

export interface ICartProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  countAvailable: number;
  brand: string;
  isBestSeller: boolean;
  quantity: number;
}
