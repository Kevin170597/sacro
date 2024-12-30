import { uploadImage } from '$lib/services';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const body = await request.formData()
        const image = body.get('image');

        if (!image || !(image instanceof File)) {
            throw new Error("Invalid or missing file");
        }
        
        const url = await uploadImage(image);
        if (url === undefined) return json({ error: "Error uploading file." }, { status: 400 });
        return json({ url });
    } catch (error) {
        console.error("Error uploading file.", error);
        return json({ error: "Error uploading file." }, { status: 400 });
    }
};