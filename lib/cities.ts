import type { QuoteState } from "./quote";

/**
 * Town-level landing pages: /solar-installation/[slug].
 *
 * Every entry must carry its own local detail (areas, grid situation, what
 * changes about the install there, its own FAQs). Pages that only swap the
 * town name are doorway pages and Google demotes them, so do not add a town
 * here until you can say something specific about it.
 */

export interface CityFaq {
  q: string;
  a: string;
}

export interface City {
  slug: string;
  name: string;
  state: Exclude<QuoteState, "Other">;
  lga: string;
  /** Electricity distribution company for the area. */
  disco: string;
  /** Opening paragraph, written for this town only. */
  intro: string;
  /** Neighbourhoods, estates and nearby communities we cover. */
  areas: string[];
  /** Grid situation and who is buying solar here. */
  power: string;
  /** What is different about installing here: roofs, access, weather, logistics. */
  install: string;
  /** Typical first systems we see in this town. */
  typical: string;
  faqs: CityFaq[];
  nearby: string[];
  /** Blog posts most relevant to this town. */
  posts: string[];
}

export const STATE_PAGES: Record<City["state"], { href: string; label: string; psh: number }> = {
  Rivers: { href: "/locations/rivers", label: "Rivers State", psh: 4.5 },
  Delta: { href: "/locations/delta", label: "Delta State", psh: 4.6 },
  Bayelsa: { href: "/locations/bayelsa", label: "Bayelsa State", psh: 4.4 },
};

export const CITIES: City[] = [
  // ── Rivers State ─────────────────────────────────────────────────────────
  {
    slug: "port-harcourt",
    name: "Port Harcourt",
    state: "Rivers",
    lga: "Port Harcourt City & Obio-Akpor",
    disco: "PHED (Port Harcourt Electricity Distribution)",
    intro:
      "Port Harcourt is our home base, so it is where we install most often and respond fastest. From duplexes in GRA to shops in Mile 1 and offices on Trans-Amadi, we design solar systems around how much power you actually use, then install them in one to two days.",
    areas: [
      "GRA Phase 1, 2 & 3", "Old GRA", "D-Line", "Diobu (Mile 1, 2 & 3)", "Borokiri", "Town / Old Port Harcourt",
      "Trans-Amadi", "Woji", "Elekahia", "Rumuola", "Rumuibekwe", "Peter Odili Road", "Ada George",
      "Stadium Road", "Abuloma", "Amadi-Ama",
    ],
    power:
      "Most Port Harcourt streets get a few hours of PHED supply a day, often at night when nobody needs it most. The gap is filled by petrol and diesel generators, which is part of why the city has a soot problem. A home running a generator most of the day can easily spend ₦80,000 to ₦150,000 a month on fuel. Our biggest customer groups here are families in GRA, Woji and Peter Odili Road who want the generator off for good, and small businesses (salons, pharmacies, cold stores, POS shops) that lose money every time light goes.",
    install:
      "A large share of homes in Port Harcourt are upstairs buildings and duplexes. On a storey building we plan the cable route from roof to inverter room before we arrive, use proper roof ladders and harnesses, and fix the panels to rafters rather than to the roof sheet alone, because the wind during rainy-season storms is strong. In flats where the roof is shared, we confirm access with the landlord first.",
    typical:
      "Two- and three-bedroom flats usually start with a 3kVA to 5kVA system. Duplexes running one or two inverter ACs typically need 6kVA to 10kVA with 8kWh to 15kWh of lithium storage.",
    faqs: [
      {
        q: "How fast can you install solar in Port Harcourt?",
        a: "We usually visit for the free site assessment within two to three days of your first message, and most homes are installed in one to two days once the quote is accepted and paid.",
      },
      {
        q: "Will the soot in Port Harcourt affect my solar panels?",
        a: "Soot settles on panels and can cut output by 5 to 15 percent if it is left for months. Rinsing them with clean water every four to six weeks during the dry season keeps output up. We show every customer how to do it safely, or we do it as part of maintenance.",
      },
    ],
    nearby: ["obio-akpor", "eleme", "oyigbo", "okrika"],
    posts: ["how-much-does-solar-cost-in-port-harcourt", "solar-on-upstairs-building", "solar-for-small-businesses-in-rivers-state"],
  },
  {
    slug: "obio-akpor",
    name: "Obio-Akpor",
    state: "Rivers",
    lga: "Obio-Akpor",
    disco: "PHED",
    intro:
      "Obio-Akpor is where Port Harcourt keeps growing. New estates in Rumuodara, Eneka, Rukpokwu and Eliozu, student lodges around Choba and Alakahia, and busy streets in Rumuokoro all share the same problem: grid supply that cannot keep up. We install solar across the whole LGA.",
    areas: [
      "Rumuokoro", "Rumuodara", "Rumuigbo", "Rumuokwuta", "Rumuola", "Mgbuoba", "Ozuoba", "Choba", "Alakahia",
      "Rumuolumeni", "Rumuosi", "Rukpokwu", "Eneka", "Eliozu", "Elelenwo", "Atali", "Igwuruta (Ikwerre)",
    ],
    power:
      "Many of the newer estates were built faster than the distribution network, so some streets share overloaded transformers and others are not properly connected at all. Landlords running lodges near the University of Port Harcourt are a big group for us: one shared solar system with separate breakers per room ends the arguments over generator fuel money.",
    install:
      "Lots of buildings here are new storey buildings with good concrete and long-span aluminium roofs, which suit panels well. For lodges and multi-flat compounds we size one central system and split the output with breakers or individual meters, so each tenant's usage can be capped.",
    typical:
      "Single flats start at 3kVA. Lodges with 8 to 20 rooms usually need 10kVA or more with a large lithium bank and per-room load limits.",
    faqs: [
      {
        q: "Can one solar system power a whole lodge or block of flats in Choba?",
        a: "Yes. We install one central inverter and battery bank, then give each room or flat its own breaker so heavy users cannot drain the system for everyone. The size depends on the number of rooms and what tenants are allowed to run.",
      },
      {
        q: "Do you cover new estates in Eneka, Rukpokwu and Igwuruta?",
        a: "Yes. We cover all of Obio-Akpor and neighbouring Ikwerre LGA, including the newer estates off the airport road.",
      },
    ],
    nearby: ["port-harcourt", "eleme", "oyigbo", "ahoada"],
    posts: ["solar-on-upstairs-building", "what-can-3kva-5kva-10kva-power", "how-much-solar-do-i-need"],
  },
  {
    slug: "eleme",
    name: "Eleme",
    state: "Rivers",
    lga: "Eleme",
    disco: "PHED",
    intro:
      "Eleme is home to the Port Harcourt refinery at Alesa, the petrochemical plant and Onne port, so it has more workshops, warehouses and staff housing than almost anywhere else in Rivers State. We install home and commercial solar from Akpajo to Onne.",
    areas: ["Alesa", "Aleto", "Ogale", "Onne", "Agbonchia", "Ebubu", "Akpajo", "Alode", "Eteo", "Ekporo", "Aleto-Eleme junction"],
    power:
      "Industrial neighbours do not guarantee good grid supply for homes. Most residential streets in Eleme still depend on generators, and businesses serving the port and the free zone cannot afford downtime. Commercial customers here care most about uninterrupted power for computers, CCTV, fridges and pumps.",
    install:
      "The air near the refinery and port carries more pollutants and salt, which speeds up corrosion. We use aluminium mounting rails with stainless fasteners, seal every cable entry, and recommend a panel rinse more often than in central Port Harcourt.",
    typical:
      "Homes start at 3kVA to 5kVA. Offices, warehouses and staff quarters typically run 10kVA to 30kVA hybrid systems.",
    faqs: [
      {
        q: "Can you install commercial solar for a business near Onne port?",
        a: "Yes. We do a load audit first, then design a hybrid system that keeps your critical equipment running and can still use grid power when it is available.",
      },
      {
        q: "Does the industrial air in Eleme damage solar panels?",
        a: "It does not damage good panels, but it can corrode cheap mounting hardware and leave a film on the glass. We use corrosion-resistant rails and fasteners and recommend more frequent cleaning.",
      },
    ],
    nearby: ["port-harcourt", "okrika", "oyigbo", "bori"],
    posts: ["solar-for-small-businesses-in-rivers-state", "solar-panel-maintenance-rainy-season", "hybrid-vs-off-grid-solar-nigeria"],
  },
  {
    slug: "oyigbo",
    name: "Oyigbo",
    state: "Rivers",
    lga: "Oyigbo",
    disco: "PHED",
    intro:
      "Oyigbo sits on the Port Harcourt–Aba expressway, and many families here work in Port Harcourt and come home to generators. The irony is that the Afam power station is in the same LGA. We install solar across Oyigbo town, Afam, Komkom and the communities around them.",
    areas: ["Oyigbo town", "Afam", "Komkom", "Obeama", "Okoloma", "Umuagbai", "Obete", "Mirinwa", "Izuoma"],
    power:
      "Supply in Oyigbo is unpredictable, and many homes run a generator for most of the evening. Traders along the expressway and families in new bungalows make up most of our customers here.",
    install:
      "Oyigbo has a lot of bungalows with low-pitched roofs, which make panel installation quick and maintenance easy. Where a compound has space, ground-mounted panels are another option.",
    typical: "Bungalows usually start with a 3kVA to 5kVA system with 5kWh to 10kWh of lithium storage.",
    faqs: [
      {
        q: "Do you charge extra to install in Oyigbo?",
        a: "Oyigbo is close to Port Harcourt, so any transport cost is small and is listed on your quote before you pay. There are no surprise charges after installation.",
      },
      {
        q: "Can solar panels be mounted on the ground instead of the roof?",
        a: "Yes, if you have open space that gets full sun and can be fenced or secured. Ground mounts make cleaning easy but need a sturdy frame and protection from theft.",
      },
    ],
    nearby: ["port-harcourt", "eleme", "obio-akpor"],
    posts: ["how-much-does-solar-cost-in-port-harcourt", "generator-vs-solar", "what-can-3kva-5kva-10kva-power"],
  },
  {
    slug: "bonny",
    name: "Bonny Island",
    state: "Rivers",
    lga: "Bonny",
    disco: "Mostly off-grid / private supply",
    intro:
      "Bonny Island hosts Nigeria LNG, but outside the company's own facilities most homes and businesses depend on generators. We bring solar panels, inverters and lithium batteries across by boat and install them properly, so you are not left with a half-finished job and no installer nearby.",
    areas: ["Bonny town", "Finima", "Iwoma", "Abalamabie", "Kalaibiama", "Oloma", "Peterside", "Ayaminima"],
    power:
      "Fuel costs more on the island because it has to be shipped in, so the savings from solar are bigger here than on the mainland. Hotels, guest houses, shops and family homes are our main customers.",
    install:
      "Salt air is the main enemy on Bonny. We use marine-grade mounting hardware, sealed junction boxes and inverters installed indoors away from sea spray. Every Bonny job is planned around boat schedules, so we confirm the full equipment list with you before anything leaves Port Harcourt.",
    typical: "Homes usually need 5kVA or more because fuel is expensive and residents want to run fridges and ACs. Guest houses often go to 10kVA and above.",
    faqs: [
      {
        q: "How do you get solar equipment to Bonny Island?",
        a: "We ship panels, batteries and inverters by boat from Port Harcourt, packed and padded. The boat cost is listed on your quote. Installation usually takes one to two days on site.",
      },
      {
        q: "Will salt air damage my solar system on Bonny?",
        a: "It will corrode cheap hardware fast. We use marine-grade rails and stainless fasteners, keep inverters and batteries indoors, and recommend rinsing the panels with fresh water regularly.",
      },
    ],
    nearby: ["okrika", "port-harcourt", "brass"],
    posts: ["solar-panel-maintenance-rainy-season", "lifep04-vs-acid", "generator-vs-solar"],
  },
  {
    slug: "okrika",
    name: "Okrika",
    state: "Rivers",
    lga: "Okrika",
    disco: "PHED",
    intro:
      "Okrika is a short trip from Port Harcourt, yet many homes on the island and in the surrounding riverine communities still run on generators most of the day. We install solar across Okrika town and nearby communities such as Ogu, Bolo and Ibaka.",
    areas: ["Okrika town", "Ogoloma", "Kirike", "Ibaka", "Ogu", "Bolo", "Isaka", "George Ama", "Ojimba"],
    power:
      "Grid supply here is limited by geography: lines are long and faults take time to fix. Families who have moved back from Port Harcourt, churches and small hotels are our usual customers.",
    install:
      "Humidity and salt from the creeks mean we treat Okrika like a coastal site: corrosion-resistant hardware, sealed connections and batteries kept indoors in a ventilated space.",
    typical: "Most homes start with 3kVA to 6kVA. Churches and event halls are designed around fans, lights and PA systems, usually 6kVA to 10kVA.",
    faqs: [
      {
        q: "Can solar power a church in Okrika?",
        a: "Yes. Churches use most of their power on a few days a week, so a well-sized battery bank charged through the week can carry long Sunday services, lights, fans and the sound system.",
      },
      {
        q: "Do you install in Ogu, Bolo and other riverine communities?",
        a: "Yes. If a site needs a boat, we plan the trip and list the cost on your quote before work starts.",
      },
    ],
    nearby: ["port-harcourt", "eleme", "bonny"],
    posts: ["lifep04-vs-acid", "what-can-3kva-5kva-10kva-power", "generator-vs-solar"],
  },
  {
    slug: "ahoada",
    name: "Ahoada",
    state: "Rivers",
    lga: "Ahoada East & Ahoada West",
    disco: "PHED",
    intro:
      "Ahoada sits on the East–West Road between Port Harcourt and Yenagoa. Homes, filling stations, hotels and schools along that corridor are all fighting the same fuel bill, and solar is the most reliable way out. We install across Ahoada East and West.",
    areas: ["Ahoada town", "Edeoha", "Ihuowo", "Ihuaba", "Odiemudie", "Mbiama", "Joinkrama", "Akinima"],
    power:
      "Supply along this stretch of the East–West Road is patchy and outages can last days after a fault. Schools and hotels here are some of our strongest cases for solar, because they run the same loads every day.",
    install:
      "Most buildings are bungalows or two-storey buildings with plenty of open roof space. The main planning point is transport, so we combine Ahoada jobs with other installs on the East–West Road where possible.",
    typical: "Homes usually start at 3kVA to 5kVA. Schools and hotels typically need 10kVA or more.",
    faqs: [
      {
        q: "Can solar power a school in Ahoada?",
        a: "Yes. Schools use most power in daylight when panels produce the most, so the battery bank can be smaller than for a home of the same load. We size it around classrooms, offices, computers and boreholes.",
      },
      {
        q: "Do you also cover Mbiama near the Bayelsa border?",
        a: "Yes. Mbiama is on our East–West Road route between Port Harcourt and Yenagoa.",
      },
    ],
    nearby: ["omoku", "obio-akpor", "yenagoa"],
    posts: ["solar-borehole-water-pump-nigeria", "hybrid-vs-off-grid-solar-nigeria", "what-can-3kva-5kva-10kva-power"],
  },
  {
    slug: "omoku",
    name: "Omoku",
    state: "Rivers",
    lga: "Ogba/Egbema/Ndoni",
    disco: "PHED",
    intro:
      "Omoku is the headquarters of Ogba/Egbema/Ndoni LGA, an oil and gas area with gas plants nearby and still very little reliable power at home. We install solar in Omoku town, Obrikom, Ebocha and the communities around them.",
    areas: ["Omoku town", "Obrikom", "Obiafu", "Ebocha", "Erema", "Egi", "Okwuzi", "Ndoni"],
    power:
      "Homes and businesses in Omoku rely heavily on generators. Oil company staff, contractors and traders make up much of our customer base here, and many want systems that can run an AC through the night.",
    install:
      "Omoku is a longer trip from Port Harcourt, so we make sure every part is on the truck before we leave and finish the install in one visit. Most roofs are corrugated metal on timber, which we reinforce at mounting points where needed.",
    typical: "Homes with ACs usually need 6kVA and up with at least 10kWh of lithium storage.",
    faqs: [
      {
        q: "How long does it take to install solar in Omoku?",
        a: "Most homes are completed in one to two days on site. We schedule the trip once your quote is accepted and confirm the date with you in advance.",
      },
      {
        q: "Can solar run my AC through the night in Omoku?",
        a: "Yes, with enough battery storage. A 1.5HP inverter AC running eight hours at night needs roughly 6kWh to 8kWh of usable battery on top of your other night-time loads.",
      },
    ],
    nearby: ["ahoada", "obio-akpor"],
    posts: ["solar-ac", "how-long-do-solar-batteries-last-nigeria", "how-much-solar-do-i-need"],
  },
  {
    slug: "bori",
    name: "Bori",
    state: "Rivers",
    lga: "Khana (Ogoni)",
    disco: "PHED",
    intro:
      "Bori is the main town in Ogoniland and the gateway to Khana, Gokana, Tai and Eleme. We install solar for homes, shops and schools in Bori and the surrounding Ogoni communities.",
    areas: ["Bori town", "Taabaa", "Kono", "Kpor (Gokana)", "Bodo (Gokana)", "Sakpenwa (Tai)", "Kira (Tai)"],
    power:
      "Supply across Ogoniland is irregular, and many families run small petrol generators for a few hours each evening. A modest solar system replaces that completely for most households.",
    install:
      "Most homes are bungalows with simple roofs, so installs are quick. We plan Ogoni installs alongside jobs in Eleme to keep transport costs down.",
    typical: "Most homes start with a 3kVA system and 3kWh to 5kWh of lithium storage, expanding later if needed.",
    faqs: [
      {
        q: "What is the smallest solar system worth buying in Bori?",
        a: "For lights, fans, a TV and phone charging, a 3kVA inverter with about 3kWh of lithium battery and four panels is a solid starting point that can be expanded later.",
      },
      {
        q: "Do you cover Gokana and Tai as well as Khana?",
        a: "Yes. We install across Khana, Gokana and Tai, including Kpor, Bodo and Sakpenwa.",
      },
    ],
    nearby: ["eleme", "port-harcourt", "oyigbo"],
    posts: ["what-can-3kva-5kva-10kva-power", "inverter-only-vs-full-solar-system", "fake-substandard-solar-panels-nigeria"],
  },

  // ── Delta State ──────────────────────────────────────────────────────────
  {
    slug: "warri",
    name: "Warri",
    state: "Delta",
    lga: "Warri South",
    disco: "BEDC (Benin Electricity Distribution Company)",
    intro:
      "Warri runs on generators. From Okumagba Layout to Airport Road and the shops along Warri–Sapele Road, power cuts are part of the day. We install home and business solar across Warri and Effurun, with free site assessments before any quote.",
    areas: [
      "Warri GRA", "Okumagba Layout", "Airport Road", "Jakpa Road", "Ekpan", "Enerhen", "Okere", "Ogunu", "Igbudu",
      "Agbassa", "Pessu", "Bendel Estate", "Edjeba", "Ugbuwangue", "Warri–Sapele Road",
    ],
    power:
      "BEDC supply in Warri is unreliable on most streets, and businesses often burn 15 to 30 litres of fuel a day. Supermarkets, eateries, pharmacies, offices and families with ACs are our main customers here.",
    install:
      "Warri has many upstairs buildings and blocks of flats. On storey buildings we plan safe roof access and a tidy cable run down the outside wall or through a service duct, and we put the inverter and batteries in a dry, ventilated room on the ground or first floor.",
    typical: "Flats start at 3kVA to 5kVA. Businesses and duplexes usually need 6kVA to 15kVA hybrid systems.",
    faqs: [
      {
        q: "How long does solar installation take in Warri?",
        a: "Most homes are done in one to two days. Larger commercial systems take three to five days depending on size.",
      },
      {
        q: "Can solar power a supermarket or eatery in Warri?",
        a: "Yes. We audit your load first, then design a hybrid system that covers freezers, lights, POS terminals and fans, using grid power whenever BEDC supply is available.",
      },
    ],
    nearby: ["effurun", "sapele", "ughelli", "abraka"],
    posts: ["solar-for-small-businesses-in-rivers-state", "solar-on-upstairs-building", "generator-vs-solar"],
  },
  {
    slug: "effurun",
    name: "Effurun",
    state: "Delta",
    lga: "Uvwie",
    disco: "BEDC",
    intro:
      "Effurun is Warri's twin city, home to the Petroleum Training Institute, FUPRE and some of the busiest roads in Delta State. We install solar for homes, student hostels, offices and shops across Uvwie LGA.",
    areas: ["Effurun Roundabout", "PTI Road", "Jakpa Road", "Ugbomro", "Ekpan", "Enerhen Junction", "Airport Road (Effurun)", "DSC Expressway", "Ugbolokposo", "Ekurede-Urhobo"],
    power:
      "Effurun's supply is no better than Warri's. Hostels near PTI and FUPRE, offices on Jakpa Road and families in new estates all spend heavily on fuel.",
    install:
      "Hostel and estate buildings here are mostly storey buildings with good roof space. For hostels we fit one central system and cap each room's load so tenants share power fairly.",
    typical: "Homes start at 3kVA to 5kVA; hostels usually need 10kVA and above.",
    faqs: [
      {
        q: "Can I put one solar system on a student hostel near PTI or FUPRE?",
        a: "Yes. One central inverter and battery bank with a breaker per room works well, and it lets you set limits so heavy users cannot drain the system.",
      },
      {
        q: "Do you install in Ugbomro and along DSC Expressway?",
        a: "Yes, we cover all of Uvwie LGA as part of our Warri area.",
      },
    ],
    nearby: ["warri", "sapele", "ughelli"],
    posts: ["what-can-3kva-5kva-10kva-power", "how-long-do-solar-batteries-last-nigeria", "hybrid-vs-off-grid-solar-nigeria"],
  },
  {
    slug: "asaba",
    name: "Asaba",
    state: "Delta",
    lga: "Oshimili South",
    disco: "BEDC",
    intro:
      "Asaba is Delta's capital and one of the fastest-growing cities in the South-South, with new duplexes and estates going up from Okpanam to Cable Point. We install solar systems built for those bigger homes, including ones that run several ACs.",
    areas: ["GRA", "Okpanam", "Cable Point", "Summit Road", "Nnebisi Road", "Okwe", "Anwai Road", "DBS Road", "Ibusa", "Oko"],
    power:
      "Asaba often gets more grid hours than Warri, but supply still drops for long stretches and voltage is unstable. Civil servants, professionals and estate developers are our main customers, usually wanting hybrid systems that use grid power when it is there and solar the rest of the time.",
    install:
      "Many Asaba homes are new duplexes with complex hip roofs. We map the roof faces during the site visit and place panels on the faces with the best sun, avoiding shade from parapets and water tanks.",
    typical: "Duplexes typically need 6kVA to 10kVA with 10kWh to 15kWh of lithium storage, especially with two or more ACs.",
    faqs: [
      {
        q: "Is a hybrid solar system better than off-grid in Asaba?",
        a: "Usually yes. Asaba gets some grid supply, so a hybrid inverter can charge batteries from the grid when it is on and from solar when it is not. That lets you buy a smaller battery bank for the same reliability.",
      },
      {
        q: "Can solar run two ACs in a duplex in Asaba?",
        a: "Yes, with the right size. Two 1.5HP inverter ACs need at least an 8kVA to 10kVA inverter, around 6kW of panels and enough battery for the hours you run them at night.",
      },
    ],
    nearby: ["agbor", "abraka", "warri"],
    posts: ["hybrid-vs-off-grid-solar-nigeria", "solar-ac", "what-can-3kva-5kva-10kva-power"],
  },
  {
    slug: "sapele",
    name: "Sapele",
    state: "Delta",
    lga: "Sapele",
    disco: "BEDC",
    intro:
      "Sapele has a power station at Ogorode and still struggles with power at home. We install solar for homes, sawmills, shops and churches in Sapele and nearby Amukpe and Okirigwe.",
    areas: ["Sapele township", "Amukpe", "Okirigwe", "Ogorode", "Ugberikoko", "Ajogodo", "Elume", "Oghara (Ethiope West)"],
    power:
      "Homes in Sapele spend a lot on petrol, and small businesses lose stock when freezers go off. Our usual customers are families, retail shops and churches.",
    install:
      "Sapele has a lot of older bungalows. We check the roof timbers and sheets during the site assessment and replace or reinforce weak sections before mounting panels.",
    typical: "Most homes start with 3kVA to 5kVA. Shops with freezers usually need 5kVA with at least 5kWh of lithium storage.",
    faqs: [
      {
        q: "My roof is old. Can I still install solar in Sapele?",
        a: "Often yes. We inspect the roof during the free site assessment, and if the timber or sheets are weak we tell you what needs fixing first so the panels sit on a sound structure.",
      },
      {
        q: "Can solar keep my shop's freezers running in Sapele?",
        a: "Yes. Freezers run around the clock, so we size the battery for night-time use and pick panels that recharge it fully during the day, even in rainy season.",
      },
    ],
    nearby: ["warri", "effurun", "abraka"],
    posts: ["solar-for-small-businesses-in-rivers-state", "lifep04-vs-acid", "how-much-solar-do-i-need"],
  },
  {
    slug: "ughelli",
    name: "Ughelli",
    state: "Delta",
    lga: "Ughelli North",
    disco: "BEDC",
    intro:
      "Ughelli is a busy Urhobo town on the East–West Road with a big market and a power plant next door, yet most homes still rely on generators. We install solar systems across Ughelli North and South.",
    areas: ["Ughelli town", "Otovwodo", "Agbarha", "Ekiugbo", "Iwhrekan", "Ogor", "Afiesere", "Orogun", "Otu-Jeremi (Ughelli South)"],
    power:
      "Traders, hoteliers and families are our main customers here. Many already own an inverter with old batteries and want to upgrade to a proper solar system with lithium storage.",
    install:
      "If you already have an inverter, we check whether it is worth keeping. Some inverters can take panels and a lithium battery; others are better replaced. We will tell you honestly during the site visit.",
    typical: "Upgrades from inverter-only setups are common here, usually to a 5kVA hybrid with 5kWh to 10kWh lithium.",
    faqs: [
      {
        q: "Can you add solar panels to my existing inverter in Ughelli?",
        a: "Sometimes. It depends on whether your inverter has a solar charge controller and what battery voltage it uses. We check the model during the free site visit and tell you if it is worth keeping.",
      },
      {
        q: "Should I replace my gel batteries with lithium?",
        a: "In most cases yes. Lithium (LiFePO4) batteries last several times longer, can be used more deeply each night and need no maintenance, so they cost less over the life of the system.",
      },
    ],
    nearby: ["warri", "effurun", "abraka", "sapele"],
    posts: ["inverter-only-vs-full-solar-system", "lifep04-vs-acid", "how-long-do-solar-batteries-last-nigeria"],
  },
  {
    slug: "abraka",
    name: "Abraka",
    state: "Delta",
    lga: "Ethiope East",
    disco: "BEDC",
    intro:
      "Abraka is a university town, home to Delta State University, and it is where we installed the 6kVA system with 5kWh of lithium storage shown in our gallery. Grid supply here is poor, so homes, shops and student lodges all need their own power.",
    areas: ["DELSU Site II & III", "Urhuoka", "Oria", "Erho", "Umeghe", "Abraka market area", "Eku", "Obiaruku"],
    power:
      "Light in Abraka is bad enough that most landlords and shop owners run generators for most of the day. Student lodges and small shops are our main customers here.",
    install:
      "Lodges in Abraka are usually long bungalows or two-storey blocks. We size one shared system and split it with breakers per room, and we place batteries in a lockable room for security.",
    typical: "Shops and homes often start at 3kVA to 6kVA. Lodges usually need 10kVA and above.",
    faqs: [
      {
        q: "Have you installed solar in Abraka before?",
        a: "Yes. One of the systems in our gallery is a 6kVA inverter with 5kWh of lithium storage installed in Abraka for a home and shop, and the customer's review is on our homepage.",
      },
      {
        q: "Can one solar system power a student lodge near DELSU?",
        a: "Yes. A central system with per-room breakers works well for lodges, and it lets you limit heavy appliances like pressing irons and kettles.",
      },
    ],
    nearby: ["warri", "sapele", "ughelli", "agbor"],
    posts: ["what-can-3kva-5kva-10kva-power", "how-much-solar-do-i-need", "lifep04-vs-acid"],
  },
  {
    slug: "agbor",
    name: "Agbor",
    state: "Delta",
    lga: "Ika South",
    disco: "BEDC",
    intro:
      "Agbor is the main town in Ika land, on the road between Benin and Asaba. We install solar for homes, hotels and businesses in Agbor and across Ika South and Ika North East.",
    areas: ["Agbor town", "Boji-Boji Owa", "Alihame", "Ihe", "Agbor-Obi", "Owa-Oyibu", "Umunede", "Owa-Alero"],
    power:
      "Agbor has the same unreliable supply as the rest of Delta, and businesses on the expressway are under heavy fuel pressure. Hotels and filling stations are common commercial customers.",
    install:
      "Agbor jobs are planned with our Asaba installs. Most roofs are straightforward, and many compounds have space for ground-mounted panels if the roof is shaded.",
    typical: "Homes start at 3kVA to 5kVA; hotels and businesses usually need 10kVA and above.",
    faqs: [
      {
        q: "Can solar power a hotel in Agbor?",
        a: "Yes. Hotels need a careful load audit because many rooms run ACs at the same time at night. We often design a hybrid that covers lights, fans, fridges and some ACs on solar, with the generator kept as backup for peak nights.",
      },
      {
        q: "Do you cover Owa-Oyibu and Umunede?",
        a: "Yes. We install across Ika South and Ika North East.",
      },
    ],
    nearby: ["asaba", "abraka"],
    posts: ["hybrid-vs-off-grid-solar-nigeria", "solar-ac", "generator-vs-solar"],
  },

  // ── Bayelsa State ────────────────────────────────────────────────────────
  {
    slug: "yenagoa",
    name: "Yenagoa",
    state: "Bayelsa",
    lga: "Yenagoa",
    disco: "PHED",
    intro:
      "Yenagoa is the capital of Bayelsa and the town we install in most across the state. We install solar for homes, offices, hotels and shops from Amarata to Igbogene, and we design every system with flooding in mind.",
    areas: ["Amarata", "Opolo", "Swali", "Kpansia", "Okutukutu", "Edepie", "Biogbolo", "Ekeki", "Azikoro", "Agudama-Epie", "Akenfa", "Igbogene", "Etegwe", "Tombia", "Yenizue-Gene", "Onopa"],
    power:
      "Supply in Yenagoa is unreliable and fuel often costs more than in Port Harcourt. Civil servants, hotel owners, and families in Opolo, Kpansia and Okutukutu are our main customers.",
    install:
      "Parts of Yenagoa flood in heavy rainy seasons, as they did badly in 2012 and 2022. We mount inverters and batteries on walls or raised platforms well above the flood line, so a flood does not destroy the system. On upstairs buildings we place them on the upper floor where possible.",
    typical: "Most homes start at 3kVA to 6kVA. Hotels and offices usually need 10kVA and above.",
    faqs: [
      {
        q: "What happens to my solar system if Yenagoa floods?",
        a: "Panels on the roof are safe. The risk is the inverter and batteries, so we mount them high on the wall or on a raised platform, or upstairs if the building has one. If water is rising, switch the system off at the isolator and keep it off until an engineer checks it.",
      },
      {
        q: "How much does solar cost in Yenagoa?",
        a: "Prices are the same as Port Harcourt for equipment, starting from about ₦1.7M for a 3kVA system. Any transport cost is listed on your quote before you pay.",
      },
    ],
    nearby: ["ogbia", "amassoma", "kaiama", "sagbama"],
    posts: ["solar-panel-maintenance-rainy-season", "how-much-does-solar-cost-in-port-harcourt", "solar-on-upstairs-building"],
  },
  {
    slug: "amassoma",
    name: "Amassoma",
    state: "Bayelsa",
    lga: "Southern Ijaw",
    disco: "PHED / limited grid",
    intro:
      "Amassoma is home to the Niger Delta University on Wilberforce Island, and its lodges, shops and staff quarters run almost entirely on generators. We install solar for landlords, businesses and families in Amassoma and Southern Ijaw.",
    areas: ["Amassoma town", "NDU Glory Land campus area", "Otuan", "Ogobiri", "Toru-Ebeni", "Oporoma"],
    power:
      "Grid power in Amassoma is limited and fuel prices are high. Lodge owners are our biggest group: one solar system with per-room limits ends daily fuel spending and keeps tenants happy.",
    install:
      "We plan Amassoma installs around road and water access from Yenagoa and bring every component in one trip. Batteries go indoors in a lockable, ventilated room.",
    typical: "Lodges usually need 10kVA and above; shops and family homes start at 3kVA to 5kVA.",
    faqs: [
      {
        q: "Is solar worth it for a student lodge in Amassoma?",
        a: "Usually yes. Lodges near NDU spend heavily on fuel every month. A solar system with per-room breakers removes most of that cost and makes the rooms easier to rent.",
      },
      {
        q: "Do you install in Oporoma and other Southern Ijaw communities?",
        a: "Yes, where access allows. Any extra transport cost, including boats, is listed on your quote before work starts.",
      },
    ],
    nearby: ["yenagoa", "ogbia"],
    posts: ["what-can-3kva-5kva-10kva-power", "lifep04-vs-acid", "how-much-solar-do-i-need"],
  },
  {
    slug: "ogbia",
    name: "Ogbia & Otuoke",
    state: "Bayelsa",
    lga: "Ogbia",
    disco: "PHED",
    intro:
      "Ogbia LGA includes Otuoke, home of the Federal University Otuoke, and Oloibiri, where Nigeria first struck oil in 1956. We install solar for homes, lodges and businesses across Ogbia.",
    areas: ["Otuoke", "Ogbia town", "Kolo", "Oloibiri", "Imiringi", "Emeyal", "Elebele", "Anyama", "Opume"],
    power:
      "Grid supply across Ogbia is irregular. Families, lodge owners around the university and shops along the Yenagoa–Mbiama road are our main customers.",
    install:
      "Ogbia sites are a short drive from Yenagoa, so we can usually install within a week of your quote being accepted. Low-lying compounds get the same flood-aware battery placement we use in Yenagoa.",
    typical: "Homes start at 3kVA to 5kVA; lodges near Otuoke typically need 10kVA and above.",
    faqs: [
      {
        q: "Do you install solar in Otuoke near the university?",
        a: "Yes. We install for lodges, staff quarters and homes in Otuoke and across Ogbia LGA.",
      },
      {
        q: "How soon can you install in Ogbia?",
        a: "Usually within a week of your quote being accepted, depending on our schedule in Yenagoa.",
      },
    ],
    nearby: ["yenagoa", "amassoma", "kaiama"],
    posts: ["what-can-3kva-5kva-10kva-power", "how-long-do-solar-batteries-last-nigeria", "generator-vs-solar"],
  },
  {
    slug: "sagbama",
    name: "Sagbama",
    state: "Bayelsa",
    lga: "Sagbama",
    disco: "PHED",
    intro:
      "Sagbama sits at the western edge of Bayelsa on the East–West Road, with Toru-Orua and its university nearby. We install solar for homes, schools and businesses across Sagbama LGA.",
    areas: ["Sagbama town", "Toru-Orua", "Adagbabiri", "Agbere", "Ofoni", "Ekeremor (nearby)", "Odoni", "Angalabiri"],
    power:
      "Supply is unreliable and this part of Bayelsa floods badly in heavy years. Families, schools and shops along the East–West Road are our main customers.",
    install:
      "Because of the flood risk, batteries and inverters are always mounted high or on an upper floor, with a clear isolator switch so the system can be shut down quickly if water rises.",
    typical: "Homes usually start at 3kVA to 5kVA with lithium storage.",
    faqs: [
      {
        q: "Is solar safe in flood-prone parts of Sagbama?",
        a: "Yes, if it is installed with floods in mind. Panels stay on the roof; inverters and batteries are mounted well above the flood line, and we fit an isolator switch so you can shut everything down safely.",
      },
      {
        q: "Do you cover Toru-Orua and Ekeremor?",
        a: "We cover Toru-Orua and the communities around Sagbama. For Ekeremor and other sites further out, message us with your location and we will confirm.",
      },
    ],
    nearby: ["yenagoa", "kaiama"],
    posts: ["solar-panel-maintenance-rainy-season", "what-can-3kva-5kva-10kva-power", "lifep04-vs-acid"],
  },
  {
    slug: "kaiama",
    name: "Kaiama & Odi",
    state: "Bayelsa",
    lga: "Kolokuma/Opokuma",
    disco: "PHED",
    intro:
      "Kolokuma/Opokuma LGA, with Kaiama as its headquarters and Odi as its largest town, lies along the River Nun a short drive from Yenagoa. We install solar for homes and businesses across the LGA.",
    areas: ["Kaiama", "Odi", "Sabagreia", "Igbedi", "Seibokorogha", "Okoloba"],
    power:
      "Most homes here run small generators for a few hours each evening. A modest solar system usually replaces that completely and runs longer.",
    install:
      "Riverside compounds get our flood-aware layout: equipment mounted high, cable entries sealed and an accessible isolator switch.",
    typical: "Most homes start with 3kVA and 3kWh to 5kWh of lithium storage.",
    faqs: [
      {
        q: "Do you install solar in Odi and Kaiama?",
        a: "Yes. Both are a short drive from Yenagoa and are part of our regular Bayelsa coverage.",
      },
      {
        q: "How big a system do I need to replace a small petrol generator?",
        a: "If your generator runs lights, fans, a TV and phone charging for a few hours, a 3kVA inverter with about 3kWh of lithium battery and four panels will do the same job without fuel.",
      },
    ],
    nearby: ["yenagoa", "sagbama", "ogbia"],
    posts: ["inverter-only-vs-full-solar-system", "generator-vs-solar", "what-can-3kva-5kva-10kva-power"],
  },
  {
    slug: "brass",
    name: "Brass",
    state: "Bayelsa",
    lga: "Brass",
    disco: "Mostly off-grid",
    intro:
      "Brass Island, home to the Brass oil terminal, is reached by boat and has very little grid power. We ship and install complete solar systems for homes, guest houses and businesses on Brass and nearby communities.",
    areas: ["Twon-Brass", "Okpoama", "Odioma", "Liama", "Ewoama", "Fantuo"],
    power:
      "Fuel on the island is expensive and supply is never guaranteed, which makes solar savings here larger than almost anywhere else we work.",
    install:
      "Salt air and humidity mean marine-grade hardware, sealed connections and indoor inverter and battery placement. All Brass jobs are planned around boat logistics, with the cost shown on the quote.",
    typical: "Homes usually need 5kVA or more; guest houses and businesses 10kVA and above.",
    faqs: [
      {
        q: "Can you install solar on Brass Island?",
        a: "Yes. We ship the full system by boat, install it in one trip and list the logistics cost on your quote before you pay.",
      },
      {
        q: "What maintenance does solar need on a coastal island?",
        a: "Rinse the panels with fresh water regularly to remove salt, keep the battery room ventilated and dry, and have the connections checked once a year.",
      },
    ],
    nearby: ["yenagoa", "bonny"],
    posts: ["solar-panel-maintenance-rainy-season", "lifep04-vs-acid", "generator-vs-solar"],
  },
];

/** Picture for each town page: a specific one where we have it, else per state. */
const CITY_IMAGE: Record<string, string> = {
  "port-harcourt": "rooftop-array",
  "obio-akpor": "ng-aerial-homes",
  eleme: "ng-building",
  oyigbo: "ng-house-wall",
  warri: "ng-street-traffic",
  effurun: "ng-shop-owner",
  asaba: "ng-city-trees",
  sapele: "ng-house-balcony",
  ughelli: "ng-market-seller",
  abraka: "abraka-system",
  agbor: "ng-small-shop",
  yenagoa: "ng-aerial-homes",
  amassoma: "lithium-wall",
  ogbia: "ng-house-wall",
};
const STATE_IMAGE: Record<City["state"], string> = { Rivers: "jinko-panels", Delta: "longi-panels", Bayelsa: "lithium-storage" };

export function cityImageKey(c: City): string {
  return CITY_IMAGE[c.slug] ?? STATE_IMAGE[c.state];
}

export function getCity(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug);
}

export function citiesInState(state: City["state"]): City[] {
  return CITIES.filter(c => c.state === state);
}
