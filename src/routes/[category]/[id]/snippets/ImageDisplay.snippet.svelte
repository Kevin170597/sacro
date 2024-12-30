<script lang="ts">
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import { CloseIcon } from "$lib/components/icons";
    import { ImageViewer } from "$lib/components";
    import type { Image } from "$lib/interfaces";

    let {
        images,
        selectedImage = $bindable(),
    }: { images: Image[]; selectedImage: number } = $props();

    let zoom: null | any = $state(null);
    let multiplier: number = $state(3);

    let fullscreenImage: number | undefined = $state(undefined);
    let inZoom: string | null = $state(null);
</script>

<div class="flex border-b border-slate-300 pb-8">
    <div class="w-[8%] flex flex-col gap-2 p-2">
        {#each { length: 7 } as _, i}
            <button
                onclick={i === 6
                    ? () => (fullscreenImage = i)
                    : () => (selectedImage = i)}
                class="border border-slate-400 p-1 rounded-lg relative
                {selectedImage === i ? 'border-2' : ''}"
            >
                <img src={images[i].url} alt="" />
                {#if i === 6}
                    <p
                        class="flex w-full h-full text-[32px] backdrop-contrast-[0.6] justify-center items-center rounded-lg text-slate-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        +
                    </p>
                {/if}
            </button>
        {/each}
    </div>
    <div class="w-[92%] flex justify-center">
        <button
            class="w-[60%] h-fit"
            onclick={() => (fullscreenImage = selectedImage)}
        >
            <img
                onmousemove={(e) => (zoom = [e.offsetX, e.offsetY])}
                onmouseleave={(e) => (zoom = null)}
                src={images[selectedImage].url}
                class="cursor-pointer"
                alt=""
            />
        </button>
        {#if zoom}
            <div
                class="w-[32%] h-[90vh] fixed top-[10vh] right-8"
                style:background-repeat="no-repeat"
                style:background-size="300%"
                style:background-image="url({images[selectedImage].url})"
                style:background-position-x="{150 - zoom[0] * multiplier}px"
                style:background-position-y="{150 - zoom[1] * multiplier}px"
            ></div>
        {/if}
    </div>
    {#if fullscreenImage !== undefined && fullscreenImage >= 0}
        <div
            class="overflow-hidden fixed w-[100vw] h-[100vh] bg-black bg-opacity-40 top-0 left-0"
            use:emblaCarouselSvelte={{
                options: { startIndex: fullscreenImage },
                plugins: [],
            }}
        >
            <div class="flex h-full w-full">
                {#each images as image}
                    <div
                        class="flex justify-center items-center"
                        style:flex="0 0 100%"
                    >
                        {#if !inZoom}
                            <img
                                class="w-[100%] max-h-[90vh] object-contain"
                                src={image.url}
                                alt=""
                            />
                        {/if}
                    </div>
                {/each}
            </div>
            <button
                onclick={() => (fullscreenImage = undefined)}
                class="flex justify-center items-center fixed top-8 right-8 w-8 h-8 rounded-full bg-white"
            >
                <CloseIcon color="#000" />
            </button>
        </div>
    {/if}
    {#if inZoom}
        <div class="fixed w-full h-full top-0 right-0">
            <button
                onclick={() => (inZoom = null)}
                class="cursor-zoom-out pointer-events-auto"
            >
                <ImageViewer src={inZoom} />
            </button>
        </div>
    {/if}
</div>
