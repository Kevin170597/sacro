<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { variants } from "./page.svelte";
    import type { PageData } from "./$types";
    import {
        TitleInput,
        UnitPriceInput,
        DiscountInput,
        DescriptionInput,
        Variants,
    } from "./snippets";

    let { data }: { data: PageData } = $props();

    const { form, enhance, errors } = superForm(data.form, {
        dataType: "json",
        onSubmit: (): void => {
            $form.variants = variants.variants;
        },
    });

    variants.variants = $form.variants;
</script>

<svelte:head><title>Admin - Producto nuevo</title></svelte:head>
<div
    class="h-[92vh] overflow-auto px-4 sm:px-4 py-4 bg-slate-100 flex flex-col gap-4"
>   
    <form
        class="px-8 py-4 w-full mx-auto flex flex-col gap-4"
        method="POST"
        use:enhance
    >
        <div class="grid grid-cols-2 gap-4">
            <TitleInput bind:value={$form.title} errors={$errors.title} />
            <DescriptionInput
                bind:value={$form.description}
                errors={$errors.description}
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <UnitPriceInput
                bind:value={$form.unit_price}
                errors={$errors.unit_price}
            />
            <DiscountInput
                bind:value={$form.discount}
                errors={$errors.discount}
            />
        </div>
        <Variants errors={$errors.variants} />
        <button
            class="bg-sky-500 hover:bg-sky-600 text-white w-fit ml-auto px-4 py-2 rounded-lg transition-all duration-200"
            type="submit"
        >
            <span class="font-bold text-[12px]">Confirmar</span>
        </button>
    </form>
</div>
