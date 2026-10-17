/* Homepage — a scroll-driven story. Each <section> pairs with a block in assets/js/home.js. */
const { esc, icon, dims } = require("../lib/layout");

/* Hero: KSI-201 drawn as an engineering sheet. Coordinates are in the photo's own
   pixel space (651 × 373) so dimension lines stay locked to the table at any size.
   The photo is split at the column (y = 275) so scroll can raise the top half. */
const HERO = { top: 104, floor: 366, cut: 275, left: 7, right: 642 };
function heroDrawing() {
  const src = "assets/img/brand/ksi-201-cutout.webp";
  const img = (clip) => `<image href="${src}" width="651" height="373" clip-path="url(#${clip})"/>`;
  const { top, floor, cut, left, right } = HERO;
  const tick = (x, y) => `<line class="d-tick" x1="${x - 6}" y1="${y + 6}" x2="${x + 6}" y2="${y - 6}"/>`;
  const callout = (cls, px, py, pts, tx, ty, anchor, text) =>
    `<g class="co ${cls}"><polyline class="co__lead" points="${px},${py} ${pts}" pathLength="1"/><circle class="co__dot" cx="${px}" cy="${py}" r="4.5"/><text class="co__text" x="${tx}" y="${ty}" text-anchor="${anchor}">${text}</text></g>`;
  return `
    <svg class="drawing" viewBox="-290 -100 1160 545" preserveAspectRatio="xMidYMid meet" role="img" aria-label="KSI-201 electro-hydraulic operation table drawn with its 2070 mm length and 690 to 1120 mm height range">
      <defs>
        <clipPath id="clip-upper"><rect x="0" y="0" width="651" height="262"/><rect x="278" y="262" width="102" height="${cut - 262}"/></clipPath>
        <clipPath id="clip-lower"><rect x="0" y="${cut}" width="651" height="${373 - cut}"/><rect x="0" y="262" width="278" height="${cut - 262}"/><rect x="380" y="262" width="271" height="${cut - 262}"/></clipPath>
        <clipPath id="clip-strip"><rect x="278" y="${cut - 1}" width="102" height="1"/></clipPath>
        <clipPath id="clip-reveal"><rect class="reveal-rect" x="-290" y="-100" width="1160" height="545"/></clipPath>
      </defs>
      <line class="d-floor" x1="-10" y1="${floor}" x2="780" y2="${floor}" pathLength="1"/>
      <g clip-path="url(#clip-reveal)">
        <g class="t-lower">${img("clip-lower")}</g>
        <g class="t-strip">${img("clip-strip")}</g>
        <g class="t-upper">
          ${img("clip-upper")}
          ${callout("co--remote", 159, 172, "-40,172", -50, 176, "end", "Hand remote")}
          ${callout("co--column", 326, 214, "-40,214", -50, 218, "end", "Electro-hydraulic lift")}
          ${callout("co--top", 590, 112, "626,-52 690,-52", 698, -48, "start", "C-arm compatible")}
        </g>
      </g>
      <line class="scan" x1="0" y1="-100" x2="0" y2="445"/>
      <g class="dim dim--len">
        <line class="d-ext" x1="${left}" y1="150" x2="${left}" y2="414" pathLength="1"/>
        <line class="d-ext" x1="${right}" y1="166" x2="${right}" y2="414" pathLength="1"/>
        <line class="d-line" x1="${left}" y1="405" x2="${right}" y2="405" pathLength="1"/>
        ${tick(left, 405)}${tick(right, 405)}
        <text class="d-label" x="${(left + right) / 2}" y="433" text-anchor="middle"><tspan class="d-num" data-len>2070</tspan> mm</text>
      </g>
      <g class="dim dim--h">
        <line class="d-ext d-ext--top" x1="650" y1="${top}" x2="748" y2="${top}" pathLength="1"/>
        <line class="d-line d-h" x1="740" y1="${floor}" x2="740" y2="${top}" pathLength="1"/>
        ${tick(740, floor)}<g class="d-tick-top">${tick(740, top)}</g>
        <text class="d-label d-label--h" x="756" y="${(top + floor) / 2}"><tspan class="d-cap" x="756" dy="-14">HEIGHT</tspan><tspan class="d-num" x="756" dy="26" data-h-svg>690</tspan><tspan> mm</tspan></text>
      </g>
    </svg>`;
}

module.exports = function home(data) {
  const { company: c, categories, products, testimonials, certifications } = data;
  const count = (id) => products.filter((p) => p.cat === id).length;
  const img = (id) => `assets/img/products/${id}.webp`;


  const rangePanels = categories
    .map(
      (cat, i) => `
      <a class="range-panel" href="products.html#${cat.id}">
        <span class="range-panel__num">${String(i + 1).padStart(2, "0")}</span>
        <div class="range-panel__media"><img class="fit" src="${img(cat.cover)}" alt="" ${dims(cat.cover)} loading="lazy"></div>
        <div class="range-panel__text">
          <h3>${esc(cat.name)}</h3>
          <p>${esc(cat.lead)}</p>
          <span class="range-panel__meta"><span>${count(cat.id)} models</span><span class="range-panel__go">View range ${icon.arrow}</span></span>
        </div>
      </a>`
    )
    .join("");

  const steps = [
    { img: "ksi-201", label: "Neutral", value: "690–1120", unit: "mm height", note: "Electro-hydraulic lift with minimal vibration." },
    { img: "ksi-201-3", label: "Chair position", value: "230° / 110°", unit: "flex / reflex", note: "Back up 90°, head 60° / 90°, legs to 90°." },
    { img: "ksi-201-4", label: "Trendelenburg", value: "30° / 26°", unit: "Trendelenburg / reverse", note: "Smooth tilt under full patient load." },
    { img: "ksi-201-5", label: "Lateral tilt", value: "20° / 20°", unit: "left / right", note: "For laparoscopic and lateral access." },
    { img: "ksi-201-2", label: "Top sliding", value: "0–300", unit: "mm longitudinal", note: "Full C-arm coverage without moving the patient." },
  ];

  const lightStats = [
    ["95", "Ra", "Colour rendering index"],
    ["94", "R9", "Red colour index"],
    ["4300", "K ± 200", "Colour temperature"],
    ["50,000", "h+", "LED service life"],
    ["10–100", "%", "Dimming in 9 levels"],
    ["12–35", "cm", "Adjustable light field"],
  ];

  const series = [
    { id: "ksi-108", t: "Advance series", d: "Prismatic-reflector domes from 300 to 700 mm, singly or paired. R9 94." },
    { id: "ksi-115", t: "Classic series", d: "Digital control, memory function, focus and colour temperature adjustment." },
    { id: "ksi-119", t: "Multi-dome series", d: "Die-cast aluminium multi-domes with an 8-level intensity controller." },
  ];

  const bedSteps = [
    ["back", "Back section", "0–80°"],
    ["knee", "Knee break", "0–30°"],
    ["trend", "Trendelenburg", "0–15°"],
    ["rev", "Reverse Trendelenburg", "0–15°"],
    ["lift", "Elevation", "Electric"],
  ];

  const quotes = (list) =>
    list
      .map((t) => `<figure class="quote"><blockquote>“${esc(t.quote)}”</blockquote><figcaption><strong>${esc(t.name)}</strong>${t.org ? `<span>${esc(t.org)}</span>` : ""}</figcaption></figure>`)
      .join("");

  const body = `
<!-- 01 · HERO ───────────────────────────────────────────── -->
<section class="hero" id="hero" aria-labelledby="hero-title">
  <div class="wrap hero__head">
    <div class="hero__title">
      <h1 id="hero-title" class="display hero__h1">
        <span class="line"><span>Engineered for the</span></span>
        <span class="line"><span>operating theatre.</span></span>
      </h1>
    </div>
    <div class="hero__aside">
      <p class="hero__lede" data-hero-in>OT tables, surgical lights, hospital beds and sterilizers, designed and built by KSI Plus on a family legacy that began in ${c.since}.</p>
      <div class="btn-row" data-hero-in>
        <a class="btn btn--primary" href="products.html">Explore the catalogue ${icon.arrow}</a>
        <a class="btn btn--ghost" href="contact.html">Request a quote</a>
      </div>
    </div>
  </div>
  <div class="hero__stage wrap">
    <div class="hero__grid" aria-hidden="true"></div>
    ${heroDrawing()}
    <p class="hero__hint" aria-hidden="true">Scroll to raise the table <span>↓</span></p>
    <dl class="titleblock" data-hero-in>
      <div><dt>Model</dt><dd class="code">KSI-201/ORT/EH</dd></div>
      <div><dt>Drive</dt><dd>Electro-hydraulic</dd></div>
      <div class="tb-dim"><dt>Height</dt><dd><b data-h-val>690</b> mm <span class="muted">/ 690–1120</span></dd></div>
      <div class="tb-dim"><dt>Length</dt><dd>2070 mm</dd></div>
      <a class="titleblock__link" href="products/ksi-201.html">Full specification ${icon.arrow}</a>
    </dl>
  </div>
</section>

<!-- 02 · LEGACY ─────────────────────────────────────────── -->
<section class="legacy" id="legacy" aria-label="Our legacy">
  <div class="wrap">
    <p class="legacy__statement">The Khullar family has made operation theatre equipment since 1973: first as ARKO, then KSI Medicare, and now KSI Plus.</p>
    <dl class="stats">
      <div class="stat"><dt>Making OT equipment since</dt><dd>${c.since}</dd></div>
      <div class="stat"><dt>Generations of the family</dt><dd>3</dd></div>
      <div class="stat"><dt>Products in the catalogue</dt><dd>${products.length}</dd></div>
      <div class="stat"><dt>Certification</dt><dd class="stat__text">CE · ISO 13485</dd></div>
    </dl>
  </div>
</section>

<!-- 03 · RANGE (horizontal) ────────────────────────────── -->
<section class="range" id="range" aria-labelledby="range-title">
  <div class="range__pin">
    <div class="range__head wrap">
      <div>
        <h2 id="range-title" class="h2">${products.length} products in ${categories.length} categories</h2>
      </div>
      <div class="range__progress" aria-hidden="true"><span class="range__count"><b data-range-index>01</b> / ${String(categories.length).padStart(2, "0")}</span><i><span data-range-bar></span></i></div>
    </div>
    <div class="range__viewport">
      <div class="range__track" data-range-track>${rangePanels}</div>
    </div>
  </div>
</section>

<!-- 04 · OT TABLE IN MOTION ────────────────────────────── -->
<section class="motion" id="motion" aria-labelledby="motion-title">
  <div class="motion__pin wrap">
    <div class="motion__copy">
      <p class="eyebrow">KSI-201/ORT/EH · URAP series</p>
      <h2 id="motion-title" class="h2">How the KSI-201 moves</h2>
      <p class="muted motion__lede">The electro-hydraulic table’s main positions, with the travel for each from the catalogue. Scroll to step through them.</p>
      <ol class="motion__steps">
        ${steps.map((s, i) => `<li data-step="${i}"><span class="motion__idx">${String(i + 1).padStart(2, "0")}</span><span class="motion__label">${s.label}</span></li>`).join("")}
      </ol>
      <a class="link-arrow" href="products/ksi-201.html">Full specification ${icon.arrow}</a>
    </div>
    <div class="motion__stage">
      <div class="motion__frames">
        ${steps.map((s, i) => `<img class="fit" src="${img(s.img)}" alt="KSI-201 — ${s.label}" ${dims(s.img)} data-frame="${i}" loading="lazy">`).join("")}
      </div>
      <div class="motion__readout" aria-live="off">
        ${steps.map((s, i) => `<div class="readout" data-readout="${i}"><span class="readout__value">${s.value}</span><span class="readout__unit">${s.unit}</span><span class="readout__note">${s.note}</span></div>`).join("")}
      </div>
      <div class="motion__bar" aria-hidden="true"><span data-motion-bar></span></div>
    </div>
  </div>
</section>

<!-- 05 · SURGICAL LIGHT ────────────────────────────────── -->
<section class="light dark" id="light" aria-labelledby="light-title">
  <div class="wrap">
    <div class="light__top">
      <div class="light__copy">
        <h2 id="light-title" class="h2">Operation theatre lights</h2>
        <div class="light__lux"><span class="light__num" data-lux>0</span><span class="light__unit">lux<br>per 700 mm dome</span></div>
        <p class="light__lede">Advance-series domes use prismatic reflectors with three LEDs in each. The 700 mm dome gives 1,60,000 lux with a colour rendering index of 95, and dims from 10 to 100% in nine steps.</p>
      </div>
      <div class="light__lamp" aria-hidden="true">
        <div class="lamp__halo"></div>
        <div class="lamp__face"><img src="${img("ksi-104")}" alt=""></div>
      </div>
    </div>
    <dl class="light__stats">
      ${lightStats.map(([v, u, l]) => `<div><dt>${l}</dt><dd><span>${v}</span><small>${u}</small></dd></div>`).join("")}
    </dl>
    <div class="series">
      ${series.map((s) => `<a class="series__card" href="products/${s.id}.html"><div class="series__media"><img class="fit" src="${img(s.id)}" alt="" ${dims(s.id)} loading="lazy"></div><h3>${s.t}</h3><p>${s.d}</p><span class="link-arrow">See model ${icon.arrow}</span></a>`).join("")}
    </div>
  </div>
</section>

<!-- 06 · BEDS ──────────────────────────────────────────── -->
<section class="beds" id="beds" aria-labelledby="beds-title">
  <div class="beds__pin wrap">
    <div class="beds__copy">
      <h2 id="beds-title" class="h2">ICU bed positions</h2>
      <p class="muted">The 4/5-function ICU beds come in electric, mechanical and hybrid versions. Their lifting linkages use solid high-grade bar instead of hollow pipe.</p>
      <ul class="beds__list">
        ${bedSteps.map(([k, l, v]) => `<li data-bed="${k}"><span>${l}</span><b>${v}</b></li>`).join("")}
      </ul>
      <a class="link-arrow" href="products.html#hospital-beds">All ${count("hospital-beds")} bed models ${icon.arrow}</a>
    </div>
    <div class="beds__visual">
      <div class="beds__readout"><span data-bed-angle>0°</span><small data-bed-label>Flat</small></div>
      <svg class="bed-svg" viewBox="0 0 640 360" role="img" aria-label="Animated diagram of an ICU bed moving through its positions">
        <defs>
          <linearGradient id="floor" x1="0" x2="1"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".5" stop-color="currentColor" stop-opacity=".25"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient>
        </defs>
        <rect x="40" y="328" width="560" height="2" fill="url(#floor)"/>
        <g class="bed-base">
          <rect x="120" y="282" width="400" height="12" rx="6" class="bed-frame"/>
          <circle cx="140" cy="312" r="15" class="bed-wheel"/><circle cx="140" cy="312" r="5" class="bed-hub"/>
          <circle cx="500" cy="312" r="15" class="bed-wheel"/><circle cx="500" cy="312" r="5" class="bed-hub"/>
          <rect x="135" y="290" width="10" height="10" class="bed-frame"/><rect x="495" y="290" width="10" height="10" class="bed-frame"/>
        </g>
        <rect class="bed-column" x="300" y="200" width="40" height="86" rx="4"/>
        <g class="bed-top">
          <g class="bed-tilt">
            <rect x="96" y="196" width="448" height="10" rx="5" class="bed-frame"/>
            <rect x="72" y="120" width="22" height="96" rx="10" class="bed-board"/>
            <rect x="546" y="138" width="22" height="78" rx="10" class="bed-board"/>
            <g class="seg-back"><rect x="98" y="172" width="178" height="22" rx="8" class="bed-mattress"/><rect x="108" y="160" width="58" height="14" rx="7" class="bed-pillow"/></g>
            <rect x="278" y="172" width="86" height="22" rx="6" class="bed-mattress"/>
            <g class="seg-thigh">
              <rect x="366" y="172" width="78" height="22" rx="6" class="bed-mattress"/>
              <g class="seg-leg"><rect x="446" y="172" width="96" height="22" rx="8" class="bed-mattress"/></g>
            </g>
          </g>
        </g>
      </svg>
      <img class="beds__photo" src="${img("ksi-301")}" alt="KSI-301E-HBP electric ICU bed" loading="lazy">
    </div>
  </div>
</section>

<!-- 07 · QUALITY ───────────────────────────────────────── -->
<section class="quality" id="quality" aria-labelledby="quality-title">
  <div class="wrap quality__grid">
    <div class="quality__copy">
      <h2 id="quality-title" class="h2">Certifications</h2>
      <p class="muted">Our OT tables, lights and hospital furniture are built at our works in Derabassi, Punjab, under a quality management system certified for medical devices.</p>
      <ul class="quality__list">
        <li><b>CE</b><span>Certificate of compliance</span></li>
        <li><b>ISO 13485:2016</b><span>Medical devices QMS</span></li>
        <li><b>ISO 9001:2015</b><span>Quality management</span></li>
        <li><b><img src="assets/img/brand/make-in-india.webp" alt="Make in India" width="76" height="35"></b><span>Designed & manufactured in India</span></li>
      </ul>
    </div>
    <div class="quality__fan" aria-hidden="true">
      ${certifications.map((x, i) => `<figure class="cert" style="--i:${i}"><img src="assets/img/brand/${x.img}.webp" alt="" loading="lazy"></figure>`).join("")}
    </div>
  </div>
</section>

<!-- 08 · VOICES ────────────────────────────────────────── -->
<section class="voices" id="voices" aria-labelledby="voices-title">
  <div class="wrap voices__head">
    <h2 id="voices-title" class="h2">What hospitals say</h2>
  </div>
  <div class="wrap voices__grid">${quotes(testimonials.slice(0, 6))}</div>
  <div class="wrap voices__more"><a class="link-arrow" href="about.html#voices">Read all ${testimonials.length} testimonials ${icon.arrow}</a></div>
</section>

<!-- 09 · NEXT ─────────────────────────────────────────── -->
<section class="next dark" id="next" aria-labelledby="next-title">
  <div class="wrap next__inner">
    <div class="next__media" aria-hidden="true"><img src="assets/img/brand/robot.webp" alt=""></div>
    <div>
      <p class="eyebrow eyebrow--light">Coming soon</p>
      <h2 id="next-title" class="h2">Surgical robotics, made in India</h2>
      <p class="next__lede">KSI Plus is developing robotic arms for surgery. Register your interest and we will contact you when they are available.</p>
      <a class="btn btn--outline-light" href="contact.html">Register your interest ${icon.arrow}</a>
    </div>
  </div>
</section>

<!-- 10 · VISIT ─────────────────────────────────────────── -->
<section class="visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="visit__head">
      <h2 id="visit-title" class="h2">Offices and works</h2>
    </div>
    <div class="visit__grid">
      ${c.offices
        .map(
          (o) => `<div class="office">
        <h3>${esc(o.title)}</h3>
        ${o.sub ? `<p class="muted">${esc(o.sub)}</p>` : ""}
        <address>${o.lines.map(esc).join("<br>")}</address>
        ${o.phone ? `<a href="tel:${o.phone.replace(/[^+\d]/g, "")}">${icon.phone}${esc(o.phone)}</a>` : `<a href="tel:${c.phoneHref}">${icon.phone}${esc(c.phone)}</a>`}
        ${o.map ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.map)}" target="_blank" rel="noopener">${icon.pin}Get directions</a>` : `<a href="mailto:${o.email}">${icon.mail}${esc(o.email)}</a>`}
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>
`;

  return {
    title: "",
    description: `KSI Plus — manufacturer of operation theatre tables, LED OT lights, ICU and hospital beds, hospital furniture and steam sterilizers. ${products.length} products. Legacy since ${c.since}. Panchkula, Haryana.`,
    body,
    bodyClass: "page-home",
    scripts: ["home.js"],
    canonical: "",
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "KSI Plus",
      legalName: c.legal,
      url: c.siteUrl,
      logo: `${c.siteUrl}/assets/img/brand/ksi-plus-logo.svg`,
      email: c.email,
      telephone: c.phone,
      foundingDate: String(c.since),
      address: { "@type": "PostalAddress", streetAddress: "SCO 270, Cabin B2, Sector 14", addressLocality: "Panchkula", addressRegion: "Haryana", postalCode: "134113", addressCountry: "IN" },
    },
  };
};
