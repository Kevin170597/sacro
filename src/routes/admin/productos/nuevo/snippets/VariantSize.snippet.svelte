<script lang="ts">
    let {
        sizeName = $bindable(),
        sizeNameErrors,
        sizeIndex,
    }: {
        sizeName: string;
        sizeNameErrors: string[] | undefined;
        sizeIndex: number;
    } = $props();

    let sizeDropped: number | null = $state(null);
</script>

<div
    class="flex flex-col gap-2 border-b border-slate-300"
>
    <button
        onclick={() =>
            sizeDropped === sizeIndex
                ? (sizeDropped = null)
                : (sizeDropped = sizeIndex)}
        type="button"
        class="px-8 py-4 text-left
                                        {sizeDropped === sizeIndex
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}
                                        {sizeIndex === 0 ? 'rounded-t-lg' : ''}"
    >
        <span class="text-[14px]"> Talle </span>
        <span class="text-[14px] text-slate-400">
            {sizeName}
        </span>
    </button>
    {#if sizeDropped === sizeIndex}
        <div class="px-8 py-4 flex flex-col gap-2">
            {#if sizeNameErrors}
                <span class="text-red-600 text-[12px]">
                    {sizeNameErrors}
                </span>
            {/if}
            <input
                class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                type="text"
                name={sizeName}
                bind:value={sizeName}
                placeholder="X"
            />
        </div>
    {/if}
</div>
