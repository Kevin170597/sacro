import mongoose, { Schema, Document, Model } from "mongoose";
import type { Product, Variant, Size, Image } from "$lib/interfaces";

const Size = new Schema<Size>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const Image = new Schema<Image>({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const VariantSchema = new Schema<Variant>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hexColor: {
        type: String,
        required: true
    },
    images: {
        type: [Image],
        required: true
    },
    size: {
        type: [Size],
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