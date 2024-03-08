-- updated_at automatically
CREATE EXTENSION IF NOT EXISTS moddatetime;
CREATE TRIGGER update_timestamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);


-- spread jsonb to materialized view and add prices
CREATE MATERIALIZED VIEW claim_assets_view AS
SELECT
    c.customer_code,
    a.name,
    a.type,
    a.balance,
    CASE
        WHEN p.petition_price IS NOT NULL AND p.petition_price <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric
        ELSE NULL
    END AS usd_petition,
    COALESCE(TO_CHAR(CASE
        WHEN p.petition_price IS NOT NULL AND p.petition_price <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.petition_price, '[^\d.]', '', 'g')::numeric
        ELSE 0
    END, 'FM$999,999,999,990D00'), '$0.00') AS usd_petition_currency,
    CASE
        WHEN p.snapshot_latest IS NOT NULL AND p.snapshot_latest <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric
        ELSE NULL
    END AS usd_latest,
    COALESCE(TO_CHAR(CASE
        WHEN p.snapshot_latest IS NOT NULL AND p.snapshot_latest <> 'TBD' THEN a.balance * REGEXP_REPLACE(p.snapshot_latest, '[^\d.]', '', 'g')::numeric
        ELSE 0
    END, 'FM$999,999,999,990D00'), '$0.00') AS usd_latest_currency
FROM
    claims c
CROSS JOIN LATERAL jsonb_to_recordset(c.token_fiat_nft_balance) AS a(name text, type text, balance numeric)
LEFT JOIN digital_asset_prices p ON a.name = p.name
WHERE a.balance > 0;



-- add prices to claims view
CREATE MATERIALIZED VIEW claims_view AS
SELECT
    customer_code,
    SUM(usd_petition) AS total_petition_value,
    COALESCE(TO_CHAR(SUM(usd_petition), 'FM$999,999,999,990D00'), '$0.00') AS total_petition_value_currency,
    SUM(usd_latest) AS total_latest_value,
    COALESCE(TO_CHAR(SUM(usd_latest), 'FM$999,999,999,990D00'), '$0.00') AS total_latest_value_currency
FROM
    claim_assets_view
GROUP BY
    customer_code;



ALTER TABLE "user_claims" 
ADD CONSTRAINT "user_claims_user_id_customer_code_unique" UNIQUE ("user_id", "customer_code");



REFRESH MATERIALIZED VIEW claim_assets_view;
REFRESH MATERIALIZED VIEW claims_view;
