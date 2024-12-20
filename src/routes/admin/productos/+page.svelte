<script lang="ts">
    import type { PageData } from "./$types";
    import { ProductCard } from "./snippets";

    let { data }: { data: PageData } = $props();
</script>

<div class="min-h-[100vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
    <h1 class="text-[20px] sm:text-[24px]">Productos</h1>
    {#each data.products as product}
        <ProductCard {product} />
    {/each}
</div>
