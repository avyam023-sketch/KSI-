/* Catalogue — live search, category chips that track scroll position, card reveals. */
(function () {
  "use strict";
  const { reduced, hasGsap } = window.KSISite || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const input = $("[data-search-input]");
  const sections = $$("[data-cat-section]");
  const chips = $$("[data-chip]");
  const noResults = $("[data-no-results]");
  const cards = $$(".card");

  /* Search: every word must match the card's name, code, tier or category. */
  function filter(q) {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    cards.forEach((card) => {
      const hay = card.dataset.search;
      const ok = words.every((w) => hay.includes(w));
      card.hidden = !ok;
      if (ok) shown++;
    });
    sections.forEach((s) => (s.hidden = !$$(".card:not([hidden])", s).length));
    noResults.hidden = shown > 0;
    $("[data-q]").textContent = q;
    document.body.classList.toggle("is-filtered", words.length > 0);
    if (hasGsap) ScrollTrigger.refresh();
  }
  let t;
  input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => filter(input.value), 120); });
  input.addEventListener("keydown", (e) => { if (e.key === "Escape") { input.value = ""; filter(""); } });

  /* Pre-fill from ?q= */
  const q = new URLSearchParams(location.search).get("q");
  if (q) { input.value = q; filter(q); }

  /* Active chip follows the section in view, and scrolls itself into view in the chip bar. */
  function setActive(id) {
    chips.forEach((c) => {
      const on = c.dataset.chip === id;
      c.classList.toggle("is-active", on);
      if (on) {
        const bar = c.parentElement;
        const left = c.offsetLeft - bar.clientWidth / 2 + c.clientWidth / 2;
        bar.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
      }
    });
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.catSection)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* Arriving with #category — scroll there once layout settles. */
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => window.KSIScroll.to(target), 150);
  }

  /* Cards rise in, in batches. */
  if (hasGsap && !reduced) {
    gsap.set(cards, { opacity: 0, y: 36 });
    ScrollTrigger.batch(cards, {
      start: "top 92%",
      once: true,
      onEnter: (els) => {
        // A jump (e.g. tapping a category) "enters" every card on the way: show the ones
        // already scrolled past at once, and only stagger what is actually on screen.
        const onScreen = els.filter((el) => el.getBoundingClientRect().top < window.innerHeight);
        const passed = els.filter((el) => el.getBoundingClientRect().bottom <= 0);
        if (passed.length) gsap.set(passed, { opacity: 1, y: 0, overwrite: true });
        const show = onScreen.filter((el) => !passed.includes(el));
        const rest = show.length ? show : els.filter((el) => !passed.includes(el));
        if (rest.length) gsap.to(rest, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: Math.min(0.06, 0.4 / Math.max(1, show.length)), overwrite: true,
        });
      },
    });
    gsap.from(".catbar", { y: -10, opacity: 0, duration: 0.8, delay: 0.3, ease: "power3.out" });
  }
})();
