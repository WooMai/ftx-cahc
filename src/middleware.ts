import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "zh"];


const intlMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: "en",
});


export default authMiddleware({
    beforeAuth: (req) => {

        const { pathname } = req.nextUrl;

        const shouldHandle = pathname === '/'
            || pathname.startsWith('/find')
            || pathname.startsWith('/dashboard')
            || pathname.startsWith('/verification')
            || new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(req.nextUrl.pathname);
        if (!shouldHandle) return;

        // Execute next-intl middleware before Clerk's auth middleware
        return intlMiddleware(req);
    },


    // Routes that can be accessed while signed out
    publicRoutes: ['/:locale', '/:locale/find',
        '/api/trpc/user.userCreateWithClaims',
        '/api/trpc/user.userCount',
        '/api/trpc/claim.getTotalMemberClaimValue',
        '/api/inngest',
        '/:locale/verification',],
    // Routes that can always be accessed, and have
    // no authentication information
    ignoredRoutes: [],
    afterAuth(auth, req) {
        // When using afterAuth, the checks must handle all cases — a custom afterAuth completely overrides the default behavior covered earlier, aside from adding sign-in and sign-up to publicRoutes. afterAuth does not allow you to add just one check and rely on the default behavior otherwise

        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url }) as NextResponse;
        }
        // Redirect signed in users to organization selection page if they are not active in an organization
        // if (
        //     auth.userId &&
        //     !auth.orgId &&
        //     req.nextUrl.pathname !== "/org-selection"
        // ) {
        //     const orgSelection = new URL("/org-selection", req.url);
        //     return NextResponse.redirect(orgSelection);
        // }

        if (auth.userId && req.nextUrl.pathname === "/:locale/find") {
            return NextResponse.rewrite(new URL('/:locale/dashboard/find-claims', req.url))
        }

        // If the user is signed in and trying to access a protected route, allow them to access route
        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next();
        }
        // Allow users visiting public routes to access them
        return NextResponse.next();
    },
});

export const config = {
    // Protects all routes, including api/trpc.
    // See https://clerk.com/docs/references/nextjs/auth-middleware
    // for more information about configuring your Middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

