<script lang="ts">
    import Cover from "../../assets/Portada ML ambo 410 con vivos.png.jpg";

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
        {
			id: "5",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 60900,
		},
		{
			id: "6",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 61900,
		},
		{
			id: "7",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 62900,
		},
		{
			id: "8",
			title: "Ambo Arciel Cuello V | Combinado | Sacro",
			price: 63900,
		},
	];
</script>

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
            {#each products as product}
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
