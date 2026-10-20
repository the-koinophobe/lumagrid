import type { City } from "./cities";

/** Content for the three state landing pages (/locations/[state]). */

export interface StateArea { name: string; desc: string }
export interface StateWhy { title: string; body: string }
export interface StateFaq { q: string; a: string }

export interface StatePageData {
  key: City["state"];
  slug: "rivers" | "delta" | "bayelsa";
  label: string;
  mainTown: string;
  disco: string;
  lgas: number;
  heroTitle: string;
  heroLead: string;
  heroImage: string;
  whyLead: string;
  why: StateWhy[];
  areasLead: string;
  areas: StateArea[];
  faqs: StateFaq[];
}

const costFaq = (town: string): StateFaq => ({
  q: `How much does a solar system cost in ${town}?`,
  a: "A 3kVA starter system with a 5kWh lithium battery and four panels starts from about ₦2.8M installed, and a 6kVA family system with 16kWh of lithium storage starts from about ₦4.9M. Your final quote depends on your load and roof, and is itemised line by line after a free site assessment.",
});
const upstairsFaq = (state: string): StateFaq => ({
  q: `Can you install solar panels on an upstairs (storey) building in ${state}?`,
  a: "Yes. We install on bungalows, duplexes, storey buildings and blocks of flats. On an upstairs building we plan safe roof access, fix the panels to the roof structure, and run the cables neatly to an inverter room on whichever floor suits you. For shared roofs we confirm access with the landlord first.",
});

export const STATES: Record<StatePageData["slug"], StatePageData> = {
  rivers: {
    key: "Rivers", slug: "rivers", label: "Rivers State", mainTown: "Port Harcourt", disco: "PHED", lgas: 23,
    heroTitle: "Solar Installation in Port Harcourt & Rivers State",
    heroLead: "Port Harcourt is our home base. We install hybrid solar systems with lithium batteries across all 23 LGAs of Rivers State, from GRA and Woji to Bonny Island, Okrika and Omoku.",
    heroImage: "/images/real/solar-panels-on-the-roof.jpeg",
    whyLead: "PHED supply in Rivers State remains among the most unreliable in the South-South. Many homes and businesses run generators for most of the day. Solar changes that permanently.",
    why: [
      { title: "Strong solar resource", body: "Port Harcourt averages roughly 4.5 peak sun hours a day across the year. We size for the rainy-season low, so your system keeps up from April to October." },
      { title: "Rising fuel costs", body: "A household running a generator most of the day can spend ₦80,000 to ₦150,000 a month on fuel. Solar removes that recurring cost." },
      { title: "Riverine areas without grid", body: "Communities in Bonny, Degema, Okrika and the Kalabari creeks have never had reliable grid power. Solar is not a supplement here. It is the grid." },
      { title: "Industrial and commercial loads", body: "Trans-Amadi, Eleme, Onne and Oyigbo host energy-hungry businesses. We design hybrid systems that match real commercial loads." },
      { title: "No more soot and noise", body: "Port Harcourt already battles soot. Solar ends your contribution to it and gives you silent, clean power day and night." },
      { title: "Higher property value", body: "Homes and flats with solar in Obio-Akpor, GRA and Woji let faster and can command higher rents." },
    ],
    areasLead: "We cover all 23 LGAs in Rivers State. These are the areas we work in most. Not listed? Message us; we likely cover it.",
    areas: [
      { name: "GRA Phase 1, 2 & 3", desc: "Duplexes and estates with heavy loads and long outages" },
      { name: "Rumuola / Rumuibekwe", desc: "Fast-growing suburb off Aba Road" },
      { name: "Mgbuoba / Ada George", desc: "Dense residential corridor with rising solar adoption" },
      { name: "D-Line / Elekahia", desc: "Mid-city neighbourhoods where fuel costs bite hardest" },
      { name: "Woji / Trans-Amadi", desc: "Industrial and mixed-use zone, ideal for business solar" },
      { name: "Peter Odili Road", desc: "Offices, estates and businesses that need steady power" },
      { name: "Obio-Akpor (Rumuokoro, Rumuodara, Choba)", desc: "The most populated LGA, with lodges and new estates" },
      { name: "Bonny Island", desc: "Off-grid systems with boat logistics and marine-grade parts" },
      { name: "Eleme / Onne / Oyigbo", desc: "Refinery, port and industrial communities" },
      { name: "Okrika / Ogu / Bolo", desc: "Riverine communities where the grid is unreliable by geography" },
      { name: "Ahoada / Omoku", desc: "Upland towns along the East–West Road" },
      { name: "Degema / Abonnema", desc: "Kalabari communities that depend on generators" },
    ],
    faqs: [
      costFaq("Port Harcourt"),
      upstairsFaq("Rivers State"),
      { q: "How long does a solar installation take in Port Harcourt?", a: "Most homes in Port Harcourt are installed in 1 to 2 days. Commercial projects in areas like Trans-Amadi or Eleme may take 3 to 5 days depending on size." },
      { q: "Will solar work during the rainy season in Rivers State?", a: "Yes. Panels produce power under cloud at reduced output, and we size every system for rainy-season sunshine with enough lithium battery to cover low-sun days. A hybrid inverter can also top up from PHED or a generator." },
      { q: "Do you install in Bonny, Okrika or Degema?", a: "Yes. We cover all of Rivers State including riverine and island communities. Boat transport is planned in advance and shown on your quote." },
      { q: "Can solar replace my generator completely?", a: "For most homes and small businesses, yes. A properly sized solar and lithium system handles everyday loads, and many customers keep the generator only as a backup for long cloudy spells." },
    ],
  },
  delta: {
    key: "Delta", slug: "delta", label: "Delta State", mainTown: "Warri", disco: "BEDC", lgas: 25,
    heroTitle: "Solar Installation in Warri, Asaba & Delta State",
    heroLead: "From Asaba by the Niger to Warri, Sapele and the creeks of Burutu, we install hybrid solar systems with lithium batteries for homes, businesses, cold rooms and off-grid communities across Delta State.",
    heroImage: "/images/real/5kwh-6Kva-system-abraka.jpeg",
    whyLead: "Delta is one of Nigeria's richest states by oil revenue, yet many homes in Warri, Ughelli and Asaba see only a few hours of BEDC supply a day. Solar is not a luxury here. It is common sense.",
    why: [
      { title: "Oil money, no light", body: "Grid supply in much of Warri and Effurun is a few hours a day at best. Solar ends that contradiction for your home or business." },
      { title: "Riverine communities without grid", body: "Bomadi, Patani, Burutu and Forcados communities have never had steady grid power. Solar with lithium storage is the practical answer." },
      { title: "Asaba is booming", body: "New estates are going up fast in Asaba and Okpanam. Building with solar from day one costs less than adding it later." },
      { title: "Unstable transmission", body: "Faults and vandalism on transmission lines mean scheduled supply often does not arrive. Solar removes that dependency." },
      { title: "Commercial and industrial belt", body: "Sapele, Ughelli and the Warri industrial corridor need reliable power. We design systems that match real business loads." },
      { title: "Diesel is bleeding businesses dry", body: "Businesses burning 15 to 30 litres of diesel a day can lose hundreds of thousands of naira a month. Solar payback on that spend is often under two years." },
    ],
    areasLead: "We work across all 25 LGAs in Delta State. These are our most active areas.",
    areas: [
      { name: "Warri / Effurun", desc: "Delta's commercial heartland with heavy generator use" },
      { name: "Asaba / Okpanam", desc: "Fast-growing capital with new duplexes and estates" },
      { name: "Sapele", desc: "Industrial town on the Ethiope River" },
      { name: "Ughelli / Agbarha", desc: "Central Delta commercial hub on the East–West Road" },
      { name: "Abraka / Agbor", desc: "University town and Ika-land, with lodges and homes" },
      { name: "Ozoro / Oleh", desc: "Isoko communities with limited grid reliability" },
      { name: "Kwale / Ogwashi-Uku", desc: "Ndokwa and Anioma communities on the western axis" },
      { name: "Koko / Warri North", desc: "Riverine oil communities with poor grid supply" },
      { name: "Bomadi / Patani", desc: "Waterway LGAs where solar is often the only stable power" },
      { name: "Uvwie / Udu", desc: "Growing suburbs around Warri" },
      { name: "Ibusa / Oshimili", desc: "Peri-urban Asaba with rapid housing growth" },
      { name: "Burutu / Forcados", desc: "Remote coastal communities that need off-grid systems" },
    ],
    faqs: [
      costFaq("Warri"),
      upstairsFaq("Delta State"),
      { q: "Do you serve both Warri and Asaba?", a: "Yes. We cover all 25 LGAs in Delta State, including Warri, Effurun, Asaba, Sapele, Ughelli, Abraka, Agbor and remote LGAs like Bomadi and Burutu." },
      { q: "How does the heat in Warri affect solar panels?", a: "Panels lose a little output when very hot, which we account for in sizing. Mounting them with an air gap under the panel keeps that loss small." },
      { q: "Can you install near the Niger Bridge in Asaba?", a: "Yes. Asaba and the Oshimili axis are some of our fastest-growing areas. Every install starts with a free site assessment." },
      { q: "Do you cover Koko and riverine Warri North?", a: "Yes. For waterway communities we plan equipment delivery in advance and show any boat cost on your quote." },
    ],
  },
  bayelsa: {
    key: "Bayelsa", slug: "bayelsa", label: "Bayelsa State", mainTown: "Yenagoa", disco: "PHED", lgas: 8,
    heroTitle: "Solar Installation in Yenagoa & Bayelsa State",
    heroLead: "Transmission faults, floods and geography make the grid unreliable in Bayelsa by default. We install flood-aware hybrid and off-grid solar across all 8 LGAs, including riverine and island communities.",
    heroImage: "/images/real/LiFePo4-batteries-in-storage.jpeg",
    whyLead: "Bayelsa sits at the heart of the Niger Delta and is one of the most power-deprived states in Nigeria. Here is why solar is the answer, not an upgrade.",
    why: [
      { title: "Fragile transmission", body: "Bayelsa's grid power arrives over long transmission lines through Rivers State. A single fault or act of vandalism can mean weeks of darkness." },
      { title: "Boat-only communities", body: "Many communities in Nembe, Brass and Southern Ijaw are reachable only by water. Off-grid solar is the realistic way to power them." },
      { title: "Oloibiri: oil first, light last", body: "Nigeria's first commercial oil well was drilled at Oloibiri in Ogbia in 1956, yet power there is still poor. We serve Oloibiri and all of Ogbia." },
      { title: "Institutions need power", body: "Universities in Amassoma and Otuoke, clinics, schools and offices in Yenagoa cannot wait for the grid. Solar keeps them running." },
      { title: "Fuel costs pile up", body: "During long blackouts, families can spend tens of thousands of naira a week on fuel. Solar stops that drain." },
      { title: "Floods are planned for", body: "We mount inverters and batteries above flood level or upstairs, with an isolator you can reach fast." },
    ],
    areasLead: "We cover all 8 LGAs in Bayelsa, including communities reached only by water.",
    areas: [
      { name: "Yenagoa (Biogbolo, Kpansia, Ekeki)", desc: "State capital neighbourhoods with long outages" },
      { name: "Amarata / Edepie / Agudama", desc: "Central Yenagoa suburbs" },
      { name: "Ovom / Okaka / Swali", desc: "Northern Yenagoa with busy markets and businesses" },
      { name: "Opolo / Onopa / Azikoro", desc: "Residential communities with frequent blackouts" },
      { name: "Nembe / Bassambiri", desc: "Island communities where solar is the backbone of power" },
      { name: "Brass / Twon-Brass / Akassa", desc: "Coastal communities that need off-grid systems" },
      { name: "Ogbia / Oloibiri / Otuoke", desc: "Historic oil communities and the Federal University Otuoke" },
      { name: "Amassoma / Wilberforce Island", desc: "Home of Niger Delta University, with lodges and staff housing" },
      { name: "Sagbama / Ekeremor", desc: "Northern LGAs on the edge of the grid" },
      { name: "Kolokuma / Opokuma (Kaiama, Odi)", desc: "Inland towns on the River Nun" },
      { name: "Southern Ijaw / Oporoma", desc: "Remote creek communities" },
    ],
    faqs: [
      costFaq("Yenagoa"),
      upstairsFaq("Bayelsa State"),
      { q: "Why is power so poor in Bayelsa?", a: "Grid power reaches Bayelsa over long transmission lines that are exposed to faults and vandalism, and many communities are across water. Solar with lithium storage removes that dependency." },
      { q: "Can you reach Nembe, Brass or Southern Ijaw?", a: "Yes, where boat access allows. Equipment is transported by water and the logistics cost is shown on your quote before you pay." },
      { q: "Is solar viable with Yenagoa's heavy rain?", a: "Yes. Cloud cover is built into our sizing, panels still produce under cloud, and the lithium battery covers low-sun hours. Hybrid inverters can also top up from the grid or a generator." },
      { q: "What happens to my system if Yenagoa floods?", a: "Panels on the roof are safe. We mount inverters and batteries well above the flood line or upstairs, and fit an isolator so you can shut everything down quickly if water rises." },
    ],
  },
};
