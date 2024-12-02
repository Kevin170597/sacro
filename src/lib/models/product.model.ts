import mongoose, { Schema, Document, Model } from "mongoose";
import { type Product, type Variant } from "$lib/interfaces";

const VariantSchema = new Schema<Variant>({
    name: {
        type: String,
        required: true
    },
    hexColor: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

export const ProductSchema = new mongoose.Schema<Product>(
    {
        title: {
            type: String,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        variants: {
            type: [VariantSchema],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: "products"
    }
);

export const ProductModel: Model<Document<Product>> = mongoose.models["products"] || mongoose.model("products", ProductSchema);