<script lang="ts">
    import { Sidebar } from "./snippets";

    let { children } = $props();
</script>

<div class="min-h-[100vh] bg-slate-200 flex">
    <Sidebar />
    <div class="w-[80%]">
        {@render children()}
    </div>
</div>
