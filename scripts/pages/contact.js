/* Contact — quick channels, enquiry form (sent via WhatsApp or email), offices and map. */
const { esc, icon } = require("../lib/layout");

module.exports = function contact(data) {
  const { company: c, categories } = data;
  const india = c.offices[0];

  const body = `
<section class="page-hero page-hero--contact">
  <div class="wrap page-hero__split">
    <div>
      <p class="eyebrow">Contact</p>
      <h1 class="display display--md">Let's equip <em>your next theatre.</em></h1>
    </div>
    <p class="page-hero__lede">Tell us what you are planning — a new OT, an ICU upgrade or a full ward. Our team will help you specify the right equipment and send a detailed quotation.</p>
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
      <div class="field-row">
        <div class="field"><label for="c-name">Your name</label><input id="c-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="c-org">Hospital / organisation</label><input id="c-org" name="org" autocomplete="organization"></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autocomplete="tel" required></div>
        <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email"></div>
      </div>
      <div class="field-row">
        <div class="field"><label for="c-city">City</label><input id="c-city" name="city" autocomplete="address-level2"></div>
        <div class="field"><label for="c-cat">Interested in</label>
          <select id="c-cat" name="category"><option value="">Select a category</option>${categories.map((x) => `<option>${esc(x.name)}</option>`).join("")}<option>Complete OT / ICU setup</option><option>Other</option></select>
        </div>
      </div>
      <div class="field"><label for="c-msg">Requirement</label><textarea id="c-msg" name="message" rows="5" placeholder="Quantities, models, timeline, site details…"></textarea></div>
      <p class="form-note muted" data-contact-items hidden></p>
      <p class="form-error" data-form-error hidden>Please add your name and phone number.</p>
      <div class="btn-row">
        <button class="btn btn--primary" type="submit" value="whatsapp">${icon.whatsapp} Send on WhatsApp</button>
        <button class="btn btn--ghost" type="submit" value="email">${icon.mail} Send by email</button>
      </div>
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
