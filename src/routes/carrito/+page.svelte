<script lang="ts">
    import { cart } from "$lib/stores";
    import type { CartItem } from "$lib/stores";

    let cartProducts;

    const getManyProductsById = async () => {
        let ids = $cart.map((item: CartItem) => item.id);
        let res = await fetch("/api/products/many", {
            method: "POST",
            body: JSON.stringify(ids),
        });
        let items = await res.json();
        cartProducts = items;
    };

    $effect(() => {
        getManyProductsById();
    });
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100">
    <h1 class="font-bold text-[20px] mb-4">Tu carrito</h1>
    <div class="flex items-start gap-4">
        <div
            class="bg-white border border-slate-300 rounded-lg p-4 w-4/6 min-h-[50vh] flex justify-center items-center"
        >
            <p>Agregá productos para armar tu carrito</p>
        </div>
        <div
            class="bg-white border border-slate-300 rounded-lg p-4 w-2/6 flex flex-col gap-4"
        >
            <b class="text-slate-400">Resumen de compra</b>
            <p class="text-slate-400">
                Aquí verás los importes de tu compra una vez que agregues
                productos.
            </p>
        </div>
    </div>
</div>
