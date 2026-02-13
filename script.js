// ====== CONFIG ======
const WHATSAPP_NUMBER_E164 = "5567984431983"; // 55 + DDD + número (sem espaços)
const WHATSAPP_TEXT = "Olá! Vim pelo site da Fattura+ e gostaria de solicitar um diagnóstico estratégico do faturamento hospitalar.";

// ====== Helpers ======
function buildWhatsAppLink() {
  const text = encodeURIComponent(WHATSAPP_TEXT);
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${text}`;
}

function setWhatsAppLinks() {
  const link = buildWhatsAppLink();
  const ids = ["ctaHero", "ctaMobile", "ctaBottom"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });

  const meta = document.getElementById("metaWhats");
  if (meta) {
    meta.style.cursor = "pointer";
    meta.title = "Abrir WhatsApp";
    meta.addEventListener("click", () => window.open(link, "_blank", "noopener"));
  }
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

// ====== Mobile drawer ======
function setupDrawer() {
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const closeBtn = document.getElementById("drawerClose");
  const links = drawer?.querySelectorAll(".drawer__link") || [];

  function openDrawer() {
    drawer.style.display = "block";
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.style.display = "none";
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger?.addEventListener("click", () => {
    const isOpen = drawer.style.display === "block";
    isOpen ? closeDrawer() : openDrawer();
  });

  closeBtn?.addEventListener("click", closeDrawer);

  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });

  links.forEach(a => a.addEventListener("click", closeDrawer));
}

// ====== Scroll reveal (Base44-like) ======
function setupScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

// ====== Init ======
setWhatsAppLinks();
setYear();
setupDrawer();
setupScrollReveal();
