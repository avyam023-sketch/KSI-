/* Product page — gallery switching (thumbs, arrows, swipe) and entrance motion. */
(function () {
  "use strict";
  const { reduced, hasGsap } = window.KSISite || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const gallery = $("[data-gallery]");
  const frames = $$("[data-frame]", gallery);
  const thumbs = $$("[data-thumb]", gallery);
  let current = 0;

  function show(i) {
    if (!frames.length) return;
    current = (i + frames.length) % frames.length;
    frames.forEach((f, k) => f.classList.toggle("is-active", k === current));
    thumbs.forEach((t, k) => {
      t.classList.toggle("is-active", k === current);
      t.setAttribute("aria-selected", String(k === current));
    });
  }
  thumbs.forEach((t) => t.addEventListener("click", () => show(Number(t.dataset.thumb))));
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });

  // Swipe on touch devices.
  let x0 = null;
  const stage = $(".pdp__stage", gallery);
  stage.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  if (hasGsap && !reduced) {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".pdp__stage", { y: 40, opacity: 0, duration: 1.1 })
      .from(".pdp__info > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.1);
    if (thumbs.length) intro.from(thumbs, { y: 16, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.3);
    gsap.utils.toArray(".spec-block, .related .card").forEach((el) =>
      gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } })
    );
  }
})();
