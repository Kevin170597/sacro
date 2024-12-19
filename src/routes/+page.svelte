<script lang="ts">
	import { ProductCard, Banner } from "./snippets";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	type Alignment = "center" | "right" | "top" | "bottom" | "left" | undefined;

	interface BannerType {
		title: string;
		content: string;
		image: string;
		alignment: Alignment;
		titleColor: "white" | "black";
		contentColor: "white" | "black";
		link?: string;
	}

	let banner: BannerType = {
		title: "Title",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque explicabo odio laborum. Facilis voluptates quidem delectus, dicta nostrum deserunt repudiandae at rem velit deleniti ad consequuntur nemo quia voluptas animi.",
		image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
		alignment: "center",
		titleColor: "white",
		contentColor: "white",
		link: "https://youtube.com",
	};

	let banners: BannerType[] = [
		{
			title: "Title",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque explicabo odio laborum. Facilis voluptates quidem delectus, dicta nostrum deserunt repudiandae at rem velit deleniti ad consequuntur nemo quia voluptas animi.",
			image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
			alignment: "center",
			titleColor: "black",
			contentColor: "white",
			link: "https://youtube.com",
		},
		{
			title: "Title",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque explicabo odio laborum.",
			image: "https://thumbs.dreamstime.com/b/s%C3%A9r%C3%A9nit%C3%A9-dans-la-nature-les-montagnes-sereines-au-lever-du-soleil-colorant-le-ciel-teintes-rose-et-orange-cr%C3%A9ent-un-spectacle-317688540.jpg",
			alignment: "left",
			titleColor: "black",
			contentColor: "black",
		},
		{
			title: "Title",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque explicabo odio laborum.",
			image: "https://img.freepik.com/premium-photo/sunset-lake_445983-2048.jpg",
			alignment: "bottom",
			titleColor: "white",
			contentColor: "black",
			link: "https://youtube.com",
		},
	];
</script>

<svelte:head>
	<title>Sacro</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-[92vh] px-4 sm:px-8 py-4 bg-slate-100 flex flex-col gap-4">
	<!-- <Banner {banner} />
	<Banner banner={banners} /> -->

	<h1 class="text-[20px] sm:text-[24px]">Ambos</h1>
	<div
		class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-start"
	>
		{#each data.data as product}
			<ProductCard {product} />
		{/each}
	</div>
	<a href="/ambos" class="font-bold text-[18px] flex justify-center mt-4">
		Ver más.
	</a>
</div>
