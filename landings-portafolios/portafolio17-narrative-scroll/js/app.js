/* ===== NARRATIVE SCROLL — app.js ===== */
var DATA = {
  stack: [
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84]] },
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 90], ["ACF PRO", 90]] },
    { cat: "Nube y datos", items: [["AWS", 82], ["Docker", 84], ["MySQL", 92], ["MongoDB", 78]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WordPress", "ACF"], desc: "Plugins modulares con ACF PRO. Menos carga, entregas más rápidas." },
    { title: "Dashboard React", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces operativas de alta disponibilidad sobre APIs REST." },
    { title: "Ecommerce", tech: ["Laravel", "WooCommerce", "MySQL"], desc: "Integración de CRMs y pasarelas de pago vía REST/SOAP." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de cuellos de botella. Resultado: +60 % de rendimiento." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor de infraestructura AWS + MySQL/PHP: +60 %.", "React + APIs REST listas para alta disponibilidad.", "Temas avanzados de WordPress con ACF PRO."] },
    { role: "Desarrollador Web Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins PHP + ACF PRO que redujeron la carga un 20 %.", "SEO, Core Web Vitals y optimización de conversión.", "Integraciones REST/SOAP y mantenimiento de catálogos grandes."] }
  ],
  contact: [
    { l: "Email", v: "ps4cristiantorr@gmail.com", href: "mailto:ps4cristiantorr@gmail.com" },
    { l: "GitHub", v: "github.com/cristiantorres", href: "#" },
    { l: "LinkedIn", v: "linkedin.com/in/cristiantorres", href: "#" },
    { l: "Web", v: "cristiantorres.dev", href: "#" }
  ]
};
var $ = function (s) { return document.querySelector(s); };
var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + '</h3>' + c.items.map(function (it) {
      return '<div class="skill-name"><span>' + it[0] + '</span><span>' + it[1] + '%</span></div><div class="bar"><div class="bar-fill" data-w="' + it[1] + '"></div></div>';
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

function progressBar() {
  var bar = $("#progress i");
  var update = function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = p + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function countUp() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      io.unobserve(el);
      var target = parseInt(el.dataset.count, 10);
      var start = 0;
      var dur = 1200;
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        el.textContent = Math.round(start + (target - start) * p);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + "+";
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  $$("[data-count]").forEach(function (el) { io.observe(el); });
}

function reveal() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("on");
      io.unobserve(el);
      if (window.anime) {
        anime({ targets: el.querySelectorAll("> *, h2, p"), opacity: [0, 1], translateY: [24, 0], delay: anime.stagger(70), duration: 600, easing: "easeOutQuad" });
      }
      var bars = el.querySelectorAll(".bar-fill");
      if (bars.length) setTimeout(function () { bars.forEach(function (b, i) { setTimeout(function () { b.style.width = b.dataset.w + "%"; }, i * 60); }); }, 150);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  $$(".rv").forEach(function (el) { io.observe(el); });
}

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380">'
    + '<rect width="300" height="380" fill="#C2410C"/>'
    + '<circle cx="150" cy="140" r="64" fill="#FBF7F1"/>'
    + '<path d="M42 380 q108 -126 216 0 Z" fill="#FBF7F1"/>'
    + '<text x="150" y="310" text-anchor="middle" font-family="Georgia" font-size="52" font-weight="700" fill="#1C1917" letter-spacing="2">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  progressBar();
  countUp();
  registerSW();
  var img = $("#portrait");
  if (img) img.onerror = function () { avatarFallback(img); };
  reveal();
});