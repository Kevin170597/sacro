<script lang="ts">
	import type { PageData } from "./$types";
	import type { Product } from "$lib/interfaces";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Sacro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#snippet card(p: Product)}
	<a href="/ambos/{p._id}">
		<div
			class="bg-white flex flex-col gap-2 border border-slate-300 rounded-lg p-4"
		>
			<div class="w-full flex justify-center">
				<img class="w-[80%]" src={p.variants[0].images[0]} alt="" />
			</div>
			<p class="text-[12px] text-slate-500 border border-slate-300 w-fit px-2 rounded-lg">9 colores</p>
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

<div class="min-h-[92vh] px-8 py-4 bg-slate-100">
	<div class="grid grid-cols-4 gap-4 items-start">
		{#each data.data as product}
			{@render card(product)}
		{/each}
	</div>
	<a href="/ambos" class="font-bold text-[18px] flex justify-center mt-6">
		Ver más.
	</a>
</div>
