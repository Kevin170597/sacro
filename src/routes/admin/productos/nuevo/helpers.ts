
/**
     * Handles the upload of an image.
     *
     * This function is called when the user selects an image file to upload.
     * It sends the image file to the server, where it is stored and a URL is generated.
     * The URL is then returned and used to update the product's image.
     *
     * @param {File} file - The event object containing the input element.
     * @returns {Promise<string | undefined>} A promise that resolves to the URL of the uploaded image, or undefined if there was an error.
     */
export const fetchUploadImage = async (
    file: File,
): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("image", file, file.name);

    try {
        const response = await fetch("/api/images_upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        };

        const { url } = await response.json();
        return url;
    } catch (error) {
        console.error("Error uploading image:", error);
        return undefined;
    }
};

