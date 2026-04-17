// ===== ROTEM COSMETICS - MAIN SCRIPT =====

// שנה בפוטר
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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

// גלילה חלקה לעוגנים
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// הוספת אנימציות בגלילה (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// הוספת אנימציות לסקשנים
document.querySelectorAll(".section").forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
