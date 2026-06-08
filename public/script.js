const API_BASE = "/api";
const BLOG_BATCH_SIZE = 6;
const ADMIN_REFRESH_INTERVAL_MS = 15000;
const BLOG_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

let blogData = [
  {
    id: 1,
    title: "The Absolute Best Late-Night Ramen Spots in SF You Need to Try Right Now",
    category: "Food",
    location: "San Francisco",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "best-late-night-ramen-sf",
    excerpt:
      "After 40+ bowls across the city, Kimia narrows it down to the six spots that actually earn a second visit.",
    date: "May 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "7 Days in Kyoto: An Off-The-Beaten Path Itinerary",
    category: "Travel",
    location: "Japan Diaries",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "kyoto-off-the-beaten-path-itinerary",
    excerpt: "Skip the tourist traps. This is the Kyoto only locals know.",
    date: "Apr 2026",
    status: "Published",
  },
  {
    id: 3,
    title: "Curating a Mindful & Minimal Living Space",
    category: "Lifestyle",
    location: "Design Systems",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "mindful-minimal-living-space",
    excerpt: "How to build a home that feels as good as it looks.",
    date: "Mar 2026",
    status: "Published",
  },
  {
    id: 4,
    title: "Behind Closed Doors: SF's Underground Speakeasies",
    category: "Drinks",
    location: "Hidden Bars",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "sf-underground-speakeasies",
    excerpt: "The bars that don't have signs. Only regulars know.",
    date: "Feb 2026",
    status: "Published",
  },
  {
    id: 5,
    title: "The Rise of High-Design Minimalist Espresso Bars",
    category: "Culture",
    location: "Morning Rituals",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "minimalist-espresso-bars",
    excerpt: "When coffee becomes architecture. A tour of SF's best third-wave cafes.",
    date: "Jan 2026",
    status: "Published",
  },
  {
    id: 6,
    title: "Architectural Masterpieces You Can Stay In This Year",
    category: "Travel",
    location: "Boutique Stay",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "architectural-hotels-to-book",
    excerpt: "Hotels that feel more like galleries. The most stunning stays of 2026.",
    date: "Dec 2025",
    status: "Published",
  },
  {
    id: 7,
    title: "The Mission District Taco Crawl: Every Stop Ranked",
    category: "Food",
    location: "Taqueria Trail",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "mission-district-taco-crawl",
    excerpt: "Eight taquerias, one afternoon, zero regrets. The definitive ranking.",
    date: "Nov 2025",
    status: "Published",
  },
  {
    id: 8,
    title: "Morning Hikes That Will Completely Reset Your Week",
    category: "Lifestyle",
    location: "Outdoors",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "bay-area-morning-hikes",
    excerpt: "Five trails within an hour of SF that offer real solitude and real views.",
    date: "Oct 2025",
    status: "Published",
  },
  {
    id: 9,
    title: "Natural Wine Bars in SF That Are Actually Worth The Hype",
    category: "Drinks",
    location: "Natural Wine",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "sf-natural-wine-bars",
    excerpt: "Cloudy, funky, alive. The natural wine scene in SF is finally growing up.",
    date: "Sep 2025",
    status: "Published",
  },
  {
    id: 10,
    title: "A Tiny Guide to Eating Solo Without Feeling Weird",
    category: "Lifestyle",
    location: "Solo Dining",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "solo-dining-guide",
    excerpt: "Counter seats, quiet confidence, and places where dining alone feels luxurious.",
    date: "Aug 2025",
    status: "Published",
  },
  {
    id: 11,
    title: "The Best Bakeries for a Slow Saturday Morning",
    category: "Food",
    location: "Bakery Run",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "best-saturday-morning-bakeries",
    excerpt: "Croissants, morning buns, and the exact time to arrive before the line gets serious.",
    date: "Jul 2025",
    status: "Draft",
  },
  {
    id: 12,
    title: "Packing Light for a Design-Forward Weekend Away",
    category: "Travel",
    location: "Weekend Kit",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "packing-light-weekend-away",
    excerpt: "A practical capsule packing list for short trips that still photograph beautifully.",
    date: "Jun 2025",
    status: "Scheduled",
  },
];

const fallbackBlogData = blogData.map((post) => ({ ...post }));

const categoryColorClassMap = {
  sand: "card-label-sand",
  pink: "card-label-pink",
  olive: "card-label-olive",
};

const blogRenderState = new Map();
let fadeUpObserver = null;
let postDataVersion = 0;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function parsePostTimestamp(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const isTimestamp =
    /^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/.test(raw);
  if (!isTimestamp) return null;

  const isSQLiteTimestamp = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/.test(raw);
  const hasExplicitTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(raw);
  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const timestamp = isSQLiteTimestamp && !hasExplicitTimezone ? `${normalized}Z` : normalized;
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatExactPostDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getCalendarDayDistance(date, reference = new Date()) {
  const dateStart = new Date(date);
  const referenceStart = new Date(reference);
  dateStart.setHours(0, 0, 0, 0);
  referenceStart.setHours(0, 0, 0, 0);
  return Math.round(Math.abs(referenceStart.getTime() - dateStart.getTime()) / (60 * 60 * 24 * 1000));
}

function formatRelativeDate(date) {
  const diffMs = Date.now() - date.getTime();
  const isFuture = diffMs < 0;
  const absMs = Math.abs(diffMs);
  const seconds = Math.round(absMs / 1000);
  const dayDistance = getCalendarDayDistance(date);

  if (dayDistance >= 7) return formatExactPostDate(date);
  if (dayDistance >= 1) {
    const label = `${dayDistance} day${dayDistance === 1 ? "" : "s"}`;
    return isFuture ? `in ${label}` : `${label} ago`;
  }
  if (seconds < 45) return "Just now";

  const units = [
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, unitSeconds] of units) {
    const hasUnitElapsed = Math.floor(seconds / unitSeconds) >= 1;
    if (hasUnitElapsed) {
      const value = Math.max(1, Math.round(seconds / unitSeconds));
      const label = `${value} ${unit}${value === 1 ? "" : "s"}`;
      return isFuture ? `in ${label}` : `${label} ago`;
    }
  }

  return "Just now";
}

function getPostDisplayDate(post = {}) {
  const rawDate = String(post.date || "").trim();
  const rawDateLower = rawDate.toLowerCase();
  const timestamp =
    parsePostTimestamp(rawDate) ||
    (rawDateLower === "just now" || !rawDate ? parsePostTimestamp(post.createdAt) : null);

  return timestamp ? formatExactPostDate(timestamp) : rawDate;
}

function hasRichHTML(value = "") {
  return /<\/?[a-z][\s\S]*>/i.test(String(value));
}

function sanitizeRichHref(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";

  let href = raw;
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(href)) {
    href = `https://${href}`;
  }

  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("./") ||
    href.startsWith("../")
  ) {
    return href;
  }

  try {
    const parsed = new URL(href, document.baseURI);
    const safeProtocols = new Set(["http:", "https:", "mailto:", "tel:"]);
    return safeProtocols.has(parsed.protocol) ? href : "";
  } catch {
    return "";
  }
}

function sanitizeRichHTML(value = "") {
  const source = String(value || "").trim();
  if (!source) return "";
  if (typeof document === "undefined") return escapeHTML(source);

  const allowedTags = new Set([
    "a",
    "blockquote",
    "br",
    "em",
    "h2",
    "h3",
    "li",
    "mark",
    "ol",
    "p",
    "strong",
    "ul",
  ]);
  const template = document.createElement("template");
  template.innerHTML = source;

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent || "");
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return document.createDocumentFragment();
    }

    const tag = node.tagName.toLowerCase();
    const children = document.createDocumentFragment();
    node.childNodes.forEach((child) => children.append(cleanNode(child)));

    const highlightStyle = node.getAttribute("style") || "";
    const hasHighlight =
      /background|background-color/i.test(highlightStyle) ||
      node.hasAttribute("bgcolor");

    if ((tag === "span" || tag === "font") && hasHighlight) {
      const mark = document.createElement("mark");
      mark.append(children);
      return mark;
    }

    const normalizedTag =
      tag === "b" ? "strong" : tag === "i" ? "em" : tag === "div" ? "p" : tag;

    if (!allowedTags.has(normalizedTag)) return children;

    const element = document.createElement(normalizedTag);
    const textAlign = String(
      node.style?.textAlign || node.getAttribute("align") || "",
    ).toLowerCase();

    if (
      ["blockquote", "h2", "h3", "p"].includes(normalizedTag) &&
      ["left", "center", "right"].includes(textAlign)
    ) {
      element.style.textAlign = textAlign;
    }

    if (normalizedTag === "a") {
      const href = sanitizeRichHref(node.getAttribute("href"));
      if (!href) return children;
      element.setAttribute("href", href);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    }

    element.append(children);
    return element;
  }

  const fragment = document.createDocumentFragment();
  template.content.childNodes.forEach((node) => {
    fragment.append(cleanNode(node));
  });

  const holder = document.createElement("div");
  holder.append(fragment);
  holder
    .querySelectorAll("p, h2, h3, blockquote, li")
    .forEach((element) => {
      if (!element.textContent.trim() && !element.querySelector("br")) {
        element.remove();
      }
    });

  const blockTags = new Set(["BLOCKQUOTE", "H2", "H3", "OL", "P", "UL"]);
  const inlineTags = new Set(["A", "BR", "EM", "MARK", "STRONG"]);
  const normalizedHolder = document.createElement("div");
  let paragraph = null;

  function flushParagraph() {
    if (!paragraph) return;
    if (paragraph.textContent.trim() || paragraph.querySelector("br")) {
      normalizedHolder.append(paragraph);
    }
    paragraph = null;
  }

  Array.from(holder.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent.trim()) return;
      if (!paragraph) paragraph = document.createElement("p");
      paragraph.append(node.cloneNode(true));
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (blockTags.has(node.tagName)) {
      flushParagraph();
      normalizedHolder.append(node.cloneNode(true));
      return;
    }

    if (inlineTags.has(node.tagName)) {
      if (!paragraph) paragraph = document.createElement("p");
      paragraph.append(node.cloneNode(true));
    }
  });

  flushParagraph();

  return normalizedHolder.innerHTML.trim();
}

function plainTextToRichHTML(value = "") {
  const body = String(value || "").trim();
  if (!body) return "";

  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3>${escapeHTML(block.slice(4))}</h3>`;
      }
      if (block.startsWith("## ")) {
        return `<h2>${escapeHTML(block.slice(3))}</h2>`;
      }

      const lines = block.split("\n").map((line) => line.trim());
      if (lines.length > 1 && lines.every((line) => line.startsWith("- "))) {
        return `<ul>${lines
          .map((line) => `<li>${escapeHTML(line.slice(2))}</li>`)
          .join("")}</ul>`;
      }

      return `<p>${escapeHTML(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function normalizeWhitespace(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function richContentToText(value = "") {
  const source = String(value || "").trim();
  if (!source) return "";

  if (typeof document !== "undefined" && hasRichHTML(source)) {
    const template = document.createElement("template");
    template.innerHTML = sanitizeRichHTML(source);
    return normalizeWhitespace(template.content.textContent || "");
  }

  return normalizeWhitespace(
    source
      .replace(/^#{2,3}\s+/gm, "")
      .replace(/^- /gm, "")
      .replace(/<[^>]*>/g, " "),
  );
}

function truncateText(value = "", maxLength = 240) {
  const text = normalizeWhitespace(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).trimEnd()}...`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getAdminToken() {
  return localStorage.getItem("kimiaAdminToken") || "";
}

function runWhenIdle(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, 1);
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      // Keep the default network message.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function applyLoadedPostData(loadedPosts = [], options = {}) {
  if (!Array.isArray(loadedPosts) || !loadedPosts.length) return;

  const { padHomeFeatured = false } = options;
  blogData = loadedPosts.map((post) => ({ ...post }));

  if (padHomeFeatured) {
    fallbackBlogData.forEach((post) => {
      if (blogData.filter((item) => item.status === "Published").length >= 7) return;
      if (blogData.some((item) => item.slug === post.slug)) return;
      blogData.push({ ...post });
    });
  }

  posts = blogData.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    status: post.status,
    image: post.image,
    supportingImages: Array.isArray(post.supportingImages) ? post.supportingImages : [],
    slug: post.slug,
    content: post.content,
    location: post.location,
    categoryColor: post.categoryColor,
  }));
}

async function loadInitialData() {
  const isAdminPage = document.body.classList.contains("page-admin");
  const requestVersion = postDataVersion;

  try {
    const payload = await apiRequest(isAdminPage ? "/posts" : "/posts?summary=1");
    if (isAdminPage && requestVersion !== postDataVersion) {
      return;
    }
    applyLoadedPostData(payload.posts, {
      padHomeFeatured: document.body.classList.contains("page-index"),
    });
  } catch (error) {
    console.warn("Using local fallback blog data:", error.message);
  }
}

async function loadAdminPosts() {
  const requestVersion = postDataVersion;

  try {
    const payload = await apiRequest("/posts");
    if (requestVersion !== postDataVersion) {
      return;
    }
    applyLoadedPostData(payload.posts);
  } catch (error) {
    console.warn("Unable to load admin posts:", error.message);
  }
}

function initPaintCursor() {
  const dot = document.getElementById("cursor-dot");
  const canvas = document.getElementById("paint-canvas");
  if (!dot) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (prefersReducedMotion || !supportsFinePointer || window.innerWidth < 768) {
    dot.hidden = true;
    if (canvas) canvas.hidden = true;
    return;
  }

  if (canvas) canvas.hidden = true;

  window.addEventListener("mousemove", (event) => {
    dot.style.left = event.clientX + "px";
    dot.style.top = event.clientY + "px";
    dot.classList.add("is-visible");
  }, { passive: true });

  window.addEventListener("mousedown", () => {
    dot.classList.add("clicking");
  });

  window.addEventListener("mouseup", () => dot.classList.remove("clicking"));

  const hoverSelector =
    "a, button, .btn, .card, .post-card, .does-item, .service-card, .dna-cell, .nav-item, .logout-btn, .login-btn, .filter-tab";
  const redSurfaceSelector =
    ".book-section, .featured-in, .cta-band, .partnership-cta, .page-contact .channels-card, .page-consulting .cons-hero";

  document.addEventListener("mousemove", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    dot.classList.toggle(
      "on-red-surface",
      Boolean(target?.closest(redSurfaceSelector)),
    );
  }, { passive: true });

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(hoverSelector)) dot.classList.add("hover");
  });
  document.addEventListener("mouseout", (event) => {
    const nextTarget =
      event.relatedTarget instanceof Element ? event.relatedTarget : null;
    if (!nextTarget || !nextTarget.closest(hoverSelector)) {
      dot.classList.remove("hover");
    }
  });
}

function initHeaderAndMenu() {
  const header = document.getElementById("header");
  if (header) {
    const syncHeaderState = () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    };
    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });
  }

  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (!menuBtn || !mobileNav) return;

  let closeBtn = mobileNav.querySelector("[data-mobile-nav-close]");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "mobile-nav-close";
    closeBtn.dataset.mobileNavClose = "true";
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.textContent = "X";
    mobileNav.prepend(closeBtn);
  }

  const setMobileMenuOpen = (isOpen) => {
    menuBtn.classList.toggle("open", isOpen);
    mobileNav.classList.toggle("open", isOpen);
    document.body.classList.toggle("mobile-nav-active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
  };

  menuBtn.setAttribute("aria-expanded", "false");
  mobileNav.setAttribute("aria-hidden", "true");

  menuBtn.addEventListener("click", () => {
    setMobileMenuOpen(!mobileNav.classList.contains("open"));
  });

  mobileNav.querySelectorAll("a, [data-mobile-nav-close]").forEach((item) => {
    item.addEventListener("click", () => setMobileMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("open")) {
      setMobileMenuOpen(false);
      menuBtn.focus();
    }
  });
}

function initFadeUp() {
  fadeUpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeUpObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  observeFadeUpNodes(document.querySelectorAll(".fade-up"));
}

function observeFadeUpNodes(nodes) {
  if (!fadeUpObserver) return;

  nodes.forEach((node) => {
    if (node.classList?.contains("fade-up")) {
      fadeUpObserver.observe(node);
    }

    node.querySelectorAll?.(".fade-up").forEach((child) => {
      fadeUpObserver.observe(child);
    });
  });
}

function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  function animateCount(element) {
    const target = parseFloat(element.dataset.count);
    const suffix = element.dataset.suffix || "";
    const isDecimal = String(target).includes(".");
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else element.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initGridSurfaces() {
  document.querySelectorAll(".gs-grid, .gs-spot").forEach((element) => element.remove());
  document.querySelectorAll(".grid-surface.gs-lit").forEach((section) => {
    section.classList.remove("gs-lit");
  });
}

function initCardTilt() {
  const tiltSelector = ".card, .post-card";
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!supportsFinePointer || prefersReducedMotion) return;

  let tiltRaf = null;
  let latestTiltEvent = null;

  document.addEventListener("mousemove", (event) => {
    latestTiltEvent = event;
    if (tiltRaf) return;

    tiltRaf = requestAnimationFrame(() => {
      tiltRaf = null;
      const card = latestTiltEvent.target.closest(tiltSelector);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (latestTiltEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (latestTiltEvent.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = "transform 0.1s ease, box-shadow 0.35s ease";
    });
  }, { passive: true });

  document.addEventListener("mouseout", (event) => {
    const card = event.target.closest(tiltSelector);
    const nextTarget =
      event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (!card || (nextTarget && card.contains(nextTarget))) return;

    card.style.transform = "";
    card.style.transition = "";
  });
}

function loadExternalScriptOnce(src, id) {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

function initLazySocialEmbeds() {
  const section = document.getElementById("social-feed");
  if (!section) return;

  const loadEmbeds = () => {
    loadExternalScriptOnce("https://www.instagram.com/embed.js", "instagram-embed-script");
    loadExternalScriptOnce("https://www.tiktok.com/embed.js", "tiktok-embed-script");
  };

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("load", loadEmbeds, { once: true });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadEmbeds();
    },
    { rootMargin: "700px 0px", threshold: 0.01 },
  );

  observer.observe(section);
}

function getDelayClass(index) {
  const delay = index % 3;
  if (delay === 1) return "delay-100";
  if (delay === 2) return "delay-200";
  return "";
}

function getCategoryColorClass(post) {
  return categoryColorClassMap[post.categoryColor] || categoryColorClassMap.sand;
}

function getFilteredBlogPosts(state) {
  const query = state.query.toLowerCase().trim();
  const category = state.category;

  return blogData.filter((post) => {
    if (post.status !== "Published") return false;

    const matchesCategory =
      category === "all" || post.category.toLowerCase() === category;
    const searchable = [
      post.title,
      post.category,
      post.location,
      post.excerpt,
      getPostDisplayDate(post),
    ]
      .join(" ")
      .toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function renderHomeBlogCard(post, index) {
  const delayClass = getDelayClass(index);
  const rowClass = index >= 3 ? "featured-row-offset" : "";
  return `
    <a href="/blog/${escapeHTML(post.slug)}" class="card fade-up ${delayClass} ${rowClass}" data-blog-id="${post.id}">
      <div class="card-img-container">
        <span class="card-label ${getCategoryColorClass(post)}">${escapeHTML(post.category)}</span>
        <img
          src="${escapeHTML(post.image)}"
          alt="${escapeHTML(post.title)}"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="card-content">
        <span class="diabla-eyebrow card-eyebrow">${escapeHTML(post.location)}</span>
        <h3 class="card-title">${escapeHTML(post.title)}</h3>
      </div>
    </a>
  `;
}

function renderArchiveBlogCard(post, index) {
  const delayClass = getDelayClass(index);
  const featuredClass = index === 0 ? "post-featured" : "";
  return `
    <a href="/blog/${escapeHTML(post.slug)}" class="post-card ${featuredClass} fade-up ${delayClass}" data-cat="${escapeHTML(post.category.toLowerCase())}" data-blog-id="${post.id}">
      <div class="post-card-img">
        <span class="post-cat-label ${getCategoryColorClass(post)}">${escapeHTML(post.category)}</span>
        <img
          src="${escapeHTML(post.image)}"
          alt="${escapeHTML(post.title)}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="post-card-body">
        <div class="post-meta">
          <span class="diabla-eyebrow card-eyebrow">${escapeHTML(post.location)}</span>
          <span class="post-date">${escapeHTML(getPostDisplayDate(post))}</span>
        </div>
        <h2 class="post-title">${escapeHTML(post.title)}</h2>
        <p class="post-excerpt">${escapeHTML(post.excerpt)}</p>
        <span class="post-read">
          Read More
          <svg class="icon"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </a>
  `;
}

function hydrateDynamicBlogNodes(nodes) {
  observeFadeUpNodes(nodes);

  requestAnimationFrame(() => {
    nodes.forEach((node) => {
      if (!node.classList?.contains("fade-up")) return;

      const rect = node.getBoundingClientRect();
      const isNearViewport =
        rect.top < window.innerHeight + 120 && rect.bottom > -120;

      if (isNearViewport) {
        node.classList.add("is-visible");
        fadeUpObserver?.unobserve(node);
      }
    });
  });
}

function updateBlogPaginationControls(grid, total) {
  const state = blogRenderState.get(grid);
  const loadMoreButton = document.getElementById("loadMorePosts");
  const noResults = document.getElementById("noResults");

  if (loadMoreButton) {
    const isArchiveGrid = grid.dataset.blogVariant === "archive";
    loadMoreButton.classList.toggle(
      "is-hidden",
      !isArchiveGrid || state.rendered >= total || total === 0,
    );
  }

  if (noResults) {
    noResults.classList.toggle("is-visible", total === 0);
  }
}

function renderBlogBatch(grid, reset = false) {
  const state = blogRenderState.get(grid);
  if (!state) return;

  const posts = getFilteredBlogPosts(state);
  if (reset) {
    grid.innerHTML = "";
    state.rendered = 0;
  }

  const nextPosts = posts.slice(state.rendered, state.rendered + state.batch);
  if (!nextPosts.length) {
    updateBlogPaginationControls(grid, posts.length);
    return;
  }

  const markup = nextPosts
    .map((post, batchIndex) => {
      const layoutIndex = state.rendered + batchIndex;
      return state.variant === "home"
        ? renderHomeBlogCard(post, layoutIndex)
        : renderArchiveBlogCard(post, layoutIndex);
    })
    .join("");

  const template = document.createElement("template");
  template.innerHTML = markup;
  const insertedNodes = Array.from(template.content.children);
  grid.append(template.content);
  state.rendered += nextPosts.length;

  hydrateDynamicBlogNodes(insertedNodes);
  updateBlogPaginationControls(grid, posts.length);

  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}

function getSinglePostSlug() {
  const querySlug = new URLSearchParams(window.location.search).get("slug");
  if (querySlug) return querySlug.trim();

  const parts = window.location.pathname.split("/").filter(Boolean);
  const slug = parts.at(-1) || "";
  return slug === "blog-post.html" ? "" : decodeURIComponent(slug);
}

function formatPostContent(content = "") {
  const body = String(content).trim();
  if (!body) return "<p>Full story details are coming soon.</p>";

  if (hasRichHTML(body)) {
    return sanitizeRichHTML(body) || "<p>Full story details are coming soon.</p>";
  }

  return plainTextToRichHTML(body);
}

function renderPostNavItem(post, direction) {
  const label = direction === "previous" ? "Previous Post" : "Next Post";
  const emptyTitle = direction === "previous" ? "No newer post" : "No older post";
  const arrow = direction === "previous" ? "&larr;" : "&rarr;";

  if (!post) {
    return `
      <div class="post-nav-link is-disabled">
        <span>${label}</span>
        <strong>${emptyTitle}</strong>
      </div>
    `;
  }

  return `
    <a class="post-nav-link post-nav-link-${direction}" href="/blog/${escapeHTML(post.slug)}">
      <span>${label}</span>
      <strong>${escapeHTML(post.title)}</strong>
      <em>${arrow}</em>
    </a>
  `;
}

function renderApprovedComments(commentsList = []) {
  const target = document.getElementById("commentsList");
  const count = document.getElementById("commentsCount");
  if (!target) return;

  if (count) {
    count.textContent = `${commentsList.length} ${commentsList.length === 1 ? "Comment" : "Comments"}`;
  }

  if (!commentsList.length) {
    target.innerHTML = `
      <div class="comment-empty-state">
        No comments yet. Be the first to leave a reply.
      </div>
    `;
    return;
  }

  target.innerHTML = commentsList
    .map(
      (comment) => `
        <article class="comment-card">
          <div class="comment-card-top">
            <strong>${escapeHTML(comment.author)}</strong>
            <span>${escapeHTML(comment.date || "")}</span>
          </div>
          <p>${escapeHTML(comment.text)}</p>
          ${
            comment.replies?.length
              ? comment.replies
                  .map(
                    (reply) => `
                      <div class="comment-reply">
                        <strong>${escapeHTML(reply.author)}</strong>
                        <p>${escapeHTML(reply.text)}</p>
                      </div>
                    `,
                  )
                  .join("")
              : ""
          }
        </article>
      `,
    )
    .join("");
}

function renderSupportingPhotoGallery(images = [], title = "", mainImage = "") {
  const gallery = document.getElementById("singlePostGallery");
  if (!gallery) return 0;

  const featuredImage = String(mainImage || "").trim();

  const supportingImages = Array.isArray(images)
    ? [
        ...new Set(
          images
            .map((image) => String(image || "").trim())
            .filter((image) => image && image !== featuredImage),
        ),
      ]
    : [];

  if (!supportingImages.length) {
    gallery.classList.remove("is-visible");
    gallery.innerHTML = "";
    return 0;
  }

  gallery.classList.add("is-visible");
  gallery.innerHTML = `
    <div class="single-post-gallery-grid">
      ${supportingImages
        .map(
          (image, index) => `
            <figure class="single-post-gallery-item">
              <img
                src="${escapeHTML(image)}"
                alt="${escapeHTML(`${title || "Blog post"} supporting photo ${index + 1}`)}"
                loading="lazy"
                decoding="async"
              />
            </figure>
          `,
        )
        .join("")}
    </div>
  `;
  return supportingImages.length;
}

function renderSinglePostPage(payload) {
  const { post, previous, next, comments: commentsList = [] } = payload;
  const title = document.getElementById("singlePostTitle");
  const kicker = document.getElementById("singlePostKicker");
  const meta = document.getElementById("singlePostMeta");
  const image = document.getElementById("singlePostImage");
  const coverImage = document.getElementById("singlePostCoverImage");
  const content = document.getElementById("singlePostContent");
  const nav = document.getElementById("singlePostNav");
  const form = document.getElementById("commentForm");
  const media = document.querySelector(".single-post-media");
  const mainImage = post.image || BLOG_DEFAULT_IMAGE;

  document.title = `${post.title} | Kimia's Kravings`;
  if (title) title.textContent = post.title;
  if (kicker) kicker.textContent = post.category;
  if (meta) {
    meta.innerHTML = `
      <span>Posted by Kimia Kalbasi</span>
      <span>on ${escapeHTML(getPostDisplayDate(post))}</span>
    `;
  }
  if (image) {
    image.src = mainImage;
    image.alt = post.title;
  }
  if (coverImage) {
    coverImage.src = mainImage;
    coverImage.alt = "";
  }
  if (content) {
    content.innerHTML = formatPostContent(post.content || post.excerpt);
  }
  const supportingImageCount = renderSupportingPhotoGallery(
    post.supportingImages,
    post.title,
    mainImage,
  );
  const hasSupportingImages = supportingImageCount > 0;
  if (media) {
    media.classList.toggle("has-supporting-photos", hasSupportingImages);
  }
  if (image) {
    image.classList.toggle("is-hidden", hasSupportingImages);
    image.setAttribute("aria-hidden", hasSupportingImages ? "true" : "false");
  }
  if (nav) {
    nav.innerHTML = `
      ${renderPostNavItem(previous, "previous")}
      ${renderPostNavItem(next, "next")}
    `;
  }
  if (form) {
    form.dataset.slug = post.slug;
  }

  renderApprovedComments(commentsList);
}

function renderSinglePostError(message) {
  const page = document.querySelector("[data-post-page]");
  if (!page) return;

  page.innerHTML = `
    <section class="single-post-hero grid-surface">
      <div class="container">
        <a href="/blog" class="post-back-link">&larr; Back to Blog</a>
        <div class="diabla-eyebrow">Post Not Found</div>
        <h1 class="single-post-title">${escapeHTML(message)}</h1>
      </div>
    </section>
  `;
  initGridSurfaces();
}

async function handleCommentSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = document.getElementById("commentStatus");
  const submitButton = form.querySelector("button[type='submit']");
  const slug = form.dataset.slug || getSinglePostSlug();
  const author = document.getElementById("commentName").value.trim();
  const email = document.getElementById("commentEmail").value.trim();
  const text = document.getElementById("commentText").value.trim();

  if (!author || !email || !text) {
    if (status) {
      status.textContent = "Please fill in your name, email, and comment.";
      status.className = "comment-status is-error";
    }
    return;
  }

  try {
    if (submitButton) submitButton.disabled = true;
    if (status) {
      status.textContent = "Submitting your comment...";
      status.className = "comment-status";
    }

    await apiRequest(`/posts/${slug}/comments`, {
      method: "POST",
      body: JSON.stringify({ author, email, text }),
    });

    form.reset();
    if (status) {
      status.textContent = "Thanks. Your comment is waiting for moderation.";
      status.className = "comment-status is-success";
    }
  } catch (error) {
    if (status) {
      status.textContent = error.message || "Unable to submit comment.";
      status.className = "comment-status is-error";
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

async function initSinglePostPage() {
  if (!document.querySelector("[data-post-page]")) return;

  const slug = getSinglePostSlug();
  const form = document.getElementById("commentForm");
  if (form) form.addEventListener("submit", handleCommentSubmit);

  if (!slug) {
    renderSinglePostError("We could not find that post.");
    return;
  }

  try {
    const payload = await apiRequest(`/posts/${slug}`);
    renderSinglePostPage(payload);
  } catch (error) {
    renderSinglePostError(error.message || "We could not find that post.");
  }
}

function resetArchiveBlogGrid() {
  const grid = document.querySelector('[data-blog-grid][data-blog-variant="archive"]');
  if (!grid) return;
  renderBlogBatch(grid, true);
}

function resetAllBlogGrids() {
  document.querySelectorAll("[data-blog-grid]").forEach((grid) => {
    renderBlogBatch(grid, true);
  });
}

function initBlogPagination() {
  document.querySelectorAll("[data-blog-grid]").forEach((grid) => {
    const batch = Number(grid.dataset.blogBatch) || BLOG_BATCH_SIZE;
    blogRenderState.set(grid, {
      batch,
      category: "all",
      query: "",
      rendered: 0,
      variant: grid.dataset.blogVariant || "archive",
    });
    renderBlogBatch(grid, true);
  });

  const loadMoreButton = document.getElementById("loadMorePosts");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      const grid = document.querySelector('[data-blog-grid][data-blog-variant="archive"]');
      if (grid) renderBlogBatch(grid);
    });
  }
}

function initBlogFilters() {
  const archiveGrid = document.querySelector('[data-blog-grid][data-blog-variant="archive"]');
  if (!archiveGrid) return;

  const state = blogRenderState.get(archiveGrid);
  const tabs = document.querySelectorAll(".cat-tab");
  const searchInput = document.getElementById("searchInput");
  if (!state) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      state.category = tab.dataset.cat || "all";
      resetArchiveBlogGrid();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      resetArchiveBlogGrid();
    });
  }
}

function initGsapEnhancements() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof SplitType === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const textTargets = document.querySelectorAll(
    ".gsap-heading, .hero-title, .featured-section h2, .about-section h2, .book-title",
  );

  textTargets.forEach((element) => {
    if (element.dataset.splitAnimated === "true") return;
    element.dataset.splitAnimated = "true";

    new SplitType(element, { types: "words" });
    const words = element.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: "115%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", dispatchFormPayload);
}

function isValidEmailAddress(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function setNewsletterStatus(element, message = "", type = "") {
  if (!element) return;
  element.textContent = message;
  element.className = `newsletter-status${type ? ` is-${type}` : ""}`;
}

function openNewsletterModal() {
  const modal = document.getElementById("newsletterModal");
  if (!modal) return false;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector("[data-newsletter-modal-close]")?.focus();
  return true;
}

function closeNewsletterModal() {
  const modal = document.getElementById("newsletterModal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function initNewsletterModal() {
  const modal = document.getElementById("newsletterModal");
  if (!modal) return;

  modal.querySelectorAll("[data-newsletter-modal-close]").forEach((button) => {
    button.addEventListener("click", closeNewsletterModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeNewsletterModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeNewsletterModal();
    }
  });
}

function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById("newsletterStatus");
  const defaultButtonText = button?.textContent || "Subscribe";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = String(input?.value || "").trim();
    if (!isValidEmailAddress(email)) {
      input?.setAttribute("aria-invalid", "true");
      setNewsletterStatus(status, "Enter a valid email address.", "error");
      input?.focus();
      return;
    }

    input?.setAttribute("aria-invalid", "false");
    setNewsletterStatus(status, "Adding you to the list...", "");
    if (button) {
      button.disabled = true;
      button.textContent = "Joining...";
    }

    try {
      const payload = await apiRequest("/newsletter", {
        method: "POST",
        body: JSON.stringify({ email, source: "blog" }),
      });
      form.reset();
      setNewsletterStatus(status, "", "");
      if (!openNewsletterModal()) {
        setNewsletterStatus(status, payload.message || "You are on the list.", "success");
      }
    } catch (error) {
      setNewsletterStatus(status, error.message || "Subscription failed.", "error");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = defaultButtonText;
      }
    }
  });
}

let savedEditorRange = null;

function getPostContentEditor() {
  return document.getElementById("postContentEditor");
}

function getEditorBlockSelect() {
  return document.querySelector("[data-editor-block]");
}

function syncRichEditorToTextarea(options = {}) {
  const editor = getPostContentEditor();
  const input = document.getElementById("postContentInput");
  if (!editor || !input) return "";

  const sanitized = sanitizeRichHTML(editor.innerHTML);
  input.value = sanitized;

  if (options.cleanEditor) {
    editor.innerHTML = sanitized;
  }

  return sanitized;
}

function setRichEditorContent(value = "") {
  const editor = getPostContentEditor();
  const input = document.getElementById("postContentInput");
  if (!editor || !input) return;

  const source = String(value || "").trim();
  const content = hasRichHTML(source)
    ? sanitizeRichHTML(source)
    : plainTextToRichHTML(source);

  editor.innerHTML = content;
  input.value = content;
  savedEditorRange = null;
  updateEditorToolbarState();
}

function normalizeEditorLinks(editor) {
  editor.querySelectorAll("a[href]").forEach((link) => {
    const href = sanitizeRichHref(link.getAttribute("href"));
    if (!href) {
      const text = document.createTextNode(link.textContent || "");
      link.replaceWith(text);
      return;
    }

    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function ensureEditorSelection(editor) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount && editor.contains(selection.anchorNode)) {
    return;
  }
  if (!selection) return;

  if (savedEditorRange && editor.contains(savedEditorRange.commonAncestorContainer)) {
    selection.removeAllRanges();
    selection.addRange(savedEditorRange);
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(editor);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function saveEditorSelection() {
  const editor = getPostContentEditor();
  const selection = window.getSelection();
  if (!editor || !selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (editor.contains(range.commonAncestorContainer)) {
    savedEditorRange = range.cloneRange();
  }
}

function insertEditorHTML(html) {
  const editor = getPostContentEditor();
  if (!editor) return;
  ensureEditorSelection(editor);
  document.execCommand("insertHTML", false, html);
  saveEditorSelection();
}

function getCurrentEditorBlockTag() {
  const editor = getPostContentEditor();
  const selection = window.getSelection();
  if (!editor) return "p";

  let node = null;
  if (selection && selection.rangeCount && editor.contains(selection.anchorNode)) {
    node = selection.anchorNode;
  } else if (savedEditorRange && editor.contains(savedEditorRange.commonAncestorContainer)) {
    node = savedEditorRange.commonAncestorContainer;
  }

  if (!node) return "p";
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;

  while (node && node !== editor) {
    const tag = node.tagName?.toLowerCase();
    if (["blockquote", "h2", "h3", "p"].includes(tag)) return tag;
    node = node.parentElement;
  }

  return "p";
}

function updateEditorToolbarState() {
  const editor = getPostContentEditor();
  if (!editor) return;

  const isEditorFocused =
    document.activeElement === editor || editor.contains(document.activeElement);
  const blockTag = getCurrentEditorBlockTag();
  const blockSelect = getEditorBlockSelect();

  if (blockSelect) {
    blockSelect.value = ["blockquote", "h2", "h3", "p"].includes(blockTag)
      ? blockTag
      : "p";
  }

  const stateCommands = {
    bold: "bold",
    italic: "italic",
    ul: "insertUnorderedList",
    ol: "insertOrderedList",
    "align-left": "justifyLeft",
    "align-center": "justifyCenter",
    "align-right": "justifyRight",
  };

  document.querySelectorAll("[data-editor-command]").forEach((button) => {
    const command = button.dataset.editorCommand;
    const queryCommand = stateCommands[command];

    if (command === "blockquote") {
      button.classList.toggle("is-active", blockTag === "blockquote");
      return;
    }

    if (!queryCommand || !isEditorFocused) {
      button.classList.remove("is-active");
      return;
    }

    try {
      button.classList.toggle("is-active", document.queryCommandState(queryCommand));
    } catch {
      button.classList.remove("is-active");
    }
  });
}

function applyEditorBlockStyle(blockTag) {
  const editor = getPostContentEditor();
  if (!editor) return;

  editor.focus();
  ensureEditorSelection(editor);
  document.execCommand("formatBlock", false, blockTag);
  syncRichEditorToTextarea();
  saveEditorSelection();
  updateEditorToolbarState();
}

function applyEditorCommand(command) {
  const editor = getPostContentEditor();
  if (!editor) return;

  editor.focus();
  ensureEditorSelection(editor);

  if (command === "bold") {
    document.execCommand("bold");
  }

  if (command === "italic") {
    document.execCommand("italic");
  }

  if (command === "blockquote") {
    document.execCommand("formatBlock", false, "blockquote");
  }

  if (command === "highlight") {
    const didHighlight = document.execCommand("hiliteColor", false, "#fff3a6");
    if (!didHighlight) {
      document.execCommand("backColor", false, "#fff3a6");
    }
  }

  if (command === "link") {
    const selection = window.getSelection();
    const selectedText = normalizeWhitespace(selection?.toString() || "");
    const rawHref = prompt("Paste the link URL");
    const href = sanitizeRichHref(rawHref);

    if (!href) {
      showToast("Use a valid http, https, mailto, tel, or relative link.", "error");
      return;
    }

    if (selectedText) {
      document.execCommand("createLink", false, href);
    } else {
      const label = prompt("Link text") || href;
      insertEditorHTML(
        `<a href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`,
      );
    }

    normalizeEditorLinks(editor);
  }

  if (command === "unlink") {
    document.execCommand("unlink");
  }

  if (command === "ul") {
    document.execCommand("insertUnorderedList");
  }

  if (command === "ol") {
    document.execCommand("insertOrderedList");
  }

  if (command === "align-left") {
    document.execCommand("justifyLeft");
  }

  if (command === "align-center") {
    document.execCommand("justifyCenter");
  }

  if (command === "align-right") {
    document.execCommand("justifyRight");
  }

  if (command === "clear") {
    document.execCommand("removeFormat");
  }

  if (command === "keyboard") {
    editor.focus();
  }

  syncRichEditorToTextarea();
  saveEditorSelection();
  updateEditorToolbarState();
}

function initRichTextEditor() {
  const editor = getPostContentEditor();
  if (!editor || editor.dataset.editorReady === "true") return;
  editor.dataset.editorReady = "true";

  try {
    document.execCommand("styleWithCSS", false, false);
  } catch {
    // Browsers that ignore styleWithCSS still support the core editor commands.
  }

  const blockSelect = getEditorBlockSelect();
  if (blockSelect) {
    blockSelect.addEventListener("mousedown", saveEditorSelection);
    blockSelect.addEventListener("change", () => {
      applyEditorBlockStyle(blockSelect.value || "p");
    });
  }

  document.querySelectorAll("[data-editor-command]").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      saveEditorSelection();
    });
    button.addEventListener("click", () => {
      applyEditorCommand(button.dataset.editorCommand);
    });
  });

  editor.addEventListener("input", () => {
    syncRichEditorToTextarea();
    saveEditorSelection();
  });
  editor.addEventListener("blur", () => {
    syncRichEditorToTextarea({ cleanEditor: true });
    updateEditorToolbarState();
  });
  editor.addEventListener("mouseup", () => {
    saveEditorSelection();
    updateEditorToolbarState();
  });
  editor.addEventListener("keyup", () => {
    saveEditorSelection();
    updateEditorToolbarState();
  });

  editor.addEventListener("keydown", (event) => {
    const commandKey = event.metaKey || event.ctrlKey;
    if (!commandKey) return;

    const key = event.key.toLowerCase();
    if (key === "b" || key === "i" || key === "k") {
      event.preventDefault();
      applyEditorCommand(key === "b" ? "bold" : key === "i" ? "italic" : "link");
    }
  });

  editor.addEventListener("paste", (event) => {
    event.preventDefault();
    const clipboard = event.clipboardData;
    const html = clipboard?.getData("text/html") || "";
    const text = clipboard?.getData("text/plain") || "";
    const cleanHTML = html ? sanitizeRichHTML(html) : plainTextToRichHTML(text);

    insertEditorHTML(cleanHTML || escapeHTML(text));
    syncRichEditorToTextarea();
    saveEditorSelection();
    updateEditorToolbarState();
  });
}

function initAdminBindings() {
  if (!document.body.classList.contains("page-admin")) return;

  initRichTextEditor();

  const passInput = document.getElementById("passInput");
  if (passInput) {
    passInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") attemptLogin();
    });
  }

  const postImageInput = document.getElementById("postImageInput");
  if (postImageInput) {
    postImageInput.addEventListener("input", () => {
      updatePostImagePreview(postImageInput.value.trim());
    });
  }

  document.addEventListener("click", (event) => {
    const panelTrigger = event.target.closest("[data-panel]");
    if (panelTrigger) {
      switchPanel(panelTrigger.dataset.panel, panelTrigger);
      if (getAdminToken()) refreshAdminData({ notify: false });
      return;
    }

    const postFilter = event.target.closest("[data-post-filter]");
    if (postFilter) {
      filterPosts(postFilter.dataset.postFilter, postFilter);
      return;
    }

    const commentFilter = event.target.closest("[data-comment-filter]");
    if (commentFilter) {
      filterComments(commentFilter.dataset.commentFilter, commentFilter);
      return;
    }

    const messageItem = event.target.closest("[data-message-id]");
    if (messageItem) {
      inspectMessage(Number(messageItem.dataset.messageId), messageItem);
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    const id = Number(actionTarget.dataset.id);

    if (action === "login") attemptLogin();
    if (action === "logout") triggerLogout();
    if (action === "open-post-modal") openPostModal();
    if (action === "close-post-modal") closePostModal();
    if (action === "upload-post-image") uploadPostImage();
    if (action === "upload-supporting-images") uploadSupportingImages();
    if (action === "remove-supporting-image") {
      removeSupportingImage(Number(actionTarget.dataset.index));
    }
    if (action === "save-post") savePostData();
    if (action === "edit-post") editPost(id);
    if (action === "delete-post") deletePost(id);
    if (action === "approve-comment") approveComment(id);
    if (action === "toggle-comment-reply") toggleCommentReply(id);
    if (action === "delete-comment") deleteComment(id);
    if (action === "post-comment-reply") postCommentReply(id);
    if (action === "approve-consulting") approveConsulting(id);
    if (action === "archive-message") {
      showToast("Archive system pipeline integration pending.");
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && getAdminToken()) {
      refreshAdminData({ notify: true });
    }
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  const initialDataPromise = loadInitialData();

  initPaintCursor();
  initHeaderAndMenu();
  initFadeUp();
  initGridSurfaces();
  initLazySocialEmbeds();
  initContactForm();
  initNewsletterModal();
  initNewsletterForm();
  initAdminBindings();

  runWhenIdle(() => {
    initCountUp();
    initCardTilt();
  });

  await initialDataPromise;
  initBlogPagination();
  await initSinglePostPage();
  initBlogFilters();
  runWhenIdle(initGsapEnhancements, 1800);
});

async function dispatchFormPayload(event) {
  event.preventDefault();

  // Collect data parameters
  const name = document.getElementById("formName").value.trim();
  const email = document.getElementById("formEmail").value.trim();
  const message = document.getElementById("formMessage").value.trim();

  if (!name || !email || !message) {
    triggerSystemToast(
      "Validation Failure: Missing required fields.",
      "error",
    );
    return;
  }

  try {
    await apiRequest("/contacts", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
    });
    document.getElementById("contactForm").reset();
    triggerSystemToast(
      "Transmission Confirmed. Payload routed to Admin Queue.",
      "success",
    );
  } catch (error) {
    triggerSystemToast(error.message || "Transmission failed.", "error");
  }
}

function triggerSystemToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent =
    (type === "success" ? "✓ " : type === "error" ? "✕ " : "") + msg;
  toast.className = "toast " + type + " show";

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// ── DATABASE CONTEXT DATA MATRIX ──
let posts = blogData.map((post) => ({
  id: post.id,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content || post.excerpt,
  category: post.category,
  date: post.date,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  status: post.status,
  image: post.image,
  slug: post.slug,
  supportingImages: Array.isArray(post.supportingImages) ? post.supportingImages : [],
}));

let comments = [];
let consultingRequests = [];
let messages = [];
let subscribers = [];
let activities = [];
let adminRefreshTimer = null;
let adminRefreshInFlight = null;

// ── APPLICATION ENTRY VALIDATION CONTEXT ──
async function attemptLogin() {
  const input = document.getElementById("passInput");
  const rawToken = input.value.trim();

  try {
    await apiRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ token: rawToken }),
    });
    localStorage.setItem("kimiaAdminToken", rawToken);
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("loginError").classList.remove("show");
    await initializeApplicationCore();
    showToast("System Authorization Acknowledged.", "success");
  } catch (error) {
    const err = document.getElementById("loginError");
    err.classList.add("show");
    input.focus();
    input.select();
    showToast(error.message || "Authorization Denied.", "error");
  }
}

function triggerLogout() {
  stopAdminLiveRefresh();
  localStorage.removeItem("kimiaAdminToken");
  document.getElementById("passInput").value = "";
  document.getElementById("loginError").classList.remove("show");
  document.getElementById("app").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  showToast("Session Terminated Safely.");
}

function idsFor(items = []) {
  return new Set(items.map((item) => item.id));
}

function pendingCommentCount(items = comments) {
  return items.filter((comment) => comment.pending).length;
}

function activeCommentFilter() {
  return (
    document.querySelector("[data-comment-filter].active")?.dataset.commentFilter ||
    "all"
  );
}

function renderAdminRealtimePanels() {
  updateBadges();
  renderDashboardActivities();
  renderComments(activeCommentFilter());
  renderMessagesList();
  renderSubscribersTable();
}

async function loadAdminMessages() {
  try {
    const payload = await apiRequest("/admin/messages", {
      headers: { "x-admin-token": getAdminToken() },
    });
    if (Array.isArray(payload.messages)) {
      messages = payload.messages;
    }
  } catch (error) {
    console.warn("Unable to load admin messages:", error.message);
    messages = [];
  }
}

async function loadAdminComments() {
  try {
    const payload = await apiRequest("/admin/comments", {
      headers: { "x-admin-token": getAdminToken() },
    });
    if (Array.isArray(payload.comments)) {
      comments = payload.comments;
    }
  } catch (error) {
    console.warn("Unable to load admin comments:", error.message);
    comments = [];
  }
}

async function loadAdminSubscribers() {
  try {
    const payload = await apiRequest("/admin/newsletter", {
      headers: { "x-admin-token": getAdminToken() },
    });
    if (Array.isArray(payload.subscribers)) {
      subscribers = payload.subscribers;
    }
  } catch (error) {
    console.warn("Unable to load newsletter subscribers:", error.message);
    subscribers = [];
  }
}

// ── ENGINE INITIALIZATION PROCEDURES ──
async function initializeApplicationCore() {
  await Promise.all([loadAdminPosts(), refreshAdminData({ notify: false })]);
  renderBlogPosts("all");
  renderConsultingTable();
  startAdminLiveRefresh();
}

async function refreshAdminData(options = {}) {
  if (adminRefreshInFlight) return adminRefreshInFlight;

  const { notify = true } = options;
  const previousPendingCommentIds = idsFor(comments.filter((comment) => comment.pending));
  const previousSubscriberIds = idsFor(subscribers);

  adminRefreshInFlight = (async () => {
    await Promise.all([loadAdminMessages(), loadAdminComments(), loadAdminSubscribers()]);
    renderAdminRealtimePanels();

    if (notify) {
      const newPendingComments = comments.filter(
        (comment) => comment.pending && !previousPendingCommentIds.has(comment.id),
      );
      const newSubscribers = subscribers.filter(
        (subscriber) => !previousSubscriberIds.has(subscriber.id),
      );

      if (newPendingComments.length && newSubscribers.length) {
        showToast(
          `${newPendingComments.length} new comment${newPendingComments.length === 1 ? "" : "s"} and ${newSubscribers.length} new subscriber${newSubscribers.length === 1 ? "" : "s"} received.`,
        );
      } else if (newPendingComments.length) {
        showToast(
          `${newPendingComments.length} new comment${newPendingComments.length === 1 ? "" : "s"} waiting for moderation.`,
        );
      } else if (newSubscribers.length) {
        showToast(
          `${newSubscribers.length} new newsletter subscriber${newSubscribers.length === 1 ? "" : "s"} added.`,
        );
      }
    }
  })();

  try {
    await adminRefreshInFlight;
  } finally {
    adminRefreshInFlight = null;
  }
}

function startAdminLiveRefresh() {
  stopAdminLiveRefresh();
  adminRefreshTimer = window.setInterval(() => {
    if (document.hidden || !getAdminToken()) return;
    refreshAdminData({ notify: true });
  }, ADMIN_REFRESH_INTERVAL_MS);
}

function stopAdminLiveRefresh() {
  if (!adminRefreshTimer) return;
  window.clearInterval(adminRefreshTimer);
  adminRefreshTimer = null;
}

function updateBadges() {
  const pComm = pendingCommentCount();
  const pConsult = consultingRequests.filter(
    (r) => r.status === "Pending Approval",
  ).length;
  const uMsg = messages.filter((m) => m.unread).length;

  document.getElementById("badge-comments").textContent = pComm;
  document.getElementById("badge-consulting").textContent = pConsult;
  document.getElementById("badge-messages").textContent = uMsg;
  const subscriberBadge = document.getElementById("badge-subscribers");
  if (subscriberBadge) subscriberBadge.textContent = subscribers.length;

  // Sync parameters to dashboard analytical summaries
  document.getElementById("stat-publishedPosts").textContent = posts.filter(
    (post) => post.status === "Published",
  ).length;
  document.getElementById("stat-unreadMsg").textContent = uMsg;
  document.getElementById("stat-pendingComm").textContent = pComm;
  document.getElementById("stat-bookings").textContent =
    consultingRequests.length;
  const subscriberStat = document.getElementById("stat-subscribers");
  if (subscriberStat) subscriberStat.textContent = subscribers.length;
  activities = buildRealActivities();
}

// ── ROUTING MATRIX INTERFACES ──
function switchPanel(panelId, element) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((i) => i.classList.remove("active"));

  document.getElementById("panel-" + panelId).classList.add("active");
  element.classList.add("active");

  // Compute specialized display properties
  const titleMap = {
    dashboard: "System <em>Overview</em>",
    blog: "Blog <em>Manager Engine</em>",
    comments: "Commentary <em>Moderation Queue</em>",
    consulting: "Consulting <em>Operations Hub</em>",
    messages: "Inbound <em>Message Vault</em>",
    subscribers: "Newsletter <em>Subscribers</em>",
  };
  document.getElementById("panelTitle").innerHTML =
    titleMap[panelId] || "Admin Matrix";
}

// ── CORE COMPONENT RENDER MECHANICS ──
function renderDashboardActivities() {
  const target = document.getElementById("dashboardActivityLog");
  if (!target) return;

  if (!activities.length) {
    target.innerHTML = `
      <tr>
        <td colspan="3" class="admin-table-desc">No real activity has been recorded yet.</td>
      </tr>
    `;
    return;
  }

  target.innerHTML = activities
    .map(
      (a) => `
  <tr>
    <td class="admin-activity-type">${a.type}</td>
    <td class="admin-table-desc">${a.desc}</td>
    <td class="admin-table-muted-small">${a.time}</td>
  </tr>
`,
    )
    .join("");
}

function buildRealActivities() {
  const recentPosts = posts.slice(0, 3).map((post) => ({
    type: post.status === "Published" ? "Published Post" : "Draft Post",
    desc: post.title,
    time: getPostDisplayDate(post) || "No date",
  }));

  const recentMessages = messages.slice(0, 3).map((message) => ({
    type: message.unread ? "Unread Message" : "Message",
    desc: `${message.sender}: ${message.subject}`,
    time: message.date || "No timestamp",
  }));

  const recentSubscribers = subscribers.slice(0, 3).map((subscriber) => ({
    type: "Newsletter Subscriber",
    desc: subscriber.email,
    time: subscriber.date || "No timestamp",
  }));

  const recentComments = comments.slice(0, 3).map((comment) => ({
    type: comment.pending ? "Pending Comment" : "Approved Comment",
    desc: `${comment.author} on ${comment.postTitle || "a post"}`,
    time: comment.date || "No timestamp",
  }));

  return [
    ...recentComments,
    ...recentSubscribers,
    ...recentMessages,
    ...recentPosts,
  ].slice(0, 6);
}

function renderBlogPosts(filter = "all") {
  const body = document.getElementById("postsTableBody");
  if (!body) return;

  let dataset = posts;
  if (filter !== "all") {
    dataset = posts.filter(
      (p) => p.status.toLowerCase() === filter.toLowerCase(),
    );
  }

  body.innerHTML = dataset
    .map((p) => {
      let badgeClass = "status-published";
      if (p.status === "Draft") badgeClass = "status-draft";
      if (p.status === "Scheduled") badgeClass = "status-scheduled";
      const fullSnippet = richContentToText(p.excerpt || p.content || "");
      const snippet = truncateText(fullSnippet, 260) || "No snippet available.";

      return `
    <tr>
      <td class="post-title-cell">
        <div class="admin-post-title">${escapeHTML(p.title)}</div>
        <p class="admin-post-excerpt" title="${escapeHTML(fullSnippet)}">${escapeHTML(snippet)}</p>
      </td>
      <td class="admin-table-category">${escapeHTML(p.category)}</td>
      <td class="admin-table-muted-medium">${escapeHTML(getPostDisplayDate(p))}</td>
      <td><span class="status-badge ${badgeClass}">${escapeHTML(p.status)}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-outline btn-sm" data-action="edit-post" data-id="${p.id}">Edit</button>
          <button class="btn btn-danger btn-sm" data-action="delete-post" data-id="${p.id}">Delete</button>
        </div>
      </td>
    </tr>
  `;
    })
    .join("");
}

function filterPosts(type, btn) {
  btn.parentNode
    .querySelectorAll(".filter-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  renderBlogPosts(type);
}

// ── POST OPERATIONS & MODALS ──
function openPostModal(editId = null) {
  const modal = document.getElementById("postModal");
  modal.classList.add("open");

  if (editId) {
    const p = posts.find((x) => x.id === editId);
    if (!p) {
      modal.classList.remove("open");
      showToast("Post record not found.", "error");
      return;
    }
    document.getElementById("modalActionTitle").textContent =
      "Modify Operational Log Entry";
    document.getElementById("editPostId").value = p.id;
    document.getElementById("postTitleInput").value = p.title;
    document.getElementById("postCategoryInput").value = p.category;
    document.getElementById("postStatusSelect").value = p.status;
    setRichEditorContent(p.content || p.excerpt);
    document.getElementById("postImageInput").value = p.image || "";
    document.getElementById("postImageUploadInput").value = "";
    document.getElementById("postSupportingImagesUploadInput").value = "";
    updatePostImagePreview(p.image || "");
    setSupportingImages(p.supportingImages || []);
    resetPostUploadStatus("postImageUploadStatus");
    resetPostUploadStatus("supportingImagesUploadStatus");
  } else {
    document.getElementById("modalActionTitle").textContent =
      "Construct New Blog Post";
    document.getElementById("editPostId").value = "";
    document.getElementById("postTitleInput").value = "";
    document.getElementById("postCategoryInput").value = "";
    document.getElementById("postStatusSelect").value = "Published";
    setRichEditorContent("");
    document.getElementById("postImageInput").value = "";
    document.getElementById("postImageUploadInput").value = "";
    document.getElementById("postSupportingImagesUploadInput").value = "";
    updatePostImagePreview("");
    setSupportingImages([]);
    resetPostUploadStatus("postImageUploadStatus");
    resetPostUploadStatus("supportingImagesUploadStatus");
  }
}

function editPost(id) {
  openPostModal(id);
}

function closePostModal() {
  document.getElementById("postModal").classList.remove("open");
}

function getCategoryColorFromName(category) {
  const normalized = category.toLowerCase();
  if (normalized.includes("travel") || normalized.includes("drink")) return "pink";
  if (normalized.includes("lifestyle") || normalized.includes("culture")) return "olive";
  return "sand";
}

function updatePostImagePreview(url) {
  const preview = document.getElementById("postImagePreview");
  if (!preview) return;

  if (!url) {
    preview.classList.remove("is-visible");
    preview.removeAttribute("src");
    return;
  }

  preview.src = url;
  preview.classList.add("is-visible");
}

function getSupportingImages() {
  const input = document.getElementById("postSupportingImagesInput");
  if (!input) return [];

  try {
    const parsed = JSON.parse(input.value || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((image) => String(image || "").trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function setSupportingImages(images = []) {
  const input = document.getElementById("postSupportingImagesInput");
  const normalized = [
    ...new Set(images.map((image) => String(image || "").trim()).filter(Boolean)),
  ];

  if (input) input.value = JSON.stringify(normalized);
  renderSupportingImagesPreview(normalized);
}

function renderSupportingImagesPreview(images = getSupportingImages()) {
  const preview = document.getElementById("supportingImagesPreview");
  if (!preview) return;

  if (!images.length) {
    preview.innerHTML = `<div class="supporting-images-empty">No supporting photos added.</div>`;
    return;
  }

  preview.innerHTML = images
    .map(
      (image, index) => `
        <div class="supporting-image-thumb">
          <img src="${escapeHTML(image)}" alt="Supporting photo ${index + 1}" />
          <button
            type="button"
            class="supporting-image-remove"
            data-action="remove-supporting-image"
            data-index="${index}"
            aria-label="Remove supporting photo"
          >X</button>
        </div>
      `,
    )
    .join("");
}

function resetPostUploadStatus(statusId) {
  const status = document.getElementById(statusId);
  if (!status) return;
  status.textContent = "";
  status.className = "upload-status";
}

async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    headers: {
      "x-admin-token": getAdminToken(),
    },
    body: formData,
  });

  if (!response.ok) {
    let message = `Upload failed with status ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || message;
    } catch {
      // Keep default upload message.
    }
    throw new Error(message);
  }

  return response.json();
}

async function uploadPostImage() {
  const fileInput = document.getElementById("postImageUploadInput");
  const imageInput = document.getElementById("postImageInput");
  const status = document.getElementById("postImageUploadStatus");
  const uploadButton = document.querySelector('[data-action="upload-post-image"]');
  const file = fileInput?.files?.[0];

  if (!file) {
    showToast("Select an image before uploading.", "error");
    if (status) {
      status.textContent = "Select an image file first.";
      status.className = "upload-status is-error";
    }
    return;
  }

  try {
    if (status) {
      status.textContent = "Uploading image...";
      status.className = "upload-status";
    }
    if (uploadButton) uploadButton.disabled = true;

    const payload = await uploadImageFile(file);
    imageInput.value = payload.url;
    updatePostImagePreview(payload.url);
    if (status) {
      status.textContent = `Uploaded to ${payload.storage || "storage"}.`;
      status.className = "upload-status is-success";
    }
    showToast("Image uploaded and attached.");
  } catch (error) {
    if (status) {
      status.textContent = error.message || "Unable to upload image.";
      status.className = "upload-status is-error";
    }
    showToast(error.message || "Unable to upload image.", "error");
  } finally {
    if (uploadButton) uploadButton.disabled = false;
  }
}

async function uploadSupportingImages() {
  const fileInput = document.getElementById("postSupportingImagesUploadInput");
  const status = document.getElementById("supportingImagesUploadStatus");
  const uploadButton = document.querySelector('[data-action="upload-supporting-images"]');
  const files = Array.from(fileInput?.files || []);

  if (!files.length) {
    showToast("Select supporting photos before uploading.", "error");
    if (status) {
      status.textContent = "Select one or more image files first.";
      status.className = "upload-status is-error";
    }
    return;
  }

  try {
    if (status) {
      status.textContent = `Uploading ${files.length} photo${files.length === 1 ? "" : "s"}...`;
      status.className = "upload-status";
    }
    if (uploadButton) uploadButton.disabled = true;

    const uploaded = await Promise.all(files.map(uploadImageFile));
    const urls = uploaded.map((payload) => payload.url).filter(Boolean);
    setSupportingImages([...getSupportingImages(), ...urls]);
    if (fileInput) fileInput.value = "";

    if (status) {
      status.textContent = `${urls.length} supporting photo${urls.length === 1 ? "" : "s"} attached.`;
      status.className = "upload-status is-success";
    }
    showToast("Supporting photos uploaded and attached.");
  } catch (error) {
    if (status) {
      status.textContent = error.message || "Unable to upload supporting photos.";
      status.className = "upload-status is-error";
    }
    showToast(error.message || "Unable to upload supporting photos.", "error");
  } finally {
    if (uploadButton) uploadButton.disabled = false;
  }
}

function removeSupportingImage(index) {
  const images = getSupportingImages();
  if (index < 0 || index >= images.length) return;
  images.splice(index, 1);
  setSupportingImages(images);
}

function syncBlogDataFromAdminPost(post) {
  const existing = blogData.find((item) => item.id === post.id);
  const payload = {
    id: post.id,
    title: post.title,
    category: post.category,
    location: post.location || existing?.location || post.category,
    categoryColor:
      post.categoryColor || existing?.categoryColor || getCategoryColorFromName(post.category),
    image: post.image || existing?.image || BLOG_DEFAULT_IMAGE,
    supportingImages:
      post.supportingImages || existing?.supportingImages || [],
    slug: post.slug || existing?.slug || slugify(post.title),
    content: post.content || existing?.content || post.excerpt,
    excerpt: post.excerpt,
    date: post.date,
    createdAt: post.createdAt || existing?.createdAt,
    updatedAt: post.updatedAt || existing?.updatedAt,
    status: post.status,
  };

  if (existing) Object.assign(existing, payload);
  else blogData.unshift(payload);
}

async function savePostData() {
  const id = document.getElementById("editPostId").value;
  const title = document.getElementById("postTitleInput").value.trim();
  const cat = document.getElementById("postCategoryInput").value.trim();
  const status = document.getElementById("postStatusSelect").value;
  const image = document.getElementById("postImageInput").value.trim();
  const supportingImages = getSupportingImages();
  const content = syncRichEditorToTextarea({ cleanEditor: true });
  const contentText = richContentToText(content);
  const excerpt = truncateText(contentText, 320);

  if (!title || !cat) {
    showToast("Required metrics missing.", "error");
    return;
  }

  if (!contentText) {
    showToast("Content body needs at least one paragraph.", "error");
    return;
  }

  try {
    const method = id ? "PUT" : "POST";
    const path = id ? `/posts/${id}` : "/posts";
    const existingPost = id ? posts.find((post) => String(post.id) === String(id)) : null;
    const payload = {
      title: title,
      excerpt: excerpt || "No description payload defined.",
      category: cat,
      status: status,
      image: image || BLOG_DEFAULT_IMAGE,
      supportingImages,
      content: content || plainTextToRichHTML("No description payload defined."),
      location: cat,
      categoryColor: getCategoryColorFromName(cat),
      date: existingPost?.date || undefined,
      createdAt: existingPost?.createdAt || undefined,
    };
    postDataVersion += 1;

    const result = await apiRequest(path, {
      method,
      headers: { "x-admin-token": getAdminToken() },
      body: JSON.stringify(payload),
    });

    const savedPost = {
      id: result.post.id,
      title: result.post.title,
      excerpt: result.post.excerpt,
      category: result.post.category,
      date: result.post.date,
      createdAt: result.post.createdAt,
      updatedAt: result.post.updatedAt,
      status: result.post.status,
      image: result.post.image,
      supportingImages: Array.isArray(result.post.supportingImages)
        ? result.post.supportingImages
        : [],
      slug: result.post.slug,
      content: result.post.content,
      location: result.post.location,
      categoryColor: result.post.categoryColor,
    };

    if (id) {
      const index = posts.findIndex((post) => String(post.id) === String(id));
      if (index > -1) posts[index] = savedPost;
      syncBlogDataFromAdminPost(savedPost);
      showToast("Article parameter variations committed.");
    } else {
      posts.unshift(savedPost);
      syncBlogDataFromAdminPost(savedPost);
      showToast("New structural article active.");
    }

    closePostModal();
    renderBlogPosts("all");
    resetAllBlogGrids();
  } catch (error) {
    showToast(error.message || "Unable to save post.", "error");
  }
}

async function deletePost(id) {
  if (!confirm("Purge selected post item from memory arrays?")) return;
  try {
    postDataVersion += 1;
    await apiRequest(`/posts/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": getAdminToken() },
    });
    posts = posts.filter((p) => p.id !== id);
    const blogIndex = blogData.findIndex((post) => post.id === id);
    if (blogIndex > -1) blogData.splice(blogIndex, 1);
    renderBlogPosts("all");
    resetAllBlogGrids();
    showToast("Data point detached successfully.", "error");
  } catch (error) {
    showToast(error.message || "Unable to delete post.", "error");
  }
}

// ── COMMENT MODERATION LAYER ──
function renderComments(filter = "all") {
  const cont = document.getElementById("commentsContainer");
  let dataset = comments;
  if (filter === "pending") dataset = comments.filter((c) => c.pending);

  if (dataset.length === 0) {
    cont.innerHTML = `<div class="card admin-empty-card">No comments found matching conditions.</div>`;
    return;
  }

  cont.innerHTML = dataset
    .map(
      (c) => `
  <div class="comment-node">
    <div class="comment-meta">
      <div>
        <span class="comment-author">${escapeHTML(c.author)}</span> on
        <a href="/blog/${escapeHTML(c.postSlug)}" class="comment-post">${escapeHTML(c.postTitle)}</a>
      </div>
      <div class="comment-state">
        ${c.pending ? "⚠️ Awaiting Moderation" : "✓ Cleared"}
      </div>
    </div>
    <div class="comment-body">"${escapeHTML(c.text)}"</div>
    
    <div class="inline-actions">
      ${c.pending ? `<button class="btn btn-dark btn-sm" data-action="approve-comment" data-id="${c.id}">Approve Verification</button>` : ""}
      <button class="btn btn-outline btn-sm" data-action="toggle-comment-reply" data-id="${c.id}">Dispatch Reply</button>
      <button class="btn btn-danger btn-sm" data-action="delete-comment" data-id="${c.id}">Purge</button>
    </div>

    ${
      c.replies && c.replies.length > 0
        ? c.replies
            .map(
              (r) => `
      <div class="nested-reply">
        <strong class="reply-author">↳ ${escapeHTML(r.author)} [Admin]:</strong> ${escapeHTML(r.text)}
      </div>
    `,
            )
            .join("")
        : ""
    }

    <div class="comment-reply-box" id="commentReply-${c.id}">
      <textarea class="form-input comment-reply-textarea" id="commentReplyText-${c.id}" placeholder="Type reply payload..."></textarea>
      <button class="btn btn-terra btn-sm" data-action="post-comment-reply" data-id="${c.id}">Commit Reply</button>
    </div>
  </div>
`,
    )
    .join("");
}

function filterComments(type, btn) {
  btn.parentNode
    .querySelectorAll(".filter-tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  renderComments(type);
}

async function approveComment(id) {
  try {
    const result = await apiRequest(`/admin/comments/${id}/approve`, {
      method: "PUT",
      headers: { "x-admin-token": getAdminToken() },
    });
    const index = comments.findIndex((x) => x.id === id);
    if (index > -1) comments[index] = result.comment;
    renderAdminRealtimePanels();
    showToast("Comment data verified and made public.");
  } catch (error) {
    showToast(error.message || "Unable to approve comment.", "error");
  }
}

function toggleCommentReply(id) {
  const box = document.getElementById("commentReply-" + id);
  box.classList.toggle("show");
}

async function postCommentReply(id) {
  const txt = document
    .getElementById("commentReplyText-" + id)
    .value.trim();
  if (!txt) {
    showToast("Cannot commit null characters.", "error");
    return;
  }
  try {
    const result = await apiRequest(`/admin/comments/${id}/reply`, {
      method: "POST",
      headers: { "x-admin-token": getAdminToken() },
      body: JSON.stringify({ text: txt }),
    });
    const index = comments.findIndex((x) => x.id === id);
    if (index > -1) comments[index] = result.comment;
    renderAdminRealtimePanels();
    showToast("Reply appended to comment tree infrastructure.");
  } catch (error) {
    showToast(error.message || "Unable to save reply.", "error");
  }
}

async function deleteComment(id) {
  if (!confirm("Purge data block?")) return;
  try {
    await apiRequest(`/admin/comments/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": getAdminToken() },
    });
    comments = comments.filter((c) => c.id !== id);
    renderAdminRealtimePanels();
    showToast("Node stripped from content trees.", "error");
  } catch (error) {
    showToast(error.message || "Unable to delete comment.", "error");
  }
}

// ── CONSULTING PIPELINES ──
function renderConsultingTable() {
  const body = document.getElementById("consultingTableBody");
  if (!body) return;

  if (!consultingRequests.length) {
    body.innerHTML = `
      <tr>
        <td colspan="6" class="admin-table-desc">No consulting requests are connected yet.</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = consultingRequests
    .map(
      (r) => `
  <tr>
    <td class="admin-table-name">${r.client}</td>
    <td class="admin-table-desc">${r.package}</td>
    <td class="admin-table-muted-date">${r.date}</td>
    <td class="admin-table-budget">${r.budget}</td>
    <td>
      <span class="status-badge ${r.status === "Active Execution" ? "status-published" : "status-draft"}">
        ${r.status}
      </span>
    </td>
    <td>
      ${
        r.status === "Pending Approval"
          ? `<button class="btn btn-dark btn-sm" data-action="approve-consulting" data-id="${r.id}">Authorize</button>`
          : `<span class="production-state">In Production</span>`
      }
    </td>
  </tr>
`,
    )
    .join("");
}

function approveConsulting(id) {
  const r = consultingRequests.find((x) => x.id === id);
  if (!r) return;
  r.status = "Active Execution";
  renderConsultingTable();
  updateBadges();
  showToast("Consulting strategy parameters activated.");
}

function renderSubscribersTable() {
  const body = document.getElementById("subscribersTableBody");
  if (!body) return;

  if (!subscribers.length) {
    body.innerHTML = `
      <tr>
        <td colspan="4" class="admin-table-desc">No newsletter subscribers yet.</td>
      </tr>
    `;
    return;
  }

  body.innerHTML = subscribers
    .map(
      (subscriber) => `
        <tr>
          <td class="subscriber-email">${escapeHTML(subscriber.email)}</td>
          <td class="admin-table-category">${escapeHTML(subscriber.source || "blog")}</td>
          <td><span class="status-badge status-published">${escapeHTML(subscriber.status || "Subscribed")}</span></td>
          <td class="admin-table-muted-medium">${escapeHTML(subscriber.date || "")}</td>
        </tr>
      `,
    )
    .join("");
}

// ── MESSAGE PROTOCOLS ──
function renderMessagesList() {
  const cont = document.getElementById("messagesListContainer");
  if (!cont) return;

  if (!messages.length) {
    cont.innerHTML = `<div class="card admin-empty-card">No contact messages yet.</div>`;
    return;
  }

  cont.innerHTML = messages
    .map(
      (m) => `
  <div class="message-item ${m.unread ? "unread" : ""}" data-message-id="${m.id}">
    <div class="msg-avatar">${m.sender.charAt(0)}</div>
    <div class="msg-main">
      <div class="msg-top">
        <span class="msg-name">${m.sender}</span>
        <span class="msg-time">${m.date}</span>
      </div>
      <div class="msg-subj">${m.subject}</div>
      <div class="msg-preview">${m.text}</div>
    </div>
  </div>
`,
    )
    .join("");
}

function inspectMessage(id, element) {
  document
    .querySelectorAll(".message-item")
    .forEach((i) => i.classList.remove("open"));
  if (element) element.classList.add("open");

  const m = messages.find((x) => x.id === id);
  if (!m) return;
  m.unread = false;
  updateBadges();
  renderMessagesList();

  const display = document.getElementById("messageDetailContainer");
  display.innerHTML = `
  <div class="msg-detail-header">
    <div class="msg-detail-kicker">Transmission Header</div>
    <h2 class="msg-detail-title">${m.subject}</h2>
    <div class="msg-detail-from">From: ${m.sender} <span>&lt;${m.email}&gt;</span></div>
    <div class="msg-detail-time">Timestamp: ${m.date}</div>
  </div>
  <div class="msg-detail-body">${m.text}</div>
  <div class="inline-actions">
    <a href="mailto:${m.email}" class="btn btn-terra btn-sm msg-mail-link">Open Relational Client Mail</a>
    <button class="btn btn-outline btn-sm" data-action="archive-message">Archive Packet</button>
  </div>
`;
}

// ── TOAST ARCHITECTURE DISPATCH SYSTEM ──
function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent =
    (type === "success" ? "✓ " : type === "error" ? "✕ " : "") + msg;
  t.className = "toast " + type + " show";
  setTimeout(() => t.classList.remove("show"), 3000);
}

// Automatically reveal panel frame elements if configured bypass active
window.onload = () => {
  // Prompt remains at identity check state block on load
};
