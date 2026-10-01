import type { PhotoKey } from "./photos";

export const site = {
  name: "YandNow",
  legal: "YandNow Skill Development",
  tagline: "Skills that hold up on the floor.",
  description:
    "YandNow builds workforce capability across six verticals — corporate, CSR, industry, defence, schools and micro-entrepreneurship — with hands-on training delivered at scale.",
  email: "connect@yandnow.com",
  phone: "+91 98765 43210",
  address: ["YandNow Skill Development", "Bhopal · Pune · Guwahati", "India"],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Impact", href: "/impact" },
  { label: "About", href: "/about" },
] as const;

/* ──────────────────────────────────────────────────────────
   Headline metrics
   ────────────────────────────────────────────────────────── */
export const metrics = [
  { value: 48000, suffix: "+", label: "People trained", note: "Across 6 programme verticals" },
  { value: 210, suffix: "+", label: "Training centres", note: "Fixed, mobile and on-site" },
  { value: 86, suffix: "%", label: "Placement rate", note: "Within 90 days of certification" },
  { value: 19, suffix: "", label: "States covered", note: "From Meghalaya to Karnataka" },
] as const;

/* ──────────────────────────────────────────────────────────
   Six solution verticals
   ────────────────────────────────────────────────────────── */
export type Solution = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  lede: string;
  /** Written per vertical: "Open CSR programmes" reads better than a derived
   *  "Open csr", and lowercasing a title would ruin the acronyms. */
  ctaLabel: string;
  hero: PhotoKey;
  accent: "indigo" | "cyan";
  audience: string[];
  offerings: { title: string; body: string }[];
  formats: string[];
  outcomes: { stat: string; label: string }[];
  gallery: PhotoKey[];
};

export const solutions: Solution[] = [
  {
    slug: "corporate",
    index: "01",
    title: "Corporate Training",
    short: "Corporate",
    summary:
      "Technical and behavioural upskilling for service networks, dealerships and frontline teams.",
    lede:
      "Your technicians are the product experience. We build curricula around your service manuals, your diagnostic tools and your quality gates — then run them across the dealer network until the floor moves as one.",
    ctaLabel: "Open corporate training",
    hero: "engine-cohort",
    accent: "indigo",
    audience: [
      "OEM service networks",
      "Dealer & workshop technicians",
      "Fleet maintenance teams",
      "Frontline supervisors",
    ],
    offerings: [
      {
        title: "Product & platform induction",
        body: "New-model rollouts taught on live assemblies and cutaway rigs, so technicians meet the platform before a customer vehicle does.",
      },
      {
        title: "Diagnostics & electronics",
        body: "Scan-tool workflows, sensor logic and fault-tree reasoning — taught on instrumented benches wired to real ECUs.",
      },
      {
        title: "Train-the-trainer",
        body: "We certify your internal masters so the programme keeps running long after our team demobilises.",
      },
      {
        title: "Service excellence",
        body: "Bay discipline, customer handover and documentation standards, benchmarked against your own audit scores.",
      },
    ],
    formats: ["On-site at your plant or dealership", "Mobile training unit", "Blended: digital theory + practical blocks"],
    outcomes: [
      { stat: "12,400", label: "Technicians certified" },
      { stat: "31%", label: "Drop in repeat repairs" },
      { stat: "4.2 days", label: "Average programme length" },
    ],
    gallery: ["engine-cohort", "diagnostics-console", "engine-stand-training", "component-demo", "cohort-classroom", "engine-teardown"],
  },
  {
    slug: "csr",
    index: "02",
    title: "CSR Programmes",
    short: "CSR",
    summary:
      "Fund-to-field delivery for corporate social responsibility mandates, with audit-ready reporting.",
    lede:
      "CSR money fails on delivery, not intent. We run the last mile — mobilisation, training, certification, placement and the evidence trail your board and auditors need — under one accountable partner.",
    ctaLabel: "Open CSR programmes",
    hero: "medical-camp",
    accent: "cyan",
    audience: [
      "CSR & sustainability teams",
      "Corporate foundations",
      "PSU community programmes",
      "Implementation partners",
    ],
    offerings: [
      {
        title: "Livelihood skilling",
        body: "Employment-linked courses chosen from district labour-demand data, not from what's convenient to teach.",
      },
      {
        title: "Community health camps",
        body: "Screening, vision and primary-care camps run alongside skilling, so a cohort's health doesn't end its training.",
      },
      {
        title: "Environment & green skills",
        body: "Plantation drives, clean-cooking transitions and waste-handling programmes with measured baselines.",
      },
      {
        title: "Impact measurement",
        body: "Geo-tagged attendance, third-party assessment and 90/180-day tracer studies as standard deliverables.",
      },
    ],
    formats: ["District-level cohorts", "Camp-based delivery", "Multi-year programme management"],
    outcomes: [
      { stat: "₹41 Cr", label: "CSR funds deployed" },
      { stat: "18,600", label: "Beneficiaries reached" },
      { stat: "100%", label: "Programmes audit-cleared" },
    ],
    gallery: ["medical-camp", "vision-screening", "tree-plantation", "medical-camp-community", "volunteer-cohort", "plantation-hands"],
  },
  {
    slug: "industry",
    index: "03",
    title: "Industry Solutions",
    short: "Industry",
    summary:
      "Shopfloor-grade training in welding, fabrication, machining, electrical and site safety.",
    lede:
      "A weld either holds or it doesn't. Industrial trades are graded against destructive tests and site standards, taught in workshops built to the same tolerances as the plants our trainees join.",
    ctaLabel: "Open industry solutions",
    hero: "welding-sparks",
    accent: "indigo",
    audience: [
      "Manufacturing & fabrication plants",
      "Infrastructure & construction firms",
      "EPC contractors",
      "Hydrocarbon & energy operators",
    ],
    offerings: [
      {
        title: "Welding & fabrication",
        body: "SMAW, MIG and TIG streams with weld-inspection theory, graded on visual and bend testing rather than attendance.",
      },
      {
        title: "CNC & machining",
        body: "Turning, milling and CNC programming on production-spec machines — setup, offsets, tooling and first-article inspection.",
      },
      {
        title: "Electrical & instrumentation",
        body: "Panel wiring, motor control, LOTO discipline and instrument calibration for plant maintenance roles.",
      },
      {
        title: "Safety & compliance",
        body: "Work-at-height, confined space, PPE regimes and toolbox-talk practice, mapped to your HSE framework.",
      },
    ],
    formats: ["Centre-based long-term courses", "In-plant short modules", "Assessment & certification only"],
    outcomes: [
      { stat: "9,800", label: "Trade certifications" },
      { stat: "94%", label: "First-attempt weld pass rate" },
      { stat: "0", label: "Lost-time injuries on programme" },
    ],
    gallery: ["welding-sparks", "cnc-operation", "welding-bay", "electrical-bench", "milling-practical", "sheet-metal-bench"],
  },
  {
    slug: "defence",
    index: "04",
    title: "Defence Programmes",
    short: "Defence",
    summary:
      "Technical training and resettlement pathways for serving personnel and veterans.",
    lede:
      "Service personnel already have discipline, maintenance instinct and the ability to work a checklist under pressure. We convert that into a civilian trade credential — and, where required, bring the classroom to the unit.",
    ctaLabel: "Open defence programmes",
    hero: "defence-engine-class",
    accent: "cyan",
    audience: [
      "Army, Navy & Air Force units",
      "Central Armed Police Forces",
      "Resettlement & DGR cells",
      "Veteran associations",
    ],
    offerings: [
      {
        title: "Vehicle & equipment maintenance",
        body: "Heavy-vehicle, generator and auxiliary-system maintenance taught on live engines inside our mobile units.",
      },
      {
        title: "Resettlement certification",
        body: "Recognition-of-prior-learning assessment that converts years of service experience into a portable NSQF credential.",
      },
      {
        title: "On-unit delivery",
        body: "Training brought to the station or garrison — no personnel movement, no operational disruption.",
      },
      {
        title: "Second-career placement",
        body: "Direct introductions into fleet, logistics and plant-maintenance roles that value service discipline.",
      },
    ],
    formats: ["On-unit mobile deployment", "Pre-retirement cohorts", "Veteran open batches"],
    outcomes: [
      { stat: "3,100", label: "Personnel trained" },
      { stat: "27", label: "Units & stations served" },
      { stat: "78%", label: "Placed within 6 months" },
    ],
    gallery: ["defence-engine-class", "defence-mobile-unit", "defence-assembly", "hcv-engine-bay", "van-engine-instruction", "mobile-classroom"],
  },
  {
    slug: "schools",
    index: "05",
    title: "School Solutions",
    short: "Schools",
    summary:
      "Vocational exposure, career labs and NSQF-aligned electives for Classes 9 to 12.",
    lede:
      "Most students choose a career from a list of four jobs they've heard of. We put tools in their hands early — so the choice is made from experience rather than hearsay.",
    ctaLabel: "Open school solutions",
    hero: "sheet-metal-bench",
    accent: "indigo",
    audience: [
      "CBSE, ICSE & state-board schools",
      "Government school clusters",
      "ITIs & polytechnics",
      "Education departments",
    ],
    offerings: [
      {
        title: "NSQF vocational electives",
        body: "Board-aligned trade subjects with the practical component actually delivered — equipment, consumables and instructors included.",
      },
      {
        title: "Career discovery labs",
        body: "Rotational workshops where a student handles six trades in six weeks before committing to one.",
      },
      {
        title: "Teacher capacity building",
        body: "Subject teachers trained and certified to run practicals confidently between our visits.",
      },
      {
        title: "Industry exposure visits",
        body: "Structured plant and workshop visits with pre-reading and debrief, not a day out.",
      },
    ],
    formats: ["Annual school partnership", "Cluster programmes", "Lab setup & handover"],
    outcomes: [
      { stat: "240", label: "Partner schools" },
      { stat: "31,000", label: "Students in labs" },
      { stat: "68%", label: "Report clearer career intent" },
    ],
    gallery: ["helmet-engine-lab", "safety-briefing", "engine-hands-on", "plumbing-workshop", "engine-briefing", "cnc-instruction"],
  },
  {
    slug: "micro-entrepreneurship",
    index: "06",
    title: "Micro-Entrepreneurship",
    short: "Micro-Entrepreneurship",
    summary:
      "Enterprise skilling that turns a trade into a running, bankable business.",
    lede:
      "A tailoring certificate is not an income. We take trainees past the skill into pricing, sourcing, credit-readiness and their first ten customers — so the enterprise still exists a year later.",
    ctaLabel: "Open micro-entrepreneurship",
    hero: "tailoring-floor",
    accent: "cyan",
    audience: [
      "Self-help groups & federations",
      "Rural livelihood missions",
      "Women's collectives",
      "Nano & micro enterprises",
    ],
    offerings: [
      {
        title: "Trade + enterprise bundle",
        body: "Tailoring, food processing, packaging or repair trades paired with unit costing, pricing and quality control.",
      },
      {
        title: "Credit & scheme readiness",
        body: "Documentation, bank linkage and scheme applications completed with the trainee, not explained at them.",
      },
      {
        title: "Market linkage",
        body: "Buyer introductions, aggregation support and packaging that survives a retail shelf.",
      },
      {
        title: "Twelve-month handholding",
        body: "Quarterly mentor visits through the first year, when most micro-enterprises quietly fail.",
      },
    ],
    formats: ["Village & cluster cohorts", "SHG federation programmes", "Incubation with mentor visits"],
    outcomes: [
      { stat: "5,400", label: "Enterprises started" },
      { stat: "71%", label: "Active after 12 months" },
      { stat: "2.3×", label: "Median income change" },
    ],
    gallery: ["tailoring-floor", "packaging-line", "tailoring-hands", "food-processing", "packaging-practical", "farm-implement"],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

/* ──────────────────────────────────────────────────────────
   How we work — the delivery method
   ────────────────────────────────────────────────────────── */
export const method = [
  {
    step: "01",
    title: "Diagnose the gap",
    body: "We start with the work, not the syllabus — shadowing the bay, the shopfloor or the district labour market until we can name the specific competency that's missing.",
    photo: "engine-briefing" as PhotoKey,
  },
  {
    step: "02",
    title: "Build the curriculum",
    body: "Every module is written backwards from an observable outcome, mapped to NSQF levels and your own quality gates, with practicals weighted at 70% of contact hours.",
    photo: "cnc-instruction" as PhotoKey,
  },
  {
    step: "03",
    title: "Deliver where the work is",
    body: "Fixed centres, in-plant blocks or a mobile training unit parked at your gate. The trainee shouldn't have to travel to learn what they'll do on site.",
    photo: "mobile-training-unit" as PhotoKey,
  },
  {
    step: "04",
    title: "Assess and place",
    body: "Third-party assessment, portable certification, then the part most providers skip: introductions, interviews and 90-day tracking into an actual job.",
    photo: "two-wheeler-lab" as PhotoKey,
  },
];

/* ──────────────────────────────────────────────────────────
   Leadership

   PLACEHOLDER CONTENT. The names below are not real and the bios describe the
   remit of each seat rather than anybody's career — inventing history for a
   real person is worse than leaving it blank. Replace `name`, `bio` and
   `linkedin`, then drop a portrait at public/team/<slug>.webp and set `photo`.
   Until `photo` is set the card falls back to a monogram plate, so the section
   is presentable with no imagery at all.
   ────────────────────────────────────────────────────────── */
export type Leader = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  linkedin?: string;
  /** Portrait path, e.g. "/team/asha-menon.webp". Omit for the monogram plate. */
  photo?: string;
};

export const leadership: Leader[] = [
  {
    slug: "founder",
    name: "Founder name",
    role: "Founder & Managing Director",
    bio: "Sets what YandNow will and will not take on. Owns the partner relationships that turn a mandate into a funded programme, and holds the line on the four rules above when a client would rather we bent them.",
    focus: ["Partnerships", "Programme strategy"],
  },
  {
    slug: "co-founder",
    name: "Co-founder name",
    role: "Co-founder & Director, Delivery",
    bio: "Runs everything between the signed scope and the certificate — centres, mobile units, trainer bench and the assessment calendar. Accountable for the numbers we publish on the Impact page being the ones the field actually returned.",
    focus: ["Delivery & operations", "Trainer capability"],
  },
];

/* ──────────────────────────────────────────────────────────
   Programme archive — real delivery history
   ────────────────────────────────────────────────────────── */
export type Programme = {
  year: string;
  title: string;
  partner: string;
  vertical: string;
  place: string;
  trades: string[];
  photos: PhotoKey[];
};

export const programmes: Programme[] = [
  {
    year: "2025–26",
    title: "Heavy commercial vehicle technician upskilling",
    partner: "TotalEnergies",
    vertical: "Corporate",
    place: "Multi-state, mobile units",
    trades: ["HCV maintenance", "Diagnostics"],
    photos: ["hcv-engine-bay", "hcv-hands-on", "mobile-classroom"],
  },
  {
    year: "2025–26",
    title: "Two-wheeler and tractor service network programme",
    partner: "Gulf Oil",
    vertical: "Corporate",
    place: "Gujarat · Karnataka",
    trades: ["2-wheeler", "Tractor", "HCV"],
    photos: ["two-wheeler-lab", "engine-cohort", "tractor-engine"],
  },
  {
    year: "2025–26",
    title: "Clean cooking transition and community skilling",
    partner: "TotalEnergies Foundation",
    vertical: "CSR",
    place: "Karnataka",
    trades: ["Clean cooking", "Community mobilisation"],
    photos: ["volunteer-cohort", "food-processing"],
  },
  {
    year: "2025–26",
    title: "Free vision screening and spectacles distribution",
    partner: "Essilor · OneSight",
    vertical: "CSR",
    place: "Meghalaya · Himachal Pradesh",
    trades: ["Vision screening", "Optometry support"],
    photos: ["vision-screening", "medical-camp-community"],
  },
  {
    year: "2024–25",
    title: "Allied healthcare and pathology technician training",
    partner: "BPCL",
    vertical: "CSR",
    place: "Madhya Pradesh",
    trades: ["Lab technician", "Phlebotomy"],
    photos: ["healthcare-lab", "pathology-training"],
  },
  {
    year: "2024–25",
    title: "Construction site safety and finishing trades",
    partner: "NAREDCO · Everest Industries",
    vertical: "Industry",
    place: "Maharashtra · Odisha",
    trades: ["Site safety", "Dry construction", "Electrical"],
    photos: ["site-safety-cohort", "electrical-safety", "safety-briefing"],
  },
  {
    year: "2024–25",
    title: "Training at your doorstep — mobile HCV programme",
    partner: "TotalEnergies · Ashok Leyland",
    vertical: "Corporate",
    place: "Telangana · Andhra Pradesh",
    trades: ["HCV maintenance"],
    photos: ["mobile-training-unit", "van-engine-instruction", "cohort-classroom"],
  },
  {
    year: "2023–24",
    title: "Defence personnel technical resettlement",
    partner: "TotalEnergies",
    vertical: "Defence",
    place: "Assam · Punjab",
    trades: ["Vehicle maintenance", "RPL certification"],
    photos: ["defence-engine-class", "defence-mobile-unit", "defence-assembly"],
  },
  {
    year: "2023–24",
    title: "Hydrocarbon sector welding and fabrication",
    partner: "Hydrocarbon SSC",
    vertical: "Industry",
    place: "Assam",
    trades: ["Welding", "Fabrication"],
    photos: ["welding-sparks", "welding-shopfloor"],
  },
  {
    year: "2023–24",
    title: "Rural livelihood and enterprise development",
    partner: "NABARD",
    vertical: "Micro-Entrepreneurship",
    place: "Madhya Pradesh",
    trades: ["Tailoring", "Enterprise management"],
    photos: ["tailoring-hands", "tailoring-floor"],
  },
  {
    year: "2022–23",
    title: "Automotive service dealer network training",
    partner: "ASDC · Veedol · IOCL",
    vertical: "Corporate",
    place: "Indore · Pune",
    trades: ["4-wheeler", "2-wheeler", "Lubricants"],
    photos: ["car-lift-training", "scooter-service", "undercarriage-check"],
  },
  {
    year: "2022–23",
    title: "Traditional medicine and food packaging enterprises",
    partner: "Skill Meghalaya",
    vertical: "Micro-Entrepreneurship",
    place: "Meghalaya",
    trades: ["Food processing", "Packaging", "Handicraft"],
    photos: ["packaging-line", "packaging-practical"],
  },
  {
    year: "2021–22",
    title: "CNC, welding and tractor mechanic trades",
    partner: "CRISP · GIZ",
    vertical: "Industry",
    place: "Bhopal",
    trades: ["CNC", "Welding", "Tractor", "2/4-wheeler"],
    photos: ["cnc-operation", "welding-bay", "milling-practical"],
  },
  {
    year: "2020–21",
    title: "Plumbing, RAC and sheet metal foundation courses",
    partner: "CRISP · Reliance Foundation",
    vertical: "Schools",
    place: "Bhopal",
    trades: ["Plumbing", "RAC", "Sheet metal"],
    photos: ["plumbing-workshop", "plumbing-practical", "sheet-metal-bench"],
  },
];

/* Client and partner marks now come from src/lib/brand.ts, generated from the
   artwork in public/y&now client logos by scripts/build-brand.mjs. */


export const testimonials = [
  {
    quote:
      "They did not hand us a curriculum and leave. Their trainers stood in our bays for three weeks until our own masters could run the module themselves.",
    name: "Service Network Head",
    org: "Commercial vehicle OEM",
  },
  {
    quote:
      "The reporting was the surprise. Geo-tagged attendance, third-party assessment, tracer study at 180 days — our auditors had nothing to ask for.",
    name: "CSR Lead",
    org: "Energy major",
  },
  {
    quote:
      "For our personnel approaching retirement, a portable certificate changes the conversation with employers entirely. The mobile unit meant nobody left the station.",
    name: "Resettlement Officer",
    org: "Central Armed Police Force",
  },
];

export const faqs = [
  {
    q: "How quickly can a programme start?",
    a: "A scoped short module can be on the ground in three weeks. Multi-district CSR programmes typically need six to eight weeks for mobilisation, baseline and centre readiness.",
  },
  {
    q: "Do you deliver at our site or yours?",
    a: "Both. We run fixed centres, deploy mobile training units with live engine rigs, and run in-plant blocks inside partner facilities. Delivery mode is chosen by where the work actually is.",
  },
  {
    q: "Which certifications do trainees receive?",
    a: "NSQF-aligned certification through the relevant Sector Skill Council, with third-party assessment. Where a partner requires their own credential, we run both in parallel.",
  },
  {
    q: "How is impact measured?",
    a: "Attendance and assessment data throughout, then placement verification at 90 days and a tracer study at 180. For enterprise programmes we track revenue and survival at 12 months.",
  },
  {
    q: "Can you absorb an existing programme mid-cycle?",
    a: "Yes. A significant share of our work is taking over stalled programmes — we audit what exists, retain what works and rebuild delivery around the remaining cohort.",
  },
];
