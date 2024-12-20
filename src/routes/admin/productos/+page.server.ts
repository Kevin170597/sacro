import type { Product } from "$lib/interfaces";
import { getProducts } from "$lib/services";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
    let products: Product[] = await getProducts();
    products = JSON.parse(JSON.stringify(products));
    return { products };
};