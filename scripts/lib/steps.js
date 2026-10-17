/* Question-by-question enquiry form ("flash cards").
 * Renders every question as a <fieldset class="step">. Without JS they all show as one
 * ordinary form; site.js turns them into a deck that shows one card at a time. */
const { esc, icon } = require("./layout");

function control(s, id) {
  const common = `id="${id}" name="${s.name}"${s.required ? " required" : ""}${s.autocomplete ? ` autocomplete="${s.autocomplete}"` : ""}${s.placeholder ? ` placeholder="${esc(s.placeholder)}"` : ""}`;
  if (s.type === "textarea") return `<textarea ${common} rows="3"></textarea>`;
  if (s.type === "choice")
    return `<div class="step__choices" role="radiogroup" aria-labelledby="${id}-q">${s.options
      .map((o, i) => `<label class="pick"><input type="radio" name="${s.name}" value="${esc(o)}"${i === 0 && s.required ? " required" : ""}><span>${esc(o)}</span></label>`)
      .join("")}</div>`;
  return `<input ${common} type="${s.type || "text"}"${s.type === "tel" ? ' inputmode="tel"' : ""}>`;
}

function stepsForm({ attr, steps, sendNote }) {
  const total = steps.length + 1;
  const cards = steps
    .map((s, i) => {
      const id = `${attr}-${s.name}`;
      const quick = s.quick
        ? `<div class="step__quick" aria-label="Quick answers">${s.quick.map((q) => `<button type="button" class="pick pick--btn" data-quick="${esc(q)}">${esc(q)}</button>`).join("")}</div>`
        : "";
      return `
      <fieldset class="step" data-step="${i}"${s.required ? " data-required" : ""}>
        <p class="step__count"><span>${String(i + 1).padStart(2, "0")}</span> / ${String(total).padStart(2, "0")}</p>
        <legend class="step__q" id="${id}-q"><label for="${id}">${esc(s.q)}</label></legend>
        ${s.hint ? `<p class="step__hint">${esc(s.hint)}</p>` : ""}
        <div class="step__field">${control(s, id)}</div>
        ${quick}
        <p class="step__error" role="alert" hidden>${esc(s.error || "Please answer this one to continue.")}</p>
        <div class="step__nav">
          ${i > 0 ? `<button type="button" class="step__back" data-back>Back</button>` : "<span></span>"}
          <div class="step__go">
            ${s.required ? "" : `<button type="button" class="step__skip" data-skip>Skip</button>`}
            <button type="button" class="btn btn--primary btn--sm" data-next>${i === steps.length - 1 ? "Review" : "Next"} ${icon.arrow}</button>
          </div>
        </div>
        <p class="step__kbd">${s.type === "textarea" ? "Ctrl + Enter" : "Press Enter"} ↵</p>
      </fieldset>`;
    })
    .join("");

  return `
    <div class="deck" data-deck>
      <div class="deck__dots" aria-hidden="true">${Array.from({ length: total }, () => "<i></i>").join("")}</div>
      <div class="deck__cards">
        ${cards}
        <fieldset class="step step--review" data-step="${steps.length}">
          <p class="step__count"><span>${String(total).padStart(2, "0")}</span> / ${String(total).padStart(2, "0")}</p>
          <legend class="step__q">All set. Here's what we'll send.</legend>
          <dl class="review" data-review></dl>
          ${sendNote ? `<p class="step__hint" data-contact-items hidden></p>` : ""}
          <p class="form-error" data-form-error hidden>Please add your name and phone number.</p>
          <div class="step__send">
            <button class="btn btn--primary" type="submit" value="whatsapp">${icon.whatsapp} Send on WhatsApp</button>
            <button class="btn btn--ghost" type="submit" value="email">${icon.mail} Send by email</button>
          </div>
          <div class="step__nav"><button type="button" class="step__back" data-back>Back</button><span></span></div>
        </fieldset>
      </div>
    </div>`;
}

module.exports = { stepsForm };
