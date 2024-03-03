"use server";
import { db } from "@/server/db";
import { digitalAssetPrices } from "drizzle/schema";

export const getAssets = async () => {
    const data = await db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    return data;
};