import { titleSchema, priceSchema, discountSchema, descriptionSchema, variantsSchema } from "./helpers";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { getProductById } from "$lib/services";
import { fail } from "@sveltejs/kit";

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

export const actions: Actions = {
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
