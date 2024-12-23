import type { LayoutServerLoad } from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.getSession();
    if (!session?.user) throw redirect(302, "/signin");
    return { session };
};