<script lang="ts">
	import "../app.css";
	import { Header, Footer } from "./snippets";

	let { children } = $props();
</script>

<div class="min-h-[100vh] bg-slate-200">
	<Header />
	{@render children()}
	<Footer />
</div>
