import { pgTable, unique, uuid, varchar, serial, integer, jsonb, boolean, timestamp, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

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

/**
 *  END remember to comment out before running db:push else it will DELETE ALL DATA IN THESE TABLES
 * */


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	uuid: uuid("uuid").default(sql`uuid_generate_v4()`),
	fullName: text("full_name"),
	phone: varchar("phone", { length: 256 }),
	email: varchar("email", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});