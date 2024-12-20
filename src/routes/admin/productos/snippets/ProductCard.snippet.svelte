<script lang="ts">
    import type { Product } from "$lib/interfaces";

    let { product }: { product: Product } = $props();
</script>

<div class="flex bg-white rounded-lg border border-slate-300">
    <img class="w-[8%] h-fit p-4" src={product.variants[0].images[0]} alt="" />
    <div class="py-2 px-4 w-[30%]">
        <span class="text-[14px] text-slate-400">{product._id}</span>
        <a class="hover:underline" href="/admin/productos/{product._id}"
            >{product.title}</a
        >
    </div>
    <div class="py-2 px-4 flex flex-wrap items-center w-[20%] gap-2">
        {#each product.variants as variant}
            <div
                class="w-5 h-5 rounded-full border border-slate-400"
                style:background-color={variant.hexColor}
            ></div>
        {/each}
    </div>
    <div class="py-2 px-4 flex items-center w-[10%]">
        <p>${product.unit_price.toLocaleString("es-ar")}</p>
    </div>
</div>
