/* Product detail page — one static page per product. */
const { esc, icon, productCard, productName, dims } = require("../lib/layout");

module.exports = function product(data, p) {
  const { categories, products, company: c } = data;
  const cat = categories.find((x) => x.id === p.cat);
  const siblings = products.filter((x) => x.cat === p.cat);
  const idx = siblings.indexOf(p);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const related = siblings.filter((x) => x !== p).slice(Math.max(0, idx - 1), Math.max(0, idx - 1) + 4);
  const images = [[p.id, p.name]].concat(p.gallery || []);
  const imgSrc = (id) => `../assets/img/products/${id}.webp`;
  const waText = encodeURIComponent(`Hello KSI Plus, I would like a quote for ${p.code} — ${productName(p)}.`);

  const gallery = `
    <div class="pdp__gallery" data-gallery>
      <div class="pdp__stage">
        ${images.map(([id, cap], i) => `<figure class="pdp__frame${i === 0 ? " is-active" : ""}" data-frame="${i}"><img class="fit" src="${imgSrc(id)}" alt="${esc(p.name)}${i ? ` — ${esc(cap)}` : ""}" ${dims(id)} ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>${i ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`).join("")}
      </div>
      ${images.length > 1 ? `<div class="pdp__thumbs" role="tablist" aria-label="Product views">${images.map(([id, cap], i) => `<button type="button" role="tab" class="${i === 0 ? "is-active" : ""}" aria-selected="${i === 0}" data-thumb="${i}" aria-label="${esc(i ? cap : "Main view")}"><img src="${imgSrc(id)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
    </div>`;

  const specs = p.specs && p.specs.length
    ? `<div class="spec-block">
        <h2 class="h4">Specification</h2>
        <dl class="spec-table">${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </div>`
    : "";

  const lists = (p.lists || [])
    .map(([t, items]) => `<div class="spec-block"><h2 class="h4">${esc(t)}</h2><ul class="ticks">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`)
    .join("");

  const body = `
<div class="pdp wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="../index.html">Home</a><span>/</span><a href="../products.html">Products</a><span>/</span><a href="../products.html#${cat.id}">${esc(cat.short)}</a><span>/</span><span aria-current="page">${esc(p.code)}</span>
  </nav>
  <div class="pdp__top">
    ${gallery}
    <div class="pdp__info">
      <p class="code code--lg">${esc(p.code)}</p>
      <h1 class="pdp__title">${esc(p.name)}</h1>
      ${p.tier ? `<p class="pdp__tier">${esc(p.tier)}</p>` : ""}
      <p class="pdp__desc">${esc(p.desc)}</p>
      ${(p.more || []).map((m) => `<p class="muted">${esc(m)}</p>`).join("")}
      ${p.tags && p.tags.length ? `<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      <div class="pdp__cta">
        <button class="btn btn--primary" type="button" data-enquire="${p.id}" data-enquire-label>${icon.plus}<span>Add to enquiry list</span></button>
        <a class="btn btn--ghost" href="https://wa.me/${c.whatsapp}?text=${waText}" target="_blank" rel="noopener">${icon.whatsapp} Ask on WhatsApp</a>
      </div>
      <p class="pdp__assist">${icon.phone} Speak to our product team: <a href="tel:${c.phoneHref}">${esc(c.phone)}</a></p>
    </div>
  </div>

  ${specs || lists ? `<div class="pdp__details">${specs}${lists}</div>` : ""}

  <nav class="pdp__pager" aria-label="More in ${esc(cat.short)}">
    <a href="${prev.id}.html" rel="prev"><small>Previous</small><span>${esc(prev.code)}</span></a>
    <a href="../products.html#${cat.id}" class="pdp__pager-all">All ${esc(cat.short)}</a>
    <a href="${next.id}.html" rel="next"><small>Next</small><span>${esc(next.code)}</span></a>
  </nav>

  ${related.length ? `<section class="related" aria-labelledby="rel-title"><h2 id="rel-title" class="h3">More in ${esc(cat.name)}</h2><div class="grid grid--4">${related.map((x) => productCard(x, data, 1)).join("")}</div></section>` : ""}
</div>`;

  return {
    title: `${p.code} ${productName(p)}`,
    description: `${p.code} ${productName(p)} by KSI Plus. ${p.desc}`.slice(0, 300),
    body,
    active: "products",
    bodyClass: "page-product",
    scripts: ["product.js"],
    canonical: `products/${p.id}.html`,
    ogImage: `assets/img/products/${p.id}.webp`,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productName(p),
      sku: p.code,
      mpn: p.code,
      category: cat.name,
      description: p.desc,
      image: `${c.siteUrl}/assets/img/products/${p.id}.webp`,
      brand: { "@type": "Brand", name: "KSI Plus" },
      manufacturer: { "@type": "Organization", name: c.legal },
    },
  };
};
