<script lang="ts">
	import Cover from "../assets/Portada ML ambo 410 con vivos.png.jpg";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Sacro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#snippet card(p: any)}
	<a href="/ambos/{p._id}">
		<div
			class="bg-white flex flex-col items-center gap-4 border border-slate-300 rounded-lg p-4"
		>
			<img class="w-[80%]" src={Cover} alt="" />
			<h2>{p.title}</h2>
			<div class="w-full">
				<b class="text-[20px]">${p.unit_price}</b>
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
