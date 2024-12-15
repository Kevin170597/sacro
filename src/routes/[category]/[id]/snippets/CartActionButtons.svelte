<script lang="ts">
    import { cart, type CartItem } from "$lib/stores";
    import type { Product } from "$lib/interfaces";

    let {
        product,
        selectedColor,
        selectedSize,
    }: {
        product: Product;
        selectedColor: number;
        selectedSize: number;
    } = $props();

    let inCart: number | null = $state(null);

    const {
        addToCart,
        subtractFromCart,
    }: {
        addToCart: (
            id: string,
            colorId: string,
            sizeId: string,
            quantity?: number,
        ) => void;
        subtractFromCart: (id: string, colorId: string, sizeId: string) => void;
    } = cart;

    const handleCartAction = (action: "add" | "subtract"): void => {
        const productId: string | undefined = product?._id;
        const colorId: string | undefined = product?.variants[selectedColor].id;
        const sizeId: string | undefined =
            product?.variants[selectedColor].size[selectedSize].id;

        if (productId && colorId && sizeId) {
            if (action === "add") {
                addToCart(productId, colorId, sizeId);
            } else if (action === "subtract") {
                subtractFromCart(productId, colorId, sizeId);
            }
        }
    };

    const isInCart: () => void = () => {
        let item: CartItem | undefined = $cart.find(
            (item) =>
                item.id === product?._id &&
                item.colorId === product.variants[selectedColor].id &&
                item.sizeId ===
                    product.variants[selectedColor].size[selectedSize].id,
        );
        item ? (inCart = item.quantity) : (inCart = null);
    };

    $effect(() => {
        isInCart();
    });
</script>

<div class="flex gap-2 w-full">
    {#if inCart}
        <button
            onclick={() => handleCartAction("subtract")}
            class="w-1/5 bg-slate-200 rounded-lg hover:bg-slate-300 border border-slate-400"
        >
            <p class="text-sky-600 text-[24px]">-</p>
        </button>
    {/if}
    <button
        onclick={() => handleCartAction("add")}
        class="border-2 p-2 w-full rounded-lg transition-colors duration-300
    {inCart
            ? 'bg-emerald-400 border-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-white border-slate-800 hover:text-white hover:bg-slate-800'}"
    >
        <b>
            {inCart ? `${inCart} en el carrito` : "Agregar al carrito"}
        </b>
    </button>
    {#if inCart}
        <button
            onclick={() => handleCartAction("add")}
            class="w-1/5 bg-slate-200 rounded-lg hover:bg-slate-300 border border-slate-400"
        >
            <p class="text-sky-600 text-[20px]">+</p>
        </button>
    {/if}
</div>
