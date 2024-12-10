<script lang="ts">
    import mercadopagologo from "$lib/images/mercadopagologo.png";
    import { ImageDisplay, ProductData } from "./snippets";
    import { RelatedProducts } from "./snippets";
    import type { PageData } from "./$types";
    import { cart } from "$lib/stores";

    let { data }: { data: PageData } = $props();
    const { addToCart } = cart;

    let selectedColor = $state(0);
    let selectedSize = $state(0);
    let selectedImage = $state(0);

    const handleAddToCart = () => {
        const productId = data.product?._id;
        const colorId = data.product?.variants[selectedColor].id;
        const sizeId =
            data.product?.variants[selectedColor].size[selectedSize].id;

        if (productId && colorId && sizeId) {
            addToCart(productId, colorId, sizeId);
        } else {
            console.warn("Missing required data to add to cart.");
        }
    };
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex flex-start gap-12">
    {#if data.product}
        <div class="flex gap-4 items-start">
            <div
                class="w-[65%] bg-white p-3 border border-slate-300 rounded-lg"
            >
                <ImageDisplay
                    variant={data.product.variants[selectedColor]}
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
                class="w-[35%] bg-white border border-slate-300 rounded-lg p-4 flex flex-col gap-4"
            >
                <ProductData
                    product={data.product}
                    bind:selectedColor
                    bind:selectedImage
                    bind:selectedSize
                />
                <b class="text-[14px] text-orange-600"
                    >Disponible 5 días después de tu compra</b
                >
                <div class="flex gap-2 items-center">
                    <img src={mercadopagologo} class="w-[10%] h-fit" alt="" />
                    <p class="text-slate-600 text-[15px]">
                        Procesamos tu compra a través de MercadoPago.
                    </p>
                </div>
                <button
                    onclick={() => handleAddToCart()}
                    class="border-2 border-slate-800 p-2 w-full rounded-lg"
                >
                    <b>Agregar al carrito</b>
                </button>
            </div>
        </div>
    {/if}
</div>
