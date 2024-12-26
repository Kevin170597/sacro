<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { fetchUploadImages } from "./helpers";
    import type { PageData } from "./$types";
    import { nanoid } from "nanoid";
    import {
        TitleInput,
        UnitPriceInput,
        DiscountInput,
        DescriptionInput,
        VariantSize,
        Variants,
    } from "./snippets";

    let { data }: { data: PageData } = $props();

    const { form, enhance, errors } = superForm(data.form, {
        dataType: "json",
    });

    let uploadingPreview: string | null = $state(null);
    let uploading: boolean = $state(false);

    const handleUploadImage = async (
        event: Event,
        variantIndex: number,
    ): Promise<void> => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] as File | undefined;
        if (file) {
            uploadingPreview = URL.createObjectURL(file);
            uploading = true;
            const url = await fetchUploadImages(event);
            if (url) {
                $form.variants[variantIndex].images = [
                    ...$form.variants[variantIndex].images,
                    url,
                ];
                uploadingPreview = null;
                uploading = false;
            }
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

    const addVariantSize = (variantIndex: number) => {
        $form.variants[variantIndex].size = [
            ...$form.variants[variantIndex].size,
            { id: nanoid(5), name: "XS" },
        ];
    };

    const addVariantImage = (variantIndex: number) => {
        $form.variants[variantIndex].images = [
            ...$form.variants[variantIndex].images,
            "",
        ];
    };
</script>

<svelte:head><title>Nuevo</title></svelte:head>

<div
    class="h-[92vh] overflow-auto px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4"
>
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
            <span
                class="w-fit font-bold text-[14px] px-2 mb-4 {$errors.variants
                    ? 'bg-red-100  text-red-400 font-bold rounded-full'
                    : ''}"
            >
                Variantes
            </span>
            <div class="border border-slate-300 rounded-lg">
                {#each $form.variants as variant, variantIndex}
                    <Variants
                        {variantIndex}
                        bind:variantName={$form.variants[variantIndex].name}
                        variantNameErrors={$errors.variants?.[variantIndex]
                            .name}
                        bind:variantSizes={$form.variants[variantIndex].size}
                        bind:variantColor={$form.variants[variantIndex]
                            .hexColor}
                    >
                        {#snippet sizeInputChildren()}
                            {#each variant.size as _, sizeIndex}
                                <VariantSize
                                    bind:sizeName={$form.variants[variantIndex]
                                        .size[sizeIndex].name}
                                    sizeNameErrors={$errors.variants?.[
                                        variantIndex
                                    ].size?.[sizeIndex].name}
                                    {sizeIndex}
                                />
                            {/each}
                        {/snippet}
                        {#snippet addSizeChildren()}
                            <button
                                class="bg-sky-200 hover:bg-sky-300 text-sky-600 w-fit mt-4 mr-auto px-4 py-2 rounded-lg"
                                type="button"
                                onclick={() => addVariantSize(variantIndex)}
                            >
                                <span class="font-bold text-[12px]">
                                    Agregar talle
                                </span>
                            </button>
                        {/snippet}
                        {#snippet imageInputChildren()}
                            <div class="p-4 flex">
                                <label
                                    class="bg-sky-200 hover:bg-sky-300 text-sky-600 px-4 py-2 border border-sky-200 rounded-lg cursor-pointer {uploading
                                        ? 'animate-pulse'
                                        : ''} "
                                >
                                    <input
                                        disabled={uploading ? true : false}
                                        class="hidden"
                                        onchange={(e) =>
                                            handleUploadImage(e, variantIndex)}
                                        type="file"
                                        name=""
                                        id=""
                                    />
                                    <span class="font-bold text-[12px]">
                                        {uploading
                                            ? "Subiendo imagen..."
                                            : "Seleccione una imagen +"}
                                    </span>
                                </label>
                            </div>
                            <div class="flex flex-wrap gap-2 p-4 pt-0">
                                {#each variant.images as image, imageIndex}
                                    <img
                                        class="w-[20%] aspect-square object-contain rounded-lg border border-slate-300"
                                        src={image}
                                        alt=""
                                    />
                                {/each}
                                {#if uploadingPreview}
                                    <img
                                        class="w-[20%] aspect-square object-contain rounded-lg border border-slate-300 animate-pulse opacity-5"
                                        src={uploadingPreview}
                                        alt=""
                                    />
                                {/if}
                            </div>
                        {/snippet}
                        <!-- {#snippet addImageChildren()}
                            <button
                                class="bg-sky-200 hover:bg-sky-300 text-sky-600 w-fit mt-4 mr-auto px-4 py-2 rounded-lg"
                                type="button"
                                onclick={() => addVariantImage(variantIndex)}
                            >
                                <span class="font-bold text-[12px]">
                                    Agregar imagen
                                </span>
                            </button>
                        {/snippet} -->
                    </Variants>
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
