<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const { form, enhance, delayed } = superForm(data.form, {
        dataType: "json",
    });

    const {
        form: titleForm,
        enhance: titleEnhance,
        errors: titleErrors,
    } = superForm(data.titleForm, {
        dataType: "json",
    });

    const {
        form: unitPriceForm,
        enhance: unitPriceEnhance,
        errors: unitPriceErrors,
    } = superForm(data.unitPriceForm, {
        dataType: "json",
    });

    const {
        form: discountForm,
        enhance: discountEnhance,
        errors: discountErrors,
    } = superForm(data.discountForm, {
        dataType: "json",
    });

    const {
        form: descriptionForm,
        enhance: descriptionEnhance,
        errors: descriptionErrors,
    } = superForm(data.descriptionForm, {
        dataType: "json",
    });

    let dropped: string = $state("");
</script>

<div class="bg-slate-100 px-12 p-4 flex flex-col gap-4">
    <div
        class="w-full flex flex-col gap-2 bg-white border border-slate-300 rounded-lg"
    >
        <button
            onclick={() =>
                dropped === "title" ? (dropped = "") : (dropped = "title")}
            class="text-left flex flex-col gap-2 hover:bg-gray-100 px-8 py-4 {dropped ===
            'title'
                ? 'border-b border-slate-300'
                : ''}"
        >
            <b>Título</b>
            <span class="text-slate-500 text-[14px]">{$form.title}</span>
        </button>
        {#if dropped === "title"}
            <form
                class="flex flex-col gap-4 px-8 py-4"
                method="POST"
                action="?/title"
                use:titleEnhance
            >
                {#if $titleErrors.title}
                    <span class="text-red-600">{$titleErrors.title}</span>
                {/if}
                <input
                    class="border border-slate-400 p-4 rounded-lg outline-none"
                    type="text"
                    name="title"
                    bind:value={$titleForm.title}
                />
                <button
                    class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
                    type="submit"
                >
                    <span class="font-bold text-[12px]">Confirmar</span>
                </button>
            </form>
        {/if}
    </div>

    <div
        class="w-full flex flex-col gap-2 px-8 py-4 bg-white border border-slate-300 rounded-lg"
    >
        <b>Precio</b>
        <form
            class="flex flex-col gap-4"
            method="POST"
            action="?/unit_price"
            use:unitPriceEnhance
        >
            {#if $unitPriceErrors.unit_price}
                <span class="text-red-600">{$unitPriceErrors.unit_price}</span>
            {/if}
            <div class="flex items-center gap-2">
                <p class="text-[24px] text-slate-500">$</p>
                <input
                    class="w-full border border-slate-400 p-4 rounded-lg outline-none"
                    type="number"
                    placeholder="0"
                    name="unit_price"
                    bind:value={$unitPriceForm.unit_price}
                />
            </div>
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    </div>

    <div
        class="w-full flex flex-col gap-2 px-8 py-4 bg-white border border-slate-300 rounded-lg"
    >
        <b>Descuento</b>
        <form
            class="flex flex-col gap-4"
            method="POST"
            action="?/discount"
            use:discountEnhance
        >
            {#if $discountErrors.discount}
                <span class="text-red-600">{$discountErrors.discount}</span>
            {/if}
            <div class="flex items-center gap-2">
                <p class="text-[24px] text-slate-500">%</p>
                <input
                    class="w-full border border-slate-400 p-4 rounded-lg outline-none"
                    type="number"
                    placeholder="0"
                    name="discount"
                    bind:value={$discountForm.discount}
                />
            </div>
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    </div>

    <div
        class="w-full flex flex-col gap-2 px-8 py-4 bg-white border border-slate-300 rounded-lg"
    >
        <b>Descripción</b>
        <form
            class="flex flex-col gap-4"
            method="POST"
            action="?/description"
            use:descriptionEnhance
        >
            {#if $descriptionErrors.description}
                <span class="text-red-600"
                    >{$descriptionErrors.description}</span
                >
            {/if}
            <textarea
                class="border border-slate-400 p-4 rounded-lg outline-none"
                name="description"
                bind:value={$descriptionForm.description}
                placeholder="Escribe una descripción..."
            ></textarea>
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    </div>

    <form
        method="POST"
        action="?/all"
        class="flex flex-col gap-2 p-4"
        use:enhance
    >
        <div
            class="bg-white border border-slate-300 flex flex-col gap-2 p-4 rounded-lg"
        >
            <label for="title">Título</label>
            <input
                class="border border-slate-400 p-4 rounded-lg outline-none"
                type="text"
                name="title"
                bind:value={$form.title}
                placeholder="Título"
            />
        </div>

        <div
            class="bg-white border border-slate-300 flex flex-col gap-2 p-4 rounded-lg"
        >
            <label for="unit_price">Precio</label>
            <div class="flex items-center gap-2">
                <p class="text-[24px] text-slate-500">$</p>
                <input
                    class="border border-slate-400 p-4 rounded-lg outline-none"
                    type="number"
                    name="unit_price"
                    bind:value={$form.unit_price}
                    placeholder="0"
                />
            </div>
        </div>

        <div
            class="bg-white border border-slate-300 flex flex-col gap-2 p-4 rounded-lg"
        >
            <label for="unit_price">Descuento</label>
            <div class="flex items-center gap-2">
                <p class="text-[24px] text-slate-500">%</p>
                <input
                    class="border border-slate-400 p-4 rounded-lg outline-none"
                    type="number"
                    name="discount"
                    bind:value={$form.discount}
                    placeholder="Descuento"
                />
            </div>
        </div>

        <div
            class="bg-white border border-slate-300 flex flex-col gap-2 p-4 rounded-lg"
        >
            <label for="description">Descripción</label>
            <textarea
                class="border border-slate-400 p-4 rounded-lg outline-none"
                name="description"
                bind:value={$form.description}
                placeholder="description"
            ></textarea>
        </div>

        <div
            class="bg-white border border-slate-300 flex flex-col gap-2 p-4 rounded-lg"
        >
            <h2>Variantes y fotos</h2>
            {#each $form.variants as variant, i}
                <div
                    class="bg-white border border-slate-300 rounded-lg flex flex-col gap-2 p-4"
                >
                    <div class="flex">
                        <div class="w-1/2 p-2 flex flex-col gap-2">
                            <label for={$form.variants[i].name}
                                >Nombre de la variante</label
                            >
                            <input
                                class="border border-slate-400 p-4 rounded-lg outline-none"
                                type="text"
                                name={$form.variants[i].name}
                                bind:value={$form.variants[i].name}
                                placeholder="variant name"
                            />
                        </div>
                        <div class="w-1/2 p-2 flex flex-col gap-2">
                            <label for={$form.variants[i].name}>Color</label>
                            <input
                                class="w-full bg-white h-full border border-slate-400 p-2 rounded-lg outline-none cursor-pointer"
                                type="color"
                                bind:value={$form.variants[i].hexColor}
                            />
                        </div>
                    </div>
                    <div class="p-2">
                        <h3>Fotos</h3>
                        <div class="flex items-start gap-2">
                            {#each variant.images as image, i}
                                <div
                                    class="w-1/5 border border-slate-400 rounded-lg relative"
                                >
                                    <img
                                        class="rounded-lg"
                                        src={image}
                                        alt=""
                                    />
                                    <input
                                        class="w-full border border-slate-400 p-4 rounded-lg outline-none"
                                        type="text"
                                        bind:value={$form.variants[i].images[i]}
                                    />
                                    {#if i === 0}
                                        <b
                                            class="w-fit p-1 px-3 bg-green-500 text-white text-[12px] rounded-full absolute top-2 right-2"
                                        >
                                            PORTADA
                                        </b>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div
                        class="p-4 bg-white border border-slate-400 rounded-lg"
                    >
                        {#each variant.size as size, i}
                            <div class="p-4 flex flex-col gap-2">
                                <label for={$form.variants[i].size[i].name}
                                    >Talle</label
                                >
                                <input
                                    class="border border-slate-400 p-4 rounded-lg outline-none"
                                    type="text"
                                    name={$form.variants[i].size[i].name}
                                    bind:value={$form.variants[i].size[i].name}
                                    placeholder="size name"
                                />
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <button type="submit">Guardar</button>
    </form>
</div>
