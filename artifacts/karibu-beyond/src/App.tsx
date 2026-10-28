import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ClerkProvider, SignIn, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight,
  Compass, Globe2, Menu, Plane, Plus, Send, Sparkles,
  X, CalendarDays, MapPin, Mail, Phone, Building2, HeartPulse, BriefcaseBusiness,
  Landmark, FileText, LayoutDashboard, MessageSquare, Package, Settings, LogOut,
  Eye, Copy, ExternalLink,
} from 'lucide-react';
import {
  Route, Switch, useLocation, useParams, Router as WouterRouter,
} from 'wouter';
import {
  getGetAdminSessionQueryKey, getGetPackageQueryKey, getGetArticleQueryKey, getListAdminEnquiriesQueryKey, getListAdminPackagesQueryKey,
  getListAdminArticlesQueryKey, getListAdminTestimonialsQueryKey,
  useCreateEnquiry, useSubscribeNewsletter, useUnsubscribeNewsletter,
  useListPackages, useGetPackage, useListArticles, useGetArticle, useListTestimonials,
  useGetPublicSiteSettings, useGetAdminSession, useGetAdminDashboard, useListAdminEnquiries,
  useUpdateEnquiryStatus, useAddEnquiryNote, useListAdminPackages, useCreateAdminPackage,
  useUpdateAdminPackage, useDuplicateAdminPackage, useListAdminPackageCategories,
  useCreatePackageCategory, useListAdminArticles, useCreateAdminArticle, useUpdateAdminArticle,
  useListAdminTestimonials, useCreateAdminTestimonial, useUpdateAdminTestimonial,
  useGetAdminSiteSettings, useUpdateAdminSiteSettings,
} from '@workspace/api-client-react';
import type { EnquiryInputService, EnquiryStatus, PublicationStatus } from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import '../index.css';
import './site.css';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

function stripBase(path: string) {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}

const pages: Record<string, { eyebrow: string; title: string; intro: string; body: string; links?: [string, string][]; service?: EnquiryInputService }> = {
  '/about': { eyebrow: 'About Karibu and Beyond', title: 'A thoughtful welcome to what comes next.', intro: 'Karibu means welcome. We bring that spirit to the details that make a journey, event or important decision feel well held.', body: 'Karibu and Beyond Ltd is a Kenya-based service company coordinating premium travel, events, medical tourism, pilgrimage and consultancy for individuals, corporations and institutions. Our work begins by listening, then bringing the moving parts into one clear plan. We work across East Africa and India, with a personal point of contact from first conversation to the final detail.', links: [['Why choose us', '/why-choose-us'], ['Our services', '/services']] },
  '/why-choose-us': { eyebrow: 'The way we work', title: 'Considered for a global world.', intro: 'Good coordination is not louder. It is clearer, more attentive and easier to trust.', body: 'We bring related services together under one roof, so your plans have continuity. We pay attention to context, preferences and practicalities—then keep communication straightforward. Every engagement is shaped around your brief; no pre-set assumptions, no promises before we understand what you need.', links: [['Meet our services', '/services'], ['Start a conversation', '/contact']] },
  '/services': { eyebrow: 'One company. Many possibilities.', title: 'Support for the moments that matter.', intro: 'From a quiet transfer to a complex institutional brief, we coordinate the details around you.', body: 'Explore our service areas and find the right starting point. A conversation is an enquiry, not a booking or commitment.', service: 'general', links: [['Travel & transfers', '/services/tours-travel-transfers'], ['Events', '/services/events-management'], ['Medical tourism', '/services/medical-tourism'], ['Pilgrimage', '/services/pilgrimage-tourism'], ['Consultancy', '/services/consultancy']] },
  '/services/tours-travel-transfers': { eyebrow: 'Travel', title: 'Travel, arranged around you.', intro: 'Thoughtful planning for journeys across East Africa and beyond.', body: 'We can help coordinate curated tours, safari enquiries, flights, accommodation and executive transfers. Tell us where you hope to go and what matters most; we will discuss an approach that fits.', service: 'travel', links: [['Explore travel', '/travel'], ['Destinations', '/travel/destinations']] },
  '/travel': { eyebrow: 'Travel, with room to breathe', title: 'From the first connection to the last mile.', intro: 'A considered travel plan makes more space for the reason you are going.', body: 'Our travel coordination can include safari and tour planning, flight booking enquiries, executive transfers and hotel reservations. Each request is discussed individually. No prices or itineraries are published until confirmed.', service: 'travel', links: [['Luxury safaris', '/travel/luxury-safaris'], ['Curated tours', '/travel/curated-tours'], ['Flight booking', '/travel/flight-booking'], ['Executive transfers', '/travel/executive-transfers'], ['Hotel reservations', '/travel/hotel-reservations'], ['Destinations', '/travel/destinations']] },
  '/travel/luxury-safaris': { eyebrow: 'Travel · Safaris', title: 'A safari shaped around your pace.', intro: 'Open landscapes, thoughtful timing and practical details handled with care.', body: 'Share your preferred dates, group size and the kind of experience you have in mind. We will respond with a tailored discussion. Published packages, when available, appear in our catalogue.', service: 'travel' },
  '/travel/curated-tours': { eyebrow: 'Travel · Curated tours', title: 'Go beyond the checklist.', intro: 'Journeys with a sense of place, built around your interests and time.', body: 'From a short regional escape to a longer multi-stop itinerary, our team can discuss routes, connections and pace. Nothing is booked from this enquiry form.', service: 'travel' },
  '/travel/flight-booking': { eyebrow: 'Travel · Flights', title: 'A smoother way to get there.', intro: 'Tell us about the route and timing you are considering.', body: 'We coordinate flight booking enquiries and can discuss routing, preferred dates and traveller requirements. Ticket availability and fare conditions are confirmed directly before any booking.', service: 'travel' },
  '/travel/executive-transfers': { eyebrow: 'Travel · Transfers', title: 'The journey between the journeys.', intro: 'Ground transport coordination for individual and corporate itineraries.', body: 'Share your arrival or departure point, timing and passenger requirements. We will follow up to clarify arrangements and availability before confirming anything.', service: 'travel' },
  '/travel/hotel-reservations': { eyebrow: 'Travel · Stays', title: 'A stay that fits the journey.', intro: 'Accommodation enquiries with location, purpose and preference in mind.', body: 'Let us know the destination, dates, room requirements and what a good stay means to you. We will discuss suitable options and terms before confirmation.', service: 'travel' },
  '/travel/destinations': { eyebrow: 'Travel · Places', title: 'East Africa and India, considered.', intro: 'Two regions, many reasons to travel. Start with the place that is calling you.', body: 'Browse destination notes as a starting point, then get in touch to shape the practical details around your dates and interests.', links: [['Kenya', '/travel/destinations/kenya'], ['Tanzania', '/travel/destinations/tanzania'], ['India', '/travel/destinations/india']] },
  '/services/events-management': { eyebrow: 'Events', title: 'A gathering, thoughtfully brought together.', intro: 'Clear planning and calm coordination for events with something to say.', body: 'We coordinate corporate events, conferences, weddings, product launches and event production. Tell us the occasion, scale and what success looks like; we will begin with a conversation.', service: 'events', links: [['Corporate events', '/events/corporate'], ['Conferences', '/events/conferences'], ['Weddings', '/events/weddings'], ['Product launches', '/events/product-launches'], ['Event production', '/events/event-production'], ['Request a proposal', '/events/request-proposal']] },
  '/events': { eyebrow: 'Events', title: 'Bring people together with purpose.', intro: 'From the first brief to the final run of show, we help coordinate the moving parts.', body: 'Explore our event capabilities and tell us what you are planning. Every event proposal is developed around your brief and confirmed requirements.', service: 'events', links: [['Corporate events', '/events/corporate'], ['Conferences', '/events/conferences'], ['Weddings', '/events/weddings'], ['Product launches', '/events/product-launches'], ['Event production', '/events/event-production']] },
  '/events/corporate': { eyebrow: 'Events · Corporate', title: 'Make the room work harder.', intro: 'Corporate gatherings designed around the people, purpose and practicalities.', body: 'We can discuss meetings, launches, client gatherings and internal occasions. Share an outline and we will follow up to understand your goals, timing and requirements.', service: 'events' },
  '/events/conferences': { eyebrow: 'Events · Conferences', title: 'A clear plan for complex days.', intro: 'Conference coordination that keeps delegates, programme and operations in view.', body: 'Tell us about your audience, proposed dates, venue preferences and programme. We will develop the conversation from there.', service: 'events' },
  '/events/weddings': { eyebrow: 'Events · Weddings', title: 'A day that feels like yours.', intro: 'Personal, attentive coordination for meaningful celebrations.', body: 'Every celebration has its own character. Share the kind of day you are imagining and we will discuss the details together.', service: 'events' },
  '/events/product-launches': { eyebrow: 'Events · Launches', title: 'Give a new idea its moment.', intro: 'A launch experience aligned to your audience and message.', body: 'We can coordinate venue, production and event flow around your brand brief. Share your timeline and objectives to begin.', service: 'events' },
  '/events/event-production': { eyebrow: 'Events · Production', title: 'The details behind the experience.', intro: 'Production coordination that makes the programme feel effortless.', body: 'From staging and technical requirements to event-day sequencing, we can talk through what your production requires. All capabilities and supplier arrangements are confirmed per brief.', service: 'events' },
  '/events/request-proposal': { eyebrow: 'Events · Enquiry', title: 'Let’s shape the brief together.', intro: 'Tell us what you are planning. This is an enquiry, not a booking.', body: 'A few details help us understand the occasion, timeline and scale. We will be in touch to discuss the next step.', service: 'events' },
  '/services/medical-tourism': { eyebrow: 'Medical tourism', title: 'Support around the journey—not the clinical decision.', intro: 'Practical coordination for people exploring treatment in India.', body: 'We provide non-clinical travel and patient support coordination, such as travel planning and communication logistics. We do not provide medical advice, diagnose, recommend treatment or collect clinical details. Treatment decisions and provider suitability should be discussed directly with qualified healthcare professionals.', service: 'medical_tourism', links: [['How it works', '/medical-tourism/how-it-works'], ['Patient support', '/medical-tourism/patient-support'], ['Treatment enquiries', '/medical-tourism/treatment-enquiries'], ['Frequently asked questions', '/medical-tourism/faq']] },
  '/medical-tourism/how-it-works': { eyebrow: 'Medical tourism · Process', title: 'A practical path, at your pace.', intro: 'Start with the logistics you want help exploring.', body: '1. Share a non-clinical enquiry. 2. We respond to understand travel coordination needs. 3. You communicate directly with qualified providers for clinical advice and decisions. 4. If you choose to travel, we can discuss practical arrangements. No medical records or clinical details are requested here.', service: 'medical_tourism' },
  '/medical-tourism/treatment-enquiries': { eyebrow: 'Medical tourism · Enquiry', title: 'Discuss travel coordination in confidence.', intro: 'Please do not include diagnoses, reports, medications or other clinical information.', body: 'Use this form only for travel logistics and general coordination questions. Clinical decisions, provider credentials, treatment suitability and outcomes must be confirmed with the healthcare provider directly.', service: 'medical_tourism' },
  '/medical-tourism/patient-support': { eyebrow: 'Medical tourism · Support', title: 'More considered support around travel.', intro: 'Practical help for the journey and the details around it.', body: 'Depending on your needs, we can discuss travel planning, accommodation enquiries, transfers and communication coordination. Support is non-clinical and arranged case by case.', service: 'medical_tourism' },
  '/medical-tourism/faq': { eyebrow: 'Medical tourism · FAQ', title: 'Clear answers before you enquire.', intro: 'A few important boundaries and practical notes.', body: 'Do you provide treatment? No; we coordinate non-clinical travel support. Can you advise which treatment to choose? No; consult qualified healthcare professionals directly. Should I send medical records? No; please do not submit clinical details through this website. Is an enquiry a booking? No; it is simply a request to discuss coordination.', links: [['How it works', '/medical-tourism/how-it-works']] },
  '/services/pilgrimage-tourism': { eyebrow: 'Pilgrimage', title: 'Journeys held with care and respect.', intro: 'Thoughtful coordination for faith-led travel and group journeys.', body: 'We listen to the purpose, timing and needs of your group, then discuss an itinerary and practical arrangements. All arrangements are subject to confirmation.', service: 'pilgrimage', links: [['Group journeys', '/pilgrimage/group-journeys'], ['Planning', '/pilgrimage/planning'], ['Request an itinerary', '/pilgrimage/request-itinerary'], ['FAQs', '/pilgrimage/faq']] },
  '/pilgrimage': { eyebrow: 'Pilgrimage', title: 'Make space for the meaning of the journey.', intro: 'We coordinate practical details around faith-led travel, with respect for each group’s needs.', body: 'Share your destination, proposed dates and group outline. We will discuss the right next step with you.', service: 'pilgrimage', links: [['Group journeys', '/pilgrimage/group-journeys'], ['Planning', '/pilgrimage/planning'], ['Request an itinerary', '/pilgrimage/request-itinerary'], ['FAQs', '/pilgrimage/faq']] },
  '/pilgrimage/group-journeys': { eyebrow: 'Pilgrimage · Groups', title: 'Travel together, with clarity.', intro: 'Group journeys need thoughtful coordination before the first departure.', body: 'We can discuss group size, dates, departure points and the kind of support that would help your journey. No itinerary is assumed or published before confirmation.', service: 'pilgrimage' },
  '/pilgrimage/planning': { eyebrow: 'Pilgrimage · Planning', title: 'A considered plan for a meaningful journey.', intro: 'Start with the purpose. We can work through the practicalities together.', body: 'A useful planning conversation covers timing, group needs, transport, accommodation enquiries and communication. Share only the details relevant to logistics.', service: 'pilgrimage' },
  '/pilgrimage/request-itinerary': { eyebrow: 'Pilgrimage · Enquiry', title: 'Request an itinerary conversation.', intro: 'Tell us about your group and the journey you are considering.', body: 'This is an enquiry, not a booking. We will follow up to clarify your dates and requirements.', service: 'pilgrimage' },
  '/pilgrimage/faq': { eyebrow: 'Pilgrimage · FAQ', title: 'A few helpful first answers.', intro: 'Every pilgrimage is different; these are the basics.', body: 'Do you publish fixed itineraries? Only when a package has been confirmed and published. Can we enquire for a group? Yes, share an outline in the form. Does an enquiry reserve travel? No, arrangements are confirmed separately after discussion.', links: [['Request an itinerary', '/pilgrimage/request-itinerary']] },
  '/services/consultancy': { eyebrow: 'Consultancy', title: 'A thoughtful partner for your next decision.', intro: 'Structured conversations for individuals, corporations and institutions.', body: 'Tell us about the challenge, context and outcome you are working towards. We will discuss whether and how our consultancy support can help.', service: 'consultancy', links: [['Request a consultation', '/consultation/request']] },
  '/consultation/request': { eyebrow: 'Consultancy · Enquiry', title: 'Start with the question in front of you.', intro: 'Share a concise overview and we will get back to you.', body: 'Please avoid sending confidential or sensitive material through this form. This is an initial enquiry, not an engagement agreement.', service: 'consultancy' },
  '/consultation': { eyebrow: 'Let’s talk', title: 'A good next step begins with a conversation.', intro: 'Tell us what you are considering and we will help find the right starting point.', body: 'Choose the closest service area and share a few details. An enquiry is not a booking, commitment or confirmed service.', service: 'general' },
  '/faq': { eyebrow: 'Frequently asked questions', title: 'A little more clarity, before hello.', intro: 'How we work, what an enquiry means and what to expect.', body: 'Is an enquiry a booking? No. It is a request to discuss a service. Do you publish package prices? We only show pricing included in approved published package data; no packages are currently confirmed on this site. Where do you work? We are based in Embakasi, Nairobi, and coordinate across East Africa and India. Do you provide clinical advice? No. Medical tourism support is non-clinical; consult a qualified healthcare professional.', links: [['Contact us', '/contact'], ['Browse packages', '/packages']] },
  '/contact': { eyebrow: 'Contact', title: 'Tell us what you have in mind.', intro: 'A real person will follow up to understand how we can help.', body: 'Karibu and Beyond Ltd · Embakasi / North Airport Road, Nairobi · East Africa and India. Email info@karibuandbeyondltd.com or call +254 729 861 607 / +254 711 556 151.', service: 'general' },
  '/privacy-policy': { eyebrow: 'Your information', title: 'Privacy policy', intro: 'We treat the information you share with care.', body: 'We collect information you submit through enquiries and newsletter forms to respond to your request or manage your subscription. Do not submit clinical or other sensitive personal information. Data is handled for the purpose it was provided and retained according to applicable requirements. Contact info@karibuandbeyondltd.com with questions about your information.' },
  '/cookie-policy': { eyebrow: 'Your choices', title: 'Cookie policy', intro: 'A clear note about browser storage.', body: 'This site may use essential technical storage for basic site operation and authentication. If analytics or optional cookies are enabled in future, this page should be updated to identify them and explain your choices.' },
  '/terms-and-conditions': { eyebrow: 'Using this site', title: 'Terms and conditions', intro: 'Please read these notes when using our website.', body: 'Website content is general information and does not constitute a booking, offer, medical advice or a service agreement. Availability, itineraries, suppliers and costs are confirmed directly in writing before any arrangement is made. Medical decisions must be made with qualified healthcare professionals. Contact us if you have questions.' },
  '/accessibility': { eyebrow: 'Access for everyone', title: 'Accessibility', intro: 'We want the experience to be usable by as many people as possible.', body: 'This site is designed with keyboard access, responsive layouts, readable contrast and reduced-motion preferences in mind. If you encounter an accessibility barrier, please contact info@karibuandbeyondltd.com so we can help.' },
  '/unsubscribe': { eyebrow: 'Email preferences', title: 'Manage your subscription', intro: 'Use the secure link from your email to unsubscribe.', body: 'Your secure unsubscribe token is not displayed. Submit the link from your email to complete the request.' },
};

const navGroups = [
  { label: 'Travel', href: '/travel', children: [['Safaris', '/travel/luxury-safaris'], ['Curated tours', '/travel/curated-tours'], ['Destinations', '/travel/destinations']] },
  { label: 'Events', href: '/events', children: [['Corporate', '/events/corporate'], ['Conferences', '/events/conferences'], ['Weddings', '/events/weddings']] },
  { label: 'Medical tourism', href: '/services/medical-tourism', children: [['How it works', '/medical-tourism/how-it-works'], ['Patient support', '/medical-tourism/patient-support']] },
  { label: 'Pilgrimage', href: '/pilgrimage', children: [['Group journeys', '/pilgrimage/group-journeys'], ['Planning', '/pilgrimage/planning']] },
];
const serviceIcons = [Plane, CalendarDays, HeartPulse, Landmark, BriefcaseBusiness];
const serviceTiles = [
  ['Travel & transfers', '/services/tours-travel-transfers', 'Journeys planned with context, from flight enquiries to the final transfer.'],
  ['Events management', '/services/events-management', 'Gatherings coordinated around purpose, people and practical detail.'],
  ['Medical tourism', '/services/medical-tourism', 'Non-clinical travel coordination for people exploring care in India.'],
  ['Pilgrimage tourism', '/services/pilgrimage-tourism', 'Respectful planning for faith-led travel and group journeys.'],
  ['Consultancy', '/services/consultancy', 'A considered conversation for organisational and individual briefs.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topline"><div className="container-wide topline-inner"><span>Kenya · East Africa · India</span><div><a href="mailto:info@karibuandbeyondltd.com">info@karibuandbeyondltd.com</a><span className="top-sep">/</span><a href="tel:+254729861607">+254 729 861 607</a></div></div></div>
    <div className="container-wide nav-row">
      <a className="brand" href="/" aria-label="Karibu and Beyond home"><img src="/karibu-logo.png" alt="Karibu and Beyond Ltd" /></a>
      <button className="mobile-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        <a href="/about">Our story</a>
        {navGroups.map(group => <div key={group.label} className="nav-dropdown"><a href={group.href}>{group.label}<ChevronDown size={13} /></a><div className="dropdown-menu">{group.children.map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={13} /></a>)}</div></div>)}
        <a href="/services/consultancy">Consultancy</a><a href="/insights">Insights</a>
      </nav>
      <a className="button button-dark nav-cta" href="/contact">Let’s talk <ArrowRight size={15} /></a>
    </div>
  </header>;
}

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const subscribe = useSubscribeNewsletter();
  const submit = (e: FormEvent) => {
    e.preventDefault(); setMessage('');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setMessage('Please enter a valid email address.'); return; }
    subscribe.mutate({ data: { email, consent: true } }, { onSuccess: r => { setMessage(r.message); setEmail(''); }, onError: () => setMessage('We could not process that request. Please try again shortly.') });
  };
  return <footer className="footer">
    <div className="container-wide footer-main">
      <div className="footer-brand"><img src="/karibu-logo.png" alt="Karibu and Beyond Ltd" /><p>Premium service, considered for a global world.</p><div className="footer-region"><Globe2 size={15} /> Kenya · East Africa · India</div></div>
      <div><h3>Explore</h3><a href="/about">Our story</a><a href="/services">Services</a><a href="/packages">Packages</a><a href="/insights">Insights</a><a href="/faq">FAQs</a></div>
      <div><h3>Get in touch</h3><a href="mailto:info@karibuandbeyondltd.com">info@karibuandbeyondltd.com</a><a href="tel:+254729861607">+254 729 861 607</a><a href="tel:+254711556151">+254 711 556 151</a><span>Embakasi / North Airport Road</span><a href="/contact">Contact details <ArrowUpRight size={13} /></a></div>
      <div className="newsletter"><h3>Notes from our world</h3><p>Occasional travel, event and planning perspectives. No noise.</p><form onSubmit={submit} className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} data-testid="input-newsletter-email" /><button disabled={subscribe.isPending} aria-label="Subscribe to newsletter" data-testid="button-newsletter-submit"><ArrowRight size={17} /></button></form><label className="consent-small"><input type="checkbox" required /> I agree to receive occasional email updates.</label>{message && <p className="form-feedback" role="status">{message}</p>}</div>
    </div>
    <div className="container-wide footer-bottom"><span>© {new Date().getFullYear()} Karibu and Beyond Ltd</span><div><a href="/privacy-policy">Privacy</a><a href="/cookie-policy">Cookies</a><a href="/terms-and-conditions">Terms</a><a href="/accessibility">Accessibility</a><a href="/unsubscribe">Unsubscribe</a></div></div>
  </footer>;
}

function EnquiryForm({ service = 'general', compact = false, packageSlug = '' }: { service?: EnquiryInputService; compact?: boolean; packageSlug?: string }) {
  const [receipt, setReceipt] = useState('');
  const [error, setError] = useState('');
  const create = useCreateEnquiry();
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setReceipt('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const message = String(fd.get('message') || '').trim();
    const name = String(fd.get('fullName') || '').trim();
    const email = String(fd.get('email') || '').trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10 || !fd.get('consent')) {
      setError('Please check your name, email, message and contact consent.'); return;
    }
    const participantText = String(fd.get('participants') || '');
    create.mutate({ data: {
      fullName: name, email, phone: String(fd.get('phone') || '') || null, service,
      packageSlug: packageSlug || null, preferredDates: String(fd.get('preferredDates') || '') || null,
      participants: participantText ? Number(participantText) : null,
      departureLocation: String(fd.get('departureLocation') || '') || null,
      destination: String(fd.get('destination') || '') || null, eventType: String(fd.get('eventType') || '') || null,
      budgetRange: String(fd.get('budgetRange') || '') || null, message, contactConsent: true,
      marketingConsent: Boolean(fd.get('marketingConsent')),
    } }, { onSuccess: r => { setReceipt(`Thank you. Your enquiry reference is ${r.reference}. ${r.message}`); form.reset(); }, onError: () => setError('We could not send your enquiry just now. Please try again or contact us directly.') });
  }
  return <form className={`enquiry-form ${compact ? 'compact-form' : ''}`} onSubmit={onSubmit} noValidate>
    <div className="form-grid"><label>Your name<input name="fullName" autoComplete="name" required minLength={2} placeholder="Name" data-testid="input-enquiry-name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" data-testid="input-enquiry-email" /></label><label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="+254" data-testid="input-enquiry-phone" /></label>
      {service === 'events' && <label>Event type<input name="eventType" placeholder="Conference, celebration…" data-testid="input-enquiry-event-type" /></label>}
      {(service === 'travel' || service === 'pilgrimage') && <><label>Destination<input name="destination" placeholder="Where are you considering?" data-testid="input-enquiry-destination" /></label><label>Preferred dates<input name="preferredDates" placeholder="Approximate timing is fine" data-testid="input-enquiry-dates" /></label><label>Departure point<input name="departureLocation" placeholder="City or airport" data-testid="input-enquiry-departure" /></label><label>Group size<input name="participants" type="number" min="1" max="10000" placeholder="Number of travellers" data-testid="input-enquiry-participants" /></label></>}
    </div>
    <label>How can we help?<textarea name="message" required minLength={10} rows={compact ? 3 : 5} placeholder="A little context helps us respond thoughtfully." data-testid="input-enquiry-message" /></label>
    <label className="consent-line"><input type="checkbox" name="consent" required /> I agree that Karibu and Beyond may contact me about this enquiry.</label>
    <label className="consent-line optional"><input type="checkbox" name="marketingConsent" /> Send me occasional updates (optional).</label>
    <button className="button button-dark" disabled={create.isPending} type="submit" data-testid="button-submit-enquiry">{create.isPending ? 'Sending…' : 'Send an enquiry'} <ArrowRight size={16} /></button>
    {error && <p className="error-message" role="alert">{error}</p>}{receipt && <p className="success-message" role="status"><Check size={16} /> {receipt}</p>}
    {service === 'medical_tourism' && <p className="form-note">Please do not include medical records, diagnoses or other clinical information.</p>}
  </form>;
}

function SectionHeading({ eyebrow, title, text, href, label }: { eyebrow: string; title: string; text?: string; href?: string; label?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2 className="serif">{title}</h2>{text && <p>{text}</p>}</div>{href && <a className="text-link" href={href}>{label || 'Explore more'} <ArrowUpRight size={15} /></a>}</div>;
}

function ServiceGrid() {
  return <div className="service-grid">{serviceTiles.map(([title, href, text], i) => { const Icon = serviceIcons[i]; return <a className="service-card" href={href} key={href}><span className="service-icon"><Icon size={21} /></span><span className="service-number">0{i + 1}</span><h3 className="serif">{title}</h3><p>{text}</p><span className="card-link">Discover the service <ArrowUpRight size={15} /></span></a>; })}</div>;
}

function PackageShelf({ title = 'Published packages', compact = false }: { title?: string; compact?: boolean }) {
  const query = useListPackages({ page: 1, pageSize: compact ? 3 : 12 });
  const items = query.data?.items ?? [];
  return <section className="section package-section"><div className="container-wide"><SectionHeading eyebrow="The catalogue" title={title} text="Only confirmed, published experiences appear here." href="/packages" label="View catalogue" />
    {query.isLoading ? <div className="skeleton-grid"><div /><div /><div /></div> : query.isError ? <div className="inline-state"><p>We could not load the catalogue just now.</p><button className="text-link" onClick={() => query.refetch()}>Try again <ArrowRight size={15} /></button></div> : items.length ? <div className="package-grid">{items.map((p, i) => <a href={`/packages/${p.slug}`} className="package-card" key={p.id}><div className="package-image" style={{ backgroundImage: p.imageUrl ? `url("${p.imageUrl}")` : undefined }}>{!p.imageUrl && <span className="package-index">0{i + 1}</span>}</div><div className="package-copy"><span className="eyebrow">{p.destination || p.category.name}</span><h3 className="serif">{p.name}</h3><p>{p.shortDescription}</p><span className="text-link">Explore details <ArrowRight size={14} /></span></div></a>)}</div> : <div className="empty-catalogue"><span className="empty-mark"><Compass size={24} /></span><div><h3 className="serif">The catalogue is being considered.</h3><p>There are no published packages to show right now. We would be glad to discuss a journey shaped around you.</p></div><a className="button button-outline" href="/contact">Plan with us <ArrowRight size={15} /></a></div>}
  </div></section>;
}

function Home() {
  const settings = useGetPublicSiteSettings();
  return <>
    <section className="hero"><div className="hero-image" /><div className="hero-shade" /><div className="container-wide hero-content reveal"><div className="hero-copy"><span className="hero-kicker"><span /> Kenya · East Africa · India</span><h1 className="serif">Your world,<br /><em>well considered.</em></h1><p>Premium travel, events and personal coordination—grounded in a warm welcome and carried through with care.</p><div className="hero-actions"><a className="button button-gold" href="/contact">Start a conversation <ArrowRight size={16} /></a><a className="hero-secondary" href="/services">Explore our services <ArrowDownRight size={16} /></a></div></div><div className="hero-note"><span>01 / THE K&B APPROACH</span><p>One company.<br />A world of possibilities.</p></div></div><div className="hero-caption"><span>MAASAI MARA · KENYA</span><span>01—05</span></div></section>
    <section className="intro-band"><div className="container-wide intro-inner"><span className="eyebrow">A thoughtful kind of service</span><p className="serif">The best plans feel effortless.<br /><em>They are anything but accidental.</em></p><a href="/about" className="text-link">Get to know us <ArrowUpRight size={15} /></a></div></section>
    <section className="section"><div className="container-wide"><SectionHeading eyebrow="Our world" title="Different needs. One considered point of contact." text="We coordinate across the moments that matter, with a personal approach and a clear next step." href="/services" label="All services" /><ServiceGrid /></div></section>
    <section className="destination-feature"><div className="destination-art"><div className="outline-circle" /><span>01 / OUR REGION</span></div><div className="destination-content"><span className="eyebrow">Rooted in Kenya. Connected beyond.</span><h2 className="serif">Local understanding.<br /><em>Global perspective.</em></h2><p>Based in Embakasi, Nairobi, we coordinate journeys and services across East Africa and India. Every detail starts with listening to what matters to you.</p><a className="button button-dark" href="/travel/destinations">Explore our destinations <ArrowRight size={15} /></a></div><div className="destination-bottom">NAIROBI <span>—</span> EAST AFRICA <span>—</span> INDIA</div></section>
    <PackageShelf compact />
    <section className="approach-section"><div className="container-wide"><SectionHeading eyebrow="From conversation to clarity" title="A simple way to begin." text="A considered process, without the pressure to have every answer." /><div className="steps-row"><div className="step"><span>01</span><h3 className="serif">Tell us what matters.</h3><p>Share the outline, the occasion or the question you are carrying.</p></div><div className="step"><span>02</span><h3 className="serif">We listen and clarify.</h3><p>We ask the right questions and outline a sensible next step.</p></div><div className="step"><span>03</span><h3 className="serif">Move forward together.</h3><p>Once details are agreed, we coordinate with care and clear communication.</p></div></div></div></section>
    <section className="contact-ribbon"><div className="container-wide ribbon-inner"><div><span className="eyebrow">Your next chapter starts here</span><h2 className="serif">Let’s make a thoughtful plan.</h2></div><a className="button button-gold" href="/contact">Talk to our team <ArrowRight size={15} /></a></div></section>
    {settings.isError && <div className="container-wide settings-fallback" role="status">Contact information is available below and may take a moment to update.</div>}
  </>;
}

function EnquiryPage({ service, title, intro }: { service: EnquiryInputService; title?: string; intro?: string }) {
  return <section className="form-page"><div className="container-wide form-layout"><div className="form-intro"><span className="eyebrow">A considered next step</span><h1 className="serif">{title || 'Let’s begin with a conversation.'}</h1><p>{intro || 'Share a little about what you have in mind. This is an enquiry, not a booking.'}</p><div className="contact-card"><span><Mail size={16} /> info@karibuandbeyondltd.com</span><span><Phone size={16} /> +254 729 861 607</span><span><MapPin size={16} /> Embakasi / North Airport Road</span></div></div><div className="form-card"><h2 className="serif">A little context goes a long way.</h2><p>Fields marked required help us respond to you.</p><EnquiryForm service={service} /></div></div></section>;
}

function GenericPage({ path }: { path: string }) {
  const config = pages[path] || pages['/about'];
  const Icon = serviceIcons[Math.max(0, serviceTiles.findIndex(x => x[1] === path))] || Compass;
  return <><section className="page-hero"><div className="container-wide"><div className="breadcrumbs"><a href="/">Home</a><ChevronRight size={13} /><span>{config.eyebrow}</span></div><span className="eyebrow">{config.eyebrow}</span><h1 className="serif">{config.title}</h1><p className="page-intro">{config.intro}</p></div><div className="page-hero-mark"><Icon strokeWidth={1} /></div></section>
    <section className="section body-section"><div className="container-wide content-columns"><article><p className="lead-copy">{config.body}</p>{config.links && <div className="link-list">{config.links.map(([label, href]) => <a key={href} href={href}><span>{label}</span><ArrowUpRight size={17} /></a>)}</div>}</article><aside className="side-quote"><span className="eyebrow">A personal point of contact</span><p className="serif">“A good plan leaves room for what matters.”</p><a href="/contact" className="text-link">Talk with us <ArrowRight size={15} /></a></aside></div></section>
    {config.service && <EnquiryPage service={config.service} title="Tell us what you have in mind." intro="We will respond to understand the details and discuss a suitable next step." />}
    {path.startsWith('/travel/destinations/') && <section className="section"><div className="container-wide"><a className="text-link" href="/travel/destinations">← All destinations</a><div className="destination-detail"><span className="eyebrow">Destination notes</span><h2 className="serif">{path.split('/').pop()?.replace(/-/g, ' ')}</h2><p>Tell us what you hope to experience here, and we can discuss a tailored travel enquiry.</p><a className="button button-dark" href="/contact">Ask about this destination <ArrowRight size={15} /></a></div></div></section>}
  </>;
}

function PackagesPage() {
  const packages = useListPackages({ page: 1, pageSize: 24 });
  const [search, setSearch] = useState('');
  const filtered = (packages.data?.items || []).filter(p => `${p.name} ${p.destination || ''} ${p.category.name}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="page-hero package-page"><div className="container-wide"><div className="breadcrumbs"><a href="/">Home</a><ChevronRight size={13} /><span>Packages</span></div><span className="eyebrow">A catalogue, only when confirmed</span><h1 className="serif">Published experiences.</h1><p className="page-intro">Explore experiences that have been approved and published by our team. Every enquiry is a conversation, not a booking.</p><label className="search-box"><span className="sr-only">Search packages</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search published packages" /><Compass size={17} /></label></div>
    <div className="container-wide package-results">{packages.isLoading ? <div className="skeleton-grid"><div /><div /><div /></div> : packages.isError ? <div className="inline-state"><p>Packages could not be loaded.</p><button className="text-link" onClick={() => packages.refetch()}>Retry <ArrowRight size={15} /></button></div> : filtered.length ? <div className="package-grid">{filtered.map(p => <a className="package-card" href={`/packages/${p.slug}`} key={p.id}><div className="package-image" style={p.imageUrl ? { backgroundImage: `url("${p.imageUrl}")` } : {}}><span className="package-index">{p.destination || p.category.name}</span></div><div className="package-copy"><span className="eyebrow">{p.duration || 'Details on enquiry'}</span><h3 className="serif">{p.name}</h3><p>{p.shortDescription}</p><span className="text-link">View experience <ArrowRight size={14} /></span></div></a>)}</div> : <div className="empty-catalogue"><span className="empty-mark"><Compass size={24} /></span><div><h3 className="serif">{search ? 'No matching published experiences.' : 'No published packages just yet.'}</h3><p>{search ? 'Try another search or contact us to discuss a tailored request.' : 'We do not have confirmed packages to display at the moment. We can still discuss a journey shaped around your needs.'}</p></div><a className="button button-outline" href="/contact">Make an enquiry <ArrowRight size={15} /></a></div>}</div>
  </section>;
}

function PackageDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const query = useGetPackage(slug, { query: { queryKey: getGetPackageQueryKey(slug), enabled: Boolean(slug) } });
  if (query.isLoading) return <div className="container-wide loading-page"><div className="skeleton-wide" /><div className="skeleton-line" /></div>;
  if (query.isError || !query.data) return <section className="page-hero"><div className="container-wide"><span className="eyebrow">Package details</span><h1 className="serif">This experience is not available.</h1><p className="page-intro">It may no longer be published. Browse the current catalogue or contact us for a tailored enquiry.</p><a href="/packages" className="button button-dark">Back to packages <ArrowRight size={15} /></a></div></section>;
  const p = query.data;
  return <><section className="detail-hero" style={p.imageUrl ? { backgroundImage: `linear-gradient(90deg,rgba(3,27,15,.72),rgba(3,27,15,.12)),url("${p.imageUrl}")` } : undefined}><div className="container-wide"><div className="breadcrumbs"><a href="/">Home</a><ChevronRight size={13} /><a href="/packages">Packages</a><ChevronRight size={13} /><span>{p.name}</span></div><span className="eyebrow">{p.destination || p.category.name}</span><h1 className="serif">{p.name}</h1><p>{p.shortDescription}</p></div></section><section className="section"><div className="container-wide detail-columns"><article><h2 className="serif">About this experience</h2><p>{p.description}</p>{p.duration && <p><CalendarDays size={16} /> {p.duration}</p>}{p.itinerary?.length > 0 && <><h2 className="serif">A possible rhythm</h2><div className="itinerary">{p.itinerary.map(day => <div key={day.day}><span>DAY {day.day}</span><h3>{day.title}</h3><p>{day.description}</p></div>)}</div></>}{p.faqs?.length > 0 && <><h2 className="serif">Questions</h2>{p.faqs.map(f => <details className="faq-item" key={f.question}><summary>{f.question}<ChevronDown size={15} /></summary><p>{f.answer}</p></details>)}</>}</article><aside className="detail-aside"><span className="eyebrow">Start a conversation</span><h3 className="serif">Interested in this experience?</h3><p>Ask us about dates, availability and details. This is an enquiry only.</p><a className="button button-dark" href={`/contact?package=${encodeURIComponent(p.slug)}`}>Enquire about this <ArrowRight size={15} /></a>{p.availability && <p className="fine-print">{p.availability}</p>}</aside></div></section></>;
}

function InsightsPage() {
  const articles = useListArticles({ page: 1, pageSize: 24 });
  return <section className="page-hero"><div className="container-wide"><div className="breadcrumbs"><a href="/">Home</a><ChevronRight size={13} /><span>Insights</span></div><span className="eyebrow">Notes from our world</span><h1 className="serif">Perspective for the journey.</h1><p className="page-intro">Ideas and practical perspectives from the worlds we work across.</p></div><div className="container-wide insights-results">{articles.isLoading ? <div className="skeleton-grid"><div /><div /><div /></div> : articles.isError ? <div className="inline-state">Insights are unavailable at the moment. <button className="text-link" onClick={() => articles.refetch()}>Retry</button></div> : articles.data?.items.length ? <div className="article-grid">{articles.data.items.map((a, i) => <a href={`/insights/${a.slug}`} className="article-card" key={a.id}><div className={`article-art article-art-${i % 3}`}><span>{a.category || 'K&B JOURNAL'}</span></div><div className="article-meta">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'A note from our team'}</div><h2 className="serif">{a.title}</h2><p>{a.excerpt}</p><span className="text-link">Read article <ArrowRight size={14} /></span></a>)}</div> : <div className="empty-catalogue"><span className="empty-mark"><FileText size={23} /></span><div><h3 className="serif">Thoughtful notes, coming soon.</h3><p>There are no published insights yet. Please check back or get in touch with your question.</p></div><a className="button button-outline" href="/contact">Contact us <ArrowRight size={15} /></a></div>}</div></section>;
}

function ArticleDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const query = useGetArticle(slug, { query: { queryKey: getGetArticleQueryKey(slug), enabled: Boolean(slug) } });
  if (query.isLoading) return <div className="container-wide loading-page"><div className="skeleton-wide" /><div className="skeleton-line" /></div>;
  if (query.isError || !query.data) return <section className="page-hero"><div className="container-wide"><h1 className="serif">This article is not available.</h1><a className="text-link" href="/insights">Return to insights <ArrowRight size={15} /></a></div></section>;
  const article = query.data;
  return <article className="article-detail"><div className="container-narrow"><div className="breadcrumbs"><a href="/">Home</a><ChevronRight size={13} /><a href="/insights">Insights</a><ChevronRight size={13} /><span>{article.category || 'Article'}</span></div><span className="eyebrow">{article.category || 'K&B Journal'}</span><h1 className="serif">{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><p className="article-meta">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' }) : ''}</p>{article.coverImageUrl && <img className="article-cover" src={article.coverImageUrl} alt="" />}<div className="article-body">{article.body.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</div></div></article>;
}

function Testimonials() {
  const query = useListTestimonials();
  if (query.isLoading || query.isError || !query.data?.length) return null;
  return <section className="section testimonial-band"><div className="container-wide"><SectionHeading eyebrow="In their words" title="Experiences, shared with permission." /><div className="quote-grid">{query.data.map(t => <blockquote key={t.id}><span className="quote-mark">“</span><p className="serif">{t.quote}</p><footer>{t.attribution || 'Client'}{t.service && <span> · {t.service}</span>}</footer></blockquote>)}</div></div></section>;
}

function UnsubscribePage() {
  const params = new URLSearchParams(window.location.search);
  const [token, setToken] = useState(params.get('token') || '');
  const [message, setMessage] = useState('');
  const unsubscribe = useUnsubscribeNewsletter();
  const submit = (e: FormEvent) => {
    e.preventDefault(); setMessage('');
    if (token.length < 32) { setMessage('This unsubscribe link is incomplete. Please use the full secure link from your email.'); return; }
    unsubscribe.mutate({ data: { token } }, { onSuccess: r => setMessage(r.message), onError: () => setMessage('We could not complete your request. Please contact info@karibuandbeyondltd.com.') });
  };
  return <section className="form-page"><div className="container-narrow form-card unsubscribe-card"><span className="eyebrow">Email preferences</span><h1 className="serif">Manage your subscription.</h1><p>Use the secure unsubscribe link from your email. Your token is processed securely and is not shared on this page.</p><form onSubmit={submit}><label>Secure unsubscribe token<input value={token} onChange={e => setToken(e.target.value)} minLength={32} maxLength={256} required type="password" autoComplete="off" /></label><button className="button button-dark" disabled={unsubscribe.isPending}>{unsubscribe.isPending ? 'Processing…' : 'Unsubscribe'} <ArrowRight size={15} /></button></form>{message && <p className="form-feedback" role="status">{message}</p>}</div></section>;
}

function AdminGate({ children }: { children: ReactNode }) {
  const session = useGetAdminSession({ query: { queryKey: getGetAdminSessionQueryKey(), retry: false } });
  if (session.isLoading) return <div className="admin-loading"><div className="skeleton-line" /><div className="skeleton-line" /></div>;
  if (session.isError || !session.data) return <section className="admin-gate"><img src="/karibu-logo.png" alt="Karibu and Beyond Ltd" /><span className="eyebrow">Private administration</span><h1 className="serif">Sign in to continue.</h1><p>Administration is available to authorized team members only. There is no public administrator registration.</p><a className="button button-dark" href="/sign-in">Sign in securely <ArrowRight size={15} /></a><a className="text-link" href="/">Return to the public site</a></section>;
  return <>{children}</>;
}

const adminLinks = [
  ['/admin', 'Overview', LayoutDashboard], ['/admin/enquiries', 'Enquiries', MessageSquare],
  ['/admin/packages', 'Packages', Package], ['/admin/articles', 'Articles', FileText],
  ['/admin/testimonials', 'Testimonials', Eye], ['/admin/settings', 'Settings', Settings],
] as const;

function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const { signOut } = useClerk();
  const [loc] = useLocation();
  return <div className="admin-shell"><aside className="admin-sidebar"><a className="admin-brand" href="/admin"><img src="/karibu-logo.png" alt="Karibu and Beyond" /><span>Studio <small>ADMIN</small></span></a><div className="admin-label">WORKSPACE</div><nav>{adminLinks.map(([href, label, Icon]) => <a key={href} href={href} className={loc === href ? 'active' : ''}><Icon size={17} />{label}</a>)}</nav><div className="admin-bottom"><a href="/" className="view-site"><ExternalLink size={16} /> View public site</a><button onClick={() => signOut({ redirectUrl: basePath || '/' })}><LogOut size={16} /> Sign out</button></div></aside><main className="admin-main"><header className="admin-topbar"><span>Karibu and Beyond / <b>{title}</b></span><span className="admin-status"><i /> Protected workspace</span></header><div className="admin-content">{children}</div></main></div>;
}

function AdminOverview() {
  const dashboard = useGetAdminDashboard();
  const stats = dashboard.data;
  return <AdminGate><AdminShell title="Overview"><div className="admin-heading"><div><span className="eyebrow">Your workspace</span><h1 className="serif">Good morning.</h1><p>A clear view of what needs attention.</p></div><a className="button button-dark" href="/admin/enquiries">Review enquiries <ArrowRight size={15} /></a></div>
    {dashboard.isLoading ? <div className="admin-stat-grid">{[1,2,3,4].map(i => <div className="admin-stat skeleton" key={i} />)}</div> : dashboard.isError ? <div className="inline-state"><p>Dashboard data could not be loaded.</p><button className="text-link" onClick={() => dashboard.refetch()}>Retry</button></div> : <><div className="admin-stat-grid"><div className="admin-stat"><span>New enquiries</span><strong>{stats?.enquiriesNew ?? 0}</strong><small>Need a first review</small></div><div className="admin-stat"><span>In progress</span><strong>{stats?.enquiriesInProgress ?? 0}</strong><small>Currently being handled</small></div><div className="admin-stat"><span>Published packages</span><strong>{stats?.packagesPublished ?? 0}</strong><small>Visible in the catalogue</small></div><div className="admin-stat"><span>Published insights</span><strong>{stats?.articlesPublished ?? 0}</strong><small>Available to readers</small></div></div><div className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">Recent activity</span><h2 className="serif">Latest enquiries</h2></div><a href="/admin/enquiries" className="text-link">All enquiries <ArrowRight size={14} /></a></div>{stats?.recentEnquiries?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Reference</th><th>Contact</th><th>Service</th><th>Status</th><th>Received</th></tr></thead><tbody>{stats.recentEnquiries.map(e => <tr key={e.id}><td>{e.reference}</td><td>{e.fullName}<small>{e.email}</small></td><td>{e.service.replace(/_/g, ' ')}</td><td><StatusPill status={e.status} /></td><td>{new Date(e.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div> : <div className="empty-admin">No enquiries to show yet. New requests will appear here.</div>}</div><div className="admin-insight-grid"><div className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">By service</span><h2 className="serif">Enquiry mix</h2></div></div>{stats?.enquiriesByService?.length ? stats.enquiriesByService.map(row => <div className="service-bar" key={row.service}><span>{row.service.replace(/_/g, ' ')}</span><b>{row.count}</b></div>) : <div className="empty-admin">Service activity will appear here.</div>}</div><div className="admin-panel admin-note-panel"><Sparkles size={19} /><span className="eyebrow">A useful reminder</span><p className="serif">Only publish what is ready to stand behind.</p><a href="/admin/packages" className="text-link">Review catalogue <ArrowRight size={14} /></a></div></div></>}</AdminShell></AdminGate>;
}

function StatusPill({ status }: { status: string }) { return <span className={`status-pill status-${status}`}>{status.replace(/_/g, ' ')}</span>; }

function AdminEnquiries() {
  const [filter, setFilter] = useState('');
  const list = useListAdminEnquiries({ page: 1, pageSize: 50, ...(filter ? { status: filter as EnquiryStatus } : {}) });
  const update = useUpdateEnquiryStatus();
  const addNote = useAddEnquiryNote();
  const [note, setNote] = useState<Record<number, string>>({});
  const qc = useQueryClient();
  const statuses = ['new','in_progress','awaiting_client','completed','archived'];
  return <AdminGate><AdminShell title="Enquiries"><div className="admin-heading"><div><span className="eyebrow">Client conversations</span><h1 className="serif">Enquiries</h1><p>Every enquiry is a conversation—not a booking.</p></div><select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by status"><option value="">All statuses</option>{statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}</select></div>
    {list.isLoading ? <div className="admin-panel skeleton" /> : list.isError ? <div className="inline-state">Enquiries could not be loaded. <button onClick={() => list.refetch()} className="text-link">Retry</button></div> : list.data?.items.length ? <div className="enquiry-admin-list">{list.data.items.map(enquiry => <details className="enquiry-admin-card" key={enquiry.id}><summary><div><b>{enquiry.fullName}</b><span>{enquiry.reference} · {enquiry.service.replace(/_/g, ' ')}</span></div><StatusPill status={enquiry.status} /><span className="admin-date">{new Date(enquiry.createdAt).toLocaleDateString()}</span><ChevronDown size={16} /></summary><div className="enquiry-admin-detail"><div><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>{enquiry.phone && <span>{enquiry.phone}</span>}<p>{enquiry.message}</p><div className="enquiry-facts">{enquiry.destination && <span>Destination: {enquiry.destination}</span>}{enquiry.preferredDates && <span>Dates: {enquiry.preferredDates}</span>}{enquiry.participants && <span>Group: {enquiry.participants}</span>}</div></div><div className="enquiry-actions"><label>Update status<select value={enquiry.status} onChange={e => update.mutate({ id: enquiry.id, data: { status: e.target.value as EnquiryStatus } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminEnquiriesQueryKey() }) })}>{statuses.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}</select></label><label>Add internal note<textarea value={note[enquiry.id] || ''} onChange={e => setNote({ ...note, [enquiry.id]: e.target.value })} placeholder="Visible to the team only" /></label><button className="button button-dark button-small" disabled={addNote.isPending || !(note[enquiry.id] || '').trim()} onClick={() => addNote.mutate({ id: enquiry.id, data: { note: note[enquiry.id] } }, { onSuccess: () => { setNote({ ...note, [enquiry.id]: '' }); qc.invalidateQueries({ queryKey: getListAdminEnquiriesQueryKey() }); } })}>Save note <Send size={14} /></button>{enquiry.notes.map(n => <p className="internal-note" key={n.id}>{n.note}<small>{n.author} · {new Date(n.createdAt).toLocaleDateString()}</small></p>)}</div></div></details>)}</div> : <div className="empty-admin">No enquiries match this view.</div>}</AdminShell></AdminGate>;
}

function AdminPackages() {
  const list = useListAdminPackages({});
  const categories = useListAdminPackageCategories();
  const create = useCreateAdminPackage();
  const update = useUpdateAdminPackage();
  const duplicate = useDuplicateAdminPackage();
  const createCategory = useCreatePackageCategory();
  const qc = useQueryClient();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  function submit(e: FormEvent) { e.preventDefault(); setError(''); const selectedCategory = Number(category); if (name.trim().length < 2 || !selectedCategory) { setError('Add a package name and choose a category.'); return; }
    create.mutate({ data: { name: name.trim(), slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), shortDescription: '', description: '', categoryId: selectedCategory, pricingModel: 'contact_for_pricing' } }, { onSuccess: () => { setShow(false); setName(''); qc.invalidateQueries({ queryKey: getListAdminPackagesQueryKey() }); }, onError: () => setError('Could not create the draft. Check the fields and try again.') }); }
  return <AdminGate><AdminShell title="Packages"><div className="admin-heading"><div><span className="eyebrow">Published catalogue</span><h1 className="serif">Packages</h1><p>Only approved and published experiences reach the public catalogue.</p></div><button className="button button-dark" onClick={() => setShow(!show)}><Plus size={16} /> New draft</button></div>{show && <form className="admin-create-form" onSubmit={submit}><div><h2 className="serif">Start a package draft</h2><p>New packages begin unpublished. Complete all content before publishing.</p></div><label>Package name<input value={name} onChange={e => setName(e.target.value)} required minLength={2} /></label><label>Category<select value={category} onChange={e => setCategory(e.target.value)} required><option value="">Choose category</option>{(categories.data || []).map(c => <option value={c.id} key={c.id}>{c.name}</option>)}</select></label><button disabled={create.isPending} className="button button-dark">{create.isPending ? 'Creating…' : 'Create draft'}</button><button type="button" className="text-link" onClick={() => setShow(false)}>Cancel</button>{error && <p role="alert" className="error-message">{error}</p>}</form>}
    <div className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">Catalogue management</span><h2 className="serif">All package drafts</h2></div><span>{list.data?.length || 0} items</span></div>{list.isLoading ? <div className="skeleton-line" /> : list.isError ? <div className="empty-admin">Packages could not be loaded. <button className="text-link" onClick={() => list.refetch()}>Retry</button></div> : list.data?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Category</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{list.data.map(p => <tr key={p.id}><td><b>{p.name}</b><small>{p.slug}</small></td><td>{p.category.name}</td><td><StatusPill status={p.status} /></td><td>{new Date(p.updatedAt).toLocaleDateString()}</td><td className="table-actions">{p.status === 'published' ? <button title="Unpublish" onClick={() => update.mutate({ id: p.id, data: { status: 'draft' } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminPackagesQueryKey() }) })}>Move to draft</button> : <button title="Publish" onClick={() => update.mutate({ id: p.id, data: { status: 'published' } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminPackagesQueryKey() }) })}>Publish</button>}<button title="Duplicate" onClick={() => duplicate.mutate({ id: p.id }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminPackagesQueryKey() }) })}><Copy size={14} /></button></td></tr>)}</tbody></table></div> : <div className="empty-admin">No packages yet. Create a draft when a confirmed experience is ready to prepare.</div>}</div>
    <div className="admin-panel category-panel"><div><span className="eyebrow">Catalogue structure</span><h2 className="serif">Package categories</h2></div><div className="category-list">{categories.data?.map(c => <span key={c.id}>{c.name}</span>)}</div><form onSubmit={e => { e.preventDefault(); if (categoryName.trim().length < 2) return; createCategory.mutate({ data: { name: categoryName.trim() } }, { onSuccess: () => { setCategoryName(''); qc.invalidateQueries(); } }); }}><input value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="New category name" minLength={2} /><button disabled={createCategory.isPending} className="button button-outline">Add category <Plus size={14} /></button></form></div>
  </AdminShell></AdminGate>;
}

function AdminArticles() {
  const list = useListAdminArticles();
  const create = useCreateAdminArticle();
  const update = useUpdateAdminArticle();
  const qc = useQueryClient();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  function submit(e: FormEvent) { e.preventDefault(); setError(''); if (title.length < 2 || !body.trim()) { setError('A title and article body are required.'); return; } create.mutate({ data: { title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), excerpt, body } }, { onSuccess: () => { setShow(false); setTitle(''); setExcerpt(''); setBody(''); qc.invalidateQueries({ queryKey: getListAdminArticlesQueryKey() }); }, onError: () => setError('The article could not be saved. Please check your content.') }); }
  return <AdminGate><AdminShell title="Articles"><div className="admin-heading"><div><span className="eyebrow">Editorial</span><h1 className="serif">Articles</h1><p>Write and publish useful, verified perspectives.</p></div><button className="button button-dark" onClick={() => setShow(!show)}><Plus size={16} /> New article</button></div>{show && <form className="admin-create-form" onSubmit={submit}><h2 className="serif">New article draft</h2><label>Title<input required value={title} onChange={e => setTitle(e.target.value)} /></label><label>Excerpt<textarea rows={2} value={excerpt} onChange={e => setExcerpt(e.target.value)} /></label><label>Article body<textarea required rows={7} value={body} onChange={e => setBody(e.target.value)} /></label><button className="button button-dark" disabled={create.isPending}>Save draft</button><button type="button" className="text-link" onClick={() => setShow(false)}>Cancel</button>{error && <p className="error-message">{error}</p>}</form>}<div className="admin-panel">{list.isLoading ? <div className="skeleton-line" /> : list.isError ? <div className="empty-admin">Articles could not be loaded. <button onClick={() => list.refetch()} className="text-link">Retry</button></div> : list.data?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Article</th><th>Status</th><th>Updated</th><th>Action</th></tr></thead><tbody>{list.data.map(a => <tr key={a.id}><td><b>{a.title}</b><small>{a.slug}</small></td><td><StatusPill status={a.status} /></td><td>{new Date(a.updatedAt).toLocaleDateString()}</td><td>{a.status === 'published' ? <button className="table-action" onClick={() => update.mutate({ id: a.id, data: { title: a.title, slug: a.slug, excerpt: a.excerpt, body: a.body, category: a.category, coverImageUrl: a.coverImageUrl, status: 'draft' } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminArticlesQueryKey() }) })}>Unpublish</button> : <button className="table-action" onClick={() => update.mutate({ id: a.id, data: { title: a.title, slug: a.slug, excerpt: a.excerpt, body: a.body, category: a.category, coverImageUrl: a.coverImageUrl, status: 'published' } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminArticlesQueryKey() }) })}>Publish</button>}</td></tr>)}</tbody></table></div> : <div className="empty-admin">No articles yet. Start a draft when you have a useful, verified perspective to share.</div>}</div></AdminShell></AdminGate>;
}

function AdminTestimonials() {
  const list = useListAdminTestimonials();
  const create = useCreateAdminTestimonial();
  const update = useUpdateAdminTestimonial();
  const qc = useQueryClient();
  const [quote, setQuote] = useState('');
  const [attribution, setAttribution] = useState('');
  const [error, setError] = useState('');
  return <AdminGate><AdminShell title="Testimonials"><div className="admin-heading"><div><span className="eyebrow">Moderation</span><h1 className="serif">Testimonials</h1><p>Keep client words hidden until consent and approval are confirmed.</p></div></div><form className="admin-create-form testimonial-form" onSubmit={e => { e.preventDefault(); setError(''); if (quote.trim().length < 10) { setError('A quote must be at least 10 characters.'); return; } create.mutate({ data: { quote, attribution: attribution || null } }, { onSuccess: () => { setQuote(''); setAttribution(''); qc.invalidateQueries({ queryKey: getListAdminTestimonialsQueryKey() }); }, onError: () => setError('Could not save testimonial.') }); }}><h2 className="serif">Add testimonial for moderation</h2><label>Quote<textarea required minLength={10} value={quote} onChange={e => setQuote(e.target.value)} placeholder="Only enter words approved for use." /></label><label>Attribution<input value={attribution} onChange={e => setAttribution(e.target.value)} placeholder="Name or approved attribution" /></label><button className="button button-dark" disabled={create.isPending}>Save as draft <Plus size={14} /></button>{error && <p className="error-message">{error}</p>}</form><div className="admin-panel">{list.isLoading ? <div className="skeleton-line" /> : list.isError ? <div className="empty-admin">Testimonials could not be loaded. <button className="text-link" onClick={() => list.refetch()}>Retry</button></div> : list.data?.length ? <div className="admin-testimonial-list">{list.data.map(t => <div className="moderation-card" key={t.id}><p className="serif">“{t.quote}”</p><span>{t.attribution || 'No attribution'} · {t.service || 'No service'}</span><StatusPill status={t.status} /><div><button className="table-action" onClick={() => update.mutate({ id: t.id, data: { status: t.status === 'published' ? 'draft' : 'published' } }, { onSuccess: () => qc.invalidateQueries({ queryKey: getListAdminTestimonialsQueryKey() }) })}>{t.status === 'published' ? 'Hide from public' : 'Approve & publish'}</button></div></div>)}</div> : <div className="empty-admin">No testimonials have been submitted for moderation.</div>}</div></AdminShell></AdminGate>;
}

function AdminSettings() {
  const settings = useGetAdminSiteSettings();
  const update = useUpdateAdminSiteSettings();
  const qc = useQueryClient();
  const [feedback, setFeedback] = useState('');
  if (settings.isLoading) return <AdminGate><AdminShell title="Settings"><div className="skeleton-line" /></AdminShell></AdminGate>;
  if (settings.isError || !settings.data) return <AdminGate><AdminShell title="Settings"><div className="inline-state">Settings could not be loaded. <button className="text-link" onClick={() => settings.refetch()}>Retry</button></div></AdminShell></AdminGate>;
  const s = settings.data;
  return <AdminGate><AdminShell title="Settings"><div className="admin-heading"><div><span className="eyebrow">Public site details</span><h1 className="serif">Settings</h1><p>Keep contact details accurate and current.</p></div></div><form className="admin-create-form settings-form" onSubmit={e => { e.preventDefault(); const fd = new FormData(e.currentTarget); update.mutate({ data: { contactEmail: String(fd.get('email')), primaryPhone: String(fd.get('primaryPhone')), secondaryPhone: String(fd.get('secondaryPhone')), address: String(fd.get('address')) } }, { onSuccess: () => { setFeedback('Settings saved.'); qc.invalidateQueries(); }, onError: () => setFeedback('Settings could not be saved. Try again.') }); }}><label>Contact email<input name="email" type="email" defaultValue={s.contactEmail} required /></label><label>Primary phone<input name="primaryPhone" defaultValue={s.primaryPhone} /></label><label>Secondary phone<input name="secondaryPhone" defaultValue={s.secondaryPhone} /></label><label>Address<input name="address" defaultValue={s.address} /></label><button className="button button-dark" disabled={update.isPending}>{update.isPending ? 'Saving…' : 'Save settings'} <Check size={15} /></button>{feedback && <p role="status" className="form-feedback">{feedback}</p>}</form></AdminShell></AdminGate>;
}

function DynamicDestination() {
  const { slug = '' } = useParams<{ slug: string }>();
  return <GenericPage path={`/travel/destinations/${slug}`} />;
}

function SignInPage() {
  return <div className="auth-frame"><div className="auth-aside"><a href="/"><img src="/karibu-logo.png" alt="Karibu and Beyond Ltd" /></a><span className="eyebrow">Private workspace</span><p className="serif">Thoughtful service,<br />carried through.</p><a href="/" className="text-link">Return to the public site <ArrowRight size={15} /></a></div><div className="auth-form"><SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} /></div></div>;
}
function SignUpDisabled() { return <div className="admin-gate"><img src="/karibu-logo.png" alt="Karibu and Beyond Ltd" /><span className="eyebrow">Private administration</span><h1 className="serif">Registration is by invitation.</h1><p>There is no public account registration. If you are an authorized team member, sign in with your existing account.</p><a className="button button-dark" href="/sign-in">Go to sign in <ArrowRight size={15} /></a></div>; }

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  return <ErrorBoundary resetKey={loc}>{children}</ErrorBoundary>;
}

function PublicLayout({ children }: { children: ReactNode }) { return <><Header /><main>{children}</main><Testimonials /><Footer /></>; }

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={() => <PublicLayout><Home /></PublicLayout>} />
    <Route path="/sign-in/*?" component={SignInPage} />
    <Route path="/sign-up/*?" component={SignUpDisabled} />
    <Route path="/admin" component={AdminOverview} /><Route path="/admin/enquiries" component={AdminEnquiries} />
    <Route path="/admin/packages" component={AdminPackages} /><Route path="/admin/articles" component={AdminArticles} />
    <Route path="/admin/testimonials" component={AdminTestimonials} /><Route path="/admin/settings" component={AdminSettings} />
    <Route path="/packages/:slug" component={PackageDetail} /><Route path="/insights/:slug" component={ArticleDetail} />
    <Route path="/travel/destinations/:slug" component={() => <PublicLayout><DynamicDestination /></PublicLayout>} />
    <Route path="/packages" component={() => <PublicLayout><PackagesPage /></PublicLayout>} />
    <Route path="/insights" component={() => <PublicLayout><InsightsPage /></PublicLayout>} />
    <Route path="/experiences" component={() => <PublicLayout><PackagesPage /></PublicLayout>} />
    <Route path="/contact" component={() => <PublicLayout><EnquiryPage service="general" title="Tell us what you have in mind." intro="A real person will follow up to understand how we can help." /></PublicLayout>} />
    <Route path="/consultation" component={() => <PublicLayout><EnquiryPage service="general" title="A conversation is a good place to start." /></PublicLayout>} />
    <Route path="/consultation/request" component={() => <PublicLayout><EnquiryPage service="consultancy" title="Start with the question in front of you." /></PublicLayout>} />
    <Route path="/events/request-proposal" component={() => <PublicLayout><EnquiryPage service="events" title="Let’s shape the brief together." /></PublicLayout>} />
    <Route path="/pilgrimage/request-itinerary" component={() => <PublicLayout><EnquiryPage service="pilgrimage" title="Request an itinerary conversation." /></PublicLayout>} />
    <Route path="/medical-tourism/treatment-enquiries" component={() => <PublicLayout><EnquiryPage service="medical_tourism" title="Discuss travel coordination in confidence." intro="Please do not include clinical or sensitive health information." /></PublicLayout>} />
    <Route path="/unsubscribe" component={() => <PublicLayout><UnsubscribePage /></PublicLayout>} />
    {Object.keys(pages).filter(path => !['/contact','/consultation','/consultation/request','/events/request-proposal','/pilgrimage/request-itinerary','/medical-tourism/treatment-enquiries','/unsubscribe'].includes(path)).map(path => <Route key={path} path={path} component={() => <PublicLayout><GenericPage path={path} /></PublicLayout>} />)}
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  if (!clerkPubKey) return <div className="startup-error">Authentication configuration is not available. Please contact the site administrator.</div>;
  return <ClerkProvider publishableKey={clerkPubKey} proxyUrl={clerkProxyUrl} appearance={{
    theme: shadcn, cssLayerName: 'clerk',
    options: { logoPlacement: 'inside', logoLinkUrl: basePath || '/', logoImageUrl: `${window.location.origin}${basePath}/logo.svg` },
    variables: { colorPrimary: '#06351a', colorForeground: '#153322', colorMutedForeground: '#66766b', colorDanger: '#a33d35', colorBackground: '#fbf8f0', colorInput: '#fffdf8', colorInputForeground: '#153322', colorNeutral: '#d9d2c2', fontFamily: '"DM Sans", sans-serif', borderRadius: '0.65rem' },
    elements: { rootBox: 'w-full flex justify-center', cardBox: 'bg-[#fbf8f0] rounded-2xl w-[440px] max-w-full overflow-hidden', card: '!shadow-none !border-0 !bg-transparent !rounded-none', footer: '!shadow-none !border-0 !bg-transparent !rounded-none', headerTitle: 'text-[#153322] font-semibold', headerSubtitle: 'text-[#66766b]', socialButtonsBlockButtonText: 'text-[#153322]', formFieldLabel: 'text-[#153322]', footerActionLink: 'text-[#06351a]', footerActionText: 'text-[#66766b]', dividerText: 'text-[#66766b]', formFieldInput: 'bg-white border-[#d9d2c2] text-[#153322]', formButtonPrimary: 'bg-[#06351a] text-[#f2d46d]', logoBox: 'mb-3', logoImage: 'max-h-14', socialButtonsBlockButton: 'border-[#d9d2c2]', footerAction: 'text-[#66766b]', dividerLine: 'bg-[#d9d2c2]', alert: 'border-[#d9d2c2]', alertText: 'text-[#153322]', otpCodeFieldInput: 'border-[#d9d2c2]', formFieldRow: 'gap-1', main: 'gap-4' }
  }} signInUrl={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} localization={{ signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to the private workspace' } }, signUp: { start: { title: 'Invitation required', subtitle: 'Public registration is not available' } } }} routerPush={to => setLocation(stripBase(to))} routerReplace={to => setLocation(stripBase(to), { replace: true })}>
    <QueryClientProvider client={queryClient}><TooltipProvider><Router /><Toaster /></TooltipProvider></QueryClientProvider>
  </ClerkProvider>;
}

function App() {
  return <WouterRouter base={basePath}><ClerkProviderWithRoutes /></WouterRouter>;
}

export default App;
