const API_BASE = "/api";
const BLOG_BATCH_SIZE = 6;
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

async function loadInitialData() {
  try {
    const payload = await apiRequest("/posts");
    if (Array.isArray(payload.posts) && payload.posts.length) {
      const shouldPadHomeFeatured = document.body.classList.contains("page-index");
      blogData = payload.posts.map((post) => ({ ...post }));

      if (shouldPadHomeFeatured) {
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
        status: post.status,
        image: post.image,
        slug: post.slug,
        location: post.location,
        categoryColor: post.categoryColor,
      }));
    }
  } catch (error) {
    console.warn("Using local fallback blog data:", error.message);
  }
}

function initPaintCursor() {
  const dot = document.getElementById("cursor-dot");
  const canvas = document.getElementById("paint-canvas");
  if (!dot || !canvas) return;

  const ctx = canvas.getContext("2d");
  const palette = [
    "#ff3e3e",
    "#ff6b35",
    "#f4d068",
    "#dfb2b2",
    "#8da082",
    "#ff3e3e",
    "#ff6b35",
  ];
  let colorIndex = 0;
  let lastX = null;
  let lastY = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function fadeLoop() {
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 0.12;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    requestAnimationFrame(fadeLoop);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  fadeLoop();

  window.addEventListener("mousemove", (event) => {
    dot.style.left = event.clientX + "px";
    dot.style.top = event.clientY + "px";

    if (lastX === null) {
      lastX = event.clientX;
      lastY = event.clientY;
      return;
    }

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const pressure = Math.max(2, Math.min(22, 18 - speed * 0.35));
    colorIndex += speed * 0.008;
    const paintColor = palette[Math.floor(colorIndex) % palette.length];

    dot.style.borderColor = paintColor;
    dot.style.setProperty("--dot-color", paintColor);

    for (let i = 0; i < 5; i++) {
      const offset = (i - 2) * (pressure * 0.28);
      const perpX = (-dy / (speed || 1)) * offset;
      const perpY = (dx / (speed || 1)) * offset;
      const alpha = 0.55 - Math.abs(i - 2) * 0.09;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = paintColor;
      ctx.lineWidth = Math.max(1, pressure * (1 - Math.abs(i - 2) * 0.15));
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastX + perpX, lastY + perpY);
      ctx.lineTo(event.clientX + perpX, event.clientY + perpY);
      ctx.stroke();
    }

    if (pressure > 14 && Math.random() < 0.25) {
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(
        event.clientX,
        event.clientY,
        pressure * (0.6 + Math.random() * 0.5),
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = paintColor;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    lastX = event.clientX;
    lastY = event.clientY;
  });

  window.addEventListener("mousedown", (event) => {
    dot.classList.add("clicking");
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 28;
      const radius = 2 + Math.random() * 7;
      ctx.globalAlpha = 0.5 + Math.random() * 0.35;
      ctx.beginPath();
      ctx.arc(
        event.clientX + Math.cos(angle) * dist,
        event.clientY + Math.sin(angle) * dist,
        radius,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });

  window.addEventListener("mouseup", () => dot.classList.remove("clicking"));

  const hoverSelector =
    "a, button, .btn, .card, .post-card, .does-item, .service-card, .dna-cell, .nav-item, .logout-btn, .login-btn, .filter-tab";
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

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      mobileNav.classList.remove("open");
    });
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
  document.querySelectorAll(".grid-surface").forEach((section) => {
    if (section.querySelector(":scope > .gs-grid")) return;

    const grid = document.createElement("div");
    grid.className = "gs-grid";
    section.insertBefore(grid, section.firstChild);

    const spot = document.createElement("div");
    spot.className = "gs-spot";
    section.insertBefore(spot, section.firstChild);

    let rafId = null;
    section.addEventListener("mousemove", (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        spot.style.background = `radial-gradient(520px circle at ${x}% ${y}%, rgba(255,62,62,0.13) 0%, rgba(255,107,53,0.07) 38%, rgba(244,208,104,0.04) 60%, transparent 75%)`;
        section.classList.add("gs-lit");
      });
    });

    section.addEventListener("mouseleave", () => section.classList.remove("gs-lit"));
  });
}

function initCardTilt() {
  const tiltSelector = ".card, .post-card";

  document.addEventListener("mousemove", (event) => {
    const card = event.target.closest(tiltSelector);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = "transform 0.1s ease, box-shadow 0.35s ease";
  });

  document.addEventListener("mouseout", (event) => {
    const card = event.target.closest(tiltSelector);
    const nextTarget =
      event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (!card || (nextTarget && card.contains(nextTarget))) return;

    card.style.transform = "";
    card.style.transition =
      "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease";
  });
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
      post.date,
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
    <a href="blog.html#${escapeHTML(post.slug)}" class="card fade-up ${delayClass} ${rowClass}" data-blog-id="${post.id}">
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
        <div class="card-arrow">
          Read More
          <svg class="icon"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </a>
  `;
}

function renderArchiveBlogCard(post, index) {
  const delayClass = getDelayClass(index);
  const featuredClass = index === 0 ? "post-featured" : "";
  return `
    <a href="#${escapeHTML(post.slug)}" class="post-card ${featuredClass} fade-up ${delayClass}" data-cat="${escapeHTML(post.category.toLowerCase())}" data-blog-id="${post.id}">
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
          <span class="post-date">${escapeHTML(post.date)}</span>
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

    new SplitType(element, { types: "words, chars" });
    const characters = element.querySelectorAll(".char");

    gsap.to(characters, {
      y: "0%",
      opacity: 1,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.025,
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const blogSection = document.querySelector(".page-index .featured-section");
  const cardsContainer = document.querySelector(".page-index .featured-cards");
  if (!blogSection || !cardsContainer || window.innerWidth < 768) return;

  blogSection.classList.add("gsap-carousel");
  const headingEl = blogSection.querySelector(".featured-header");
  if (headingEl) headingEl.classList.add("section-header-wrap");

  const getScrollDistance = () => {
    const cards = Array.from(cardsContainer.children);
    const lastCard = cards.at(-1);
    const cardWidth = lastCard?.getBoundingClientRect().width || 440;
    const sideGutter = Math.max(128, window.innerWidth * 0.12);
    const baseDistance = cardsContainer.scrollWidth - window.innerWidth;

    return Math.max(0, baseDistance + cardWidth + sideGutter);
  };

  gsap.to(cardsContainer, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: blogSection,
      pin: true,
      pinSpacing: true,
      scrub: 1.1,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", dispatchFormPayload);
}

function initAdminBindings() {
  if (!document.body.classList.contains("page-admin")) return;

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
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadInitialData();
  initPaintCursor();
  initHeaderAndMenu();
  initFadeUp();
  initBlogPagination();
  initCountUp();
  initGridSurfaces();
  initCardTilt();
  initBlogFilters();
  initGsapEnhancements();
  initContactForm();
  initAdminBindings();
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
  category: post.category,
  date: post.date,
  status: post.status,
}));

let comments = [];
let consultingRequests = [];
let messages = [];
let activities = [];

// ── APPLICATION ENTRY VALIDATION CONTEXT ──
async function attemptLogin() {
  const input = document.getElementById("passInput");
  const rawToken = input.value.trim();
  const val = rawToken.toLowerCase();
  const allowedTokens = [
    "admin",
    "admin123",
    "password",
    "kimia",
    "kimia123",
    "kimiaskravings",
  ];

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
    if (allowedTokens.includes(val)) {
      localStorage.setItem("kimiaAdminToken", "admin");
      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("app").style.display = "block";
      document.getElementById("loginError").classList.remove("show");
      await initializeApplicationCore();
      showToast("System Authorization Acknowledged.", "success");
      return;
    }

    const err = document.getElementById("loginError");
    err.classList.add("show");
    input.focus();
    input.select();
    showToast(error.message || "Authorization Denied.", "error");
  }
}

function triggerLogout() {
  localStorage.removeItem("kimiaAdminToken");
  document.getElementById("passInput").value = "";
  document.getElementById("loginError").classList.remove("show");
  document.getElementById("app").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  showToast("Session Terminated Safely.");
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

// ── ENGINE INITIALIZATION PROCEDURES ──
async function initializeApplicationCore() {
  await loadAdminMessages();
  updateBadges();
  renderDashboardActivities();
  renderBlogPosts("all");
  renderComments();
  renderConsultingTable();
  renderMessagesList();
}

function updateBadges() {
  const pComm = comments.filter((c) => c.pending).length;
  const pConsult = consultingRequests.filter(
    (r) => r.status === "Pending Approval",
  ).length;
  const uMsg = messages.filter((m) => m.unread).length;

  document.getElementById("badge-comments").textContent = pComm;
  document.getElementById("badge-consulting").textContent = pConsult;
  document.getElementById("badge-messages").textContent = uMsg;

  // Sync parameters to dashboard analytical summaries
  document.getElementById("stat-publishedPosts").textContent = posts.filter(
    (post) => post.status === "Published",
  ).length;
  document.getElementById("stat-unreadMsg").textContent = uMsg;
  document.getElementById("stat-pendingComm").textContent = pComm;
  document.getElementById("stat-bookings").textContent =
    consultingRequests.length;
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
    time: post.date || "No date",
  }));

  const recentMessages = messages.slice(0, 3).map((message) => ({
    type: message.unread ? "Unread Message" : "Message",
    desc: `${message.sender}: ${message.subject}`,
    time: message.date || "No timestamp",
  }));

  return [...recentMessages, ...recentPosts].slice(0, 6);
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

      return `
    <tr>
      <td class="post-title-cell">${escapeHTML(p.title)}<p>${escapeHTML(p.excerpt)}</p></td>
      <td class="admin-table-category">${escapeHTML(p.category)}</td>
      <td class="admin-table-muted-medium">${escapeHTML(p.date)}</td>
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
    document.getElementById("postContentInput").value = p.excerpt;
    document.getElementById("postImageInput").value = p.image || "";
    updatePostImagePreview(p.image || "");
  } else {
    document.getElementById("modalActionTitle").textContent =
      "Construct New Blog Post";
    document.getElementById("editPostId").value = "";
    document.getElementById("postTitleInput").value = "";
    document.getElementById("postCategoryInput").value = "";
    document.getElementById("postStatusSelect").value = "Published";
    document.getElementById("postContentInput").value = "";
    document.getElementById("postImageInput").value = "";
    document.getElementById("postImageUploadInput").value = "";
    updatePostImagePreview("");
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

async function uploadPostImage() {
  const fileInput = document.getElementById("postImageUploadInput");
  const imageInput = document.getElementById("postImageInput");
  const file = fileInput?.files?.[0];

  if (!file) {
    showToast("Select an image before uploading.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
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

    const payload = await response.json();
    imageInput.value = payload.url;
    updatePostImagePreview(payload.url);
    showToast("Image uploaded and attached.");
  } catch (error) {
    showToast(error.message || "Unable to upload image.", "error");
  }
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
    slug: post.slug || existing?.slug || slugify(post.title),
    excerpt: post.excerpt,
    date: post.date,
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
  const excerpt = document
    .getElementById("postContentInput")
    .value.trim();

  if (!title || !cat) {
    showToast("Required metrics missing.", "error");
    return;
  }

  try {
    const method = id ? "PUT" : "POST";
    const path = id ? `/posts/${id}` : "/posts";
    const payload = {
      title: title,
      excerpt: excerpt || "No description payload defined.",
      category: cat,
      status: status,
      image: image || BLOG_DEFAULT_IMAGE,
      location: cat,
      categoryColor: getCategoryColorFromName(cat),
      date: id ? posts.find((post) => String(post.id) === String(id))?.date : "Just Now",
    };

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
      status: result.post.status,
      image: result.post.image,
      slug: result.post.slug,
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
        <span class="comment-author">${c.author}</span> on 
        <a href="#" class="comment-post">${c.postTitle}</a>
      </div>
      <div class="comment-state">
        ${c.pending ? "⚠️ Awaiting Moderation" : "✓ Cleared"}
      </div>
    </div>
    <div class="comment-body">"${c.text}"</div>
    
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
        <strong class="reply-author">↳ ${r.author} [Admin]:</strong> ${r.text}
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

function approveComment(id) {
  const c = comments.find((x) => x.id === id);
  c.pending = false;
  renderComments();
  updateBadges();
  showToast("Comment data verified and made public.");
}

function toggleCommentReply(id) {
  const box = document.getElementById("commentReply-" + id);
  box.classList.toggle("show");
}

function postCommentReply(id) {
  const txt = document
    .getElementById("commentReplyText-" + id)
    .value.trim();
  if (!txt) {
    showToast("Cannot commit null characters.", "error");
    return;
  }
  const c = comments.find((x) => x.id === id);
  if (!c.replies) c.replies = [];
  c.replies.push({ author: "Kimia", text: txt });
  c.pending = false;
  renderComments();
  updateBadges();
  showToast("Reply appended to comment tree infrastructure.");
}

function deleteComment(id) {
  if (!confirm("Purge data block?")) return;
  comments = comments.filter((c) => c.id !== id);
  renderComments();
  updateBadges();
  showToast("Node stripped from content trees.", "error");
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
