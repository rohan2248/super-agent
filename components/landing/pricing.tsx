"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WordsPullUpMultiStyle } from "@/components/landing/words-pull-up";
import { CardShell } from "@/components/landing/card-shell";
import { cn } from "@/lib/utils";

const CREAM = "#E1E0CC";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type BillingPeriod = "monthly" | "annual";

type Tier = {
  name: string;
  pitch: string;
  /** Price shown per billing period. `null` means the tier is free in both. */
  price: Record<BillingPeriod, string>;
  /** Sits under the price — the unit, and the annual billing note. */
  unit: Record<BillingPeriod, string>;
  features: string[];
  cta: string;
  featured?: boolean;
};

// NOTE: these tiers are presentation only. There is no Plan/Subscription model,
// no payment provider and no quota enforcement anywhere in the app yet — a Free
// account today gets the full feature set. Wire up real limits before charging.
const TIERS: Tier[] = [
  {
    name: "Free",
    pitch: "See if it remembers what you don't.",
    price: { monthly: "$0", annual: "$0" },
    unit: { monthly: "forever", annual: "forever" },
    features: [
      "1 connected inbox",
      "30 days of recall",
      "Embeddings run locally",
      "Ask anything, in plain language",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    pitch: "The whole agent, one inbox.",
    price: { monthly: "$20", annual: "$16" },
    unit: { monthly: "per month", annual: "per month, billed annually" },
    features: [
      "Everything in Free",
      "Unlimited semantic recall",
      "Full mailbox backfill",
      "Calendar Command — freebusy, slots, invites",
      "Realtime re-indexing as mail lands",
      "Approval gate on every send",
    ],
    cta: "Connect your inbox",
    featured: true,
  },
  {
    name: "Team",
    pitch: "One agent, one shared memory.",
    price: { monthly: "$40", annual: "$32" },
    unit: {
      monthly: "per user, per month",
      annual: "per user, billed annually",
    },
    features: [
      "Everything in Pro",
      "Shared threads and workspace",
      "Per-seat tenant isolation",
      "Admin roles and an audit of approvals",
      "Priority support",
    ],
    cta: "Get started",
  },
];

const PERIODS: { value: BillingPeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

/**
 * Segmented monthly/annual switch.
 *
 * Hand-rolled rather than pulled from shadcn — the registry's `switch` is a
 * two-state toggle with no room for labels, and this needs to read as two
 * choices. The cream pill is a shared-layout element, so it slides between
 * options instead of cross-fading.
 */
function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod;
  onChange: (next: BillingPeriod) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="relative inline-flex rounded-full bg-[#212121] p-1"
      >
        {PERIODS.map((option) => {
          const isActive = option.value === period;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-xs transition-colors duration-200 sm:text-sm",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream",
                isActive ? "text-black" : "text-gray-400 hover:text-cream",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="billing-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: CREAM }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          );
        })}
      </div>

      <span className="rounded-full border border-cream/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-cream">
        Save 20%
      </span>
    </div>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="relative overflow-hidden bg-black px-4 py-20 md:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto w-full max-w-[1920px]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream sm:text-xs">
          Pricing
        </p>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-2xl font-normal leading-[0.95] sm:text-3xl md:text-4xl lg:text-5xl">
            <WordsPullUpMultiStyle
              className="max-w-3xl justify-start text-left"
              segments={[
                { text: "Priced per person,", className: "text-cream" },
                {
                  text: "not per query.",
                  className: "font-serif italic text-cream",
                  breakAfter: true,
                },
                {
                  text: "Your embeddings run locally, so there's no usage meter to watch.",
                  className: "text-gray-500",
                },
              ]}
            />
          </h2>

          <BillingToggle period={period} onChange={setPeriod} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-2">
          {TIERS.map((tier, i) => (
            <CardShell
              key={tier.name}
              index={i}
              className={cn(
                "relative flex h-full flex-col rounded-2xl bg-[#212121] p-6 sm:p-8",
                // The featured tier is marked with a border rather than a
                // scale-up, which would break the flat grid the rest of the
                // page keeps.
                tier.featured && "border border-cream/20",
              )}
            >
              {tier.featured && (
                <span className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.2em] text-cream sm:right-8 sm:top-8">
                  Most popular
                </span>
              )}

              <h3 className="text-base font-medium sm:text-lg" style={{ color: CREAM }}>
                {tier.name}
              </h3>
              <p className="mt-2 text-xs text-gray-400 sm:text-sm">{tier.pitch}</p>

              <div className="mt-8 flex items-baseline gap-2">
                {/* Keyed on the period so the figure animates rather than
                    silently swapping under the cursor. */}
                <motion.span
                  key={`${tier.name}-${period}`}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="text-4xl leading-none sm:text-5xl"
                  style={{ color: CREAM }}
                >
                  {tier.price[period]}
                </motion.span>
              </div>
              <p className="mt-2 text-xs text-gray-500">{tier.unit[period]}</p>

              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-cream" />
                    <span className="text-xs leading-snug text-gray-400 sm:text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Every tier lands on /sign-in — it's the only entry point the
                  app has, and there's no sales address to point Team at yet. */}
              <div className="mt-auto pt-10">
                {tier.featured ? (
                  <Button
                    variant="ghost"
                    size="lg"
                    nativeButton={false}
                    className="group h-auto w-full justify-between gap-2 rounded-full bg-cream py-1.5 pl-6 pr-1.5 text-sm font-medium text-black hover:bg-cream sm:text-base"
                    render={<Link href="/sign-in" />}
                  >
                    {tier.cta}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                      <ArrowRight className="size-4 sm:size-[18px]" style={{ color: CREAM }} />
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    nativeButton={false}
                    className="h-auto w-full rounded-full border border-cream/25 py-3 text-sm font-medium text-cream hover:bg-cream/10 hover:text-cream sm:text-base"
                    render={<Link href="/sign-in" />}
                  >
                    {tier.cta}
                  </Button>
                )}
              </div>
            </CardShell>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-500">
          Every plan runs embeddings locally. Nothing is sent without your approval.
        </p>
      </div>
    </section>
  );
}
