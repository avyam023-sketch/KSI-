/* Shared page shell: <head>, header, footer, enquiry drawer and helpers. */

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));


const icon = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5l2.6.4 1.3 4-1.9 1.4a12 12 0 0 0 6.1 6.1l1.4-1.9 4 1.3.4 2.6c.1.9-.6 1.7-1.5 1.7C10.3 19.1 4.9 13.7 4.9 5c0-.9.8-1.6 1.7-1.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6 0 .9-.6 1.7-1.6 1.9-1 .2-2.6-.2-4.3-1.7-1.7-1.5-2.6-3.1-2.6-4.2 0-.6.2-1 .4-1.3z" fill="currentColor"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};

const path = require("path");
const { size } = require("./images");
const PRODUCT_IMG_DIR = path.resolve(__dirname, "../../src/assets/img/products");

/* Inline size hints: CSS uses --w/--h to stop low-resolution photos being enlarged too far. */
const dims = (id) => {
  const { w, h } = size(PRODUCT_IMG_DIR, id);
  return `width="${w}" height="${h}" style="--w:${w};--h:${h}"`;
};

/* Prefix for relative links from pages nested one level deep (products/*.html). */
const rel = (depth) => (depth ? "../".repeat(depth) : "");

function productName(p) {
  return p.tier ? `${p.name} — ${p.tier}` : p.name;
}

function productCard(p, data, depth, opts = {}) {
  const r = rel(depth);
  const cat = data.categories.find((c) => c.id === p.cat);
  const search = [p.code, p.name, p.tier, cat && cat.name, ...(p.tags || [])].join(" ").toLowerCase();
  return `
  <article class="card" data-cat="${p.cat}" data-search="${esc(search)}">
    <a class="card__link" href="${r}products/${p.id}.html" aria-label="${esc(productName(p))}"></a>
    <div class="card__media"><img class="fit" src="${r}assets/img/products/${p.id}.webp" alt="${esc(p.name)}" ${dims(p.id)} loading="lazy" decoding="async"></div>
    <div class="card__body">
      <span class="code">${esc(p.code)}</span>
      <h3 class="card__title">${esc(p.name)}</h3>
      ${p.tier ? `<p class="card__tier">${esc(p.tier)}</p>` : ""}
    </div>
    ${opts.noAdd ? "" : `<button class="card__add" type="button" data-enquire="${p.id}" aria-label="Add ${esc(p.name)} to enquiry list">${icon.plus}${icon.check}</button>`}
  </article>`;
}

function header(data, depth, active) {
  const r = rel(depth);
  const cats = data.categories
    .map((c) => {
      const n = data.products.filter((p) => p.cat === c.id).length;
      return `<li><a href="${r}products.html#${c.id}"><img src="${r}assets/img/products/${c.cover}.webp" alt="" loading="lazy"><span>${esc(c.short)}<small>${n} models</small></span></a></li>`;
    })
    .join("");
  const a = (k) => (active === k ? ' aria-current="page"' : "");
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="${r}index.html" aria-label="KSI Plus — home"><img src="${r}assets/img/brand/ksi-plus-logo.svg" alt="KSI Plus" width="112" height="41"></a>
    <nav class="nav" aria-label="Primary">
      <div class="nav__item nav__item--mega">
        <a href="${r}products.html"${a("products")}>Products</a>
        <div class="mega" role="region" aria-label="Product categories">
          <ul class="mega__grid">${cats}</ul>
          <a class="mega__all" href="${r}products.html">View the complete catalogue ${icon.arrow}</a>
        </div>
      </div>
      <a href="${r}about.html"${a("about")}>About</a>
      <a href="${r}contact.html"${a("contact")}>Contact</a>
    </nav>
    <div class="site-header__actions">
      <a class="hdr-phone" href="tel:${data.company.phoneHref}">${icon.phone}<span>${esc(data.company.phone)}</span></a>
      <button class="btn btn--ghost btn--sm enq-toggle" type="button" data-open-enquiry aria-label="Open enquiry list">${icon.list}<span class="enq-toggle__label">Enquiry</span><span class="enq-count" data-enq-count>0</span></button>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" data-mobile-menu hidden>
  <nav aria-label="Mobile">
    <a href="${r}index.html">Home</a>
    <a href="${r}products.html">Products</a>
    <a href="${r}about.html">About</a>
    <a href="${r}contact.html">Contact</a>
  </nav>
  <ul class="mobile-menu__cats">${data.categories.map((c) => `<li><a href="${r}products.html#${c.id}">${esc(c.short)}</a></li>`).join("")}</ul>
  <div class="mobile-menu__foot">
    <a class="btn btn--primary" href="tel:${data.company.phoneHref}">${icon.phone} Call ${esc(data.company.phone)}</a>
    <a class="btn btn--ghost" href="https://wa.me/${data.company.whatsapp}" target="_blank" rel="noopener">${icon.whatsapp} WhatsApp</a>
  </div>
</div>`;
}

function footer(data, depth) {
  const r = rel(depth);
  const c = data.company;
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__cta">
      <h2 class="site-footer__title">Planning an OT, ICU or ward? Send us your requirement.</h2>
      <div class="btn-row">
        <a class="btn btn--light" href="${r}contact.html">Request a quote ${icon.arrow}</a>
        <a class="btn btn--outline-light" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">${icon.whatsapp} WhatsApp us</a>
      </div>
    </div>
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        <img src="${r}assets/img/brand/ksi-plus-logo-white.svg" alt="KSI Plus" width="128" height="47">
        <p>${esc(c.tagline)}</p>
        <p class="muted">Manufacturer of OT tables, OT lights, hospital furniture and steam sterilizers. A legacy since ${c.since}.</p>
      </div>
      <div>
        <h3>Products</h3>
        <ul>${data.categories.map((x) => `<li><a href="${r}products.html#${x.id}">${esc(x.short)}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li><a href="${r}about.html">About KSI Plus</a></li>
          <li><a href="${r}about.html#quality">Certifications</a></li>
          <li><a href="${r}about.html#voices">Testimonials</a></li>
          <li><a href="${r}contact.html">Contact</a></li>
        </ul>
        <h3 class="mt">Talk to us</h3>
        <ul>
          <li><a href="tel:${c.phoneHref}">${esc(c.phone)}</a></li>
          <li><a href="tel:${c.mobileHref}">${esc(c.mobile)}</a></li>
          <li><a href="mailto:${c.email}">${esc(c.email)}</a></li>
        </ul>
      </div>
      <div>
        <h3>Offices</h3>
        ${c.offices.map((o) => `<address><strong>${esc(o.title)}</strong>${o.lines.map(esc).join("<br>")}</address>`).join("")}
      </div>
    </div>
    <div class="site-footer__base">
      <span>© ${year} ${esc(c.legal)} · KSI Plus. All rights reserved.</span>
      <span>Made in India</span>
    </div>
  </div>
</footer>`;
}

/* Questions asked one at a time in the enquiry drawer. */
const ENQ_STEPS = [
  { name: "name", q: "First, what's your name?", required: true, autocomplete: "name", placeholder: "Dr. A. Sharma", error: "We need a name to address the quotation to." },
  { name: "org", q: "Which hospital or organisation is this for?", autocomplete: "organization", placeholder: "City Hospital, Panchkula" },
  { name: "phone", q: "What's the best number to reach you on?", hint: "Mobile or landline, with STD code.", type: "tel", required: true, autocomplete: "tel", placeholder: "+91 98xxx xxxxx", error: "Add a number so our team can reach you." },
  { name: "city", q: "Which city is the site in?", autocomplete: "address-level2", placeholder: "Panchkula" },
  { name: "message", q: "Anything we should know?", hint: "Tap any that apply, or write your own.", type: "textarea", placeholder: "Project, timeline, specifications…", quick: ["New OT setup", "Replacing old equipment", "Need it within a month", "Site visit requested"] },
];

function drawer(data, depth) {
  const r = rel(depth);
  return `
<div class="drawer-scrim" data-enquiry-scrim hidden></div>
<aside class="drawer" id="enquiry" data-enquiry aria-label="Enquiry list" aria-hidden="true" tabindex="-1">
  <div class="drawer__head">
    <div>
      <p class="eyebrow">Request a quote</p>
      <h2 data-drawer-title>Your enquiry list</h2>
    </div>
    <button class="icon-btn" type="button" data-close-enquiry aria-label="Close enquiry list">${icon.close}</button>
  </div>
  <div class="drawer__body">
    <p class="enq-note" data-enq-note hidden>Prices are not listed online. Answer a few questions below and we will send you a quotation for these items.</p>
    <ul class="enq-list" data-enq-list></ul>
    <section class="finder" data-finder aria-label="Add products">
      <button type="button" class="finder__toggle" data-finder-toggle aria-expanded="true"><span>Add products</span>${icon.chevron}</button>
      <div class="finder__panel" data-finder-panel>
        <label class="search search--sm">
          ${icon.search}
          <span class="sr-only">Search products</span>
          <input type="search" placeholder="Search name or model code" data-finder-q autocomplete="off">
        </label>
        <div class="finder__types" role="tablist" aria-label="Product types">
          ${data.categories.map((c) => `<button type="button" role="tab" class="chip chip--sm" data-finder-cat="${c.id}" aria-selected="false">${esc(c.short)}<span>${data.products.filter((p) => p.cat === c.id).length}</span></button>`).join("")}
        </div>
        <ul class="finder__results" data-finder-results aria-live="polite"></ul>
        <p class="finder__hint muted" data-finder-hint>Pick a product type or search all ${data.products.length} products, then tap + to add one.</p>
      </div>
    </section>
    <form class="enq-form" data-enq-form novalidate>
      ${require("./steps").stepsForm({ attr: "enq", steps: ENQ_STEPS })}
    </form>
  </div>
</aside>
<div class="toast" data-toast role="status" aria-live="polite"></div>
<button type="button" class="quote-bar" data-open-enquiry data-quote-bar hidden>
  <span class="quote-bar__label">Get a quote for <b data-quote-count>0 items</b></span>
  <span class="quote-bar__go">${icon.arrow}</span>
</button>
<a class="wa-float" href="https://wa.me/${data.company.whatsapp}?text=${encodeURIComponent("Hello KSI Plus, I have an enquiry.")}" target="_blank" rel="noopener" aria-label="Chat with KSI Plus on WhatsApp">
  <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.97 12.97 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3zm0 23.72c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.67 10.67 0 0 1 5.3 16c0-5.92 4.82-10.73 10.74-10.73 5.91 0 10.7 4.81 10.7 10.73s-4.8 10.72-10.7 10.72zm5.88-8.03c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.58-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z"/></svg>
</a>`;
}

function layout({ title, description, body, data, depth = 0, active, bodyClass = "", scripts = [], jsonld, ogImage, canonical = "" }) {
  const r = rel(depth);
  const c = data.company;
  const fullTitle = title ? `${title} | KSI Plus` : `KSI Plus — OT Tables, OT Lights & Hospital Furniture Manufacturer, Panchkula`;
  const desc = description || "KSI Plus manufactures operation theatre tables, LED surgical lights, hospital beds, furniture and steam sterilizers. Legacy since 1973. Office in Panchkula, works in Derabassi.";
  const og = ogImage || "assets/img/products/ksi-201.webp";
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>document.documentElement.classList.add("js")</script>
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F6F4EF">
<meta property="og:type" content="website">
<meta property="og:site_name" content="KSI Plus">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${c.siteUrl}/${og}">
${canonical !== null ? `<link rel="canonical" href="${c.siteUrl}/${canonical}">` : ""}
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${r}assets/css/site.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body class="${bodyClass}" data-root="${r}">
${header(data, depth, active)}
<main id="main">
${body}
</main>
${footer(data, depth)}
${drawer(data, depth)}
<script src="${r}assets/vendor/gsap.min.js"></script>
<script src="${r}assets/vendor/ScrollTrigger.min.js"></script>
<script src="${r}assets/vendor/lenis.min.js"></script>
<script src="${r}assets/js/data.js"></script>
<script src="${r}assets/js/site.js"></script>
${scripts.map((s) => `<script src="${r}assets/js/${s}"></script>`).join("\n")}
</body>
</html>
`;
}

module.exports = { layout, esc, icon, rel, productCard, productName, dims };
