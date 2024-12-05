<script lang="ts">
    import type { Product, Size, Variant } from "$lib/interfaces";
    import { cart } from "$lib/stores";
    import type { CartItem } from "$lib/stores";

    const { removeFromCart, addToCart, subsctractFromCart } = cart;
    interface CartProduct extends Product {
        quantity: number;
    }
    let cartProducts: CartProduct[] = $state([]);

    const getManyProductsById = async () => {
        let ids = $cart.map((item: CartItem) => item.id);
        let res = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(ids),
        });
        let fetchedProducts: CartProduct[] = await res.json();

        // Map cart items to the fetched products, preserving duplicates
        cartProducts = $cart.map((cartItem: CartItem) => {
            let product = fetchedProducts.find((p) => p._id === cartItem.id); // Match product ID
            if (product) {
                // Clone the product to avoid mutating the original
                let customizedProduct = { ...product };

                // Select the specific variant
                let selectedColor = customizedProduct.variants.find(
                    (variant: Variant) => variant.id === cartItem.colorId,
                );
                if (selectedColor) {
                    customizedProduct.variants = [selectedColor];

                    // Select the specific size
                    let selectedSize = selectedColor?.size.find(
                        (size: Size) => size.id === cartItem.sizeId,
                    );
                    if (selectedSize)
                        return {
                            ...customizedProduct,
                            variants: [
                                {
                                    ...selectedColor,
                                    size: [selectedSize], // Include only the selected size
                                },
                            ],
                            quantity: cartItem.quantity, // Assign quantity from cart
                        };
                }
            }
            return null; // Handle missing product gracefully
        }).filter((item): item is CartProduct => item !== null); // Remove null values
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
                {#each cartProducts as p}
                    <div
                        class="flex gap-4 items-center py-6 border-b border-slate-300"
                    >
                        <img
                            class="w-[8%] p-2"
                            src={p.variants[0].images[0]}
                            alt=""
                        />
                        <div class="w-[50%] flex flex-col gap-2">
                            <a href="/category/{p._id}" class="m-0 font-bold">{p.title}</a>
                            <p class="mt-0 text-slate-500 text-[14px]">
                                Color: {p.variants[0].name}, Talle: {p
                                    .variants[0].size[0].name}
                            </p>
                            <button
                                class="w-fit"
                                onclick={() =>
                                    removeFromCart(
                                        p._id,
                                        p.variants[0].id,
                                        p.variants[0].size[0].id,
                                    )}
                            >
                                <b class="text-blue-800">Eliminar</b>
                            </button>
                        </div>
                        <div class="w-[25%] flex justify-center">
                            <div
                                class="flex items-center w-fit rounded-lg border border-slate-300"
                            >
                                <button
                                    class="px-4 text-blue-600 text-[24px]"
                                    onclick={() => subsctractFromCart(p._id, p.variants[0].id, p.variants[0].size[0].id)}
                                >
                                    -
                                </button>
                                <p class="px-4">{p.quantity}</p>
                                <button
                                    class="px-4 text-blue-600 text-[24px]"
                                    onclick={() =>
                                        addToCart(
                                            p._id,
                                            p.variants[0].id,
                                            p.variants[0].size[0].id,
                                        )}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <p class="w-[17%] text-right text-[20px]">
                            ${(p.unit_price * p.quantity).toLocaleString(
                                "es-ar",
                            )}
                        </p>
                    </div>
                {/each}
            </div>
        {:else}
            <div
                class="bg-white border border-slate-300 rounded-lg p-4 w-4/6 min-h-[50vh] flex justify-center items-center"
            >
                <p>Agregá productos para armar tu carrito</p>
            </div>
        {/if}
        {#if cartProducts.length}
            <div
                class="bg-white border border-slate-300 rounded-lg px-8 py-4 w-2/6 flex flex-col gap-4"
            >
                <b class="">Resumen de compra</b>
                <div class="flex justify-between">
                    <p>
                        Productos ({cartProducts.reduce(
                            (total, product) => total + product.quantity,
                            0,
                        )})
                    </p>
                    <p>
                        ${cartProducts
                            .reduce(
                                (total, product) =>
                                    total +
                                    product.quantity * product.unit_price,
                                0,
                            )
                            .toLocaleString("es-ar")}
                    </p>
                </div>
                <div class="flex justify-between">
                    <b>Total</b>
                    <b>
                        ${cartProducts
                            .reduce(
                                (total, product) =>
                                    total +
                                    product.quantity * product.unit_price,
                                0,
                            )
                            .toLocaleString("es-ar")}
                    </b>
                </div>
                <button class="border-2 border-slate-800 p-2 w-full rounded-lg"
                    >Continuar compra</button
                >
            </div>
        {:else}
            <div
                class="bg-white border border-slate-300 rounded-lg p-4 w-2/6 flex flex-col gap-4"
            >
                <b class="text-slate-400">Resumen de compra</b>
                <p class="text-slate-400">
                    Aquí verás los importes de tu compra una vez que agregues
                    productos.
                </p>
            </div>
        {/if}
    </div>
</div>
