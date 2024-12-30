<script lang="ts">
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import type { Variant as VariantType } from "$lib/interfaces";
    import type { VariantsSchema } from "../helpers";
    import { superForm } from "sveltekit-superforms";
    import { dndzone } from "svelte-dnd-action";
    import { Button } from "$lib/components";
    import { flip } from "svelte/animate";
    import { Variant } from "./Variants";
    import { nanoid } from "nanoid";

    let { data }: { data: SuperValidated<Infer<VariantsSchema>> } = $props();

    const { form, enhance, errors } = superForm(data, {
        dataType: "json",
        onSubmit: () => {
            $form.variants = variants;
        },
    });

    let dropped: string = $state("");

    let variants: VariantType[] = $state($form.variants);

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
    class="w-4/5 mx-auto flex flex-col gap-2 bg-white border rounded-lg {$errors.variants
        ? 'border-red-600'
        : 'border-slate-300'}"
>
    <button
        onclick={() =>
            dropped === "variants" ? (dropped = "") : (dropped = "variants")}
        class="text-left flex flex-col gap-2 hover:bg-gray-100 px-8 py-4 rounded-lg {dropped ===
        'variants'
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <span
            class="w-fit font-bold text-[14px] {$errors.variants
                ? 'bg-red-100  text-red-400 font-bold rounded-full px-2'
                : ''}"
        >
            Variantes
        </span>
        <span class="text-slate-500 text-[13px]">
            {$form.variants.length} variantes añadidas
        </span>
    </button>
    {#if dropped === "variants"}
        <form
            class="flex flex-col gap-4 px-8 py-2"
            method="POST"
            action="?/variants"
            use:enhance
            use:dndzone={{
                items: variants,
                flipDurationMs: 300,
                dropTargetStyle: { outline: "none" },
            }}
            onconsider={handleDndConsiderVariant}
            onfinalize={handleDndFinalizeVariant}
        >
            {#each variants as variant, variantIndex (variant.id)}
                <div
                    animate:flip={{ duration: 300 }}
                    class="border border-slate-300 rounded-lg"
                >
                    <Variant
                        errors={($errors &&
                            $errors.variants &&
                            $errors.variants[variantIndex]) ||
                            null}
                        bind:variant={variants[variantIndex]}
                        {variantIndex}
                        deleteVariant={() => deleteVariant(variantIndex)}
                    />
                </div>
            {/each}
            <Button
                label="Agregar variante"
                color="sky"
                rounded="lg"
                size="md"
                onclick={addVariant}
            />
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 mb-4 rounded-lg"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    {/if}
</div>
