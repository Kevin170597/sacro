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

    let selectedImage = $state(0);
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex flex-start gap-12">
    {#if data.data}
        <div class="flex gap-4 items-start">
            <div
                class="w-[65%] bg-white p-3 border border-slate-300 rounded-lg"
            >
                <div class="flex border-b border-slate-300 pb-8">
                    <div class="w-[8%] flex flex-col gap-2 p-2">
                        {#each data.data.variants[selectedColor].images as img, i}
                            <button
                                onclick={() => (selectedImage = i)}
                                class="border border-slate-400 p-1 rounded-lg {selectedImage ===
                                i
                                    ? 'border-2'
                                    : ''}"
                            >
                                <img src={img} alt="" />
                            </button>
                        {/each}
                    </div>
                    <div class="w-[92%] flex justify-center">
                        <img
                            src={data.data.variants[selectedColor].images[
                                selectedImage
                            ]}
                            class="w-[60%] h-fit"
                            alt=""
                        />
                    </div>
                </div>
                <div class="p-4 border-b border-slate-300">
                    <h2 class="text-[20px] mb-4">Otros productos similares</h2>
                    <div class="flex gap-2">
                        <div
                            class="w-[50%] flex gap-2 items-center p-4 border border-slate-300 rounded-lg"
                        >
                            <img
                                class="w-[20%] h-fit"
                                src={"https://http2.mlstatic.com/D_NQ_NP_2X_660193-MLA80828057281_112024-F.webp"}
                                alt=""
                            />
                            <div class="w-[80%]">
                                <p class="text-[14px]">
                                    Chaqueta Arciel Cuello V | Combinado | Sacro
                                </p>
                                <p class="text-[24px]">$36.900</p>
                            </div>
                        </div>
                        <div
                            class="w-[50%] flex gap-2 items-center p-4 border border-slate-300 rounded-lg"
                        >
                            <img
                                class="w-[20%] h-fit"
                                src={"https://http2.mlstatic.com/D_NQ_NP_2X_660193-MLA80828057281_112024-F.webp"}
                                alt=""
                            />
                            <div class="w-[80%]">
                                <p class="text-[14px]">
                                    Chaqueta Arciel Cuello V | Combinado | Sacro
                                </p>
                                <p class="text-[24px]">$36.900</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <h2 class="text-[20px] mb-4">Descripción</h2>
                    <p class="whitespace-pre-line">
                        {data.data.description}
                        </p>
                </div>
            </div>
            <div
                class="w-[35%] bg-white border border-slate-300 rounded-lg p-4 flex flex-col gap-4"
            >
                <div>
                    <h1 class="font-bold text-[22px]">
                        {data.data?.title}
                    </h1>
                    <h2 class="text-[40px]">
                        ${data.data?.unit_price.toLocaleString("es-ar")}
                    </h2>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <p>Color:</p>
                        <b>{data.data.variants[selectedColor].name}</b>
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        {#each data.data.variants as variant, i}
                            <button
                                onclick={() => {selectedColor = i; selectedImage = 0; selectedSize = 0}}
                                class="w-10 h-10 rounded-full border-2 border-slate-300 {selectedColor ===
                                i
                                    ? 'border-4 border-slate-500'
                                    : ''}"
                                style="background-color: {variant.hexColor};"
                                aria-label="color"
                            ></button>
                        {/each}
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <p>Talle:</p>
                        <b>
                            {data.data.variants[selectedColor].size[
                                selectedSize
                            ].name}
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
                </div>
                <b class="text-[14px] text-orange-600"
                    >Disponible 5 días después de tu compra</b
                >
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
