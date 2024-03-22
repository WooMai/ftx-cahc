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




CREATE table claim_updates (
  claim_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL
);

INSERT INTO claim_updates (claim_id, new_user_id)
WITH ranked_users AS (
  SELECT
    id,
    email,
    clerk_id,
    ROW_NUMBER() OVER(PARTITION BY LOWER(email) ORDER BY (CASE WHEN clerk_id IS NOT NULL THEN 0 ELSE 1 END), created_at ASC) AS rank
  FROM users
),
to_keep AS (
  SELECT id, email FROM ranked_users WHERE rank = 1
),
to_update_or_delete AS (
  SELECT 
    r.id AS user_id, 
    r.email AS current_email, 
    r.clerk_id, 
    r.rank, 
    k.id AS keep_user_id, 
    k.email AS keep_email
  FROM ranked_users r
  JOIN to_keep k ON LOWER(r.email) = LOWER(k.email)
  WHERE r.rank > 1
),
claims_info AS (
  SELECT 
    uc.user_id, 
    uc.id AS claim_id, 
    tud.keep_user_id, 
    tud.rank, 
    tud.current_email, 
    tud.keep_email, 
    tud.clerk_id,
    CASE 
      WHEN tud.rank = 1 THEN 'Keep' 
      ELSE 'Update' 
    END AS user_claim_action,
    CASE 
      WHEN tud.rank > 1 THEN 'Update to ' || tud.keep_user_id 
      ELSE NULL 
    END AS claim_update_info
  FROM user_claims uc
  JOIN to_update_or_delete tud ON uc.user_id = tud.user_id
)
-- SELECT 
--   ci.claim_id, 
--   ci.keep_user_id
-- FROM claims_info ci
-- WHERE ci.user_claim_action = 'Update';

-- Optional: Query to verify the data in claim_updates table
SELECT * FROM claim_updates;
