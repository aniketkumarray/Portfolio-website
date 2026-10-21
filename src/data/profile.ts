import type { Award, Certification, Education, Experience, Project, Skill, Stat } from './types'

/**
 * Single source of truth for all site content.
 * Edit this file to change copy; components never hard-code profile data.
 */
export const profile = {
  name: 'Aniket Kumar Ray',
  firstName: 'Aniket',
  role: 'Product Manager',
  roleLine: 'Product Manager · AI Products · B2B / B2C SaaS',
  tagline: 'I turn messy business problems into AI products people actually adopt.',
  pitch:
    'Four years owning discovery to adoption across ERP, LMS and CRM platforms. Now designing human-in-the-loop AI systems that earn trust before they earn scale.',
  location: 'Mumbai, India',
  timezone: 'Asia/Kolkata',
  email: 'aniketkumar.ray@gmail.com',
  phone: '+91 70173 70671',
  linkedin: 'https://www.linkedin.com/in/aniket-kumar-ray/',
  github: 'https://github.com/aniketkumarray',
  tableau: 'https://public.tableau.com/app/profile/aniket.kumar.ray',
  instagram: 'https://www.instagram.com/rayclicks.1/',
  instagramHandle: '@rayclicks.1',
  resumeUrl: '/Aniket_Kumar_Ray_Resume.pdf',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://aniketkumarray.vercel.app',
  availability: 'Open to opportunities',
  about: [
    "I'm a Product Manager with 4+ years of product ownership across ERP, LMS, CRM and SaaS platforms. I own the full product lifecycle: discovery, roadmaps, PRDs/BRDs, backlog prioritisation, Agile delivery, UAT and measurement.",
    'I combine product strategy with hands-on technical execution — leading the data analytics team, building SQL/Tableau insights, and prototyping rapidly using Lovable, Claude Code and Codex to test concepts and ship production-ready ideas faster.',
  ],
  stats: [
    { label: 'Years experience', value: 5, suffix: '+' },
    { label: 'Years in product', value: 4, suffix: '+' },
    { label: 'Product documents', value: 209, suffix: '+' },
    { label: 'Platforms owned', value: 6 },
  ] as Stat[],
  competencies: [
    'Product Strategy & Roadmapping',
    'Discovery & User Research',
    'PRDs / BRDs & User Stories',
    'Backlog Prioritisation',
    'Agile / Scrum',
    'OKRs, KPIs & Product Analytics',
    'UAT & Release',
    'Stakeholder Management',
    'GTM & Adoption',
    'AI / LLM Product Design',
    'RAG & Grounding',
    'Human-in-the-Loop Evaluation',
    'Guardrails',
    'Model Selection & Unit Economics',
  ],
}

export const experience: Experience[] = [
  {
    company: 'Itvedant Education Pvt. Ltd.',
    role: 'Product Manager / Business Analyst',
    period: 'Jan 2024 — Present',
    location: 'Mumbai, India',
    summary: 'Product owner for Pulse (ERP/CRM), Wingz (LMS) and itvedant.com.',
    bullets: [
      'Own roadmap and delivery across three core platforms, converting business problems into prioritised requirements, Figma flows, acceptance criteria, UAT plans, releases and adoption support.',
      'Authored 209 product documents (55 BRDs, 136 change requests, RCAs and supporting specs) across learning, admissions, placement, HR, finance and support, partnering with business, design and engineering from discovery through demos, training and rollout.',
      'Built payment and reimbursement systems from scratch that have processed 8,000+ requests worth over ₹40 Cr since March 2026, with approval chains, policy validation and reconciliation.',
      'Designed an Employee Exit System, live since December 2025, that has handled 362 exits and met the Full & Final settlement deadline 94% of the time.',
      'Launched an AI voice agent for cold calling and lead qualification in collaboration with Thinkly AI, lifting lead conversion by 25–30% post-deployment.',
      'Designed a human-in-the-loop AI Assignment Checker for ~75,000 monthly submissions with shadow-mode validation, confidence-based routing, trainer-review SLAs and learner appeals before any automatic rejection.',
      'Specified an auditable Resume Recommender (60% skill match / 15% resume quality / 25% 3A score) and cut LLM cost by limiting calls to on-demand job-skill extraction instead of per-candidate scoring.',
      'Defined Wingz RAG support with linked sources, no-answer fallbacks, ticket escalation and feedback capture; ran a 1–2 branch pilot with weekly accuracy, resolution and satisfaction reviews.',
      'Designed demand-based job sourcing for 21 branches using n8n and Apollo, allocating an 84-credit daily budget, rotating priority skills, de-duplicating leads and gating on Corporate Relations approval.',
      'Led requirements and rollout for placement and interview tracking, job boards, self-placement, referrals, UPI reconciliation, ticketing, HR/RBAC workflows and QR-verifiable certificates.',
    ],
    stack: ['Jira', 'Figma', 'SQL Server', 'PostHog', 'n8n', 'Apollo', 'Gemini', 'OpenRouter', 'AnythingLLM'],
  },
  {
    company: 'Akshat IT Solution Pvt. Ltd.',
    role: 'Product Manager / Tableau Developer',
    period: 'Jul 2022 — Jan 2024',
    location: 'Delhi, India',
    summary: 'Owned a three-product SaaS portfolio: EIZY inventory & billing, Achiever school ERP and EduCon lead management.',
    bullets: [
      'Owned roadmaps for EIZY, Achiever and EduCon end to end, from stakeholder discovery and process mapping through Agile delivery, deployment and adoption.',
      'Reduced billing errors by 27% and improved inventory accuracy by 29% through SQL and Tableau reporting that exposed root causes to operations teams.',
      'Delivered analytics-led recommendations that lifted classroom-facility utilisation by 10%, parental engagement by 15% and EduCon lead conversion by 20%.',
    ],
    stack: ['Tableau Prep', 'Tableau Server', 'SQL', 'Oracle', 'Jira', 'Agile'],
  },
  {
    company: 'eClerx Services Ltd.',
    role: 'Associate Process Manager',
    period: 'Apr 2021 — Jun 2022',
    location: 'Navi Mumbai, India',
    summary: 'Ran FX-settlement, repo-billing and middle-office exception workflows for a global investment bank client.',
    bullets: [
      'Managed FX-settlement, repo-billing and middle-office exception workflows; built SQL/Tableau reporting for operational control and stakeholder visibility.',
      'Kept error escalations below 0.5% and cut unmatched-trade and error-resolution time by 40% through process redesign.',
      'Documented SOPs for 3 processes that became the onboarding material for new team members.',
    ],
    stack: ['SQL', 'Tableau', 'Excel', 'Process design'],
  },
]

export const education: Education[] = [
  {
    school: 'Pune Institute of Business Management',
    degree: 'PGDM, Finance',
    period: '2019 — 2021',
    highlights: ['CGPA 9.39', 'Specialised in financial analysis and product economics'],
  },
  {
    school: 'DIT University',
    degree: 'B.E., Computer Science',
    period: '2015 — 2019',
    highlights: ['CGPA 7.13', 'Foundation in data structures, databases and systems'],
  },
]

export const certifications: Certification[] = [
  { name: 'Google Data Analytics Professional Certificate', issuer: 'Google · Coursera' },
  { name: 'Data Visualization with Tableau', issuer: 'UC Davis · Coursera' },
  { name: 'CISI Levels 1–3', issuer: 'Chartered Institute for Securities & Investment' },
  { name: 'CFA Investment Foundations', issuer: 'CFA Institute' },
  { name: 'Excel Fundamentals', issuer: 'Corporate Finance Institute' },
]

export const awards: Award[] = [
  {
    title: 'Tech Catalyst — Winner',
    issuer: 'Itvedant · Ignitive Annual Awards · FY 2025–26',
    description: 'Recognised for driving AI-led product work across Wingz and Pulse: assignment evaluation, RAG support and sourcing automation.',
    image: '/awards/tech-catalyst-fy25-26.webp',
  },
  {
    title: 'Most Organised — Qualifier',
    issuer: 'Itvedant · Ignitive Annual Awards · FY 2024–25',
    description: 'Shortlisted for running the product operating system behind 209 shipped requirement and change documents.',
    image: '/awards/most-organised-fy24-25.webp',
  },
  {
    title: 'Exceeding Expectations — Winner',
    issuer: 'Itvedant · Annual Awards · FY 2023–24',
    description: 'Won for delivery across placement tracking, UPI reconciliation and HR / RBAC workflows in the first year.',
    image: '/awards/exceeding-expectations-fy23-24.webp',
  },
  {
    title: 'Dashing Debut',
    issuer: 'Itvedant · February 2024',
    description: 'Awarded within the first weeks for the fastest ramp-up to product ownership on three live platforms.',
    image: '/awards/dashing-debut-fy23-24.webp',
  },
]

export const skills: Record<string, { label: string; index: string; items: Skill[] }> = {
  product: {
    label: 'Product craft',
    index: '01',
    items: [
      { name: 'Discovery & research', level: 'Daily' },
      { name: 'PRDs / BRDs', level: 'Daily', note: '57 shipped at Itvedant' },
      { name: 'Roadmapping', level: 'Daily' },
      { name: 'Prioritisation', level: 'Daily' },
      { name: 'UAT & release', level: 'Daily' },
      { name: 'Stakeholder management', level: 'Daily' },
      { name: 'GTM & adoption', level: 'Comfortable' },
      { name: 'OKRs & KPIs', level: 'Comfortable' },
    ],
  },
  ai: {
    label: 'AI product design',
    index: '02',
    items: [
      { name: 'LLM product design', level: 'Daily' },
      { name: 'RAG & grounding', level: 'Daily', note: 'Wingz support pilot' },
      { name: 'Human-in-the-loop eval', level: 'Daily', note: '75K submissions / month' },
      { name: 'Guardrails & fallbacks', level: 'Comfortable' },
      { name: 'Model selection', level: 'Comfortable' },
      { name: 'Unit economics', level: 'Comfortable' },
      { name: 'Prompt design', level: 'Comfortable' },
      { name: 'Fine-tuning', level: 'Familiar' },
    ],
  },
  data: {
    label: 'Data & analytics',
    index: '03',
    items: [
      { name: 'SQL Server / Oracle', level: 'Daily' },
      { name: 'Tableau Prep / Server', level: 'Daily' },
      { name: 'PostHog', level: 'Comfortable' },
      { name: 'Python / Pandas', level: 'Comfortable' },
      { name: 'Excel modelling', level: 'Daily' },
      { name: 'Experiment design', level: 'Comfortable' },
    ],
  },
  build: {
    label: 'Prototyping & tools',
    index: '04',
    items: [
      { name: 'Figma', level: 'Daily' },
      { name: 'Jira', level: 'Daily' },
      { name: 'Next.js', level: 'Comfortable' },
      { name: 'Supabase', level: 'Comfortable' },
      { name: 'n8n automation', level: 'Comfortable' },
      { name: 'REST APIs', level: 'Comfortable' },
      { name: 'Git', level: 'Comfortable' },
      { name: 'AnythingLLM / Gemini / OpenRouter', level: 'Comfortable' },
    ],
  },
}

/** Self-hosted logos under /public/tools — shown in the About "Tools I reach for" marquee. */
export const tools: { name: string; src: string; invert?: boolean }[] = [
  { name: 'Antigravity', src: '/tools/antigravity.webp' },
  { name: 'Claude Code', src: '/tools/claude.svg' },
  { name: 'Codex', src: '/tools/codex.svg' },
  { name: 'OpenRouter', src: '/tools/openrouter.svg' },
  { name: 'Groq', src: '/tools/groq_logo.webp' },
  { name: 'Hugging Face', src: '/tools/huggingface-color.webp' },
  { name: 'Supabase', src: '/tools/supabase.svg' },
  { name: 'Vercel', src: '/tools/vercel.svg' },
  { name: 'Tableau', src: '/tools/tableau.svg' },
  { name: 'Figma', src: '/tools/figma.svg' },
  { name: 'Jira', src: '/tools/jira.svg' },
  { name: 'Notion', src: '/tools/notion.svg' },
  { name: 'Lightroom', src: '/tools/lightroom.svg' },
  { name: 'Photoshop', src: '/tools/photoshop.svg' },
  { name: 'Clipchamp', src: '/tools/clipchamp.webp' },
]

/** Portraits of Aniket — cross-faded in the About profile card. */
export const portraits = [
  { src: '/portraits/portrait-1.webp', alt: 'Aniket in a black suit' },
  { src: '/portraits/portrait-2.webp', alt: 'Aniket at a hill viewpoint' },
  { src: '/portraits/portrait-3.webp', alt: 'Aniket with a BMW adventure motorcycle' },
  { src: '/portraits/portrait-4.webp', alt: 'Aniket in a sherwani' },
  { src: '/portraits/portrait-5.webp', alt: 'Aniket on a monsoon trek' },
]

/** Photography from instagram.com/rayclicks.1 — shown in the About "Through my lens" card. */
export const photos = [
  { src: '/photos/ig11.webp', alt: 'Hawa Mahal lit up at night, Jaipur' },
  { src: '/photos/ig01.webp', alt: 'Macro of a marigold, Varanasi' },
  { src: '/photos/ig12.webp', alt: 'City Palace mirrored in still water, Jaipur' },
  { src: '/photos/ig03.webp', alt: 'Ganga ghats at night from a boat' },
  { src: '/photos/ig04.webp', alt: 'Evening Ganga aarti under lit umbrellas' },
  { src: '/photos/ig13.webp', alt: 'Panna Meena ka Kund stepwell, Jaipur' },
  { src: '/photos/ig02.webp', alt: 'Looking up between Mumbai towers' },
  { src: '/photos/ig09.webp', alt: 'Raindrop on a leaf' },
  { src: '/photos/ig06.webp', alt: 'Fishing boats at dusk, Mumbai harbour' },
  { src: '/photos/ig05.webp', alt: 'Temple complex under a wide sky' },
  { src: '/photos/ig08.webp', alt: 'Forest path in evening light' },
  { src: '/photos/ig07.webp', alt: 'Tiny-planet view of a tree canopy' },
]

export const projects: Project[] = [
  {
    slug: 'payment-reimbursement-system',
    title: 'Payment & Reimbursement System',
    kicker: '₹40+ Cr processed across 8,000+ requests',
    summary:
      'A from-scratch expense and reimbursement platform with policy validation, multi-step approvals and reconciliation — processing real money at scale since March 2026.',
    category: 'Platforms',
    featured: true,
    role: 'Product owner · built from scratch — requirements, approval design, reconciliation',
    timeline: '2025 — Present',
    context: 'Itvedant · Finance',
    stack: ['Approval chains', 'Policy engine', 'SQL Server', 'Reconciliation', 'Figma', 'Jira'],
    image: '/covers/payment-reimbursement-system.webp',
    problem: [
      'Expense claims and reimbursements were handled over email and spreadsheets, so approvals stalled, policy breaches slipped through, and finance had no reliable audit trail against real money.',
      'Any system touching ₹40+ Cr of payouts has to be correct, traceable and policy-safe before it is fast.',
    ],
    approach: [
      'Designed the request lifecycle end to end: submission, policy validation, multi-step approval chains by amount and category, payout and reconciliation.',
      'Encoded expense policy as validation rules so out-of-policy claims are caught at entry instead of after payment.',
      'Built reconciliation back to finance records so every rupee paid maps to an approved, auditable request.',
      'Owned requirements, acceptance criteria, UAT and rollout with finance and engineering.',
    ],
    results: [
      'Processed 8,000+ expense and reimbursement requests worth over ₹40 Cr since March 2026.',
      'Replaced email-and-spreadsheet chaos with an auditable, policy-enforced pipeline finance can trust.',
      'Gave approvers a clear queue and finance a reconciled, exportable record for every payout.',
    ],
    metrics: [
      { value: '₹40+ Cr', label: 'processed to date' },
      { value: '8,000+', label: 'requests handled' },
      { value: '100%', label: 'policy-validated at entry' },
    ],
    architecture: {
      nodes: [
        { id: 'submit', label: 'Request', sub: 'expense / reimb.' },
        { id: 'policy', label: 'Policy engine', sub: 'validation rules' },
        { id: 'approve', label: 'Approval chain', sub: 'by amount / category' },
        { id: 'payout', label: 'Payout' },
        { id: 'recon', label: 'Reconciliation', sub: 'audit trail' },
      ],
      edges: [
        { from: 'submit', to: 'policy' },
        { from: 'policy', to: 'approve', label: 'in policy' },
        { from: 'policy', to: 'submit', label: 'rejected' },
        { from: 'approve', to: 'payout' },
        { from: 'payout', to: 'recon' },
      ],
    },
  },
  {
    slug: 'employee-exit-system',
    title: 'Employee Exit System',
    kicker: '362 exits, Full & Final on time 94% of the time',
    summary:
      'An end-to-end offboarding workflow — clearances, asset recovery and Full & Final settlement — that turned a deadline-prone manual process into a tracked, accountable one.',
    category: 'Platforms',
    featured: true,
    role: 'Product owner · workflow design, SLAs, FNF tracking',
    timeline: '2025 — Present',
    context: 'Itvedant · HR & Finance',
    stack: ['Workflow', 'RBAC', 'SLA tracking', 'SQL Server', 'Figma', 'Jira'],
    image: '/covers/employee-exit-system.webp',
    problem: [
      'Offboarding ran across HR, IT, finance and managers with no shared tracker, so clearances slipped and Full & Final settlements routinely missed their statutory deadline.',
      'A late FNF is a compliance and trust problem, not just an ops delay.',
    ],
    approach: [
      'Mapped the exit journey into a single workflow: resignation, multi-department clearances, asset recovery and FNF settlement.',
      'Assigned each stage an owner and SLA with role-based access, so nothing waits on an unclear hand-off.',
      'Surfaced the FNF deadline as the system\'s headline metric, with visibility into what is blocking each pending exit.',
    ],
    results: [
      'Live since December 2025, handling 362 exits through a single accountable pipeline.',
      'Met the Full & Final settlement deadline 94% of the time — up from an unreliable manual baseline.',
      'Gave HR and finance a real-time view of every exit and its blockers.',
    ],
    metrics: [
      { value: '362', label: 'exits processed' },
      { value: '94%', label: 'FNF deadline met' },
      { value: 'Dec 2025', label: 'live in production' },
    ],
    architecture: {
      nodes: [
        { id: 'resign', label: 'Resignation', sub: 'initiated' },
        { id: 'clear', label: 'Clearances', sub: 'HR · IT · finance' },
        { id: 'asset', label: 'Asset recovery' },
        { id: 'fnf', label: 'FNF settlement', sub: 'deadline-tracked' },
        { id: 'sla', label: 'SLA + blockers', sub: 'owner per stage' },
        { id: 'done', label: 'Exit complete' },
      ],
      edges: [
        { from: 'resign', to: 'clear' },
        { from: 'clear', to: 'asset' },
        { from: 'asset', to: 'fnf' },
        { from: 'sla', to: 'clear', label: 'tracks' },
        { from: 'sla', to: 'fnf', label: 'tracks' },
        { from: 'fnf', to: 'done' },
      ],
    },
  },
  {
    slug: 'ai-voice-agent',
    title: 'AI Voice Agent for Lead Conversion',
    kicker: '25–30% lift in lead conversion after deployment',
    summary:
      'An AI voice agent that runs first-touch cold calls, qualifies interest and hands warm leads to counsellors — built in collaboration with Thinkly AI.',
    category: 'AI Products',
    featured: true,
    role: 'Product owner · call-flow design, qualification logic, CRM handoff, rollout',
    timeline: '2026',
    context: 'Itvedant × Thinkly AI',
    stack: ['Thinkly AI', 'Voice LLM', 'Pulse CRM', 'Call scripting', 'Lead scoring', 'Jira'],
    image: '/covers/ai-voice-agent.webp',
    problem: [
      'Admissions counsellors spent most of their day on first-touch cold calls, so genuinely interested leads waited hours or days for a human conversation.',
      'Call quality varied by counsellor and shift, and there was no consistent record of why a lead did or did not convert.',
    ],
    approach: [
      'Partnered with Thinkly AI on a voice agent that makes the first call, follows a structured conversation and captures intent, course interest and preferred time.',
      'Designed the qualification logic and guardrails: what the agent may claim, when it must stop, and when it hands off to a human.',
      'Wired warm leads straight into Pulse CRM with the call summary attached, so counsellors open every conversation with context.',
      'Rolled out in phases with weekly reviews of connect rate, qualification accuracy and downstream conversion against a human-only control.',
    ],
    results: [
      'Lead conversion rose 25–30% after deployment compared with the human-only cold-calling baseline.',
      'Counsellors now spend their time on qualified, context-rich conversations instead of dialling cold lists.',
      'Every call leaves a structured summary in CRM, giving admissions a consistent view of objections and intent.',
    ],
    metrics: [
      { value: '25–30%', label: 'lift in lead conversion' },
      { value: 'First touch', label: 'handled by the agent' },
      { value: 'CRM', label: 'summary on every call' },
    ],
    architecture: {
      nodes: [
        { id: 'leads', label: 'Lead list', sub: 'Pulse CRM' },
        { id: 'agent', label: 'Voice agent', sub: 'Thinkly AI' },
        { id: 'qualify', label: 'Qualification', sub: 'intent + interest' },
        { id: 'handoff', label: 'Counsellor', sub: 'warm handoff' },
        { id: 'summary', label: 'Call summary', sub: 'back to CRM' },
      ],
      edges: [
        { from: 'leads', to: 'agent' },
        { from: 'agent', to: 'qualify' },
        { from: 'qualify', to: 'handoff', label: 'qualified' },
        { from: 'qualify', to: 'summary', label: 'not now' },
        { from: 'handoff', to: 'summary' },
      ],
    },
  },
  {
    slug: 'ai-assignment-checker',
    title: 'AI Assignment Checker',
    kicker: 'Human-in-the-loop grading at 75K submissions a month',
    summary:
      'An AI evaluator that never rejects a learner on its own. Shadow-mode validation, confidence routing and trainer SLAs made automation safe enough to ship.',
    category: 'AI Products',
    featured: true,
    role: 'Product owner · requirements, evaluation design, rollout',
    timeline: '2024 — 2025',
    context: 'Itvedant · Wingz LMS',
    stack: ['Gemini', 'OpenRouter', 'Confidence routing', 'PostHog', 'SQL Server', 'Figma'],
    image: '/covers/ai-assignment-checker.webp',
    problem: [
      'Trainers were manually reviewing roughly 75,000 assignment submissions every month, creating multi-day feedback delays and inconsistent grading across 21 branches.',
      'A naive "let the model grade it" approach risked wrongly rejecting learners, which in an education product is a trust-destroying failure mode.',
    ],
    approach: [
      'Ran the evaluator in shadow mode first: the model graded silently alongside trainers so we could measure agreement before any learner saw an AI decision.',
      'Designed confidence-based routing. High-confidence passes auto-approve; low-confidence or failing results route to a trainer queue with a review SLA.',
      'Added a learner appeal path and made automatic rejection impossible without a human decision, with every decision logged for audit.',
      'Defined the rubric prompts, evaluation metrics and weekly calibration review with the academic team.',
    ],
    results: [
      'Specified a system capable of absorbing ~75K monthly submissions while keeping trainers in the loop only where their judgment adds value.',
      'Shadow-mode agreement data became the gating criterion for expansion, giving leadership a quantitative go / no-go instead of a leap of faith.',
      'Established the evaluation and guardrail pattern reused in later AI features across Wingz.',
    ],
    metrics: [
      { value: '75K', label: 'submissions / month' },
      { value: '0', label: 'auto-rejections without review' },
      { value: '21', label: 'branches in scope' },
    ],
    architecture: {
      nodes: [
        { id: 'submit', label: 'Learner submission', sub: 'Wingz LMS' },
        { id: 'llm', label: 'LLM evaluator', sub: 'rubric prompt' },
        { id: 'conf', label: 'Confidence router' },
        { id: 'auto', label: 'Auto-approve', sub: 'high confidence' },
        { id: 'trainer', label: 'Trainer review', sub: 'SLA queue' },
        { id: 'appeal', label: 'Learner appeal' },
        { id: 'log', label: 'Audit + metrics', sub: 'PostHog / SQL' },
      ],
      edges: [
        { from: 'submit', to: 'llm' },
        { from: 'llm', to: 'conf' },
        { from: 'conf', to: 'auto', label: 'pass ≥ threshold' },
        { from: 'conf', to: 'trainer', label: 'low / fail' },
        { from: 'trainer', to: 'appeal' },
        { from: 'auto', to: 'log' },
        { from: 'trainer', to: 'log' },
      ],
    },
  },
  {
    slug: 'resume-recommender',
    title: 'Resume Recommender',
    kicker: 'Auditable candidate matching without per-candidate LLM calls',
    summary:
      'A transparent 60 / 15 / 25 scoring model that placement teams can explain to employers, with LLM usage limited to on-demand skill extraction.',
    category: 'AI Products',
    featured: true,
    role: 'Product owner · scoring model, cost design, placement workflow',
    timeline: '2024',
    context: 'Itvedant · Pulse placement module',
    stack: ['Scoring model', 'LLM skill extraction', 'SQL Server', 'Figma', 'Jira'],
    image: '/covers/resume-recommender.webp',
    problem: [
      'Placement coordinators were hand-matching thousands of learner resumes to incoming job descriptions, and employers could not understand why a candidate was recommended.',
      'Scoring every candidate with an LLM per job would have been slow, expensive and impossible to audit.',
    ],
    approach: [
      'Specified a weighted model: 60% skill match, 15% resume quality, 25% 3A score (attendance, assignments, assessments) that already existed in the LMS.',
      'Limited LLM usage to one call per job description to extract required skills, then matched deterministically against structured learner data.',
      'Made every score decomposable so a coordinator can show an employer exactly why a candidate ranks where they do.',
    ],
    results: [
      'Cut projected inference cost from per-candidate to per-job, a reduction of several orders of magnitude at Itvedant scale.',
      'Delivered an explainable ranking that placement and Corporate Relations teams could defend in employer conversations.',
      'Reused the 3A score as a trust signal across self-placement and referral flows.',
    ],
    metrics: [
      { value: '60/15/25', label: 'skill · quality · 3A weights' },
      { value: '1', label: 'LLM call per job, not per candidate' },
      { value: '100%', label: 'decomposable scores' },
    ],
    architecture: {
      nodes: [
        { id: 'jd', label: 'Job description' },
        { id: 'extract', label: 'LLM skill extraction', sub: 'once per job' },
        { id: 'profiles', label: 'Learner profiles', sub: 'skills · resume · 3A' },
        { id: 'score', label: 'Weighted scorer', sub: '60 / 15 / 25' },
        { id: 'rank', label: 'Ranked shortlist' },
        { id: 'coord', label: 'Coordinator review' },
      ],
      edges: [
        { from: 'jd', to: 'extract' },
        { from: 'extract', to: 'score' },
        { from: 'profiles', to: 'score' },
        { from: 'score', to: 'rank' },
        { from: 'rank', to: 'coord' },
      ],
    },
  },
  {
    slug: 'wingz-rag-support',
    title: 'Wingz RAG Support',
    kicker: 'Grounded answers with sources, fallbacks and a real escalation path',
    summary:
      'A knowledge-grounded support assistant for the LMS, piloted in 1–2 branches with weekly accuracy, resolution and satisfaction reviews before wider rollout.',
    category: 'AI Products',
    featured: false,
    role: 'Product owner · grounding rules, pilot design, success metrics',
    timeline: '2025',
    context: 'Itvedant · Wingz LMS',
    stack: ['RAG', 'AnythingLLM', 'Ticketing', 'Feedback capture', 'PostHog'],
    image: '/covers/wingz-rag-support.webp',
    problem: [
      'Learners asked the same operational questions across branches, and the support team was the bottleneck between a question and a trustworthy answer.',
      'A chatbot that confidently hallucinated policy would have been worse than no chatbot.',
    ],
    approach: [
      'Defined knowledge-grounded answers that always link their sources, with an explicit no-answer fallback instead of guessing.',
      'Wired every unresolved conversation into the existing ticketing flow so escalation was one tap away, and captured thumbs-up / down feedback on each answer.',
      'Scoped a 1–2 branch pilot with weekly reviews of answer accuracy, resolution rate and learner satisfaction as the expansion gate.',
    ],
    results: [
      'Produced a pilot framework with clear quantitative gates rather than a big-bang launch.',
      'Turned feedback capture into a continuous knowledge-base improvement loop owned by the support team.',
    ],
    metrics: [
      { value: '1–2', label: 'pilot branches' },
      { value: 'Weekly', label: 'accuracy & CSAT review' },
      { value: '100%', label: 'answers with linked sources' },
    ],
    architecture: {
      nodes: [
        { id: 'q', label: 'Learner question' },
        { id: 'retrieve', label: 'Retriever', sub: 'knowledge base' },
        { id: 'gen', label: 'Grounded generation', sub: 'cited sources' },
        { id: 'fallback', label: 'No-answer fallback' },
        { id: 'ticket', label: 'Ticket escalation' },
        { id: 'fb', label: 'Feedback capture' },
      ],
      edges: [
        { from: 'q', to: 'retrieve' },
        { from: 'retrieve', to: 'gen', label: 'relevant chunks' },
        { from: 'retrieve', to: 'fallback', label: 'low relevance' },
        { from: 'fallback', to: 'ticket' },
        { from: 'gen', to: 'fb' },
        { from: 'fb', to: 'ticket', label: 'unhelpful' },
      ],
    },
  },
  {
    slug: 'job-sourcing-automation',
    title: 'Job-Sourcing Automation',
    kicker: 'Demand-based sourcing for 21 branches on an 84-credit daily budget',
    summary:
      'An n8n + Apollo pipeline that sources employer leads by branch demand, rotates priority skills, de-duplicates and gates on Corporate Relations approval.',
    category: 'Platforms',
    featured: false,
    role: 'Product owner · workflow design, budget allocation, approval gates',
    timeline: '2025',
    context: 'Itvedant · Corporate Relations',
    stack: ['n8n', 'Apollo', 'SQL Server', 'Google Sheets', 'Pulse CRM'],
    image: '/covers/job-sourcing-automation.webp',
    problem: [
      'Corporate Relations sourced employer leads manually and unevenly: some branches had surplus openings while others starved.',
      'Apollo credits were a hard constraint, so any automation had to be budget-aware from day one.',
    ],
    approach: [
      'Modelled daily demand per branch from open learner cohorts and allocated an 84-credit daily budget proportionally.',
      'Rotated priority skills so no single track monopolised credits, and de-duplicated against existing CRM contacts before spending.',
      'Required Corporate Relations approval before any outreach, keeping humans accountable for the brand.',
    ],
    results: [
      'Replaced ad-hoc sourcing with a predictable daily pipeline across all 21 branches.',
      'Made credit spend fully traceable to branch demand, which finance could audit.',
    ],
    metrics: [
      { value: '21', label: 'branches served' },
      { value: '84', label: 'credits / day, fully allocated' },
      { value: '0', label: 'outreach without approval' },
    ],
    architecture: {
      nodes: [
        { id: 'demand', label: 'Branch demand', sub: 'open cohorts' },
        { id: 'budget', label: 'Budget allocator', sub: '84 credits / day' },
        { id: 'apollo', label: 'Apollo search', sub: 'rotating skills' },
        { id: 'dedupe', label: 'De-duplication', sub: 'CRM match' },
        { id: 'approve', label: 'CR approval' },
        { id: 'crm', label: 'Pulse CRM' },
      ],
      edges: [
        { from: 'demand', to: 'budget' },
        { from: 'budget', to: 'apollo' },
        { from: 'apollo', to: 'dedupe' },
        { from: 'dedupe', to: 'approve' },
        { from: 'approve', to: 'crm' },
      ],
    },
  },
  {
    slug: 'task-tracker',
    title: 'Task Tracker',
    kicker: 'A Next.js / Supabase PWA for daily updates and TAT workflows',
    summary:
      'Daily updates, turnaround-time workflows, calendar and timeline views, team workload, role-based permissions and AI-ready Excel exports.',
    category: 'Prototypes',
    featured: true,
    role: 'Designer & builder · solo',
    timeline: '2025',
    context: 'Side build · live',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'PWA', 'RBAC'],
    video: '/task-tracker-demo.mp4',
    image: '/task-tracker-demo-poster.webp',
    liveUrl: 'https://tms-xi-one.vercel.app',
    repoUrl: 'https://github.com/aniketkumarray/Task-Management-System',
    demoUrl: 'https://drive.google.com/file/d/1ZlfD25PKaVyfVzgxqk0Wr0xslZfbjyhW/view?usp=drive_link',
    problem: [
      'Teams tracked daily updates in chat threads and spreadsheets, so turnaround times slipped silently and managers had no view of workload.',
    ],
    approach: [
      'Built a PWA with daily stand-up updates, TAT-based task states and calendar / timeline views on top of Supabase row-level security.',
      'Added team workload views and role-based permissions so leads see everything and contributors see what matters to them.',
      'Shipped Excel exports structured for downstream AI summarisation.',
    ],
    results: [
      'Running live with real daily usage, installable on mobile.',
      'Became my reference prototype for how I expect engineering teams to think about permissions and auditability.',
    ],
    metrics: [
      { value: 'PWA', label: 'installable, offline-ready' },
      { value: 'RLS', label: 'row-level security' },
      { value: 'Live', label: 'in production' },
    ],
    architecture: {
      nodes: [
        { id: 'pwa', label: 'Next.js PWA' },
        { id: 'auth', label: 'Supabase Auth' },
        { id: 'db', label: 'Postgres + RLS' },
        { id: 'views', label: 'Calendar · timeline · workload' },
        { id: 'export', label: 'Excel export', sub: 'AI-ready' },
      ],
      edges: [
        { from: 'pwa', to: 'auth' },
        { from: 'auth', to: 'db' },
        { from: 'db', to: 'views' },
        { from: 'db', to: 'export' },
      ],
    },
  },
  {
    slug: 'interview-peer',
    title: 'Interview Peer',
    kicker: 'A peer mock-interview marketplace with real scheduling and feedback',
    summary:
      'Discovery, invitations, Jitsi / ICS sessions, private structured feedback and a milestone-based Interview Journey, plus a Gemini / Web Speech mock-interviewer concept.',
    category: 'Prototypes',
    featured: true,
    role: 'PM & builder · PRD, data model, implementation',
    timeline: '2025 — 2026',
    context: 'Side build · live',
    stack: ['Next.js 16', 'React 19', 'Supabase SSR', 'Zod', 'Jitsi', 'Gemini', 'Web Speech API'],
    image: '/covers/interview-peer.webp',
    liveUrl: 'https://interview-peer.vercel.app',
    repoUrl: 'https://github.com/aniketkumarray/Interview_peer',
    problem: [
      'Job seekers want realistic practice but automatic-matching tools hide why you were paired and make sessions feel transactional.',
      'Gamification in this space often rewards activity rather than verified practice.',
    ],
    approach: [
      'Wrote the PRD first: personas, JTBD, competitor analysis (Exponent, InterviewBit), privacy rules and acceptance criteria.',
      'Built transparent peer discovery with visible compatibility reasons, user-controlled invitations with up to three time options, and private Jitsi rooms with downloadable .ics files.',
      'Designed an Interview Journey where only mutually confirmed sessions count, with per-pair daily caps and an opt-in weekly leaderboard to prevent gaming.',
      'Prototyped a Gemini + Web Speech mock-interviewer as the AI follow-on.',
    ],
    results: [
      'Live product with authentication, onboarding, discovery, scheduling, feedback and gamification shipped end to end.',
      'A worked example of my PM process: PRD → data model → server actions with validation → launch.',
    ],
    metrics: [
      { value: '7', label: 'journey milestones' },
      { value: '2-way', label: 'confirmation before a session counts' },
      { value: 'Live', label: 'on Vercel' },
    ],
    architecture: {
      nodes: [
        { id: 'ui', label: 'Next.js App Router' },
        { id: 'auth', label: 'Supabase Auth', sub: 'Google / magic link' },
        { id: 'actions', label: 'Server actions', sub: 'Zod validated' },
        { id: 'db', label: 'Postgres', sub: 'sessions · feedback' },
        { id: 'jitsi', label: 'Jitsi rooms + .ics' },
        { id: 'journey', label: 'Interview Journey', sub: 'badges · leaderboard' },
      ],
      edges: [
        { from: 'ui', to: 'auth' },
        { from: 'ui', to: 'actions' },
        { from: 'actions', to: 'db' },
        { from: 'actions', to: 'jitsi' },
        { from: 'db', to: 'journey' },
      ],
    },
  },
  {
    slug: 'moneymap',
    title: 'MoneyMap',
    kicker: 'Financial wellness built on RBI Account Aggregator concepts',
    summary:
      'A mobile prototype with safe-to-spend forecasting, bill-risk alerts and coaching plans, grounded in consented account-aggregator data flows.',
    category: 'Prototypes',
    featured: true,
    role: 'Product lead · scope, UX, financial model',
    timeline: '2025',
    context: 'PGDM product programme · Group 9',
    stack: ['Account Aggregator', 'Forecasting', 'Mobile UX', 'Figma', 'Stitch'],
    video: '/moneymap-demo.mp4',
    image: '/moneymap-demo-poster.webp',
    demoUrl: 'https://drive.google.com/file/d/1BZBSAHwucKkkKR3BQuN9q75kh9ZN6Bxo/view?usp=drive_link',
    problem: [
      'Salaried users in India know their balance but not whether they can afford Friday, because bills, EMIs and subscriptions hit on different days.',
    ],
    approach: [
      'Used the RBI Account Aggregator framework as the consent and data backbone instead of screen-scraping.',
      'Designed a safe-to-spend number that nets upcoming obligations against balance, with bill-risk alerts when the forecast goes negative.',
      'Added coaching plans that convert a shortfall into a concrete weekly action.',
    ],
    results: [
      'Phased product scope delivered across three programme milestones with a clickable mobile prototype.',
      'Demonstrated how a regulated data rail can power a genuinely useful consumer feature.',
    ],
    metrics: [
      { value: 'AA', label: 'consent-based data' },
      { value: '3', label: 'programme phases' },
      { value: '1', label: 'number that matters: safe to spend' },
    ],
    architecture: {
      nodes: [
        { id: 'aa', label: 'Account Aggregator', sub: 'consented data' },
        { id: 'ingest', label: 'Transaction ingestion' },
        { id: 'forecast', label: 'Safe-to-spend engine' },
        { id: 'alerts', label: 'Bill-risk alerts' },
        { id: 'coach', label: 'Coaching plans' },
      ],
      edges: [
        { from: 'aa', to: 'ingest' },
        { from: 'ingest', to: 'forecast' },
        { from: 'forecast', to: 'alerts' },
        { from: 'forecast', to: 'coach' },
      ],
    },
  },
  {
    slug: 'rag-learning-lab',
    title: 'RAG Learning Lab',
    kicker: 'An interactive simulator for how retrieval-augmented generation really works',
    summary:
      'Ingestion, chunking, embeddings, retrieval and grounded generation, with an editable knowledge base, chunk size and prompt so you can feel each trade-off.',
    category: 'Analytics',
    featured: false,
    role: 'Builder · solo',
    timeline: '2025',
    context: 'Open source',
    stack: ['RAG', 'Embeddings', 'Chunking', 'Prompt design', 'TypeScript'],
    image: '/covers/rag-learning-lab.webp',
    repoUrl: 'https://github.com/aniketkumarray/rag_Simulation',
    problem: [
      'Stakeholders kept asking for "a chatbot on our docs" without understanding why chunk size or retrieval quality changes the answer.',
    ],
    approach: [
      'Built a step-by-step simulator that exposes each stage of the pipeline with editable inputs.',
      'Let users change the knowledge base, chunk size and prompt, then watch retrieval and the final grounded answer change in real time.',
    ],
    results: [
      'Used as a teaching tool when scoping Wingz RAG support, which shortened alignment conversations with engineering and support leads.',
    ],
    metrics: [
      { value: '5', label: 'pipeline stages exposed' },
      { value: '3', label: 'live-editable parameters' },
      { value: 'OSS', label: 'on GitHub' },
    ],
    architecture: {
      nodes: [
        { id: 'kb', label: 'Knowledge base', sub: 'editable' },
        { id: 'chunk', label: 'Chunker', sub: 'size · overlap' },
        { id: 'embed', label: 'Embeddings' },
        { id: 'retrieve', label: 'Top-k retrieval' },
        { id: 'gen', label: 'Grounded generation', sub: 'editable prompt' },
      ],
      edges: [
        { from: 'kb', to: 'chunk' },
        { from: 'chunk', to: 'embed' },
        { from: 'embed', to: 'retrieve' },
        { from: 'retrieve', to: 'gen' },
      ],
    },
  },
]

export const projectCategories = ['All', 'AI Products', 'Platforms', 'Prototypes', 'Analytics'] as const

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
