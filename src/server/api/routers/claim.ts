import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const claimRouter = createTRPCRouter({

    getLatest: publicProcedure.query(({ ctx }) => {
        return ctx.db.query.claims.findFirst({
            orderBy: (claims, { desc }) => [desc(claims.id)],
        });
    }),
});
