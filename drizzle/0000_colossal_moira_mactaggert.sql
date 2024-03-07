-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"customer_code" varchar(8) NOT NULL,
	"contingent_indicator" jsonb,
	"token_fiat_nft_balance" jsonb,
	"earn_indicator" boolean NOT NULL,
	"token_fiat_lend" jsonb,
	"uuid" uuid DEFAULT uuid_generate_v4()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_code" varchar(8) NOT NULL,
	"customer_category" varchar(255) NOT NULL,
	"uuid" uuid DEFAULT uuid_generate_v4(),
	CONSTRAINT "customers_customer_code_key" UNIQUE("customer_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "digital_asset_prices" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255),
	"petition_price" varchar(255),
	"type" varchar(255),
	"snapshot_latest" varchar(255),
	CONSTRAINT "digital_asset_prices_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_claims" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"customer_code" varchar(8) NOT NULL,
	"total_petition_value" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"full_name" text,
	"email" varchar(256) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "claims" ADD CONSTRAINT "claims_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_claims" ADD CONSTRAINT "user_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/