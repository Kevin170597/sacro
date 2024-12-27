<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { superForm } from "sveltekit-superforms";
    import { fetchUploadImage } from "./helpers";
    import type { PageData } from "./$types";
    import { nanoid } from "nanoid";
    import {
        TitleInput,
        UnitPriceInput,
        DiscountInput,
        DescriptionInput,
        VariantSize,
        VariantImages,
        Variants,
    } from "./snippets";
    import { Button, Text } from "$lib/components";

    let { data }: { data: PageData } = $props();

    const { form, enhance, errors } = superForm(data.form, {
        dataType: "json",
    });

    const handleDndConsiderVariant = (e: CustomEvent) => {
        $form.variants = e.detail.items;
    };

    const handleDndFinalizeVariant = (e: CustomEvent) => {
        $form.variants = e.detail.items;
    };

    const handleDndConsiderSize = (e: CustomEvent, variantIndex: number) => {
        $form.variants[variantIndex].size = e.detail.items;
    };

    const handleDndFinalizeSize = (e: CustomEvent, variantIndex: number) => {
        $form.variants[variantIndex].size = e.detail.items;
    };

    const handleUploadImage = async (
        event: Event,
        variantIndex: number
    ): Promise<void> => {
        const url = await fetchUploadImage(event);
        if (url) {
            $form.variants[variantIndex].images = [
                ...$form.variants[variantIndex].images,
                url,
            ];
        }
    };

    const addVariant = () => {
        $form.variants = [
            ...$form.variants,
            {
                id: nanoid(5),
                name: "Blanco",
                hexColor: "#ffffff",
                size: [{ id: nanoid(5), name: "XS" }],
                images: [],
            },
        ];
    };

    const deleteVariant = (variantIndex: number) => {
        $form.variants = [
            ...$form.variants.slice(0, variantIndex),
            ...$form.variants.slice(variantIndex + 1),
        ];
    };

    const addVariantSize = (variantIndex: number) => {
        $form.variants[variantIndex].size = [
            ...$form.variants[variantIndex].size,
            { id: nanoid(5), name: "XS" },
        ];
    };

    const deleteVariantSize = (variantIndex: number, sizeIndex: number) => {
        $form.variants[variantIndex].size = [
            ...$form.variants[variantIndex].size.slice(0, sizeIndex),
            ...$form.variants[variantIndex].size.slice(sizeIndex + 1),
        ];
    };
</script>

<svelte:head><title>Admin - Producto nuevo</title></svelte:head>
<div
    class="h-[92vh] overflow-auto px-4 sm:px-4 py-4 bg-slate-100 flex flex-col gap-4"
>
    <form
        class="px-8 py-4 w-full mx-auto flex flex-col gap-4"
        method="POST"
        use:enhance
    >
        <div class="grid grid-cols-2 gap-4">
            <TitleInput bind:value={$form.title} errors={$errors.title} />
            <DescriptionInput
                bind:value={$form.description}
                errors={$errors.description}
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <UnitPriceInput
                bind:value={$form.unit_price}
                errors={$errors.unit_price}
            />
            <DiscountInput
                bind:value={$form.discount}
                errors={$errors.discount}
            />
        </div>

        <div
            class="bg-white flex flex-col px-8 py-4 border rounded-lg {$errors.variants
                ? 'border-red-600'
                : 'border-slate-300'}"
        >
            <span
                class="w-fit font-bold text-[14px] px-2 mb-4 {$errors.variants
                    ? 'bg-red-100  text-red-400 font-bold rounded-full'
                    : ''}"
            >
                Variantes
            </span>
            <div
                class="flex flex-col gap-4"
                use:dndzone={{
                    items: $form.variants,
                    flipDurationMs: 300,
                    dropTargetStyle: { outline: "none" },
                }}
                onconsider={handleDndConsiderVariant}
                onfinalize={handleDndFinalizeVariant}
            >
                {#each $form.variants as variant, variantIndex (variant.id)}
                    <div animate:flip={{ duration: 300 }}>
                        <Variants
                            deleteVariant={() => deleteVariant(variantIndex)}
                            addVariantSize={() => addVariantSize(variantIndex)}
                            {variantIndex}
                            bind:variantName={$form.variants[variantIndex].name}
                            variantNameErrors={$errors.variants?.[variantIndex]
                                .name}
                            bind:variantSizes={$form.variants[variantIndex]
                                .size}
                            bind:variantColor={$form.variants[variantIndex]
                                .hexColor}
                        >
                            {#snippet imageInputChildren()}
                                <VariantImages
                                    uploadImage={handleUploadImage}
                                    {variantIndex}
                                    variantImages={variant.images}
                                />
                            {/snippet}
                            {#snippet sizeInputChildren()}
                                <div
                                    class="flex flex-col gap-4"
                                    use:dndzone={{
                                        items: variant.size,
                                        flipDurationMs: 300,
                                        dropTargetStyle: { outline: "none" },
                                    }}
                                    onconsider={(e) =>
                                        handleDndConsiderSize(e, variantIndex)}
                                    onfinalize={(e) =>
                                        handleDndFinalizeSize(e, variantIndex)}
                                >
                                    {#each variant.size as size, sizeIndex (size.id)}
                                        <div animate:flip={{ duration: 300 }}>
                                            <VariantSize
                                                deleteSize={() =>
                                                    deleteVariantSize(
                                                        variantIndex,
                                                        sizeIndex
                                                    )}
                                                bind:sizeName={$form.variants[
                                                    variantIndex
                                                ].size[sizeIndex].name}
                                                sizeNameErrors={$errors
                                                    .variants?.[variantIndex]
                                                    .size?.[sizeIndex].name}
                                                {sizeIndex}
                                            />
                                        </div>
                                    {/each}
                                </div>
                            {/snippet}
                        </Variants>
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

        <button
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg transition-all duration-200"
            type="submit"
        >
            <span class="font-bold text-[12px]">Confirmar</span>
        </button>
    </form>
</div>
