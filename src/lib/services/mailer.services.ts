import { MAILER_USER, MAILER_PASSWORD } from "$env/static/private";
import type { Product } from "$lib/interfaces";
import nodemailer from "nodemailer";

interface CartProduct extends Product {
    quantity: number;
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD
    }
});

const cardTemplate = (product: CartProduct) => {
    return `
        <div style="display: flex; padding: 16px; border-bottom: 1px solid #CBD5E1;">
            <img style="width: 20%; height: fit-content;" src="${product.variants[0].images[0]}" alt="" />
            <div style="width: 80%; padding-horizontal: 16px;">
                <h2 style="margin: 0;">${product.title}</h2>
                <h2>$${product.unit_price.toLocaleString("es-ar")}</h2>
                <p style="color: #9CA3AF;">Color: ${product.variants[0].name}</p>
                <p style="color: #9CA3AF;">Cantidad: ${product.quantity}</p>
                <b>$${(product.unit_price * product.quantity).toLocaleString("es-ar")}</b>
            </div>
        </div>
    `
};

const template = (products: CartProduct[]) => {
    return `
        <div style="background-color: #F1F5F9; width: 100%; padding: 16px; display: flex;">
            <div style="background-color: #ffffff; width: 80%; padding: 16px; margin: 0 auto; border-radius: 12px; border: 1px solid #CBD5E1;">
                <div style="width: 100%; display: flex;">
                    <img style="width: 30%; height: fit-content; margin: 0 auto;" src="https://i.imgur.com/W2oS6lE.png" />
                </div>
                <div style="width: 100%; display: flex; border-bottom: 1px solid #CBD5E1;">
                    <h1 style="margin: 0 auto 16px;">¡Gracias por tu compra!</h1>
                </div>
                <div style="width: 100%;">
                    ${products.map(product => cardTemplate(product))}
                </div>
            </div>
        </div>
    `;
};


export const notifyBuyerMail = async (to: string, products: CartProduct[]) => {
    const productsList = products.map((product, index) => {
        return `${index + 1}. ${product.title}\n Precio x${product.quantity}: $${product.unit_price * product.quantity}\n`;
    });

    await transporter.sendMail({
        from: MAILER_USER,
        to,
        subject: "Compra a Sacro",
        html: template(products)
    });
};

export const notifySaleMail = async (customerEmail: string, pdf: Buffer, pdfFileName: string, products: CartProduct[]) => {
    const productsList = products.map((product, index) => {
        return `${index + 1}. ${product.title}\n Precio x${product.quantity}: $${product.unit_price * product.quantity}\n`;
    });

    await transporter.sendMail({
        from: MAILER_USER,
        to: MAILER_USER, // me
        subject: "¡Vendimos!",
        text: `Email del comprador: ${customerEmail}\n Productos en el pedido:\n\n ${productsList}`,
        attachments: [
            {
                filename: pdfFileName,
                content: pdf
            }
        ]
    });
};