<script lang="ts">
    let {
        fileName,
        pdfFile,
    }: {
        fileName: string | null;
        pdfFile: string | File;
    } = $props();
</script>

<div
    class="w-full flex flex-col items-center p-4 border-2 border-sky-400 rounded-lg"
>
    <p class="font-bold">{fileName}</p>
    <iframe
        class="rounded-lg p-4 w-full h-[340px]"
        title={"pdf"}
        src={typeof pdfFile === "string"
            ? pdfFile
            : URL.createObjectURL(pdfFile)}
    ></iframe>
</div>
