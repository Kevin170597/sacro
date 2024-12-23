<script lang="ts">
    import { TitleForm, UnitPriceForm, DiscountForm, DescriptionForm, VariantsForm } from "./snippets";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="bg-slate-100 h-[92vh] overflow-auto px-16 p-4 flex flex-col gap-4">
    <TitleForm data={data.titleForm} />
    <UnitPriceForm data={data.unitPriceForm} />
    <DiscountForm data={data.discountForm} />
    <DescriptionForm data={data.descriptionForm} />
    <VariantsForm data={data.variantsForm} />
</div>
