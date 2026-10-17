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
  const bar = $(".progress span");
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-solid", y > 24);
    const hide = y > lastY && y > 400 && !document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", hide);
    document.body.classList.toggle("header-hidden", hide);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
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
            <img src="${root}assets/img/products/${id}.webp" alt="">
            <a class="enq-item__name" href="${root}products/${id}.html"><small>${p.code}</small>${p.name}${p.tier ? ` — ${p.tier}` : ""}</a>
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
    if (has(id)) { remove(id); toast("Removed from enquiry list"); }
    else { add(id); toast(`${byId[id].code} added to your enquiry list`, true); }
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
  function bindForm(form) {
    if (!form) return;
    const err = $("[data-form-error]", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements.name, phone = form.elements.phone;
      const bad = [name, phone].filter((el) => !el.value.trim());
      [name, phone].forEach((el) => el.classList.toggle("is-invalid", bad.includes(el)));
      if (bad.length) { err.hidden = false; bad[0].focus(); return; }
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
