import { getProducts } from "$lib/services";
import { json } from "@sveltejs/kit";

export async function GET() {
    let res = await getProducts();
    return json(res);
};