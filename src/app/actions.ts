"use server";
import { db } from "@/server/db";
import { digitalAssetPrices } from "drizzle/schema";
import { appRouter } from "@/server/api/root";
import { argv } from "process";

export const getAssets = async () => {
    const data = await db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    return data;
};
