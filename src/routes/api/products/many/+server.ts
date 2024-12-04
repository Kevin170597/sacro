import { getManyProductsById } from "$lib/services";
import type { Product } from "$lib/interfaces";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        console.log(8, body)
        if (!body || !Array.isArray(body)) {
            return json({ error: 'Invalid request. "ids" must be an array.' }, { status: 400 });
        }
        const products = await getManyProductsById(body);
        return json(products);
    } catch (error) {
        console.error("Error fetching products: ", error);
        return json({ error: "Failed to fetch products" }, { status: 500 });
    }
};