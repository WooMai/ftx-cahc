// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { syncUser } from "@/inngest/sync-user"; // Your own functions

// export const runtime = "edge";
// export default serve({
//     client: inngest,
//     functions: [syncUser],
//     streaming: "allow",
// });


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [syncUser],
    servePath: "/api/inngest",
});
