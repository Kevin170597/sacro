import type { Product } from "$lib/interfaces";
import { ProductModel } from "$lib/models";
import { dbConnect } from "$lib/db";
import mongoose from "mongoose";

export const getProducts = async (): Promise<Product[]> => {
    try {
        await dbConnect();
        const res: Product[] | [] = await ProductModel.find({});
        console.log(res);
        return res;
        //return await ProductModel.find({});
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
        const res: Product | null = await ProductModel.findOne({ _id: id });
        console.log(res);
        return res;
        //return await ProductModel.findOne({ _id: id });
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
};