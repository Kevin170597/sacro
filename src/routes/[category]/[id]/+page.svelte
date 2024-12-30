<script lang="ts">
    import {
        ImageDisplay,
        ProductData,
        RelatedProducts,
        CartActionButtons,
    } from "./snippets";
    import mercadopagologo from "$lib/images/mercadopagologo.png";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    let selectedColor: number = $state(0);
    let selectedSize: number = $state(0);
    let selectedImage: number = $state(0);
</script>

<svelte:head>
    <title>{data.product?.title}</title>
</svelte:head>

<div class="min-h-[92vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-start gap-12">
    {#if data.product}
        <div class="flex flex-col sm:flex-row w-full gap-4 items-start">
            <div
                class="w-full sm:w-[65%] bg-white p-3 border border-slate-300 rounded-lg"
            >
                <ImageDisplay
                    images={data.product.variants[selectedColor].images}
                    bind:selectedImage
                />
                <RelatedProducts relatedProducts={data.relatedProducts} />
                <div class="p-4">
                    <h2 class="text-[20px] mb-4">Descripción</h2>
                    <p class="whitespace-pre-line">
                        {data.product.description}
                    </p>
                </div>
            </div>
            <div
                class="w-full sm:w-[35%] bg-white border border-slate-300 rounded-lg p-4 flex flex-col gap-4"
            >
                <ProductData
                    product={data.product}
                    bind:selectedColor
                    bind:selectedImage
                    bind:selectedSize
                />
                <b class="text-[14px] text-orange-600">
                    Disponible 5 días después de tu compra
                </b>
                <div class="flex gap-2 items-center">
                    <img src={mercadopagologo} class="w-[10%] h-fit" alt="" />
                    <p class="text-slate-600 text-[14px]">
                        Procesamos tu compra a través de MercadoPago.
                    </p>
                </div>
                <CartActionButtons
                    product={data.product}
                    {selectedColor}
                    {selectedSize}
                />
            </div>
        </div>
    {/if}
</div>
