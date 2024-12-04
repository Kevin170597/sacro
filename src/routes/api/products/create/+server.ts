import { addProduct } from "$lib/services";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        const product = await addProduct(body);
        return json(product);
    } catch (error) {
        console.error("Error creating product.", error);
        return json({ error: "Falied creating product." }, { status: 400 });
    }
};