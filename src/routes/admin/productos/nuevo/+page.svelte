<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import type { PageData } from "./$types";
    import { nanoid } from "nanoid";
    import {
        TitleInput,
        UnitPriceInput,
        DiscountInput,
        DescriptionInput,
        VariantNameInput,
        VariantColorInput,
        VariantSizeNameInput
    } from "./snippets";

    let { data }: { data: PageData } = $props();

    const { form, enhance, errors } = superForm(data.form, {
        dataType: "json",
    });

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

    let variantDropped: number | null = $state(null);
    let sizeDropped: number | null = $state(null);
</script>

<div class="min-h-[100vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
    <form
        class="px-8 py-4 w-4/5 mx-auto flex flex-col gap-4"
        method="POST"
        use:enhance
    >
        <TitleInput bind:value={$form.title} errors={$errors.title} />
        <UnitPriceInput
            bind:value={$form.unit_price}
            errors={$errors.unit_price}
        />
        <DiscountInput bind:value={$form.discount} errors={$errors.discount} />
        <DescriptionInput
            bind:value={$form.description}
            errors={$errors.description}
        />
        
        <div
            class="bg-white flex flex-col px-8 py-4 border rounded-lg {$errors.variants
                ? 'border-red-600'
                : 'border-slate-300'}"
        >
            <label
                for="variants"
                class="w-fit font-bold text-[14px] px-2 mb-4 {$errors.variants
                    ? 'bg-red-100  text-red-400 font-bold rounded-full'
                    : ''}"
            >
                Variantes
            </label>
            <div class="border border-slate-300 rounded-lg">
                {#each $form.variants as variant, variantIndex}
                    <div
                        class="px-8 py-4 flex border-b border-slate-300
                        {variantDropped === variantIndex ? 'bg-slate-100' : ''} 
                        {variantDropped === variantIndex && variantIndex === 0
                            ? 'rounded-t-lg'
                            : ''}
                        {variantIndex === $form.variants.length - 1 &&
                        variantDropped !== variantIndex
                            ? 'border-b-0'
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
                            <span
                                class="text-[14px] px-2 {$errors.variants?.[
                                    variantIndex
                                ]
                                    ? 'bg-red-100  text-red-400 font-bold rounded-full'
                                    : ''}"
                            >
                                {variant.name}
                            </span>
                            {#if variantIndex === 0}
                                <span
                                    class="text-[10px] bg-sky-200 text-sky-600 font-bold p-1 px-2 rounded-full"
                                >
                                    VARIANTE PRINCIPAL
                                </span>
                            {/if}
                        </button>
                        <div class="w-[40%] flex justify-center">
                            {#if variant.images.length > 0}
                                <img
                                    class="w-[18%] h-fit aspect-square object-cover rounded-full border border-slate-300"
                                    src={variant.images[0]}
                                    alt=""
                                />
                            {:else}
                                <div
                                    class="w-[18%] h-fit aspect-square rounded-full border border-slate-300"
                                ></div>
                            {/if}
                        </div>
                        <div class="w-[20%]">
                            <p class="text-[14px] text-slate-400">Talles:</p>
                            <p class="text-[12px]">
                                {variant.size.map((size) => size.name)}
                            </p>
                        </div>
                    </div>
                    {#if variantDropped === variantIndex}
                        <div class="flex px-4 pb-4">
                            <VariantNameInput
                                bind:value={$form.variants[variantIndex].name}
                                errors={$errors.variants?.[variantIndex].name}
                            />
                            <VariantColorInput
                                bind:value={$form.variants[variantIndex]
                                    .hexColor}
                            />
                        </div>
                        <div class="px-4 pb-4">
                            {#if $errors.variants?.[variantIndex].images}
                                <span class="text-red-600 text-[12px]">
                                    {$errors.variants?.[variantIndex]?.images
                                        ._errors}
                                </span>
                            {/if}
                        </div>
                        <div class="px-4 pb-4">
                            <div class="border border-slate-300 rounded-lg">
                                {#each variant.size as size, sizeIndex}
                                    <div
                                        class="flex flex-col gap-2 border-b border-slate-300
                                        {sizeIndex ===
                                        $form.variants[variantIndex].size
                                            .length -
                                            1
                                            ? 'border-b-0'
                                            : ''}"
                                    >
                                        <button
                                            onclick={() =>
                                                sizeDropped === sizeIndex
                                                    ? (sizeDropped = null)
                                                    : (sizeDropped = sizeIndex)}
                                            type="button"
                                            class="px-8 py-4 text-left
                                            {sizeDropped === sizeIndex
                                                ? 'border-b border-slate-300 bg-slate-100'
                                                : ''}
                                            {sizeIndex === 0
                                                ? 'rounded-t-lg'
                                                : ''}"
                                        >
                                            <span class="text-[14px]">
                                                Talle
                                            </span>
                                            <span
                                                class="text-[14px] text-slate-400"
                                            >
                                                {size.name}
                                            </span>
                                        </button>
                                        {#if sizeDropped === sizeIndex}
                                            <VariantSizeNameInput
                                                bind:value={$form.variants[
                                                    variantIndex
                                                ].size[sizeIndex].name}
                                                errors={$errors.variants?.[
                                                    variantIndex
                                                ].size?.[sizeIndex].name}
                                            />
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>

            <button
                class="bg-sky-200 hover:bg-sky-300 text-sky-600 w-fit mt-4 mr-auto px-4 py-2 rounded-lg"
                type="button"
                onclick={() => addVariant()}
            >
                <span class="font-bold text-[12px]">Agregar variante</span>
            </button>
        </div>

        <button
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
            type="submit"
        >
            <span class="font-bold text-[12px]">Confirmar</span>
        </button>
    </form>
</div>
