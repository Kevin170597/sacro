<script lang="ts">
    import type { PageData } from "./$types";
    import { ProductCard } from "./snippets";

    let { data }: { data: PageData } = $props();
</script>

<div class="min-h-[100vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
    <h1 class="text-[20px] sm:text-[24px]">Productos</h1>
    <div class="flex">
        <a
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
            href="/admin/productos/nuevo"
        >
            <span class="font-bold text-[12px]">Publicar</span>
        </a>
    </div>
    {#each data.products as product}
        <ProductCard {product} />
    {/each}
</div>
