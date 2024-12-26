<script lang="ts">
    import type { Size } from "$lib/interfaces";
    import { VariantColorInput, VariantNameInput } from ".";

    let {
        variantName = $bindable(),
        variantNameErrors,
        variantColor = $bindable(),
        variantSizes = $bindable(),
        variantIndex,
        sizeInputChildren,
        addSizeChildren,
        imageInputChildren,
    }: {
        variantName: string;
        variantNameErrors: string[] | undefined;
        variantColor: string;
        variantSizes: Size[];
        variantIndex: number;
        sizeInputChildren: any;
        addSizeChildren: any;
        imageInputChildren: any;
    } = $props();

    let variantDropped: number | null = $state(null);
</script>

<div
    class="px-8 py-4 flex border-b border-slate-300
    {variantDropped === variantIndex ? 'bg-slate-100' : ''} 
    {variantDropped === variantIndex && variantIndex === 0
        ? 'rounded-t-lg'
        : ''}"
>
    <button
        type="button"
        onclick={() =>
            variantDropped === variantIndex
                ? (variantDropped = null)
                : (variantDropped = variantIndex)}
        class="w-[40%] text-left flex flex-col justify-center gap-1"
    >
        <span class="text-[14px] px-2">
            {variantName}
        </span>
        {#if variantIndex === 0}
            <span
                class="text-[10px] bg-sky-200 text-sky-600 font-bold p-1 px-2 rounded-full"
            >
                VARIANTE PRINCIPAL
            </span>
        {/if}
    </button>
    <div class="w-[20%]">
        <p class="text-[14px] text-slate-400">Talles:</p>
        <p class="text-[12px]">
            {variantSizes.map((size) => size.name)}
        </p>
    </div>
</div>
{#if variantDropped === variantIndex}
    <div class="flex px-4 pb-4">
        <VariantNameInput bind:value={variantName} errors={variantNameErrors} />
        <VariantColorInput bind:value={variantColor} />
    </div>
    <div class="px-4 pb-4">
        <div class="border border-slate-300 rounded-lg">
            {@render imageInputChildren()}
        </div>
    </div>
    <div class="px-4 pb-4">
        <div class="border border-slate-300 rounded-lg">
            {@render sizeInputChildren()}
        </div>
        {@render addSizeChildren()}
    </div>
{/if}
