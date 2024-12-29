<script lang="ts">
    import { CloseIcon } from "$lib/components/icons";
    import { fetchUploadImage } from "../helpers";
    import type { Image } from "$lib/interfaces";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { nanoid } from "nanoid";

    let {
        variantImages = $bindable(),
        errors,
    }: {
        variantImages: Image[];
        errors: any;
    } = $props();

    let uploadingPreview: string | null = $state(null);
    let uploading: boolean = $state(false);

    const handleUploadImage = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] as File | undefined;
        if (file) {
            uploadingPreview = URL.createObjectURL(file);
            uploading = true;
            const url = await fetchUploadImage(event);
            if (url) {
                variantImages = [...variantImages, { id: nanoid(5), url }];
            }
            uploadingPreview = null;
            uploading = false;
        }
    };

    const deleteImage = (imageIndex: number) =>
        (variantImages = [
            ...variantImages.slice(0, imageIndex),
            ...variantImages.slice(imageIndex + 1),
        ]);

    const handleDndConsider = (e: CustomEvent) =>
        (variantImages = e.detail.items);

    const handleDndFinalize = (e: CustomEvent) =>
        (variantImages = e.detail.items);
</script>

<div class="p-4 pb-4 flex flex-col gap-4">
    <b class="text-[14px] ml-2">Fotos</b>
    {#if errors}
        <span class="text-red-600 text-[12px]">
            {errors._errors}
        </span>
    {/if}
    <div class="border border-slate-300 rounded-lg">
        <div class="p-4 flex">
            <label
                class="bg-transparent hover:bg-sky-200 text-sky-600 px-4 py-2 border-2 border-sky-200 rounded-lg cursor-pointer transition-all duration-200 {uploading
                    ? 'animate-pulse'
                    : ''} "
            >
                <input
                    disabled={uploading ? true : false}
                    class="hidden"
                    onchange={(e) => handleUploadImage(e)}
                    type="file"
                    name=""
                    id=""
                />
                <span class="font-bold text-[12px]">
                    {uploading
                        ? "Subiendo imagen..."
                        : "Seleccione una imagen +"}
                </span>
            </label>
        </div>
        {#if variantImages.length > 0}
            <div
                class="grid grid-cols-5 gap-2 p-4 pt-0"
                use:dndzone={{
                    items: variantImages,
                    flipDurationMs: 300,
                    dropTargetStyle: { outline: "none" },
                }}
                onconsider={handleDndConsider}
                onfinalize={handleDndFinalize}
            >
                {#each variantImages as image, imageIndex (image.id)}
                    <div
                        animate:flip={{ duration: 300 }}
                        class="flex justify-center rounded-lg border border-slate-300 relative"
                    >
                        <img
                            class="aspect-square object-cover rounded-lg"
                            src={image.url}
                            alt=""
                        />
                        {#if imageIndex === 0}
                            <span
                                class="text-[10px] absolute top-2 left-2 bg-sky-500 font-bold text-white px-2 rounded-full"
                                >PORTADA</span
                            >
                        {/if}
                        <button
                            onclick={() => deleteImage(imageIndex)}
                            type="button"
                            class="absolute top-2 right-2 w-6 h-6 bg-slate-700 flex justify-center items-center rounded-full"
                        >
                            <CloseIcon color="#fff" size={14} />
                        </button>
                    </div>
                {/each}
                {#if uploadingPreview}
                    <img
                        class="aspect-square object-contain rounded-lg border border-slate-300 animate-pulse opacity-5"
                        src={uploadingPreview}
                        alt=""
                    />
                {/if}
            </div>
        {/if}
    </div>
</div>
