/* About — legacy, leadership, quality, testimonials. */
const { esc, icon } = require("../lib/layout");

module.exports = function about(data) {
  const { company: c, testimonials, certifications, products, categories } = data;

  const timeline = [
    ["1973", "ARKO is founded", "Late Shri R.K. Khullar establishes ARKO, the foundation of the family's medical manufacturing legacy."],
    ["Then", "KSI Medicare", "Deepak Kumar Khullar, after years mastering OT tables and surgical lights at ARKO, builds KSI Medicare into a trusted supplier for hospitals from Punjab to Assam."],
    ["Today", "KSI Plus", `A new generation of equipment: ${products.length} products across ${categories.length} categories, CE and ISO 13485 certified, manufactured at our own works in Derabassi.`],
    ["Soon", "Surgical robotics", "Homegrown robotic arms for next-generation surgery, now in development."],
  ];

  const leaders = [
    ["DK", "Deepak Kumar Khullar", "Carrying the legacy forward", "Over 30 years mastering operation tables, surgical lights and hospital infrastructure. He carries forward the legacy his father began at ARKO."],
    ["RM", "Rohit Marwha", "Marketing, sales & business development", "Began his career at Ranbaxy, rising to Zonal Head. Leads KSI's market strategy, outreach and customer engagement."],
    ["MK", "Mehul Khullar", "Engineering & operations", "Third generation of the Khullar family. B.Tech in Mechanical Engineering, educated at The Lawrence School, Sanawar. Drives technical innovation and operational precision."],
  ];

  const body = `
<section class="page-hero page-hero--about">
  <div class="wrap page-hero__split">
    <div>
      <p class="eyebrow">About KSI Plus</p>
      <h1 class="display display--md">A legacy <em>since ${c.since}.</em></h1>
    </div>
    <p class="page-hero__lede">KSI Plus is the latest chapter of a family of Indian medical manufacturers that has equipped operating theatres for more than five decades. We design, build and support the equipment ourselves, from our office in Panchkula and our works in Derabassi.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <ol class="timeline" data-timeline>
      ${timeline.map(([y, t, d]) => `<li class="timeline__item" data-reveal><span class="timeline__year">${y}</span><div><h2 class="h4">${t}</h2><p class="muted">${d}</p></div></li>`).join("")}
    </ol>
  </div>
</section>

<section class="section section--tint" aria-labelledby="lead-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Leadership</p>
      <h2 id="lead-title" class="h2">Legacy, innovation <em>and market expertise.</em></h2>
    </div>
    <div class="leaders">
      ${leaders.map(([i, n, r, d]) => `<article class="leader" data-reveal><span class="leader__mono" aria-hidden="true">${i}</span><h3>${n}</h3><p class="leader__role">${r}</p><p class="muted">${d}</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section" id="quality" aria-labelledby="q-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Quality & compliance</p>
        <h2 id="q-title" class="h2">Built for reliability. <em>Certified for it.</em></h2>
      </div>
      <p class="muted">Our quality management system is certified for medical devices, and our products carry CE certificates of compliance. Copies of certificates are available on request.</p>
    </div>
    <div class="certs">
      ${certifications.map((x) => `<figure class="cert-card" data-reveal><div class="cert-card__img"><img src="assets/img/brand/${x.img}.webp" alt="${esc(x.title)} certificate" loading="lazy"></div><figcaption><strong>${esc(x.title)}</strong><span>${esc(x.by)}</span></figcaption></figure>`).join("")}
    </div>
  </div>
</section>

<section class="section section--tint" id="voices" aria-labelledby="v-title">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Testimonials</p>
      <h2 id="v-title" class="h2">What hospitals <em>say about us.</em></h2>
    </div>
    <div class="quotes-grid">
      ${testimonials.map((t) => `<figure class="quote quote--card" data-reveal><blockquote>“${esc(t.quote)}”</blockquote><figcaption><strong>${esc(t.name)}</strong>${t.org ? `<span>${esc(t.org)}</span>` : ""}</figcaption></figure>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap facilities">
    ${c.offices.map((o) => `<div class="office" data-reveal><h3>${esc(o.title)}</h3>${o.sub ? `<p class="muted">${esc(o.sub)}</p>` : ""}<address>${o.lines.map(esc).join("<br>")}</address>${o.phone ? `<a href="tel:${o.phone.replace(/[^+\d]/g, "")}">${icon.phone}${esc(o.phone)}</a>` : ""}</div>`).join("")}
  </div>
</section>`;

  return {
    title: "About — A Legacy in Medical Equipment Since 1973",
    description: "KSI Plus continues a legacy that began with ARKO in 1973. Meet our leadership, see our certifications (CE, ISO 13485:2016, ISO 9001:2015) and read what hospitals say about us.",
    body,
    active: "about",
    bodyClass: "page-about",
    canonical: "about.html",
  };
};
