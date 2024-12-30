<script lang="ts">
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import { superForm } from "sveltekit-superforms";
    import type { TitleSchema } from "../helpers";

    let { data }: { data: SuperValidated<Infer<TitleSchema>> } = $props();

    const { form, errors, enhance, delayed } = superForm(data);

    let dropped: string = $state("");
</script>

<div
    class="w-4/5 mx-auto flex flex-col gap-2 bg-white border border-slate-300 rounded-lg"
>
    <button
        onclick={() =>
            dropped === "title" ? (dropped = "") : (dropped = "title")}
        class="text-left flex flex-col gap-2 hover:bg-gray-100 px-8 py-4 rounded-t-lg {dropped ===
        'title'
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <span
            class="w-fit font-bold text-[14px] {$errors.title
                ? 'bg-red-100  text-red-400 font-bold rounded-full px-2'
                : ''}"
        >
            Título
        </span>
        <span class="text-slate-500 text-[13px]">{$form.title}</span>
    </button>
    {#if dropped === "title"}
        <form
            class="flex flex-col gap-4 px-8 py-4"
            method="POST"
            action="?/title"
            use:enhance
        >
            {#if $errors.title}
                <span class="text-red-600 text-[12px]">
                    {$errors.title}
                </span>
            {/if}
            <input
                class="border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                type="text"
                name="title"
                placeholder="Título..."
                bind:value={$form.title}
            />
            <button
                class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg {$delayed
                    ? 'animate-pulse'
                    : ''}"
                type="submit"
                disabled={$delayed}
            >
                <span class="font-bold text-[12px]">
                    {#if $delayed}
                        Guardando
                    {:else}
                        Confirmar
                    {/if}
                </span>
            </button>
        </form>
    {/if}
</div>
