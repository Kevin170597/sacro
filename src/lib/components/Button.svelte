<script lang="ts">
    import "./Button.css";
    import type { Color, Rounded, Size, Variant } from "./Button";

    let {
        class: className,
        onclick,
        label,
        color,
        variant = "text",
        rounded = "sm",
        size = "md",
        type = "button",
    }: {
        class?: string;
        onclick?: () => void;
        label: string;
        color: Color;
        variant?: Variant;
        rounded?: Rounded;
        size?: Size;
        type?: "button" | "submit" | "reset";
    } = $props();
</script>

<button
    {type}
    {onclick}
    class="{variant} {color} rounded{rounded} size{size} w-fit transition-all duration-200 {className}"
>
    <span class="font-bold">{label}</span>
</button>
