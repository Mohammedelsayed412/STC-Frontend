import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartItem {
  productId: number;
  quantity: number;
}

export enum CartAction {
  ADD = "add",
  REMOVE = "remove",
  DELETE = "delete",
}

type CartState = {
  cartItems: ICartItem[];
  totalQuantity: number;
  editCart: (id: number, action: CartAction) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
      cartItems: [],
      totalQuantity: 0,

      editCart: (id, action) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.productId === id
          );

          let updatedItems = [...state.cartItems];

          if (action === CartAction.ADD) {
            if (existingItemIndex >= 0) {
              updatedItems[existingItemIndex].quantity += 1;
            } else {
              updatedItems = [
                ...state.cartItems,
                { productId: id, quantity: 1 },
              ];
            }
          } else if (action === CartAction.REMOVE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              if (currentItem.quantity > 1) {
                updatedItems[existingItemIndex].quantity -= 1;
              }
            }
          } else if (action === CartAction.DELETE) {
            if (existingItemIndex >= 0) {
              updatedItems = updatedItems.filter(
                (item) => item.productId !== id
              );
            }
          }
          const totalQuantity = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return { cartItems: updatedItems, totalQuantity };
        });
      },

      clearCart: () => set({ cartItems: [], totalQuantity: 0 }),
    }),
    {
      name: "zustandCartStore",
    }
  )
);
