import { inngest } from "@/lib/inngest/client";
import { generteIndustryInsights } from "@/lib/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generteIndustryInsights
  ],
});
