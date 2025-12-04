"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
exports.getCurrentUser = getCurrentUser;
const better_auth_1 = require("better-auth");
const drizzle_1 = require("better-auth/adapters/drizzle");
const plugins_1 = require("better-auth/plugins");
const server_1 = require("next/server");
const headers_1 = require("next/headers");
const db_1 = require("@/db");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, drizzle_1.drizzleAdapter)(db_1.db, {
        provider: "sqlite",
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [(0, plugins_1.bearer)()]
});
// Session validation helper
async function getCurrentUser(request) {
    const session = await exports.auth.api.getSession({ headers: await (0, headers_1.headers)() });
    return session?.user || null;
}
//# sourceMappingURL=auth.js.map