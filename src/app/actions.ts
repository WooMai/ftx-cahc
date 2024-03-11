"use server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { digitalAssetPrices } from "drizzle/schema";

export const getAssets = async () => {
    const data = await db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    return data;
};

export const insertUserFromClerk = async (email: string) => {
    console.log('gonna insert user', { email })
    await db.insert(users).values({ email }).returning({ insertedId: users.id });
}