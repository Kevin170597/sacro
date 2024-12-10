import { getProductById, getRandomProducts } from "$lib/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let product = await getProductById(params.id);
    product = JSON.parse(JSON.stringify(product));
    let relatedProducts = await getRandomProducts();
    relatedProducts = JSON.parse(JSON.stringify(relatedProducts));
    return { product, relatedProducts };
};