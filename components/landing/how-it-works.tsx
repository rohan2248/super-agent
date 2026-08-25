"use client";

import { WordsPullUpMultiStyle } from "@/components/landing/words-pull-up";
import { CardShell } from "@/components/landing/card-shell";

const CREAM = "#E1E0CC";

type Step = {
  number: string;
  title: string;
  body: string;
};

// Each step describes something the backend actually does — see lib/backfill.ts
// and lib/indexer.ts (step 02), lib/search.ts (03), and the needsApproval flags
// in lib/agent/tools.ts (04).
const STEPS: Step[] = [
  {
    number: "01",
    title: "Connect Gmail and Calendar.",
    body: "One Google sign-in and you're done. Vela never sees a password, and you can revoke its access from your Google account at any moment.",
  },
  {
    number: "02",
    title: "It reads your history, on your hardware.",
    body: "Every thread and event is embedded locally and indexed. Progress is tracked as it goes, and re-runs skip anything that hasn't changed.",
  },
  {
    number: "03",
    title: "Ask in plain language.",
    body: "Vector recall and full-text search are fused with reciprocal rank fusion — so you can find the thread by the invoice number, or by the argument you had in it.",
  },
  {
    number: "04",
    title: "Approve before anything leaves.",
    body: "Drafts, invites and scripted actions all stop at a signed approval gate. Vela does the work; you press send.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1920px]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream sm:text-xs">
          How it works
        </p>

        <h2 className="mt-6 text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
          <WordsPullUpMultiStyle
            className="max-w-5xl justify-start text-left"
            segments={[
              {
                text: "Four steps from a cold inbox to an agent that remembers.",
                className: "text-cream",
                breakAfter: true,
              },
              {
                text: "The longest one is the sign-in.",
                className: "text-gray-500",
              },
            ]}
          />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <CardShell
              key={step.number}
              index={i}
              className="flex h-full min-h-[280px] flex-col rounded-2xl bg-[#212121] p-5 sm:p-6"
            >
              {/* Geist Mono is loaded app-wide but unused elsewhere on the
                  landing page — it keeps these numerals from reading as a
                  repeat of the Features grid's inline counters. */}
              <span
                className="font-mono text-3xl leading-none sm:text-4xl"
                style={{ color: CREAM }}
              >
                {step.number}
              </span>

              <h3
                className="mt-6 text-base font-medium sm:text-lg"
                style={{ color: CREAM }}
              >
                {step.title}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                {step.body}
              </p>
            </CardShell>
          ))}
        </div>
      </div>
    </section>
  );
}
