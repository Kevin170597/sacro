<script lang="ts">
    import { AliasButton, PdfPreview, ProductCard } from "./snippets";
    import { UploadIcon } from "$lib/components/icons";
    import { cart } from "$lib/stores";
    import { superForm } from "sveltekit-superforms";
    import type { Product } from "$lib/interfaces";

    let { data } = $props();
    const { form, enhance, message, errors } = superForm(data.form, {
        onSubmit: ({ formData }) => {
            formData.append("products", JSON.stringify(cartProducts));
        },
    });

    type CartProduct = Product & { quantity: number };

    let cartProducts: CartProduct[] = $state([]);

    const getManyProductsById = async (): Promise<CartProduct[]> => {
        const productIds: string[] = $cart.map(({ id }) => id);
        const response: Response = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(productIds),
        });
        const fetchedProducts: CartProduct[] = await response.json();

        return (cartProducts = $cart.map(({ id, colorId, sizeId, quantity }) => {
            const product = fetchedProducts.find((p) => p._id === id);
            if (!product) return null;
            const [selectedColor] = product.variants.filter((v) => v.id === colorId);
            if (!selectedColor) return null;
            const [selectedSize] = selectedColor.size.filter((s) => s.id === sizeId);
            if (!selectedSize) return null;
            return {
                ...product,
                variants: [{ ...selectedColor, size: [selectedSize] }],
                quantity,
            };
        }).filter((p): p is CartProduct => p !== null));
    };

    $effect(() => {
        getManyProductsById();
    });

    let pdfFile: string | File | null = $state(null);
    let fileName: string | null = $state(null);

    const handleFileChange = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        const selectedFile = target.files?.[0] as File | undefined;
        if (selectedFile && selectedFile.type === "application/pdf") {
            pdfFile = selectedFile;
            fileName = selectedFile.name;
            const reader = new FileReader();
            reader.onload = (): void => {
                pdfFile = reader.result as string;
            };
            reader.readAsDataURL(selectedFile);
        }
    };
</script>

<svelte:head>
    <title>Checkout</title>
</svelte:head>

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
                            (accumulator, { quantity, unit_price }) =>
                                accumulator + quantity * unit_price,
                            0,
                        )
                        .toLocaleString("es-ar")}
                </b>
                <AliasButton />
                <form
                    method="POST"
                    enctype="multipart/form-data"
                    class="flex flex-col gap-4 items-center w-full mt-4"
                    use:enhance
                >
                    <div
                        class="w-full flex flex-col items-center gap-4 px-8 py-4 border-2 border-dotted rounded-lg {$errors.pdf
                            ? 'border-red-600'
                            : 'border-sky-400'}"
                    >
                        <h2>Sube el comprobante de pago.</h2>
                        <UploadIcon />
                        <input
                            onchange={(e) => handleFileChange(e)}
                            bind:value={$form.pdf}
                            type="file"
                            name="pdf"
                            id="pdf"
                            accept=".pdf"
                        />
                    </div>
                    {#if pdfFile}
                        <PdfPreview {pdfFile} {fileName} />
                    {/if}
                    {#if $errors.pdf}
                        <span class="text-red-600 text-[14px]">
                            {$errors.pdf}
                        </span>
                    {/if}
                    <div class="w-3/5 items-center flex flex-col gap-2">
                        <label for="email" class="w-full">Email</label>
                        <input
                            class="w-full outline-none border rounded-lg p-2 {$errors.email
                                ? 'border-red-600'
                                : 'border-slate-300'}"
                            placeholder="@"
                            bind:value={$form.email}
                            type="text"
                            name="email"
                            id="email"
                        />
                    </div>
                    {#if $errors.email}
                        <span class="text-red-600 text-[14px]">
                            {$errors.email}
                        </span>
                    {/if}
                    <button
                        type="submit"
                        class="border-2 border-slate-800 p-2 w-3/5 rounded-lg hover:bg-slate-800 transition-colors duration-300 hover:text-white"
                    >
                        <span class="font-bold">Confirmar</span>
                    </button>
                </form>
            </div>
        {/if}
    </div>
</div>
