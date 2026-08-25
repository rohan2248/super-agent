"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { WordsPullUpMultiStyle } from "@/components/landing/words-pull-up";

const CREAM = "#E1E0CC";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type QA = {
  question: string;
  answer: string;
};

const FAQS: QA[] = [
  {
    question: "What actually leaves my machine?",
    // Deliberately precise. The landing copy's "nothing leaves your machine"
    // is a claim about the index, not about inference — lib/embeddings.ts runs
    // MiniLM locally, but the agent itself is a Claude call. Saying otherwise
    // here would be false.
    answer:
      "Your index doesn't. Embeddings are computed on your own hardware with a local MiniLM model, so your mail is never handed to an embedding provider, and the vectors stay in your database. Reasoning is different: Vela's agent runs on Claude, so the message content it needs to answer a given question is sent to the model for that request. Search, ranking and storage are local; the thinking is not.",
  },
  {
    question: "Can Vela send mail without asking me?",
    answer:
      "No. Sending mail, creating calendar events and running scripted actions are all gated behind an approval step, and each approval is cryptographically signed — so nothing can forge one on your behalf. Vela writes the draft and picks the slot. The last click is always yours.",
  },
  {
    question: "Do you need my Gmail password?",
    answer:
      "Never. Vela connects through Google's OAuth flow, so your password is only ever entered on Google's own screens. You can review or revoke Vela's access from your Google account settings at any time, and it stops immediately.",
  },
  {
    question: "How far back does it index?",
    answer:
      "As far back as you have mail. Vela backfills your mailbox and tracks its own progress, so a large history picks up where it left off rather than starting over. Messages are hashed by content, which means re-running the index skips everything that hasn't changed.",
  },
  {
    question: "How fast does it see new mail?",
    answer:
      "Effectively immediately. Vela subscribes to Google's push notifications for both Gmail and Calendar, so new messages and events are ingested as they arrive and streamed straight into the open workspace. Those subscriptions expire every seven days and renew themselves on a schedule.",
  },
  {
    question: "Can my teammates see my inbox?",
    answer:
      "No. Every tool Vela can call is bound to a single tenant when it's constructed — none of them accept a user ID as an argument at all. There is no code path where a request for your data can be pointed at someone else's, even by mistake.",
  },
];

function FaqItem({
  item,
  isOpen,
  onToggle,
  panelId,
}: {
  item: QA;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        <span
          className="text-sm font-medium transition-opacity group-hover:opacity-70 sm:text-base md:text-lg"
          style={{ color: CREAM }}
        >
          {item.question}
        </span>
        <Plus
          aria-hidden="true"
          className={`mt-0.5 size-4 shrink-0 text-cream transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-10 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="bg-black px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Heading holds its position while the answers expand beside it. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-16">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cream sm:text-xs">
              Questions
            </p>

            <h2 className="mt-6 text-2xl font-normal leading-[0.95] sm:text-3xl md:text-4xl">
              <WordsPullUpMultiStyle
                className="justify-start text-left"
                segments={[
                  { text: "The things worth asking", className: "text-cream" },
                  {
                    text: "before you hand over an inbox.",
                    className: "font-serif italic text-cream",
                  },
                ]}
              />
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              panelId={`${baseId}-panel-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
