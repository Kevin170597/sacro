<script lang="ts">
    let {
        value = $bindable(),
        errors,
    }: {
        value: string;
        errors: string[] | undefined;
    } = $props();
</script>

<div class="px-8 py-4 flex flex-col gap-2">
    {#if errors}
        <span class="text-red-600 text-[12px]">
            {errors}
        </span>
    {/if}
    <input
        class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
        type="text"
        name={value}
        bind:value
        placeholder="X"
    />
</div>
