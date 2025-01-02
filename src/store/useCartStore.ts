import { ICartItem, ICartProduct } from "@/lib/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum CartAction {
  ADD = "add",
  REMOVE = "remove",
  DELETE = "delete",
}

type CartState = {
  cartItems: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
  editCart: (id: number, action: CartAction, price: number) => void;
  clearCart: () => void;
  setInitialCart: (cartData: ICartProduct[]) => void; // Accept full product input
  getQuantityById: (id: number) => number; // Function to get quantity of item by id
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,

      // Edit cart items based on action
      editCart: (id, action, price) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.productId === id
          );

          let updatedItems = [...state.cartItems];
          let updatedTotalPrice = state.totalPrice;
          let updatedTotalQuantity = state.totalQuantity;

          // Handle Add action
          if (action === CartAction.ADD) {
            if (existingItemIndex >= 0) {
              updatedItems[existingItemIndex].quantity += 1;
              updatedTotalPrice += price;
              updatedTotalQuantity += 1;
            } else {
              updatedItems = [
                ...state.cartItems,
                { productId: id, quantity: 1 },
              ];
              updatedTotalPrice += price;
              updatedTotalQuantity += 1;
            }
          }

          // Handle Remove action
          else if (action === CartAction.REMOVE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              if (currentItem.quantity > 1) {
                updatedItems[existingItemIndex].quantity -= 1;
                updatedTotalPrice -= price;
                updatedTotalQuantity -= 1;
              }
            }
          }

          // Handle Delete action
          else if (action === CartAction.DELETE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              updatedTotalPrice -= currentItem.quantity * price;
              updatedTotalQuantity -= currentItem.quantity;
              updatedItems = updatedItems.filter(
                (item) => item.productId !== id
              );
            }
          }

          return {
            cartItems: updatedItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
        });
      },

      // Clear the cart
      clearCart: () => set({ cartItems: [], totalPrice: 0, totalQuantity: 0 }),

      // Set initial cart data with full product input
      setInitialCart: (cartData) => {
        set(() => {
          const cartItems = cartData.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          }));

          const totalQuantity = cartData.reduce(
            (sum, product) => sum + product.quantity,
            0
          );

          const totalPrice = cartData.reduce(
            (sum, product) => sum + product.quantity * product.price,
            0
          );

          return { cartItems, totalPrice, totalQuantity };
        });
      },

      // Function to get quantity of item by id
      getQuantityById: (id) => {
        const state = get();
        const item = state.cartItems.find((item) => item.productId === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "zustandCartStore",
    }
  )
);
