"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verification = exports.account = exports.session = exports.user = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
// Auth tables for better-auth
exports.user = (0, sqlite_core_1.sqliteTable)("user", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    name: (0, sqlite_core_1.text)("name").notNull(),
    email: (0, sqlite_core_1.text)("email").notNull().unique(),
    emailVerified: (0, sqlite_core_1.integer)("email_verified", { mode: "boolean" })
        .$defaultFn(() => false)
        .notNull(),
    image: (0, sqlite_core_1.text)("image"),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});
exports.session = (0, sqlite_core_1.sqliteTable)("session", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    expiresAt: (0, sqlite_core_1.integer)("expires_at", { mode: "timestamp" }).notNull(),
    token: (0, sqlite_core_1.text)("token").notNull().unique(),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: (0, sqlite_core_1.text)("ip_address"),
    userAgent: (0, sqlite_core_1.text)("user_agent"),
    userId: (0, sqlite_core_1.text)("user_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
});
exports.account = (0, sqlite_core_1.sqliteTable)("account", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    accountId: (0, sqlite_core_1.text)("account_id").notNull(),
    providerId: (0, sqlite_core_1.text)("provider_id").notNull(),
    userId: (0, sqlite_core_1.text)("user_id")
        .notNull()
        .references(() => exports.user.id, { onDelete: "cascade" }),
    accessToken: (0, sqlite_core_1.text)("access_token"),
    refreshToken: (0, sqlite_core_1.text)("refresh_token"),
    idToken: (0, sqlite_core_1.text)("id_token"),
    accessTokenExpiresAt: (0, sqlite_core_1.integer)("access_token_expires_at", {
        mode: "timestamp",
    }),
    refreshTokenExpiresAt: (0, sqlite_core_1.integer)("refresh_token_expires_at", {
        mode: "timestamp",
    }),
    scope: (0, sqlite_core_1.text)("scope"),
    password: (0, sqlite_core_1.text)("password"),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" }).notNull(),
});
exports.verification = (0, sqlite_core_1.sqliteTable)("verification", {
    id: (0, sqlite_core_1.text)("id").primaryKey(),
    identifier: (0, sqlite_core_1.text)("identifier").notNull(),
    value: (0, sqlite_core_1.text)("value").notNull(),
    expiresAt: (0, sqlite_core_1.integer)("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
//# sourceMappingURL=schema.js.map