<script lang="ts">
    import {
        TitleForm,
        UnitPriceForm,
        DiscountForm,
        DescriptionForm,
        VariantsForm,
    } from "./snippets";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-slate-100 h-[92vh] overflow-auto px-16 p-4 flex flex-col gap-4">
    {#if data.product}
        <div class="w-4/5 mx-auto flex">
            <div class="w-5/6">
                <h1 class="font-bold text-[24px]">{data.product.title}</h1>
                <p class="text-slate-400 text-[14px]"># {data.product._id}</p>
            </div>
            <img
                class="w-1/6 aspect-square object-cover rounded-full"
                src={data.product.variants[0].images[0]}
                alt=""
            />
        </div>
        <TitleForm data={data.titleForm} />
        <UnitPriceForm data={data.unitPriceForm} />
        <DiscountForm data={data.discountForm} />
        <DescriptionForm data={data.descriptionForm} />
        <VariantsForm data={data.variantsForm} />
    {/if}
</div>
