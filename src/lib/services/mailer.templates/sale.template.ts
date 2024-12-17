import type { Product } from "$lib/interfaces";

interface CartProduct extends Product {
    quantity: number;
}

const saleCardTemplate = (product: CartProduct) => {
    return `
        <div style="display: flex; padding: 32px 16px; border-bottom: 1px solid #CBD5E1;">
            <img style="width: 10%; height: fit-content;" src="${product.variants[0].images[0]}" alt />
            <div style="width: 80%; padding: 0 16px;">
                <div style="display: flex;">
                    <h2 style="margin: 0;">${product.title}</h2>
                    <h2 style="margin: 0 0 0 auto;">$${product.unit_price.toLocaleString("es-ar")}</h2>
                </div>
                <p style="color: #9CA3AF;">Color: ${product.variants[0].name}</p>
                <p style="color: #9CA3AF;">Cantidad: ${product.quantity}</p>
            </div>
        </div>
    `
};

export const saleTemplate = (customerEmail: string, products: CartProduct[]) => {
    return `
        <div
            style="background-color: #F1F5F9; width: 100%; padding: 16px; display: flex;">
            <div
                style="background-color: #ffffff; width: 70%; padding: 16px; margin: 0 auto; border-radius: 12px; border: 1px solid #CBD5E1;">
                <div
                    style="width: 100%; display: flex;">
                    <h1 style="margin: 12px auto 32px;">¡Nueva venta!</h1>
                </div>
                <div
                    style="width: 100%; display: flex;">
                    <p style="margin: 0 auto 12px;">Email del comprador:</p>
                </div>
                <div
                    style="width: 100%; display: flex; border-bottom: 1px solid #CBD5E1;">
                    <h2 style="margin: 0 auto 24px;">${customerEmail}</h2>
                </div>
                <div style="width: 100%;">
                    ${products.map(product => saleCardTemplate(product))}
                </div>
                <div
                    style="width: 100%;">
                    <div
                        style="border-bottom: 1px solid #CBD5E1; padding: 0 16px;">
                        <h2>Resumen de la compra</h2>
                        <p>Productos (${products.reduce(
        (total, product) => total + product.quantity,
        0,
    )}): $${products.reduce((acc, product) => acc + product.unit_price * product.quantity, 0).toLocaleString("es-ar")}</p>
                        <h1>Total: $${products.reduce((acc, product) => acc + product.unit_price * product.quantity, 0).toLocaleString("es-ar")}</h1>
                    </div>
                </div>
            </div>
        </div>
    `
};