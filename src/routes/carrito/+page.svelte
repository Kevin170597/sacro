<script lang="ts">
    import type { Product, Size, Variant } from "$lib/interfaces";
    import { cart } from "$lib/stores";
    import type { CartItem } from "$lib/stores";
    import { CartProductCard, PurchaseSummary } from "./snippets";

    interface CartProduct extends Product {
        quantity: number;
    }

    let cartProducts: CartProduct[] = $state([]);
    let loadingProducts: boolean = $state(false);

    const getManyProductsById = async (): Promise<CartProduct[]> => {
        loadingProducts = true;
        let ids = $cart.map((item: CartItem) => item.id);
        let res = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(ids),
        });
        let fetchedProducts: CartProduct[] = await res.json();

        cartProducts = $cart
            .map((cartItem: CartItem) => {
                let product = fetchedProducts.find(
                    (p) => p._id === cartItem.id,
                );
                if (product) {
                    let customizedProduct = { ...product };

                    let selectedColor = customizedProduct.variants.find(
                        (variant: Variant) => variant.id === cartItem.colorId,
                    );
                    if (selectedColor) {
                        customizedProduct.variants = [selectedColor];

                        let selectedSize = selectedColor?.size.find(
                            (size: Size) => size.id === cartItem.sizeId,
                        );
                        if (selectedSize)
                            return {
                                ...customizedProduct,
                                variants: [
                                    {
                                        ...selectedColor,
                                        size: [selectedSize],
                                    },
                                ],
                                quantity: cartItem.quantity,
                            };
                    }
                }
                loadingProducts = false;
                return null;
            })
            .filter((item): item is CartProduct => item !== null);
        return cartProducts;
    };

    $effect(() => {
        getManyProductsById();
    });
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100">
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
        {:else if !cartProducts.length && loadingProducts}
            <div
                class="bg-white border border-slate-300 rounded-lg px-8 w-4/6 min-h-[50vh] flex justify-center items-center"
            >
                <p>Espere un momento...</p>
            </div>
        {:else}
            <div
                class="bg-white border border-slate-300 rounded-lg p-4 w-4/6 min-h-[50vh] flex justify-center items-center"
            >
                <p>Agregá productos para armar tu carrito</p>
            </div>
        {/if}
        <PurchaseSummary {cartProducts} />
    </div>
</div>
