<script lang="ts">
	import Cover from "../assets/Portada ML ambo 410 con vivos.png.jpg";

	let products = [
		{
			id: "1",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 60900,
		},
		{
			id: "2",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 61900,
		},
		{
			id: "3",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 62900,
		},
		{
			id: "4",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 63900,
		},
	];
</script>

<svelte:head>
	<title>Sacro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#snippet card(p: any)}
	<a href="/ambos/{p.id}">
		<div
			class="bg-white flex flex-col items-center gap-4 border border-slate-300 rounded-lg p-4"
		>
			<img class="w-[80%]" src={Cover} alt="" />
			<h2>{p.title}</h2>
			<div class="w-full">
				<b class="text-[20px]">${p.price}</b>
			</div>
		</div>
	</a>
{/snippet}

<div class="min-h-[92vh] px-8 py-4 grid grid-cols-4 gap-4 items-start bg-slate-100">
	{#each products as product}
		{@render card(product)}
	{/each}
</div>
