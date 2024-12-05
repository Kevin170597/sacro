import { getProducts } from "$lib/services";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    let data = await getProducts();
    data = JSON.parse(JSON.stringify(data));
    return { data };
};