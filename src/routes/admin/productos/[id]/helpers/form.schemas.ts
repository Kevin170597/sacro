import { z } from "zod";

export const titleSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido." }),
});

export type TitleSchema = typeof titleSchema;

export const priceSchema = z.object({
    unit_price: z.number().min(1, { message: "El precio es requerido." }),
});

export type PriceSchema = typeof priceSchema;

export const discountSchema = z.object({
    discount: z.number().min(0, { message: "El descuento es requerido." }),
});

export type DiscountSchema = typeof discountSchema;

export const descriptionSchema = z.object({
    description: z.string().min(1, { message: "La descripción es requerida." }),
});

export type DescriptionSchema = typeof descriptionSchema;

export const sizeSchema = z.object({
    id: z.string().min(1, { message: "El id es requerido." }),
    name: z.string().min(1, { message: "El talle es requerido." }),
});

export const variantSchema = z.object({
    id: z.string().min(1, { message: "El id es requerido." }),
    name: z.string().min(1, { message: "El nombre es requerido." }),
    hexColor: z.string().min(1, { message: "El color es requerido." }),
    images: z.array(z.string()).min(1, { message: "Debe haber al menos una imagen." }),
    size: z.array(sizeSchema).min(1, { message: "Debe haber al menos una talla." }),
});

export const variantsSchema = z.object({
    variants: z.array(variantSchema).min(1, { message: "Debe haber al menos una variante." }),
});

export type VariantsSchema = typeof variantsSchema;

export const productSchema = z.object({
    title: titleSchema.shape.title,
    unit_price: priceSchema.shape.unit_price,
    discount: discountSchema.shape.discount,
    description: descriptionSchema.shape.description,
    variants: variantsSchema.shape.variants,
});

export type ProductSchema = typeof productSchema;