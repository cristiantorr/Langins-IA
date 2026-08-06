/* ===== NEON COMMAND CENTER — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["HTML5", 95], ["CSS3", 92], ["JavaScript", 93], ["TypeScript", 85], ["React", 88], ["Astro", 78], ["Tailwind", 90], ["Bootstrap", 84]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel 8", 88], ["Node.js", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF PRO", 90], ["Elementor", 82], ["Gutenberg", 80], ["WP REST API", 86], ["Strapi", 70]] },
    { cat: "DATABASES", items: [["MySQL", 92], ["MariaDB", 85], ["MongoDB", 78]] },
    { cat: "CLOUD", items: [["AWS EC2", 82], ["AWS S3", 80]] },
    { cat: "TOOLS & DEVOPS", items: [["Git", 90], ["GitHub", 88], ["Docker", 82], ["Vite", 85], ["WP-CLI", 85]] },
  ],
  projects: [
    { title: "Plugin Suite Optimizada", tech: ["PHP", "WordPress", "ACF PRO"], desc: "Plugins modulares y arquitecturas con ACF PRO que recortaron el tiempo de carga en un 20%." },
    { title: "Dashboard React + REST API", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces escalables en React conectadas a APIs REST, con baja latencia y alta disponibilidad." },
    { title: "E-Commerce Laravel / Woo", tech: ["Laravel 8", "WooCommerce", "MySQL"], desc: "Plataforma de venta conectada a CRMs y pasarelas de pago vía REST y SOAP, flujo de datos continuo." },
    { title: "AWS Performance Audit", tech: ["AWS EC2", "MySQL", "PHP"], desc: "Refactor de aplicaciones y corrección de cuellos de botella: rendimiento y seguridad hasta +60%." },
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "MAY 2025 — MAY 2026", bullets: ["Refactor en AWS y cuellos MySQL/PHP: rendimiento y seguridad hasta +60%.", "Interfaces React conectadas a APIs REST con alta disponibilidad.", "Temas de WordPress desde cero con ACF PRO y landing de conversión."] },
    { role: "Semi Senior Web Developer", org: "Digital Studio", dates: "OCT 2014 — SEP 2024", bullets: ["Plugins propios en PHP y arquitecturas con ACF PRO: -20% de carga.", "Optimización de SEO, Core Web Vitals y conversión de landings.", "Integraciones con CRMs y pasarelas de pago vía REST y SOAP."] },
  ],
  edu: { org: "SENA", title: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información", dates: "2012 — 2014" },
  certs: ["IA con Claude Code (Claude 101 – Anthropic)", "Node.js + Express", "React", "WordPress", "HTML5 + CSS3 + JS"],
  contact: [
    { label: "EMAIL", value: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { label: "GITHUB", value: "github.com/cristiantorres", href: "#" },
    { label: "LINKEDIN", value: "linkedin.com/in/cristiantorres", href: "#" },
    { label: "PORTAFOLIO", value: "cristiantorres.dev", href: "#" },
  ],
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- RENDER ---------- */
function render() {
  $("#stackGrid").innerHTML = DATA.stack.map((c) => `
    <div class="stack-block"><h3>${c.cat}</h3>
      ${c.items.map(([n, l]) => `
        <div class="skill"><div class="skill-name"><span>${n}</span><span>${l}%</span></div>
          <div class="bar"><div class="bar-fill" data-w="${l}"></div></div></div>`).join("")}
    </div>`).join("");

  $("#projGrid").innerHTML = DATA.projects.map((p) => `
    <article class="proj-card">
      <h3>${p.title}</h3><p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links"><a href="#" target="_blank" rel="noopener">Demo</a><a href="#" target="_blank" rel="noopener">Código</a></div>
    </article>`).join("");

  $("#expList").innerHTML = DATA.exp.map((e) => `
    <article class="exp-item">
      <div class="exp-role">${e.role}</div><div class="exp-org">${e.org}</div><div class="exp-dates">${e.dates}</div>
      <ul class="exp-bullets">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </article>`).join("");

  $("#edu").innerHTML = `<b>${DATA.edu.org}</b> — ${DATA.edu.title} (${DATA.edu.dates}).<br/><br/><b>Certificaciones:</b> ${DATA.certs.join(" · ")}`;

  $("#contactGrid").innerHTML = DATA.contact.map((c) => `
    <a class="contact-card" href="${c.href}" target="_blank" rel="noopener">
      <div class="cc-label">${c.label}</div><div class="cc-value">${c.value}</div>
    </a>`).join("");
}

/* ---------- TABS ---------- */
const PANELS = ["pan-about", "pan-stack", "pan-projects", "pan-experience", "pan-contact"];
let current = 0;

function openTab(i, scroll = true) {
  if (i === current && $(".panel.active")) { if (scroll) $(".panels").scrollTop = 0; return; }
  current = i;
  $$(".tab").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
    t.setAttribute("aria-selected", idx === i ? "true" : "false");
  });
  $$(".panel").forEach((p, idx) => {
    const on = idx === i;
    p.classList.toggle("active", on);
    if (on) {
      const el = $(".panels");
      el.scrollTop = 0;
      if (window.anime) anime({ targets: p, opacity: [0, 1], translateY: [10, 0], duration: 380, easing: "easeOutQuad" });
    }
  });
  onPanel(i);
}

function onPanel(i) {
  if (i === 0) animateMetrics();
  if (i === 1) animateBars();
}

/* ---------- Animaciones ---------- */
function animateMetrics() {
  $$(".m-val").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = +el.dataset.count;
    if (window.anime) {
      const o = { v: 0 };
      anime({ targets: o, v: target, round: 1, duration: 900, easing: "easeOutQuad", update: () => { el.textContent = o.v; } });
    } else el.textContent = target;
  });
}
function animateBars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return;
    b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 30);
  });
}

/* ---------- Clock ---------- */
function clock() {
  const el = $("#sbClock");
  setInterval(() => { el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false }); }, 1000);
}

/* ---------- Events ---------- */
function initUI() {
  $$(".tab").forEach((t, i) => t.addEventListener("click", () => openTab(i)));
  const GOTO = { "about": 0, "projects": 2, "contact": 4 };
  $$(".cta, [data-goto]").forEach((b) => {
    b.addEventListener("click", (e) => {
      const target = b.hasAttribute("data-goto") ? b.dataset.goto : "contact";
      if (GOTO[target] !== undefined) openTab(GOTO[target]);
      e.preventDefault();
    });
  });
  document.addEventListener("keydown", (e) => {
    const map = { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4 };
    if (map[e.key]) openTab(map[e.key]);
  });
}

/* ---------- PWA ---------- */
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
  clock();
  initUI();
  registerSW();
});