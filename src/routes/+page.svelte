<script lang="ts">
	import type { PageData } from "./$types";
	import { ProductCard } from "./snippets";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Sacro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100">
	<div class="grid grid-cols-4 gap-4 items-start">
		{#each data.data as product}
			<ProductCard {product} />
		{/each}
	</div>
	<a href="/ambos" class="font-bold text-[18px] flex justify-center mt-6">
		Ver más.
	</a>
</div>
