/* ===== TYPOGRAPHY MOTION — app.js (tipografía cinética) ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TS", 85], ["JS", 93], ["Tailwind", 90], ["Astro", 78]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF", 90], ["Strapi", 70]] },
    { cat: "DATOS & NUBE", items: [["MySQL", 92], ["MongoDB", 78], ["AWS EC2", 82], ["S3", 80], ["Docker", 82]] },
  ],
  projects: [
    { title: "PLUGIN SUITE", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares con ACF PRO, -20% de carga." },
    { title: "DASHBOARD REACT", tech: ["React", "TS", "AWS"], desc: "Interfaces sobre APIs REST, alta disponibilidad." },
    { title: "ECOMMERCE", tech: ["Laravel", "Woo", "MySQL"], desc: "Integración de CRMs y pagos vía REST/SOAP." },
    { title: "AWS AUDIT", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor y cuellos de botella: +60% rendimiento." },
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP +60%.", "React + REST, alta disponibilidad.", "Temas WP + ACF PRO."] },
    { role: "Semi Senior Web Dev", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO -20%.", "SEO / Core Web Vitals / conversión.", "Integraciones REST/SOAP."] },
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

/* ---------- MARQUEE (loop infinito) ---------- */
function marquee() {
  const track = $("#mq");
  track.innerHTML += track.textContent; // duplica para loop
  anime({ targets: track, translateX: ["0%", "-50%"], duration: 20000, loop: true, easing: "linear" });
}

/* ---------- TITRE POR LETRA ---------- */
function splitTo(el) {
  el.dataset.split = "1";
  const text = el.textContent;
  el.textContent = "";
  const frag = document.createDocumentFragment();
  [...text].forEach((ch) => {
    const s = document.createElement("span");
    s.className = "ch";
    s.textContent = ch === " " ? "\u00A0" : ch;
    frag.appendChild(s);
  });
  el.appendChild(frag);
  return el.querySelectorAll(".ch");
}

function animateIn(el) {
  const chs = splitTo(el);
  if (window.anime) {
    anime({ targets: chs, opacity: [0, 1], translateY: [60, 0], rotateZ: [-10, 0], delay: anime.stagger(35), duration: 800, easing: "easeOutElastic(1,0.7)" });
  }
}
function floatLoop(el) {
  const chs = splitTo(el);
  if (window.anime) {
    anime({ targets: chs, translateY: (t, i) => [0, i % 2 ? 8 : -8], duration: 2200, delay: (t, i) => i * 90, loop: true, direction: "alternate", easing: "easeInOutSine" });
  }
}

function setupGiant() {
  const el = $("#giantName");
  const chs = splitTo(el);
  if (window.anime) {
    anime({ targets: chs, opacity: [0, 1], translateY: [70, 0], rotateZ: [-12, 0], delay: anime.stagger(40), duration: 850, easing: "easeOutElastic(1,0.7)" });
    anime({ targets: chs, translateY: (t, i) => [0, i % 2 ? 9 : -9], duration: 2400, delay: (t, i) => i * 110, loop: true, direction: "alternate", easing: "easeInOutSine" });
  }
}

/* ---------- ROLE LINE (typewriter) ---------- */
function roleType() {
  const el = $("#roleLine");
  const text = el.textContent;
  el.textContent = "";
  let n = 0;
  const iv = setInterval(() => {
    n++;
    el.textContent = text.slice(0, n);
    if (n >= text.length) clearInterval(iv);
  }, 45);
}

/* ---------- NAV ---------- */
function go(view) {
  $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.view === view));
  const next = $(".panel[data-view=\"" + view + "\"]");
  $$(".panel").forEach((p) => p.classList.remove("active"));
  next.classList.add("active");
  if (window.anime) anime({ targets: next.children, opacity: [0, 1], translateX: [40, 0], filter: ["blur(3px)", "blur(0px)"], delay: anime.stagger(60), duration: 600, easing: "easeOutCubic" });
  next.querySelectorAll(".sect").forEach((s) => animateIn(s));
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
    return '<div class="proj-card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return "<span>" + t + "</span>"; }).join("") + '</div></div>';
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
  marquee();
  setupGiant();
  roleType();
  $$(".chip, .btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" }; if (map[e.key]) go(map[e.key]); });
  go("home");
});