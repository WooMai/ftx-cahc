# ftxvote.com

This is the application powering [ftxvote.com](https://ftxvote.com). Your contributions are very welcome, take a look at the [Contributing PRs](https://github.com/arush/ftx-cahc?tab=readme-ov-file#contributing-prs) for how.

## Discord

We have a discord for developers and customer support. Please join our [Discord](https://discord.gg/RfYm9S8g).
We also have a [Telegram group](https://t.me/ftxcoalition) with over 3000 people.

## What technologies are used

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js](https://nextjs.org) - App Router
- [Clerk](https://clerk.com)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

We run postgres and the nextjs server on Railway, Customer.io for emails, Posthog for analytics.

## How do I develop on this locally?

First set up a new postgres database locally. You can either run `start_database.sh` to run a db in docker, but that can be slow and resource intensive. I prefer to [install postgres](https://www.postgresql.org/download/) and `psql` directly into it without docker.

### Setup local database without docker

You can use `psql` like this. Make sure to replace with your postgres username that has permissions to createdb.

Login

```
psql -h hostname -d databasename -U username -p portnumber
```

Create the database if you haven't already

```
createdb -U username ftx
```

Run the sql in the following two files in this order

1. Setup (uncomment and run the file) - https://github.com/arush/ftx-cahc/blob/main/drizzle/0000_numerous_serpent_society.sql
2. Additional mandatory setup - https://github.com/arush/ftx-cahc/blob/main/database/custom_setup.sql

You can do this with `psql` as follows:

Login

```
psql -h hostname -d databasename -U username -p portnumber
```

```
\i /path/to/your/file.sql
```

### Import static data

I have produced 3 tables by scraping the FTX Kroll docket, `claims`, `customers` and `digital_asset_prices`. Go to [discord](https://discord.gg/RfYm9S8g) and in the #dev channel find someone to send you the sql to import. It's about 220MB compressed. You can import with `psql` as follows:

```
psql -U username -d target_database_name -f db_dump.sql
```

### Load data into materialized views

We use postgres materialized views for easy access to processed data. Once you've loaded the above static data, log in with `psql` again and run the following to process it into views:

```
-- you must refresh the views any time there is a change to the claims, customers or digital_asset_prices tables

REFRESH MATERIALIZED VIEW claim_assets_view;
REFRESH MATERIALIZED VIEW claims_view;
```

### Setup local `.env` file

In the root of this project run the following to create an env file.

```
touch .env
```

Paste the following into .env and find someone on discord to give you the `CLERK_TEST_SECRET`

```
# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.

# Example:
# SERVERVAR="foo"
# NEXT_PUBLIC_CLIENTVAR="bar"

# Drizzle
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"
CLAIMS_API_HOST="fastapi-production-c0c6.up.railway.app"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cmVuZXdlZC1tb2xlLTU1LmNsZXJrLmFjY291bnRzLmRldiQ"
CLERK_SECRET_KEY="CLERK_TEST_SECRET"

NEXT_PUBLIC_DOMAIN="localhost:3000"

NEXT_PUBLIC_POSTHOG_KEY="NO_DEV_KEY"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.posthog.com"

```

### Install deps

```
bun install
```

### Run development server

```
bun run dev
```

## Contributing PRs

Contributions are very welcome. Take a look at the [open issues](https://github.com/arush/ftx-cahc/issues)

1. Please lint before submitting PRs for review, `bun run lint` and ensure there are no errors, else production deploys will fail.
1. Remove comments from your code unless they are really helpful
1. Only tag one reviewer, else it is likely nobody will review it
1. Ping the reviewer on discord

Thanks!
