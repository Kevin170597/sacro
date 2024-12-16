<script lang="ts">
    import type { Product, Variant, Size } from "$lib/interfaces";
    import { UploadIcon } from "$lib/components/icons";
    import { AliasButton, PdfPreview, ProductCard } from "./snippets";
    import { cart, type CartItem } from "$lib/stores";
    import { superForm } from "sveltekit-superforms";

    let { data } = $props();
    const { form, enhance } = superForm(data.form);

    interface CartProduct extends Product {
        quantity: number;
    }

    let cartProducts: CartProduct[] = $state([]);

    const getManyProductsById = async (): Promise<CartProduct[]> => {
        const productIds: string[] = $cart.map(({ id }) => id);
        const response: Response = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(productIds),
        });
        const fetchedProducts: CartProduct[] = await response.json();

        return (cartProducts = $cart
            .map(({ id, colorId, sizeId, quantity }: CartItem) => {
                const product = fetchedProducts.find(
                    (product: CartProduct) => product._id === id,
                );
                if (!product) return null;

                const [selectedColor] = product.variants.filter(
                    (variant) => variant.id === colorId,
                );
                if (!selectedColor) return null;

                const [selectedSize] = selectedColor.size.filter(
                    (size) => size.id === sizeId,
                );
                if (!selectedSize) return null;

                return {
                    ...product,
                    variants: [{ ...selectedColor, size: [selectedSize] }],
                    quantity,
                };
            })
            .filter((item): item is CartProduct => item !== null));
    };

    $effect(() => {
        getManyProductsById();
    });

    let pdfFile: string | null = $state(null);
    let fileName: string | null = $state(null);

    const handleFileChange = (event: any) => {
        const file = event?.target.files[0];
        if (file && file.type === "application/pdf") {
            pdfFile = file;
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = () => {
                pdfFile = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
</script>

<div class="min-h-[85vh] bg-slate-100 flex justify-center items-start py-4">
    <div
        class="bg-white flex flex-col gap-2 border border-slate-300 rounded-lg px-8 py-4 w-3/6"
    >
        <h1 class="font-bold">Resumen de orden</h1>
        {#if cartProducts.length}
            {#each cartProducts as product}
                <ProductCard {product} />
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
                <AliasButton />
                <form
                    method="POST"
                    enctype="multipart/form-data"
                    class="flex flex-col gap-4 items-center w-full"
                    use:enhance
                >
                    <h2>Sube el comprobante de pago.</h2>
                    <div
                        class="w-full flex flex-col items-center gap-4 px-8 py-4 border-2 border-dotted border-sky-400 rounded-lg"
                    >
                        <UploadIcon />
                        <input
                            onchange={(e) => handleFileChange(e)}
                            bind:value={$form.pdf}
                            type="file"
                            name="pdf"
                            id="pdf"
                            accept=".pdf"
                            required
                        />
                    </div>
                    {#if pdfFile}
                        <PdfPreview {pdfFile} {fileName} />
                    {/if}
                    <button
                        type="submit"
                        class="border-2 border-slate-800 p-2 w-2/5 rounded-lg hover:bg-slate-800 transition-colors duration-300 hover:text-white"
                    >
                        <span class="font-bold">Confirmar</span>
                    </button>
                </form>
            </div>
        {/if}
    </div>
</div>
