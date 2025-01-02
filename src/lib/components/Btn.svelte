<script lang="ts">
    interface Style {
        color?: string;
    }

    let { text, s }: { text: string; s: Style } = $props();
</script>

<button
    class="shadow-md shad{s.color} text{s.color} w-fit color{s.color} bord{s.color} px-4 py-2 border-2 border-b-4 rounded-lg text-slate-500 transition-all duration-200"
>
    <span class="font-bold">{text}</span>
</button>

<style lang="postcss">
    .textwhite {
        @apply text-slate-400;
    }
    .textblack {
        @apply text-gray-300;
    }
    .textslate {
        @apply text-slate-400;
    }
    .textgray {
        @apply text-gray-400;
    }
    .textzinc {
        @apply text-zinc-400;
    }
    .textneutral {
        @apply text-neutral-400;
    }
    .textstone {
        @apply text-stone-400;
    }
    .textred {
        @apply text-red-500;
    }
    .textorange {
        @apply text-orange-500;
    }
    .textamber {
        @apply text-amber-500;
    }
    .textyellow {
        @apply text-yellow-500;
    }
    .textlime {
        @apply text-lime-500;
    }
    .textgreen {
        @apply text-green-500;
    }
    .textemerald {
        @apply text-emerald-500;
    }
    .textteal {
        @apply text-teal-500;
    }
    .textcyan {
        @apply text-cyan-500;
    }
    .textsky {
        @apply text-sky-500;
    }
    .textblue {
        @apply text-blue-500;
    }
    .textindigo {
        @apply text-indigo-500;
    }
    .textviolet {
        @apply text-violet-500;
    }
    .textpurple {
        @apply text-purple-500;
    }
    .textfuchsia {
        @apply text-fuchsia-500;
    }
    .textpink {
        @apply text-pink-500;
    }
    .textrose {
        @apply text-rose-500;
    }

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

    .colorwhite {
        @apply bg-white hover:bg-slate-100;
    }
    .colorblack {
        @apply bg-neutral-700 hover:bg-neutral-600;
    }
    .colorslate {
        @apply bg-slate-200 hover:bg-slate-100;
    }
    .colorgray {
        @apply bg-gray-200 hover:bg-gray-100;
    }
    .colorzinc {
        @apply bg-zinc-200 hover:bg-zinc-100;
    }
    .colorneutral {
        @apply bg-neutral-200 hover:bg-neutral-100;
    }
    .colorstone {
        @apply bg-stone-200 hover:bg-stone-100;
    }
    .colorred {
        @apply bg-red-200 hover:bg-red-300;
    }
    .colororange {
        @apply bg-orange-200 hover:bg-orange-300;
    }
    .coloramber {
        @apply bg-amber-200 hover:bg-amber-300;
    }
    .coloryellow {
        @apply bg-yellow-200 hover:bg-yellow-300;
    }
    .colorlime {
        @apply bg-lime-200 hover:bg-lime-300;
    }
    .colorgreen {
        @apply bg-green-200 hover:bg-green-300;
    }
    .coloremerald {
        @apply bg-emerald-200 hover:bg-emerald-300;
    }
    .colorteal {
        @apply bg-teal-200 hover:bg-teal-300;
    }
    .colorcyan {
        @apply bg-cyan-200 hover:bg-cyan-300;
    }
    .colorsky {
        @apply bg-sky-200 hover:bg-sky-300;
    }
    .colorblue {
        @apply bg-blue-200 hover:bg-blue-300;
    }
    .colorindigo {
        @apply bg-indigo-200 hover:bg-indigo-300;
    }
    .colorviolet {
        @apply bg-violet-200 hover:bg-violet-300;
    }
    .colorpurple {
        @apply bg-purple-200 hover:bg-purple-300;
    }
    .colorfuchsia {
        @apply bg-fuchsia-200 hover:bg-fuchsia-300;
    }
    .colorpink {
        @apply bg-pink-200 hover:bg-pink-300;
    }
    .colorrose {
        @apply bg-rose-200 hover:bg-rose-300;
    }
</style>
