import type { Product } from "$lib/interfaces";
import { getProducts } from "$lib/services";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    let data: Product[] = await getProducts();
    data = JSON.parse(JSON.stringify(data));
    return { data };
};