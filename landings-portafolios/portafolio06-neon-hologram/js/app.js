/* ===== NEON HOLOGRAM — app.js (animaciones con anime.js) ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["HTML5", 95], ["CSS3", 92], ["Tailwind", 90], ["Astro", 78]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel 8", 88], ["Node.js", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF PRO", 90], ["Elementor", 82], ["Strapi", 70]] },
    { cat: "DB & CLOUD", items: [["MySQL", 92], ["MariaDB", 85], ["MongoDB", 78], ["AWS EC2", 82], ["AWS S3", 80]] },
    { cat: "TOOLS", items: [["Git", 90], ["GitHub", 88], ["Docker", 82], ["Vite", 85], ["WP-CLI", 85]] },
  ],
  projects: [
    { title: "Plugin Suite Optimizada", tech: ["PHP", "WordPress", "ACF PRO"], desc: "Plugins modulares + ACF PRO que reducen un 20% el tiempo de carga del sitio." },
    { title: "Dashboard React + REST", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces escalables conectadas a APIs REST, con alta disponibilidad." },
    { title: "E-Commerce Integrado", tech: ["Laravel 8", "WooCommerce", "MySQL"], desc: "Ventas conectadas a CRMs y pasarelas de pago vía REST/SOAP." },
    { title: "AWS Performance Audit", tech: ["AWS EC2", "MySQL", "PHP"], desc: "Refactor y ajuste de cuellos de botella: rendimiento y seguridad +60%." },
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP hasta +60%.", "Interfaces React + REST", "Temas WP con ACF PRO"] },
    { role: "Semi Senior Web Dev", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF -20%.", "SEO / Core Web Vitals", "Integraciones REST/SOAP"] },
  ],
  contact: [
    { l: "EMAIL", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GITHUB", v: "github.com/cristiantorres", href: "#" },
    { l: "LINKEDIN", v: "linkedin.com/in/cristiantorres", href: "#" },
    { l: "PORTFOLIO", v: "cristintorres.dev", href: "#" },
  ],
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- FLOATERS / STARS (bucles infinitos) ---------- */
function floaters() {
  const wrap = $("#floaters");
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("i");
    el.className = "floater";
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    wrap.appendChild(el);
    anime({ targets: el, translateY: Math.random() > 0.5 ? 180 : -180, translateX: (Math.random() - 0.5) * 80, opacity: [0, 0.7, 0], duration: 2800 + Math.random() * 2600, delay: Math.random() * 2000, loop: true, easing: "easeInOutSine" });
  }
}
function stars() {
  const wrap = $("#stars");
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("i");
    el.textContent = "+";
    el.style.cssText = "position:absolute;left:" + (Math.random() * 100) + "%;top:" + (Math.random() * 100) + "%;color:rgba(0,217,255,0.4);font-size:9px;";
    wrap.appendChild(el);
    anime({ targets: el, opacity: [0, 1, 0], scale: [0.6, 1.4, 0.6], duration: 1600 + Math.random() * 2000, delay: Math.random() * 2400, loop: true, easing: "linear" });
  }
}

/* ---------- NAVEGACIÓN ---------- */
function go(view) {
  $$(".nav-chip").forEach((c) => c.classList.toggle("active", c.dataset.view === view));
  $$(".panel").forEach((p) => p.classList.remove("active"));
  const panel = $(`.panel[data-view="${view}"]`);
  panel.classList.add("active");
  animateIn(panel);
  if (view === "home") animateCounters();
  if (view === "stack") animateBars();
}

function animateIn(panel) {
  if (window.anime) anime({ targets: panel.children, opacity: [0, 1], translateY: [22, 0], filter: ["blur(6px)", "blur(0px)"], delay: anime.stagger(70), duration: 600, easing: "outCubic" });
}

/* ---------- TÍTULO (letra por letra) ---------- */
function splitName() {
  const el = $("[data-split]");
  if (!el || el.dataset.done) return;
  el.dataset.done = "1";
  const text = el.textContent.trim();
  el.textContent = "";
  [...text].forEach((ch) => {
    const s = document.createElement("span");
    s.className = "ch"; s.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(s);
  });
  if (window.anime) anime({ targets: el.querySelectorAll(".ch"), opacity: [0, 1], translateY: [16, 0], rotateX: [20, 0], duration: 850, delay: anime.stagger(45), easing: "easeOutExpo" });
}

/* ---------- TILT 3D ---------- */
function bindTilt() {
  $$(".hcard").forEach((card) => {
    const inner = card.querySelector(".hcard-inner");
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (window.anime) anime({ targets: inner, rotateY: x * 14, rotateX: -y * 14, duration: 200, easing: "linear" });
    });
    card.addEventListener("mouseleave", () => {
      if (window.anime) anime({ targets: inner, rotateY: 0, rotateX: 0, duration: 700, easing: "easeOutBack(1,0.6)" });
    });
  });
}

/* ---------- CONTADORES / BARRAS ---------- */
let barsDone = false;
function animateBars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return;
    b.dataset.done = "1";
    if (window.anime) anime({ targets: b, width: b.dataset.w + "%", duration: 800, delay: 100 + i * 40, easing: "easeOutCubic" });
    else b.style.width = b.dataset.w + "%";
  });
}
function animateCounters() {
  $$("[data-count]").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const o = { v: 0 };
    if (window.anime) anime({ targets: o, v: +el.dataset.count, round: 1, duration: 1000, easing: "easeOutQuad", update: () => { el.textContent = o.v; } });
  });
}

/* ---------- RENDER ---------- */
function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + "</h3>" + c.items.map(function (it) {
      var n = it[0], l = it[1];
      return '<div class="skill"><div class="skill-name"><span>' + n + '</span><span>' + l + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + l + '"></div></div></div>';
    }).join("") + "</div>";
  }).join("");

  $("#projGrid").innerHTML = DATA.projects.map(function (p) {
    return '<div class="hcard"><div class="hcard-inner"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return "<span>" + t + "</span>"; }).join("") + '</div><div class="links"><a href="#">DEMO</a><a href="#">CÓDIGO</a></div></div></div>';
  }).join("");

  $("#timeline").innerHTML = DATA.exp.map(function (e) {
    return '<div class="tl"><div class="role">' + e.role + '</div><div class="org">' + e.org + ' · <span class="dates">' + e.dates + '</span></div><ul>' + e.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  $("#contactGrid").innerHTML = DATA.contact.map(function (c) {
    return '<a class="hc" href="' + c.href + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("");
}

/* ---------- GENÉRICOS ---------- */
function clock() { const el = $("#clock"); setInterval(() => { el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false }); }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

document.addEventListener("DOMContentLoaded", () => {
  render();
  clock();
  registerSW();
  floaters();
  stars();
  splitName();
  bindTilt();
  $$(".nav-chip, .btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => {
    const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" };
    if (map[e.key]) go(map[e.key]);
  });
  go("home");
});