import { variants } from "../page.svelte";
import { nanoid } from "nanoid";

export const addVariant = () =>
(variants.variants = [
    ...variants.variants,
    {
        id: nanoid(5),
        name: "Blanco",
        hexColor: "#ffffff",
        size: [{ id: nanoid(5), name: "XS" }],
        images: [],
    },
]);

export const handleDndConsiderVariant = (e: CustomEvent) =>
    (variants.variants = e.detail.items);

export const handleDndFinalizeVariant = (e: CustomEvent) =>
    (variants.variants = e.detail.items);