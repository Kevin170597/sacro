import type { Product } from "$lib/interfaces";
import { getProducts } from "$lib/services";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ url }) => {
    let sort = url.searchParams.get("sort") as "asc" | "desc";
    let products: Product[];
    products = await getProducts(sort);
    return { products: JSON.parse(JSON.stringify(products)) };
};