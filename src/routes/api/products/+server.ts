import { json } from "@sveltejs/kit";
import { getProducts } from "$lib/services/products.services";

export async function GET() {
    let res = await getProducts();
    return json(res);
};