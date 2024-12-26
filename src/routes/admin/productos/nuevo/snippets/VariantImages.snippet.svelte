<script lang="ts">
    let {
        uploadImage,
        variantIndex,
        variantImages,
    }: {
        uploadImage: (e: Event, variantIndex: number) => Promise<void>;
        variantIndex: number;
        variantImages: string[];
    } = $props();

    let uploadingPreview: string | null = $state(null);
    let uploading: boolean = $state(false);

    const handleUploadImage = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] as File | undefined;
        if (file) {
            uploadingPreview = URL.createObjectURL(file);
            uploading = true;
            await uploadImage(event, variantIndex);
            uploadingPreview = null;
            uploading = false;
        }
    };
</script>

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
            {uploading ? "Subiendo imagen..." : "Seleccione una imagen +"}
        </span>
    </label>
</div>
{#if variantImages.length > 0}
    <div class="flex flex-wrap gap-2 p-4 pt-0">
        {#each variantImages as image}
            <img
                class="w-[20%] aspect-square object-contain rounded-lg border border-slate-300"
                src={image}
                alt=""
            />
        {/each}
        {#if uploadingPreview}
            <img
                class="w-[20%] aspect-square object-contain rounded-lg border border-slate-300 animate-pulse opacity-5"
                src={uploadingPreview}
                alt=""
            />
        {/if}
    </div>
{/if}
