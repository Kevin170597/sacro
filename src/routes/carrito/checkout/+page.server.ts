import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import type { Load } from "@sveltejs/kit";

const pdfSchema = z.object({
    pdf: z
        .instanceof(File, { message: "PDF is required" })
        .refine((file) => file.type === "application/pdf", { message: "PDF must be a PDF file" })
});

export const load: Load = async () => {
    const form = await superValidate(zod(pdfSchema));

    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(pdfSchema));

        if (!form.valid) {
            console.log(25, "form is not valid");
            return fail(400, { form });
        }

        const arrayBuffer = await form.data.pdf.arrayBuffer();

        if (form.data.pdf instanceof File) {
            const uploadPath = path.join(
                "uploads", (form.data.pdf as File).name
            );
            try {
                await fs.writeFile(uploadPath, new Uint8Array(arrayBuffer));
            } catch (error) {
                console.error("Error writing file: ", error);
            }
        } else console.log("something went wrong");

        return message(form, "PDF uploaded successfully");
    }
};