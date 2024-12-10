<script lang="ts">
    import type { Product } from "$lib/interfaces";

    let { relatedProducts }: { relatedProducts: Product[] } = $props();
</script>

{#snippet card(product: Product)}
    <a href="/ambos/{product._id}" class="w-[50%]">
        <div
            class="flex gap-2 items-center p-4 border border-slate-300 rounded-lg"
        >
            <img
                class="w-[20%] h-fit"
                src={product.variants[0].images[0]}
                alt=""
            />
            <div class="w-[80%]">
                <p class="text-[14px]">
                    {product.title}
                </p>
                <p class="text-[24px]">
                    ${product.unit_price.toLocaleString("es-ar")}
                </p>
            </div>
        </div>
    </a>
{/snippet}

<div class="p-4 border-b border-slate-300">
    <h2 class="text-[20px] mb-4">Otros productos similares</h2>
    <div class="flex gap-2">
        {#each relatedProducts as product}
            {@render card(product)}
        {/each}
    </div>
</div>
