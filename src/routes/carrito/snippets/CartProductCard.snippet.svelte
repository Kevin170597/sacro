<script lang="ts">
    import type { Product } from "$lib/interfaces";
    import { cart } from "$lib/stores";

    type CartProduct = Product & { quantity: number };

    let { product }: { product: CartProduct } = $props();

    const {
        addToCart,
        subtractFromCart,
        removeFromCart,
    }: {
        addToCart: (
            id: string,
            colorId: string,
            sizeId: string,
            quantity?: number,
        ) => void;
        subtractFromCart: (id: string, colorId: string, sizeId: string) => void;
        removeFromCart: (id: string, colorId: string, sizeId: string) => void;
    } = cart;
</script>

<div class="flex gap-4 items-center py-6 border-b border-slate-300">
    <img class="w-[8%] p-2" src={product.variants[0].images[0]} alt="" />
    <div class="w-[50%] flex flex-col gap-2">
        <a href="/category/{product._id}" class="m-0 font-bold">
            {product.title}
        </a>
        <p class="mt-0 text-slate-500 text-[14px]">
            Color: {product.variants[0].name}, Talle: {product.variants[0]
                .size[0].name}
        </p>
        <button
            class="w-fit"
            onclick={() =>
                removeFromCart(
                    product._id!,
                    product.variants[0].id,
                    product.variants[0].size[0].id,
                )}
        >
            <b class="text-blue-800">Eliminar</b>
        </button>
    </div>
    <div class="w-[25%] flex justify-center">
        <div class="flex items-center w-fit rounded-lg border border-slate-300">
            <button
                class="px-4 text-blue-600 text-[24px]"
                onclick={() =>
                    subtractFromCart(
                        product._id!,
                        product.variants[0].id,
                        product.variants[0].size[0].id,
                    )}
            >
                -
            </button>
            <p class="px-4">{product.quantity}</p>
            <button
                class="px-4 text-blue-600 text-[24px]"
                onclick={() =>
                    addToCart(
                        product._id!,
                        product.variants[0].id,
                        product.variants[0].size[0].id,
                    )}
            >
                +
            </button>
        </div>
    </div>
    <p class="w-[17%] text-right text-[20px]">
        ${(product.unit_price * product.quantity).toLocaleString("es-ar")}
    </p>
</div>
