import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.auth();
    if (session?.user) throw redirect(302, "/admin");
    return {};
};

export const actions: Actions = {
    default: signIn
};