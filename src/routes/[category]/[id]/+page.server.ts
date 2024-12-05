import { getProductById } from "$lib/services";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }: { params: { id: string } }) => {
    let data = await getProductById(params.id);
    data = JSON.parse(JSON.stringify(data));
    return { data };
};