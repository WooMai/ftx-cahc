import { insertUserFromClerk } from "@/app/actions";
import { inngest } from "@/inngest/client";
// import { api } from "@/trpc/server";

export const syncUser =
    inngest.createFunction(
        { id: 'sync-user-from-clerk' },  // ←The 'id' is an arbitrary string used to identify the function in the dashboard
        { event: 'clerk/user.created' }, // ← This is the function's triggering event
        async ({ event }) => {
            console.log('webhook:sync-user-from-clerk', event.data)
            const user = event.data; // The event payload's data will be the Clerk User json object
            const { id } = user;
            if (typeof user.email_addresses === 'undefined' || user.email_addresses.length === 0) {
                console.log('webhook:sync-user-from-clerk:no-email-addresses', { id });
                return; // If the user has no email addresses, we can't sync them
            }
            const email = user.email_addresses.find((e) =>
                e.id === user.primary_email_address_id
            )?.email_address;
            if (!email) {
                console.log('webhook:sync-user-from-clerk:email-not-found', { id });
                return; // If the user's primary email address is not found, we can't sync them
            }
            await insertUserFromClerk(email);
            // await api.user.userCreate({ email, fullName: undefined });
        }
    );
