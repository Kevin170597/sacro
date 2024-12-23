import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { productSchema } from "../[id]/helpers";
import { addProduct } from "$lib/services";
import { fail } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export const load: PageServerLoad = async () => {
    const form = await superValidate(zod(productSchema));
    let defaultVariant = {
        id: nanoid(5),
        hexColor: "#ffffff",
        name: "Blanco",
        images: [],
        size: [{ id: "1", name: "XS" }]
    };
    form.data.variants = [defaultVariant];
    return { form };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(productSchema));
        if (!form.valid) {
            return fail(400, { form })
        };

        await addProduct(form.data);
    }
}