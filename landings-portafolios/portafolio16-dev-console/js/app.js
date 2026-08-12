/* ===== DEV CONSOLE — app.js ===== */
var DATA = {
  stack: [
    { cat: "FRONTEND", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 90], ["ACF PRO", 90]] },
    { cat: "DATOS & NUBE", items: [["MySQL", 92], ["MongoDB", 78], ["AWS", 82], ["Docker", 84]] }
  ],
  projects: [
    { title: "plugin-suite", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares con ACF PRO: −20 % de carga." },
    { title: "dashboard-react", tech: ["React", "TS", "AWS"], desc: "Interfaces de alta disponibilidad sobre APIs REST." },
    { title: "ecommerce", tech: ["Laravel", "Woo", "MySQL"], desc: "Integración de CRMs y pagos vía REST/SOAP." },
    { title: "aws-audit", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella: +60 % de rendimiento." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP: +60 %.", "React + REST listas.", "Temas WP con ACF PRO."] },
    { role: "Desarrollador Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO: −20 %.", "SEO, Core Web Vitals y conversión.", "Integraciones REST/SOAP."] }
  ],
  contact: [
    { l: "EMAIL", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GITHUB", v: "github.com/cristiantorres", href: "#" },
    { l: "LINKEDIN", v: "linkedin.com/in/cristiantorres", href: "#" },
    { l: "WEB", v: "cristiantorres.dev", href: "#" }
  ]
};

var $ = function (s) { return document.querySelector(s); };
var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

function stackHTML() {
  return DATA.stack.map(function (c) {
    return '<div class="console-block"><h3>' + c.cat + '</h3><div class="sub">' + c.items.length + ' tools</div>' + c.items.map(function (it) {
      return '<div class="skill"><div class="skill-name"><span>' + it[0] + '</span><span>' + it[1] + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + it[1] + '"></div></div></div>';
    }).join("") + '</div>';
  }).join("");
}
function projectsHTML() {
  return DATA.projects.map(function (p) {
    return '<div class="proj-card"><h3>' + p.title + '</h3><p>' + p.desc + '</p><div class="tags">' + p.tech.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div></div>';
  }).join("");
}
function expHTML() {
  return DATA.exp.map(function (e) {
    return '<div class="tl"><div class="role">' + e.role + '</div><div class="org">' + e.org + ' <span class="dates">· ' + e.dates + '</span></div><ul>' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul></div>';
  }).join("");
}
function contactHTML() {
  return DATA.contact.map(function (c) {
    return '<a class="hc" href="' + c.href + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("");
}

function render() {
  $("#stackGrid").innerHTML = stackHTML();
  $("#projGrid").innerHTML = projectsHTML();
  $("#timeline").innerHTML = expHTML();
  $("#contactGrid").innerHTML = contactHTML();
}

function typeWriter(el, speed) {
  var text = el.textContent;
  el.textContent = "";
  el.dataset.typed = "1";
  var n = 0;
  var iv = setInterval(function () {
    n++;
    el.textContent = text.slice(0, n);
    if (n >= text.length) clearInterval(iv);
  }, speed || 14);
}

function revealAll() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("on");
      io.unobserve(el);
      if (window.anime) {
        var kids = el.querySelectorAll("h1, h2, h3, p, .role-line, .lede, .sub, .btn-link, .meta li, .proj-card, .console-block, .tl, .hc");
        anime({ targets: kids, opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(50), duration: 520, easing: "easeOutQuad" });
      }
      var bars = el.querySelectorAll(".bar-fill");
      if (bars.length) {
        setTimeout(function () {
          bars.forEach(function (b, i) { setTimeout(function () { b.style.width = b.dataset.w + "%"; }, i * 60); });
        }, 200);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".rv").forEach(function (el) { io.observe(el); });
}

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360" viewBox="0 0 300 360">'
    + '<rect width="300" height="360" fill="#0E141C"/>'
    + '<circle cx="150" cy="120" r="62" fill="#22C55E"/>'
    + '<path d="M40 360 q110 -130 220 0 Z" fill="#22C55E"/>'
    + '<text x="150" y="300" text-anchor="middle" font-family="monospace" font-size="52" font-weight="700" fill="#0B0F14" letter-spacing="2">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function clock() { var el = $("#tclock"); if (el) setInterval(function () { el.textContent = "[" + new Date().toLocaleTimeString("es-CO", { hour12: false }) + "]"; }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  clock();
  registerSW();
  var img = $("#portrait");
  if (img) img.onerror = function () { avatarFallback(img); };
  revealAll();
  setTimeout(function () { var rl = $(".role-line"); if (rl) typeWriter(rl, 20); }, 300);
});