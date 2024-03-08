import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { digitalAssetPrices, userClaims } from "drizzle/schema";

import { auth } from '@clerk/nextjs';
import { eq } from "drizzle-orm";
import { batchSearch } from "@/server/api/search";
import { claims } from "@/server/db/schema";

export const claimRouter = createTRPCRouter({

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.claims.findFirst({
            orderBy: (claims, { desc }) => [desc(claims.id)],
        });
    }),

    getClaimsForUserWithId: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ input, ctx }) => {
        // const result = await ctx.db.query.userClaims.findMany({
        //     where: eq(userClaims.userId, input.userId),
        // })
        // const customerCodeResults = result.map((r) => r.customerCode);

        // results;

        const results = await ctx.db.select().from(claims)
            .innerJoin(userClaims, eq(claims.customerCode, userClaims.customerCode))
            .where(eq(userClaims.userId, input.userId));
        return results


    }),

    // getOwnClaims: publicProcedure.query(async ({ ctx, input }) => {
    //     const { user, getToken } = auth();
    //     return await ctx.db.select().from(userClaims).where(eq(userClaims.userId, user?.unsafeMetadata.external_id));
    //     // return await ctx.db.query.userClaims.findMany({
    //     //     where: {
    //     //         "user_id": user?.unsafeMetadata.external_id,
    //     //     },
    //     // })
    // }),

    getAllAssets: publicProcedure.query(({ ctx }) => {
        return ctx.db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    }),
});