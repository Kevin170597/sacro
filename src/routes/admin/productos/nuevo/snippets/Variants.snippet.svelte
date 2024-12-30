<script lang="ts">
    import type { Variant as VariantType } from "$lib/interfaces";
    import { dndzone } from "svelte-dnd-action";
    import { Button } from "$lib/components";
    import { flip } from "svelte/animate";
    import { Variant } from "./Variants";
    import { nanoid } from "nanoid";

    let {
        variants = $bindable(),
        errors,
    }: { errors: any; variants: VariantType[] } = $props();

    const handleDndConsiderVariant = (e: CustomEvent) =>
        (variants = e.detail.items);

    const handleDndFinalizeVariant = (e: CustomEvent) =>
        (variants = e.detail.items);

    const addVariant = () =>
        (variants = [
            ...variants,
            {
                id: nanoid(5),
                name: "Blanco",
                hexColor: "#ffffff",
                size: [{ id: nanoid(5), name: "XS" }],
                images: [],
            },
        ]);

    const deleteVariant = (variantIndex: number) =>
        (variants = [
            ...variants.slice(0, variantIndex),
            ...variants.slice(variantIndex + 1),
        ]);
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
            items: variants,
            flipDurationMs: 300,
            dropTargetStyle: { outline: "none" },
        }}
        onconsider={handleDndConsiderVariant}
        onfinalize={handleDndFinalizeVariant}
    >
        {#each variants as variant, variantIndex (variant.id)}
            <div animate:flip={{ duration: 300 }}>
                <Variant
                    {variantIndex}
                    errors={(errors && errors[variantIndex]) || null}
                    bind:variant={variants[variantIndex]}
                    deleteVariant={() => deleteVariant(variantIndex)}
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
