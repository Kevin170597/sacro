
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { getProductById } from "$lib/services";
import { fail } from "@sveltejs/kit";

const sizeSchema = z.object({
    id: z.string().min(1, { message: "El id es requerido." }),
    name: z.string().min(1, { message: "El nombre es requerido." }),
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

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let product = await getProductById(params.id);
    product = JSON.parse(JSON.stringify(product));

    const form = await superValidate(product, zod(productSchema));
    const titleForm = await superValidate(product, zod(titleSchema));
    const unitPriceForm = await superValidate(product, zod(priceSchema));
    const discountForm = await superValidate(product, zod(discountSchema));
    const descriptionForm = await superValidate(product, zod(descriptionSchema));

    if (!form.valid || !titleForm.valid || !unitPriceForm.valid || !discountForm.valid || !descriptionForm.valid) return {
        form: { ...form, error: "Validation failed" },
        titleForm: { ...titleForm, error: "Validation failed" },
        unitPriceForm: { ...unitPriceForm, error: "Validation failed" },
        discountForm: { ...discountForm, error: "Validation failed" },
        descriptionForm: { ...descriptionForm, error: "Validation failed" },
    };

    return { form, titleForm, unitPriceForm, discountForm, descriptionForm };
};

export const actions = {
    all: async ({ request }) => {
        const form = await superValidate(request, zod(productSchema));
        if (!form.valid) return fail(400, { form });

        console.log(50, form.data)
        //console.log(49, form.data.variants.map((variant) => variant.size.map((size) => size)))
    },
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
}