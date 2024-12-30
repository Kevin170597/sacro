import { IMGUR_TOKEN } from "$env/static/private";

export const uploadImage = async (image: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("image", image, image.name);
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${IMGUR_TOKEN}`,
            },
            body: formData,
        });
        const data = await response.json();
        return data.data.link;
    } catch (error) {
        console.error("Error uploading image:", error);
        return "";
    }
};