/* ===== ORBITAL INTERFACE — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TS", 85], ["JS", 93], ["Tailwind", 90]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node", 85]] },
    { cat: "CMS", items: [["WordPress", 95], ["ACF", 90], ["Strapi", 70]] },
    { cat: "DATOS", items: [["MySQL", 92], ["Mongo", 78], ["AWS", 82]] },
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares ACF: -20% carga." },
    { title: "React + REST", tech: ["React", "TS", "AWS"], desc: "Dashboards sobre APIs REST." },
    { title: "E-Commerce", tech: ["Laravel", "Woo", "MySQL"], desc: "CRMs y pagos REST/SOAP." },
  ],
  exp: [
    { role: "Full Stack Dev", org: "Pureblink Inc.", dates: "2025-26", bullets: ["AWS +60%.", "React+REST."] },
    { role: "Semi Senior", org: "Digital Studio", dates: "2014-24", bullets: ["PHP -20%.", "SEO."] },
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

/* ---------- POSICIONAR PLANETAS EN ÓRBITA ---------- */
function placePlanets() {
  const planets = $$(".planet");
  const R = Math.min(innerWidth, 620) < 620 ? 150 : 225;
  planets.forEach((p, i) => {
    const angle = (i * 72 - 90) * Math.PI / 180;
    const x = Math.cos(angle) * R;
    const y = Math.sin(angle) * R;
    p.dataset.ox = x; p.dataset.oy = y;
    p.style.transform = "translate(-50%,-50%) translate(" + x + "px," + y + "px)";
  });
}

/* ---------- ANILLOS rotan ---------- */
function rings() {
  anime({ targets: ".r1", rotate: 360, duration: 22000, loop: true, easing: "linear" });
  anime({ targets: ".r2", rotate: -360, duration: 30000, loop: true, easing: "linear" });
}

/* ---------- ESTRELLAS parpadean ---------- */
function twinkle() {
  const wrap = $(".bg-stars");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("i");
    s.textContent = "✦";
    s.style.cssText = "position:absolute;left:" + (Math.random() * 96 + 2) + "%;top:" + (Math.random() * 96 + 2) + "%;color:rgba(0,229,255,0.5);font-size:8px;font-style:normal;";
    wrap.appendChild(s);
    anime({ targets: s, opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8], duration: 2000 + Math.random() * 2000, delay: Math.random() * 2000, loop: true, easing: "linear" });
  }
}

/* ---------- NAV ---------- */
function go(view) {
  $$(".planet").forEach((p) => p.classList.toggle("active", p.dataset.view === view));
  const next = $(".panel[data-view=\"" + view + "\"]");
  $$(".panel").forEach((p) => p.classList.remove("active"));
  next.classList.add("active");
  if (window.anime) {
    anime({ targets: next, scale: [0.6, 1], opacity: [0, 1], duration: 500, easing: "easeOutBack(1.4)" });
  }
  if (view === "stack") bars();
}

function bars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 40);
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
  placePlanets();
  rings();
  twinkle();
  $$(".planet").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => { const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" }; if (map[e.key]) go(map[e.key]); });
  go("home");
});