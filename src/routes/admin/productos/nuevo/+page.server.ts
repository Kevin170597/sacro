import { superValidate, type Infer } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import type { Product, Variant } from "$lib/interfaces";
import { zod } from "sveltekit-superforms/adapters";
import { productSchema } from "../[id]/helpers";
import { fail, redirect } from "@sveltejs/kit";
import { addProduct } from "$lib/services";
import { nanoid } from "nanoid";

export const load: PageServerLoad = async () => {
    const form = await superValidate<Infer<typeof productSchema>>(zod(productSchema));
    let defaultVariant: Variant = {
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
    default: async ({ request }: { request: Request }) => {
        const form = await superValidate<Infer<typeof productSchema>>(request, zod(productSchema));
        if (!form.valid) return fail(400, { form });

        let product: Product | null = await addProduct(form.data);
        if (product) return redirect(302, "/admin/productos");
    }
};
