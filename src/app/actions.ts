"use server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { digitalAssetPrices } from "drizzle/schema";
import { err } from "node_modules/inngest/types";

export const getAssets = async () => {
    const data = await db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    return data;
};

export const insertUserFromClerk = async (email: string, clerkId: string) => {
    let insertedId;
    try {
        const response = await db.insert(users).values({ email, clerkId }).returning({ insertedId: users.id });
        // response[0] could technically be undefined, but we know it's not unless someone broke something
        insertedId = response[0]?.insertedId;

    } catch (error) {
        // we handle the database validation error here
        if ((error as { code?: string }).code === '23505') {
            // expected condition so supress error and return user.id
            console.log('webhook:insert-user-from-clerk:user-already-exists', { email, clerkId });
            const already = await db.selectDistinct().from(users).where(eq(users.email, email));
            insertedId = already[0]?.id;
        } else {
            console.log("Unexpected error", error);
            // some unknown error, so let the caller handle it
            throw error;
        }
    }
    return { insertedId };
}