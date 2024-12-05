import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface CartItem {
    id: string,
    quantity: number,
    colorId: string,
    sizeId: string
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
        addToCart: (id: string, colorId: string, sizeId: string, quantity: number = 1) => {
            update((items) => {
                const existingItem = items.find((item) =>
                    item.id === id &&
                    item.colorId === colorId &&
                    item.sizeId === sizeId
                );
                if (existingItem) {
                    const updatedItems = items.map((item) =>
                        item.id === id &&
                            item.colorId === colorId &&
                            item.sizeId === sizeId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                    saveCart(updatedItems);
                    return updatedItems;
                } else {
                    const updatedItems = [...items, { id, quantity, colorId, sizeId }];
                    saveCart(updatedItems);
                    return updatedItems;
                }
            })
        },
        removeFromCart: (id: string, colorId: string, sizeId: string) => {
            update((items) => {
                const updatedItems = items.filter((item) =>
                    !(
                        item.id === id &&
                        item.colorId === colorId &&
                        item.sizeId === sizeId
                    )
                );
                saveCart(updatedItems);
                return updatedItems;
            });
        },
        subsctractFromCart: (id: string, colorId: string, sizeId: string) => {
            update((items) => {
                const existingItem = items.find((item) => item.id === id);
                if (!existingItem) return items;

                const updatedItems = items.map((item) =>
                    item.id === id &&
                        item.colorId === colorId &&
                        item.sizeId === sizeId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                    .filter((item) => item.quantity > 0);
                saveCart(updatedItems);
                return updatedItems;
            })
        },
        updateQuantity: (id: string, quantity: number, colorId: string, sizeId: string) => {
            update((items) => {
                const updatedItems = items.map((item) =>
                    item.id === id &&
                        item.colorId === colorId &&
                        sizeId === sizeId
                        ? { ...item, quantity }
                        : item
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