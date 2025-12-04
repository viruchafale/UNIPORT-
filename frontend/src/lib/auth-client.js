"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = void 0;
exports.useSession = useSession;
const react_1 = require("better-auth/react");
const react_2 = require("react");
exports.authClient = (0, react_1.createAuthClient)({
    baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL,
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("bearer_token") : ""}`,
        },
        onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token");
            // Store the token securely (e.g., in localStorage)
            if (authToken) {
                // Split token at "." and take only the first part
                const tokenPart = authToken.includes('.') ? authToken.split('.')[0] : authToken;
                localStorage.setItem("bearer_token", tokenPart);
            }
        }
    }
});
function useSession() {
    const [session, setSession] = (0, react_2.useState)(null);
    const [isPending, setIsPending] = (0, react_2.useState)(true);
    const [error, setError] = (0, react_2.useState)(null);
    const refetch = () => {
        setIsPending(true);
        setError(null);
        fetchSession();
    };
    const fetchSession = async () => {
        try {
            const res = await exports.authClient.getSession({
                fetchOptions: {
                    auth: {
                        type: "Bearer",
                        token: typeof window !== 'undefined' ? localStorage.getItem("bearer_token") || "" : "",
                    },
                },
            });
            setSession(res.data);
            setError(null);
        }
        catch (err) {
            setSession(null);
            setError(err);
        }
        finally {
            setIsPending(false);
        }
    };
    (0, react_2.useEffect)(() => {
        fetchSession();
    }, []);
    return { data: session, isPending, error, refetch };
}
//# sourceMappingURL=auth-client.js.map