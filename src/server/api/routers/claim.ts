import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { digitalAssetPrices, userClaims } from "drizzle/schema";

import { eq, sql } from "drizzle-orm";
import { json } from "drizzle-orm/pg-core";

import { claimAssetsView, claims, claimsView } from "@/server/db/schema";
import { IClaimsResponse } from "@/app/models/Claim.model";

export const claimRouter = createTRPCRouter({

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.claims.findFirst({
            orderBy: (claims, { desc }) => [desc(claims.id)],
        });
    }),

    getClaimsForUserWithId: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ input, ctx }) => {

        // const results = await ctx.db.select().from(claims)
        //     .innerJoin(userClaims, eq(claims.customerCode, userClaims.customerCode))
        //     .where(eq(userClaims.userId, input.userId));
        // return results

        return await ctx.db.select({
            id: claims.uuid, // Fix: Ensure id is of type string
            customerCode: claims.customerCode,
            contingentIndicator: claims.contingentIndicator,
            earnIndicator: claims.earnIndicator,
            totalPetitionValueCurrency: claimsView.totalPetitionValueCurrency,
            totalLatestValueCurrency: claimsView.totalLatestValueCurrency,
            assets: sql<typeof json>`json_agg(${claimAssetsView})`.as('assets'),
        }).from(userClaims)
            .innerJoin(claims, eq(userClaims.customerCode, claims.customerCode))
            .innerJoin(claimsView, eq(claimsView.customerCode, claims.customerCode))
            .leftJoin(claimAssetsView, eq(claims.customerCode, claimAssetsView.customerCode))
            .where(eq(userClaims.userId, input.userId))
            .groupBy(
                claims.id,
                claims.customerCode,
                claims.contingentIndicator,
                claims.earnIndicator,
                claimsView.totalPetitionValueCurrency,
                claimsView.totalLatestValueCurrency,
            );

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
