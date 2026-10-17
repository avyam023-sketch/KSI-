/* Catalogue — every product, grouped by category, with search and category jump-nav. */
const { esc, icon, productCard } = require("../lib/layout");

module.exports = function catalogue(data) {
  const { categories, products } = data;
  const count = (id) => products.filter((p) => p.cat === id).length;

  const chips = categories
    .map((c) => `<a class="chip" href="#${c.id}" data-chip="${c.id}">${esc(c.short)}<span>${count(c.id)}</span></a>`)
    .join("");

  const sections = categories
    .map(
      (c, i) => `
  <section class="cat-section" id="${c.id}" data-cat-section="${c.id}" aria-labelledby="h-${c.id}">
    <header class="cat-section__head">
      <span class="cat-section__num">${String(i + 1).padStart(2, "0")}</span>
      <div>
        <h2 id="h-${c.id}" class="h3">${esc(c.name)}</h2>
        <p class="muted">${esc(c.lead)}</p>
      </div>
      <span class="cat-section__count">${count(c.id)} models</span>
    </header>
    <div class="grid">${products.filter((p) => p.cat === c.id).map((p) => productCard(p, data, 0)).join("")}</div>
  </section>`
    )
    .join("");

  const body = `
<section class="page-hero page-hero--catalogue">
  <div class="wrap">
    <p class="eyebrow">${products.length} models · ${categories.length} categories</p>
    <h1 class="display display--md">Product catalogue</h1>
    <p class="page-hero__lede">Search by name or model code, or jump to a category. Tap + on any product to add it to an enquiry list, then send the list to us in one message.</p>
  </div>
</section>
<div class="catbar" data-catbar>
  <div class="wrap catbar__inner">
    <label class="search">
      ${icon.search}
      <span class="sr-only">Search products</span>
      <input type="search" placeholder="Search products or model codes" data-search-input autocomplete="off">
    </label>
    <nav class="chips" aria-label="Categories">${chips}</nav>
  </div>
</div>
<div class="wrap catalogue">
  ${sections}
  <div class="no-results" data-no-results hidden>
    <h2 class="h3">No products match “<span data-q></span>”.</h2>
    <p class="muted">Try a model code, or ask our team.</p>
    <a class="btn btn--primary" href="contact.html">Ask our team ${icon.arrow}</a>
  </div>
</div>`;

  return {
    title: "Product Catalogue — OT Tables, OT Lights, Hospital Beds & Furniture",
    description: `Browse all ${products.length} KSI Plus products: operation theatre tables, LED surgical lights, ICU and hospital beds, trolleys, crash carts, sterilizers, hollowware and infant care.`,
    body,
    active: "products",
    bodyClass: "page-catalogue",
    scripts: ["catalogue.js"],
    canonical: "products.html",
  };
};
