<script lang="ts">
    import type { Product } from "$lib/interfaces";

    interface CartProduct extends Product {
        quantity: number;
    }

    let { cartProducts }: { cartProducts: CartProduct[] } = $props();
</script>

{#if cartProducts.length}
    <div
        class="bg-white border border-slate-300 rounded-lg px-8 py-4 w-2/6 flex flex-col gap-4"
    >
        <b class="">Resumen de compra</b>
        <div class="flex justify-between">
            <p>
                Productos ({cartProducts.reduce(
                    (total, product) => total + product.quantity,
                    0,
                )})
            </p>
            <p>
                ${cartProducts
                    .reduce(
                        (total, product) =>
                            total + product.quantity * product.unit_price,
                        0,
                    )
                    .toLocaleString("es-ar")}
            </p>
        </div>
        <div class="flex justify-between">
            <p>Envío</p>
            <p class="text-green-500">Gratis</p>
        </div>
        <div class="flex justify-between">
            <b>Total</b>
            <b>
                ${cartProducts
                    .reduce(
                        (total, product) =>
                            total + product.quantity * product.unit_price,
                        0,
                    )
                    .toLocaleString("es-ar")}
            </b>
        </div>
        <button class="border-2 border-slate-800 p-2 w-full rounded-lg"
            >Continuar compra</button
        >
    </div>
{:else}
    <div
        class="bg-white border border-slate-300 rounded-lg p-4 w-2/6 flex flex-col gap-4"
    >
        <b class="text-slate-400">Resumen de compra</b>
        <p class="text-slate-400">
            Aquí verás los importes de tu compra una vez que agregues productos.
        </p>
    </div>
{/if}
