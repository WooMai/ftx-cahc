import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { digitalAssetPrices } from "drizzle/schema";

export const claimRouter = createTRPCRouter({

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.claims.findFirst({
            orderBy: (claims, { desc }) => [desc(claims.id)],
        });
    }),

    getAllAssets: publicProcedure.query(({ ctx }) => {
        return ctx.db.selectDistinct({ name: digitalAssetPrices.name }).from(digitalAssetPrices).orderBy(digitalAssetPrices.name);
    }),
});