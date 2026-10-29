import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  Globe2,
  HeartPulse,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plane,
  X,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export const CONTACT_EMAIL = "info@karibuandbeyondltd.com";
export const PHONE_ONE = "+254 729 861 607";
export const PHONE_TWO = "+254 711 556 151";
export const WHATSAPP_NUMBER = "254729861607";
const LOGO = `${import.meta.env.BASE_URL}karibu-logo.png`;

const serviceLinks = [
  ["Tours, travel & transfers", "/services/tours-travel-transfers"],
  ["Events management", "/services/events-management"],
  ["Medical tourism", "/services/medical-tourism"],
  ["Pilgrimage tourism", "/services/pilgrimage-tourism"],
  ["Consultancy", "/services/consultancy"],
] as const;

function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={footer ? "brand-logo brand-logo-footer" : "brand-logo"}
      aria-label="Karibu and Beyond Ltd home"
    >
      <img src={LOGO} alt="Karibu and Beyond Ltd" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isHome = (location.split("?")[0].replace(/\/+$/, "") || "/") === "/";

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header${isHome ? " site-header-home" : ""}`}>
      <div className="topline">
        <div className="container-wide topline-inner">
          <span>Kenya · East Africa · India</span>
          <div className="topline-contact">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <span aria-hidden="true">/</span>
            <a href="tel:+254729861607">{PHONE_ONE}</a>
          </div>
        </div>
      </div>
      <div className="container-wide nav-row">
        <BrandLogo />
        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`main-nav${open ? " nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <Link href="/about" onClick={() => setOpen(false)}>Our story</Link>
          <details className="nav-dropdown">
            <summary>
              Services <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div className="dropdown-menu">
              {serviceLinks.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  {label}<ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </details>
          <Link href="/packages" onClick={() => setOpen(false)}>Packages</Link>
          <Link href="/experiences" onClick={() => setOpen(false)}>Experiences</Link>
          <Link href="/insights" onClick={() => setOpen(false)}>Insights</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            className="button button-gold nav-mobile-cta"
            href="/consultation"
            onClick={() => setOpen(false)}
          >
            Request a consultation <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>
        <Link className="button button-forest nav-cta" href="/consultation">
          Request a consultation <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide footer-main">
        <div className="footer-brand">
          <BrandLogo footer />
          <p>Premium service, considered for a global world.</p>
          <span className="footer-region">
            <Globe2 size={16} aria-hidden="true" /> Kenya · East Africa · India
          </span>
        </div>
        <div className="footer-links">
          <h2>Explore</h2>
          <Link href="/about">Our story</Link>
          <Link href="/services">Services</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/experiences">Experiences</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/faq">Frequently asked questions</Link>
        </div>
        <div className="footer-links">
          <h2>Our services</h2>
          {serviceLinks.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <div className="footer-links footer-contact">
          <h2>Get in touch</h2>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <Mail size={15} aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
          <a href="tel:+254729861607">
            <Phone size={15} aria-hidden="true" /> {PHONE_ONE}
          </a>
          <a href="tel:+254711556151">
            <Phone size={15} aria-hidden="true" /> {PHONE_TWO}
          </a>
          <span><MapPin size={15} aria-hidden="true" /> Embakasi, North Airport Road, Kenya</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Karibu and Beyond, I would like to make an enquiry.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={15} aria-hidden="true" /> Message us on WhatsApp
          </a>
        </div>
      </div>
      <div className="container-wide footer-bottom">
        <span>© {new Date().getFullYear()} Karibu and Beyond Ltd</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/cookie-policy">Cookies</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <section className={`page-hero${dark ? " page-hero-dark" : ""}`}>
      <div className="container-wide page-hero-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span>{eyebrow}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="serif">{title}</h1>
        <p className="page-intro">{intro}</p>
      </div>
      <span className="page-hero-orbit" aria-hidden="true" />
    </section>
  );
}

type EnquiryKind = "general" | "travel" | "events" | "medical_tourism" | "pilgrimage" | "consultancy";

function readValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildEnquiryMessage(form: HTMLFormElement, service: EnquiryKind) {
  const data = new FormData(form);
  const fields: Array<[string, string]> = [
    ["Name", readValue(data, "name")],
    ["Email", readValue(data, "email")],
    ["Phone", readValue(data, "phone")],
    ["Service", readValue(data, "service") || service.replaceAll("_", " ")],
    ["Organization", readValue(data, "organization")],
    ["Destination", readValue(data, "destination")],
    ["Preferred dates", readValue(data, "dates")],
    ["Departure point", readValue(data, "departure")],
    ["Group size", readValue(data, "groupSize")],
    ["Event type", readValue(data, "eventType")],
    ["Venue or location", readValue(data, "location")],
    ["Enquiry", readValue(data, "message")],
  ];
  const body = [
    "Hello Karibu and Beyond,",
    "",
    "I would like to make an enquiry.",
    "",
    ...fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    "",
    "Please contact me to discuss the next step. I understand this enquiry is not a booking.",
  ].join("\n");
  const subject = `${service.replaceAll("_", " ")} enquiry from ${readValue(data, "name")}`;
  return {
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
  };
}

export function EnquiryForm({
  service = "general",
}: {
  service?: EnquiryKind;
}) {
  const [prepared, setPrepared] = useState<{ mailto: string; whatsapp: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(buildEnquiryMessage(event.currentTarget, service));
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={120} />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <label>
          Phone number <span className="optional-label">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+254" />
        </label>
        {service === "general" && (
          <label>
            Service of interest
            <select name="service" defaultValue="">
              <option value="">Choose a service</option>
              <option value="travel">Tours, travel & transfers</option>
              <option value="events">Events management</option>
              <option value="medical tourism">Medical tourism</option>
              <option value="pilgrimage">Pilgrimage tourism</option>
              <option value="consultancy">Consultancy</option>
              <option value="other">Something else</option>
            </select>
          </label>
        )}
        {service === "travel" && (
          <>
            <label>Destination<input name="destination" maxLength={160} placeholder="Where are you considering?" /></label>
            <label>Preferred dates<input name="dates" maxLength={120} placeholder="Approximate timing is fine" /></label>
            <label>Departure point<input name="departure" maxLength={160} placeholder="City or airport" /></label>
            <label>Group size<input name="groupSize" type="number" min={1} max={10000} /></label>
          </>
        )}
        {service === "events" && (
          <>
            <label>Event type<input name="eventType" maxLength={120} placeholder="Conference, wedding, launch…" /></label>
            <label>Proposed date<input name="dates" maxLength={120} placeholder="Approximate timing is fine" /></label>
            <label>Venue or location<input name="location" maxLength={160} /></label>
            <label>Expected attendance<input name="groupSize" type="number" min={1} max={10000} /></label>
          </>
        )}
        {service === "pilgrimage" && (
          <>
            <label>Destination<input name="destination" maxLength={160} /></label>
            <label>Preferred dates<input name="dates" maxLength={120} placeholder="Approximate timing is fine" /></label>
            <label>Departure point<input name="departure" maxLength={160} /></label>
            <label>Group size<input name="groupSize" type="number" min={1} max={10000} /></label>
          </>
        )}
        {service === "consultancy" && (
          <label className="form-full">
            Organization <span className="optional-label">(optional)</span>
            <input name="organization" autoComplete="organization" maxLength={160} />
          </label>
        )}
      </div>
      <label>
        {service === "medical_tourism" ? "Travel coordination question" : "How can we help?"}
        <textarea
          name="message"
          rows={5}
          minLength={10}
          maxLength={2500}
          required
          placeholder="A little practical context helps us respond."
        />
      </label>
      {service === "medical_tourism" && (
        <p className="form-note form-warning">
          Do not include diagnoses, treatment details, medical records or other health information.
          This is not a secure medical channel. For clinical questions, contact a qualified
          healthcare professional directly.
        </p>
      )}
      {service === "consultancy" && (
        <p className="form-note">
          Please do not include confidential or sensitive business information in an initial enquiry.
        </p>
      )}
      <label className="consent-line">
        <input type="checkbox" name="acknowledgement" required />
        <span>
          I understand this website prepares a message on my device. It does not send or save
          my enquiry. Read the <Link href="/privacy-policy">privacy notice</Link>. <span aria-hidden="true">*</span>
        </span>
      </label>
      <button className="button button-forest" type="submit">
        Prepare my enquiry <ArrowRight size={16} aria-hidden="true" />
      </button>
      {prepared && (
        <div className="prepared-message" role="status" aria-live="polite">
          <strong>Your message is ready.</strong>
          <span>Choose where to continue. Nothing is sent until you send it from that service.</span>
          <div className="prepared-actions">
            <a className="button button-forest" href={prepared.mailto}>
              Open email <Mail size={15} aria-hidden="true" />
            </a>
            <a
              className="button button-outline"
              href={prepared.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Continue on WhatsApp <MessageCircle size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
      <p className="form-note">
        For urgent matters, contact us directly by phone. An enquiry is not a booking or
        confirmation of availability.
      </p>
    </form>
  );
}

export function ContactDetails() {
  return (
    <div className="contact-details">
      <a href={`mailto:${CONTACT_EMAIL}`}>
        <span className="contact-icon"><Mail size={18} aria-hidden="true" /></span>
        <span><small>Email</small><strong>{CONTACT_EMAIL}</strong></span>
      </a>
      <a href="tel:+254729861607">
        <span className="contact-icon"><Phone size={18} aria-hidden="true" /></span>
        <span><small>Call</small><strong>{PHONE_ONE}</strong></span>
      </a>
      <a href="tel:+254711556151">
        <span className="contact-icon"><Phone size={18} aria-hidden="true" /></span>
        <span><small>Also available</small><strong>{PHONE_TWO}</strong></span>
      </a>
      <div>
        <span className="contact-icon"><MapPin size={18} aria-hidden="true" /></span>
        <span><small>Location</small><strong>Embakasi, North Airport Road, Kenya</strong></span>
      </div>
    </div>
  );
}

function WhatsAppContact() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const contacts = [
    { number: WHATSAPP_NUMBER, display: PHONE_ONE, primary: true },
    { number: "254711556151", display: PHONE_TWO, primary: false },
  ];

  return (
    <>
      <section
        className="whatsapp-panel"
        id="whatsapp-contact"
        aria-label="WhatsApp contact options"
        hidden={!open}
      >
          <div className="whatsapp-panel-header">
            <SiWhatsapp size={20} aria-hidden="true" />
            <strong>WhatsApp</strong>
            <button
              type="button"
              className="whatsapp-panel-close"
              aria-label="Close WhatsApp contact options"
              onClick={() => setOpen(false)}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <p>Choose a number to start a conversation on WhatsApp.</p>
          <div className="whatsapp-number-list">
            {contacts.map(({ number, display, primary }) => (
              <a
                className="whatsapp-number"
                href={`https://wa.me/${number}?text=${encodeURIComponent("Hello Karibu and Beyond, I would like to make an enquiry.")}`}
                key={number}
                target="_blank"
                rel="noreferrer"
              >
                <span className={`whatsapp-number-icon${primary ? " is-primary" : ""}`}>
                  <Phone size={17} aria-hidden="true" />
                </span>
                <span className="whatsapp-number-copy">
                  <strong>{display}</strong>
                  {primary && <small>Primary line</small>}
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
      </section>
      <button
        className={`whatsapp-float${open ? " whatsapp-float-open" : ""}`}
        type="button"
        aria-label={open ? "Close WhatsApp contact options" : "Open WhatsApp contact options"}
        aria-expanded={open}
        aria-controls="whatsapp-contact"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} aria-hidden="true" /> : <SiWhatsapp size={26} aria-hidden="true" />}
        {!open && <span className="whatsapp-float-dot" aria-hidden="true" />}
      </button>
    </>
  );
}

export function ServiceIcon({ name }: { name: string }) {
  const iconProps = { size: 25, strokeWidth: 1.5, "aria-hidden": true as const };
  if (name === "plane") return <Plane {...iconProps} />;
  if (name === "calendar") return <CalendarDays {...iconProps} />;
  if (name === "health") return <HeartPulse {...iconProps} />;
  if (name === "landmark") return <Landmark {...iconProps} />;
  return <BriefcaseBusiness {...iconProps} />;
}

export function FinalCallout({
  title = "Tell us what you're planning.",
  text = "Start with a conversation. We will discuss your requirements and the appropriate next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="final-callout">
      <div className="container-wide final-callout-inner">
        <div>
          <span className="eyebrow eyebrow-gold">A considered next step</span>
          <h2 className="serif">{title}</h2>
          <p>{text}</p>
        </div>
        <Link className="button button-gold" href="/consultation">
          Begin a conversation <ArrowDownRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppContact />
    </>
  );
}
