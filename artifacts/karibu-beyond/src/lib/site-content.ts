export type SitePage = {
  eyebrow: string;
  title: string;
  intro: string;
  paragraphs: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
  service?: string;
  images?: Array<{ src: string; alt: string; caption?: string }>;
};

export const divisions = [
  {
    title: "Tours, travel & transfers",
    href: "/services/tours-travel-transfers",
    description:
      "Thoughtful planning for journeys, from tailored itineraries and flight enquiries to accommodation and executive transfers.",
    icon: "plane",
    image: "service-tours-safari.jpg",
    imageAlt: "East African safari landscape at sunset",
  },
  {
    title: "Events management",
    href: "/services/events-management",
    description:
      "Enquiries for exhibitions, team-building activities, corporate events, conferences and celebrations.",
    icon: "calendar",
    image: "service-events-gathering.jpg",
    imageAlt: "Elegant event hall set for a corporate gathering",
  },
  {
    title: "Medical tourism",
    href: "/services/medical-tourism",
    description:
      "Non-clinical travel and patient support coordination for people exploring care abroad.",
    icon: "health",
    image: "service-medical-care.jpg",
    imageAlt: "Bright, modern clinical treatment room",
  },
  {
    title: "Pilgrimage tourism",
    href: "/services/pilgrimage-tourism",
    description:
      "Respectful coordination for faith-based travel, group journeys and itinerary enquiries.",
    icon: "landmark",
    image: "service-pilgrimage-interior.jpg",
    imageAlt: "Historic sacred-site interior with warm lighting",
  },
  {
    title: "Consultancy",
    href: "/services/consultancy",
    description:
      "A considered first conversation for individual, corporate and institutional requirements.",
    icon: "briefcase",
    image: "service-consultancy-meeting.jpg",
    imageAlt: "Professionals in a thoughtful business discussion",
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
      "Whether you are planning a safari, a multi-stop holiday, a work trip or a group journey, we can discuss the moving parts in one place. Enquiries may include itinerary planning, flight and ticketing coordination, accommodation, ground transport and practical travel support.",
      "To make the first conversation useful, share your starting point, destinations, preferred dates, number of travellers and the kind of experience or support you are looking for. You can also note accessibility needs or other practical preferences.",
      "Travel options are not live or automatically reserved on this website. Fares, suppliers, availability, inclusions and costs are checked and confirmed directly before you decide whether to proceed.",
    ],
    bullets: [
      "Itinerary conversations for individual, family and group travel",
      "Safari, regional tour and destination enquiries",
      "Flight and ticketing coordination discussions",
      "Accommodation and executive-transfer enquiries",
      "A clear review of timing, requirements and next steps",
    ],
    service: "travel",
    images: [
      { src: "service-tours-safari.jpg", alt: "East African safari landscape at sunset", caption: "Safari and tour enquiries" },
      { src: "service-global-travel.jpg", alt: "Comfortable airport lounge with views across the runway", caption: "Travel connections and support" },
    ],
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
      "We can discuss a complete trip or one part of the journey: destinations and routes, safari and tour ideas, flights, stays, transfers and group-travel requirements. The conversation is shaped around your purpose, pace, preferred dates and practical needs.",
      "For a useful starting brief, include your origin, destinations, approximate dates, traveller or group size, and the arrangements you would like to explore. You do not need to send passport details or sensitive documents through this website.",
      "This is an enquiry channel, not a booking engine. It does not display live fares, rooms or vehicle availability, issue tickets or reserve services. All options, terms and costs are confirmed with you before any arrangement proceeds.",
    ],
    bullets: [
      "Share the journey and its purpose",
      "Identify the arrangements you want to discuss",
      "Review options and practical requirements directly",
      "Confirm details before any booking is made",
    ],
    service: "travel",
    images: [
      { src: "service-tours-safari.jpg", alt: "Safari lodge set in an East African landscape at sunset", caption: "Regional tours and safari journeys" },
      { src: "service-travel-stay.jpg", alt: "A calm, light-filled hotel room", caption: "Accommodation enquiries" },
    ],
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
      "Start with the kind of safari you have in mind: the season, approximate dates, number of travellers, preferred pace and the landscapes or activities that interest you. Families, couples and small groups can all begin with a tailored enquiry.",
      "A planning conversation may consider route ideas, time in each area, transfers, accommodation preferences and any practical requirements for the group. Tell us what is important to you rather than assuming a fixed package or itinerary.",
      "No lodge, guide, price, departure date or wildlife sighting is guaranteed by this page. Providers, availability, inclusions and costs are checked and confirmed directly before any booking.",
    ],
    service: "travel",
    images: [
      { src: "service-tours-safari.jpg", alt: "Golden sunset across an East African safari landscape", caption: "An illustrative safari setting" },
      { src: "mara-dawn.jpg", alt: "Dawn light over the Maasai Mara", caption: "Kenya · East Africa" },
    ],
  },
  "/travel/curated-tours": {
    eyebrow: "Travel · Curated tours",
    title: "Go beyond the checklist.",
    intro:
      "Discuss a journey built around your interests, available time and practical needs.",
    paragraphs: [
      "A curated tour enquiry can begin with one destination or a longer route. Share what you want to see, how long you have, who is travelling and the pace that would suit you. We can then discuss possible routing and the practical details that need to be checked.",
      "If you already have dates, accommodation preferences, transport needs or accessibility considerations, include them in your outline. Routes, suppliers, inclusions, availability and prices are confirmed directly; no itinerary is reserved by sending an enquiry.",
    ],
    service: "travel",
    images: [
      { src: "service-tours-safari.jpg", alt: "East African safari landscape at sunset", caption: "A regional tour possibility" },
      { src: "service-travel-india.jpg", alt: "Traveller viewing historic Jaipur architecture", caption: "International destination enquiries" },
    ],
  },
  "/travel/flight-booking": {
    eyebrow: "Travel · Flight enquiries",
    title: "A smoother way to get there.",
    intro: "Tell us about the route and timing you are considering.",
    paragraphs: [
      "For a flight enquiry, share the origin and destination, preferred travel dates, whether the timing is flexible and the number of travellers. You can also mention cabin or connection preferences so the discussion starts with the right context.",
      "Please do not send passport numbers, payment-card details or other sensitive information through this website. This site does not show live flight inventory, issue tickets or hold a fare. Ticket options, applicable conditions, availability and final costs are confirmed directly before purchase.",
    ],
    service: "travel",
    images: [
      { src: "service-global-travel.jpg", alt: "Airport lounge overlooking aircraft at dusk", caption: "Flight planning and connections" },
      { src: "service-travel-transfer.jpg", alt: "Safari vehicle crossing golden grassland at sunrise", caption: "Ground arrangements around a journey" },
    ],
  },
  "/travel/executive-transfers": {
    eyebrow: "Travel · Transfers",
    title: "The journey between the journeys.",
    intro:
      "Ground transport coordination for individual and corporate itineraries.",
    paragraphs: [
      "An executive-transfer enquiry is easier to assess when it includes the pickup and drop-off points, date and time, passenger count, luggage needs and any accessibility requirements. Let us know whether you are considering a single transfer, airport connection or transport across a wider itinerary.",
      "Vehicle type, provider, route, timing, availability and cost are discussed and confirmed directly. No vehicle is reserved until the details and terms have been agreed.",
    ],
    service: "travel",
    images: [
      { src: "service-global-travel.jpg", alt: "Airport lounge with a view of the runway", caption: "Airport arrival coordination" },
      { src: "service-travel-transfer.jpg", alt: "Travel vehicle crossing grassland at sunrise", caption: "Ground transport enquiries" },
    ],
  },
  "/travel/hotel-reservations": {
    eyebrow: "Travel · Accommodation",
    title: "A stay that fits the journey.",
    intro:
      "Discuss accommodation enquiries with location, purpose and preference in mind.",
    paragraphs: [
      "Tell us the destination, check-in and check-out dates, number of guests and the type of stay you are considering. Location, room preferences, accessibility needs and the purpose of the trip can help shape the enquiry.",
      "Accommodation options, provider details, rates, availability, cancellation terms and inclusions are checked and confirmed directly. Sending an enquiry does not reserve a room.",
    ],
    service: "travel",
    images: [
      { src: "service-travel-stay.jpg", alt: "Warm, contemporary hotel room with soft morning light", caption: "Accommodation enquiries" },
      { src: "service-global-travel.jpg", alt: "Comfortable airport lounge overlooking an airfield", caption: "Stays connected to your journey" },
    ],
  },
  "/travel/destinations": {
    eyebrow: "Travel · Places",
    title: "East Africa and India, considered.",
    intro:
      "Two regions highlighted by Karibu and Beyond, with practical details discussed around each enquiry.",
    paragraphs: [
      "Use this page to start a conversation about East Africa, India or a journey linking destinations. Share the places you are considering, approximate timing, traveller numbers and the arrangements you would like to explore.",
      "Geographic references on this site describe areas of interest, not a promise of an office, local supplier or guaranteed availability in every location. Routes, providers, entry requirements and costs must be checked for your specific dates and nationality.",
    ],
    images: [
      { src: "service-tours-safari.jpg", alt: "Sunset across an East African landscape", caption: "East Africa" },
      { src: "service-travel-india.jpg", alt: "Visitor viewing historic architecture in Jaipur", caption: "India" },
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
      "Tell us which countries or places you hope to visit, the approximate dates, the size of your travelling party and the type of journey you have in mind. You can also mention whether you want to discuss tours, accommodation, transfers or a multi-stop route.",
      "Regional travel conditions and practical arrangements can vary by destination and season. Routes, suppliers, availability, costs and any applicable travel requirements are confirmed individually; no itinerary is assumed or booked from this page.",
    ],
    service: "travel",
    images: [
      { src: "service-tours-safari.jpg", alt: "Warm sunset over an East African safari landscape", caption: "East Africa travel enquiries" },
      { src: "service-travel-transfer.jpg", alt: "Safari vehicle in golden morning light", caption: "Routes and ground arrangements" },
    ],
  },
  "/travel/destinations/india": {
    eyebrow: "Travel · India",
    title: "India, with the details brought together.",
    intro:
      "Discuss general travel coordination or non-clinical medical tourism support.",
    paragraphs: [
      "For general travel, share the purpose, preferred timing, destination ideas and the practical arrangements you want to discuss. For non-clinical medical-travel coordination, use the dedicated enquiry page and describe logistics only.",
      "This page does not imply a local office, partnership or guaranteed availability in India. Do not send diagnoses, medical records or treatment details; clinical decisions belong with qualified healthcare professionals.",
    ],
    images: [
      { src: "service-travel-india.jpg", alt: "Visitor looking toward historic Jaipur architecture", caption: "India travel enquiries" },
      { src: "service-medical-travel.jpg", alt: "Travellers walking through a bright airport terminal", caption: "Non-clinical travel coordination" },
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
      "We discuss a wide range of event enquiries, including exhibitions, team-building activities, corporate events, conferences, summits, weddings and product launches. Each begins with the purpose of the gathering, the people attending and the experience you want to create.",
      "A brief can cover the proposed date and location, audience size, programme, venue preferences, accessibility needs and the parts of coordination you want to discuss. Depending on the request, this may include planning, schedules, guest flow, suppliers, venue arrangements, production or on-the-day coordination.",
      "Capabilities, suppliers, venue availability, inclusions and costs are checked for each brief and confirmed directly. An enquiry does not reserve a date or commit you to a proposal.",
    ],
    bullets: [
      "Exhibitions and showcases",
      "Team-building activities and internal events",
      "Corporate gatherings, meetings and launches",
      "Conferences and summits",
      "Weddings and personal celebrations",
      "Event planning, logistics and coordination discussions",
    ],
    service: "events",
    images: [
      { src: "service-events-exhibition.jpg", alt: "Attendees networking at a contemporary exhibition", caption: "Exhibitions and professional gatherings" },
      { src: "service-events-gathering.jpg", alt: "Elegant ballroom arranged for an event", caption: "Event settings are confirmed per brief" },
    ],
    links: [
      { label: "Corporate events", href: "/events/corporate" },
      { label: "Exhibitions", href: "/events/exhibitions" },
      { label: "Team-building activities", href: "/events/team-building" },
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
      "Use the events pages to explore exhibitions, team-building activities, corporate gatherings, conferences, weddings and product launches. Each page helps you shape an initial brief before discussing the practical details with the team.",
      "Useful starting information includes the event objective, proposed date or date range, location, audience size, programme outline and the coordination you are looking for. Scope, suppliers, venue options, availability and costs are reviewed and confirmed directly.",
    ],
    service: "events",
    images: [
      { src: "service-events-gathering.jpg", alt: "Formal event hall prepared for a gathering", caption: "Event coordination enquiries" },
      { src: "service-events-team.jpg", alt: "Colleagues taking part in an outdoor team-building activity", caption: "Corporate and team experiences" },
    ],
    links: [
      { label: "Corporate events", href: "/events/corporate" },
      { label: "Exhibitions", href: "/events/exhibitions" },
      { label: "Team-building activities", href: "/events/team-building" },
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
      "Corporate events can bring colleagues, clients or partners together for a clear purpose. We can discuss meetings, exhibitions, team-building activities, launches, client gatherings and internal occasions, with the format shaped around your audience and objectives.",
      "For a first conversation, outline the event goal, intended audience, estimated attendance, dates, location and the experience you want people to have. You can also identify the planning or coordination areas where you would like support.",
      "Venue, suppliers, activities, production and availability are not assumed. They are assessed for the brief and confirmed directly before a proposal or booking.",
    ],
    service: "events",
    images: [
      { src: "service-events-team.jpg", alt: "Colleagues collaborating during an outdoor team activity", caption: "Team-building enquiries" },
      { src: "service-events-gathering.jpg", alt: "Corporate gathering space prepared for guests", caption: "Corporate event settings" },
    ],
    links: [
      { label: "Exhibitions", href: "/events/exhibitions" },
      { label: "Team-building activities", href: "/events/team-building" },
      { label: "Request an event proposal", href: "/events/request-proposal" },
    ],
  },
  "/events/exhibitions": {
    eyebrow: "Events · Exhibitions",
    title: "Bring your showcase to life.",
    intro:
      "Discuss the audience, purpose and practical requirements behind your exhibition.",
    paragraphs: [
      "An exhibition enquiry can cover a trade showcase, public display, industry gathering or another format for bringing people and ideas together. Share the subject, intended audience, estimated attendance and what visitors should be able to see or do.",
      "The planning conversation may include dates, venue preferences, layout, exhibitor or guest flow, schedules, production and coordination needs. Any venue, supplier, technical capability, availability and cost is checked for the brief and confirmed directly.",
      "A first proposal is not a reservation. No date, exhibition stand, supplier or production package is assumed until the details are agreed.",
    ],
    service: "events",
    images: [
      { src: "service-events-exhibition.jpg", alt: "Attendees networking in a contemporary exhibition hall", caption: "Exhibition settings are illustrative" },
      { src: "service-events-gathering.jpg", alt: "Formal event hall arranged for a business gathering", caption: "Venue and production scope are confirmed per brief" },
    ],
    links: [{ label: "Request an event proposal", href: "/events/request-proposal" }],
  },
  "/events/team-building": {
    eyebrow: "Events · Team building",
    title: "Create space for teams to connect.",
    intro:
      "Explore a team-building event shaped around your people and the purpose of the day.",
    paragraphs: [
      "Start with the team, the reason for bringing people together and the kind of experience you want to create. This might be an internal gathering, a collaborative outdoor activity or a structured programme; the format and feasibility are discussed for your brief.",
      "Useful details include team size, proposed date, location, duration, accessibility considerations and any outcomes you hope the day will support. You can also mention whether you need help discussing venue, programme, facilitation or event logistics.",
      "Activities, facilitators, venues, suppliers, availability and costs are not guaranteed by this page. They are reviewed and confirmed directly before any arrangement proceeds.",
    ],
    service: "events",
    images: [
      { src: "service-events-team.jpg", alt: "Colleagues collaborating during an outdoor team-building activity", caption: "Team-building activity setting" },
      { src: "service-events-gathering.jpg", alt: "Elegant gathering space prepared for an event", caption: "Coordination options depend on the brief" },
    ],
    links: [{ label: "Request an event proposal", href: "/events/request-proposal" }],
  },
  "/events/conferences": {
    eyebrow: "Events · Conferences",
    title: "A clear plan for complex days.",
    intro:
      "Conference coordination that keeps delegates, programme and operations in view.",
    paragraphs: [
      "A conference brief can include the theme, audience, expected attendance, proposed dates, programme length and any venue preferences. Share whether you are considering a single-day meeting, a multi-day conference or a summit with several sessions.",
      "Planning discussions may cover delegate flow, registration, session timing, speaker requirements, accessibility, venue arrangements and production needs. The exact scope, suppliers and availability are reviewed and confirmed directly for your brief.",
    ],
    service: "events",
    images: [
      { src: "service-events-exhibition.jpg", alt: "Business attendees moving through an exhibition and conference space", caption: "Conference and exhibition environments" },
      { src: "service-events-gathering.jpg", alt: "Ballroom set for a formal business gathering", caption: "Venue arrangements are confirmed per brief" },
    ],
  },
  "/events/weddings": {
    eyebrow: "Events · Weddings",
    title: "A day that feels like yours.",
    intro:
      "Personal, attentive coordination for a meaningful celebration.",
    paragraphs: [
      "Every celebration has its own character. Begin with the date or season, location, approximate guest count and the moments that matter most to you. Your outline can also include the style of gathering, cultural or family considerations and the parts of planning you would like to discuss.",
      "Coordination conversations may cover a schedule, venue preferences, guest experience, suppliers and practical logistics. These are discussion points rather than guaranteed inclusions; availability, providers, scope and costs are confirmed directly before any commitment.",
    ],
    service: "events",
    images: [
      { src: "service-events-wedding.jpg", alt: "Intimate garden wedding ceremony in warm afternoon light", caption: "A celebration shaped around your brief" },
      { src: "service-events-gathering.jpg", alt: "Elegant reception space prepared for guests", caption: "Venue and event arrangements are confirmed" },
    ],
  },
  "/events/product-launches": {
    eyebrow: "Events · Launches",
    title: "Give a new idea its moment.",
    intro:
      "A launch conversation aligned to your audience, message and timeline.",
    paragraphs: [
      "Start with the product or idea, the audience you want to reach, the message you want the event to carry and your preferred timing. This helps shape a conversation about the launch format and the experience you want guests to take away.",
      "A proposal may explore programme flow, venue preferences, guest coordination, production requirements and supplier needs. Scope, availability and costs are confirmed for your brief before you make a commitment.",
    ],
    service: "events",
    images: [
      { src: "service-events-exhibition.jpg", alt: "Guests exploring a contemporary exhibition space", caption: "Launch and showcase settings" },
      { src: "service-events-gathering.jpg", alt: "Formal event venue prepared for a gathering", caption: "Event arrangements are confirmed per brief" },
    ],
  },
  "/events/event-production": {
    eyebrow: "Events · Production",
    title: "The details behind the experience.",
    intro:
      "Discuss production coordination and the practical requirements of your event.",
    paragraphs: [
      "If you are exploring event production, share the type of event, programme outline, venue status and the staging, sound, lighting or technical requirements you are considering. A clear outline helps identify what needs to be discussed next.",
      "Production equipment, technical teams, suppliers and venue capabilities are confirmed for each event. This page does not promise a specific setup or inventory; any proposed scope and costs are agreed directly before proceeding.",
    ],
    service: "events",
    images: [
      { src: "service-events-gathering.jpg", alt: "Large event hall set for a formal gathering", caption: "Event production context" },
      { src: "service-events-exhibition.jpg", alt: "Exhibition floor with attendees and display spaces", caption: "Production needs depend on the brief" },
    ],
  },
  "/events/request-proposal": {
    eyebrow: "Events · Proposal",
    title: "Share the outline of your event.",
    intro:
      "A useful proposal starts with the purpose, audience and practical requirements.",
    paragraphs: [
      "Include the event type, objective, proposed date or date range, location, estimated attendance and a brief programme outline. For exhibitions, team-building activities or corporate events, mention the audience and the experience you want to create.",
      "You can also note venue status, accessibility needs and the planning, logistics or production areas you want to discuss. The form prepares a message on your device; it does not submit or store your details on this website.",
      "Scope, suppliers, venue options, availability and costs are confirmed directly. Sending a request does not reserve a date or commit you to a proposal.",
    ],
    service: "events",
    images: [
      { src: "service-events-exhibition.jpg", alt: "Attendees networking in a modern exhibition space", caption: "Exhibition and corporate-event enquiries" },
      { src: "service-events-team.jpg", alt: "Colleagues collaborating during an outdoor team activity", caption: "Team-building activity enquiries" },
    ],
  },
  "/services/medical-tourism": {
    eyebrow: "Medical tourism",
    title: "Support around the journey, not the clinical decision.",
    intro:
      "Practical, non-clinical coordination for people exploring treatment abroad.",
    paragraphs: [
      "Karibu and Beyond can discuss non-clinical travel planning around an overseas care journey, including accommodation, transfers and practical communication. This service is about travel coordination only: we do not diagnose, prescribe, recommend a treatment or provider, assess clinical suitability or guarantee outcomes.",
      "You remain responsible for discussing treatment decisions, provider credentials, clinical suitability, risks and expected outcomes directly with qualified healthcare professionals. We do not claim a relationship with any particular hospital or clinic.",
      "For privacy, do not send diagnoses, medical records, test results, medication details or other sensitive health information through this website, email or WhatsApp. A first enquiry should contain logistics only.",
    ],
    bullets: [
      "Non-clinical travel and accommodation enquiries",
      "Transfers and practical journey-planning discussions",
      "A clear separation between coordination and clinical care",
      "No medical advice, diagnosis or treatment recommendation",
    ],
    service: "medical_tourism",
    images: [
      { src: "service-medical-care.jpg", alt: "Illustrative bright clinical treatment room", caption: "Illustrative setting only; no provider affiliation is implied" },
      { src: "service-medical-travel.jpg", alt: "Travellers walking through a bright airport terminal", caption: "Travel logistics and coordination" },
    ],
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
      "Begin with a short, non-clinical outline: the destination, approximate timing, number of travellers and practical arrangements you want to discuss. Do not include diagnoses, medical records, treatment plans or other health details.",
      "The team can clarify the travel-coordination request and discuss whether any logistical support may be relevant. Questions about providers, treatment choices, clinical suitability, risks and outcomes must be taken directly to qualified healthcare professionals.",
      "If you decide to travel, details such as dates, transfers and accommodation can be explored separately. No provider, travel service or appointment is booked or confirmed by making an enquiry.",
    ],
    service: "medical_tourism",
    images: [
      { src: "service-medical-travel.jpg", alt: "Travellers with luggage in an airport terminal", caption: "A travel-first coordination conversation" },
      { src: "service-medical-facility.jpg", alt: "Bright modern healthcare reception area", caption: "Illustrative setting only; no provider affiliation is implied" },
    ],
  },
  "/medical-tourism/treatment-enquiries": {
    eyebrow: "Medical tourism · Enquiry",
    title: "Discuss travel coordination in confidence.",
    intro:
      "Use this page for practical travel questions only.",
    paragraphs: [
      "Use this form only for travel and logistics questions. A suitable first outline includes your destination, approximate dates, number of travellers and the practical arrangements you want to discuss.",
      "Do not include diagnoses, test results, medical records, medication details, treatment plans or other clinical information. This website and the linked email or WhatsApp channels are not secure medical channels.",
      "Clinical decisions, provider credentials, treatment suitability, risks and outcomes must be confirmed directly with qualified healthcare professionals. An enquiry does not make or reserve a medical appointment.",
    ],
    service: "medical_tourism",
    images: [
      { src: "service-medical-travel.jpg", alt: "Travellers walking through an airport terminal", caption: "Travel and logistics only" },
      { src: "service-medical-care.jpg", alt: "Illustrative modern treatment room", caption: "Illustrative image; no provider affiliation is implied" },
    ],
  },
  "/medical-tourism/patient-support": {
    eyebrow: "Medical tourism · Support",
    title: "Considered support around travel.",
    intro:
      "Discuss practical help for the journey and the details around it.",
    paragraphs: [
      "Depending on the brief, a non-clinical support conversation may cover travel dates, accommodation enquiries, ground transfers, companion travel and communication logistics. Share only the practical details needed to understand the trip.",
      "We do not provide care, clinical interpretation, treatment recommendations or emergency support. Provider arrangements and travel options are not assumed; scope, availability and costs are discussed and confirmed directly.",
      "Please do not share health records, diagnoses, test results or treatment information through general contact channels.",
    ],
    service: "medical_tourism",
    images: [
      { src: "service-medical-facility.jpg", alt: "Modern healthcare reception and waiting area", caption: "Illustrative setting only" },
      { src: "service-global-travel.jpg", alt: "Airport lounge overlooking the airfield", caption: "Travel arrangements are discussed separately" },
    ],
  },
  "/medical-tourism/faq": {
    eyebrow: "Medical tourism · FAQ",
    title: "Clear answers before you enquire.",
    intro: "Important boundaries and practical notes.",
    paragraphs: [
      "Do you provide treatment or medical advice? No. The service is limited to non-clinical travel and practical coordination discussions.",
      "Can you assess or recommend a provider or treatment? No. Discuss provider credentials, clinical suitability, risks and decisions directly with qualified healthcare professionals.",
      "What should I include in an enquiry? Only travel logistics such as destination, approximate timing, traveller count and arrangements you would like to discuss.",
      "Should I send medical records or diagnoses? No. Do not submit clinical information through this website, email or WhatsApp.",
      "Does an enquiry book an appointment or trip? No. It starts a conversation; availability, scope and terms must be confirmed directly.",
    ],
    images: [
      { src: "service-medical-travel.jpg", alt: "Travellers moving through an airport terminal", caption: "Travel coordination only" },
      { src: "service-medical-care.jpg", alt: "Illustrative treatment room with medical equipment", caption: "Illustrative image; no provider affiliation is implied" },
    ],
    links: [{ label: "How it works", href: "/medical-tourism/how-it-works" }],
  },
  "/services/pilgrimage-tourism": {
    eyebrow: "Pilgrimage",
    title: "Journeys held with care and respect.",
    intro:
      "Thoughtful coordination for faith-led travel and group journeys.",
    paragraphs: [
      "A pilgrimage enquiry begins with the purpose of the journey and the needs of the people travelling. We can discuss a personal, family, faith-community or organisational trip, then explore the practical outline around your proposed dates and destination.",
      "Useful details include the group size, preferred departure point, approximate timing, programme priorities, mobility or accessibility considerations and the logistics you would like to discuss. Do not include passport details or sensitive personal information in an initial enquiry.",
      "Routes, accommodation, suppliers, availability, inclusions and costs are confirmed for each brief. This page does not advertise fixed departures or reserve places.",
    ],
    bullets: [
      "Personal, family, group and organisational enquiries",
      "Itinerary discussions shaped around purpose and timing",
      "Practical coordination around transport and accommodation",
      "Clear confirmation of details before arrangements proceed",
    ],
    service: "pilgrimage",
    images: [
      { src: "service-pilgrimage-interior.jpg", alt: "Historic sacred-site interior illuminated by warm light", caption: "A reflective setting for a meaningful journey" },
      { src: "service-pilgrimage-group.jpg", alt: "Faith group walking together toward a historic site", caption: "Group travel enquiries" },
    ],
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
      "Share the destination or sites you are considering, your proposed dates, who is travelling and the purpose of the journey. The first conversation can help identify the practical questions to resolve before an itinerary is prepared.",
      "Group size, departure point, transport, accommodation, timing, accessibility and programme needs can all shape the discussion. No departure date, route, supplier or itinerary is assumed or confirmed by this website.",
    ],
    service: "pilgrimage",
    images: [
      { src: "service-pilgrimage-interior.jpg", alt: "Historic sacred-site interior with warm architectural lighting", caption: "Illustrative sacred-site setting" },
      { src: "service-pilgrimage-group.jpg", alt: "A small faith group walking together at a historic site", caption: "Faith-led group travel" },
    ],
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
      "Group journeys benefit from a shared outline before arrangements are explored. Start with the number of travellers, age range if relevant, preferred dates, departure point, destination and the purpose or programme of the trip.",
      "The planning conversation can cover how the group will travel together, accommodation preferences, local transport, accessibility needs, communication with participants and any timing constraints. Share only information relevant to planning; do not send passport numbers or sensitive personal details through the website.",
      "Group capacity, chaperoning, suppliers, arrangements and costs are reviewed for each enquiry and confirmed directly. An enquiry does not reserve places.",
    ],
    service: "pilgrimage",
    images: [
      { src: "service-pilgrimage-group.jpg", alt: "Faith group walking together toward a historic sacred site", caption: "Group pilgrimage planning" },
      { src: "service-pilgrimage-interior.jpg", alt: "Historic sacred-site interior with warm lighting", caption: "Sites and routes depend on the brief" },
    ],
  },
  "/pilgrimage/planning": {
    eyebrow: "Pilgrimage · Planning",
    title: "A considered plan for a meaningful journey.",
    intro:
      "Start with the purpose. Discuss the practicalities together.",
    paragraphs: [
      "Begin with the spiritual or community purpose of the journey, the sites being considered and the time available. From there, a planning conversation can outline the route, travel days, rest periods and the practical arrangements that need further checking.",
      "Depending on the brief, discussion points may include group needs, departure options, transport, accommodation enquiries, accessibility, meals and communication with travellers. Specific arrangements, suppliers and prices are confirmed directly before a booking.",
    ],
    service: "pilgrimage",
    images: [
      { src: "service-pilgrimage-interior.jpg", alt: "Historic sacred-site interior lit by candles and warm light", caption: "Planning around the purpose of the journey" },
      { src: "service-pilgrimage-group.jpg", alt: "Small group walking together at a historic site", caption: "Practical group coordination" },
    ],
  },
  "/pilgrimage/request-itinerary": {
    eyebrow: "Pilgrimage · Enquiry",
    title: "Request an itinerary conversation.",
    intro:
      "Tell us about your group and the journey you are considering.",
    paragraphs: [
      "For a useful first outline, include your destination or sites of interest, preferred timing, approximate group size, departure location and the type of practical coordination you would like to discuss.",
      "This form prepares a message on your device; it does not book travel or reserve an itinerary. Please avoid passport details and other sensitive personal information. Availability, arrangements and costs are confirmed directly.",
    ],
    service: "pilgrimage",
    images: [
      { src: "service-pilgrimage-group.jpg", alt: "Faith group walking toward a historic sacred site", caption: "Start with your group and proposed journey" },
      { src: "service-pilgrimage-interior.jpg", alt: "Warmly lit historic sacred-site interior", caption: "Illustrative destination imagery" },
    ],
  },
  "/pilgrimage/faq": {
    eyebrow: "Pilgrimage · FAQ",
    title: "A few helpful first answers.",
    intro: "Every pilgrimage enquiry is different.",
    paragraphs: [
      "Do you publish fixed itineraries? Only details confirmed by the company are published. Routes, dates, suppliers and inclusions are discussed for each enquiry.",
      "Can a faith community or organisation enquire for a group? Yes. Share a non-sensitive outline with approximate group size, proposed timing, departure point and destination.",
      "Can you accommodate every mobility or dietary requirement? Share practical needs early so they can be discussed. No specific arrangement is guaranteed until reviewed and confirmed directly.",
      "Does an enquiry reserve travel? No. It starts a conversation; transport, accommodation, prices and availability are confirmed separately.",
    ],
    images: [
      { src: "service-pilgrimage-interior.jpg", alt: "Warmly lit historic sacred-site interior", caption: "Illustrative destination imagery" },
      { src: "service-pilgrimage-group.jpg", alt: "Faith group travelling together at a historic site", caption: "Group travel enquiries" },
    ],
    links: [{ label: "Request an itinerary conversation", href: "/pilgrimage/request-itinerary" }],
  },
  "/services/consultancy": {
    eyebrow: "Consultancy",
    title: "A thoughtful partner for your next decision.",
    intro:
      "Structured conversations for individuals, corporations and institutions.",
    paragraphs: [
      "Consultancy enquiries begin with the decision, challenge or opportunity you are working through. Share the context at a high level, who is involved and what a useful outcome would look like; the first conversation can establish whether a further discussion makes sense.",
      "Potential engagements are scoped around the specific brief, expected outputs, stakeholders, timing and working arrangements. This website does not claim a defined specialty or credential unless it is explicitly listed and confirmed.",
      "Please do not send confidential, commercially sensitive or personal information through this website, email or WhatsApp. A proposal or enquiry is not an engagement agreement.",
    ],
    bullets: [
      "Clarify the context and question behind your enquiry",
      "Discuss the outcome you are working towards",
      "Explore whether consultancy support may be relevant",
      "Agree practical next steps without assuming an engagement",
    ],
    service: "consultancy",
    images: [
      { src: "service-consultancy-meeting.jpg", alt: "Kenyan professionals discussing a business question together", caption: "A considered first conversation" },
      { src: "service-consultancy-workshop.jpg", alt: "Hands arranging planning notes during a collaborative workshop", caption: "Scope and outputs are agreed per brief" },
    ],
    links: [{ label: "Request a consultation", href: "/consultation/request" }],
  },
  "/consultation/request": {
    eyebrow: "Consultancy · Enquiry",
    title: "Start with the question in front of you.",
    intro: "Share a concise, non-confidential overview.",
    paragraphs: [
      "A concise outline is enough to begin: describe the non-confidential challenge, the outcome you want to explore, the organisation or context and your preferred next step.",
      "If the enquiry appears relevant, the team can discuss scope, timing and possible outputs. Do not include confidential, commercially sensitive, financial or personal information. This initial contact is not an engagement agreement.",
    ],
    service: "consultancy",
    images: [
      { src: "service-consultancy-meeting.jpg", alt: "Professionals discussing a business brief in a meeting", caption: "A clear brief helps shape the conversation" },
      { src: "service-consultancy-workshop.jpg", alt: "Collaborative planning notes on a workshop table", caption: "Possible scope is confirmed directly" },
    ],
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
      "The site uses no analytics or advertising cookies. Contact bookings@karibuandbeyond.co.ke for questions about this notice. Business-specific legal terms should be reviewed by qualified counsel.",
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
      "The site is designed for keyboard access, readable contrast, responsive layouts and reduced-motion preferences. If you encounter a barrier, contact bookings@karibuandbeyond.co.ke or call either number shown on the site.",
    ],
  },
  "/unsubscribe": {
    eyebrow: "Email preferences",
    title: "Email preferences",
    intro: "This static website does not operate a newsletter list.",
    paragraphs: [
      "If you have received an email from Karibu and Beyond and want to change your preferences, reply to that email or contact bookings@karibuandbeyond.co.ke. Do not send personal details through this page.",
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
