<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<div class="min-h-[100vh] bg-slate-200">
	<div
		class="h-[8vh] bg-white flex items-center justify-between px-20 border border-b-2"
	>
		<a class="font-bold text-[20px]" href="/">Sacro</a>
		<a href="/carrito">Carrito</a>
	</div>
	{@render children()}
</div>
