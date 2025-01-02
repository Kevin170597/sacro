<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import { variants } from "../page.svelte";
    import { Button } from "$lib/components";
    import { flip } from "svelte/animate";
    import { Variant } from "./Variants";
    import {
        addVariant,
        handleDndConsiderVariant,
        handleDndFinalizeVariant,
    } from "./Variants.snippets";

    let { errors }: { errors: any } = $props();
</script>

<div
    class="bg-white flex flex-col px-8 py-4 border rounded-lg {errors
        ? 'border-red-600'
        : 'border-slate-300'}"
>
    <span
        class="w-fit font-bold text-[14px] px-2 mb-4 {errors
            ? 'bg-red-100  text-red-400 font-bold rounded-full'
            : ''}"
    >
        Variantes
    </span>
    <div
        class="flex flex-col gap-4"
        use:dndzone={{
            items: variants.variants,
            flipDurationMs: 300,
            dropTargetStyle: { outline: "none" },
        }}
        onconsider={handleDndConsiderVariant}
        onfinalize={handleDndFinalizeVariant}
    >
        {#each variants.variants as variant, variantIndex (variant.id)}
            <div animate:flip={{ duration: 300 }}>
                <Variant
                    {variantIndex}
                    errors={(errors && errors[variantIndex]) || null}
                />
            </div>
        {/each}
    </div>
    <Button
        label="Agregar variante"
        color="sky"
        rounded="lg"
        size="md"
        onclick={addVariant}
        class="mt-4"
    />
</div>
