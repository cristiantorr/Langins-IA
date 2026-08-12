/* ===== PARTICLE NEURAL — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TS", 85], ["JS", 93], ["HTML/CSS", 93], ["Tailwind", 90], ["Astro", 78]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF", 90], ["Strapi", 70]] },
    { cat: "DATOS & NUBE", items: [["MySQL", 92], ["MongoDB", 78], ["AWS EC2", 82], ["S3", 80]] },
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WP", "ACF"], desc: "Nodos modulares con ACF PRO: -20% de carga." },
    { title: "React + REST", tech: ["React", "TS", "AWS"], desc: "Dashboards conectados a APIs REST, alta disponibilidad." },
    { title: "E-Commerce", tech: ["Laravel", "Woo", "MySQL"], desc: "Sinapsis entre CRMs y pasarelas de pago REST/SOAP." },
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL +60%.", "React + REST."] },
    { role: "Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP -20%.", "SEO / Web Vitals."] },
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

/* ---------- RED DE PARTÍCULAS (canvas + mouse) ---------- */
function neural() {
  const c = $("#net"), g = c.getContext("2d");
  let W, H, parts = [], mouse = { x: -999, y: -999 };
  const N = 90, DIST = 130;

  function size() { W = c.width = innerWidth; H = c.height = innerHeight; }
  function mk() { parts = new Array(N).fill(0).map(() => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 })); }

  addEventListener("resize", () => { size(); mk(); });
  addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  size(); mk();

  (function loop() {
    g.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      const dd = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (dd < 140 && dd > 1) { p.x -= ((mouse.x - p.x) / dd) * 1.2; p.y -= ((mouse.y - p.y) / dd) * 1.2; }
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < DIST) { g.strokeStyle = "rgba(56,255,140," + (1 - d / DIST) * 0.35 + ")"; g.lineWidth = 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
    }
    g.fillStyle = "#38FF8C";
    for (const p of parts) { g.shadowBlur = 8; g.shadowColor = "#38FF8C"; g.beginPath(); g.arc(p.x, p.y, 2 + (Math.hypot(mouse.x - p.x, mouse.y - p.y) < 140 ? 2.2 : 0), 0, Math.PI * 2); g.fill(); g.shadowBlur = 0; }
    requestAnimationFrame(loop);
  })();
}

/* ---------- NAV ---------- */
function go(view) {
  $$(".dnav").forEach((d) => d.classList.toggle("active", d.dataset.view === view));
  const next = $(".panel[data-view=\"" + view + "\"]");
  $$(".panel").forEach((p) => p.classList.remove("active"));
  next.classList.add("active");
  if (window.anime) anime({ targets: next.children, opacity: [0, 1], translateY: [18, 0], filter: ["blur(4px)", "blur(0px)"], delay: anime.stagger(60), duration: 500, easing: "outCubic" });
  if (view === "stack") bars();
  if (view === "home") bounceName();
}

function bars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 30);
  });
}
let bounced = false;
function bounceName() {
  if (bounced) return; bounced = true;
  const name = $("#bigName");
  if (window.anime) anime({ targets: name, keyframes: [{ scale: 1 }, { scale: 1.06 }, { scale: 1 }], duration: 900, easing: "easeInOutQuad" });
}

/* ---------- RENDER (concatenación) ---------- */
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
  try { neural(); } catch (err) { /* el canvas es decorativo; la navegación sigue operativa */ }
  $$(".dnav, .btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" }; if (map[e.key]) go(map[e.key]); });
  go("home");
});