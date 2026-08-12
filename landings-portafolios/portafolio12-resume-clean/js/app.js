/* ===== RESUME CLEAN — app.js ===== */
const DATA = {
  stack: [
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90]] },
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84]] },
    { cat: "CMS & Datos", items: [["WordPress", 95], ["ACF PRO", 90], ["MySQL", 92], ["MongoDB", 78]] },
    { cat: "Infra & APIs", items: [["AWS", 82], ["Docker", 84], ["REST APIs", 90], ["SOAP", 80]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WordPress", "ACF"], desc: "Plugins modulares con ACF PRO: −20 % de carga y entregas más rápidas." },
    { title: "Dashboard React", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces operativas de alta disponibilidad sobre APIs REST." },
    { title: "Ecommerce", tech: ["Laravel", "WooCommerce", "MySQL"], desc: "Integraciones de CRM y pagos vía REST/SOAP en catálogos grandes." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella: +60 % de rendimiento." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor de AWS + MySQL/PHP: +60 % de rendimiento.", "React + APIs REST de alta disponibilidad.", "Temas WordPress avanzados con ACF PRO."] },
    { role: "Desarrollador Web Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO: −20 % de carga.", "SEO, Core Web Vitals y conversión.", "Integraciones REST/SOAP y mantenimiento de catálogos."] }
  ],
  edu: [
    { y: "2012 — 2014", t: "Análisis y Desarrollo de Sistemas", org: "SENA, Colombia" },
    { y: "2025", t: "Arquitecturas Cloud & AWS", org: "Certificación profesional" },
    { y: "2024", t: "React Avanzado & TypeScript", org: "Formación continua" }
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function avatarFallback(img) {
  img.onerror = null;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">'
    + '<rect width="256" height="256" fill="#16233B"/>'
    + '<circle cx="128" cy="100" r="44" fill="#EFF4FF"/>'
    + '<path d="M40 226 q88 -92 176 0 Z" fill="#EFF4FF"/>'
    + '<text x="128" y="210" text-anchor="middle" font-family="Arial" font-size="40" font-weight="700" fill="#2563EB" letter-spacing="2">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function go(view) {
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.view === view));
  const next = $('.panel[data-panel="' + view + '"]');
  $$(".panel").forEach((p) => p.classList.remove("active"));
  next.classList.add("active");
  if (window.anime) {
    anime({ targets: next.children, opacity: [0, 1], translateY: [12, 0], delay: anime.stagger(50), duration: 500, easing: "easeOutCubic" });
  }
  if (view === "skills") bars();
}

function bars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 30);
  });
}

function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + '</h3>' + c.items.map(function (it) {
      return '<div class="skill"><div class="skill-name"><span>' + it[0] + '</span><span>' + it[1] + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + it[1] + '"></div></div></div>';
    }).join("") + '</div>';
  }).join("");

  $("#projGrid").innerHTML = DATA.projects.map(function (p) {
    return '<div class="proj-card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div></div>';
  }).join("");

  $("#timeline").innerHTML = DATA.exp.map(function (e) {
    return '<div class="tl"><div class="role">' + e.role + '</div><div class="org">' + e.org + ' <span class="dates">· ' + e.dates + '</span></div><ul>' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul></div>';
  }).join("");

  $("#eduGrid").innerHTML = DATA.edu.map(function (e) {
    return '<div class="edu"><div class="y">' + e.y + '</div><h3>' + e.t + '</h3><p>' + e.org + '</p></div>';
  }).join("");
}

function clock() { const el = $("#clock"); if (el) setInterval(() => { el.textContent = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }); }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  clock();
  registerSW();
  const p = $("#portrait");
  if (p) p.onerror = () => avatarFallback(p);
  $$(".tab").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "profile", "2": "experience", "3": "projects", "4": "skills", "5": "education" }; if (map[e.key]) go(map[e.key]); });
  go("profile");
});