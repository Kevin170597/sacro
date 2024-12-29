<script lang="ts">
    import { DraggableIcon } from "$lib/components/icons";
    import type { Size } from "$lib/interfaces";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { nanoid } from "nanoid";

    let {
        sizes = $bindable(),
        errors,
    }: {
        sizes: Size[];
        errors: any;
    } = $props();

    let sizeDropped: number | null = $state(null);

    const deleteSize = (sizeIndex: number) =>
        (sizes = [...sizes.slice(0, sizeIndex), ...sizes.slice(sizeIndex + 1)]);

    const addSize = () => (sizes = [...sizes, { id: nanoid(5), name: "XS" }]);

    const handleDndConsiderSize = (e: CustomEvent) => (sizes = e.detail.items);

    const handleDndFinalizeSize = (e: CustomEvent) => (sizes = e.detail.items);
</script>

<div class="p-4 pb-4 flex flex-col gap-4 border-t border-slate-300">
    <b class="text-[14px] ml-2">Talles</b>
    {#if errors}
        <span class="text-red-600 text-[12px]">
            {errors._errors}
        </span>
    {/if}
    <div
        class="flex flex-col gap-4"
        use:dndzone={{
            items: sizes,
            flipDurationMs: 300,
            dropTargetStyle: { outline: "none" },
        }}
        onconsider={handleDndConsiderSize}
        onfinalize={handleDndFinalizeSize}
    >
        {#each sizes as size, sizeIndex (size.id)}
            <div animate:flip={{ duration: 300 }}>
                <div
                    class="flex flex-col gap-2 border border-slate-300 rounded-lg"
                >
                    <div
                        class="flex items-center px-8 py-4 rounded-t-lg
                            {sizeDropped === sizeIndex
                            ? 'border-b border-slate-300 bg-slate-100'
                            : ''}"
                    >
                        <div class="w-[10%]">
                            <DraggableIcon color="gray" />
                        </div>
                        <button
                            onclick={() =>
                                sizeDropped === sizeIndex
                                    ? (sizeDropped = null)
                                    : (sizeDropped = sizeIndex)}
                            type="button"
                            class="w-[70%] text-left"
                        >
                            <span class="text-[14px]">Talle</span>
                            <span class="text-[14px] text-slate-400">
                                {size.name}
                            </span>
                        </button>
                        <button
                            onclick={() => deleteSize(sizeIndex)}
                            type="button"
                            class="w-fit ml-auto bg-transparent hover:bg-red-100 transition-all duration-200 px-2 rounded-lg"
                        >
                            <span class="text-[12px] font-bold text-red-400"
                                >Eliminar</span
                            >
                        </button>
                    </div>
                    {#if sizeDropped === sizeIndex}
                        <div class="px-8 py-4 flex flex-col gap-2">
                            <input
                                class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
                                type="text"
                                name={size.name}
                                bind:value={size.name}
                                placeholder="X"
                            />
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
        <button
            class="bg-transparent hover:bg-sky-100 text-sky-600 w-fit mr-auto px-4 py-2 rounded-lg transition-all duration-200"
            type="button"
            onclick={addSize}
        >
            <span class="font-bold text-[12px]"> Agregar talle </span>
        </button>
    </div>
</div>
