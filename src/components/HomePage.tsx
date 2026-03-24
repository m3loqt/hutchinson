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

    return () => {
      toggle.removeEventListener("click", onToggle);
      backdropEl.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      drawerLinks.forEach((link) => link.removeEventListener("click", closeDrawer));
      observer?.disconnect();
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
            <div className="hero-eyebrow">
              <span className="label">Montgomery, Alabama · Est. 1900</span>
            </div>
            <h1 className="hero-headline">
              A{" "}
              Sweet,
              <br />
              Sweet{" "}
              Spirit
            </h1>
          </div>

          <div className="hero-glass">
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
              <div className="hero-panel-details">
                <div className="hero-detail">
                  <span className="hero-detail-label">Sunday Service</span>
                  <span className="hero-detail-value">9:00 AM &amp; 11:00 AM</span>
                </div>
                <div className="hero-detail">
                  <span className="hero-detail-label">Location</span>
                  <span className="hero-detail-value">860 East Grove St, Montgomery, AL 36104</span>
                </div>
              </div>
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
        <div className="reveal reveal-delay-1">
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
              God did not send one. He sent two. Pastor Camr Thomas and First Lady Thomas have answered the
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
            <span className="pulpit-series-label">The Favor of God</span>
            <h2 className="pulpit-title serif">
              When God Prepares<br />the Table
            </h2>
            <div className="pulpit-details">
              <span>Pastor Camr Thomas</span>
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
            <p className="ministries-intro">
              Hutchinson is not just a place you attend. It is a place you belong. Find your people, find
              your purpose, and find your place to serve.
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
            <div key={m.name} className={`ministry-tile reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ""}`}>
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
              This is what Hutchinson<br />looks like.
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
          {COMMUNITY_STRIP_IMAGES.map((src) => (
            <div key={src} className="community-photo">
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
          <h2 className="events-heading serif">Come. Be part of something.</h2>
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
            <a href="#top" className="daily-bread-cta">
              get daily calm by email
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
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
            <p>
              A church rooted in faith, history, and community — serving Montgomery, Alabama and the world
              since 1900.{" "}
              <em className="footer-spirit">Sweet, Sweet Spirit.</em>
            </p>
            <div className="f-socials">
              <a
                href="https://www.youtube.com/@hmbc860"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                Yt
              </a>
            </div>
          </div>
          <div className="footer-col reveal reveal-delay-1">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#top">Welcome</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=860+East+Grove+Street+Montgomery+AL+36104"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plan a Visit
                </a>
              </li>
              <li>
                <a href="#mission">Ministries</a>
              </li>
              <li>
                <a href="https://pushpay.com/g/hutchinsonmbc" target="_blank" rel="noopener noreferrer">
                  Give
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col reveal reveal-delay-1">
            <h4>About</h4>
            <ul>
              <li>
                <a href="#mission">Our Mission</a>
              </li>
              <li>
                <a href="#mission">Our History</a>
              </li>
              <li>
                <a href="#daily-bread">Daily Bread</a>
              </li>
              <li>
                <a href="https://pushpay.com/g/hutchinsonmbc" target="_blank" rel="noopener noreferrer">
                  Online Giving
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col reveal reveal-delay-2">
            <h4>Visit</h4>
            <address>
              860 East Grove Street
              <br />
              Montgomery, AL 36104
              <br />
              <br />
              Sunday: 9AM & 11AM
              <br />
              Wed Bible Study: 7PM
              <br />
              <br />
              <a href="tel:+13342658615" className="footer-tel">
                (334) 265-8615
              </a>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Hutchinson Missionary Baptist Church. All rights reserved.</p>
          <span className="footer-est">Est. 1900 · Montgomery, Alabama</span>
        </div>
      </footer>
    </>
  );
}
