/* ===== SPLIT PATH — app.js ===== */
const DATA = {
  steps: [
    { id: "perfil", n: "01", label: "Perfil" },
    { id: "stack", n: "02", label: "Stack" },
    { id: "proyectos", n: "03", label: "Proyectos" },
    { id: "trayectoria", n: "04", label: "Trayectoria" },
    { id: "contacto", n: "05", label: "Contacto" }
  ],
  stack: [
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90]] },
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84]] },
    { cat: "CMS & Datos", items: [["WordPress", 95], ["ACF PRO", 90], ["MySQL", 92], ["MongoDB", 78]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WordPress", "ACF"], desc: "Plugins modulares con ACF PRO: −20 % de carga." },
    { title: "Dashboard React", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces de alta disponibilidad sobre APIs REST." },
    { title: "Ecommerce", tech: ["Laravel", "WooCommerce", "MySQL"], desc: "Integración de CRMs y pagos vía REST/SOAP." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella: +60 % de rendimiento." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP: +60 %.", "React + REST APIs listas."] },
    { role: "Desarrollador Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO: −20 %.", "SEO, Core Web Vitals y conversión."] }
  ],
  contact: [
    { l: "Email", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GitHub", v: "github.com/cristiantorres", href: "#" },
    { l: "LinkedIn", v: "linkedin.com/in/cristiantorres", href: "#" }
  ]
};

var $ = function (s) { return document.querySelector(s); };
var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">'
    + '<circle cx="200" cy="200" r="200" fill="#10141C"/>'
    + '<circle cx="200" cy="165" r="75" fill="#F2F4F8"/>'
    + '<path d="M70 400 q130 -170 260 0 Z" fill="#F2F4F8"/>'
    + '<text x="200" y="350" text-anchor="middle" font-family="Arial" font-size="62" font-weight="700" fill="#00C2A8" letter-spacing="2">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function buildStepper() {
  var html = "";
  DATA.steps.forEach(function (s, i) {
    if (i > 0) html += '<span class="step-link" id="link' + i + '"></span>';
    html += '<div class="step-node" data-step="' + s.id + '"><span class="step-dot">' + s.n + '</span><span class="label">' + s.label + '</span></div>';
  });
  $("#stepper").innerHTML = html;
  $$(".step-node").forEach(function (n) { n.addEventListener("click", function () { go(n.dataset.step); }); });
}

function go(step) {
  var idx = DATA.steps.findIndex(function (s) { return s.id === step; });
  DATA.steps.forEach(function (s, i) {
    var node = document.querySelector('.step-node[data-step="' + s.id + '"]');
    node.classList.toggle("active", s.id === step);
    node.classList.toggle("done", i < idx);
    var link = document.getElementById("link" + i);
    if (link) link.classList.toggle("done", i <= idx);
  });
  $$(".panel").forEach(function (p) { p.classList.remove("active"); });
  var next = $('.panel[data-step="' + step + '"]');
  next.classList.add("active");
  if (window.anime) {
    anime({ targets: next.children, opacity: [0, 1], translateX: [22, 0], delay: anime.stagger(60), duration: 520, easing: "easeOutCubic" });
  }
  if (step === "stack") bars();
}

function bars() {
  $$(".bar-fill").forEach(function (b, i) {
    if (b.dataset.done) return; b.dataset.done = "1";
    setTimeout(function () { b.style.width = b.dataset.w + "%"; }, 60 + i * 30);
  });
}

function stackHTML() {
  return '<div class="stack-grid">' + DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + '</h3>' + c.items.map(function (it) {
      return '<div class="skill"><div class="skill-name"><span>' + it[0] + '</span><span>' + it[1] + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + it[1] + '"></div></div></div>';
    }).join("") + '</div>';
  }).join("") + '</div>';
}
function projectsHTML() {
  return '<div class="proj-grid">' + DATA.projects.map(function (p) {
    return '<div class="proj-card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div></div>';
  }).join("") + '</div>';
}
function expHTML() {
  return '<div class="timeline">' + DATA.exp.map(function (e) {
    return '<div class="tl"><div class="role">' + e.role + '</div><div class="org">' + e.org + ' <span class="dates">· ' + e.dates + '</span></div><ul>' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul></div>';
  }).join("") + '</div>';
}
function contactHTML() {
  return '<div class="contact-grid">' + DATA.contact.map(function (c) {
    return '<a class="hc" href="' + c.href + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("") + '</div>';
}

function render() {
  $("#stackGrid").innerHTML = stackHTML();
  $("#projGrid").innerHTML = projectsHTML();
  $("#timeline").innerHTML = expHTML();
  $("#contactGrid").innerHTML = contactHTML();
  buildStepper();
}

function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  var img = $("#portrait");
  if (img) img.onerror = function () { avatarFallback(img); };
  render();
  registerSW();
  document.addEventListener("keydown", function (e) {
    var map = { "1": "perfil", "2": "stack", "3": "proyectos", "4": "trayectoria", "5": "contacto" };
    if (map[e.key]) go(map[e.key]);
  });
  go("perfil");
});