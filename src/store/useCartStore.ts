import { CartAction } from "@/lib/enums";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartItem {
  productId: number;
  quantity: number;
}


type CartState = {
  cartItems: ICartItem[];
  editCart: (id: number, action: CartAction) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
        cartItems: [],

      editCart: (id, action) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.productId === id
          );

          if (action === CartAction.ADD) {
            if (existingItemIndex >= 0) {
              const updatedItems = [...state.cartItems];
              updatedItems[existingItemIndex].quantity += 1;
              return { cartItems: updatedItems };
            } else {
              return { cartItems: [...state.cartItems, { productId: id, quantity: 1 }] };
            }
          } else if (action === CartAction.SUBTRACT) {
            if (existingItemIndex >= 0) {
              const updatedItems = [...state.cartItems];
              const currentItem = updatedItems[existingItemIndex];

              if (currentItem.quantity > 1) {
                currentItem.quantity -= 1;
                return { cartItems: updatedItems };
              }
            }
          } else if (action === CartAction.DELETE) {
            if (existingItemIndex >= 0) {
              const updatedItems = state.cartItems.filter(
                (item) => item.productId !== id
              );
              return { cartItems: updatedItems };
            }
          }
          return state;
        });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "zustandCartStore",
    }
  )
);