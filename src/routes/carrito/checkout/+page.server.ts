import { fail, superValidate } from "sveltekit-superforms";
import { notifyBuyerMail, notifySaleMail } from "$lib/services";
import { zod } from "sveltekit-superforms/adapters";
import type { Product } from "$lib/interfaces";
import { redirect, type Load } from "@sveltejs/kit";
import { z } from "zod";

interface CartProduct extends Product {
    quantity: number;
}

const pdfSchema = z.object({
    pdf: z
        .instanceof(File, { message: "Por favor, suba un PDF." })
        .refine((file) => file.type === "application/pdf", { message: "El archivo debe ser un PDF." }),
    email: z.string().email({ message: "Por favor, ingresa un correo válido." }),
    products: z.string().min(1, { message: "Algo salió mal." })
});

export const load: Load = async () => {
    const form = await superValidate(zod(pdfSchema));

    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(pdfSchema));
        if (!form.valid) return fail(400, { form });

        const { pdf, email, products } = form.data;
        const productsArray: CartProduct[] = JSON.parse(products);

        const arrayBuffer = await pdf.arrayBuffer();

        if (pdf instanceof File) {
            try {
                await notifyBuyerMail(email, productsArray);
                await notifySaleMail(email, Buffer.from(arrayBuffer), (pdf as File).name, productsArray);
            } catch (error) {
                console.error("Error enviando correo: ", error);
                return fail(400, { form });
            }
        }

        return redirect(303, "/");
    }
};