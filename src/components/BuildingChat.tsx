import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import fridsonMark from "@/assets/fridson-mark.png";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SUGGESTIONS = [
  "Which floors have critical incidents right now?",
  "Summarize the boardroom roof leak.",
  "Why was the lobby tenant locked out?",
  "What thresholds are we using for noise?",
];

export function BuildingChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (err) =>
      toast.error("Chat error", { description: String(err?.message ?? err).slice(0, 160) }),
  });
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) requestAnimationFrame(() => taRef.current?.focus());
  }, [open, messages.length, status]);

  const busy = status === "submitted" || status === "streaming";

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Slide-over */}
      <aside
        role="dialog"
        aria-label="Fridson AI chat"
        className={`fixed left-0 top-0 z-50 h-screen w-full sm:w-[420px] border-r border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/10 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src={fridsonMark}
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-md"
              loading="lazy"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Ask Fridson</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Building copilot
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 grid place-items-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        </header>

        <Conversation className="flex-1 min-h-0">
          <ConversationContent className="px-3 py-3">
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={
                  <img
                    src={fridsonMark}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14"
                  />
                }
                title="Ask about Nordhavn Tower"
                description="Floors, incidents, vendors, sensor thresholds — grounded in the live dashboard snapshot."
              >
                <div className="mt-4 grid gap-1.5 w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-left text-xs rounded-md border border-border bg-background/40 hover:bg-secondary/60 px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </ConversationEmptyState>
            ) : (
              messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                if (m.role === "user") {
                  return (
                    <Message from="user" key={m.id}>
                      <MessageContent>{text}</MessageContent>
                    </Message>
                  );
                }
                return (
                  <Message from="assistant" key={m.id}>
                    <MessageContent className="bg-transparent px-0 py-0">
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })
            )}
            {status === "submitted" && (
              <div className="px-3 py-2">
                <Shimmer>Thinking…</Shimmer>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border p-3 shrink-0">
          <PromptInput onSubmit={(message) => submit(message.text ?? input)}>
            <PromptInputTextarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about floors, incidents, vendors…"
              disabled={busy}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={busy || !input.trim()} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </aside>
    </>
  );
}