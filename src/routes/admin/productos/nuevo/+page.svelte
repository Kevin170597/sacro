<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const { form, enhance, errors } = superForm(data.form, {
        dataType: "json",
    });

    const addVariant = () => {
        $form.variants = [
            ...$form.variants,
            {
                id: "1s",
                name: "",
                hexColor: "#ffffff",
                size: [{ id: "1", name: "XS" }],
                images: [
                    "https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-a-guy-with-a-cap-at-red-sky-sunset-free-image.jpeg?h=800&quality=80",
                ],
            },
        ];
    };
</script>

<div class="min-h-[100vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
    <form
        class="px-8 py-4 w-4/5 mx-auto flex flex-col gap-4"
        method="POST"
        use:enhance
    >
        <div
            class="bg-white flex flex-col gap-4 px-8 py-4 border border-slate-300 rounded-lg"
        >
            <label for="title" class="font-bold text-[14px]">Título</label>
            <input
                class="border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                type="text"
                name="title"
                id="title"
                placeholder="Escribir..."
                bind:value={$form.title}
            />
        </div>
        <div
            class="bg-white flex flex-col gap-4 px-8 py-4 border border-slate-300 rounded-lg"
        >
            <label for="unit_price" class="font-bold text-[14px]">Precio</label>
            <div class="flex gap-2 items-center">
                <p>$</p>
                <input
                    class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                    type="number"
                    name="unit_price"
                    id="unit_price"
                    placeholder="0"
                    bind:value={$form.unit_price}
                />
            </div>
        </div>
        <div
            class="bg-white flex flex-col gap-4 px-8 py-4 border border-slate-300 rounded-lg"
        >
            <label for="discount" class="font-bold text-[14px]">Descuento</label
            >
            <div class="flex gap-2 items-center">
                <p>%</p>
                <input
                    class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="Escribir..."
                    bind:value={$form.discount}
                />
            </div>
        </div>
        <div
            class="bg-white flex flex-col gap-4 px-8 py-4 border border-slate-300 rounded-lg"
        >
            <label for="description" class="font-bold text-[14px]"
                >Descripción</label
            >
            <textarea
                class="border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                name="description"
                id="description"
                placeholder="Escribie una descripción..."
                bind:value={$form.description}
            ></textarea>
        </div>
        <div
            class="bg-white flex flex-col gap-4 px-8 py-4 border border-slate-300 rounded-lg"
        >
            <span class="font-bold text-[14px]">Variants</span>
            {#each $form.variants as variant, variantIndex}
                <div
                    class="px-8 py-4 border border-slate-300 flex
                        {variantIndex === 0 ? 'rounded-t-lg' : ''} 
                        {variantIndex === $form.variants.length - 1
                        ? 'rounded-b-lg border-b'
                        : 'border-b-0'}"
                >
                    <button
                        type="button"
                        class="w-[40%] text-left flex flex-col justify-center gap-1"
                    >
                        <span class="text-[14px]">{variant.name}</span>
                        {#if variantIndex === 0}
                            <span
                                class="text-[10px] bg-sky-200 text-sky-600 font-bold p-1 px-2 rounded-full"
                            >
                                VARIANTE PRINCIPAL
                            </span>
                        {/if}
                    </button>
                    <div class="w-[40%] flex justify-center">
                        <img
                            class="w-[18%] h-fit aspect-square object-cover rounded-full border border-slate-300"
                            src={variant.images[0]}
                            alt=""
                        />
                    </div>
                    <div class="w-[20%]">
                        <p class="text-[14px] text-slate-400">Talles:</p>
                        <p class="text-[12px]">
                            {variant.size.map((size) => size.name)}
                        </p>
                    </div>
                </div>
            {/each}
            <button onclick={() => addVariant()}>Agregar variant</button>
        </div>

        <button
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
            type="submit"
        >
            <span class="font-bold text-[12px]">Confirmar</span>
        </button>
    </form>
</div>
