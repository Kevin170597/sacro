<script lang="ts">
    import { signOut } from "@auth/sveltekit/client";
    import { Sidebar } from "./snippets";
    import { page } from "$app/stores";

    let { children } = $props();
</script>

<div class="h-[100vh] bg-slate-200 flex">
    <Sidebar />
    <div class="w-[80%]">
        <div
            class="bg-white border-b border-slate-300 h-[8vh] flex items-center px-8"
        >
            {#if $page.data.session?.user}
                <div class="flex items-center gap-4 ml-auto h-full">
                    <img
                        class="h-[60%] w-fit object-contain rounded-full"
                        src={$page.data.session?.user?.image}
                        alt=""
                    />
                    <b class="text-[14px]">{$page.data.session.user.name}</b>
                    <button onclick={() =>signOut()}>Salir</button>
                </div>
            {/if}
        </div>
        <div class="h-[92vh]">
            {@render children()}
        </div>
    </div>
</div>
