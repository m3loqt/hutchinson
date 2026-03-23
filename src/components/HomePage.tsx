"use client";

/* eslint-disable @next/next/no-img-element -- Local assets; can switch to next/image later */
import Link from "next/link";
import { useEffect, useRef } from "react";

/** Same asset as hero background — used by the glass card frost layer (blur via filter, not backdrop-filter). */
const HERO_IMAGE_SRC = "/hero.png";

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
            <a href="#new-here">New Here?</a>
          </li>
          <li>
            <a href="#daily-bread">Daily Bread</a>
          </li>
          <li>
            <a href="#engage">Ministries</a>
          </li>
          <li>
            <a href="#mission">Our Story</a>
          </li>
          <li>
            <a
              href="https://pushpay.com/g/hutchinsonmbc"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Give
            </a>
          </li>
        </ul>
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
              <a href="#new-here" className="drawer-link">
                New Here?
              </a>
            </li>
            <li>
              <a href="#daily-bread" className="drawer-link">
                Daily Bread
              </a>
            </li>
            <li>
              <a href="#engage" className="drawer-link">
                Ministries
              </a>
            </li>
            <li>
              <a href="#mission" className="drawer-link">
                Our Story
              </a>
            </li>
            <li>
              <a
                href="https://pushpay.com/g/hutchinsonmbc"
                className="drawer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Give
              </a>
            </li>
          </ul>
          <a
            href="https://pushpay.com/g/hutchinsonmbc"
            className="nav-drawer-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Give Online
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
                <a href="#new-here" className="btn-fill">
                  Join Us Sunday
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
          <a href="#engage" className="mission-link">
            Learn About Us &nbsp;→
          </a>
        </div>
      </section>

      <section className="engage" id="engage">
        <div className="engage-header">
          <h2 className="engage-heading serif reveal">
            Three ways to
            <br />
            get connected.
          </h2>
          <p className="engage-intro reveal reveal-delay-1">
            Whether you&apos;re brand new or have been here for years, there&apos;s a place for you at
            Hutchinson — to grow in faith, to serve your community, and to worship alongside a family
            rooted in love.
          </p>
        </div>
        <div className="engage-cards">
          <a
            href="https://www.youtube.com/@hmbc860"
            className="e-card reveal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="e-num">01</span>
            <div className="e-title serif">Worship</div>
            <p className="e-desc">
              Join us every Sunday for Spirit-led services grounded in Scripture and full of
              celebration. In-person and online.
            </p>
            <span className="e-arrow">→</span>
          </a>
          <a href="#mission" className="e-card reveal reveal-delay-1">
            <span className="e-num">02</span>
            <div className="e-title serif">Grow</div>
            <p className="e-desc">
              Deepen your faith through Bible study, small groups, discipleship programs, and our iLEAD
              leadership conference.
            </p>
            <span className="e-arrow">→</span>
          </a>
          <a
            href="https://pushpay.com/g/hutchinsonmbc"
            className="e-card reveal reveal-delay-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="e-num">03</span>
            <div className="e-title serif">Serve</div>
            <p className="e-desc">
              Put your faith into action. From feeding the hungry to mentoring youth — find your place to
              make a difference.
            </p>
            <span className="e-arrow">→</span>
          </a>
        </div>
      </section>

      <section className="new-here" id="new-here">
        <div className="reveal">
          <span className="label">First Time Here?</span>
          <h2 className="new-here-heading serif">
            We&apos;ve been
            <br />
            expecting you.
          </h2>
          <p className="new-here-body">
            No matter where you&apos;re coming from — or where you&apos;ve been — Hutchinson is a place
            where you will be welcomed, seen, and loved. Come as you are.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=860+East+Grove+Street+Montgomery+AL+36104"
            className="btn-fill"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan Your Visit
          </a>
        </div>
        <div className="new-here-right reveal reveal-delay-1">
          <div className="new-here-visual">
            <img
              src="/newhere.png"
              alt="Welcoming multigenerational church community outdoors"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="expect-list">
            <div className="expect-item">
              <div className="expect-title">What to Wear</div>
              <p className="expect-desc">
                Come as you are. Our congregation is diverse — casual and dressed up both fit right in.
              </p>
            </div>
            <div className="expect-item">
              <div className="expect-title">Service Length</div>
              <p className="expect-desc">
                Sunday services run approximately 90 minutes, with dynamic worship and a message from
                God&apos;s Word.
              </p>
            </div>
            <div className="expect-item">
              <div className="expect-title">For Your Kids</div>
              <p className="expect-desc">
                We have ministry for children of all ages — safe, engaging, and faith-building
                environments.
              </p>
            </div>
            <div className="expect-item">
              <div className="expect-title">After the Service</div>
              <p className="expect-desc">
                Stick around. Our congregation loves to connect — you&apos;ll feel at home quickly.
              </p>
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
                <a href="#new-here">New Here?</a>
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
                <a href="#engage">Ministries</a>
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
