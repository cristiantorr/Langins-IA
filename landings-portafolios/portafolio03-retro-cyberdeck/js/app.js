/* ===== RETRO CYBERDECK / CRT — app.js ===== */
const DATA = {
  stack: [
    { cat: "FRONTEND", items: [["HTML5", 95], ["CSS3", 92], ["JS", 93], ["TS", 85], ["React", 88], ["Astro", 78], ["Tailwind", 90]] },
    { cat: "BACKEND", items: [["PHP", 92], ["Laravel", 88], ["Node.js", 85], ["Express", 84], ["Python", 75]] },
    { cat: "CMS", items: [["WordPress", 95], ["WooCommerce", 85], ["ACF PRO", 90], ["Elementor", 82], ["Strapi", 70]] },
    { cat: "DB", items: [["MySQL", 92], ["MariaDB", 85], ["MongoDB", 78]] },
    { cat: "CLOUD", items: [["AWS EC2", 82], ["AWS S3", 80]] },
    { cat: "TOOLS", items: [["Git", 90], ["Docker", 82], ["Vite", 85], ["WP-CLI", 85]] },
  ],
  projects: [
    { title: "PLUGIN SUITE", tech: ["PHP", "WP", "ACF"], desc: "Plugins modulares + ACF PRO: -20% tiempo de carga." },
    { title: "REACT + REST", tech: ["React", "TS", "AWS"], desc: "Dashboards escalables conectados a APIs REST, alta disponibilidad." },
    { title: "ECOMMERCE", tech: ["Laravel", "Woo", "MySQL"], desc: "Tienda conectada a CRMs y pasarelas vía REST/SOAP." },
    { title: "AWS AUDIT", tech: ["AWS", "MySQL", "PHP"], desc: "Refactor de apps en AWS: +60% rendimiento y seguridad." },
  ],
  exp: [
    { role: "FULL STACK DEVELOPER", org: "PUREBLINK INC.", dates: "MAY 2025 - MAY 2026", bullets: ["Refactor AWS + MySQL/PHP: +60% rendimiento.", "React + REST, alta disponibilidad.", "Temas WP con ACF PRO y alta conversión."] },
    { role: "SEMI SENIOR WEB DEV", org: "DIGITAL STUDIO", dates: "OCT 2014 - SEP 2024", bullets: ["Plugins PHP + ACF PRO: -20% carga.", "Optimización SEO y Core Web Vitals.", "Integraciones REST/SOAP con CRMs y pagos."] },
  ],
  edu: "SENA — Tecnólogo en Análisis y Desarrollo de Sistemas de Información (2012-2014)",
  certs: ["IA con Claude (Claude 101)", "Node.js + Express", "React", "WordPress", "HTML5 + JS + CSS3"],
  location: "MEDELLIN, COLOMBIA · Discreto, fits in.",
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const ASCII = [
  "  ██████╗███████╗████████╗",
  " ██╔════╝██╔════╝╚══██╔══╝",
  " ██║     ███████╗   ██║",
  " ██║     ╚════██║   ██║",
  " ╚██████╗███████║   ██║",
  "  ╚═════╝╚══════╝   ╚═╝  FULL STACK",
].join("\n");

/* ---------- RENDER ---------- */
function render() {
  $("#asciiArt").textContent = ASCII;

  $("#stackGrid").innerHTML = DATA.stack.map((c) => `
    <div class="stack-block"><h3>${c.cat}</h3>
      ${c.items.map(([n, l]) => `
        <div class="skill"><div class="skill-name"><b>${n}</b><b>${l}%</b></div>
          <div class="bar"><div class="bar-fill" data-w="${l}"></div></div></div>`).join("")}
    </div>`).join("");

  $("#projGrid").innerHTML = DATA.projects.map((p) => `
    <article class="proj-card">
      <h3>${p.title}</h3><p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links"><a href="#">[DEMO]</a> <a href="#">[COD]</a></div>
    </article>`).join("");

  $("#cvList").innerHTML = DATA.exp.map((e) => `
    <div class="cv-item">
      <div class="cv-role">${e.role}</div><div class="cv-org">${e.org}</div><div class="cv-dates">${e.dates}</div>
      <ul class="cv-bullets">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>`).join("");

  $("#eduBlock").innerHTML = `<b>SENA</b> ${DATA.edu}<br/><b>CERT:</b> ${DATA.certs.join(" · ")}`;

  $("#contactList").innerHTML = `
    <div class="contact-row"><span class="cl">EMAIL</span><a href="mailto:ps4cristiantorr@gmail.com">ps4cristiantorr@gmail.com</a></div>
    <div class="contact-row"><span class="cl">GITHUB</span><a href="#">github.com/cristiantorres</a></div>
    <div class="contact-row"><span class="cl">LINKEDIN</span><a href="#">linkedin.com/in/cristiantorres</a></div>
    <div class="contact-row"><span class="cl">SITE</span><a href="#">cristiantorres.dev</a></div>
    <div class="contact-row"><span class="cl">BASE</span><span>${DATA.location}</span></div>`;
}

/* ---------- NAVIGATION (swap con flicker) ---------- */
let currentView = "home";
function go(name) {
  if (name === currentView) return;
  currentView = name;
  const next = $(`.cview[data-view="${name}"]`);
  const cur = $(".cview.active");
  if (cur) cur.classList.remove("active");
  next.classList.add("active");
  $$(".menu-item").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  $("#statusLead").textContent = "DOS 6.22 — SECCIÓN: " + name.toUpperCase();
  if (name === "stack") animateBars();
}

function animateBars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return;
    b.dataset.done = "1";
    setTimeout(() => { b.style.width = b.dataset.w + "%"; }, 60 + i * 25);
  });
}

/* ---------- BOOT ---------- */
function boot() {
  const box = $("#bootLog");
  const lines = [
    "C:\\> POWER ON",
    "POST ........... OK",
    "CARGA DE SDK ... OK",
    "CARGANDO CRISTIAN.EXE ... OK",
    "",
  ];
  let i = 0;
  const type = (el, text, done) => {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      el.textContent = text.slice(0, n);
      if (n >= text.length) { clearInterval(iv); done(); }
    }, 24);
  };
  const next = () => {
    if (i >= lines.length) {
      $("#bootHint").style.visibility = "visible";
      document.addEventListener("keydown", enter, { once: true });
      return;
    }
    const el = document.createElement("div");
    box.appendChild(el);
    type(el, lines[i++], () => setTimeout(next, 180));
  };
  const enter = () => {
    $("#boot").classList.add("exit");
    setTimeout(() => $("#boot").style.display = "none", 480);
    $("#crt").classList.remove("hidden");
  };
  next();
}

/* ---------- CLOCK ---------- */
function clock() {
  const el = $("#dosClock");
  const tick = () => { el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false }); };
  tick(); setInterval(tick, 1000);
}

/* ---------- PWA ---------- */
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
  clock();
  registerSW();
  $$(".menu-item, .retro-btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.view)));
  document.addEventListener("keydown", (e) => {
    const map = { "1": "home", "2": "stack", "3": "projects", "4": "experience", "5": "contact" };
    if (map[e.key]) go(map[e.key]);
  });
  boot();
});