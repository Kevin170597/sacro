<script lang="ts">
    import type { Product } from "$lib/interfaces";

    let { product }: { product: Product } = $props();
</script>

<a href="/ambos/{product._id}">
    <div
        class="bg-white flex flex-col gap-2 border border-slate-300 rounded-lg p-4"
    >
        <div class="w-full flex justify-center">
            <img class="w-[80%]" src={product.variants[0].images[0]} alt="" />
        </div>
        <p
            class="text-[12px] text-slate-500 border border-slate-300 w-fit px-2 rounded-lg"
        >
            {product.variants.length} colores
        </p>
        <div class="flex gap-2 flex-wrap">
            {#each product.variants as variant}
                <button
                    aria-label="color"
                    class="w-8 h-8 rounded-full border-2 border-gray-300"
                    style="background-color: {variant.hexColor};"
                ></button>
            {/each}
        </div>
        <p class="text-[14px]">{product.title}</p>
        <div class="w-full">
            <b class="text-[22px]"
                >${product.unit_price.toLocaleString("es-ar")}</b
            >
        </div>
    </div>
</a>
