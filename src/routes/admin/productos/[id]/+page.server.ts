
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { getProductById } from "$lib/services";
import { fail } from "@sveltejs/kit";

const sizeSchema = z.object({
    id: z.string().min(1, { message: "El id es requerido." }),
    name: z.string().min(1, { message: "El talle es requerido." }),
});

const variantSchema = z.object({
    id: z.string().min(1, { message: "El id es requerido." }),
    name: z.string().min(1, { message: "El nombre es requerido." }),
    hexColor: z.string().min(1, { message: "El color es requerido." }),
    images: z.array(z.string()).min(1, { message: "Debe haber al menos una imagen." }),
    size: z.array(sizeSchema).min(1, { message: "Debe haber al menos una talla." }),
});

const productSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido." }),
    unit_price: z.number().min(1, { message: "El precio es requerido." }),
    discount: z.number().min(0).nonnegative(),
    description: z.string().min(1, { message: "La descripción es requerida." }),
    variants: z.array(variantSchema).min(1, { message: "Debe haber al menos una variante." }),
});

const titleSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido." }),
});

const priceSchema = z.object({
    unit_price: z.number().min(1, { message: "El precio es requerido." }),
});

const discountSchema = z.object({
    discount: z.number().min(0, { message: "El descuento es requerido." }),
});

const descriptionSchema = z.object({
    description: z.string().min(1, { message: "La descripción es requerida." }),
});

const variantsSchema = z.object({
    variants: z.array(variantSchema).min(1, { message: "Debe haber al menos una variante." }),
});

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let product = await getProductById(params.id);
    product = JSON.parse(JSON.stringify(product));

    const titleForm = await superValidate(product, zod(titleSchema));
    const unitPriceForm = await superValidate(product, zod(priceSchema));
    const discountForm = await superValidate(product, zod(discountSchema));
    const descriptionForm = await superValidate(product, zod(descriptionSchema));
    const variantsForm = await superValidate(product, zod(variantsSchema));

    if (!titleForm.valid || !unitPriceForm.valid || !discountForm.valid || !descriptionForm.valid || !variantsForm.valid) return {
        titleForm: { ...titleForm, error: "Validation failed" },
        unitPriceForm: { ...unitPriceForm, error: "Validation failed" },
        discountForm: { ...discountForm, error: "Validation failed" },
        descriptionForm: { ...descriptionForm, error: "Validation failed" },
        variantsForm: { ...variantsForm, error: "Validation failed" },
    };

    return { titleForm, unitPriceForm, discountForm, descriptionForm, variantsForm };
};

export const actions = {
    title: async ({ request }) => {
        const form = await superValidate(request, zod(titleSchema));
        if (!form.valid) return fail(400, { form });

        console.log(59, form.data);
    },
    unit_price: async ({ request }) => {
        const form = await superValidate(request, zod(priceSchema));
        if (!form.valid) return fail(400, { form });

        console.log(59, form.data);
    },
    discount: async ({ request }) => {
        const form = await superValidate(request, zod(discountSchema));
        if (!form.valid) return fail(400, { form });

        console.log(59, form.data);
    },
    description: async ({ request }) => {
        const form = await superValidate(request, zod(descriptionSchema));
        if (!form.valid) return fail(400, { form });

        console.log(59, form.data);
    },
    variants: async ({ request }) => {
        const form = await superValidate(request, zod(variantsSchema));
        if (!form.valid) {
            console.log(108, form)
            return fail(400, { form })
        };

        console.log(59, form.data);
    },
}