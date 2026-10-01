import type { PhotoKey } from "./photos";

export const site = {
  name: "Y&Now",
  legal: "BroadArks Technology Private Limited",
  tagline: "Learning that leads somewhere.",
  description:
    "Y&Now designs and delivers practical learning programmes for organisations, communities and learners — built around the role people actually do, then measured for what changed.",
  email: "info@broadarks.com",
  phone: "+91 75535 53372",
  address: [
    "Sagar Premium Tower, Phase I, Block C-1, CP-02",
    "JK Hospital Road, Kolar Road",
    "Bhopal 462042, Madhya Pradesh, India",
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/impact" },
  { label: "About", href: "/about" },
] as const;

/* ──────────────────────────────────────────────────────────
   The skills gap — published third-party figures, not our own
   delivery numbers. Values are display strings so StatNumber can
   keep the decimals and the "/100".
   ────────────────────────────────────────────────────────── */
export const metrics = [
  {
    value: "56.35%",
    label: "India's employability rate",
    note: "India Skills Report 2026",
  },
  {
    value: "57/100",
    label: "Student job-readiness confidence",
    note: "NIIT India Skills Gap Report 2026",
  },
  {
    value: "0.97%",
    label: "Share of 14–18 year-olds who have received institutional skilling",
    note: "Economic Survey 2025–26 coverage",
  },
] as const;

/* ──────────────────────────────────────────────────────────
   Audiences — "Find your route". Six have a solution page; the
   other two route to a conversation.
   ────────────────────────────────────────────────────────── */
export const otherRoutes = [
  {
    title: "Government and institutions",
    body: "Workforce readiness, employability and institutional learning programmes at scale.",
  },
  {
    title: "Learners",
    body: "Courses that take you into a job, a new role or a skill you did not have last month.",
  },
] as const;

export const whyChoose = [
  {
    title: "Industry-aligned programmes",
    body: "Built against how the sector actually works.",
  },
  {
    title: "Role-based assessment",
    body: "We measure against the job description, not a generic scale.",
  },
  {
    title: "Practical and blended delivery",
    body: "Classroom, virtual, digital, on-site — whichever fits the workforce.",
  },
  {
    title: "Designed around the workplace",
    body: "Content follows the task, the tools and the conditions.",
  },
  {
    title: "Digital learning and performance tools",
    body: "One platform for content, assessment and follow-through.",
  },
] as const;

/* ──────────────────────────────────────────────────────────
   Six solution areas
   ────────────────────────────────────────────────────────── */
export type Solution = {
  slug: string;
  index: string;
  title: string;
  short: string;
  /** One line, used on cards, menus and the homepage route list. */
  summary: string;
  /** Hero headline, already broken into display lines. */
  headline: string[];
  lede: string;
  /** The page's one primary action, e.g. "Design a corporate programme". */
  ctaLabel: string;
  /** Link label on index cards. Written per page: lowercasing a title would
   *  ruin the acronyms. */
  linkLabel: string;
  hero: PhotoKey;
  accent: "indigo" | "cyan";
  /** Three short facts under the hero. */
  meta: { label: string; value: string }[];
  coverIntro?: string;
  cover: string[];
  /** Narrative sections, rendered as numbered rows. */
  approach: { title: string; body: string[] }[];
  steps?: { eyebrow: string; title: string[]; items: { title: string; body: string }[] };
  list?: { eyebrow: string; title: string[]; intro?: string; items: string[] };
  stat?: { eyebrow: string; value: string; label: string; body?: string; source?: string };
  audience: string[];
  work?: { eyebrow: string; title: string[]; items: { client: string; body: string }[] };
  /** The single scope line — hedging lives here, once, not in every paragraph. */
  scope?: string;
  close: { title: string; body: string };
  gallery: PhotoKey[];
};

export const solutions: Solution[] = [
  {
    slug: "corporate",
    index: "01",
    title: "Corporate Training",
    short: "Corporate",
    summary:
      "Leadership, operations, customer experience and role-specific training that lifts team performance.",
    headline: ["Learning that helps", "teams perform better."],
    lede:
      "We strengthen workforce performance through practical training across leadership, operations, customer experience, digital adoption and role-specific skills.",
    ctaLabel: "Design a corporate programme",
    linkLabel: "Explore corporate training",
    hero: "engine-cohort",
    accent: "indigo",
    meta: [
      { label: "Where we start", value: "The job, not the syllabus" },
      { label: "Delivery", value: "Instructor-led · Virtual · Blended" },
      { label: "Measured by", value: "Applied performance" },
    ],
    cover: [
      "Leadership and people development",
      "Operational and role-based training",
      "Customer and sales capability",
      "Digital adoption and workplace skills",
      "Role-based assessment and skill-gap mapping",
      "Performance-linked learning",
    ],
    approach: [
      {
        title: "We start with the work",
        body: [
          "The right programme starts with what people actually have to do in their roles. Before we design anything, we look at four things: the job requirement, the current skill gap, the business priority behind it, and the outcome you want to see change.",
          "That is what separates training people attend from training that shifts something.",
        ],
      },
      {
        title: "How we deliver",
        body: [
          "Instructor-led, virtual, blended, digital and self-paced. Within those formats we use microlearning, scenario-based activity, hands-on practice and simulation — matched to the role rather than to a house style.",
        ],
      },
    ],
    steps: {
      eyebrow: "From assessment to performance",
      title: ["Three steps,", "one direction."],
      items: [
        { title: "Assess", body: "Role-based assessment identifies where the gaps actually sit." },
        { title: "Address", body: "Targeted learning goes after those gaps specifically." },
        {
          title: "Evidence",
          body: "Workplace tasks, manager feedback and performance measures show whether it is being applied.",
        },
      ],
    },
    audience: [
      "Individuals building a specific professional skill",
      "Teams improving performance in a shared area",
      "Business units closing a role or capability gap",
      "Enterprises rolling out workforce learning at scale",
    ],
    work: {
      eyebrow: "Corporate work in practice",
      title: ["Programmes we have", "built for teams."],
      items: [
        { client: "Tata Group", body: "Behavioural skills and productivity learning across diverse teams." },
        { client: "JSW", body: "Digital transformation and SCADA literacy for plant operations." },
        { client: "Castrol India", body: "Sales-force learning across dealer networks." },
        { client: "Bharat Petroleum (BPCL)", body: "Digital point-of-sale adoption and customer experience." },
        { client: "Jaquar", body: "Showroom customer engagement and brand excellence." },
      ],
    },
    close: {
      title: "Tell us the gap you are working on",
      body: "Give us the roles, the workforce group or the business priority. We will come back with an approach that fits it.",
    },
    gallery: ["engine-cohort", "diagnostics-console", "engine-stand-training", "component-demo", "cohort-classroom", "engine-teardown"],
  },
  {
    slug: "csr",
    index: "02",
    title: "CSR Programmes",
    short: "CSR",
    summary:
      "Skilling, livelihood and community programmes with clear delivery plans and reporting you can file.",
    headline: ["Programmes communities", "can actually use."],
    lede:
      "We work with corporates, foundations and institutions to design and deliver skill development, livelihood and community programmes — from needs assessment through to reporting.",
    ctaLabel: "Partner on a CSR programme",
    linkLabel: "Explore CSR programmes",
    hero: "medical-camp",
    accent: "cyan",
    meta: [
      { label: "Covers", value: "Need → Delivery → Reporting" },
      { label: "Focus", value: "Skills · Livelihood · Community" },
      { label: "Reporting", value: "Board- and audit-ready" },
    ],
    coverIntro:
      "Corporate Social Responsibility (CSR) programmes only hold up when the delivery underneath them does. We cover the full arc.",
    cover: [
      "Skill development and employability",
      "Livelihood and entrepreneurship",
      "Community development",
      "Veteran transition",
      "Participant assessment and tracking",
      "Employment and livelihood linkage",
    ],
    approach: [
      {
        title: "From community need to delivery",
        body: [
          "A strong programme starts with three things settled: a defined community, a clear need, and an intended outcome.",
          "From there we support needs assessment, programme design, participant mobilisation, learning delivery, assessment, monitoring and reporting.",
        ],
      },
      {
        title: "Why this matters",
        body: [
          "Community programmes need more than attendance registers. They need relevance, real participation, follow-through, and an honest view of what changed.",
        ],
      },
    ],
    list: {
      eyebrow: "Reporting you can file",
      title: ["The record your board", "will ask for."],
      intro:
        "Every programme produces the record your board, your auditors and your partners will ask for.",
      items: [
        "Participation records",
        "Beneficiary information",
        "Attendance",
        "Assessment results",
        "Progress updates",
        "Photographic evidence",
        "Outcome reporting",
      ],
    },
    audience: [
      "CSR teams",
      "Foundations",
      "Corporate sponsors",
      "Institutions planning skilling and livelihood programmes",
    ],
    scope:
      "Programme scope, including employment linkage and outcome reporting, is agreed with each partner at the start of the engagement.",
    close: {
      title: "Build a programme around your priorities",
      body: "Tell us the community, the geography, the objective and the outcome you are accountable for. We will help shape the route.",
    },
    gallery: ["medical-camp", "vision-screening", "tree-plantation", "medical-camp-community", "volunteer-cohort", "plantation-hands"],
  },
  {
    slug: "industry",
    index: "03",
    title: "Industry Solutions",
    short: "Industry",
    summary:
      "Technical, safety, quality and operational skills for specific plants, sites and roles.",
    headline: ["Learning built", "around the work."],
    lede:
      "We design workforce training around the technical, safety, quality and operational requirements of specific industries and specific roles.",
    ctaLabel: "Discuss an industry requirement",
    linkLabel: "Explore industry solutions",
    hero: "welding-sparks",
    accent: "indigo",
    meta: [
      { label: "Built around", value: "Role · Workflow · Tools" },
      { label: "Includes", value: "Technical · EHS · Quality" },
      { label: "Sectors", value: "Manufacturing and beyond" },
    ],
    cover: [
      "Technical and role-based skills",
      "Environment, Health and Safety (EHS) training",
      "Quality and process improvement",
      "Operational excellence",
      "Role-based assessment and competency tracking",
      "Digital and simulation-based learning",
    ],
    approach: [
      {
        title: "We study the job before we design the course",
        body: [
          "We look at the role, the workflow, the tools and the conditions people work in. Then we build learning around what they need to do — not just what they need to know.",
          "In an industrial environment that difference is not academic. It shows up in downtime, in defect rates and in incident reports.",
        ],
      },
      {
        title: "Manufacturing and precision engineering",
        body: [
          "We support workforce learning across manufacturing and precision-engineering environments: technical roles, plant operations, safety, quality, and the digital and process skills those roles increasingly require.",
        ],
      },
      {
        title: "From learning to workplace readiness",
        body: [
          "Participants are assessed against role requirements, trained against the gaps that assessment finds, and supported through workplace application. The sequence matters more than the content.",
        ],
      },
    ],
    list: {
      eyebrow: "Sectors we work across",
      title: ["Different floors,", "the same discipline."],
      intro:
        "Alongside technical training, we deliver the behavioural and communication skills these environments depend on.",
      items: [
        "Banking and financial services",
        "Construction",
        "Healthcare",
        "IT and IT-enabled services",
        "Retail",
        "Manufacturing",
      ],
    },
    stat: {
      eyebrow: "Where the demand is heading",
      value: "Digital, data and AI",
      label: "Consistently ranked among the most important future skills in recent India skills-gap reporting.",
    },
    audience: [
      "Plant managers",
      "EHS leaders",
      "Manufacturing HR teams",
      "Industrial leaders who need training that fits the job",
    ],
    close: {
      title: "Tell us about the role, the site or the shift",
      body: "Give us the operating context and we will come back with an approach built for it.",
    },
    gallery: ["welding-sparks", "cnc-operation", "welding-bay", "electrical-bench", "milling-practical", "sheet-metal-bench"],
  },
  {
    slug: "defence",
    index: "04",
    title: "Defence Programmes",
    short: "Defence",
    summary:
      "Veteran transition and in-service upskilling that carries experience into civilian roles.",
    headline: ["Experience that", "moves forward."],
    lede:
      "We support veteran transition and in-service upskilling — connecting the experience people already have with what civilian roles require.",
    ctaLabel: "Explore defence programmes",
    linkLabel: "Explore defence programmes",
    hero: "defence-engine-class",
    accent: "cyan",
    meta: [
      { label: "For", value: "Veterans · Serving personnel" },
      { label: "Approach", value: "Map existing experience" },
      { label: "Leads to", value: "Civilian career readiness" },
    ],
    cover: [
      "Civilian career readiness",
      "Role-aligned upskilling",
      "Employability skills",
      "Industry exposure",
      "Employer linkage",
    ],
    approach: [
      {
        title: "The experience is already there",
        body: [
          "Veterans arrive with discipline, leadership, responsibility under pressure and deep role-specific strength. What a transition programme has to do is translate — into civilian job requirements, workplace language and the few genuinely new skills the target role needs.",
          "That is a much shorter distance than most people assume. It just has to be mapped.",
        ],
      },
      {
        title: "For defence and institutional partners",
        body: [
          "We work with defence establishments, institutional partners and employers on programmes designed around the transition, reskilling or workforce requirement identified at the start of the engagement.",
        ],
      },
    ],
    steps: {
      eyebrow: "A practical transition route",
      title: ["Four steps from", "service to civilian work."],
      items: [
        { title: "Understand", body: "Start with the experience and skills already held." },
        { title: "Target", body: "Identify the civilian role being moved toward." },
        { title: "Map", body: "Find the gaps between the two, precisely." },
        {
          title: "Close",
          body: "Focus learning only on the capabilities that matter, then support the move into employment.",
        },
      ],
    },
    audience: [
      "Defence establishments",
      "Public sector HR teams",
      "Institutional partners",
      "Veterans preparing for their next career step",
    ],
    scope: "Employer linkage and placement support are agreed with each partner as part of the programme scope.",
    close: {
      title: "Start a defence programme conversation",
      body: "Tell us the cohort, the timeline and the roles they are moving toward.",
    },
    gallery: ["defence-engine-class", "defence-mobile-unit", "defence-assembly", "hcv-engine-bay", "van-engine-instruction", "mobile-classroom"],
  },
  {
    slug: "schools",
    index: "05",
    title: "School Solutions",
    short: "Schools",
    summary:
      "Vocational and applied skills that prepare students for work, not just for exams.",
    headline: ["Practical skills for", "what comes next."],
    lede:
      "We help schools build applied skills that prepare students for further education, for workplace entry, and for industries that keep changing shape.",
    ctaLabel: "Enquire about school programmes",
    linkLabel: "Explore school solutions",
    hero: "sheet-metal-bench",
    accent: "indigo",
    meta: [
      { label: "Focus", value: "Vocational · Applied skills" },
      { label: "Runs", value: "Alongside academics" },
      { label: "Adapts to", value: "Age group and pathway" },
    ],
    cover: [
      "Vocational and applied skills",
      "Industry exposure",
      "Teacher and facilitator support",
      "Assessment and certification",
    ],
    approach: [
      {
        title: "Learning beyond the classroom",
        body: [
          "Students learn faster when they can see where a skill is used. We combine classroom learning with practical application, assessment, and real exposure to how workplaces operate.",
        ],
      },
      {
        title: "Preparing students for the next step",
        body: [
          "Programmes run alongside academic learning rather than competing with it. Design adapts to the age group, the school's context and the pathway students are heading toward.",
        ],
      },
    ],
    stat: {
      eyebrow: "The number behind this page",
      value: "0.97%",
      label: "Share of 14–18 year-olds reported to have received institutional skilling.",
      source: "Economic Survey 2025–26 coverage",
    },
    audience: [
      "School principals",
      "Education leaders",
      "Institutional partners looking for applied learning programmes",
    ],
    close: {
      title: "Bring applied learning into your school",
      body: "Tell us the year groups, the timetable you are working within and what you want students to walk out able to do.",
    },
    gallery: ["helmet-engine-lab", "safety-briefing", "engine-hands-on", "plumbing-workshop", "engine-briefing", "cnc-instruction"],
  },
  {
    slug: "micro-entrepreneurship",
    index: "06",
    title: "Micro-Entrepreneurship",
    short: "Micro-Entrepreneurship",
    summary:
      "Practical learning for people building a livelihood, running a small business, or moving toward self-employment.",
    headline: ["Skills for livelihoods", "and small businesses."],
    lede:
      "Practical learning for people building a livelihood, running a small business, or moving toward self-employment.",
    ctaLabel: "Discuss a livelihood programme",
    linkLabel: "Explore micro-entrepreneurship",
    hero: "tailoring-floor",
    accent: "cyan",
    meta: [
      { label: "Covers", value: "Business · Digital · Customers" },
      { label: "Focus", value: "Skills used on day one" },
      { label: "Leads to", value: "Livelihood and self-employment" },
    ],
    cover: [
      "Entrepreneurship and livelihood skills",
      "Practical business operations",
      "Financial and workplace basics",
      "Digital skills for work and enterprise",
      "Customer and market-facing skills",
      "Assessment and structured progression",
    ],
    approach: [
      {
        title: "Learning that can be put to work on Monday",
        body: [
          "Entrepreneurship training only earns its place when participants can use it. Programmes focus on planning, understanding customers, running basic operations, using digital tools, and making the everyday decisions a small business actually turns on.",
        ],
      },
      {
        title: "From learning to livelihood",
        body: [
          "Learning connects to practical activity — applying business, digital and customer-facing skills in a real setting, with support while it is being tried for the first time.",
        ],
      },
    ],
    audience: [
      "Self-Help Group (SHG) facilitators",
      "Livelihood programme managers",
      "Partners working on income generation or market linkage",
    ],
    scope: "Market linkage and self-employment support are agreed as part of each programme scope.",
    close: {
      title: "Shape a livelihood programme",
      body: "Tell us the group, the geography and the income outcome you are working toward.",
    },
    gallery: ["tailoring-floor", "packaging-line", "tailoring-hands", "food-processing", "packaging-practical", "farm-implement"],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

/* ──────────────────────────────────────────────────────────
   For learners — lives on the Solutions page rather than its own
   route.
   ────────────────────────────────────────────────────────── */
export const learners = {
  headline: ["Learn a skill.", "Build your next step."],
  lede: "Practical, industry-relevant courses for getting into work, moving roles, or picking up something you did not have last month.",
  paths: [
    {
      title: "Getting into work",
      body: "Build the practical skills and confidence to land a first role.",
    },
    {
      title: "Changing direction",
      body: "Move into a new role or a new industry with skills that transfer.",
    },
    {
      title: "Getting better at what you do",
      body: "Add a specific capability to the work you are already doing.",
    },
  ],
  expect: [
    "Practical, industry-relevant learning",
    "Assessment and real feedback",
    "Digital and blended options",
    "Employer connections on selected programmes",
  ],
  audience: [
    "Students and early-career learners",
    "Professionals building a new skill",
    "People changing roles or industries",
    "Anyone who wants learning that leads to work",
  ],
  stat: {
    value: "57/100",
    label: "Job-readiness confidence reported among students.",
    body: "Most people feel underprepared. The fix is practice, not more theory.",
    source: "NIIT India Skills Gap Report 2026",
  },
} as const;

/* ──────────────────────────────────────────────────────────
   The Y&Now loop — five steps behind every programme
   ────────────────────────────────────────────────────────── */
export const method = [
  {
    step: "01",
    title: "Assess",
    body: "Understand the role, the people and the current skill level — so the programme starts from the real gap, not a generic syllabus.",
    photo: "engine-briefing" as PhotoKey,
  },
  {
    step: "02",
    title: "Learn",
    body: "Build the knowledge and the practical skill behind it, in the format that fits the people: classroom, virtual, digital or on-site.",
    photo: "cnc-instruction" as PhotoKey,
  },
  {
    step: "03",
    title: "Apply",
    body: "Put it to work on real tasks, in real conditions. Application is not the last stage of learning. It is the point of it.",
    photo: "mobile-training-unit" as PhotoKey,
  },
  {
    step: "04",
    title: "Perform",
    body: "Connect what was learned to workplace goals, with manager feedback and performance measures that show whether it stuck.",
    photo: "two-wheeler-lab" as PhotoKey,
  },
  {
    step: "05",
    title: "Improve",
    body: "Use evidence and feedback to sharpen the next cycle — then start again with better information than last time.",
    photo: "diagnostics-group" as PhotoKey,
  },
];

/* ──────────────────────────────────────────────────────────
   Case studies
   ────────────────────────────────────────────────────────── */
export const caseStudies = [
  {
    client: "Tata Group",
    area: "Corporate",
    body: "Behavioural skills and productivity learning across diverse teams.",
  },
  {
    client: "JSW Energy",
    area: "Industry",
    body: "Digital transformation and SCADA literacy for plant operations.",
  },
  {
    client: "Castrol India",
    area: "Corporate",
    body: "Sales-force learning across dealer networks.",
  },
  {
    client: "Bharat Petroleum (BPCL)",
    area: "Corporate",
    body: "Digital point-of-sale adoption and customer experience for fuel station staff.",
  },
  {
    client: "Jaquar",
    area: "Corporate",
    body: "Showroom customer engagement and brand excellence.",
  },
] as const;

/** The three the homepage leads with. */
export const featuredWork = ["JSW Energy", "Tata Group", "Bharat Petroleum (BPCL)"] as const;

export const storyFormat = [
  { title: "Client", body: "Who they are and what they do." },
  { title: "Need", body: "The requirement or gap they came to us with." },
  { title: "Programme", body: "What we designed." },
  { title: "Delivery", body: "How it reached people." },
  { title: "Outcome", body: "The verified result." },
  { title: "Testimonial", body: "In their words, where available." },
] as const;

/* ──────────────────────────────────────────────────────────
   About
   ────────────────────────────────────────────────────────── */
export const beliefs = [
  {
    title: "Learning should feel useful",
    body: "If a participant cannot say what it was for, it was not designed properly.",
  },
  {
    title: "Skills should move people forward",
    body: "A certificate is a record. A capability is an outcome.",
  },
  {
    title: "Good training leads to real change",
    body: "We design for what happens after the session, not during it.",
  },
  {
    title: "People learn best when the path is clear",
    body: "Every programme should have a visible start, middle and next step.",
  },
  {
    title: "Confidence grows when learning meets the real world",
    body: "Application is not the last stage. It is the point.",
  },
] as const;

/* ──────────────────────────────────────────────────────────
   Leadership and advisers. Portraits are optional: drop one at
   public/team/<slug>.webp and set `photo`. Until then the card
   falls back to a monogram plate.
   ────────────────────────────────────────────────────────── */
export type Leader = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  linkedin?: string;
  /** Portrait path, e.g. "/team/pankaj-dutta.webp". Omit for the monogram plate. */
  photo?: string;
};

export const leadership: Leader[] = [
  {
    slug: "pankaj-dutta",
    name: "Pankaj Dutta",
    role: "Founder and Chief Executive Officer",
    bio: "More than 17 years across media, business and strategy. He built Y&Now on a straightforward conviction: skilling is what turns education into employability.",
    focus: ["Strategy", "Partnerships"],
    linkedin: "https://www.linkedin.com/in/dutta-pankaj",
  },
  {
    slug: "kaveri-dutta",
    name: "Dr Kaveri Dutta",
    role: "Co-Founder and Chief Learning Officer",
    bio: "More than 15 years in learning and development, curriculum design and learner engagement. She leads how every Y&Now programme is built and taught.",
    focus: ["Curriculum design", "Learner engagement"],
    linkedin: "https://www.linkedin.com/in/dr-kaveri-dutta-87731b25",
  },
  {
    slug: "tarun-abbhani",
    name: "Tarun Abbhani",
    role: "Chief Financial Officer",
    bio: "A Chartered Accountant with more than 14 years in finance leadership and operational strategy. He keeps delivery commercially sound at scale.",
    focus: ["Finance", "Operations"],
  },
  {
    slug: "souri-mukherjee",
    name: "Souri Mukherjee",
    role: "Head of Financial Planning and Analysis, IT and Cloud Solutions",
    bio: "24 years across consumer and brand environments, with an analytical, problem-solving approach to systems and reporting.",
    focus: ["FP&A", "IT and cloud"],
  },
];

export const advisers = [
  {
    name: "Pradeep Narayanan",
    bio: "More than 26 years in the development sector across health, education, child protection and gender.",
  },
  {
    name: "Brajendra Gupta",
    bio: "An entrepreneur who has built businesses on the belief that skill development widens who gets an opportunity at all.",
  },
] as const;

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
    q: "What does Y&Now do?",
    a: "We design and deliver practical learning programmes for organisations, communities and individual learners.",
  },
  {
    q: "Who is Y&Now for?",
    a: "Corporate teams, CSR partners, industry groups, defence and institutional partners, schools, and learners building their own next step.",
  },
  {
    q: "How does Y&Now work?",
    a: "We follow one loop: assess, learn, apply, perform, improve — then start the next cycle with better evidence.",
  },
  {
    q: "Do you have your own platform?",
    a: "Yes. The Y&Now platform brings digital learning, role-based assessment and performance tracking into one system.",
  },
];

/* Contact form — "What is this about?" */
export const enquiryTypes = [
  "Corporate workforce training",
  "CSR programme",
  "Industry training",
  "Defence and veteran programmes",
  "School programmes",
  "Micro-entrepreneurship and livelihoods",
  "Platform demonstration",
  "Learner enquiry",
  "General enquiry",
] as const;
