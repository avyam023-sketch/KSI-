#!/usr/bin/env node
/*
 * Static site builder for KSI Plus.
 * Reads the catalogue from src/assets/js/data.js and writes a fully static
 * site into dist/ (one HTML file per page and per product, plus sitemap).
 * No dependencies: `node scripts/build.js`
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const data = require(path.join(SRC, "assets/js/data.js"));
const { layout } = require("./lib/layout");
const pages = {
  home: require("./pages/home"),
  catalogue: require("./pages/catalogue"),
  product: require("./pages/product"),
  about: require("./pages/about"),
  contact: require("./pages/contact"),
  notFound: require("./pages/not-found"),
};

function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}
function write(rel, html) {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

// Validate that every product has an image and a known category.
const catIds = new Set(data.categories.map((c) => c.id));
const imgDir = path.join(SRC, "assets/img/products");
const problems = [];
for (const p of data.products) {
  if (!catIds.has(p.cat)) problems.push(`${p.id}: unknown category ${p.cat}`);
  if (!fs.existsSync(path.join(imgDir, `${p.id}.webp`))) problems.push(`${p.id}: missing image`);
  for (const [g] of p.gallery || []) if (!fs.existsSync(path.join(imgDir, `${g}.webp`))) problems.push(`${p.id}: missing gallery image ${g}`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

rmrf(DIST);
copyDir(path.join(SRC, "assets"), path.join(DIST, "assets"));
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
for (const f of ["robots.txt", "favicon.svg"]) if (fs.existsSync(path.join(SRC, f))) fs.copyFileSync(path.join(SRC, f), path.join(DIST, f));

const built = [];
function emit(rel, page) {
  write(rel, layout({ ...page, data, depth: rel.split("/").length - 1 }));
  built.push(rel);
}

emit("index.html", pages.home(data));
emit("products.html", pages.catalogue(data));
for (const p of data.products) emit(`products/${p.id}.html`, pages.product(data, p));
emit("about.html", pages.about(data));
emit("contact.html", pages.contact(data));
emit("404.html", pages.notFound(data));

const today = new Date().toISOString().slice(0, 10);
const urls = built.filter((r) => r !== "404.html").map((r) => {
  const loc = `${data.company.siteUrl}/${r === "index.html" ? "" : r}`;
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod></url>`;
});
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);

console.log(`Built ${built.length} pages, ${data.products.length} products → dist/`);
