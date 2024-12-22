<script lang="ts">
    let {
        value = $bindable(),
        errors,
    }: {
        value: number;
        errors: string[] | undefined;
    } = $props();
</script>

<div
    class="bg-white flex flex-col gap-4 px-8 py-4 border rounded-lg {errors
        ? 'border-red-600'
        : 'border-slate-300'}"
>
    <label for="discount" class="font-bold text-[14px]"> Descuento </label>
    <div class="flex gap-2 items-center">
        <p>%</p>
        <input
            class="w-full border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
            type="number"
            name="discount"
            id="discount"
            placeholder="0"
            bind:value
        />
    </div>
</div>
