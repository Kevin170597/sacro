<script lang="ts">
    import Cover from "../../../assets/Portada ML ambo 410 con vivos.png.jpg";
    import { cart } from "$lib/stores";
    import { page } from "$app/stores";

    const { addToCart } = cart;
</script>

<div class="min-h-[92vh] px-8 py-4 bg-slate-100 flex flex-start gap-12">
    <div class="flex gap-4 items-start">
        <div class="w-[65%] bg-white p-3 border border-slate-300 rounded-lg">
            <img src={Cover} class="w-[60%]" alt="" />
        </div>
        <div class="w-[30%] bg-white border border-slate-300 rounded-lg p-4">
            <h1 class="font-bold text-[22px]">
                Pantalón Náutico Arciel | Combinado | Sacro
            </h1>
            <h2 class="text-[40px]">$60.900</h2>
            <button
                onclick={() => addToCart($page.params.id)}
                class="border-2 border-slate-800 p-2 w-full rounded-lg"
            >
                Agregar al carrito
            </button>
        </div>
    </div>
</div>
