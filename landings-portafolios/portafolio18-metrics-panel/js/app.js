/* ===== METRICS PANEL — app.js ===== */
var DATA = {
  kpi: [
    { label: "Años exp.", value: 10, suffix: "+", delta: "expertup" },
    { label: "Rendimiento", value: 60, suffix: "%", delta: "tras auditoría AWS" },
    { label: "Menos carga", value: 20, suffix: "%", delta: "con plugins ACF" },
    { label: "Proyectos", value: 20, suffix: "+", delta: "en producción" }
  ],
  sections: [
    { id: "hero", label: "Overview" },
    { id: "kpi", label: "Métricas" },
    { id: "apilacion", label: "Stack" },
    { id: "proyectos", label: "Proyectos" },
    { id: "trayectoria", label: "Trayectoria" },
    { id: "contacto", label: "Contacto" }
  ],
  stack: [
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85]] },
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93]] },
    { cat: "CMS", items: [["WordPress", 95], ["ACF PRO", 90], ["WooCommerce", 85]] },
    { cat: "Infra", items: [["AWS", 82], ["Docker", 84], ["MySQL", 92]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares: −20 % de carga." },
    { title: "Dashboard React", tech: ["React", "TS", "AWS"], desc: "Alta disponibilidad sobre REST." },
    { title: "Ecommerce", tech: ["Laravel", "Woo", "MySQL"], desc: "CRMs y pagos vía REST/SOAP." },
    { title: "Auditoría AWS", tech: ["AWS", "MySQL", "PHP"], desc: "+60 % de rendimiento." }
  ],
  exp: [
    { role: "Full Stack Developer", org: "Pureblink Inc.", dates: "2025 — 2026", bullets: ["Refactor AWS + MySQL/PHP: +60 %.", "APIs REST alta disponibilidad."] },
    { role: "Desarrollador Semi Senior", org: "Digital Studio", dates: "2014 — 2024", bullets: ["Plugins ACF PRO: −20 % cargeload.", "SEO y conversión."] }
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
  $("#kpiGrid").innerHTML = DATA.kpi.map(function (k) {
    return '<div class="kpi"><div class="label">' + k.label + '</div><b data-count="' + k.value + '" data-suffix="' + k.suffix + '">0</b><div class="delta">' + k.delta + '</div></div>';
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

function buildRail() {
  $("#railNav").innerHTML = DATA.sections.map(function (s) {
    return '<a class="rail-item" data-target="' + s.id + '" href="#' + s.id + '"><span class="dot"></span>' + s.label + '</a>';
  }).join("");
}

function highlightRail() {
  var items = $$(".rail-item");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        items.forEach(function (it) { it.classList.toggle("active", it.dataset.target === en.target.id); });
      }
    });
  }, { threshold: 0.4 });
  DATA.sections.forEach(function (s) {
    var el = document.getElementById(s.id);
    if (el) io.observe(el);
  });
}

function countUp() {
  $$("[data-count]").forEach(function (el) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var target = parseInt(en.target.dataset.count, 10);
        var suffix = en.target.dataset.suffix || "";
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / 1200);
          en.target.textContent = Math.round(target * p) + suffix;
          if (p < 1) requestAnimationFrame(step); else en.target.textContent = target + suffix;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

function reveal() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("on");
      io.unobserve(el);
      if (window.anime) {
        anime({ targets: el.querySelectorAll(".kpi, .sblock, .proj-card, .tl, .hc, .shead"), opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(60), duration: 550, easing: "easeOutQuad" });
      }
      var bars = el.querySelectorAll(".bar-fill");
      if (bars.length) setTimeout(function () { bars.forEach(function (b, i) { setTimeout(function () { b.style.width = b.dataset.w + "%"; }, i * 50); }); }, 150);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  $$(".rv").forEach(function (el) { io.observe(el); });
}

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="520" viewBox="0 0 480 520">'
    + '<rect width="480" height="520" fill="#7C5CFF"/>'
    + '<circle cx="240" cy="180" r="90" fill="#0E1117"/>'
    + '<path d="M60 520 q180 -210 360 0 Z" fill="#0E1117"/>'
    + '<text x="240" y="440" text-anchor="middle" font-family="Arial" font-size="70" font-weight="700" fill="#22D3EE" letter-spacing="3">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function clock() { var el = $("#clock"); if (el) setInterval(function () { el.textContent = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  buildRail();
  clock();
  registerSW();
  var img = $("#portrait");
  if (img) img.onerror = function () { avatarFallback(img); };
  countUp();
  reveal();
  highlightRail();
});