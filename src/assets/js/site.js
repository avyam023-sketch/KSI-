/* KSI Plus — shared behaviour: smooth scroll, header, menu, enquiry list, forms, reveals. */
(function () {
  "use strict";

  const KSI = window.KSI;
  const root = document.body.dataset.root || "";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const byId = Object.fromEntries(KSI.products.map((p) => [p.id, p]));
  const imgSrc = (id) => `${root}assets/img/products/${id}.webp`;

  /* ---------- Smooth scroll (Lenis) wired into GSAP's ticker ---------- */
  let lenis = null;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!reduced && hasGsap && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  window.KSIScroll = {
    lenis,
    to(target, opts = {}) {
      const el = typeof target === "string" ? $(target) : target;
      if (!el) return;
      const offset = opts.offset ?? -(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76) - 72;
      if (lenis) lenis.scrollTo(el, { offset, duration: 1.2 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduced ? "auto" : "smooth" });
    },
  };

  // Same-page hash links scroll smoothly.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    closeMenu();
    history.replaceState(null, "", url.hash);
    window.KSIScroll.to(el);
  });

  /* ---------- Header: solid after scroll, hide on scroll down ---------- */
  const header = $("[data-header]");
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > 24);
    const hide = y > lastY && y > 400 && !document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", hide);
    document.body.classList.toggle("header-hidden", hide);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menu = $("[data-mobile-menu]");
  const menuBtn = $("[data-menu-toggle]");
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    lenis && lenis.start();
  }
  menuBtn &&
    menuBtn.addEventListener("click", () => {
      const open = menu.hidden;
      if (!open) return closeMenu();
      menu.hidden = false;
      document.body.classList.add("menu-open");
      menuBtn.setAttribute("aria-expanded", "true");
      lenis && lenis.stop();
      if (hasGsap && !reduced) gsap.from($$("nav a, .mobile-menu__cats li, .mobile-menu__foot > *", menu), { y: 24, opacity: 0, duration: 0.6, stagger: 0.03, ease: "power3.out" });
    });

  /* ---------- Enquiry list (persisted per browser) ---------- */
  const KEY = "ksi-enquiry-v1";
  const store = {
    read() {
      try { return (JSON.parse(localStorage.getItem(KEY)) || []).filter((x) => byId[x.id]); } catch (_) { return memory; }
    },
    write(list) {
      memory = list;
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (_) { /* private mode: keep in memory */ }
    },
  };
  let memory = [];
  let items = store.read();

  const has = (id) => items.some((x) => x.id === id);
  function add(id) { if (!has(id)) items.push({ id, qty: 1 }); save(); }
  function remove(id) { items = items.filter((x) => x.id !== id); save(); }
  function setQty(id, q) { const it = items.find((x) => x.id === id); if (it) { it.qty = Math.max(1, Math.min(999, q | 0 || 1)); save(false); } }
  function save(rerender = true) { store.write(items); syncUI(rerender); }

  const countEls = $$("[data-enq-count]");
  const listEl = $("[data-enq-list]");
  const emptyEl = $("[data-enq-empty]");
  const icons = {
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function syncUI(rerender = true) {
    const n = items.length;
    countEls.forEach((el) => {
      if (el.textContent !== String(n)) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
      el.textContent = n;
      el.classList.toggle("has-items", n > 0);
    });
    $$("[data-enquire]").forEach((b) => {
      const on = has(b.dataset.enquire);
      b.classList.toggle("is-added", on);
      b.setAttribute("aria-pressed", String(on));
      if (b.hasAttribute("data-enquire-label")) {
        const span = b.querySelector("span");
        if (span) span.textContent = on ? "Added to enquiry list" : "Add to enquiry list";
      }
    });
    if (emptyEl) emptyEl.hidden = n > 0;
    if (listEl && rerender) {
      listEl.innerHTML = items
        .map(({ id, qty }) => {
          const p = byId[id];
          return `<li class="enq-item" data-id="${id}">
            <img src="${imgSrc(id)}" alt="">
            <a class="enq-item__name" href="${root}products/${id}.html"><small>${p.code}</small>${p.name}${p.tier ? ` <em>${p.tier}</em>` : ""}</a>
            <div class="enq-item__ctrl">
              <div class="qty"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><input type="number" min="1" value="${qty}" aria-label="Quantity" inputmode="numeric"><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div>
              <button class="enq-remove" type="button" data-remove aria-label="Remove ${p.name}">${icons.close}</button>
            </div>
          </li>`;
        })
        .join("");
    }
    const note = $("[data-contact-items]");
    if (note) {
      note.hidden = n === 0;
      note.textContent = n ? `Your enquiry list (${n} product${n > 1 ? "s" : ""}) will be included with this message.` : "";
    }
  }

  listEl &&
    listEl.addEventListener("click", (e) => {
      const li = e.target.closest(".enq-item");
      if (!li) return;
      const id = li.dataset.id;
      if (e.target.closest("[data-remove]")) return remove(id);
      const step = e.target.closest("[data-qty]");
      if (step) {
        const input = $("input", li);
        input.value = Math.max(1, (parseInt(input.value) || 1) + Number(step.dataset.qty));
        setQty(id, parseInt(input.value));
      }
    });
  listEl && listEl.addEventListener("change", (e) => { const li = e.target.closest(".enq-item"); if (li) setQty(li.dataset.id, parseInt(e.target.value)); });

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-enquire]");
    if (!b) return;
    e.preventDefault();
    const id = b.dataset.enquire;
    if (has(id)) { remove(id); if (!drawer.classList.contains("is-open")) toast("Removed from enquiry list"); }
    else {
      add(id);
      // Inside the open drawer the tick on the button is feedback enough.
      if (!drawer.classList.contains("is-open")) toast(`${byId[id].code} added to your enquiry list`, true);
    }
  });

  /* ---------- Toast ---------- */
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg, withView) {
    if (!toastEl) return;
    toastEl.innerHTML = `<span>${msg}</span>${withView ? '<button type="button" data-open-enquiry>View list</button>' : ""}`;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 3200);
  }

  /* ---------- Drawer ---------- */
  const drawer = $("[data-enquiry]");
  const scrim = $("[data-enquiry-scrim]");
  let lastFocus = null;
  function openDrawer() {
    lastFocus = document.activeElement;
    setFinderOpen(items.length === 0);
    scrim.hidden = false;
    requestAnimationFrame(() => { scrim.classList.add("is-open"); drawer.classList.add("is-open"); });
    drawer.setAttribute("aria-hidden", "false");
    lenis && lenis.stop();
    document.documentElement.style.overflow = "hidden";
    toastEl && toastEl.classList.remove("is-on");
    setTimeout(() => drawer.focus(), 50);
  }
  function closeDrawer() {
    if (!drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    scrim.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    lenis && lenis.start();
    setTimeout(() => (scrim.hidden = true), 400);
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-enquiry]")) { e.preventDefault(); closeMenu(); openDrawer(); }
    if (e.target.closest("[data-close-enquiry]") || e.target === scrim) closeDrawer();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeDrawer(); closeMenu(); }
    if (e.key === "Tab" && drawer.classList.contains("is-open")) {
      const f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', drawer).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Forms → WhatsApp or email (no backend required) ---------- */
  function compose(form) {
    const f = Object.fromEntries(new FormData(form).entries());
    const lines = ["Hello KSI Plus, I would like a quotation.", ""];
    if (items.length) {
      lines.push("Products:");
      items.forEach(({ id, qty }) => { const p = byId[id]; lines.push(`• ${p.code} — ${p.name}${p.tier ? ` (${p.tier})` : ""} × ${qty}`); });
      lines.push("");
    }
    if (f.category) lines.push(`Interested in: ${f.category}`);
    if (f.message) lines.push(`Requirement: ${f.message}`);
    lines.push("");
    lines.push(`Name: ${f.name}`);
    if (f.org) lines.push(`Organisation: ${f.org}`);
    lines.push(`Phone: ${f.phone}`);
    if (f.email) lines.push(`Email: ${f.email}`);
    if (f.city) lines.push(`City: ${f.city}`);
    return { text: lines.join("\n"), name: f.name };
  }
  /* ---------- Product finder inside the drawer: types + search ---------- */
  const finder = $("[data-finder]");
  function setFinderOpen(open) {
    if (!finder) return;
    $("[data-finder-panel]", finder).hidden = !open;
    $("[data-finder-toggle]", finder).setAttribute("aria-expanded", String(open));
    finder.classList.toggle("is-open", open);
  }
  if (finder) {
    const q = $("[data-finder-q]", finder);
    const results = $("[data-finder-results]", finder);
    const hint = $("[data-finder-hint]", finder);
    const types = $$("[data-finder-cat]", finder);
    const intro = hint.textContent;
    const catName = Object.fromEntries(KSI.categories.map((c) => [c.id, c.name]));
    const hay = Object.fromEntries(KSI.products.map((p) => [p.id, [p.code, p.name, p.tier, catName[p.cat], ...(p.tags || [])].join(" ").toLowerCase()]));
    let cat = null;

    function render() {
      const words = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      if (!cat && !words.length) { results.innerHTML = ""; hint.hidden = false; hint.textContent = intro; return; }
      const list = KSI.products.filter((p) => (!cat || p.cat === cat) && words.every((w) => hay[p.id].includes(w)));
      hint.hidden = list.length > 0;
      if (!list.length) hint.textContent = `No products match “${q.value.trim()}”${cat ? ` in ${catName[cat]}` : ""}.`;
      results.innerHTML = list
        .map((p) => `<li class="finder__row">
          <img src="${imgSrc(p.id)}" alt="" loading="lazy">
          <span class="finder__name"><small>${p.code}</small>${p.name}${p.tier ? ` <em>${p.tier}</em>` : ""}</span>
          <button type="button" class="finder__add" data-enquire="${p.id}" aria-label="Add ${p.name}${p.tier ? ` (${p.tier})` : ""}">${icons.plus}${icons.check}</button>
        </li>`)
        .join("");
      syncUI(false);
      if (hasGsap && !reduced && results.children.length) gsap.from(results.children, { y: 10, opacity: 0, duration: 0.35, stagger: 0.02, ease: "power2.out" });
    }
    types.forEach((b) =>
      b.addEventListener("click", () => {
        cat = cat === b.dataset.finderCat ? null : b.dataset.finderCat;
        types.forEach((t) => { const on = t.dataset.finderCat === cat; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on)); });
        render();
      })
    );
    let tq;
    q.addEventListener("input", () => { clearTimeout(tq); tq = setTimeout(render, 120); });
    q.addEventListener("keydown", (e) => { if (e.key === "Enter") e.preventDefault(); });
    $("[data-finder-toggle]", finder).addEventListener("click", () => {
      const open = !finder.classList.contains("is-open");
      setFinderOpen(open);
      if (open) q.focus();
    });
  }

  /* Flash-card deck: one question per card. Without JS the steps render as a normal form. */
  const LABELS = { name: "Name", org: "Organisation", phone: "Phone", email: "Email", city: "City", category: "Looking for", message: "Notes" };
  function initDeck(form) {
    const deck = $("[data-deck]", form);
    if (!deck) return null;
    const steps = $$(".step", deck);
    const dots = $$(".deck__dots i", deck);
    const review = $("[data-review]", deck);
    let at = 0;
    deck.classList.add("is-live");

    const fieldOf = (step) => $("input:not([type=radio]), textarea", step);
    const valueOf = (step) => {
      const radio = $("input[type=radio]:checked", step);
      if (radio) return radio.value;
      const f = fieldOf(step);
      return f ? f.value.trim() : "";
    };
    const valid = (step) => !step.hasAttribute("data-required") || valueOf(step) !== "";

    function fillReview() {
      review.innerHTML = steps.slice(0, -1).map((st, i) => {
        const input = $("input, textarea", st);
        const v = valueOf(st);
        return `<div><dt>${LABELS[input.name] || input.name}</dt><dd>${v ? v.replace(/[<>&]/g, "") : '<span class="muted">—</span>'}</dd><button type="button" class="review__edit" data-goto="${i}">Edit</button></div>`;
      }).join("");
    }

    function show(i, dir = 1) {
      const from = steps[at];
      at = Math.max(0, Math.min(steps.length - 1, i));
      const to = steps[at];
      if (to.classList.contains("step--review")) fillReview();
      const box = $(".deck__cards", deck);
      const h0 = box.offsetHeight;
      steps.forEach((st) => { st.classList.toggle("is-current", st === to); st.inert = st !== to; });
      dots.forEach((d, k) => { d.classList.toggle("is-done", k < at); d.classList.toggle("is-on", k === at); });
      // The deck resizes to the current card, smoothly when motion is allowed.
      if (hasGsap && !reduced && from !== to) gsap.fromTo(box, { height: h0 }, { height: box.offsetHeight, duration: 0.5, ease: "power3.inOut", clearProps: "height" });
      if (hasGsap && !reduced && from !== to) {
        gsap.fromTo(from, { opacity: 1, y: 0, rotation: 0 }, { opacity: 0, y: -40 * dir, rotation: -2 * dir, duration: 0.35, ease: "power2.in" });
        gsap.fromTo(to, { opacity: 0, y: 60 * dir, rotation: 2 * dir, scale: 0.96 }, { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.6, delay: 0.15, ease: "power3.out" });
      }
      const f = fieldOf(to) || $("input, button[type=submit]", to);
      if (f && deck.offsetParent) setTimeout(() => f.focus({ preventScroll: true }), hasGsap && !reduced ? 300 : 0);
    }

    function next() {
      const st = steps[at];
      const err = $(".step__error", st);
      if (!valid(st)) {
        if (err) err.hidden = false;
        if (hasGsap && !reduced) gsap.fromTo(st, { x: -10 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        (fieldOf(st) || st).focus();
        return;
      }
      if (err) err.hidden = true;
      show(at + 1, 1);
    }

    deck.addEventListener("click", (e) => {
      if (e.target.closest("[data-next]")) next();
      else if (e.target.closest("[data-skip]")) show(at + 1, 1);
      else if (e.target.closest("[data-back]")) show(at - 1, -1);
      else if (e.target.closest("[data-goto]")) show(Number(e.target.closest("[data-goto]").dataset.goto), -1);
      const q = e.target.closest("[data-quick]");
      if (q) {
        const ta = $("textarea", steps[at]);
        const t = q.dataset.quick;
        const has = ta.value.split(/;\s*/).includes(t);
        const parts = ta.value.split(/;\s*/).filter(Boolean);
        ta.value = (has ? parts.filter((x) => x !== t) : parts.concat(t)).join("; ");
        q.classList.toggle("is-on", !has);
      }
    });
    // Picking a choice moves on by itself.
    deck.addEventListener("change", (e) => { if (e.target.type === "radio") setTimeout(next, 260); });
    deck.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.target.closest("button")) return;
      const isTA = e.target.tagName === "TEXTAREA";
      if (isTA && !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      if (!steps[at].classList.contains("step--review")) next();
    });
    show(0);
    return { show, stepOf: (name) => steps.findIndex((st) => $(`[name="${name}"]`, st)) };
  }

  function bindForm(form) {
    if (!form) return;
    const err = $("[data-form-error]", form);
    const deck = initDeck(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements.name, phone = form.elements.phone;
      const bad = [name, phone].filter((el) => !el.value.trim());
      [name, phone].forEach((el) => el.classList.toggle("is-invalid", bad.includes(el)));
      if (bad.length) {
        err.hidden = false;
        if (deck) deck.show(deck.stepOf(bad[0].name), -1);
        else bad[0].focus();
        return;
      }
      err.hidden = true;
      const via = (e.submitter && e.submitter.value) || "whatsapp";
      const { text, name: who } = compose(form);
      if (via === "email") {
        const subject = `Quotation request — ${who}`;
        location.href = `mailto:${KSI.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      } else {
        window.open(`https://wa.me/${KSI.company.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      }
      toast("Opening your message — just press send.");
    });
  }
  bindForm($("[data-enq-form]"));
  bindForm($("[data-contact-form]"));

  syncUI();

  /* ---------- Generic reveals ---------- */
  if (hasGsap && !reduced) {
    if ($$("[data-reveal]").length) ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, overwrite: true }),
    });
    // Page heroes (non-home) rise in on load.
    const hero = $(".page-hero");
    if (hero) gsap.from($$(".eyebrow, .display, .page-hero__lede, .btn-row", hero), { y: 36, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.08, delay: 0.05 });
  } else {
    $$("[data-reveal]").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
  }

  window.KSISite = { toast, openDrawer, reduced, hasGsap };
})();
