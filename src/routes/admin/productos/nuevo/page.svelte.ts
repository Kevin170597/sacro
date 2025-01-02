import type { Variant } from "$lib/interfaces";

const variantsStore = () => {
    let variants: Variant[] = $state([]);
    let s = $state("s")

    return {
        get variants() { return variants; },
        set variants(v: Variant[]) { variants = v; },
        get s() { return s },
        set s(v: string) { s = v }
    }
};

export const variants = variantsStore();