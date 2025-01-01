export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  countAvailableInStock: number;
  brand: string;
}

export interface ICartItem {
  productId: number;
  quantity: number;
}
