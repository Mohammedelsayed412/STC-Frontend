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
  totalPrice: number;
  totalQuantity: number;
  editCart: (id: number, action: CartAction, price: number) => void;
  clearCart: () => void;
  setInitialCart: (cartData: ICartItem[]) => void; // Function to set initial cart
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
              // Item already exists, increment the quantity
              updatedItems[existingItemIndex].quantity += 1;
              updatedTotalPrice += price; // Add item's price
              updatedTotalQuantity += 1; // Increment total quantity
            } else {
              // New item, add it to the cart with quantity 1
              updatedItems = [
                ...state.cartItems,
                {
                  productId: id,
                  quantity: 1, // Start with quantity 1
                },
              ];
              updatedTotalPrice += price; // Add item's price
              updatedTotalQuantity += 1; // Increment total quantity
            }
          }

          // Handle Remove action
          else if (action === CartAction.REMOVE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              if (currentItem.quantity > 1) {
                updatedItems[existingItemIndex].quantity -= 1;
                updatedTotalPrice -= price; // Subtract item's price
                updatedTotalQuantity -= 1; // Decrement total quantity
              }
            }
          }

          // Handle Delete action
          else if (action === CartAction.DELETE) {
            if (existingItemIndex >= 0) {
              const currentItem = updatedItems[existingItemIndex];
              updatedTotalPrice -= currentItem.quantity * price; // Subtract item's total price
              updatedTotalQuantity -= currentItem.quantity; // Subtract item's total quantity
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

      // Set initial cart data with actual product details
      setInitialCart: (cartData) => {
        set(() => {
          const cartItems = cartData.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          }));

          const totalQuantity = cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          const totalPrice = cartItems.reduce(
            (sum, item) => sum + item.quantity * 0, // Placeholder for price calculation on editCart
            0
          );

          return { cartItems, totalPrice, totalQuantity };
        });
      },

      // Function to get quantity of item by id
      getQuantityById: (id) => {
        const state = get(); // Access the current state using get()
        const item = state.cartItems.find((item) => item.productId === id);
        return item ? item.quantity : 0; // Return quantity or 0 if item is not found
      },
    }),
    {
      name: "zustandCartStore",
    }
  )
);
