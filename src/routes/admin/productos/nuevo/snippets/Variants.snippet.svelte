<script lang="ts">
    import { VariantColorInput, VariantNameInput } from ".";
    import { DraggableIcon } from "$lib/components/icons";
    import type { Size } from "$lib/interfaces";

    let {
        variantName = $bindable(),
        variantNameErrors,
        variantColor = $bindable(),
        variantSizes = $bindable(),
        deleteVariant,
        addVariantSize,
        variantIndex,
        sizeInputChildren,
        imageInputChildren,
    }: {
        variantName: string;
        variantNameErrors: string[] | undefined;
        variantColor: string;
        variantSizes: Size[];
        variantIndex: number;
        addVariantSize: () => void;
        deleteVariant: () => void;
        sizeInputChildren: any;
        imageInputChildren: any;
    } = $props();

    let variantDropped: number | null = $state(null);
</script>

<div class="border border-slate-300 rounded-lg">
    <div
        class="flex items-center px-8 py-4 rounded-t-lg {variantDropped === variantIndex
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <div class="w-[10%]">
            <DraggableIcon color="gray" />
        </div>
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
        <div class="w-[20%] flex flex-col justify-center">
            <p class="text-[14px] text-slate-400">Talles:</p>
            <p class="text-[12px]">
                {variantSizes.map((size) => size.name)}
            </p>
        </div>
        <div class="w-[30%] flex items-center">
            <button
                onclick={deleteVariant}
                type="button"
                class="w-fit ml-auto bg-transparent hover:bg-red-100 transition-all duration-200 px-2 rounded-lg"
            >
                <span class="text-[12px] font-bold text-red-400">Eliminar</span>
            </button>
        </div>
    </div>
    {#if variantDropped === variantIndex}
        <div class="flex px-4 pb-2 border-b border-slate-300">
            <VariantNameInput
                bind:value={variantName}
                errors={variantNameErrors}
            />
            <VariantColorInput bind:value={variantColor} />
        </div>
        <div class="p-4 pb-4 flex flex-col gap-4">
            <b class="text-[14px] ml-2">Fotos</b>
            <div class="border border-slate-300 rounded-lg">
                {@render imageInputChildren()}
            </div>
        </div>
        <div class="p-4 pb-4 flex flex-col gap-4 border-t border-slate-300">
            <b class="text-[14px] ml-2">Talles</b>
            {@render sizeInputChildren()}
            <button
                class="bg-transparent hover:bg-sky-100 text-sky-600 w-fit mr-auto px-4 py-2 rounded-lg transition-all duration-200"
                type="button"
                onclick={addVariantSize}
            >
                <span class="font-bold text-[12px]"> Agregar talle </span>
            </button>
        </div>
    {/if}
</div>
