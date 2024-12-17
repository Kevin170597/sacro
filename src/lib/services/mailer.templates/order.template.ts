import type { Product } from "$lib/interfaces";

interface CartProduct extends Product {
    quantity: number;
}

const orderCardTemplate = (product: CartProduct) => {
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

export const orderTemplate = (products: CartProduct[]) => {
    return `
        <div style="background-color: #F1F5F9; width: 100%; padding: 16px; display: flex;">
            <div style="background-color: #ffffff; width: 70%; padding: 16px; margin: 0 auto; border-radius: 12px; border: 1px solid #CBD5E1;">
                <div style="width: 100%; display: flex;">
                    <img
                        style="width: 30%; height: fit-content; margin: 0 auto;"
                        src="https://i.imgur.com/W2oS6lE.png" 
                    />
                </div>
                <div
                    style="width: 100%; display: flex; border-bottom: 1px solid #CBD5E1;">
                    <h1 style="margin: 0 auto 46px;">¡Gracias por tu
                        compra!</h1>
                </div>
                <div style="width: 100%;">
                    ${products.map(product => orderCardTemplate(product))}
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
                <div
                    style="width: 100%;">
                    <div
                        style="border-bottom: 1px solid #CBD5E1; padding: 32px 0;">
                        <div
                            style="display: flex; width: 100%; padding: 16px 0;">
                            <h2 style="margin: 0 auto;">¿Qué sigue?</h2>
                        </div>
                        <div
                            style="display: flex; width: 100%; padding: 16px 0;">
                            <p style="margin: 0 auto;">Recibirás notificaciones
                                del
                                estado de tu pedido.</p>
                        </div>
                        <div
                            style="display: flex; width: 100%; padding: 16px 0;">
                            <p style="color: #666666; margin: 0 auto;">Por
                                cualquier
                                consulta sobre tu
                                compra, comunicate con nosotros respondiendo a
                                este
                                correo o por nuestro <a
                                    href="https://wa.me/5491154105057"
                                    target="_blank">Whatsapp</a>.</p>
                        </div>
                    </div>
                </div>
                <div
                    style="width: 100%; background-color: #272727; border-radius: 0 0 12px 12px;">
                    <div style="padding: 16px 16px;">
                        <div
                            style="display: flex; width: 100%; padding: 16px 0;">
                            <h2 style="margin: 0 auto; color: #ffffff;">Seguinos
                                en nuestras redes</h2>
                        </div>
                        <div
                            style="display: flex; width: 100%; padding: 16px 0;">
                            <a style="margin: 0 60px 0 auto;" href="https://www.facebook.com/profile.php?id=61563279825598" target="_blank">
                                <img style="width: 30px; height: 30px;" src="https://i.imgur.com/YsWbIIa.png" alt="">
                            </a>
                            <a style="margin: 0 30px;" href="https://www.instagram.com/sacro.ar" target="_blank">
                                <img style="width: 30px; height: 30px;" src="https://i.imgur.com/prBtxVo.png" alt="">
                            </a>
                            <a style="margin: 0 auto 0 60px;" href="https://api.whatsapp.com/send?phone=541154105057&text=Hola,%20estoy%20interesado%20en%20uno%20de%20sus%20productos.%20%C2%BFMe%20pueden%20ayudar%20con%20m%C3%A1s%20informaci%C3%B3n?" target="_blank">
                                <img style="width: 30px; height: 30px;" src="https://i.imgur.com/WupnGd1.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};