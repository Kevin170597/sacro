import { titleSchema, priceSchema, discountSchema, descriptionSchema, variantsSchema } from "./helpers";
import { getProductById, updateProduct } from "$lib/services";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let product = await getProductById(params.id);
    product = JSON.parse(JSON.stringify(product));
    if (!product) return error(404, { message: "El producto no existe" });

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

    return { product, titleForm, unitPriceForm, discountForm, descriptionForm, variantsForm };
};

export const actions: Actions = {
    title: async ({ request, params }) => {
        const form = await superValidate(request, zod(titleSchema));
        if (!form.valid) return fail(400, { form });
        await updateProduct(params.id, { title: form.data.title });
    },
    unit_price: async ({ request, params }) => {
        const form = await superValidate(request, zod(priceSchema));
        if (!form.valid) return fail(400, { form });
        await updateProduct(params.id, { unit_price: form.data.unit_price });
    },
    discount: async ({ request, params }) => {
        const form = await superValidate(request, zod(discountSchema));
        console.log(form.data);
        if (!form.valid) return fail(400, { form });
        await updateProduct(params.id, { discount: form.data.discount });
    },
    description: async ({ request, params }) => {
        const form = await superValidate(request, zod(descriptionSchema));
        if (!form.valid) return fail(400, { form });
        await updateProduct(params.id, { description: form.data.description });
    },
    variants: async ({ request, params }) => {
        const form = await superValidate(request, zod(variantsSchema));
        if (!form.valid) {
            return fail(400, { form })
        };
        await updateProduct(params.id, { variants: form.data.variants });
    },
}
