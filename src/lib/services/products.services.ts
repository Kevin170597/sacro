import mongoose, { type UpdateWriteOpResult } from "mongoose";
import type { Product } from "$lib/interfaces";
import { ProductModel } from "$lib/models";
import { dbConnect } from "$lib/db";

export const getProducts = async (sortByUnitPrice?: 'asc' | 'desc'): Promise<Product[] | any> => {
    try {
        await dbConnect();

        const sortOrder = sortByUnitPrice === 'asc' ? 1 : -1;
        return await ProductModel.find({})
            .sort(sortByUnitPrice ? { unit_price: sortOrder } : {});
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
        return  await ProductModel.findById({ _id: id });
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

export const getRandomProducts = async (): Promise<Product[]> => {
    try {
        await dbConnect();
        return await ProductModel.aggregate([{ $sample: { size: 2 } }]);
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const addProduct = async (product: Product): Promise<Product | [] | any> => {
    try {
        await dbConnect();
        return await ProductModel.create(product);
    } catch (error) {
        console.error("Error creating product.", error);
        return [];
    }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<UpdateWriteOpResult | []> => {
    try {
        await dbConnect();
        return await ProductModel.updateOne({ _id: id }, product);
    } catch (error) {
        console.error("Error updating product.", error);
        return [];
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await dbConnect();
        return await ProductModel.deleteOne({ _id: id });
    } catch (error) {
        console.error("Error deleting product.", error);
        return [];
    }
};