<script lang="ts">
	import "../app.css";
	import { CartIcon } from "$lib/components/icons";
	import { cart } from "$lib/stores";

	let { children } = $props();
</script>

<div class="min-h-[100vh] bg-slate-200">
	<div
		class="h-[8vh] bg-white flex items-center justify-between px-20 border border-b-2"
	>
		<a class="font-bold text-[20px]" href="/">Sacro</a>
		<a href="/carrito" class="relative">
			<CartIcon color="black" />
			<p class="absolute top-[-6px] right-[-10px] bg-blue-600 rounded-full text-white flex justify-center items-center w-4 h-4 text-[12px]">
				{$cart.reduce((total, product) => total + product.quantity, 0)}
			</p>
		</a>
	</div>
	{@render children()}
</div>
