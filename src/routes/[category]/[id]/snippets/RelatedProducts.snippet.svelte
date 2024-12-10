<script lang="ts">
    import type { Product } from "$lib/interfaces";
</script>

{#snippet card()}
    <div
        class="w-[50%] flex gap-2 items-center p-4 border border-slate-300 rounded-lg"
    >
        <img
            class="w-[20%] h-fit"
            src={"https://http2.mlstatic.com/D_NQ_NP_2X_660193-MLA80828057281_112024-F.webp"}
            alt=""
        />
        <div class="w-[80%]">
            <p class="text-[14px]">
                Chaqueta Arciel Cuello V | Combinado | Sacro
            </p>
            <p class="text-[24px]">$36.900</p>
        </div>
    </div>
{/snippet}

<div class="p-4 border-b border-slate-300">
    <h2 class="text-[20px] mb-4">Otros productos similares</h2>
    <div class="flex gap-2">
        {#each [1, 2] as product}
            {@render card()}
        {/each}
    </div>
</div>
