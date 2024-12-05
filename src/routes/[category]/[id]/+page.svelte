<script lang="ts">
    import Cover from "../../../assets/Portada ML ambo 410 con vivos.png.jpg";
    import type { PageData } from "./$types";
    import { cart } from "$lib/stores";

    let { data }: { data: PageData } = $props();
    const { addToCart } = cart;

    let selectedColor = $state(0);
    let selectedSize = $state(0);

    const handleAddToCart = () => {
        const productId = data.data?._id;
        const colorId = data.data?.variants[selectedColor].id;
        const sizeId = data.data?.variants[selectedColor].size[selectedSize].id;

        if (productId && colorId && sizeId) {
            addToCart(productId, colorId, sizeId);
        } else {
            console.warn("Missing required data to add to cart.");
        }
    };
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex flex-start gap-12">
    {#if data.data}
        <div class="flex gap-4 items-start">
            <div
                class="w-[65%] bg-white p-3 border border-slate-300 rounded-lg"
            >
                <img src={Cover} class="w-[60%]" alt="" />
            </div>
            <div
                class="w-[30%] bg-white border border-slate-300 rounded-lg p-4 flex flex-col gap-3"
            >
                <h1 class="font-bold text-[22px]">
                    {data.data?.title}
                </h1>
                <h2 class="text-[40px]">
                    ${data.data?.unit_price.toLocaleString("es-ar")}
                </h2>
                <div class="flex gap-2">
                    <p>Color:</p>
                    <b>{data.data.variants[selectedColor].name}</b>
                </div>
                <div class="flex gap-2">
                    {#each data.data.variants as variant, i}
                        <button
                            onclick={() => (selectedColor = i)}
                            class="w-10 h-10 rounded-full {selectedColor === i
                                ? 'border-4 border-slate-500'
                                : ''}"
                            style="background-color: {variant.hexColor};"
                            aria-label="color"
                        ></button>
                    {/each}
                </div>
                <div class="flex gap-2">
                    <p>Talle:</p>
                    <b>
                        {data.data.variants[selectedColor].size[selectedSize]
                            .name}
                    </b>
                </div>
                <div class="flex gap-2">
                    {#each data.data.variants[selectedColor].size as size, i}
                        <button
                            onclick={() => (selectedSize = i)}
                            class="border border-slate-300 w-10 h-8 rounded-lg text-[14px] {selectedSize ===
                            i
                                ? 'border-4 border-slate-500'
                                : ''}"
                        >
                            {size.name}
                        </button>
                    {/each}
                </div>
                <button
                    onclick={() => handleAddToCart()}
                    class="border-2 border-slate-800 p-2 w-full rounded-lg"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    {/if}
</div>
