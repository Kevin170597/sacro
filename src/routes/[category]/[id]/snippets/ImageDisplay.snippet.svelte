<script lang="ts">
    import type { Variant } from "$lib/interfaces";

    let {
        variant,
        selectedImage = $bindable(),
    }: { variant: Variant; selectedImage: number } = $props();
</script>

<div class="flex border-b border-slate-300 pb-8">
    <div class="w-[8%] flex flex-col gap-2 p-2">
        {#each variant.images as img, i}
            <button
                onclick={() => (selectedImage = i)}
                class="border border-slate-400 p-1 rounded-lg {selectedImage ===
                i
                    ? 'border-2'
                    : ''}"
            >
                <img src={img} alt="" />
            </button>
        {/each}
    </div>
    <div class="w-[92%] flex justify-center">
        <img src={variant.images[selectedImage]} class="w-[60%] h-fit" alt="" />
    </div>
</div>
