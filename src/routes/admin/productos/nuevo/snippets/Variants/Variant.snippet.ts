import { variants } from "../../page.svelte";

export const deleteVariant = (variantIndex: number) =>
(variants.variants = [
    ...variants.variants.slice(0, variantIndex),
    ...variants.variants.slice(variantIndex + 1),
]);