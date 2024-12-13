<script lang="ts">
    import type { Product, Size, Variant } from "$lib/interfaces";

    let {
        product,
        selectedColor = $bindable(),
        selectedImage = $bindable(),
        selectedSize = $bindable(),
    }: {
        product: Product;
        selectedColor: number;
        selectedImage: number;
        selectedSize: number;
    } = $props();
</script>

{#snippet colorButton(variant: Variant, i: number)}
    <button
        onclick={() => {
            selectedColor = i;
            selectedImage = 0;
            selectedSize = 0;
        }}
        class="w-10 h-10 rounded-full border-2 border-slate-300 hover:shadow-[0px_0px_10px_#999999] transition-all duration-200 {selectedColor ===
        i
            ? 'border-2 border-slate-500 shadow-[0px_0px_10px_#999999]'
            : ''}"
        style="background-color: {variant.hexColor};"
        aria-label="color"
    ></button>
{/snippet}

{#snippet sizeButton(size: Size, i: number)}
    <button
        onclick={() => (selectedSize = i)}
        class="border border-slate-300 w-10 h-8 rounded-lg text-[14px] {selectedSize ===
        i
            ? 'border-2 border-slate-500 bg-slate-200'
            : ''}"
    >
        {size.name}
    </button>
{/snippet}

<div>
    <h1 class="font-bold text-[22px]">
        {product.title}
    </h1>
    <h2 class="text-[40px]">
        ${product.unit_price.toLocaleString("es-ar")}
    </h2>
</div>
<div class="flex flex-col gap-2">
    <div class="flex gap-2">
        <p>Color:</p>
        <b>{product.variants[selectedColor].name}</b>
    </div>
    <div class="flex gap-2 flex-wrap">
        {#each product.variants as variant, i}
            {@render colorButton(variant, i)}
        {/each}
    </div>
</div>
<div class="flex flex-col gap-2">
    <div class="flex gap-2">
        <p>Talle:</p>
        <b>
            {product.variants[selectedColor].size[selectedSize].name}
        </b>
    </div>
    <div class="flex gap-2">
        {#each product.variants[selectedColor].size as size, i}
            {@render sizeButton(size, i)}
        {/each}
    </div>
</div>
