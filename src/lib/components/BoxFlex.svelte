<script lang="ts">
    import type { Snippet } from "svelte";

    type Gap = 1 | 2 | 4 | 8 | 12 | 16;

    interface Style {
        gap?: Gap;
        color?: string;
        col?: boolean;
    };

    let { children, s }: { children: Snippet, s: Style } = $props();
</script>

<div class="flex gap{s.gap} color{s.color} {s.col && "flexcol"} bg-white p-4 rounded-lg border-2 border-b-4 bord{s.color} border-slate-300 shadow-md shad{s.color}">
    {@render children()}
</div>

<style lang="postcss">
    .shadwhite {
        @apply shadow-slate-200;
    }
    .shadblack {
        @apply shadow-gray-600;
    }
    .shadslate {
        @apply shadow-slate-200;
    }
    .shadgray {
        @apply shadow-gray-200;
    }
    .shadzinc {
        @apply shadow-zinc-200;
    }
    .shadneutral {
        @apply shadow-neutral-200;
    }
    .shadstone {
        @apply shadow-stone-200;
    }
    .shadred {
        @apply shadow-red-200;
    }
    .shadorange {
        @apply shadow-orange-200;
    }
    .shadamber {
        @apply shadow-amber-200;
    }
    .shadyellow {
        @apply shadow-yellow-200;
    }
    .shadlime {
        @apply shadow-lime-200;
    }
    .shadgreen {
        @apply shadow-green-200;
    }
    .shademerald {
        @apply shadow-emerald-200;
    }
    .shadteal {
        @apply shadow-teal-200;
    }
    .shadcyan {
        @apply shadow-cyan-200;
    }
    .shadsky {
        @apply shadow-sky-200;
    }
    .shadblue {
        @apply shadow-blue-200;
    }
    .shadindigo {
        @apply shadow-indigo-200;
    }
    .shadviolet {
        @apply shadow-violet-200;
    }
    .shadpurple {
        @apply shadow-purple-200;
    }
    .shadfuchsia {
        @apply shadow-fuchsia-200;
    }
    .shadpink {
        @apply shadow-pink-200;
    }
    .shadrose {
        @apply shadow-rose-200;
    }

    .bordwhite {
        @apply border-slate-300;
    }
    .bordblack {
        @apply border-gray-500;
    }
    .bordslate {
        @apply border-slate-300;
    }
    .bordgray {
        @apply border-gray-300;
    }
    .bordzinc {
        @apply border-zinc-300;
    }
    .bordneutral {
        @apply border-neutral-300;
    }
    .bordstone {
        @apply border-stone-300;
    }
    .bordred {
        @apply border-red-300;
    }
    .bordorange {
        @apply border-orange-300;
    }
    .bordamber {
        @apply border-amber-300;
    }
    .bordyellow {
        @apply border-yellow-300;
    }
    .bordlime {
        @apply border-lime-300;
    }
    .bordgreen {
        @apply border-green-300;
    }
    .bordemerald {
        @apply border-emerald-300;
    }
    .bordteal {
        @apply border-teal-300;
    }
    .bordcyan {
        @apply border-cyan-300;
    }
    .bordsky {
        @apply border-sky-300;
    }
    .bordblue {
        @apply border-blue-300;
    }
    .bordindigo {
        @apply border-indigo-300;
    }
    .bordviolet {
        @apply border-violet-300;
    }
    .bordpurple {
        @apply border-purple-300;
    }
    .bordfuchsia {
        @apply border-fuchsia-300;
    }
    .bordpink {
        @apply border-pink-300;
    }
    .bordrose {
        @apply border-rose-300;
    }

    .flexcol {
        @apply flex-col;
    }
    .gap1 {
        @apply gap-1;
    }
    .gap2 {
        @apply gap-2;
    }
    .gap4 {
        @apply gap-4;
    }
    .gap8 {
        @apply gap-8;
    }
    .gap12 {
        @apply gap-12;
    }
    .gap16 {
        @apply gap-16;
    }

    .colorwhite {
        @apply bg-white;
    }
    .colorblack {
        @apply bg-neutral-700;
    }
    .colorslate {
        @apply bg-slate-200;
    }
    .colorgray {
        @apply bg-gray-200;
    }
    .colorzinc {
        @apply bg-zinc-200;
    }
    .colorneutral {
        @apply bg-neutral-200;
    }
    .colorstone {
        @apply bg-stone-200;
    }
    .colorred {
        @apply bg-red-200;
    }
    .colororange {
        @apply bg-orange-200;
    }
    .coloramber {
        @apply bg-amber-200;
    }
    .coloryellow {
        @apply bg-yellow-200;
    }
    .colorlime {
        @apply bg-lime-200;
    }
    .colorgreen {
        @apply bg-green-200;
    }
    .coloremerald {
        @apply bg-emerald-200;
    }
    .colorteal {
        @apply bg-teal-200;
    }
    .colorcyan {
        @apply bg-cyan-200; 
    }
    .colorsky {
        @apply bg-sky-200;
    }
    .colorblue {
        @apply bg-blue-200;
    }
    .colorindigo {
        @apply bg-indigo-200;
    }
    .colorviolet {
        @apply bg-violet-200;
    }
    .colorpurple {
        @apply bg-purple-200;
    }
    .colorfuchsia {
        @apply bg-fuchsia-200;
    }
    .colorpink {
        @apply bg-pink-200;
    }
    .colorrose {
        @apply bg-rose-200;
    }
</style>
