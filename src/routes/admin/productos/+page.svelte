<script lang="ts">
    import type { PageData } from "./$types";
    import { ProductCard } from "./snippets";

    let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>Admin - Productos</title></svelte:head>
<div class="h-[92vh] overflow-auto px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
    <div class="flex items-center">
        <h1 class="text-[14px] font-bold">Productos</h1>
        <a
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-3 py-1 rounded-lg"
            href="/admin/productos/nuevo"
        >
            <span class="font-bold text-[12px]">Publicar</span>
        </a>
    </div>
    {#each data.products as product}
        <ProductCard {product} />
    {/each}
</div>
