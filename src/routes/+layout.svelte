<script lang="ts">
	import "../app.css";
	import { Header, Footer } from "./snippets";
	import { page } from "$app/stores";

	let { children } = $props();
</script>

<div class="min-h-[100vh] bg-slate-200">
	{#if !$page.data.session?.user}
		<Header />
	{/if}
	{@render children()}
	{#if !$page.data.session?.user}
		<Footer />
	{/if}
</div>
