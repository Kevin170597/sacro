<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="h-[92vh] bg-slate-100 flex flex-col justify-center items-center">
    <b class="text-[32px]">{$page.status}</b>
    <p class="text-slate-500">{$page.error?.message}</p>
</div>
