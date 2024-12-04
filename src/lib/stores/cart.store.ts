import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface CartItem {
    id: string,
    quantity: number
};

const loadCart = (): CartItem[] => {
    if (!browser) return [];
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const saveCart = (items: CartItem[]) => {
    if (browser) {
        localStorage.setItem("cart", JSON.stringify(items));
    }
};

const createCartStore = () => {
    const { subscribe, set, update } = writable<CartItem[]>(loadCart());

    return {
        subscribe,
        addToCart: (id: string, quantity: number = 1) => {
            update((items) => {
                const existingItem = items.find((item) => item.id === id);
                if (existingItem) {
                    const updatedItems = items.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                    saveCart(updatedItems);
                    return updatedItems;
                } else {
                    const updatedItems = [...items, { id, quantity }];
                    saveCart(updatedItems);
                    return updatedItems;
                }
            })
        },
        removeFromCart: (id: string) => {
            update((items) => {
                const updatedItems = items.filter((item) => item.id !== id);
                saveCart(updatedItems);
                return updatedItems;
            });
        },
        updateQuantity: (id: string, quantity: number) => {
            update((items) => {
                const updatedItems = items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                );
                saveCart(updatedItems);
                return updatedItems;
            })
        },
        clearCart: () => {
            set([]);
            saveCart([]);
        }
    }
};

export const cart = createCartStore();