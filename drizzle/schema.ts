import { pgTable, foreignKey, pgEnum, serial, integer, varchar, jsonb, boolean, uuid, unique, timestamp, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['user', 'admin'])


export const claims = pgTable("claims", {
	id: serial("id").primaryKey().notNull(),
	customerId: integer("customer_id").references(() => customers.id),
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	contingentIndicator: jsonb("contingent_indicator"),
	tokenFiatNftBalance: jsonb("token_fiat_nft_balance"),
	earnIndicator: boolean("earn_indicator").notNull(),
	tokenFiatLend: jsonb("token_fiat_lend"),
	uuid: uuid("uuid").default(sql`uuid_generate_v4()`),
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

export const userClaims = pgTable("user_claims", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id),
	customerCode: varchar("customer_code", { length: 8 }).notNull(),
	totalPetitionValue: varchar("total_petition_value", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	fullName: text("full_name"),
	email: varchar("email", { length: 256 }).notNull(),
	role: role("role").default('user').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});