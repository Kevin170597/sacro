import type { Load } from "@sveltejs/kit";
import { productSchema } from "../[id]/helpers";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: Load = async () => {
    const form = await superValidate(zod(productSchema));
    let defaultVariant = {
        id: "1",
        hexColor: "#ffffff",
        name: "Blanco",
        images: ["https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-a-guy-with-a-cap-at-red-sky-sunset-free-image.jpeg?h=800&quality=80"],
        size: [{ id: "1", name: "XS" }]
    };
    form.data.variants = [defaultVariant];
    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(productSchema));
        if (!form.valid) return fail(400, { form });

        console.log(59, form.data);
    }
}