<script lang="ts">
    import { ImageViewer } from "$lib/components";
    import type { Variant } from "$lib/interfaces";

    let {
        variant,
        selectedImage = $bindable(),
    }: { variant: Variant; selectedImage: number } = $props();

    let zoom: null | any = $state(null);
    let multiplier = $state(3);
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
        <img
            onmousemove={(e) => (zoom = [e.offsetX, e.offsetY])}
            onmouseleave={(e) => (zoom = null)}
            src={variant.images[selectedImage]}
            class="w-[60%] h-fit cursor-pointer"
            alt=""
        />
        {#if zoom}
            <div
                class="w-[32%] h-[90vh] fixed top-[10vh] right-8"
                style:background-repeat="no-repeat"
                style:background-size="300%"
                style:background-image="url({variant.images[selectedImage]})"
                style:background-position-x="{150 - zoom[0] * multiplier}px"
                style:background-position-y="{150 - zoom[1] * multiplier}px"
            ></div>
        {/if}
    </div>
    <!-- <div class="fixed top-0 right-0 w-[100%] h-[100%]">
        <ImageViewer src={variant.images[selectedImage]} />
    </div> -->
</div>
