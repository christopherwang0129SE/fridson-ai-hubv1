import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { BUILDING_CONTEXT } from "@/lib/building-context";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are Fridson AI, the on-call assistant for the operations team running Nordhavn Tower. You answer questions about the building, its floors, active incidents, vendors, sensors and thresholds. Be concise, factual, and operational — short paragraphs or tight bullet lists. When a user asks something not covered by the snapshot, say so plainly instead of inventing data.

CURRENT BUILDING SNAPSHOT:
${BUILDING_CONTEXT}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});