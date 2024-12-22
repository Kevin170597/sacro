<script lang="ts">
    let {
        value = $bindable(),
        errors,
    }: {
        value: string;
        errors: string[] | undefined;
    } = $props();
</script>

<div
    class="bg-white flex flex-col gap-4 px-8 py-4 border rounded-lg {errors
        ? 'border-red-600'
        : 'border-slate-300 '}"
>
    <div>
        <label
            for="description"
            class="font-bold text-[14px] px-2 {errors
                ? 'bg-red-100  text-red-400 font-bold rounded-full'
                : ''}"
        >
            Descripción
        </label>
    </div>
    <textarea
        class="border border-slate-400 px-4 py-4 rounded-lg outline-none text-[12px]"
        name="description"
        id="description"
        placeholder="Escribie una descripción..."
        bind:value
    ></textarea>
</div>
