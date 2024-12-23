import { getProducts, deleteProduct } from "$lib/services";
import type { Load, Actions } from "@sveltejs/kit";
import type { Product } from "$lib/interfaces";

export const load: Load = async () => {
    let products: Product[] = await getProducts();
    products = JSON.parse(JSON.stringify(products));
    return { products };
};

export const actions: Actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData.get("id"));
        await deleteProduct(formData.get("id") as string);
    }
};