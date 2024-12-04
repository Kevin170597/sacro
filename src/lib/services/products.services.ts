import type { Product } from "$lib/interfaces";
import { ProductModel } from "$lib/models";
import { dbConnect } from "$lib/db";
import mongoose from "mongoose";

export const getProducts = async (): Promise<Product[]> => {
    try {
        await dbConnect();
        return await ProductModel.find({});
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }

};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        await dbConnect();
        return await ProductModel.findOne({ _id: id });
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};

export const getManyProductsById = async (ids: string[]): Promise<Product[]> => {
    try {
        await dbConnect();
        return await ProductModel.find({ "_id": { $in: ids } });
    } catch (error) {
        console.error(`Error fetching products with ids ${ids}:`, error);
        return [];
    }
};

export const addProduct = async (product: Product): Promise<Product | []> => {
    try {
        await dbConnect();
        return await ProductModel.create(product);
    } catch (error) {
        console.error("Error creating product.", error);
        return [];
    }
};