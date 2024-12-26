<script lang="ts">
    import "./Text.css";
    import type { Color, Rounded, Size, Variant } from "./Text";

    let {
        class: className,
        color = "slate",
        text,
        bold = false,
        variant = "text",
        rounded = "sm",
        size = "md",
    }: {
        class?: string;
        color?: Color;
        text: string;
        bold?: boolean;
        variant?: Variant;
        rounded?: Rounded;
        size?: Size;
    } = $props();
</script>

<p
    class="w-fit {bold
        ? 'font-bold'
        : ''} text{color} text{variant} textrounded{rounded} textsize{size} {className}"
>
    {text}
</p>
