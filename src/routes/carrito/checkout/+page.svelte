<script lang="ts">
    import type { Product, Variant, Size } from "$lib/interfaces";
    import { CopyToClipboard, UploadIcon } from "$lib/components/icons";
    import { cart, type CartItem } from "$lib/stores";

    interface CartProduct extends Product {
        quantity: number;
    }

    let cartProducts: CartProduct[] = $state([]);

    const getManyProductsById = async (): Promise<CartProduct[]> => {
        let ids: string[] = $cart.map((item: CartItem) => item.id);
        let res: Response = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(ids),
        });
        let fetchedProducts: CartProduct[] = await res.json();

        cartProducts = $cart
            .map((cartItem: CartItem) => {
                let product: CartProduct | undefined = fetchedProducts.find(
                    (product: CartProduct) => product._id === cartItem.id,
                );
                if (product) {
                    let customizedProduct = { ...product };

                    let selectedColor: Variant | undefined =
                        customizedProduct.variants.find(
                            (variant: Variant) =>
                                variant.id === cartItem.colorId,
                        );
                    if (selectedColor) {
                        customizedProduct.variants = [selectedColor];

                        let selectedSize: Size | undefined =
                            selectedColor?.size.find(
                                (size: Size) => size.id === cartItem.sizeId,
                            );
                        if (selectedSize)
                            return {
                                ...customizedProduct,
                                variants: [
                                    {
                                        ...selectedColor,
                                        size: [selectedSize],
                                    },
                                ],
                                quantity: cartItem.quantity,
                            };
                    }
                }
                return null;
            })
            .filter((item): item is CartProduct => item !== null);
        return cartProducts;
    };

    $effect(() => {
        getManyProductsById();
    });

    let copied: boolean = $state(false);

    const copyToClipboard = async (content: string) => {
        await navigator.clipboard.writeText(content);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    };
</script>

<div class="min-h-[85vh] bg-slate-100 flex justify-center items-start py-4">
    <div
        class="bg-white flex flex-col gap-2 border border-slate-300 rounded-lg px-8 py-4 w-3/6"
    >
        <h1 class="font-bold">Resumen de orden</h1>
        {#if cartProducts.length}
            {#each cartProducts as product}
                <div class="flex items-center border-b border-slate-300 py-2">
                    <div class="w-[10%] p-2">
                        <img src={product.variants[0].images[0]} alt="" />
                    </div>
                    <div class="w-[60%]">
                        <h2>{product.title}</h2>
                        <p class="mt-0 text-slate-500 text-[14px]">
                            Color: {product.variants[0].name}, Talle: {product
                                .variants[0].size[0].name}
                        </p>
                    </div>
                    <div class="w-[10%]">
                        <p class="text-center">x{product.quantity}</p>
                    </div>
                    <div class="w-[20%]">
                        <p class="text-right text-[20px]">
                            ${(
                                product.unit_price * product.quantity
                            ).toLocaleString("es-ar")}
                        </p>
                    </div>
                </div>
            {/each}
            <div class="flex flex-col gap-4 items-center py-4">
                <b class="text-[36px] text-center">
                    ${cartProducts
                        .reduce(
                            (total, product) =>
                                total + product.quantity * product.unit_price,
                            0,
                        )
                        .toLocaleString("es-ar")}
                </b>
                <button
                    onclick={() => copyToClipboard("alias.alias.al")}
                    class="hover:bg-slate-200 hover:text-slate-500 select-text relative px-2 flex items-center gap-2 w-fit rounded-full transition-all duration-100"
                >
                    <p class="text-[20px]">alias.alias.al</p>
                    <CopyToClipboard />
                    {#if copied}
                        <p
                            class="text-green-600 animate-bounce absolute top-8 left-8"
                        >
                            ¡Copiado!
                        </p>
                    {/if}
                </button>
                <h2>Sube el comprobante de pago.</h2>
                <div
                    class="flex flex-col items-center gap-4 px-8 py-4 border-2 border-dotted border-sky-400 rounded-lg"
                >
                    <UploadIcon />
                    <input type="file" />
                </div>
                <button
                    class="border-2 border-slate-800 p-2 w-2/5 rounded-lg hover:bg-slate-800 transition-colors duration-300 hover:text-white"
                >
                    <b>Confirmar</b>
                </button>
            </div>
        {/if}
    </div>
</div>
