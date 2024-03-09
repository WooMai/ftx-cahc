import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { eq } from "drizzle-orm/expressions";
import { count, sum } from 'drizzle-orm'

import { type User, users, claimsView } from "@/server/db/schema";
import { userClaims } from "drizzle/schema";

export const userRouter = createTRPCRouter({
    userCount: publicProcedure.query(async ({ ctx }) => {
        const result: { count: number }[] = await ctx.db.select({ count: count() }).from(users);
        const result2: { count: string | null }[] = await ctx.db.select({ count: sum(claimsView.totalLatestValue) }).from(userClaims).innerJoin(claimsView, eq(userClaims.customerCode, claimsView.customerCode));
        // turn result2 into currency
        const number = parseInt(result2[0]!.count ?? '0');
        const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            // Optional: specify the number of decimal places you want
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
        return { count: result[0]!.count, value: formattedValue };
    }),
    userById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
        const result: User[] = await ctx.db.select().from(users).where(eq(users.id, input));
        return result[0];
    }),

    userCreate: publicProcedure.input(z.object({ email: z.string(), fullName: z.string() })).mutation(async ({ input, ctx }) => {
        const user = await ctx.db.insert(users).values({ ...input, role: 'user' }).returning();
        return user;
    }),
    // takes an array of userClaims
    userClaimsCreate: publicProcedure.input(z.object({ userId: z.string(), customerCode: z.string() }).array()).mutation(async ({ input, ctx }) => {
        const userClaim = await ctx.db.insert(userClaims).values(input).returning();
        return userClaim;
    }),
    // TODO return user.id and use it in the createUserClaims
    userCreateWithClaims: publicProcedure
        .input(
            z.object({
                user: z.object({
                    email: z
                        .string()
                        .email("This is not a valid email.")
                        .min(5, { message: "Email is required." }),
                    fullName: z.string()
                }),
                claims: z.object({
                    customerCode: z.string(),
                    totalPetitionValue: z.string()
                }).array()
            }))
        .mutation(async ({ input, ctx }) => {
            const userWithClaims = await ctx.db.transaction(async (trx) => {
                const [user]: User[] = await ctx.db.insert(users).values({ ...input.user, role: 'user' }).returning();
                if (!user) {
                    trx.rollback()
                    return
                }
                const insertedClaims = await ctx.db.insert(userClaims).values(input.claims.map(claim => ({ userId: user.id, ...claim }))).returning();
                return { user, insertedClaims };
            });
            return userWithClaims;
        }),
});