export interface Product {
    _id: string,
    title: string,
    unit_price: number,
    discount: number,
    description: string,
    variants: Variant[]
};

export interface Variant {
    name: string,
    hexColor: string,
    images: string[]
};