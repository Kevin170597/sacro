<script lang="ts">
    import type { Product, Size, Variant } from "$lib/interfaces";
    import { CartProductCard, PurchaseSummary } from "./snippets";
    import { cart, type CartItem } from "$lib/stores";

    interface CartProduct extends Product {
        quantity: number;
    }

    let cartProducts: CartProduct[] = $state([]);

    const getManyProductsById = async (): Promise<CartProduct[]> => {
        const productIds: string[] = $cart.map(({ id }) => id);
        const response: Response = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(productIds),
        });
        const fetchedProducts: CartProduct[] = await response.json();

        return cartProducts = $cart
            .map(({ id, colorId, sizeId, quantity }: CartItem) => {
                const product = fetchedProducts.find(
                    (product: CartProduct) => product._id === id,
                );
                if (!product) return null;

                const [selectedColor] = product.variants.filter(
                    (variant) => variant.id === colorId,
                );
                if (!selectedColor) return null;

                const [selectedSize] = selectedColor.size.filter(
                    (size) => size.id === sizeId,
                );
                if (!selectedSize) return null;

                return {
                    ...product,
                    variants: [{ ...selectedColor, size: [selectedSize] }],
                    quantity,
                };
            })
            .filter((item): item is CartProduct => item !== null);
    };

    $effect(() => {
        getManyProductsById();
    });
</script>

<svelte:head>
    <title>Carrito de compras</title>
</svelte:head>

<div class="min-h-[90vh] px-8 py-4 bg-slate-100">
    <h1 class="font-bold text-[20px] mb-4">Tu carrito</h1>
    <div class="flex items-start gap-4">
        {#if cartProducts.length}
            <div
                class="bg-white border border-slate-300 rounded-lg px-8 w-4/6 min-h-[50vh]"
            >
                {#each cartProducts as product}
                    <CartProductCard {product} />
                {/each}
            </div>
        {:else if !cartProducts.length && $cart.length}
            <div
                class="bg-white border border-slate-300 rounded-lg px-8 w-4/6 min-h-[50vh] flex justify-center items-center"
            >
                <p>Espere un momento...</p>
            </div>
        {:else}
            <div
                class="bg-white border border-slate-300 rounded-lg p-4 w-4/6 min-h-[50vh] flex justify-center items-center"
            >
                <p>Agregá productos para armar tu carrito.</p>
            </div>
        {/if}
        <PurchaseSummary {cartProducts} />
    </div>
</div>
