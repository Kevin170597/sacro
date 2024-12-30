<script lang="ts">
    import { DraggableIcon } from "$lib/components/icons";
    import type { Variant } from "$lib/interfaces";
    import {
        VariantNameInput,
        VariantColorInput,
        VariantImages,
        VariantSize,
    } from "./snippets";

    let {
        variant = $bindable(),
        deleteVariant,
        variantIndex,
        errors,
    }: {
        variant: Variant;
        deleteVariant: () => void;
        variantIndex: number;
        errors: any;
    } = $props();

    let variantDropped: number | null = $state(null);
</script>

<div class="border border-slate-300 rounded-lg">
    <div
        class="flex items-center px-8 py-4 rounded-t-lg {variantDropped ===
        variantIndex
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
                {variant.name || "Sin nombre"}
            </span>
            {#if variantIndex === 0}
                <span
                    class="text-[10px] bg-sky-200 text-sky-600 font-bold p-1 px-2 rounded-full"
                >
                    VARIANTE PRINCIPAL
                </span>
            {/if}
        </button>
        <div class="w-[60%] flex items-center">
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
                bind:value={variant.name}
                errors={(errors && errors.name) || null}
            />
            <VariantColorInput bind:value={variant.hexColor} />
        </div>
        <VariantImages
            bind:variantImages={variant.images}
            errors={(errors && errors.images) || null}
        />
        <VariantSize
            bind:sizes={variant.size}
            errors={(errors && errors.size) || null}
        />
    {/if}
</div>
