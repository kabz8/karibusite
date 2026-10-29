export type SitePage = {
  eyebrow: string;
  title: string;
  intro: string;
  paragraphs: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
  service?: string;
};

export const divisions = [
  {
    title: "Tours, travel & transfers",
    href: "/services/tours-travel-transfers",
    description:
      "Thoughtful planning for journeys, from tailored itineraries and flight enquiries to accommodation and executive transfers.",
    icon: "plane",
  },
  {
    title: "Events management",
    href: "/services/events-management",
    description:
      "Coordination for conferences, summits, weddings, product launches and corporate gatherings.",
    icon: "calendar",
  },
  {
    title: "Medical tourism",
    href: "/services/medical-tourism",
    description:
      "Non-clinical travel and patient support coordination for people exploring care abroad.",
    icon: "health",
  },
  {
    title: "Pilgrimage tourism",
    href: "/services/pilgrimage-tourism",
    description:
      "Respectful coordination for faith-based travel, group journeys and itinerary enquiries.",
    icon: "landmark",
  },
  {
    title: "Consultancy",
    href: "/services/consultancy",
    description:
      "A considered first conversation for individual, corporate and institutional requirements.",
    icon: "briefcase",
  },
];

export const sitePages: Record<string, SitePage> = {
  "/about": {
    eyebrow: "About Karibu and Beyond",
    title: "A thoughtful welcome to what comes next.",
    intro:
      "Karibu means welcome. We bring that spirit to the details that make a journey, an event or an important decision feel well considered.",
    paragraphs: [
      "Karibu and Beyond Ltd is a Kenya-based service company coordinating premium travel, events, medical tourism, pilgrimage and consultancy enquiries for individuals, corporations and institutions.",
      "Our work starts with listening. We bring the moving parts into one clear conversation, then discuss practical options around your brief. Specific arrangements, suppliers, availability and costs are confirmed directly before anything is booked.",
    ],
    bullets: [
      "Tours, travel and transfers",
      "Events management",
      "Medical tourism coordination",
      "Pilgrimage tourism",
      "Consultancy",
    ],
    links: [
      { label: "Explore our services", href: "/services" },
      { label: "How we work", href: "/why-choose-us" },
    ],
  },
  "/why-choose-us": {
    eyebrow: "The way we work",
    title: "Considered for a global world.",
    intro:
      "Good coordination is clear, attentive and shaped around the people involved.",
    paragraphs: [
      "We bring related service enquiries together under one company, so you can start with a single conversation. We take time to understand the context, preferences and practical requirements behind your request.",
      "We keep the next steps straightforward. An enquiry is an invitation to discuss options, not a booking, a promise of availability or an agreement to provide a service.",
    ],
    bullets: [
      "A coordinated starting point across five service areas",
      "Communication shaped around your requirements",
      "Clear confirmation of details before arrangements proceed",
    ],
    links: [{ label: "Start a conversation", href: "/consultation" }],
  },
  "/services": {
    eyebrow: "One company. Many possibilities.",
    title: "Support for the moments that matter.",
    intro:
      "Explore five service areas and choose the right place to begin.",
    paragraphs: [
      "Karibu and Beyond brings together travel, events, medical tourism, pilgrimage and consultancy enquiries. Services are discussed individually; specific capabilities and arrangements are confirmed directly.",
    ],
    links: divisions.map((division) => ({
      label: division.title,
      href: division.href,
    })),
  },
  "/services/tours-travel-transfers": {
    eyebrow: "Travel",
    title: "Travel, arranged around you.",
    intro:
      "Thoughtful planning for journeys across East Africa and beyond.",
    paragraphs: [
      "We can discuss bespoke travel planning, safari enquiries, curated tours, ticketing, accommodation coordination, executive transfers and travel support.",
      "Share where you hope to go, your preferred timing and what matters most. Fares, availability, suppliers, prices and final itineraries are confirmed directly before any booking.",
    ],
    bullets: [
      "Tailored itinerary planning",
      "Safari and curated tour enquiries",
      "Flight and ticketing enquiries",
      "Accommodation coordination",
      "Executive transfers and ground support",
    ],
    service: "travel",
    links: [
      { label: "Explore travel services", href: "/travel" },
      { label: "Destinations", href: "/travel/destinations" },
    ],
  },
  "/travel": {
    eyebrow: "Travel, with room to breathe",
    title: "From the first connection to the last mile.",
    intro:
      "A considered travel plan makes more space for the reason you are going.",
    paragraphs: [
      "Our travel coordination enquiries can include safari and tour planning, flight booking, executive transfers, accommodation coordination, group travel and travel assistance.",
      "Each request is discussed individually. This website does not provide live inventory, instant ticketing or confirmed availability.",
    ],
    service: "travel",
    links: [
      { label: "Luxury safari enquiries", href: "/travel/luxury-safaris" },
      { label: "Curated tours", href: "/travel/curated-tours" },
      { label: "Flight booking", href: "/travel/flight-booking" },
      { label: "Executive transfers", href: "/travel/executive-transfers" },
      { label: "Hotel reservations", href: "/travel/hotel-reservations" },
      { label: "Destinations", href: "/travel/destinations" },
    ],
  },
  "/travel/luxury-safaris": {
    eyebrow: "Travel · Safaris",
    title: "A safari shaped around your pace.",
    intro:
      "Start with the dates, group and experience you have in mind.",
    paragraphs: [
      "Share your preferred timing, group size and broad interests. We will discuss whether a safari enquiry is a suitable fit and what details are needed next.",
      "No safari packages, prices, lodges or departure dates are published here unless confirmed by the company.",
    ],
    service: "travel",
  },
  "/travel/curated-tours": {
    eyebrow: "Travel · Curated tours",
    title: "Go beyond the checklist.",
    intro:
      "Discuss a journey built around your interests, available time and practical needs.",
    paragraphs: [
      "From a short regional escape to a longer multi-stop itinerary, tell us what you are considering. Routes, inclusions, providers and costs are agreed directly before any booking.",
    ],
    service: "travel",
  },
  "/travel/flight-booking": {
    eyebrow: "Travel · Flight enquiries",
    title: "A smoother way to get there.",
    intro: "Tell us about the route and timing you are considering.",
    paragraphs: [
      "We accept enquiries about flight booking and ticketing coordination. Share your route, preferred dates and traveller requirements.",
      "This website does not show live flight inventory or issue tickets automatically. Fares, availability and conditions are confirmed directly.",
    ],
    service: "travel",
  },
  "/travel/executive-transfers": {
    eyebrow: "Travel · Transfers",
    title: "The journey between the journeys.",
    intro:
      "Ground transport coordination for individual and corporate itineraries.",
    paragraphs: [
      "Share your pickup or arrival point, timing and passenger requirements. Transport options and availability are confirmed directly before arrangements proceed.",
    ],
    service: "travel",
  },
  "/travel/hotel-reservations": {
    eyebrow: "Travel · Accommodation",
    title: "A stay that fits the journey.",
    intro:
      "Discuss accommodation enquiries with location, purpose and preference in mind.",
    paragraphs: [
      "Let us know the destination, dates and what a suitable stay means to you. Options, rates, availability and terms are confirmed directly.",
    ],
    service: "travel",
  },
  "/travel/destinations": {
    eyebrow: "Travel · Places",
    title: "East Africa and India, considered.",
    intro:
      "Two regions highlighted by Karibu and Beyond, with practical details discussed around each enquiry.",
    paragraphs: [
      "Share the places you are considering and the kind of coordination that would help. This site does not imply a physical office or guaranteed service availability in every destination.",
    ],
    links: [
      { label: "East Africa", href: "/travel/destinations/east-africa" },
      { label: "India", href: "/travel/destinations/india" },
    ],
  },
  "/travel/destinations/east-africa": {
    eyebrow: "Travel · East Africa",
    title: "A regional journey, planned with context.",
    intro:
      "Discuss a travel enquiry connected to East Africa.",
    paragraphs: [
      "Share your destinations, approximate timing and the practical arrangements you would like to discuss. Routes, suppliers, availability and costs are confirmed individually.",
    ],
    service: "travel",
  },
  "/travel/destinations/india": {
    eyebrow: "Travel · India",
    title: "India, with the details brought together.",
    intro:
      "Discuss general travel coordination or non-clinical medical tourism support.",
    paragraphs: [
      "For general travel, tell us the purpose and timing of your journey. For medical tourism, use the dedicated enquiry page and include travel logistics only; clinical decisions belong with qualified healthcare professionals.",
    ],
    links: [
      { label: "Medical tourism coordination", href: "/services/medical-tourism" },
      { label: "General travel enquiry", href: "/contact" },
    ],
  },
  "/services/events-management": {
    eyebrow: "Events",
    title: "A gathering, thoughtfully brought together.",
    intro:
      "Clear planning and calm coordination for events with something to say.",
    paragraphs: [
      "We discuss event coordination for conferences, summits, weddings, product launches and corporate gatherings. Tell us the occasion, proposed timing and what matters most.",
      "Event production, suppliers, venue arrangements and technical capabilities are confirmed for each brief.",
    ],
    bullets: [
      "Conferences and summits",
      "Weddings and celebrations",
      "Product launches",
      "Corporate gatherings",
      "Event logistics and coordination",
    ],
    service: "events",
    links: [
      { label: "Corporate events", href: "/events/corporate" },
      { label: "Conferences", href: "/events/conferences" },
      { label: "Weddings", href: "/events/weddings" },
      { label: "Product launches", href: "/events/product-launches" },
      { label: "Event production", href: "/events/event-production" },
      { label: "Request a proposal", href: "/events/request-proposal" },
    ],
  },
  "/events": {
    eyebrow: "Events",
    title: "Bring people together with purpose.",
    intro:
      "From the first brief to the final run of show, discuss the moving parts with one team.",
    paragraphs: [
      "Explore corporate event, conference, wedding and product launch enquiries. Proposals are shaped around the brief and confirmed requirements.",
    ],
    service: "events",
    links: [
      { label: "Corporate events", href: "/events/corporate" },
      { label: "Conferences", href: "/events/conferences" },
      { label: "Weddings", href: "/events/weddings" },
      { label: "Product launches", href: "/events/product-launches" },
      { label: "Event production", href: "/events/event-production" },
    ],
  },
  "/events/corporate": {
    eyebrow: "Events · Corporate",
    title: "Make the room work harder.",
    intro:
      "Corporate gatherings shaped around people, purpose and practicalities.",
    paragraphs: [
      "We can discuss meetings, launches, client gatherings and internal occasions. Share an outline, proposed timing and what you hope to achieve.",
    ],
    service: "events",
  },
  "/events/conferences": {
    eyebrow: "Events · Conferences",
    title: "A clear plan for complex days.",
    intro:
      "Conference coordination that keeps delegates, programme and operations in view.",
    paragraphs: [
      "Tell us about your audience, proposed dates, venue preferences and programme. The scope, suppliers and available services are confirmed directly.",
    ],
    service: "events",
  },
  "/events/weddings": {
    eyebrow: "Events · Weddings",
    title: "A day that feels like yours.",
    intro:
      "Personal, attentive coordination for a meaningful celebration.",
    paragraphs: [
      "Every celebration has its own character. Share the kind of day you are imagining and the details you would like to discuss.",
    ],
    service: "events",
  },
  "/events/product-launches": {
    eyebrow: "Events · Launches",
    title: "Give a new idea its moment.",
    intro:
      "A launch conversation aligned to your audience, message and timeline.",
    paragraphs: [
      "Share your objectives and proposed timing. Venue, production, suppliers and event arrangements are confirmed in a proposal before any commitment.",
    ],
    service: "events",
  },
  "/events/event-production": {
    eyebrow: "Events · Production",
    title: "The details behind the experience.",
    intro:
      "Discuss production coordination and the practical requirements of your event.",
    paragraphs: [
      "Tell us about the programme, staging or technical needs you are considering. Capabilities and supplier arrangements are confirmed per brief.",
    ],
    service: "events",
  },
  "/services/medical-tourism": {
    eyebrow: "Medical tourism",
    title: "Support around the journey, not the clinical decision.",
    intro:
      "Practical, non-clinical coordination for people exploring treatment abroad.",
    paragraphs: [
      "Karibu and Beyond can discuss travel planning and related patient support coordination. We do not diagnose, prescribe, recommend treatment or guarantee outcomes.",
      "Treatment decisions, provider credentials and clinical suitability must be discussed directly with qualified healthcare professionals. Do not send medical records, diagnoses or other sensitive health information through this website, email or WhatsApp.",
    ],
    bullets: [
      "Travel and accommodation coordination enquiries",
      "Practical communication and journey planning",
      "A clear boundary between coordination and clinical care",
    ],
    service: "medical_tourism",
    links: [
      { label: "How it works", href: "/medical-tourism/how-it-works" },
      { label: "Patient support", href: "/medical-tourism/patient-support" },
      { label: "Treatment travel enquiry", href: "/medical-tourism/treatment-enquiries" },
      { label: "Frequently asked questions", href: "/medical-tourism/faq" },
    ],
  },
  "/medical-tourism/how-it-works": {
    eyebrow: "Medical tourism · Process",
    title: "A practical path, at your pace.",
    intro:
      "Start with the travel logistics you want help exploring.",
    paragraphs: [
      "1. Share a non-clinical enquiry about travel coordination. 2. We respond to understand the practical support you are seeking. 3. You communicate directly with qualified healthcare providers about clinical advice and decisions. 4. If you choose to travel, practical arrangements can be discussed separately.",
      "No medical records, diagnoses, treatment plans or other clinical details are requested here.",
    ],
    service: "medical_tourism",
  },
  "/medical-tourism/treatment-enquiries": {
    eyebrow: "Medical tourism · Enquiry",
    title: "Discuss travel coordination in confidence.",
    intro:
      "Use this page for practical travel questions only.",
    paragraphs: [
      "Please do not include diagnoses, test results, medical records, medications or other clinical information. This website is not a secure medical channel.",
      "Clinical decisions, provider credentials, treatment suitability and outcomes must be confirmed with the healthcare provider directly.",
    ],
    service: "medical_tourism",
  },
  "/medical-tourism/patient-support": {
    eyebrow: "Medical tourism · Support",
    title: "Considered support around travel.",
    intro:
      "Discuss practical help for the journey and the details around it.",
    paragraphs: [
      "Depending on the brief, coordination may include travel planning, accommodation enquiries, transfers and communication logistics. Scope and availability are confirmed directly.",
      "Support is non-clinical. Please do not share health records or treatment information through general contact channels.",
    ],
    service: "medical_tourism",
  },
  "/medical-tourism/faq": {
    eyebrow: "Medical tourism · FAQ",
    title: "Clear answers before you enquire.",
    intro: "Important boundaries and practical notes.",
    paragraphs: [
      "Do you provide treatment? No. The company discusses non-clinical travel coordination.",
      "Can you recommend a treatment or provider? No. Consult qualified healthcare professionals directly.",
      "Should I send medical records? No. Do not submit clinical details through this website, email or WhatsApp.",
      "Is an enquiry a booking? No. It is a request to discuss coordination.",
    ],
    links: [{ label: "How it works", href: "/medical-tourism/how-it-works" }],
  },
  "/services/pilgrimage-tourism": {
    eyebrow: "Pilgrimage",
    title: "Journeys held with care and respect.",
    intro:
      "Thoughtful coordination for faith-led travel and group journeys.",
    paragraphs: [
      "We listen to the purpose, timing and needs of your group, then discuss an itinerary and practical arrangements. Dates, inclusions, prices and availability are confirmed directly.",
      "Planning conversations can cover group size, departure points, transport and accommodation enquiries. Specific arrangements are agreed before anything is booked.",
    ],
    bullets: [
      "Personal, family, group and organisational enquiries",
      "Itinerary discussions shaped around purpose and timing",
      "Practical coordination around transport and accommodation",
      "Clear confirmation of details before arrangements proceed",
    ],
    service: "pilgrimage",
    links: [
      { label: "Group journeys", href: "/pilgrimage/group-journeys" },
      { label: "Planning", href: "/pilgrimage/planning" },
      { label: "Request an itinerary conversation", href: "/pilgrimage/request-itinerary" },
      { label: "Frequently asked questions", href: "/pilgrimage/faq" },
    ],
  },
  "/pilgrimage": {
    eyebrow: "Pilgrimage",
    title: "Make space for the meaning of the journey.",
    intro:
      "Practical coordination around faith-led travel, with respect for each group's needs.",
    paragraphs: [
      "Share your destination, proposed dates and group outline. We will discuss the right next step with you. No departure date or itinerary is assumed or confirmed by this website.",
    ],
    service: "pilgrimage",
    links: [
      { label: "Group journeys", href: "/pilgrimage/group-journeys" },
      { label: "Planning", href: "/pilgrimage/planning" },
      { label: "Request an itinerary", href: "/pilgrimage/request-itinerary" },
      { label: "Frequently asked questions", href: "/pilgrimage/faq" },
    ],
  },
  "/pilgrimage/group-journeys": {
    eyebrow: "Pilgrimage · Groups",
    title: "Travel together, with clarity.",
    intro:
      "Group journeys need thoughtful coordination before the first departure.",
    paragraphs: [
      "We can discuss group size, timing, departure points and the kind of practical support that would help. Share only the information relevant to planning.",
    ],
    service: "pilgrimage",
  },
  "/pilgrimage/planning": {
    eyebrow: "Pilgrimage · Planning",
    title: "A considered plan for a meaningful journey.",
    intro:
      "Start with the purpose. Discuss the practicalities together.",
    paragraphs: [
      "A useful planning conversation can cover timing, group needs, transport, accommodation enquiries and communication. Specific arrangements are confirmed directly.",
    ],
    service: "pilgrimage",
  },
  "/pilgrimage/request-itinerary": {
    eyebrow: "Pilgrimage · Enquiry",
    title: "Request an itinerary conversation.",
    intro:
      "Tell us about your group and the journey you are considering.",
    paragraphs: [
      "This is an enquiry, not a booking. We will follow up to discuss timing and requirements.",
    ],
    service: "pilgrimage",
  },
  "/pilgrimage/faq": {
    eyebrow: "Pilgrimage · FAQ",
    title: "A few helpful first answers.",
    intro: "Every pilgrimage enquiry is different.",
    paragraphs: [
      "Do you publish fixed itineraries? Only confirmed information is published.",
      "Can we enquire as a group? Yes. Share an outline and preferred timing.",
      "Does an enquiry reserve travel? No. Arrangements are discussed and confirmed separately.",
    ],
    links: [{ label: "Request an itinerary conversation", href: "/pilgrimage/request-itinerary" }],
  },
  "/services/consultancy": {
    eyebrow: "Consultancy",
    title: "A thoughtful partner for your next decision.",
    intro:
      "Structured conversations for individuals, corporations and institutions.",
    paragraphs: [
      "Tell us about the context, challenge and outcome you are working towards. We will discuss whether and how our consultancy support may be relevant.",
      "Specific disciplines, credentials and engagements are not listed until confirmed. Please do not send confidential or sensitive material through this website.",
    ],
    bullets: [
      "Clarify the context and question behind your enquiry",
      "Discuss the outcome you are working towards",
      "Explore whether consultancy support may be relevant",
      "Agree practical next steps without assuming an engagement",
    ],
    service: "consultancy",
    links: [{ label: "Request a consultation", href: "/consultation/request" }],
  },
  "/consultation/request": {
    eyebrow: "Consultancy · Enquiry",
    title: "Start with the question in front of you.",
    intro: "Share a concise, non-confidential overview.",
    paragraphs: [
      "This is an initial enquiry, not an engagement agreement. Please avoid sending confidential or sensitive material.",
    ],
    service: "consultancy",
  },
  "/consultation": {
    eyebrow: "Let's talk",
    title: "A good next step begins with a conversation.",
    intro:
      "Tell us what you are considering and we will help find the right starting point.",
    paragraphs: [
      "Choose the closest service area and share a few practical details. An enquiry is not a booking, commitment or confirmation of service availability.",
    ],
    service: "general",
  },
  "/faq": {
    eyebrow: "Frequently asked questions",
    title: "A little more clarity, before hello.",
    intro: "How we work, what an enquiry means and what to expect.",
    paragraphs: [
      "What does Karibu and Beyond do? The company coordinates travel, events, medical tourism, pilgrimage and consultancy enquiries.",
      "Are packages and prices available online? No confirmed package offers are currently published on this site. Ask about a tailored enquiry.",
      "Does an enquiry confirm a booking? No. Availability, costs and arrangements are discussed and confirmed separately.",
      "Where is the company based? Embakasi, North Airport Road, Kenya. East Africa and India are highlighted in the company's geographic positioning.",
      "Does the company provide medical advice? No. Medical tourism support is non-clinical; consult qualified healthcare professionals.",
      "How do contact forms work? They prepare an email or WhatsApp message on your device. This website does not receive or store the message.",
    ],
    links: [{ label: "Contact us", href: "/contact" }],
  },
  "/contact": {
    eyebrow: "Contact",
    title: "Tell us what you have in mind.",
    intro:
      "Choose how to contact us. The website does not save or send form entries itself.",
    paragraphs: [
      "Karibu and Beyond Ltd is based in Embakasi, North Airport Road, Kenya. East Africa and India are highlighted in the company's service positioning.",
    ],
    service: "general",
  },
  "/privacy-policy": {
    eyebrow: "Your information",
    title: "Privacy notice",
    intro: "A clear explanation of what this frontend-only website does.",
    paragraphs: [
      "This website does not run an application backend, save enquiry forms, operate a newsletter list or track visitors with analytics. When you prepare a contact request, the details remain in your browser until you choose to open your email app or WhatsApp and send them.",
      "If you choose to send an email or WhatsApp message, the relevant provider processes it under its own terms and privacy policy. Please do not send medical records, diagnoses, financial details or confidential material through general contact channels.",
      "The site uses no analytics or advertising cookies. Contact info@karibuandbeyondltd.com for questions about this notice. Business-specific legal terms should be reviewed by qualified counsel.",
    ],
  },
  "/cookie-policy": {
    eyebrow: "Your choices",
    title: "Cookie notice",
    intro: "This website does not use analytics or advertising cookies.",
    paragraphs: [
      "The static site does not set cookies or store preferences in your browser. No analytics or advertising scripts are enabled.",
      "If optional tracking or other browser storage is introduced later, this notice should be updated before those tools are enabled.",
    ],
  },
  "/terms-and-conditions": {
    eyebrow: "Using this site",
    title: "Website terms",
    intro: "The website is an information and enquiry channel.",
    paragraphs: [
      "Website content is general information and does not constitute a booking, offer, medical advice or service agreement. An enquiry is not a confirmed booking or commitment.",
      "Availability, itineraries, suppliers, services and costs are discussed and confirmed directly in writing before an arrangement proceeds. Medical decisions must be made with qualified healthcare professionals.",
      "Business-specific terms should be reviewed by qualified legal counsel.",
    ],
  },
  "/accessibility": {
    eyebrow: "Access for everyone",
    title: "Accessibility",
    intro: "We want the site to work for as many people as possible.",
    paragraphs: [
      "The site is designed for keyboard access, readable contrast, responsive layouts and reduced-motion preferences. If you encounter a barrier, contact info@karibuandbeyondltd.com or call either number shown on the site.",
    ],
  },
  "/unsubscribe": {
    eyebrow: "Email preferences",
    title: "Email preferences",
    intro: "This static website does not operate a newsletter list.",
    paragraphs: [
      "If you have received an email from Karibu and Beyond and want to change your preferences, reply to that email or contact info@karibuandbeyondltd.com. Do not send personal details through this page.",
    ],
  },
};

export const faqItems = [
  {
    question: "What does Karibu and Beyond do?",
    answer:
      "The company coordinates enquiries across tours and travel, events management, medical tourism, pilgrimage tourism and consultancy.",
  },
  {
    question: "Are confirmed packages and prices listed?",
    answer:
      "No. There are no confirmed package listings on this site. Contact the team to discuss a tailored requirement.",
  },
  {
    question: "Does an enquiry confirm a booking?",
    answer:
      "No. An enquiry begins a conversation. Availability, costs and arrangements are confirmed directly before any booking.",
  },
  {
    question: "Where is Karibu and Beyond based?",
    answer:
      "The company lists Embakasi, North Airport Road, Kenya. East Africa and India are highlighted in its service positioning.",
  },
  {
    question: "Does the company provide medical treatment or advice?",
    answer:
      "No. Medical tourism support is non-clinical. Treatment decisions and provider suitability should be discussed with qualified healthcare professionals.",
  },
  {
    question: "How do the enquiry forms work?",
    answer:
      "They prepare a message in your email app or WhatsApp. The website itself does not receive or store form entries, and nothing is sent until you send it from that service.",
  },
];
