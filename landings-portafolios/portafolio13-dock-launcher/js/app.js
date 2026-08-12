/* ===== DOCK LAUNCHER — app.js ===== */
const DATA = {
  apps: [
    { id: "profile", name: "Perfil", color: "#4C7DF0", svg: '<circle cx="12" cy="8" r="4" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>' },
    { id: "stack", name: "Stack", color: "#7B61FF", svg: '<rect x="4.5" y="4.5" width="6" height="6" rx="1"/><rect x="13" y="4.5" width="6" height="6" rx="1"/><rect x="4.5" y="13" width="6" height="6" rx="1"/><rect x="13" y="13" width="6" height="6" rx="1"/>' },
    { id: "projects", name: "Proyectos", color: "#18BFA8", svg: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>' },
    { id: "experience", name: "Trayectoria", color: "#F2A33C", svg: '<circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' },
    { id: "contact", name: "Contacto", color: "#F05C7A", svg: '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="m4 7.5 8 6 8-6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' }
  ],
  stack: [
    { cat: "Frontend", items: [["React", 88], ["TypeScript", 85], ["JavaScript", 93], ["Tailwind", 90]] },
    { cat: "Backend", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84]] },
    { cat: "CMS & Datos", items: [["WordPress", 95], ["ACF PRO", 90], ["MySQL", 92], ["MongoDB", 78]] }
  ],
  projects: [
    { title: "Plugin Suite", tech: ["PHP", "WordPress", "ACF"], desc: "Plugins modulares con ACF PRO: −20 % de carga." },
    { title: "Dashboard React", tech: ["React", "TypeScript", "AWS"], desc: "Interfaces de alta disponibilidad sobre APIs REST." },
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

function buildDock() {
  var dock = $("#dock");
  var html = DATA.apps.map(function (a) {
    return '<div class="dock-item" data-app="' + a.id + '">'
      + '<div class="ico" style="background:' + a.color + '"><svg viewBox="0 0 24 24" fill="none">' + a.svg + '</svg></div>'
      + '<div class="lbl">' + a.name + '</div></div>';
  }).join("");
  dock.innerHTML = html;
  $$(".dock-item").forEach(function (it) { it.addEventListener("click", function () { openApp(it.dataset.app); }); });
}

function wireMagnify() {
  var dock = $("#dock");
  dock.addEventListener("mousemove", function (e) {
    var cursorX = e.clientX;
    $$(".dock-item .ico").forEach(function (ico) {
      var r = ico.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var d = Math.abs(cursorX - cx);
      var s = Math.max(0, 1 - d / 90);
      ico.style.transform = "scale(" + (1 + s * 0.55).toFixed(3) + ")";
    });
  });
  dock.addEventListener("mouseleave", function () {
    $$(".dock-item .ico").forEach(function (ico) { ico.style.transform = "scale(1)"; });
  });
}

function avatarFallback(img) {
  img.onerror = null;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">'
    + '<rect width="300" height="300" fill="#7B61FF" rx="20"/>'
    + '<circle cx="150" cy="115" r="55" fill="#fff" opacity=".95"/>'
    + '<path d="M55 300 q95 -120 190 0 Z" fill="#fff" opacity=".95"/>'
    + '<text x="150" y="258" text-anchor="middle" font-family="Arial" font-size="52" font-weight="700" fill="#4C7DF0" letter-spacing="2">C·T</text></svg>';
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function stackHTML() {
  return DATA.stack.map(function (c) {
    return '<div class="sblock"><h3>' + c.cat + '</h3>' + c.items.map(function (it) {
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
function contactsHTML() {
  return DATA.contact.map(function (c) {
    return '<a class="hc" href="' + c.href + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("");
}

function winBody(id) {
  if (id === "profile") {
    return '<div class="win-body"><div class="identity-row">'
      + '<div class="ident-photo"><img id="portrait" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Cristian Torres"/></div>'
      + '<div class="ident-body"><h1>Cristian Torres</h1><div class="sub">Full Stack Developer · Medellín</div>'
      + '<p>10+ años creando productos web que escalan: PHP, WordPress, React y APIs REST. Me enfoco en rendimiento y en que el negocio se note.</p>'
      + '<div class="chip-set"><span>PHP</span><span>Laravel</span><span>React</span><span>WordPress</span><span>AWS</span></div></div></div></div>';
  }
  if (id === "stack") return '<div class="win-body"><h2>Stack</h2><div class="stack-grid">' + stackHTML() + '</div></div>';
  if (id === "projects") return '<div class="win-body"><h2>Proyectos</h2><div class="proj-grid">' + projectsHTML() + '</div></div>';
  if (id === "experience") return '<div class="win-body"><h2>Trayectoria</h2><div class="timeline">' + expHTML() + '</div></div>';
  if (id === "contact") return '<div class="win-body"><h2>Contacto</h2><div class="contact-grid">' + contactsHTML() + '</div></div>';
  return "";
}

function openApp(id) {
  var app = DATA.apps.find(function (a) { return a.id === id; });
  if (!app) return;
  var win = document.createElement("div");
  win.className = "win";
  win.innerHTML = '<div class="win-head">'
    + '<div class="traffic"><span class="t-red"></span><span class="t-yellow"></span><span class="t-green"></span></div>'
    + '<div class="wtitle">' + app.name + '</div>'
    + '<button class="close">Cerrar</button></div>'
    + winBody(id);
  document.body.appendChild(win);
  $("#overlay").classList.add("open");
  requestAnimationFrame(function () { win.classList.add("open"); });
  win.querySelector(".close").addEventListener("click", close);
  var photo = win.querySelector("#portrait");
  if (photo) photo.onerror = function () { avatarFallback(photo); };
  win.querySelectorAll(".bar-fill").forEach(function (b, i) {
    setTimeout(function () { b.style.width = b.dataset.w + "%"; }, 80 + i * 30);
  });
}

function close() {
  var win = document.querySelector(".win");
  if (win) {
    win.classList.remove("open");
    setTimeout(function () { win.remove(); }, 250);
  }
  $("#overlay").classList.remove("open");
}

function clock() { var el = $("#clock"); if (el) setInterval(function () { el.textContent = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }); }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  var overlay = $("#overlay");
  buildDock();
  wireMagnify();
  clock();
  registerSW();
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { close(); return; }
    var map = { "1": "profile", "2": "stack", "3": "projects", "4": "experience", "5": "contact" };
    if (map[e.key]) openApp(map[e.key]);
  });
});