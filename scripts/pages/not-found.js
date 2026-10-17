/* 404 page. Uses root-relative links because it can be served from any path. */
const { icon } = require("../lib/layout");

module.exports = function notFound() {
  return {
    title: "Page not found",
    description: "The page you are looking for could not be found.",
    canonical: null,
    bodyClass: "page-404",
    body: `
<section class="page-hero page-hero--404">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1 class="display display--md">This page has <em>moved or never existed.</em></h1>
    <p class="page-hero__lede">The product you are looking for may be listed under a new model code.</p>
    <div class="btn-row"><a class="btn btn--primary" href="/products.html">Browse the catalogue ${icon.arrow}</a><a class="btn btn--ghost" href="/">Go to home</a></div>
  </div>
</section>`,
  };
};
