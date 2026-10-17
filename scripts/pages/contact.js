/* Contact — quick channels, enquiry form (sent via WhatsApp or email), offices and map. */
const { esc, icon } = require("../lib/layout");
const { stepsForm } = require("../lib/steps");

module.exports = function contact(data) {
  const { company: c, categories } = data;
  const india = c.offices[0];

  const body = `
<section class="page-hero page-hero--contact">
  <div class="wrap page-hero__split">
    <div>
      <h1 class="display display--md">Contact</h1>
    </div>
    <p class="page-hero__lede">Call, WhatsApp or email us, or answer the questions below and we will send you a quotation. Tell us if it is a new OT, an ICU upgrade or a full ward.</p>
  </div>
</section>

<section class="section section--flush">
  <div class="wrap contact">
    <div class="contact__channels">
      <a class="channel" href="tel:${c.phoneHref}">${icon.phone}<span><small>Call</small>${esc(c.phone)}</span></a>
      <a class="channel" href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">${icon.whatsapp}<span><small>WhatsApp</small>Chat with our team</span></a>
      <a class="channel" href="mailto:${c.email}">${icon.mail}<span><small>Email</small>${esc(c.email)}</span></a>
      <a class="channel" href="tel:${c.mobileHref}">${icon.phone}<span><small>India office</small>${esc(c.mobile)}</span></a>
    </div>

    <form class="contact__form" data-contact-form novalidate>
      <h2 class="h3">Request a quotation</h2>
      ${stepsForm({
        attr: "c",
        sendNote: true,
        steps: [
          { name: "name", q: "First, what's your name?", required: true, autocomplete: "name", placeholder: "Dr. A. Sharma", error: "We need a name to address the quotation to." },
          { name: "org", q: "Which hospital or organisation is this for?", autocomplete: "organization", placeholder: "City Hospital, Panchkula" },
          { name: "category", q: "What are you looking for?", type: "choice", options: categories.map((x) => x.short).concat(["Complete OT / ICU setup", "Something else"]) },
          { name: "message", q: "Tell us about the requirement.", hint: "Quantities, models and timeline, or tap a quick answer.", type: "textarea", placeholder: "e.g. 2 OT tables and twin ceiling lights for a new theatre", quick: ["New OT setup", "ICU upgrade", "Replacing old equipment", "Need it within a month"] },
          { name: "phone", q: "What's the best number to reach you on?", hint: "Mobile or landline, with STD code.", type: "tel", required: true, autocomplete: "tel", placeholder: "+91 98xxx xxxxx", error: "Add a number so our team can reach you." },
          { name: "email", q: "And an email for the written quotation?", type: "email", autocomplete: "email", placeholder: "you@hospital.com" },
          { name: "city", q: "Last one: which city is the site in?", autocomplete: "address-level2", placeholder: "Panchkula" },
        ],
      })}
    </form>
  </div>
</section>

<section class="section">
  <div class="wrap map-block">
    <div class="map-block__info">
      ${c.offices.map((o) => `<div class="office"><h3>${esc(o.title)}</h3>${o.sub ? `<p class="muted">${esc(o.sub)}</p>` : ""}<address>${o.lines.map(esc).join("<br>")}</address>${o.phone ? `<a href="tel:${o.phone.replace(/[^+\d]/g, "")}">${icon.phone}${esc(o.phone)}</a>` : ""}${o.email ? `<a href="mailto:${o.email}">${icon.mail}${esc(o.email)}</a>` : ""}${o.map ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.map)}" target="_blank" rel="noopener">${icon.pin}Get directions</a>` : ""}</div>`).join("")}
    </div>
    <div class="map-block__map">
      <iframe title="Map — KSI Plus India Office, Sector 14, Panchkula" src="https://maps.google.com/maps?q=${encodeURIComponent(india.map)}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>`;

  return {
    title: "Contact — Request a Quote",
    description: `Contact KSI Plus for OT tables, OT lights, hospital beds and furniture. Call ${c.phone}, WhatsApp, or visit our office at Sector 14, Panchkula, Haryana.`,
    body,
    active: "contact",
    bodyClass: "page-contact",
    canonical: "contact.html",
  };
};
