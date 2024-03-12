import { EventSchemas, Inngest } from "inngest";

type AppUserCreated = {
    data: {
        id: string; // clerk user ID
        primary_email_address_id: string;
        email_addresses: {
            id: string;
            email_address: string;
        }[];
    };
};

type Events = {
    "clerk/user.created": AppUserCreated;
};

export const inngest = new Inngest({
    id: "ftx-vote",
    schemas: new EventSchemas().fromRecord<Events>(),
});
