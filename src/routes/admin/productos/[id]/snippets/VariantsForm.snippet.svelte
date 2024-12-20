<script lang="ts">
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import { superForm } from "sveltekit-superforms";
    import type { VariantsSchema } from "../helpers";

    let { data }: { data: SuperValidated<Infer<VariantsSchema>> } = $props();

    const { form, enhance, errors } = superForm(data, { dataType: "json" });

    let dropped: string = $state("");
    let variantDropped: number | null = $state(null);
    let sizeDropped: number | null = $state(null);
</script>

<div
    class="w-4/5 mx-auto flex flex-col gap-2 bg-white border border-slate-300 rounded-lg"
>
    <button
        onclick={() =>
            dropped === "variants" ? (dropped = "") : (dropped = "variants")}
        class="text-left flex flex-col gap-2 hover:bg-gray-100 px-8 py-4 {dropped ===
        'variants'
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <b class="text-[14px]">Variantes</b>
        <span class="text-slate-500 text-[13px]">
            {$form.variants.length} variantes añadidas
        </span>
    </button>
    {#if dropped === "variants"}
        <form
            class="flex flex-col px-8 pb-4"
            method="POST"
            action="?/variants"
            use:enhance
        >
            {#each $form.variants as variant, variantIndex}
                <div
                    class="px-8 py-4 border border-slate-300 flex
                        {variantIndex === 0 ? 'rounded-t-lg' : ''} 
                        {variantIndex === $form.variants.length - 1
                        ? 'rounded-b-lg border-b'
                        : 'border-b-0'}
                        {variantDropped === variantIndex
                        ? 'rounded-b-lg border-b bg-slate-100'
                        : ''}"
                >
                    <button
                        type="button"
                        onclick={() =>
                            variantDropped === variantIndex
                                ? (variantDropped = null)
                                : (variantDropped = variantIndex)}
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
                {#if variantDropped === variantIndex}
                    <div class="flex border-x border-slate-300 px-4 pb-4">
                        <div class="w-1/2 p-2 flex flex-col gap-2">
                            <label
                                class="text-[12px] text-slate-400"
                                for={$form.variants[variantIndex].name}
                            >
                                Nombre de la variante
                            </label>
                            {#if $errors.variants?.[variantIndex].name}
                                <span class="text-red-600 text-[12px]">
                                    {$errors.variants?.[variantIndex]
                                        ?.name}
                                </span>
                            {/if}
                            <input
                                class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                                type="text"
                                name={$form.variants[variantIndex].name}
                                bind:value={$form.variants[variantIndex]
                                    .name}
                                placeholder="variant name"
                            />
                        </div>
                        <div class="w-1/2 p-2 flex flex-col gap-2">
                            <label
                                class="text-[12px] text-slate-400"
                                for={$form.variants[variantIndex].name}
                                >Color</label
                            >
                            <input
                                class="w-full bg-white h-full border border-slate-400 p-2 rounded-lg outline-none cursor-pointer"
                                type="color"
                                bind:value={$form.variants[variantIndex]
                                    .hexColor}
                            />
                        </div>
                    </div>
                    <div class="border-x border-slate-300 px-4 pb-4">
                        {#each variant.size as size, sizeIndex}
                            <div
                                class="flex flex-col gap-2 border border-slate-300
                                        {sizeIndex === 0 ? 'rounded-t-lg' : ''} 
                                        {sizeIndex === variant.size.length - 1
                                    ? 'rounded-b-lg border-b'
                                    : 'border-b-0'}"
                            >
                                <button
                                    onclick={() =>
                                        sizeDropped === sizeIndex
                                            ? (sizeDropped = null)
                                            : (sizeDropped = sizeIndex)}
                                    type="button"
                                    class="px-8 py-4 text-left {sizeDropped ===
                                    sizeIndex
                                        ? 'border-b border-slate-300 bg-slate-100'
                                        : ''}"
                                >
                                    <span class="text-[14px]"> Talle </span>
                                    <span class="text-[14px] text-slate-400">
                                        {size.name}
                                    </span>
                                </button>
                                {#if sizeDropped === sizeIndex}
                                    <div class="px-8 py-4 flex flex-col gap-2">
                                        {#if $errors.variants?.[variantIndex].size?.[sizeIndex].name}
                                            <span
                                                class="text-red-600 text-[12px]"
                                            >
                                                {$errors.variants?.[
                                                    variantIndex
                                                ].size?.[sizeIndex].name}
                                            </span>
                                        {/if}
                                        <input
                                            class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                                            type="text"
                                            name={$form.variants[
                                                sizeIndex
                                            ].size[sizeIndex].name}
                                            bind:value={$form.variants[
                                                sizeIndex
                                            ].size[sizeIndex].name}
                                            placeholder="X"
                                        />
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            {/each}
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg mt-4"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    {/if}
</div>
