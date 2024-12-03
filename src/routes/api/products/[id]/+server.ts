import { json } from "@sveltejs/kit";
import { getProductById } from "$lib/services/products.services";

export async function GET({ params }: { params: { id: string } }) {
    let res = await getProductById(params.id);
    return json(res);
};