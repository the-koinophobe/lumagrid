export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export interface Package {
  name: string;
  label: string;
  kva: string;
  price: string;
  priceNote: string;
  color: string;
  highlight: boolean;
  badge?: string;
  appliances: string[];
  includes: string[];
  ctaMsg: string;
}

export interface GalleryItem {
  type: "rooftop" | "indoor";
  label: string;
  img: string;
}

export interface Testimonial {
  name: string;
  location: string;
  stars: number;
  text: string;
}

export interface FinancingStep {
  step: string;
  title: string;
  desc: string;
}

export interface Location {
  state: string;
  cities: string[];
  color: string;
}

export interface TrustItem {
  value: string;
  label: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface Breakpoint {
  isMobile: boolean;
  isTablet: boolean;
  isSmall: boolean;
  width: number;
}