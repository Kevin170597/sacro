import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import Google from "@auth/sveltekit/providers/google";
import { SvelteKitAuth } from "@auth/sveltekit";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [
            Google({
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET
            })
        ],
        callback: {
            async signIn({ account, profile }: { account: any, profile: any }) {
                // todo: verify user
                return true;
            }
        },
        secret: AUTH_SECRET,
        trustHost: true
    }
    return authOptions;
});