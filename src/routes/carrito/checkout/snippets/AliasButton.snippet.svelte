<script lang="ts">
    import { CopyToClipboardIcon } from "$lib/components/icons";

    let copied: boolean = $state(false);
    
    const copyToClipboard = async (content: string): Promise<void> => {
        await navigator.clipboard.writeText(content);
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    };
</script>

<button
    class="flex items-center gap-2 relative rounded-full px-2 transition-colors duration-100 hover:bg-slate-200 hover:text-slate-500"
    onclick={() => copyToClipboard("alias.alias.al")}
>
    <span class="text-[20px]">alias.alias.al</span>
    <CopyToClipboardIcon />
    {#if copied}
        <span class="absolute top-8 left-8 animate-bounce text-green-600">¡Copiado!</span>
    {/if}
</button>
