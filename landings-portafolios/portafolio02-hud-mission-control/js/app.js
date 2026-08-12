/* ===== MISSION CONTROL HUD — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["HTML5", 95], ["CSS3", 92], ["JavaScript", 93], ["TypeScript", 85], ["React", 88], ["Astro", 78], ["Tailwind CSS", 90], ["Bootstrap", 84]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel 8", 88], ["Node.js", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF PRO", 90], ["Elementor", 82], ["Gutenberg", 80], ["WP REST API", 86], ["Strapi", 70]] },
    { cat: "DATABASES", items: [["MySQL", 92], ["MariaDB", 85], ["MongoDB", 78]] },
    { cat: "CLOUD / AWS", items: [["AWS EC2", 82], ["AWS S3", 80]] },
    { cat: "TOOLS", items: [["Git", 90], ["GitHub", 88], ["Docker", 82], ["Vite", 85], ["WP-CLI", 85]] },
  ],
  projects: [
    { title: "Plugin Suite Optimizada", tech: ["PHP", "WordPress", "ACF PRO"], desc: "Plugins modulares + ACF PRO que recortaron un 20% el tiempo de carga del sitio.", demo: "#", code: "#" },
    { title: "Dashboard React + REST", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces escalables en React sobre APIs REST, baja latencia y alta disponibilidad." },
    { title: "E-Commerce Laravel / Woo", tech: ["Laravel 8", "WooCommerce", "MySQL"], desc: "Plataforma de venta integrada a CRMs y pasarelas de pago vía REST/SOAP." },
    { title: "AWS Performance Audit", tech: ["AWS EC2", "MySQL", "PHP"], desc: "Refactor y ajuste de cuellos de botella: rendimiento y seguridad hasta +60%." },
  ],
  experience: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "MAY 2025 — MAY 2026", bullets: ["Refactor AWS + MySQL/PHP: +60% rendimiento y seguridad.", "Interfaces en React conectadas a APIs REST, alta disponibilidad.", "Temas WordPress desde cero con ACF PRO y landings de conversión."] },
    { role: "Semi Senior Web Developer", org: "Digital Studio", dates: "OCT 2014 — SEP 2024", bullets: ["Plugins PHP y arquitecturas con ACF PRO: -20% carga.", "Optimización SEO / Core Web Vitals y conversión de landings.", "Integración con CRMs y pasarelas de pago vía REST y SOAP."] },
  ],
  certs: ["IA con Agentes (Claude 101 – Anthropic)", "Node.js + Express", "React", "WordPress", "HTML5 + JS + CSS3"],
  contact: [
    { label: "EMAIL", value: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { label: "GITHUB", value: "github.com/cristiantorres", href: "#" },
    { label: "LINKEDIN", value: "linkedin.com/in/cristiantorres", href: "#" },
    { label: "PORTAFOLIO", value: "cristiantorres.dev", href: "#" },
  ],
  location: "MEDELLÍN, COLOMBIA",
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const VIEWS = ["home", "stack", "projects", "experience", "contact"];
let current = 0;

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
      <div class="proj-links"><a href="${p.demo || "#"}" target="_blank" rel="noopener">DEMO</a><a href="${p.code || "#"}" target="_blank" rel="noopener">CÓDIGO</a></div>
    </article>`).join("");

  $("#timeline").innerHTML = DATA.experience.map((e) => `
    <div class="tl-item">
      <div class="tl-role">${e.role}</div><div class="tl-org">${e.org}</div><div class="tl-dates">${e.dates}</div>
      <ul class="tl-bullets">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>`).join("");

  $("#certsList").innerHTML = DATA.certs.map((c) => `<li>${c}</li>`).join("");

  $("#contactGrid").innerHTML = DATA.contact.map((c) => `
    <a class="contact-card" href="${c.href}" target="_blank" rel="noopener">
      <div class="cc-label">${c.label}</div><div class="cc-value">${c.value}</div>
    </a>`).join("");
}

/* ---------- NAV (deslizamiento horizontal) ---------- */
function go(i) {
  if (i === current) return;
  current = i;
  activeNav();
  const target = -i * 100;
  if (window.anime) {
    anime({ targets: "#track", translateX: target + "%", duration: 480, easing: "easeOutCubic" });
  } else {
    $("#track").style.transform = `translateX(${target}%)`;
  }
  onPanel(i);
}
function activeNav() {
  $$(".rail-item").forEach((b, i) => b.classList.toggle("active", i === current));
}
function onPanel(i) {
  if (i === 0) animateRing();
  if (i === 1) animateBars();
}

/* ---------- Anillos / barras ---------- */
function animateRing() {
  const ring = $("#ring");
  if (ring.dataset.done) return;
  ring.dataset.done = "1";
  const num = $("#ringNum");
  let cur = 0;
  const iv = setInterval(() => {
    cur++;
    ring.style.background = `conic-gradient(var(--cyan) ${cur * 3.6}deg, rgba(41,121,255,0.15) 0deg)`;
    num.textContent = cur;
    if (cur >= 100) clearInterval(iv);
  }, 30);
}
function animateBars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return;
    b.dataset.done = "1";
    if (window.anime) anime({ targets: b, width: b.dataset.w + "%", duration: 700, delay: i * 30, easing: "easeOutQuad" });
    else b.style.width = b.dataset.w + "%";
  });
}

/* ---------- Clock ---------- */
function clock() {
  const el = $("#tClock");
  setInterval(() => { el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false }); }, 1000);
}

/* ---------- Events ---------- */
function initUI() {
  $$(".rail-item, .btn-hud[data-view]").forEach((b) => {
    b.addEventListener("click", () => go(VIEWS.indexOf(b.dataset.view)));
  });
  document.addEventListener("keydown", (e) => {
    const map = { "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, ArrowRight: Math.min(current + 1, 4), ArrowLeft: Math.max(current - 1, 0) };
    if (map[e.key] !== undefined) go(map[e.key]);
  });
}

/* ---------- PWA ---------- */
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

document.addEventListener("DOMContentLoaded", () => {
  render();
  clock();
  initUI();
  registerSW();
  go(0);
  requestAnimationFrame(() => onPanel(0));
});