/* KSI Plus — homepage scroll choreography (GSAP + ScrollTrigger). */
(function () {
  "use strict";
  const { reduced, hasGsap } = window.KSISite || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const fmtIN = (n) => Math.round(n).toLocaleString("en-IN");

  /* Hero drawing geometry, in the photo's pixel space (see heroDrawing() in scripts/pages/home.js). */
  const H = { top: 104, floor: 366, cut: 275, lift: 90, minMM: 690, maxMM: 1120 };
  const hero = {
    upper: $(".t-upper"), strip: $(".t-strip"), ext: $(".d-ext--top"), line: $(".d-h"),
    tickTop: $(".d-tick-top"), label: $(".d-label--h"), vals: $$("[data-h-svg], [data-h-val]"),
  };
  // Raise the table top by d units: the upper half moves up and a 1px slice of the
  // column is stretched to fill the gap, so the column appears to extend.
  function setLift(d) {
    hero.upper.setAttribute("transform", `translate(0 ${-d})`);
    hero.strip.setAttribute("transform", d > 0.2 ? `translate(0 ${H.cut - d}) scale(1 ${d}) translate(0 ${-(H.cut - 1)})` : "scale(1 0)");
    const top = H.top - d;
    hero.line.setAttribute("y2", top);
    hero.ext.setAttribute("y1", top);
    hero.ext.setAttribute("y2", top);
    hero.tickTop.setAttribute("transform", `translate(0 ${-d})`);
    hero.label.setAttribute("y", (top + H.floor) / 2);
    const mm = Math.round(H.minMM + (d / H.lift) * (H.maxMM - H.minMM));
    hero.vals.forEach((el) => (el.textContent = mm));
  }
  setLift(0);

  const motionFrames = $$("[data-frame]");
  const motionReadouts = $$("[data-readout]");
  const motionSteps = $$("[data-step]");

  // Without GSAP or with reduced motion, show a calm, fully-rendered page.
  if (!hasGsap || reduced) {
    $("[data-lux]").textContent = fmtIN(160000);
    motionSteps[0] && motionSteps[0].classList.add("is-active");
    const firstBed = $("[data-bed]");
    firstBed && firstBed.classList.add("is-active");
    return;
  }

  const mm = gsap.matchMedia();
  const DESKTOP = "(min-width: 861px)";
  const MOBILE = "(max-width: 860px)";

  /* 01 · Hero — the sheet draws itself on load; scrolling raises the table */
  gsap.set(".reveal-rect", { attr: { width: 0 } });
  gsap.set(".d-floor, .d-line, .d-ext, .co__lead", { strokeDashoffset: 1 });
  gsap.set(".d-tick, .d-label, .co__dot, .co__text", { opacity: 0 });
  const len = { v: 0 };
  const lenEl = $("[data-len]");
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero__h1 .line > span", { yPercent: 115, duration: 1.2, stagger: 0.1, ease: "power4.out" }, 0)
    .from("[data-hero-in]", { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.3)
    .from(".hero__grid", { opacity: 0, scale: 1.04, duration: 1.6 }, 0)
    .to(".d-floor", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.35)
    .set(".scan", { opacity: 0.85 }, 0.5)
    .to(".reveal-rect", { attr: { width: 1160 }, duration: 1.3, ease: "power2.inOut" }, 0.5)
    .fromTo(".scan", { attr: { x1: -290, x2: -290 } }, { attr: { x1: 870, x2: 870 }, duration: 1.3, ease: "power2.inOut" }, 0.5)
    .to(".scan", { opacity: 0, duration: 0.3 }, 1.7)
    .to(".d-ext", { strokeDashoffset: 0, duration: 0.6, stagger: 0.08 }, 1.4)
    .to(".d-line", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.1 }, 1.5)
    .to(".d-tick", { opacity: 1, duration: 0.3, stagger: 0.05 }, 1.9)
    .to(".d-label", { opacity: 1, duration: 0.5 }, 2.0)
    .to(len, { v: 2070, duration: 1, ease: "power2.out", onUpdate: () => (lenEl.textContent = Math.round(len.v)) }, 2.0)
    .to(".co__dot", { opacity: 1, duration: 0.3, stagger: 0.15 }, 2.1)
    .to(".co__lead", { strokeDashoffset: 0, duration: 0.6, stagger: 0.15 }, 2.15)
    .to(".co__text", { opacity: 1, duration: 0.5, stagger: 0.15 }, 2.4)
    .from(".hero__hint", { opacity: 0, y: 8, duration: 0.6 }, 2.8);

  mm.add(DESKTOP, () => {
    const st = { d: 0 };
    gsap.timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "+=100%", scrub: 0.6, pin: true, anticipatePin: 1 } })
      .to(st, { d: H.lift, duration: 1, ease: "power1.inOut", onUpdate: () => setLift(st.d) }, 0)
      .to(".co", { opacity: 0, duration: 0.2 }, 0)
      .to(".hero__head", { y: -24, opacity: 0.55, duration: 1, ease: "power1.in" }, 0)
      .to(".hero__hint", { opacity: 0, duration: 0.15 }, 0);
    return () => setLift(0);
  });
  mm.add(MOBILE, () => {
    // Side labels are hidden on phones, so crop the sheet to the table and its dimensions.
    const svg = $(".drawing");
    const full = svg.getAttribute("viewBox");
    svg.setAttribute("viewBox", "-20 -60 790 500");
    const st = { d: 0 };
    gsap.to(st, {
      d: H.lift, ease: "none", onUpdate: () => setLift(st.d),
      scrollTrigger: { trigger: ".hero__stage", start: "top 70%", end: "bottom 20%", scrub: 0.5 },
    });
    return () => { setLift(0); svg.setAttribute("viewBox", full); };
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
