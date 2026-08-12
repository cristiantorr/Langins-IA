/* ===== LIQUID NEON — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TS", 85], ["JS", 93], ["Tailwind", 90], ["Astro", 78]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node", 85], ["Express", 84]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF", 90], ["Strapi", 70]] },
    { cat: "DATOS & NUBE", items: [["MySQL", 92], ["MongoDB", 78], ["AWS EC2", 82], ["S3", 80]] },
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares con ACF PRO, -20% de carga." },
    { title: "React + REST", tech: ["React", "TS", "AWS"], desc: "Dashboards fluidos sobre APIs REST." },
    { title: "E-Commerce", tech: ["Laravel", "Woo", "MySQL"], desc: "Integración continua con CRMs y pagos." },
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL +60%.", "React + REST con alta disponibilidad."] },
    { role: "Semi Senior Web Dev", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO -20%.", "SEO, Core Web Vitals y conversión."] },
  ],
  contact: [
    { l: "EMAIL", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GITHUB", v: "github.com/cristiantorres", href: "#" },
    { l: "LINKEDIN", v: "linkedin.com/in/cristiantorres", href: "#" },
    { l: "WEB", v: "cristintorres.dev", href: "#" },
  ],
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- BLOSS FLUIDOS (anime.js loop con elastic) ---------- */
function blobs() {
  const seq = [
    { t: ".b1", x: ["-10vw", "20vw"], y: ["-12vh", "8vh"], s: [1, 1.15], r: 9000 },
    { t: ".b2", x: ["-8vw", "-16vw"], y: ["20vh", "42vh"], s: [1, 1.2], r: 11000 },
    { t: ".b3", x: ["30vw", "14vw"], y: ["-18vh", "-30vh"], s: [1, 1.1], r: 10000 },
  ];
  seq.forEach((o) => {
    anime({ targets: o.t, translateX: o.x, translateY: o.y, scale: o.s, duration: o.r, loop: true, direction: "alternate", easing: "easeInOutSine" });
    anime({ targets: o.t, rotate: [0, 180], duration: o.r * 2, loop: true, direction: "alternate", easing: "easeInOutQuad" });
  });
}

/* ---------- NAV ---------- */
function go(view) {
  $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.view === view));
  const next = $(".panel[data-view=\"" + view + "\"]");
  $$(".panel").forEach((p) => p.classList.remove("active"));
  next.classList.add("active");
  if (window.anime) {
    anime({ targets: next.children, opacity: [0, 1], translateX: [40, 0], delay: anime.stagger(70), duration: 800, easing: "easeOutBack(1,0.8)" });
  }
  if (view === "stack") bars();
}

function bars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 35);
  });
}

/* ---------- RENDER ---------- */
function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + "</h3>" + c.items.map(function (it) {
      return '<div class="skill"><div class="skill-name"><span>' + it[0] + '</span><span>' + it[1] + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + it[1] + '"></div></div></div>';
    }).join("") + "</div>";
  }).join("");
  $("#projGrid").innerHTML = DATA.projects.map(function (p) {
    return '<div class="proj-card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return "<span>" + t + "</span>"; }).join("") + '</div><div class="proj-links"><a href="#">DEMO</a><a href="#">CÓDIGO</a></div></div>';
  }).join("");
  $("#timeline").innerHTML = DATA.exp.map(function (e) {
    return '<div class="tl"><div class="role">' + e.role + '</div><div class="org">' + e.org + ' <span class="dates">· ' + e.dates + '</span></div><ul>' + e.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + '</ul></div>';
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
  blobs();
  $$(".tab, .btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" }; if (map[e.key]) go(map[e.key]); });
  go("home");
});