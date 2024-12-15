<script lang="ts">
    import { CartIcon } from "$lib/components/icons";
    import { cart } from "$lib/stores";
</script>

<div
    class="h-[8vh] bg-white flex items-center justify-between border border-b-2 px-8 sm:px-20"
>
    <a class="font-bold text-[20px]" href="/">Sacro</a>
    <a href="/carrito" class="relative">
        <CartIcon color="black" />
        <p
            class="absolute top-[-6px] right-[-10px] bg-blue-600 rounded-full text-white flex justify-center items-center w-4 h-4 text-[12px]"
        >
            {$cart.reduce((total, product) => total + product.quantity, 0)}
        </p>
    </a>
</div>
