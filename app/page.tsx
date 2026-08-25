import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCases } from "@/components/landing/use-cases";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  // bg-black is scoped here rather than on <body> so the rest of the app —
  // /sign-in and the workspace to come — keeps the shadcn background.
  //
  // Order is deliberate: explain the mechanism and make it concrete before
  // showing a price, then answer the objections a price raises.
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
