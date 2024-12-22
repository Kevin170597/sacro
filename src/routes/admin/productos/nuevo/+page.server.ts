import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { productSchema } from "../[id]/helpers";
import type { Load } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export const load: Load = async () => {
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

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(productSchema));
        console.log(24, form.data)
        if (!form.valid) {
            console.log(108, form.errors)
            return fail(400, { form })
        };

        console.log(59, form.data);
    }
}