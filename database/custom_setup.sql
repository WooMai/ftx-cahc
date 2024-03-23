-- updated_at automatically
CREATE EXTENSION IF NOT EXISTS moddatetime;
CREATE TRIGGER update_timestamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Drop existing materialized views if they exist
DROP MATERIALIZED VIEW IF EXISTS claims_view;
DROP MATERIALIZED VIEW IF EXISTS claim_assets_view;

-- Recreate the claim_assets_view with customer_category included
CREATE MATERIALIZED VIEW claim_assets_view AS
SELECT
    c.customer_code,
    cust.customer_category, -- Added customer category
    a.name,
    a.type,
    a.balance,
    CASE
        WHEN p.petition_price IS NOT NULL AND p.petition_price <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric
        ELSE NULL
    END AS usd_petition,
    COALESCE(CASE
        WHEN p.petition_price IS NOT NULL AND p.petition_price <> 'TBD' THEN
            CASE
                WHEN a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric < 0 THEN '-' || TO_CHAR(ABS(a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric), 'FM$999,999,999,990D00')
                ELSE TO_CHAR(a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric, 'FM$999,999,999,990D00')
            END
        ELSE '$0.00'
    END, '$0.00') AS usd_petition_currency,
    CASE
        WHEN p.snapshot_latest IS NOT NULL AND p.snapshot_latest <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric
        ELSE NULL
    END AS usd_latest,
    COALESCE(CASE
        WHEN p.snapshot_latest IS NOT NULL AND p.snapshot_latest <> 'TBD' THEN
            CASE
                WHEN a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric < 0 THEN '-' || TO_CHAR(ABS(a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric), 'FM$999,999,999,990D00')
                ELSE TO_CHAR(a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric, 'FM$999,999,999,990D00')
            END
        ELSE '$0.00'
    END, '$0.00') AS usd_latest_currency
FROM
    claims c
JOIN customers cust ON c.customer_code = cust.customer_code -- Join to include customer_category
CROSS JOIN LATERAL jsonb_to_recordset(c.token_fiat_nft_balance) AS a(name text, type text, balance numeric)
LEFT JOIN digital_asset_prices p ON a.name = p.name;

-- Recreate the claims_view with customer_category included, based on the updated claim_assets_view
CREATE MATERIALIZED VIEW claims_view AS
SELECT
    customer_code,
    customer_category, -- Included customer category
    SUM(usd_petition) AS total_petition_value,
    COALESCE(CASE
        WHEN SUM(usd_petition) < 0 THEN '-' || TO_CHAR(ABS(SUM(usd_petition)), 'FM$999,999,999,990D00')
        ELSE TO_CHAR(SUM(usd_petition), 'FM$999,999,999,990D00')
    END, '$0.00') AS total_petition_value_currency,
    SUM(usd_latest) AS total_latest_value,
    COALESCE(CASE
        WHEN SUM(usd_latest) < 0 THEN '-' || TO_CHAR(ABS(SUM(usd_latest)), 'FM$999,999,999,990D00')
        ELSE TO_CHAR(SUM(usd_latest), 'FM$999,999,999,990D00')
    END, '$0.00') AS total_latest_value_currency
FROM
    claim_assets_view
GROUP BY
    customer_code, customer_category;

-- Remember to refresh the materialized views to load the data
REFRESH MATERIALIZED VIEW claim_assets_view;
REFRESH MATERIALIZED VIEW claims_view;


ALTER TABLE "user_claims" 
ADD CONSTRAINT "user_claims_user_id_customer_code_unique" UNIQUE ("user_id", "customer_code");
