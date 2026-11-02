import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Redirect, Route, Router, Switch, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  HeartHandshake,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";
import {
  ContactDetails,
  EnquiryForm,
  FinalCallout,
  PageHero,
  ServiceIcon,
  SiteShell,
  CONTACT_EMAIL,
} from "@/components/site-layout";
import { aboutContent, divisions, faqItems, sitePages, type SitePage } from "@/lib/site-content";
import { PAGE_META, SITE_ORIGIN } from "@/lib/page-meta.mjs";
import "./website.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const imagePath = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const heroSlides = [
  {
    label: "Pilgrimage tourism",
    titleStart: "Pilgrimage",
    titleAccent: "Tourism",
    description:
      "Considered, respectful and professionally organised faith-based travel — supporting individuals and faith-based organisations on journeys of spiritual significance.",
    image: "karibu-pilgrimage-interior.jpg",
    imageAlt: "Ornate interior of a historic basilica",
    href: "/pilgrimage/request-itinerary",
    action: "Request a Proposal",
  },
  {
    label: "Tours, travel and transfers",
    titleStart: "Tours, travel",
    titleAccent: "& transfers",
    description:
      "Thoughtful planning for journeys, from tailored itineraries and flight enquiries to accommodation and executive transfers.",
    image: "service-tours-safari.jpg",
    imageAlt: "East African safari landscape at sunset",
    href: "/services/tours-travel-transfers",
    action: "Explore Travel",
  },
  {
    label: "Events management",
    titleStart: "Events",
    titleAccent: "Management",
    description:
      "Enquiries for exhibitions, team-building activities, corporate events, conferences and celebrations.",
    image: "service-events-gathering.jpg",
    imageAlt: "Elegant event hall set for a corporate gathering",
    href: "/services/events-management",
    action: "Explore Events",
  },
  {
    label: "Medical tourism",
    titleStart: "Medical",
    titleAccent: "Tourism",
    description:
      "Non-clinical travel and patient support coordination for people exploring care abroad.",
    image: "service-medical-care.jpg",
    imageAlt: "Bright, modern clinical treatment room",
    href: "/services/medical-tourism",
    action: "Explore Medical Tourism",
  },
  {
    label: "Consultancy",
    titleStart: "Consultancy",
    titleAccent: "",
    description:
      "A considered first conversation for individual, corporate and institutional requirements.",
    image: "service-consultancy-meeting.jpg",
    imageAlt: "Professionals in a thoughtful business discussion",
    href: "/services/consultancy",
    action: "Explore Consultancy",
  },
];

function MetaManager() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.split("?")[0].replace(/\/+$/, "") || "/";
    const metadata = PAGE_META[path] ?? {
      title: "Karibu and Beyond Ltd | Premium service, considered",
      description:
        "Thoughtful coordination for travel, events, medical tourism, pilgrimage and consultancy.",
    };
    document.title = metadata.title;

    const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    upsertMeta("name", "description", metadata.description);
    upsertMeta("property", "og:title", metadata.title);
    upsertMeta("property", "og:description", metadata.description);
    upsertMeta("property", "og:url", `${SITE_ORIGIN}${path}`);
    upsertMeta("property", "og:image", `${SITE_ORIGIN}/karibu-logo.png`);
    upsertMeta("name", "twitter:title", metadata.title);
    upsertMeta("name", "twitter:description", metadata.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_ORIGIN}${path}`;

    let structuredData = document.getElementById("karibu-organization-schema");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "karibu-organization-schema";
      structuredData.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Karibu and Beyond Ltd",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/karibu-logo.png`,
      email: CONTACT_EMAIL,
      telephone: ["+254 729 861 607", "+1 (732) 874-1372"],
      areaServed: ["East Africa", "India"],
    });
  }, [location]);

  return null;
}

function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function ServiceCardGrid() {
  return (
    <div className="service-grid">
      {divisions.map((division, index) => (
        <Link className={`service-card service-card-${index + 1}`} key={division.href} href={division.href}>
          <img
            className="service-card-image"
            src={imagePath(division.image)}
            alt={division.imageAlt}
            loading="lazy"
          />
          <span className="service-number">0{index + 1}</span>
          <div className="service-card-body">
            <span className="service-icon"><ServiceIcon name={division.icon} /></span>
            <h3 className="serif">{division.title}</h3>
            <p>{division.description}</p>
            <span className="card-link">
              Discover the service <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [activeSlide, isPaused, prefersReducedMotion]);

  return (
    <>
      <section
        className="hero"
        aria-label="Our services"
        aria-roledescription="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
        <img
          key={slide.image}
          className="hero-image"
          src={imagePath(slide.image)}
          alt={slide.imageAlt}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container-wide hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">{slide.label}</span>
            <h1 className="serif">
              {slide.titleStart} {slide.titleAccent && <em>{slide.titleAccent}</em>}
            </h1>
            <p>{slide.description}</p>
            <div className="hero-actions">
              <Link className="button button-gold" href={slide.href}>
                {slide.action} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="hero-secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-pagination" aria-label="Choose a service slide">
          {heroSlides.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`hero-dot${index === activeSlide ? " is-active" : ""}`}
              aria-label={`Show ${item.label}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="intro-band">
        <div className="container-wide intro-inner">
          <span className="eyebrow">A considered welcome</span>
          <p className="serif">
            One trusted conversation can bring <em>many moving parts</em> into view.
          </p>
          <Link className="text-link" href="/about">
            Our story <MoveUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section services-section">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Five ways we can help</span>
              <h2 className="serif">Support shaped around what matters.</h2>
              <p>
                Each enquiry begins with your context. Scope, availability and
                arrangements are confirmed directly.
              </p>
            </div>
            <Link className="text-link" href="/services">
              All services <MoveUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ServiceCardGrid />
        </div>
      </section>

      <section className="approach-section">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="serif">A clear path from first thought to next step.</h2>
            </div>
          </div>
          <div className="steps-row">
            {[
              ["01", "Share your requirements", "Tell us what you are considering and what matters most."],
              ["02", "Discuss suitable options", "We follow up to clarify the brief and possible next steps."],
              ["03", "Receive a tailored proposal", "Scope, availability and costs are discussed for your request."],
              ["04", "Confirm the arrangements", "Nothing is booked until the details are agreed directly."],
            ].map(([number, title, text]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <h3 className="serif">{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reach-section">
        <div className="reach-image">
          <img src={imagePath("mara-dawn.jpg")} alt="" loading="lazy" />
          <span className="reach-image-label">Kenya · East Africa</span>
        </div>
        <div className="reach-copy">
          <span className="eyebrow eyebrow-gold">Local understanding, wider perspective</span>
          <h2 className="serif">Rooted in Kenya. Looking outward.</h2>
          <p>
            Karibu and Beyond is based in Embakasi, Kenya, with East Africa and
            India highlighted in its service positioning. Specific operating
            arrangements are discussed for each enquiry.
          </p>
          <Link className="button button-gold" href="/travel/destinations">
            Explore destinations <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="principles-section">
        <div className="container-wide">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Our service approach</span>
              <h2 className="serif">Thoughtful in the details.</h2>
            </div>
            <Link className="text-link" href="/why-choose-us">
              How we work <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="principle-grid">
            <article><HeartHandshake /><h3 className="serif">A personal point of contact</h3><p>Start with one conversation about the people, purpose and practicalities involved.</p></article>
            <article><ShieldCheck /><h3 className="serif">Clear boundaries</h3><p>We distinguish an enquiry from a booking, and coordination from clinical care.</p></article>
            <article><Globe2 /><h3 className="serif">A wider perspective</h3><p>Travel, events and coordination enquiries can begin from Kenya and reach across East Africa and India.</p></article>
          </div>
        </div>
      </section>

      <FinalCallout />
    </>
  );
}

function EnquiryPage({
  page,
  service,
}: {
  page: SitePage;
  service: "general" | "travel" | "events" | "medical_tourism" | "pilgrimage" | "consultancy";
}) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <ServiceImageGallery page={page} />
      <section className="form-page">
        <div className="container-wide form-layout">
          <div className="form-intro">
            <span className="eyebrow">A conversation, not a commitment</span>
            <h2 className="serif">Share a little context.</h2>
            {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ContactDetails />
          </div>
          <div className="form-card">
            <h2 className="serif">Prepare your enquiry</h2>
            <p>
              Your message stays in this browser until you choose email or WhatsApp.
            </p>
            <EnquiryForm service={service} />
          </div>
        </div>
      </section>
      <FinalCallout title="Prefer to speak with us?" text="Call either number shown here to discuss your enquiry directly." />
    </>
  );
}

function ContentPage({ page }: { page: SitePage }) {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <ServiceImageGallery page={page} />
      <section className="body-section">
        <div className="container-wide content-layout">
          <article className="content-copy">
            {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {page.bullets && (
              <ul className="editorial-list">
                {page.bullets.map((bullet) => <li key={bullet}><Check size={17} aria-hidden="true" />{bullet}</li>)}
              </ul>
            )}
          </article>
          <aside className="content-aside">
            <span className="eyebrow">Karibu and Beyond Ltd</span>
            <p className="serif">Premium service, considered for a global world.</p>
            <span className="aside-rule" />
            <span>Embakasi, North Airport Road, Kenya</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <Link className="text-link" href="/contact">Contact the team <ArrowUpRight size={15} /></Link>
          </aside>
        </div>
        {page.links && (
          <div className="container-wide related-section">
            <span className="eyebrow">Continue exploring</span>
            <div className="related-links">
              {page.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span>{link.label}</span><ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
      {page === sitePages["/services"] && (
        <section className="section services-section" aria-label="Service areas">
          <div className="container-wide">
            <ServiceCardGrid />
          </div>
        </section>
      )}
      {page.service && (
        <FinalCallout
          title="Tell us what you're planning."
          text="Share a few practical details and choose whether to continue by email or WhatsApp."
        />
      )}
    </>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container-wide about-hero-content">
          <span className="eyebrow eyebrow-gold">{aboutContent.eyebrow}</span>
          <h1 className="serif" id="about-title">{aboutContent.title}</h1>
          <p>{aboutContent.intro}</p>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container-wide about-story-grid">
          <div className="about-story-heading">
            <span className="eyebrow">Our story</span>
            <h2 className="serif" id="about-story-title">{aboutContent.storyTitle}</h2>
            <span className="about-rule" aria-hidden="true" />
          </div>
          <div className="about-story-copy">
            {aboutContent.storyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-beliefs" aria-label="Our vision and mission">
        <div className="container-wide about-belief-grid">
          <article className="about-belief about-belief-vision">
            <span className="eyebrow">Vision</span>
            <h2 className="serif">{aboutContent.vision}</h2>
          </article>
          <article className="about-belief about-belief-mission">
            <span className="eyebrow">Mission</span>
            <h2 className="serif">{aboutContent.mission}</h2>
          </article>
        </div>
      </section>

      <section className="about-care" aria-labelledby="about-care-title">
        <div className="container-wide">
          <div className="about-care-heading">
            <span className="eyebrow">Our philosophy</span>
            <h2 className="serif" id="about-care-title">
              We <em>CARE</em> — it’s who we are.
            </h2>
            <span className="about-rule" aria-hidden="true" />
          </div>
          <div className="about-care-grid">
            {aboutContent.careValues.map(({ initial, title, description }) => (
              <article className="about-care-card" key={initial}>
                <span className="about-care-initial" aria-hidden="true">{initial}</span>
                <h3 className="serif">{title}</h3>
                <span className="about-care-rule" aria-hidden="true" />
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCallout
        title="A standard of service that travels beyond expectation."
        text="Tell us what you are planning and what matters most. We will discuss practical next steps and confirm the scope directly."
      />
    </div>
  );
}

function ServiceImageGallery({ page }: { page: SitePage }) {
  if (!page.images?.length) return null;

  return (
    <section className="service-image-gallery" aria-label={`${page.eyebrow} imagery`}>
      <div className="container-wide service-image-grid">
        {page.images.map((image, index) => (
          <figure className={`service-image service-image-${index + 1}`} key={image.src}>
            <img
              src={imagePath(image.src)}
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function ContentPageRouter() {
  const [location] = useLocation();
  const path = location.split("?")[0].replace(/\/+$/, "") || "/";
  if (path === "/about") return <AboutPage />;
  if (path === "/services/pilgrimage-tourism" || path === "/pilgrimage") {
    return <PilgrimageLanding />;
  }
  if (path === "/pilgrimage/faq") return <PilgrimageFaq />;
  const page = sitePages[path];
  if (!page) return <NotFound />;

  const enquiryServices: Record<string, "general" | "travel" | "events" | "medical_tourism" | "pilgrimage" | "consultancy"> = {
    "/contact": "general",
    "/consultation": "general",
    "/consultation/request": "consultancy",
    "/events/request-proposal": "events",
    "/pilgrimage/request-itinerary": "pilgrimage",
    "/medical-tourism/treatment-enquiries": "medical_tourism",
  };

  const service = enquiryServices[path];
  return service ? <EnquiryPage page={page} service={service} /> : <ContentPage page={page} />;
}

const pilgrimageOfferings = [
  {
    title: "Religious Pilgrimages",
    items: [
      "Tours to sacred sites and spiritual destinations",
      "Faith-based travel programmes",
      "Spiritual retreats and renewal journeys",
      "Faith-based group travel coordination",
      "Cross-faith programmes",
      "Custom faith-based itineraries",
    ],
  },
  {
    title: "Group Coordination",
    items: [
      "Faith-based organisation travel and chaperoning",
      "Faith organisation programmes",
      "Tour management for faith leaders",
      "Group fare and accommodation negotiation",
    ],
  },
];

const pilgrimageSteps = [
  ["Listen", "Share the purpose, destination, timing and group outline for the journey."],
  ["Outline", "Discuss possible routes, travel days and the practical arrangements to explore."],
  ["Review", "Check scope, suppliers, availability and costs directly for the brief."],
  ["Confirm", "Agree the arrangements and next steps before any booking proceeds."],
];

const pilgrimageFaqItems = [
  ["Can different faith communities enquire?", "Yes. Share the purpose, destination and programme outline. Any arrangements are reviewed and confirmed for the particular group."],
  ["Can we enquire for a group?", "Yes. Include an estimated group size, proposed dates and departure point. Capacity and practical arrangements are confirmed directly."],
  ["Can the itinerary follow our faith programme?", "Share the programme priorities and important timing. Possible routes and schedules can then be discussed around those needs."],
  ["What if travellers have accessibility needs?", "Mention practical accessibility requirements early. Suitable transport, accommodation and support must be checked and confirmed before travel."],
  ["Can you advise on visas or travel documents?", "Entry requirements vary by destination and traveller. Check current guidance with the relevant authorities; any practical coordination is discussed separately."],
];

function PilgrimageLanding() {
  return (
    <div className="pilgrimage-page">
      <section className="pilgrimage-overview">
        <div className="container-wide pilgrimage-overview-inner">
          <div className="pilgrimage-heading">
            <span className="eyebrow">Overview</span>
            <h1 className="serif">Travel for meaning, planned with care.</h1>
            <span className="pilgrimage-rule" aria-hidden="true" />
          </div>
          <div className="pilgrimage-overview-copy">
            <p>A pilgrimage is unlike any other journey. Begin with the purpose of the trip, the places you hope to visit and the people travelling. We can discuss a personal, family, faith-community or organisational enquiry with respect for the programme and practical needs involved.</p>
            <p>Planning may include timing, group size, departure point, route ideas, accommodation enquiries, transport and accessibility considerations. Each scope, supplier, availability and cost is reviewed for the brief and confirmed directly before anything is booked.</p>
          </div>
        </div>
      </section>

      <section className="pilgrimage-photo-strip" aria-label="Pilgrimage travel imagery">
        <div className="container-wide pilgrimage-photo-grid">
          <figure>
            <img src={imagePath("service-pilgrimage-interior.jpg")} alt="Historic sacred-site interior illuminated by warm light" loading="lazy" />
            <figcaption>Historic sites</figcaption>
          </figure>
          <figure>
            <img src={imagePath("service-pilgrimage-group.jpg")} alt="Small faith group walking together at a historic site" loading="lazy" />
            <figcaption>Group journeys</figcaption>
          </figure>
          <figure>
            <img src={imagePath("karibu-pilgrimage-interior.jpg")} alt="Ornate basilica interior with architectural detail" loading="lazy" />
            <figcaption>Meaningful destinations</figcaption>
          </figure>
        </div>
      </section>

      <section className="pilgrimage-deliver">
        <div className="container-wide">
          <div className="pilgrimage-section-heading">
            <span className="eyebrow">What we deliver</span>
            <h2 className="serif">A complete portfolio,<br className="desktop-break" /> organised for clarity and outcomes.</h2>
            <p>The scope is shaped around your group, the programme and practical arrangements that can be confirmed for the brief.</p>
            <span className="pilgrimage-rule" aria-hidden="true" />
          </div>
          <div className="pilgrimage-offering-grid">
            {pilgrimageOfferings.map(({ title, items }, index) => (
              <article className="pilgrimage-offering" key={title}>
                <span className="pilgrimage-offering-number">0{index + 1}</span>
                <h3 className="serif">{title}</h3>
                <span className="pilgrimage-card-rule" aria-hidden="true" />
                <ul>
                  {items.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pilgrimage-process">
        <div className="container-wide">
          <div className="pilgrimage-section-heading">
            <span className="eyebrow eyebrow-gold">Engagement process</span>
            <h2 className="serif">A measured path from first enquiry to confirmed arrangements.</h2>
            <span className="pilgrimage-rule" aria-hidden="true" />
          </div>
          <div className="pilgrimage-steps">
            {pilgrimageSteps.map(([title, text], index) => (
              <article className="pilgrimage-step" key={title}>
                <span className="pilgrimage-step-number">0{index + 1}</span>
                <h3 className="serif">{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pilgrimage-planning-note">
        <div className="container-wide pilgrimage-planning-inner">
          <div>
            <span className="eyebrow">A useful first brief</span>
            <h2 className="serif">Start with the details that shape the journey.</h2>
            <p>These practical notes help the team understand what you are considering. Share only information needed for planning; do not send passport numbers or sensitive personal details through this website.</p>
          </div>
          <ul>
            <li>Purpose, destination and proposed dates</li>
            <li>Approximate group size and departure point</li>
            <li>Programme priorities and travel pace</li>
            <li>Accessibility or other practical needs</li>
          </ul>
        </div>
      </section>

      <section className="pilgrimage-faq-preview">
        <div className="container-wide pilgrimage-faq-inner">
          <div className="pilgrimage-section-heading">
            <span className="eyebrow">FAQ</span>
            <h2 className="serif">Common questions, answered.</h2>
            <p>Dates, routes, capacity, supplier arrangements and costs are checked and confirmed for each enquiry.</p>
            <span className="pilgrimage-rule" aria-hidden="true" />
          </div>
          <div className="pilgrimage-faq-list">
            {pilgrimageFaqItems.map(([question, answer]) => (
              <details open className="faq-item pilgrimage-faq-item" key={question}>
                <summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
            <Link className="text-link" href="/pilgrimage/faq">All pilgrimage questions <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="pilgrimage-closing">
        <div className="container-wide pilgrimage-closing-inner">
          <span className="eyebrow eyebrow-gold">Begin a conversation</span>
          <h2 className="serif">Tell us what you're planning. We'll architect a thoughtful response.</h2>
          <p>Share the purpose, destination, timing and group outline. The team can discuss possible next steps; an enquiry is not a booking or a guarantee of a proposal or availability.</p>
          <div className="pilgrimage-closing-actions">
            <Link className="button button-gold" href="/pilgrimage/request-itinerary">Request an itinerary <ArrowRight size={16} aria-hidden="true" /></Link>
            <a className="button pilgrimage-email-button" href={`mailto:${CONTACT_EMAIL}`}>Email our team</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function PilgrimageFaq() {
  return (
    <>
      <section className="pilgrimage-faq-hero">
        <div className="container-wide">
          <span className="eyebrow">FAQ</span>
          <h1 className="serif">Common questions,<br /> answered.</h1>
            <p>Dates, routes, capacity, supplier arrangements and costs are checked and confirmed for each enquiry.</p>
          <span className="pilgrimage-rule" aria-hidden="true" />
        </div>
      </section>
      <section className="pilgrimage-photo-strip" aria-label="Pilgrimage destination imagery">
        <div className="container-wide pilgrimage-photo-grid">
          <figure>
            <img src={imagePath("service-pilgrimage-interior.jpg")} alt="Historic sacred-site interior illuminated by warm light" loading="lazy" />
            <figcaption>Historic sites</figcaption>
          </figure>
          <figure>
            <img src={imagePath("service-pilgrimage-group.jpg")} alt="Small faith group walking together at a historic site" loading="lazy" />
            <figcaption>Group journeys</figcaption>
          </figure>
          <figure>
            <img src={imagePath("karibu-pilgrimage-interior.jpg")} alt="Ornate basilica interior with architectural detail" loading="lazy" />
            <figcaption>Meaningful destinations</figcaption>
          </figure>
        </div>
      </section>
      <section className="pilgrimage-faq-page-list">
        <div className="container-wide">
          {pilgrimageFaqItems.map(([question, answer]) => (
            <details open className="faq-item pilgrimage-faq-item" key={question}>
              <summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="pilgrimage-closing pilgrimage-faq-closing">
        <div className="container-wide pilgrimage-closing-inner">
          <span className="eyebrow eyebrow-gold">Begin a conversation</span>
          <h2 className="serif">Tell us what you're planning. We'll architect a thoughtful response.</h2>
          <p>Share the purpose, destination, timing and group outline. The team can discuss possible next steps; an enquiry is not a booking or a guarantee of a proposal or availability.</p>
          <div className="pilgrimage-closing-actions">
            <Link className="button button-gold" href="/pilgrimage/request-itinerary">Request an itinerary <ArrowRight size={16} aria-hidden="true" /></Link>
            <a className="button pilgrimage-email-button" href={`mailto:${CONTACT_EMAIL}`}>Email our team</a>
          </div>
        </div>
      </section>
    </>
  );
}

function FrequentlyAskedQuestions() {
  const page = sitePages["/faq"];
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <section className="faq-section">
        <div className="container-narrow">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}<ChevronDown size={17} aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCallout title="Still have a question?" text="Contact the team and we will help you find the right place to begin." />
    </>
  );
}

function DestinationPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const page = sitePages[`/travel/destinations/${slug}`];
  return page ? <ContentPage page={page} /> : <NotFound />;
}

function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404 · Page not found</span>
      <h1 className="serif">This page has moved beyond view.</h1>
      <p>The address may be incorrect, or the page may not be published.</p>
      <Link className="button button-forest" href="/">Return to the homepage <ArrowRight size={15} /></Link>
    </section>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <MetaManager />
      <SiteShell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/packages/:slug" component={() => <Redirect to="/services" replace />} />
          <Route path="/insights/:slug" component={() => <Redirect to="/services" replace />} />
          <Route path="/travel/destinations/:slug" component={DestinationPage} />
          <Route path="/packages" component={() => <Redirect to="/services" replace />} />
          <Route path="/experiences" component={() => <Redirect to="/services" replace />} />
          <Route path="/insights" component={() => <Redirect to="/services" replace />} />
          <Route path="/faq" component={FrequentlyAskedQuestions} />
          <Route component={ContentPageRouter} />
        </Switch>
      </SiteShell>
    </>
  );
}

export default function App() {
  return (
    <Router base={basePath}>
      <AppRoutes />
    </Router>
  );
}
