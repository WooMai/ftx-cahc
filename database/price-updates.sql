UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$68,871.6300000' WHERE "id"='4ac1224a-7ebd-4221-9550-6cd730f847d8' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$430.5200580' WHERE "id"='faae1155-598c-4c6e-9eb8-7e90228d57e9' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$148.2471144' WHERE "id"='5180eae9-6934-40c3-a7c2-5ccf85bb9551' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$3,949.8400000' WHERE "id"='725569ea-b1df-4d21-abbd-e15d0bb2ba99' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$0.137700000' WHERE "id"='725569ea-b1df-4d21-abbd-e15d0bb2ba99' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$1.16' WHERE "id"='c9de7730-10a3-4319-93fa-a17e87c2e4b7' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";
UPDATE "public"."digital_asset_prices" SET "snapshot_latest"='$0.62580000' WHERE "id"='e8c1e95b-859d-461b-b616-feba76ba54f2' RETURNING "id", "name", "petition_price", "type", "snapshot_latest";

REFRESH MATERIALIZED VIEW claim_assets_with_values;
REFRESH MATERIALIZED VIEW claims_totals;
