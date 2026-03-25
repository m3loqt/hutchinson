"use client";

/* eslint-disable @next/next/no-img-element -- Local assets; can switch to next/image later */
import {
  Flame,
  Globe,
  GraduationCap,
  HeartHandshake,
  Music2,
  Swords,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

/** Same asset as hero background — used by the glass card frost layer (blur via filter, not backdrop-filter). */
const HERO_IMAGE_SRC = "/hero.png";

const PLAN_VISIT_URL =
  "https://www.google.com/maps/search/?api=1&query=860+East+Grove+Street+Montgomery+AL+36104";

/** Replace with your prayer form or page URL; mailto is a fallback until you have one. */
const PRAYER_REQUEST_URL = "mailto:info@hutchinsonmbc.org?subject=Prayer%20Request";

/** Edge-to-edge community strip (left → right): Sunday service, outreach, youth, worship team, fellowship */
const COMMUNITY_STRIP_IMAGES = ["/1.jpg", "/2.jpg", "/3.jpg", "/5.jpg", "/6.jpg"] as const;

export default function HomePage() {
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const toggle = toggleRef.current;
    const drawerEl = drawerRef.current;
    const backdropEl = backdropRef.current;
    if (!nav || !toggle || !drawerEl || !backdropEl) return;

    function setNavOpen(open: boolean) {
      const drawer = drawerRef.current;
      const btn = toggleRef.current;
      if (!drawer || !btn) return;
      document.body.classList.toggle("nav-open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    const onToggle = () => {
      setNavOpen(!document.body.classList.contains("nav-open"));
    };
    const onBackdrop = () => setNavOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    };

    toggle.addEventListener("click", onToggle);
    backdropEl.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    const drawerLinks = document.querySelectorAll(".drawer-link");
    const closeDrawer = () => setNavOpen(false);
    drawerLinks.forEach((link) => link.addEventListener("click", closeDrawer));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll-reveal for .reveal elements
    let observer: IntersectionObserver | undefined;
    if (!reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
      );
      document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
    } else {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    }

    // Scroll-reveal for .animate-ready elements (fade / fade-up system)
    let animObserver: IntersectionObserver | undefined;
    if (!reduceMotion) {
      animObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
              animObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
      );
      document.querySelectorAll(".animate-ready").forEach((el) => animObserver?.observe(el));
    } else {
      document.querySelectorAll(".animate-ready").forEach((el) => el.classList.add("animate-in"));
    }

    // Ghost text page-load fade (not scroll-triggered)
    let ghostTimer: ReturnType<typeof setTimeout> | undefined;
    const ghostEls = document.querySelectorAll(".footer-ghost");
    if (!reduceMotion) {
      ghostTimer = setTimeout(() => {
        ghostEls.forEach((el) => el.classList.add("ghost-revealed"));
      }, 400);
    } else {
      ghostEls.forEach((el) => el.classList.add("ghost-revealed"));
    }

    return () => {
      toggle.removeEventListener("click", onToggle);
      backdropEl.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      drawerLinks.forEach((link) => link.removeEventListener("click", closeDrawer));
      observer?.disconnect();
      animObserver?.disconnect();
      clearTimeout(ghostTimer);
      document.body.classList.remove("nav-open");
    };
  }, []);

  return (
    <>
      <nav id="nav" ref={navRef} aria-label="Primary">
        <div className="nav-cluster">
          <Link href="/" className="nav-logo">
            <img
              src="/whitelogo.png"
              alt="Hutchinson Missionary Baptist Church"
              width={560}
              height={122}
              className="nav-logo-img"
              decoding="async"
            />
          </Link>
          <ul className="nav-links">
            <li>
              <a href="#top">Welcome</a>
            </li>
            <li>
              <a href="#daily-bread">Daily Bread</a>
            </li>
            <li>
              <a href="#mission">Ministries</a>
            </li>
            <li>
              <a href="#mission">Our Story</a>
            </li>
          </ul>
        </div>
        <div className="nav-actions">
          <a
            href={PLAN_VISIT_URL}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan your visit
          </a>
          <button
            type="button"
            className="nav-toggle"
            ref={toggleRef}
            aria-expanded="false"
            aria-controls="nav-drawer-panel"
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className="nav-drawer" id="nav-drawer" ref={drawerRef} aria-hidden="true">
        <div className="nav-drawer-backdrop" id="nav-drawer-backdrop" ref={backdropRef} />
        <div
          className="nav-drawer-panel"
          id="nav-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <ul className="nav-drawer-links">
            <li>
              <a href="#top" className="drawer-link">
                Welcome
              </a>
            </li>
            <li>
              <a href="#daily-bread" className="drawer-link">
                Daily Bread
              </a>
            </li>
            <li>
              <a href="#mission" className="drawer-link">
                Ministries
              </a>
            </li>
            <li>
              <a href="#mission" className="drawer-link">
                Our Story
              </a>
            </li>
          </ul>
          <a
            href={PLAN_VISIT_URL}
            className="nav-drawer-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan your visit
          </a>
          <p className="nav-drawer-meta">
            860 East Grove Street
            <br />
            Montgomery, AL 36104
            <br />
            <br />
            <a href="https://www.youtube.com/@hmbc860" target="_blank" rel="noopener noreferrer">
              YouTube @hmbc860
            </a>
          </p>
        </div>
      </div>

      <section className="hero" id="top" aria-label="Welcome">
        <div className="hero-bg">
          <img
            src={HERO_IMAGE_SRC}
            alt="Sanctuary bathed in warm golden light"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-layout">
          <div className="hero-column hero-column--headline">
            <div className="hero-eyebrow animate-ready anim--fade anim--600 anim--d1">
              <span className="label">Montgomery, Alabama · Est. 1900</span>
            </div>
            <h1 className="hero-headline animate-ready anim--fade-up anim--800 anim--d2">
              A{" "}
              Sweet,
              <br />
              Sweet{" "}
              Spirit
            </h1>
          </div>

          <div className="hero-glass animate-ready anim--fade-up anim--d4">
            {/* Real glass blur: same photo as hero, fixed to viewport + filter (works when backdrop-filter does not). */}
            <div
              className="hero-glass-frost"
              aria-hidden="true"
              style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
            />
            <div className="hero-glass-tint" aria-hidden="true" />
            <div className="hero-glass-inner">
              <p className="hero-panel-desc">
                Rooted in 125 years of faith, community, and the enduring love of God. A new season. The
                same spirit. You are welcome here.
              </p>
              <div className="hero-panel-actions">
                <a
                  href={PLAN_VISIT_URL}
                  className="btn-fill"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plan your visit
                </a>
                <a
                  href="https://www.youtube.com/@hmbc860"
                  className="btn-text hero-panel-btn-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="play-ring">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(244,239,230,0.85)" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch Online
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-nudge" aria-hidden="true">
          <span>Scroll</span>
        </div>
      </section>

      <section className="mission" id="mission">
        <div className="mission-aside reveal">
          <span className="label">Our Mission</span>
        </div>
        <div className="mission-content reveal reveal-delay-1">
          <p className="mission-quote serif">
            &ldquo;Striving to maintain a <em>sweet, sweet spirit </em> — equipping saints, reaching the
            lost, and feeding the hungry throughout the world.&rdquo;
          </p>
          <p className="mission-body">
            Hutchinson Missionary Baptist Church has anchored the Montgomery community since 1900.
            Today, under a new season of pastoral leadership, we remain committed to the same calling:
            equipping people to live fully for God and serve fully in the world.
          </p>
          <a href="#daily-bread" className="mission-link">
            Learn About Us &nbsp;→
          </a>
        </div>
      </section>

      {/* ── SECTION 1: MEET THE PASTOR ── */}
      <section className="pastor" id="pastor" aria-label="Pastoral leadership">
        <div className="pastor-layout">
          <div className="pastor-photo reveal" aria-hidden="true">
            <div className="pastor-photo-bg" />
          </div>

          <div className="pastor-content reveal reveal-delay-1">
            <span className="label">Pastoral leadership</span>
            <h2 className="pastor-name serif">Led by Calling, Rooted in Love</h2>
            <p className="pastor-bio">
              God did not send one. He sent two. Pastor Cameron Thomas and First Lady Thomas have answered the
              call to lead Hutchinson into its next hundred years together.
            </p>
            <div className="pastor-links">
              <a href="#pastor" className="inline-link inline-link--light">
                Read full bio →
              </a>
              <a
                href="https://www.youtube.com/@hmbc860"
                className="inline-link inline-link--light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch a message →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: LATEST SERMON ── */}
      <section className="pulpit" id="sermons" aria-label="Latest Sermon">
        <div className="pulpit-layout">
          {/* Inverted vs pastor: copy 43% | full-height media 57% */}
          <div className="pulpit-meta reveal">
            <span className="label pulpit-eyebrow-label">From the Pulpit</span>
         
            <h2 className="pulpit-title serif">
              When God Prepares<br />the Table
            </h2>
            <div className="pulpit-details">
              <span>Pastor Cameron Thomas</span>
              <span className="pulpit-dot" aria-hidden="true">·</span>
              <span>March 23, 2025</span>
              <span className="pulpit-dot" aria-hidden="true">·</span>
              <span>Psalm 23:5</span>
            </div>
            <div className="pulpit-links">
              <a
                href="https://www.youtube.com/@hmbc860"
                className="inline-link inline-link--dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Full Sermon →
              </a>
              <a
                href="https://www.youtube.com/@hmbc860"
                className="inline-link inline-link--dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Sermon Archive →
              </a>
            </div>
          </div>

          <div className="pulpit-video reveal reveal-delay-1">
            <a
              href="https://www.youtube.com/@hmbc860"
              className="pulpit-thumb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch sermon on YouTube"
            >
              <div className="pulpit-thumb-bg" />
              <div className="pulpit-thumb-scrim" aria-hidden="true" />
              <div className="pulpit-play-btn" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MINISTRIES ── */}
      <section className="ministries" id="ministries" aria-label="Ministries">
        <div className="ministries-header reveal">
          <span className="label">Ways to Serve</span>
          <div className="ministries-header-row">
            <h2 className="ministries-heading serif">
              There is a place<br />
              here for you
            </h2>
            <p className="ministries-intro">Hutchinson is not just a place you attend on Sunday. It is a place you belong every day of the week. Find your people, grow in your purpose, and discover where your gifts are needed most.
            </p>
          </div>
        </div>

        <div className="ministries-grid">
          {([
            {
              name: "Men's Ministry",
              icon: Swords,
              desc: "Brotherhood is not built overnight. It is forged through accountability, prayer, and men who choose to show up.",
            },
            {
              name: "Women's Ministry",
              icon: HeartHandshake,
              desc: "There is a seat at the table for every woman here. Together, we grow in faith and become who God called us to be.",
            },
            {
              name: "Youth & Young Adults",
              icon: GraduationCap,
              desc: "The next generation is not waiting in the wings at Hutchinson. They are here, active, and rooted in the Word right now.",
            },
            {
              name: "Outreach & Missions",
              icon: Globe,
              desc: "Hutchinson believes the church belongs in the community. From Montgomery's streets to the mission field, we go where the need is.",
            },
            {
              name: "Music & Worship",
              icon: Music2,
              desc: "Worship at Hutchinson is not a warm-up before the sermon. It is a full encounter with God, led by people who take that seriously.",
            },
            {
              name: "Prayer Ministry",
              icon: Flame,
              desc: "Every great work at Hutchinson begins on our knees. Join us as we intercede for this church, this city, and this world.",
            },
          ] satisfies ReadonlyArray<{ name: string; icon: LucideIcon; desc: string }>).map((m, i) => (
            <div key={m.name} className={`ministry-tile reveal${i > 0 ? ` reveal-delay-${Math.min(i, 5)}` : ""}`}>
              <div className="ministry-icon-wrap" aria-hidden>
                <m.icon className="ministry-icon" strokeWidth={1.5} size={28} />
              </div>
              <h3 className="ministry-name serif">{m.name}</h3>
              <p className="ministry-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO STRIP: OUR COMMUNITY ── */}
      <section className="community" id="community" aria-label="Our Community">
        {/* Text header — stays inside normal page padding */}
        <div className="community-header">
          <div className="community-header-left reveal">
            <span className="label community-eyebrow-label">Our Community</span>
            <h2 className="community-heading serif">
              This is what Hutchinson<br /> Community looks like
            </h2>
          </div>
          <div className="community-header-right reveal reveal-delay-1">
            <p className="community-body">
              Real people. Real faith. Real community. Follow us on Instagram for a glimpse into
              the life of this church beyond Sunday morning.
            </p>
            <a
              href="https://www.instagram.com/hmbc860"
              className="inline-link inline-link--dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us @hmbc860 →
            </a>
          </div>
        </div>

        {/* Full-bleed photo strip — zero padding, edge to edge */}
        <div className="community-strip" role="img" aria-label="Congregation photo collage">
          {COMMUNITY_STRIP_IMAGES.map((src, i) => (
            <div key={src} className={`community-photo animate-ready anim--fade anim--s${Math.min(i + 1, 5)}`}>
              <div
                className="community-photo-bg"
                style={{ backgroundImage: `url("${src}")` }}
              />
              <div className="community-photo-hover" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span className="community-photo-handle">@hmbc860</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: UPCOMING EVENTS ── */}
      <section className="events" id="events" aria-label="Upcoming Events">
        <div className="events-header reveal">
          <span className="label events-eyebrow-label">What&rsquo;s Happening</span>
          <h2 className="events-heading serif">Come. Be part of something</h2>
        </div>

        <div className="events-list">
          {[
            { month: "APR", day: "6",  name: "Palm Sunday Worship",    desc: "A special service to begin Holy Week." },
            { month: "APR", day: "13", name: "Easter Sunday",           desc: "He is risen. Join us for our Easter celebration service." },
            { month: "APR", day: "19", name: "Community Outreach Day",  desc: "Serving Montgomery together." },
            { month: "MAY", day: "4",  name: "Women's Day",             desc: "A day of worship, reflection, and sisterhood." },
          ].map((e, i) => (
            <div key={e.name} className={`event-row reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ""}`}>
              <div className="event-date" aria-label={`${e.month} ${e.day}`}>
                <strong className="event-day serif">{e.day}</strong>
                <span className="event-month">{e.month}</span>
              </div>
              <div className="event-info">
                <h3 className="event-name serif">{e.name}</h3>
                <p className="event-desc">{e.desc}</p>
              </div>
              <a href="#events" className="event-link">Learn More →</a>
            </div>
          ))}
        </div>

        <div className="events-footer reveal">
          <a href="#events" className="inline-link inline-link--dark">View Full Calendar →</a>
        </div>
      </section>

      {/* ── PLAN YOUR VISIT ── */}
      <section className="visit-section" id="visit" aria-label="Plan Your Visit">
        <div className="visit-visual" aria-hidden="true">
          <div
            className="visit-bg"
            style={{ backgroundImage: "url('/nextstep.png')" }}
          />
        </div>

        <div className="visit-content-column">
          <div className="visit-content">
            <span className="label visit-label">Plan Your Visit</span>

            <h2 className="visit-heading serif">
              We have been<br />waiting for you
            </h2>

            <p className="visit-body">
              Whether this is your first Sunday or you are finding your way back, you are welcome
              at Hutchinson. Come as you are. We will take care of the rest.
            </p>

            {/* Info block */}
            <div className="visit-info">
              <div className="visit-info-item">
                <span className="label visit-info-label">Service Times</span>
                <p className="visit-info-text">Sunday: 9AM &amp; 11AM</p>
                <p className="visit-info-text">Wednesday Bible Study: 7PM</p>
              </div>
              <div className="visit-info-item">
                <span className="label visit-info-label">Location</span>
                <p className="visit-info-text">860 East Grove Street</p>
                <p className="visit-info-text">Montgomery, AL 36104</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="visit-ctas">
              <a
                href={PLAN_VISIT_URL}
                className="btn-fill visit-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plan Your Visit
              </a>
              <a
                href={PLAN_VISIT_URL}
                className="inline-link inline-link--light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="daily-bread" id="daily-bread" aria-label="Our Daily Bread">
        <div className="daily-bread-layout">
          <div className="daily-bread-verse" aria-hidden="true">
            <span>Isaiah</span>
            <strong>58:11</strong>
          </div>

          <div className="daily-bread-content reveal">
            <span className="label">Our Daily Bread</span>
            <h2 className="daily-bread-heading serif">
              Grace flows quietly through patience. When you stop striving to fix everything, you begin to
              see how love already surrounds and carries you forward.
            </h2>
            <p className="daily-bread-body">
              Receive personal reflections each morning, short thoughts or verses chosen to calm, inspire,
              and center you in God&apos;s peace.
            </p>
            <div className="daily-bread-cta-row">
              <a href="#top" className="daily-bread-cta">
                start your morning with scripture
              </a>
              <a href={PRAYER_REQUEST_URL} className="daily-bread-secondary-link">
                Have a prayer request? Submit it here.
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>

        {/* ════════════════════════════════════════
            LAYER 1 — Main content grid
        ════════════════════════════════════════ */}
        <div className="footer-grid">

          {/* ── Column 1: Brand ── */}
          <div className="footer-brand reveal">
            <img
              src="/whitelogo.png"
              alt="Hutchinson Missionary Baptist Church"
              width={720}
              height={152}
              className="footer-logo-img"
              loading="lazy"
              decoding="async"
            />
            <p className="footer-tagline">
            A
            Hutchinson is a home. Rooted in Montgomery, Alabama since 1900, this church has stood through generations as a place of worship, service, and deep community. The calling has never changed and neither has the spirit.
            </p>

            {/* Affiliation sub-section */}
            <span className="label footer-affil-label">Affiliated With</span>

            {/* 2×2 affiliation logo row */}
            <div className="footer-affil-logos">
              <img src="/affiliation1.png" alt="" aria-hidden="true" className="footer-affil-logo" />
              <img src="/affiliation2.png" alt="" aria-hidden="true" className="footer-affil-logo" />
            </div>
          </div>

          {/* ── Column 2: Connect ── */}
          <div className="footer-col footer-col--connect reveal reveal-delay-1">
            <span className="label footer-col-label">Connect</span>
            <ul>
              <li><a href="#top">Welcome</a></li>
              <li><a href={PLAN_VISIT_URL} target="_blank" rel="noopener noreferrer">Plan a Visit</a></li>
              <li><a href="#ministries">Ministries</a></li>
              <li><a href="https://pushpay.com/g/hutchinsonmbc" target="_blank" rel="noopener noreferrer">Give</a></li>
              <li><a href="#daily-bread">Daily Bread</a></li>
            </ul>
          </div>

          {/* ── Column 3: About ── */}
          <div className="footer-col footer-col--about reveal reveal-delay-2">
            <span className="label footer-col-label">About</span>
            <ul>
              <li><a href="#mission">Our Mission</a></li>
              <li><a href="#mission">Our History</a></li>
              <li><a href="#mission">Affiliations</a></li>
              <li><a href="#mission">Scholarships</a></li>
            </ul>
          </div>

          {/* ── Column 4: Visit ── */}
          <div className="footer-col footer-col--visit reveal reveal-delay-3">
            <span className="label footer-col-label">Visit</span>
            <address className="footer-address">
              860 East Grove Street<br />
              Montgomery, AL 36104
            </address>
            <div className="footer-times">
              <p>Sunday: 9AM &amp; 11AM</p>
              <p>Wednesday Bible Study: 7PM</p>
            </div>
            <a href="tel:+13342658615" className="footer-tel">(334) 265-8615</a>
            <a href="https://pushpay.com/g/hutchinsonmbc" className="footer-give-btn" target="_blank" rel="noopener noreferrer">
              Give Online
            </a>
          </div>

        </div>

        {/* ════════════════════════════════════════
            LAYER 2 — Bottom bar
        ════════════════════════════════════════ */}
        <div className="footer-rule" aria-hidden="true" />
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Hutchinson Missionary Baptist Church. All rights reserved.</p>
          {/* Social icons now live on the right bottom bar */}
          <div className="footer-socials footer-socials--bottom">
            <a href="https://www.youtube.com/@hmbc860" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/hmbc860" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/hmbc860" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98C23.99 15.67 24 15.26 24 12c0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
            </a>
            <a href="https://x.com/hmbc860" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social-link">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.54h2.04L6.49 3.24H4.3l13.31 17.45z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ════════════════════════════════════════
            LAYER 3 — Ghost text
            Dark on dark — felt rather than read.
            Zero margin/padding below; flush to footer base.
        ════════════════════════════════════════ */}
        <p className="footer-ghost footer-ghost--full"  aria-hidden="true">HUTCHINSON</p>
        <p className="footer-ghost footer-ghost--short" aria-hidden="true">HMBC</p>

      </footer>
    </>
  );
}
