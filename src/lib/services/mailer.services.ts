import { MAILER_USER, MAILER_PASSWORD } from "$env/static/private";
import { orderTemplate, saleTemplate } from "./mailer.templates";
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

export const notifyBuyerMail = async (to: string, products: CartProduct[]) => {
    await transporter.sendMail({
        from: MAILER_USER,
        to,
        subject: "Compra a Sacro",
        html: orderTemplate(products)
    });
};

export const notifySaleMail = async (customerEmail: string, pdf: Buffer, pdfFileName: string, products: CartProduct[]) => {
    await transporter.sendMail({
        from: MAILER_USER,
        to: "kevin170597@gmail.com",
        subject: "¡Vendimos!",
        html: saleTemplate(customerEmail, products),
        attachments: [
            {
                filename: pdfFileName,
                content: pdf
            }
        ]
    });
};