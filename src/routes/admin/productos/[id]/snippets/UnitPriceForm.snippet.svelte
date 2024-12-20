<script lang="ts">
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import { superForm } from "sveltekit-superforms";
    import type { PriceSchema } from "../helpers";

    let { data }: { data: SuperValidated<Infer<PriceSchema>> } = $props();

    const { form, enhance, errors } = superForm(data);

    let dropped: string = $state("");
</script>

<div
    class="w-4/5 mx-auto flex flex-col gap-2 bg-white border border-slate-300 rounded-lg"
>
    <button
        onclick={() =>
            dropped === "unit_price"
                ? (dropped = "")
                : (dropped = "unit_price")}
        class="text-left flex flex-col gap-2 hover:bg-gray-100 px-8 py-4 rounded-t-lg {dropped ===
        'unit_price'
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <b class="text-[14px]">Precio</b>
        <span class="text-slate-500 text-[13px]">
            ${$form.unit_price.toLocaleString("es-AR")}
        </span>
    </button>
    {#if dropped === "unit_price"}
        <form
            class="flex flex-col gap-4 px-8 py-4"
            method="POST"
            action="?/unit_price"
            use:enhance
        >
            {#if $errors.unit_price}
                <span class="text-red-600 text-[12px]">
                    {$errors.unit_price}
                </span>
            {/if}
            <div class="flex items-center gap-2">
                <p class="text-[16px] text-slate-500">$</p>
                <input
                    class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                    type="number"
                    placeholder="0"
                    name="unit_price"
                    bind:value={$form.unit_price}
                />
            </div>
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg"
                type="submit"
            >
                <span class="font-bold text-[12px]">Confirmar</span>
            </button>
        </form>
    {/if}
</div>
