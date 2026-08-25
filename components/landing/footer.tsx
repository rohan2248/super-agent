import Link from "next/link";

const CREAM = "#E1E0CC";

// Anchors and /sign-in only. There is no /privacy, /terms or /about route in
// this app — linking to them would 404.
const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Capabilities", href: "#features" },
  { label: "Built for", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Sign in", href: "/sign-in" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            {/* Static wordmark — the pull-up animation is the hero's signature
                and shouldn't be repeated down here. */}
            <span
              className="text-3xl font-medium leading-none tracking-[-0.04em] sm:text-4xl"
              style={{ color: CREAM }}
            >
              Vela
              <span className="relative inline-block">
                <span aria-hidden="true" className="absolute top-[0.15em] text-[0.31em]">
                  *
                </span>
              </span>
            </span>
            <p className="mt-4 max-w-xs text-xs text-gray-400 sm:text-sm">
              An agent for your inbox and calendar.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition-colors hover:text-cream sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>© {new Date().getFullYear()} Vela</p>
          {/* Resolves the asterisk the hero wordmark hangs and never explains. */}
          <p>*Nothing sends without your say-so.</p>
        </div>
      </div>
    </footer>
  );
}
