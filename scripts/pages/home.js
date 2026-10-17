/* Homepage — a scroll-driven story. Each <section> pairs with a block in assets/js/home.js. */
const { esc, icon, dims } = require("../lib/layout");

module.exports = function home(data) {
  const { company: c, categories, products, testimonials, certifications } = data;
  const count = (id) => products.filter((p) => p.cat === id).length;
  const img = (id) => `assets/img/products/${id}.webp`;

  const words = (s) =>
    s.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");

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
  const half = Math.ceil(testimonials.length / 2);

  const body = `
<!-- 01 · HERO ───────────────────────────────────────────── -->
<section class="hero" id="hero" aria-labelledby="hero-title">
  <div class="hero__inner wrap">
    <div class="hero__copy">
      <p class="eyebrow" data-hero-in>Medical equipment manufacturer · Panchkula, India</p>
      <h1 id="hero-title" class="display">
        <span class="line"><span>Built for</span></span>
        <span class="line"><span>professionals.</span></span>
        <span class="line"><span><em>Designed for</em></span></span>
        <span class="line"><span><em>better healthcare.</em></span></span>
      </h1>
      <p class="hero__lede" data-hero-in>Operation theatre tables, surgical lights, hospital beds and sterilization systems — engineered and manufactured in India, on a legacy that began in ${c.since}.</p>
      <div class="btn-row" data-hero-in>
        <a class="btn btn--primary" href="products.html">Explore the catalogue ${icon.arrow}</a>
        <a class="btn btn--ghost" href="contact.html">Request a quote</a>
      </div>
    </div>
    <div class="hero__stage" aria-hidden="true">
      <div class="stage__disc"></div>
      <div class="stage__beam"></div>
      <img class="stage__lamp" src="${img("ksi-103")}" alt="">
      <div class="stage__glow"></div>
      <img class="stage__table" src="${img("ksi-201")}" alt="">
      <ul class="stage__chips">
        <li><span>Electro-hydraulic</span></li>
        <li><span>C-arm compatible</span></li>
        <li><span>1,30,000 lux</span></li>
      </ul>
    </div>
  </div>
  <div class="hero__scroll" aria-hidden="true"><span>Scroll</span><i></i></div>
</section>

<!-- 02 · LEGACY ─────────────────────────────────────────── -->
<section class="legacy" id="legacy" aria-label="Our legacy">
  <div class="wrap">
    <p class="eyebrow">Since ${c.since}</p>
    <p class="legacy__statement" data-words>${words("Three generations of the Khullar family have built the equipment Indian surgeons rely on — from ARKO in 1973, to KSI Medicare, to KSI Plus today.")}</p>
    <dl class="stats">
      <div class="stat"><dt>Legacy began</dt><dd><span data-count="${c.since}" data-from="1900">${c.since}</span></dd></div>
      <div class="stat"><dt>Generations of engineering</dt><dd><span data-count="3">3</span></dd></div>
      <div class="stat"><dt>Products in the range</dt><dd><span data-count="${products.length}">${products.length}</span></dd></div>
      <div class="stat"><dt>Certified</dt><dd class="stat__text">CE · ISO 13485</dd></div>
    </dl>
  </div>
</section>

<!-- 03 · RANGE (horizontal) ────────────────────────────── -->
<section class="range" id="range" aria-labelledby="range-title">
  <div class="range__pin">
    <div class="range__head wrap">
      <div>
        <p class="eyebrow">The complete range</p>
        <h2 id="range-title" class="h2">Nine categories. <em>One manufacturer.</em></h2>
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
      <h2 id="motion-title" class="h2">One table. <em>Every position.</em></h2>
      <p class="muted motion__lede">Our electro-hydraulic table moves through each surgical position smoothly and precisely, with C-arm compatibility built in.</p>
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
        <p class="eyebrow eyebrow--light">Operation theatre lights</p>
        <h2 id="light-title" class="h2">Shadow-less light, <em>true to tissue.</em></h2>
        <div class="light__lux"><span class="light__num" data-lux>0</span><span class="light__unit">lux<br>per 700 mm dome</span></div>
        <p class="light__lede">Prismatic reflectors, each housing three LEDs, deliver deep, even illumination with colour rendering that lets surgeons read tissue accurately — with minimal heat for a cool, comfortable theatre.</p>
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
      <p class="eyebrow">Hospital & ICU beds</p>
      <h2 id="beds-title" class="h2">Five functions. <em>One touch.</em></h2>
      <p class="muted">Our 4/5-function ICU beds lift on solid high-grade bar rather than hollow pipe, for precise adjustment and longer actuator life. Electric, mechanical and hybrid versions.</p>
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
      <p class="eyebrow">Quality & compliance</p>
      <h2 id="quality-title" class="h2">Certified to <em>international standards.</em></h2>
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
    <p class="eyebrow">In their words</p>
    <h2 id="voices-title" class="h2">Trusted by surgeons <em>for decades.</em></h2>
  </div>
  <div class="marquee" data-marquee="1"><div class="marquee__track">${quotes(testimonials.slice(0, half))}${quotes(testimonials.slice(0, half))}</div></div>
  <div class="marquee" data-marquee="-1"><div class="marquee__track">${quotes(testimonials.slice(half))}${quotes(testimonials.slice(half))}</div></div>
</section>

<!-- 09 · NEXT ─────────────────────────────────────────── -->
<section class="next dark" id="next" aria-labelledby="next-title">
  <div class="wrap next__inner">
    <div class="next__media" aria-hidden="true"><img src="assets/img/brand/robot.webp" alt=""></div>
    <div>
      <p class="eyebrow eyebrow--light">Coming soon</p>
      <h2 id="next-title" class="h2">Homegrown robotic arms <em>for next-generation surgery.</em></h2>
      <p class="next__lede">India-made surgical robotics, developed on the same engineering foundation as our OT tables and lights.</p>
      <a class="btn btn--outline-light" href="contact.html">Register your interest ${icon.arrow}</a>
    </div>
  </div>
</section>

<!-- 10 · VISIT ─────────────────────────────────────────── -->
<section class="visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="visit__head">
      <p class="eyebrow">Panchkula · Derabassi · Brampton</p>
      <h2 id="visit-title" class="h2">Meet the team <em>behind the equipment.</em></h2>
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
