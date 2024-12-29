<script lang="ts">
    import type { Product } from "$lib/interfaces";

    interface CartProduct extends Product {
        quantity: number;
    }

    let { product }: { product: CartProduct } = $props();
</script>

<div class="flex items-center border-b border-slate-300 py-1">
    <div class="w-[10%] p-4">
        <img src={product.variants[0].images[0].url} alt="" />
    </div>
    <div class="w-[60%]">
        <h2 class="text-[14px]">{product.title}</h2>
        <p class="mt-0 text-slate-500 text-[12px]">
            Color: {product.variants[0].name}, Size: {product.variants[0]
                .size[0].name}
        </p>
    </div>
    <div class="w-[10%]">
        <p class="text-center text-[14px]">x{product.quantity}</p>
    </div>
    <div class="w-[20%]">
        <p class="text-right text-[16px]">
            ${(product.unit_price * product.quantity).toLocaleString("es-ar")}
        </p>
    </div>
</div>
