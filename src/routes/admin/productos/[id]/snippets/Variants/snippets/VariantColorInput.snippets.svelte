<script lang="ts">
    let {
        value = $bindable(),
    }: {
        value: string;
    } = $props();
</script>

<div class="w-1/2 p-2 flex flex-col gap-2">
    <label class="text-[12px] text-slate-400" for={value}>Color</label>
    <input
        class="w-full bg-white h-full p-2 rounded-lg border border-slate-400 outline-none cursor-pointer"
        type="color"
        bind:value
    />
</div>
