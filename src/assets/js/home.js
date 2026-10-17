/* KSI Plus — homepage scroll choreography (GSAP + ScrollTrigger). */
(function () {
  "use strict";
  const { reduced, hasGsap } = window.KSISite || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const fmtIN = (n) => Math.round(n).toLocaleString("en-IN");

  const motionFrames = $$("[data-frame]");
  const motionReadouts = $$("[data-readout]");
  const motionSteps = $$("[data-step]");

  // Without GSAP or with reduced motion, show a calm, fully-rendered page.
  if (!hasGsap || reduced) {
    $("[data-lux]").textContent = fmtIN(160000);
    $$(".stage__beam, .stage__glow").forEach((el) => (el.style.opacity = 1));
    motionSteps[0] && motionSteps[0].classList.add("is-active");
    const firstBed = $("[data-bed]");
    firstBed && firstBed.classList.add("is-active");
    return;
  }

  const mm = gsap.matchMedia();
  const DESKTOP = "(min-width: 861px)";
  const MOBILE = "(max-width: 860px)";

  /* 01 · Hero — intro on load, then the OT light "switches on" as you scroll */
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".hero .display .line > span", { yPercent: 115, duration: 1.3, stagger: 0.09 })
    .from("[data-hero-in]", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.35)
    .from(".stage__disc", { scale: 0.86, opacity: 0, duration: 1.6 }, 0.05)
    .from(".stage__lamp", { yPercent: -28, rotate: -10, opacity: 0, duration: 1.6 }, 0.2)
    .from(".stage__table", { y: 70, opacity: 0, duration: 1.5 }, 0.3)
    .from(".stage__chips li", { scale: 0.6, opacity: 0, duration: 0.9, stagger: 0.12, ease: "back.out(2)" }, 1.0);

  mm.add(DESKTOP, () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: "#hero", start: "top top", end: "+=110%", scrub: 0.6, pin: true, anticipatePin: 1 },
    });
    tl.to(".stage__beam", { opacity: 1, duration: 1, ease: "power1.in" }, 0)
      .to(".stage__glow", { opacity: 1, duration: 1 }, 0.2)
      .fromTo(".stage__disc", { filter: "brightness(1) saturate(1)" }, { filter: "brightness(1.05) saturate(0.92)", duration: 1 }, 0)
      .fromTo(".stage__lamp", { rotate: -5 }, { rotate: 1, duration: 1.2, ease: "power1.inOut" }, 0)
      .to(".stage__table", { scale: 1.06, y: -12, duration: 1.4 }, 0)
      .to(".stage__chips li:nth-child(1)", { y: -60, duration: 1.4 }, 0)
      .to(".stage__chips li:nth-child(2)", { y: -110, duration: 1.4 }, 0)
      .to(".stage__chips li:nth-child(3)", { y: -30, duration: 1.4 }, 0)
      .to(".hero__copy", { y: -50, opacity: 0.18, duration: 1, ease: "power1.in" }, 0.5)
      .to(".hero__scroll", { opacity: 0, duration: 0.3 }, 0);
  });
  mm.add(MOBILE, () => {
    gsap.timeline({ scrollTrigger: { trigger: ".hero__stage", start: "top 70%", end: "bottom 30%", scrub: 0.5 } })
      .to(".stage__beam", { opacity: 1 }, 0)
      .to(".stage__glow", { opacity: 1 }, 0)
      .fromTo(".stage__lamp", { rotate: -5 }, { rotate: 1 }, 0);
  });

  /* Section headings rise in */
  $$(".h2").forEach((h) => {
    if (h.closest(".motion, .beds, .range")) return; // pinned sections animate their own copy
    gsap.from(h, { y: 40, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 85%", once: true } });
  });

  /* 02 · Legacy — words brighten with scroll; numbers count up */
  gsap.to(".legacy__statement .w", {
    opacity: 1, ease: "none", stagger: 0.1,
    scrollTrigger: { trigger: ".legacy__statement", start: "top 78%", end: "bottom 40%", scrub: true },
  });
  $$("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count), from = Number(el.dataset.from || 0), o = { v: from };
    el.textContent = from;
    gsap.to(o, {
      v: to, duration: to > 1000 ? 1.8 : 1.4, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = Math.round(o.v)),
    });
  });

  /* 03 · Range — vertical scroll drives a horizontal track */
  mm.add(DESKTOP, () => {
    const track = $("[data-range-track]");
    const bar = $("[data-range-bar]");
    const idx = $("[data-range-index]");
    const n = $$(".range-panel", track).length;
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(), ease: "none",
      scrollTrigger: {
        trigger: "#range", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate(self) {
          bar.style.transform = `scaleX(${0.11 + self.progress * 0.89})`;
          idx.textContent = String(Math.min(n, Math.floor(self.progress * n) + 1)).padStart(2, "0");
        },
      },
    });
    // Product images drift inside their panels for depth.
    $$(".range-panel__media img", track).forEach((img) => {
      gsap.fromTo(img, { xPercent: 10 }, {
        xPercent: -10, ease: "none",
        scrollTrigger: { trigger: img.closest(".range-panel"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
      });
    });
    gsap.from(".range__head > *", { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: "#range", start: "top 70%", once: true } });
  });

  /* 04 · OT table in motion — scroll scrubs through the table's positions */
  (function motion() {
    const n = motionFrames.length;
    const bar = $("[data-motion-bar]");
    let active = -1;
    function render(progress) {
      const pos = progress * (n - 1);
      motionFrames.forEach((img, i) => {
        const d = pos - i;
        const o = clamp((0.5 - Math.abs(d)) * 8 + 0.5);
        img.style.opacity = o;
        img.style.transform = `translateX(${(-d * 36).toFixed(1)}px) scale(${(0.965 + 0.035 * o).toFixed(3)})`;
      });
      motionReadouts.forEach((el, i) => {
        const d = pos - i;
        const o = clamp((0.5 - Math.abs(d)) * 8 - 0.5);
        el.style.opacity = o;
        el.style.transform = `translateY(${(d * -18).toFixed(1)}px)`;
      });
      const a = Math.round(pos);
      if (a !== active) {
        active = a;
        motionSteps.forEach((li, i) => li.classList.toggle("is-active", i === a));
      }
      bar.style.transform = `scaleX(${progress})`;
    }
    render(0);
    mm.add("all", () => {
      ScrollTrigger.create({
        trigger: "#motion", start: "top top", end: () => `+=${n * 70}%`, pin: true, anticipatePin: 1,
        onUpdate: (self) => render(self.progress),
      });
    });
    gsap.from(".motion__copy > *", { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "#motion", start: "top 70%", once: true } });
  })();

  /* 05 · Surgical light — count to 1,60,000 lux while the lamp's halo grows */
  (function light() {
    const lux = $("[data-lux]");
    const o = { v: 0 };
    gsap.to(o, {
      v: 160000, ease: "power2.out",
      scrollTrigger: { trigger: "#light", start: "top 75%", end: "top 15%", scrub: 0.6 },
      onUpdate: () => (lux.textContent = fmtIN(Math.round(o.v / 1000) * 1000)),
    });
    gsap.timeline({ scrollTrigger: { trigger: ".light__lamp", start: "top 85%", end: "center 40%", scrub: 0.6 } })
      .to(".lamp__halo", { opacity: 1, scale: 1.08, ease: "power1.in" }, 0)
      .from(".lamp__face", { scale: 0.9, rotate: -8 }, 0);
    gsap.from(".light__stats > div", { y: 30, opacity: 0, duration: 0.9, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".light__stats", start: "top 88%", once: true } });
    gsap.from(".series__card", { y: 50, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".series", start: "top 85%", once: true } });
  })();

  /* 06 · Beds — an articulated bed diagram driven by scroll */
  (function beds() {
    const angle = $("[data-bed-angle]");
    const label = $("[data-bed-label]");
    const items = $$("[data-bed]");
    const labels = ["Back section", "Knee break", "Trendelenburg", "Reverse Trendelenburg", "Elevation"];
    const back = $(".seg-back"), thigh = $(".seg-thigh"), leg = $(".seg-leg"), tilt = $(".bed-tilt"), top = $(".bed-top"), column = $(".bed-column");
    gsap.set(back, { svgOrigin: "277 183" });
    gsap.set(thigh, { svgOrigin: "365 183" });
    gsap.set(leg, { svgOrigin: "445 183" });
    gsap.set(tilt, { svgOrigin: "320 201" });
    gsap.set(column, { svgOrigin: "320 286" });

    const STEP = 1, HOLD = 0.45, SEG = STEP + HOLD;
    const tl = gsap.timeline({ defaults: { duration: STEP, ease: "power2.inOut" }, paused: true });
    tl.to(back, { rotation: 80 }, 0)
      .to(back, { rotation: 18 }, SEG)
      .to(thigh, { rotation: -30 }, SEG)
      .to(leg, { rotation: 40 }, SEG)
      .to([back, thigh, leg], { rotation: 0 }, SEG * 2)
      .to(tilt, { rotation: -15 }, SEG * 2)
      .to(tilt, { rotation: 15, duration: STEP * 1.2 }, SEG * 3)
      .to(tilt, { rotation: 0 }, SEG * 4)
      .to(top, { y: -46 }, SEG * 4)
      .to(column, { scaleY: 1.55 }, SEG * 4)
      .set({}, {}, SEG * 5);

    let current = -1;
    function readout() {
      const t = tl.time();
      const step = Math.min(4, Math.floor(t / SEG));
      if (step !== current) {
        current = step;
        items.forEach((li, i) => li.classList.toggle("is-active", i === step));
        label.textContent = labels[step];
      }
      let v;
      if (step === 0) v = `${Math.round(gsap.getProperty(back, "rotation"))}°`;
      else if (step === 1) v = `${Math.round(Math.abs(gsap.getProperty(thigh, "rotation")))}°`;
      else if (step === 2 || step === 3) v = `${Math.round(Math.abs(gsap.getProperty(tilt, "rotation")))}°`;
      else v = Math.abs(gsap.getProperty(top, "y")) > 2 ? "↑" : "–";
      angle.textContent = v;
    }
    tl.eventCallback("onUpdate", readout);
    readout();

    mm.add("all", () => {
      ScrollTrigger.create({
        trigger: "#beds", start: "top top", end: "+=260%", pin: true, anticipatePin: 1,
        onUpdate: (self) => gsap.to(tl, { time: self.progress * tl.duration(), duration: 0.35, ease: "power2.out", overwrite: true }),
      });
    });
    gsap.from(".beds__copy > *", { y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: "#beds", start: "top 70%", once: true } });
  })();

  /* 07 · Quality — certificates fan out from a stack */
  mm.add({ desk: DESKTOP, mob: MOBILE }, (ctx) => {
    const certs = $$(".cert");
    const spread = ctx.conditions.desk ? 0.64 : 0.5;
    const w = () => certs[0].offsetWidth;
    gsap.set(certs, { xPercent: -50, yPercent: -50, rotation: (i) => (i - 1.5) * 4, x: (i) => (i - 1.5) * 6 });
    gsap.to(certs, {
      x: (i) => (i - 1.5) * w() * spread,
      y: (i) => [18, -10, -10, 18][i],
      rotation: (i) => [-9, -3, 3, 9][i],
      ease: "power2.out",
      scrollTrigger: { trigger: ".quality__fan", start: "top 85%", end: "center 50%", scrub: 0.8, invalidateOnRefresh: true },
    });
  });
  gsap.from(".quality__list li", { y: 20, opacity: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".quality__list", start: "top 88%", once: true } });

  /* 08 · Voices — two marquees whose speed follows scroll velocity */
  (function marquee() {
    const loops = $$("[data-marquee]").map((m) => {
      const dir = Number(m.dataset.marquee);
      const track = $(".marquee__track", m);
      return gsap.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 70, ease: "none", repeat: -1 });
    });
    const boost = { v: 1 };
    ScrollTrigger.create({
      trigger: "#voices", start: "top bottom", end: "bottom top",
      onToggle: (self) => loops.forEach((l) => (self.isActive ? l.play() : l.pause())),
      onUpdate: (self) => {
        const v = 1 + Math.min(6, Math.abs(self.getVelocity()) / 350);
        gsap.to(boost, { v, duration: 0.2, overwrite: true, onUpdate: () => loops.forEach((l) => l.timeScale(boost.v)) });
        gsap.to(boost, { v: 1, duration: 1.2, delay: 0.25, ease: "power2.out", onUpdate: () => loops.forEach((l) => l.timeScale(boost.v)) });
      },
    });
  })();

  /* 09 · Next — slow float */
  gsap.to(".next__media", { y: -14, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.from(".next__media", { scale: 0.8, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "#next", start: "top 75%", once: true } });

  /* 10 · Offices */
  gsap.from(".visit .office", { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".visit__grid", start: "top 85%", once: true } });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
