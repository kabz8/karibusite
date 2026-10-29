import { useEffect, useLayoutEffect } from "react";
import { Link, Route, Router, Switch, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Globe2,
  HeartHandshake,
  MoveUpRight,
  Plane,
  ShieldCheck,
} from "lucide-react";
import {
  ContactDetails,
  EnquiryForm,
  FinalCallout,
  PageHero,
  ServiceIcon,
  SiteShell,
} from "@/components/site-layout";
import { divisions, faqItems, sitePages, type SitePage } from "@/lib/site-content";
import { PAGE_META, SITE_ORIGIN } from "@/lib/page-meta.mjs";
import "./website.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const imagePath = (file: string) => `${import.meta.env.BASE_URL}${file}`;

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
      email: "info@karibuandbeyondltd.com",
      telephone: ["+254 729 861 607", "+254 711 556 151"],
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

function HomePage() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={imagePath("karibu-pilgrimage-interior.jpg")}
          alt="Ornate interior of a historic basilica"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container-wide hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">Pilgrimage</span>
            <h1 className="serif">Pilgrimage <em>Tourism</em></h1>
            <p>
              Considered, respectful and professionally organised faith-based
              travel — supporting individuals and faith-based organisations on
              journeys of spiritual significance.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/pilgrimage/request-itinerary">
                Request a Proposal <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="hero-secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
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
          <div className="service-grid">
            {divisions.map((division, index) => (
              <Link className={`service-card service-card-${index + 1}`} key={division.href} href={division.href}>
                <span className="service-number">0{index + 1}</span>
                <span className="service-icon"><ServiceIcon name={division.icon} /></span>
                <h3 className="serif">{division.title}</h3>
                <p>{division.description}</p>
                <span className="card-link">
                  Discover the service <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
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

      <section className="package-preview">
        <div className="container-wide package-preview-inner">
          <div className="package-art" aria-hidden="true">
            <Compass size={68} strokeWidth={1} />
            <span>MADE FOR YOUR BRIEF</span>
          </div>
          <div className="package-preview-copy">
            <span className="eyebrow">Packages & experiences</span>
            <h2 className="serif">No guesswork. Just a considered conversation.</h2>
            <p>
              There are no confirmed package offers or prices published here
              yet. Tell us what you have in mind and we can discuss a tailored
              enquiry without assuming inclusions or availability.
            </p>
            <div className="inline-links">
              <Link className="text-link" href="/packages">Browse packages <ArrowUpRight size={15} /></Link>
              <Link className="text-link" href="/experiences">Explore experiences <ArrowUpRight size={15} /></Link>
            </div>
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
            <a href="mailto:info@karibuandbeyondltd.com">info@karibuandbeyondltd.com</a>
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
      {page.service && (
        <FinalCallout
          title="Tell us what you're planning."
          text="Share a few practical details and choose whether to continue by email or WhatsApp."
        />
      )}
    </>
  );
}

function ContentPageRouter() {
  const [location] = useLocation();
  const path = location.split("?")[0].replace(/\/+$/, "") || "/";
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

function EmptyListingPage({
  eyebrow,
  title,
  intro,
  note,
  icon,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="listing-section">
        <div className="container-wide empty-listing">
          <span className="empty-listing-icon">{icon}</span>
          <div>
            <span className="eyebrow">No listings published</span>
            <h2 className="serif">{note}</h2>
            <p>
              We only publish information confirmed by the company. Contact us
              to discuss your requirements without assuming prices, dates or inclusions.
            </p>
            <Link className="button button-forest" href="/consultation">
              Ask about a tailored option <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <FinalCallout />
    </>
  );
}

function PackagesPage() {
  return (
    <EmptyListingPage
      eyebrow="Packages"
      title="A clear view of what is available."
      intro="Only confirmed package details belong here."
      note="There are no confirmed package listings yet."
      icon={<Compass size={28} strokeWidth={1.4} aria-hidden="true" />}
    />
  );
}

function ExperiencesPage() {
  return (
    <EmptyListingPage
      eyebrow="Experiences"
      title="A starting point for the journey ahead."
      intro="Explore the service areas before choosing a next step."
      note="Experience programmes will appear when details are confirmed."
      icon={<Plane size={28} strokeWidth={1.4} aria-hidden="true" />}
    />
  );
}

function InsightsPage() {
  return (
    <EmptyListingPage
      eyebrow="Insights"
      title="Notes for a world in motion."
      intro="Company articles and planning notes will appear here when published."
      note="There are no articles published yet."
      icon={<CalendarDays size={28} strokeWidth={1.4} aria-hidden="true" />}
    />
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

function UnpublishedDetail({ kind }: { kind: "package" | "article" }) {
  const { slug } = useParams<{ slug: string }>();
  const isPackage = kind === "package";
  const label = isPackage ? "Package" : "Article";
  return (
    <>
      <PageHero
        eyebrow={label}
        title={isPackage ? "This package is not published." : "This article is not available."}
        intro={isPackage
          ? "Only confirmed package information is shown on this website."
          : "Only published company insights are available on this website."}
      />
      <section className="body-section">
        <div className="container-narrow not-published">
          <span className="eyebrow">No public listing</span>
          <p>
            {slug ? `“${slug.replaceAll("-", " ")}” is not currently published.` : "This item is not currently published."}
            {" "}Contact the team if you would like to discuss a related enquiry.
          </p>
          <Link className="button button-forest" href="/contact">Contact us <ArrowRight size={15} /></Link>
        </div>
      </section>
    </>
  );
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
          <Route path="/packages/:slug" component={() => <UnpublishedDetail kind="package" />} />
          <Route path="/insights/:slug" component={() => <UnpublishedDetail kind="article" />} />
          <Route path="/travel/destinations/:slug" component={DestinationPage} />
          <Route path="/packages" component={PackagesPage} />
          <Route path="/experiences" component={ExperiencesPage} />
          <Route path="/insights" component={InsightsPage} />
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
