<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="bg-white w-[20%] border-r border-slate-300 flex flex-col gap-4">
    <a class="font-bold text-[20px] px-8 pt-4" href="/admin">Sacro</a>
    <a
        href="/admin/productos"
        class="hover:bg-slate-200 transition-all duration-200 px-8 py-4 text-[14px] {$page.url.pathname.includes(
            "admin/productos"
        ) ? "bg-slate-100 border-l-4 border-sky-600 font-bold" : ""}"
    >
        Productos
    </a>
</div>
