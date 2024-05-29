import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: String) => void;
  increaseQuantity: (idToInc: String) => void;
  decreaseQuantity: (idToDec: String) => void;
  updateQuantity: (idToUpdate: string, newQuantity: number) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const existingItemIndex = currentItems.findIndex(
          (cartItem) => cartItem.item._id === item._id
        );
        if (existingItemIndex !== -1) {
          // Item already exists in the cart
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ cartItems: updatedItems });
          toast.success("Quantity updated in cart");
        } else {
          // Item does not exist
          set({
            cartItems: [...currentItems, { item, quantity, color, size }],
          });
          toast.success("Item added to cart");
        }
      },
      removeItem: (_id: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id
        );
        set({ cartItems: newCartItems });
        toast.success("Item deleted from cart");
      },
      increaseQuantity: (idToInc: String) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          if (cartItem.item._id === idToInc) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        set({ cartItems: newCartItems });
      },
      decreaseQuantity: (idToDec: String) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          if (cartItem.item._id === idToDec) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        set({ cartItems: newCartItems });
      },
      updateQuantity: (idToUpdate: string, newQuantity: number) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          if (cartItem.item._id === idToUpdate) {
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        });
        set({ cartItems: newCartItems });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
