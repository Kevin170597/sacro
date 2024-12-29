export interface Product {
    _id?: string,
    title: string,
    unit_price: number,
    discount: number,
    description: string,
    variants: Variant[]
};

export interface Variant {
    id: string,
    name: string,
    hexColor: string,
    images: Image[],
    size: Size[]
};

export interface Size {
    id: string,
    name: string
}

export interface Image {
    id: string,
    url: string
}