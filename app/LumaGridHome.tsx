import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CalculatorSection from "@/components/home/CalculatorSection";
import { TrustBar, Services, Benefits, HowItWorks, Locations, Faq, Guides } from "@/components/home/sections";
import Packages from "@/components/home/Packages";
import Gallery from "@/components/home/Gallery";
import { Testimonials, FinalCta } from "@/components/home/cta";

/**
 * Section order puts the savings calculator directly under the hero — it is
 * the strongest conversion tool on the site, so it sits above every other
 * pitch rather than buried halfway down the page.
 */
export default function LumaGridHome() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <CalculatorSection />
      <Services />
      <Benefits />
      <Packages />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <Locations />
      <Guides />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
