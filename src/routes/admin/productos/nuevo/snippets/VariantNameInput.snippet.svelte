<script lang="ts">
    let {
        value = $bindable(),
        errors,
    }: {
        value: string;
        errors: string[] | undefined;
    } = $props();
</script>

<div class="w-1/2 p-2 flex flex-col gap-2">
    <label
        class="text-[12px] text-slate-400"
        for={value}
    >
        Nombre de la variante
    </label>
    {#if errors}
        <span class="text-red-600 text-[12px]">
            {errors}
        </span>
    {/if}
    <input
        class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
        type="text"
        id={value}
        name={value}
        bind:value
        placeholder="Nombre de la variante"
    />
</div>