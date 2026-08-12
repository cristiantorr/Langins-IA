/* ===== HERO PARALLAX — app.js ===== */
var DATA = {
  stack: [
    ["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["React", 88], ["TypeScript", 85],
    ["JavaScript", 93], ["WordPress", 95], ["ACF PRO", 90], ["MySQL", 92], ["AWS", 82], ["Docker", 84]
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares que aligeran: −20 % de carga." },
    { title: "Dashboard React", tech: ["React", "TS", "AWS"], desc: "Interfaces operativas de alta disponibilidad." },
    { title: "Ecommerce", tech: ["Laravel", "Woo", "MySQL"], desc: "CRMs y pagos integrados vía REST/SOAP." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella: +60 %." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP: +60 %.", "APIs REST de alta disponibilidad."] },
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

function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function (s) { return '<span class="chip">' + s[0] + '<b>' + s[1] + '%</b></span>'; }).join("");
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

function parallax() {
  var orbs = $("#orbs");
  var heroInner = $("#heroInner");
  var o1 = orbs.querySelector(".o1");
  var o2 = orbs.querySelector(".o2");
  var o3 = orbs.querySelector(".o3");
  var ticking = false;
  var update = function () {
    ticking = false;
    var y = window.scrollY;
    if (o1) o1.style.transform = "translate(" + y * 0.08 + "px, " + y * 0.05 + "px)";
    if (o2) o2.style.transform = "translate(" + y * -0.1 + "px, " + y * 0.04 + "px)";
    if (o3) o3.style.transform = "translate(" + y * 0.05 + "px, " + y * -0.06 + "px)";
if (heroInner) heroInner.style.opacity = Math.max(0, 1 - y / 600);
    $$(".deck").forEach(function (d) {
      var card = d.querySelector(".card");
      if (!card) return;
      var r = d.getBoundingClientRect();
      var prog = (window.innerHeight - r.top) / window.innerHeight;
      var scale = 0.94 + Math.min(0.06, prog * 0.06);
      card.style.transform = "translateY(" + (r.top < 0 ? -r.top * 0.2 : 0) + "px) scale(" + scale + ")";
      card.style.opacity = prog > 0 ? 1 : 0.5;
    });
  };
  window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
}

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520">'
    + '<rect width="400" height="520" fill="#FF4D86"/>'
    + '<circle cx="200" cy="180" r="84" fill="#111827"/>'
    + '<path d="M48 520 q190 -210 304 0 Z" fill="#111827"/>'
    + '<text x="200" y="440" text-anchor="middle" font-family="Arial" font-size="64" font-weight="700" fill="#4DF0C0" letter-spacing="3">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  parallax();
  registerSW();
  var img = $("#portrait");
  if (img) img.onerror = function () { avatarFallback(img); };
});