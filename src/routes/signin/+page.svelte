<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components";
</script>

<div class="h-[92vh] bg-slate-100 py-4">
    <h1 class="text-[24px] font-bold text-center mb-4">Iniciar sesión</h1>
    <div
        class="w-2/5 mx-auto px-8 py-4 bg-white border border-slate-300 rounded-lg"
    >
        <h2 class="mb-4 font-bold text-[24px]">
            <span class="text-sky-500">G</span>
            <span class="text-red-500">o</span>
            <span class="text-yellow-500">o</span>
            <span class="text-sky-500">g</span>
            <span class="text-green-500">l</span>
            <span class="text-red-500">e</span>
        </h2>
        <SignIn
            provider="google"
            className="text-sky-600 font-bold border bg-sky-100 border-slate-300 py-4 px-8 rounded-lg text-center"
        />
    </div>
</div>
