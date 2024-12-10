<script lang="ts">
    import type { PageData } from "./$types";
    import { ProductCard } from "./snippets";
    import { goto } from "$app/navigation";

    let { data }: { data: PageData } = $props();

    let selectedSort = $state("");

    const handleSortChange = (event: Event) => {
        const value = (event.target as HTMLSelectElement).value;
        !value
            ? goto(window.location.pathname)
            : goto(window.location.pathname + `?sort=${value}`);
    }
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex gap-12">
    <div class="w-4/5">
        <h1 class="text-[24px] font-bold">Ambos</h1>
        <button onclick={() => goto(window.location.pathname + "?sort=asc")}
            >reload</button
        >
        <div class="flex justify-between">
            <p>{data.products.length} resultados</p>
            <div class="flex items-center gap-2">
                <b>Ordenar por</b>
                <select
                    class="outline-none"
                    onchange={handleSortChange}
                    bind:value={selectedSort}
                >
                    <option value="">Más relevantes</option>
                    <option value="asc">Menor precio</option>
                    <option value="desc">Mayor precio</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4 items-start mt-4">
            {#each data.products as product}
                <ProductCard {product} />
            {/each}
        </div>
    </div>
    <div class="w-1/5 py-12">
        <b class="block mb-4">Precio</b>
        <p class="text-[14px] mb-2">Hasta $55.000 (6)</p>
        <p class="text-[14px]">Más de $55.000 (4)</p>
    </div>
</div>
