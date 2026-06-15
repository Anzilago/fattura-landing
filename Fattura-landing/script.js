const WHATSAPP_NUMBER_E164 = "5567984431983";
const WHATSAPP_TEXT = "Olá! Vim pelo site da Fattura+ e gostaria de solicitar um diagnóstico do faturamento hospitalar.";

function buildWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
}

function setWhatsAppLinks() {
  const link = buildWhatsAppLink();

  ["ctaHero", "ctaMobile", "ctaBottom"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.href = link;
  });

  const meta = document.getElementById("metaWhats");
  if (meta) {
    meta.setAttribute("role", "link");
    meta.setAttribute("tabindex", "0");
    meta.title = "Abrir WhatsApp";

    const openWhatsApp = () => window.open(link, "_blank", "noopener");
    meta.addEventListener("click", openWhatsApp);
    meta.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWhatsApp();
      }
    });
  }
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function setupDrawer() {
  const button = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  const closeButton = document.getElementById("drawerClose");
  const links = drawer?.querySelectorAll(".drawer-link") ?? [];

  if (!button || !drawer || !closeButton) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    closeButton.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  button.addEventListener("click", openDrawer);
  closeButton.addEventListener("click", closeDrawer);
  links.forEach((link) => link.addEventListener("click", closeDrawer));

  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) closeDrawer();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
      button.focus();
    }
  });
}

function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

setWhatsAppLinks();
setYear();
setupDrawer();
setupScrollReveal();
