"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { WordsPullUpMultiStyle } from "@/components/landing/words-pull-up";
import { CARD_EASE } from "@/components/landing/card-shell";

type UseCase = {
  scenario: string;
  resolution: string;
};

const USE_CASES: UseCase[] = [
  {
    scenario: "The invoice from the vendor whose name you've forgotten.",
    resolution:
      "Describe what you remember instead of guessing at search operators. Semantic recall runs over everything Vela has indexed, so the thread surfaces from the shape of it — the amount, the argument, the month.",
  },
  {
    scenario: "Six people, three timezones, one hour that works.",
    resolution:
      "Vela reads freebusy across the calendars it can see, proposes slots that are genuinely open, then creates the event and delivers the invites — once you've approved the one you want.",
  },
  {
    scenario:
      "The thing you promised three weeks ago and haven't thought about since.",
    resolution:
      "Every commitment is indexed the moment it lands. Ask what you owe people this week and Vela reads back the sentence you wrote, in the thread you wrote it in.",
  },
];

/** Rows fade up in sequence as the panel enters, matching the card grids' feel. */
function UseCaseRow({ item, index }: { item: UseCase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: CARD_EASE }}
      className="grid grid-cols-1 gap-4 border-t border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-10"
    >
      <p className="font-serif text-xl italic leading-snug text-cream md:col-span-5 md:text-2xl lg:text-3xl">
        {item.scenario}
      </p>
      <p className="text-xs leading-relaxed text-gray-400 md:col-span-7 md:text-sm lg:text-base">
        {item.resolution}
      </p>
    </motion.div>
  );
}

export function UseCases() {
  return (
    <section id="use-cases" className="bg-black px-4 py-20 md:px-6 md:py-28">
      {/* Recessed panel, same treatment as About — the change of surface keeps
          two card grids from running into each other. */}
      <div className="mx-auto w-full max-w-[1920px] rounded-2xl bg-[#101010] px-6 py-16 sm:px-10 md:rounded-[2rem] md:py-24">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream sm:text-xs">
          Built for
        </p>

        <h2 className="mt-6 text-2xl font-normal leading-[0.95] sm:text-3xl md:text-4xl lg:text-5xl">
          <WordsPullUpMultiStyle
            className="max-w-4xl justify-start text-left"
            segments={[
              { text: "The work you'd never", className: "text-cream" },
              { text: "delegate to a filter.", className: "font-serif italic text-cream" },
            ]}
          />
        </h2>

        <div className="mt-12 md:mt-16">
          {USE_CASES.map((item, i) => (
            <UseCaseRow key={item.scenario} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
