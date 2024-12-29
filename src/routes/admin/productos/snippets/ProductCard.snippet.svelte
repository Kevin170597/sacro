<script lang="ts">
    import type { Product } from "$lib/interfaces";
    import { Button } from "$lib/components";
    import { enhance } from "$app/forms";

    let { product }: { product: Product } = $props();
</script>

<div class="flex bg-white p-2 rounded-lg border border-slate-300">
    <div class="w-[6%] flex justify-center items-center">
        <img class="p-2" src={product.variants[0].images[0]} alt="" />
    </div>
    <div class="py-2 px-4 w-[44%]">
        <p class="text-[11px] text-slate-400"># {product._id}</p>
        <a class="hover:underline" href="/admin/productos/{product._id}">
            <span class="font-bold text-[12px]">{product.title}</span>
        </a>
    </div>
    <div class="py-2 px-4 grid grid-cols-6 items-start w-[20%] gap-2">
        {#each product.variants as variant}
            <div
                class="w-4 h-4 rounded-full border border-slate-400"
                style:background-color={variant.hexColor}
            ></div>
        {/each}
    </div>
    <div class="py-2 px-4 flex justify-center items-center w-[15%]">
        <p>${product.unit_price.toLocaleString("es-ar")}</p>
    </div>
    <form
        method="POST"
        action="?/delete"
        class="py-2 px-4 flex items-center justify-center w-[15%]"
        use:enhance
    >
        <input type="text" value={product._id} hidden name="id" />
        <Button
            label="Eliminar"
            color="rose"
            rounded="lg"
            size="md"
            type="submit"
        />
    </form>
</div>
