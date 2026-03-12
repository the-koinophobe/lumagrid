"use client";

import { WHATSAPP_URL } from "@/lib/constants";
import { useBreakpoint } from "@/lib/hooks";
import { WhatsAppIcon } from "@/components/ui";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { TrustBar, Services, HowItWorks, Locations, Faq } from "@/components/home/sections";
import Packages from "@/components/home/Packages";
import GeneratorCalculator from "@/components/home/GeneratorCalculator";
import Gallery from "@/components/home/Gallery";
import Financing from "@/components/home/Financing";
import { Testimonials, FinalCta } from "@/components/home/cta";

export default function LumaGridHome() {
  const { isMobile, isTablet, isSmall } = useBreakpoint();

  return (
    <>
      {/* Floating WhatsApp FAB */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-fab" title="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
      </a>

      <Navbar isMobile={isMobile} />
      <Hero isMobile={isMobile} isSmall={isSmall} />
      <TrustBar isMobile={isMobile} />
      <Services />
      <Packages isMobile={isMobile} isTablet={isTablet} />
      <GeneratorCalculator isMobile={isMobile} isSmall={isSmall} />
      <HowItWorks />
      <Gallery isMobile={isMobile} />
      <Financing isMobile={isMobile} />
      <Testimonials />
      <Locations />
      <Faq />
      <FinalCta isMobile={isMobile} />
      <Footer isMobile={isMobile} isSmall={isSmall} />
    </>
  );
}