/* ===== EDITORIAL MAGAZINE — app.js ===== */
const DATA = {
  stack: [
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90], ["Astro", 78]] },
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF PRO", 90], ["Strapi", 70]] },
    { cat: "Datos & Nube", items: [["MySQL", 92], ["MongoDB", 78], ["AWS", 82], ["Docker", 84], ["REST APIs", 90]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WordPress", "ACF"], desc: "Plugins modulares con ACF PRO: hasta −20 % de carga y menos fricción entre equipos." },
    { title: "Dashboard React", tech: ["React", "TS", "AWS"], desc: "Interfaces de alta disponibilidad sobre APIs REST, pensadas para operar sin fricción." },
    { title: "Ecommerce", tech: ["Laravel", "WooCommerce", "MySQL"], desc: "Integración de CRMs y pasarelas de pago vía REST/SOAP sobre catálogos grandes." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella: +60 % de rendimiento y menos coste de infraestructura." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor de AWS + MySQL/PHP: +60 % de rendimiento.", "React + APIs REST listas para alta disponibilidad.", "Temas de WordPress avanzados con ACF PRO."] },
    { role: "Desarrollador Web Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO: −20 % de carga.", "SEO, Core Web Vitals y diseño orientado a conversión superior.", "Integraciones REST/SOAP y mantenimiento de catálogos."] },
  ],
  contact: [
    { l: "Email", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GitHub", v: "github.com/cristiantorres", href: "#" },
    { l: "LinkedIn", v: "linkedin.com/in/cristiantorres", href: "#" },
    { l: "Web", v: "cristiantorres.dev", href: "#" }
  ],
  sumario: [
    { view: "home", no: "01", tt: "Editorial", en: "CV" },
    { view: "stack", no: "02", tt: "Stack", en: "ESPECIALIDADES" },
    { view: "projects", no: "03", tt: "Proyectos", en: "PORTAFOLIO" },
    { view: "experience", no: "04", tt: "Trayectoria", en: "HISTORIA" },
    { view: "contact", no: "05", tt: "Contacto", en: "CIERRE" }
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function avatarFallback(img) {
  img.onerror = null;
  img.removeAttribute("src");
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">'
    + '<rect width="400" height="500" fill="#211D16"/>'
    + '<rect x="24" y="24" width="352" height="452" fill="none" stroke="#C0392B" stroke-width="3"/>'
    + '<circle cx="200" cy="185" r="64" fill="#F7F1E3"/>'
    + '<path d="M92 440 q108 -120 216 0 Z" fill="#F7F1E3"/>'
    + '<text x="200" y="430" text-anchor="middle" font-family="Georgia" font-size="52" font-weight="700" fill="#C0392B" letter-spacing="4">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function go(view) {
  $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.view === view));
  $$(".sumario-item").forEach((s) => s.classList.toggle("is-active", s.dataset.view === view));
  const next = $('.panel[data-view="' + view + '"]');
  $$(".panel").forEach((p) => p.classList.remove("is-active"));
  next.classList.add("is-active");
  if (window.anime) {
    anime({ targets: next.children, opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(70), duration: 550, easing: "easeOutCubic" });
  } else {
    next.style.animation = "none";
  }
  if (view === "stack") bars();
}

function bars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 35);
  });
}

function render() {
  $("#sumario").innerHTML = DATA.sumario.map(function (s) {
    return '<button class="sumario-item" data-view="' + s.view + '"><span class="no">' + s.no + '</span><span class="tt">' + s.tt + '</span><span class="en">' + s.en + '</span></button>';
  }).join("");

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

  $("#contactGrid").innerHTML = DATA.contact.map(function (c) {
    return '<a class="hc" href="' + c.href + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("");
}

function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  registerSW();
  const p = $("#portrait");
  if (p) p.onerror = () => avatarFallback(p);
  $$(".chip").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  $$(".sumario-item").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" }; if (map[e.key]) go(map[e.key]); });
  go("home");
});