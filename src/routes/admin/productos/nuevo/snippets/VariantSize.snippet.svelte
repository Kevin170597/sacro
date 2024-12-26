<script lang="ts">
    let {
        sizeName = $bindable(),
        sizeNameErrors,
        sizeIndex,
        deleteSize
    }: {
        sizeName: string;
        sizeNameErrors: string[] | undefined;
        sizeIndex: number;
        deleteSize: () => void
    } = $props();

    let sizeDropped: number | null = $state(null);
</script>

<div class="flex flex-col gap-2 border border-slate-300 rounded-lg">
    <div
        class="flex items-center px-8 py-4 rounded-t-lg
            {sizeDropped === sizeIndex
            ? 'border-b border-slate-300 bg-slate-100'
            : ''}"
    >
        <button
            onclick={() =>
                sizeDropped === sizeIndex
                    ? (sizeDropped = null)
                    : (sizeDropped = sizeIndex)}
            type="button"
            class="w-[80%] text-left"
        >
            <span class="text-[14px]">Talle</span>
            <span class="text-[14px] text-slate-400">
                {sizeName}
            </span>
        </button>
        <button
            onclick={deleteSize}
            type="button"
            class="w-fit ml-auto bg-transparent hover:bg-red-100 transition-all duration-200 px-2 rounded-lg"
        >
            <span class="text-[12px] font-bold text-red-400">Eliminar</span>
        </button>
    </div>
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
