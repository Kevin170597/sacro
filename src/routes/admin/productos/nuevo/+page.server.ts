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
        images: ["https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75", "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg", "https://img.freepik.com/premium-photo/wide-angle-shot-single-tree-growing-clouded-sky-sunset-surrounded-by-grass_181624-22807.jpg", "https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=", "https://images.pexels.com/photos/289998/pexels-photo-289998.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "https://gratisography.com/wp-content/uploads/2024/10/gratisography-happy-cone-800x525.jpg", "https://t3.ftcdn.net/jpg/09/16/82/78/360_F_916827828_bBwwvn5wz8aycMlTw6K4fXQY4IkiOl2Q.jpg", "https://pixlr.com/images/generator/text-to-image.webp"],
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