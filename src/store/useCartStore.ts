import { CartAction } from "@/lib/enums";
import { IProduct, ICartItem } from "@/lib/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartItems: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
  editCart: (action: CartAction, product: IProduct) => void;
  clearCart: () => void;
  getQuantityById: (id: number) => number;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,

      editCart: (action, product) => {
        const { id, name, price, image, quantity, countAvailable } = product;

        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === id
          );

          let updatedItems = [...state.cartItems];
          let updatedTotalPrice = state.totalPrice;
          let updatedTotalQuantity = state.totalQuantity;

          if (action === CartAction.ADD) {
            if (existingItemIndex >= 0) {
              updatedItems[existingItemIndex].quantity += 1;
              updatedTotalPrice += price;
              updatedTotalQuantity += 1;
            } else {
              updatedItems = [
                ...state.cartItems,
                { id, quantity: 1, price, image, countAvailable, name },
              ];
              updatedTotalPrice += price;
              updatedTotalQuantity += 1;
            }
          } else if (action === CartAction.SUBTRACT) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              if (currentItem.quantity > 1) {
                updatedItems[existingItemIndex].quantity -= 1;
                updatedTotalPrice -= currentItem.price;
                updatedTotalQuantity -= 1;
              }
            }
          } else if (action === CartAction.DELETE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              updatedTotalPrice -= currentItem.quantity * currentItem.price;
              updatedTotalQuantity -= currentItem.quantity;
              updatedItems = updatedItems.filter((item) => item.id !== id);
            }
          }

          return {
            cartItems: updatedItems,
            totalPrice: updatedTotalPrice,
            totalQuantity: updatedTotalQuantity,
          };
        });
      },

      clearCart: () => set({ cartItems: [], totalPrice: 0, totalQuantity: 0 }),

      getQuantityById: (id) => {
        const state = get();
        const item = state.cartItems.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "zustandCartStore",
    }
  )
);
