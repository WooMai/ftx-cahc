import { pgTable, unique, uuid, varchar, serial, integer, jsonb, boolean, timestamp, text, pgEnum, pgView, numeric, primaryKey, pgMaterializedView } from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"

/**
 * BEGIN remember to comment out before running db:push else it will DELETE ALL DATA IN THESE TABLES
 * 
 * EXISTING TABLES
 * These tables were in the db before setting up this project and we need them.
 * Drizzle is not responsible for handling their creation but we need to define them as models here
 * for type inference in tRPC and the api. 
 * 
 * However, defining them here causes drizzle to want to delete all content on db:push
 * 
 * */

export const digitalAssetPrices = pgTable("digital_asset_prices", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	petitionPrice: varchar("petition_price", { length: 255 }),
	type: varchar("type", { length: 255 }),
	snapshotLatest: varchar("snapshot_latest", { length: 255 }),
},
	(table) => {
		return {
			digitalAssetPricesNameKey: unique("digital_asset_prices_name_key").on(table.name),
		}
	});

export const claims = pgTable("claims", {
	id: serial("id").primaryKey().notNull(),
	customerId: integer("customer_id").references(() => customers.id),
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	contingentIndicator: jsonb("contingent_indicator"),
	tokenFiatNftBalance: jsonb("token_fiat_nft_balance"),
	earnIndicator: boolean("earn_indicator").notNull(),
	tokenFiatLend: jsonb("token_fiat_lend"),
	uuid: uuid("uuid").default(sql`uuid_generate_v4()`).notNull(),
});

export const customers = pgTable("customers", {
	id: serial("id").primaryKey().notNull(),
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	customerCategory: varchar("customer_category", { length: 255 }).notNull(),
	uuid: uuid("uuid").default(sql`uuid_generate_v4()`),
},
	(table) => {
		return {
			customersCustomerCodeKey: unique("customers_customer_code_key").on(table.customerCode),
		}
	});

/**
 *  END remember to comment out before running db:push else it will DELETE ALL DATA IN THESE TABLES
 * */

// declaring enum in database
export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable("users", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	fullName: text("full_name"),
	email: varchar("email", { length: 256 }).notNull().unique(),
	role: roleEnum('role').notNull().default('user'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	clerkId: varchar("clerk_id", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
	userClaims: many(userClaims),
}));

export const claimsRelations = relations(claims, ({ many }) => ({
	userClaims: many(userClaims),
}));

export const userClaims = pgTable("user_claims", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id),
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	totalPetitionValue: varchar("total_petition_value", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const usersToClaimsRelations = relations(userClaims, ({ one }) => ({
	claim: one(claims, {
		fields: [userClaims.customerCode],
		references: [claims.customerCode],
	}),
	user: one(users, {
		fields: [userClaims.userId],
		references: [users.id],
	}),
}));

export const claimsView = pgMaterializedView("claims_view", {
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	totalPetitionValue: numeric("total_petition_value"),
	totalPetitionValueCurrency: text("total_petition_value_currency").notNull(),
	totalLatestValue: numeric("total_latest_value"),
	totalLatestValueCurrency: text("total_latest_value_currency").notNull(),
}).existing(); // existing() tells drizzle that this view already exists in the db

export const claimAssetsView = pgMaterializedView("claim_assets_view", {
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	balance: numeric("balance").notNull(),
	usdPetition: numeric("usd_petition"),
	usdPetitionCurrency: text("usd_petition").notNull(),
	usdLatest: numeric("usd_latest"),
	usdLatestCurrency: text("usd_latest").notNull(),
}).existing(); // existing() tells drizzle that this view already exists in the db

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
export type NewUserClaim = typeof userClaims.$inferInsert; // insert type
export type Claims = typeof claims.$inferSelect; // return type when queried
