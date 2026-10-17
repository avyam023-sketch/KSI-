# KSI Plus — website

A scroll-driven marketing site and full product catalogue for **KSI Plus (K. Swaranraj Inc.)**, a Panchkula-based manufacturer of OT tables, OT lights, hospital furniture and sterilizers.

- **Home** is a scroll-driven story built with GSAP + ScrollTrigger and Lenis smooth scrolling. As you scroll, the OT light switches on over the table, the product range scrolls sideways, the KSI-201 table moves through its positions, the lux counter climbs to 1,60,000, an ICU bed diagram goes through its five functions, and the certificates fan out.
- **Catalogue** lists all 128 products from the November 2025 catalogue in 9 categories, with live search and a sticky category bar.
- **Product pages**: one static, SEO-ready page per product, with a gallery, a spec table, feature lists and related products.
- **Enquiry list**: visitors add products as they browse, set quantities, and send the whole list to KSI on WhatsApp or by email in one message. This needs no backend.
- **About** and **Contact** pages hold the legacy timeline, leadership, certifications, testimonials, the three offices and a map.

## Run it

```bash
npm run build     # writes the static site to dist/
npm run serve     # serves dist/ on http://localhost:8080
```

You need Node 18 or later and nothing else. `dist/` is committed, so you can upload it to any static host as-is (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or cPanel/Hostinger via FTP).

## Where things live

| What | File |
|---|---|
| Products, categories, testimonials, company details (phone, WhatsApp, offices) | `src/assets/js/data.js` |
| Product photos (`<product id>.webp`, gallery shots `<id>-1.webp`…) | `src/assets/img/products/` |
| Logo (vector, recovered from the catalogue PDF), certificates | `src/assets/img/brand/` |
| Page templates | `scripts/pages/*.js` (home, catalogue, product, about, contact) |
| Shared header, footer, enquiry drawer | `scripts/lib/layout.js` |
| Styles (design tokens at the top) | `src/assets/css/site.css` |
| Homepage scroll choreography | `src/assets/js/home.js` |
| Smooth scroll, header, enquiry list, forms | `src/assets/js/site.js` |
| GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13 (self-hosted) | `src/assets/vendor/` |

To add a product, add an entry to `products` in `data.js`, drop `<id>.webp` into `img/products/`, and rebuild. The build fails if a product's image is missing.

## Design

- **Palette:** warm ivory ground (`#F6F4EF`), navy ink (`#0D1B2A`), KSI logo blue (`#3F66A0` / `#4D73AA`), and a restrained sand accent drawn from the catalogue cover.
- **Type:** Manrope for headings and UI, Instrument Serif italic for accent phrases, and IBM Plex Mono for model codes.
- **Motion:** the site respects `prefers-reduced-motion`. With reduced motion, pinning and smooth scroll are switched off and every number is shown at its final value.
- Product photos use `mix-blend-mode: multiply`, so their white backgrounds blend into the tinted stages.

## Before launch: what the client needs to supply

1. **High-resolution product photography.** This is the biggest quality lever. The photos here were taken out of the catalogue PDF, and many are only 80–300 px wide. The site caps how far any photo is enlarged (about 2.2× its native size) so nothing looks pixelated, but sharp originals will lift every page. To swap them in, overwrite the files in `src/assets/img/products/`, keeping the file names.
2. **Draft items in the catalogue.** The PDF is marked as a working draft:
   - KSI-210 (electric gynaecology table) is marked "pending".
   - KSI-111 has a placeholder for "invert lights" text.
   - KSI-507 says "more matter pending".
   - Many photos are flagged "to be checked or arranged".
   - Three items on page 39 (an office table, a couch and a stretcher trolley) say "pending — for images and content" and are left out.
3. **WhatsApp number.** Confirm which number takes WhatsApp. It is currently `+91 98154 53531`, set as `company.whatsapp` in `data.js`.
4. **Leadership photos** for the About page, if wanted. Monograms are used for now.
5. **Domain.** `siteUrl` in `data.js` (for canonical links, the sitemap and Open Graph) is set to `https://www.ksiplus.com`.
6. **Optional form backend.** Enquiries open WhatsApp or the visitor's email app with a pre-filled message. If KSI wants submissions stored or emailed automatically, connect a form service.

## Copy edits made while transcribing

- Typos fixed, such as Elctro, Trendelenberg, appoxy, saline road and s20 volts.
- "Full Flower / Semi Flower" changed to **Full Fowler / Semi Fowler**.
- "Colour Reduction Index" changed to **Colour Rendering Index**.
- Long descriptions tightened.

All specifications are as printed in the catalogue.

## Previews

Desktop screenshots of the built site are in `docs/previews/`.
