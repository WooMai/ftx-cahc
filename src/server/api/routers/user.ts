import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { eq } from "drizzle-orm/expressions";
import { count } from 'drizzle-orm'

import { type User, users } from "@/server/db/schema";
import { userClaims } from "drizzle/schema";

export const userRouter = createTRPCRouter({
    userCount: publicProcedure.query(async ({ ctx }) => {
        const result: { value: number }[] = await ctx.db.select({ value: count() }).from(users);
        return result[0] ? result[0].value : 0;
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