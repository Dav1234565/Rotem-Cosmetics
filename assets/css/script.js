// שנה בפוטר
document.getElementById("year").textContent = new Date().getFullYear();

// תפריט מובייל
const toggle = document.querySelector(".navToggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// WhatsApp — מספר בפורמט בינלאומי (ישראל 972 + בלי 0)
const WHATSAPP_PHONE = "972522752249"; // 052-2752249

function buildWhatsAppLink(name, service, when) {
  const lines = [
    "היי רותם! אשמח לקבוע תור 😊",
    name ? `שם: ${name}` : null,
    service ? `שירות: ${service}` : null,
    when ? `מועד מועדף: ${when}` : null
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

// כפתור וואטסאפ למעלה
const waTop = document.getElementById("waTop");
if (waTop) waTop.href = buildWhatsAppLink("", "קביעת תור", "");

// לינק וואטסאפ בפרטים
const waInline = document.getElementById("waInline");
if (waInline) waInline.href = buildWhatsAppLink("", "קביעת תור", "");

// טופס וואטסאפ
const waForm = document.getElementById("waForm");
if (waForm) {
  waForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value?.trim();
    const service = document.getElementById("service")?.value?.trim();
    const when = document.getElementById("when")?.value?.trim();
    const url = buildWhatsAppLink(name, service, when);
    window.open(url, "_blank", "noopener");
  });
}

// גלריה מודאלית
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function openModal(src) {
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modalImg) modalImg.src = "";
}

document.querySelectorAll(".gItem").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.getAttribute("data-img");
    if (src) openModal(src);
  });
});

if (modal) {
  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t?.getAttribute?.("data-close") === "true") closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
``
