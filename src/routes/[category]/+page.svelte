<script lang="ts">
    import type { Product } from "$lib/interfaces";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

{#snippet card(p: Product)}
	<a href="/ambos/{p._id}">
		<div
			class="bg-white flex flex-col gap-2 border border-slate-300 rounded-lg p-4"
		>
			<div class="w-full flex justify-center">
				<img class="w-[80%]" src={p.variants[0].images[0]} alt="" />
			</div>
			<p class="text-[12px] text-slate-500 border border-slate-300 w-fit px-2 rounded-lg">{p.variants.length} colores</p>
			<div class="flex gap-2 flex-wrap">
				{#each p.variants as v}
					<img class="w-[16%]" src={v.images[0]} alt="">
				{/each}
			</div>
			<p class="text-[14px]">{p.title}</p>
			<div class="w-full">
				<b class="text-[22px]">${p.unit_price.toLocaleString("es-ar")}</b>
			</div>
		</div>
	</a>
{/snippet}

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex gap-12">
    <div class="w-4/5">
        <h1 class="text-[24px] font-bold">Ambos</h1>
        <div class="flex justify-between">
            <p>10 resultados</p>
            <div class="flex items-center gap-2">
                <b>Ordenar por</b>
                <button>Más relevantes</button>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4 items-start mt-4">
            {#each data.data as product}
                {@render card(product)}
            {/each}
        </div>
    </div>
    <div class="w-1/5 py-12">
        <b class="block mb-4">Precio</b>
        <p class="text-[14px] mb-2">Hasta $55.000 (6)</p>
        <p class="text-[14px]">Más de $55.000 (4)</p>
    </div>
</div>
