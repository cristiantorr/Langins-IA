/* ===== NEON COMMAND CENTER — app.js ===== */
const DATA = {
  stack: [
    {
      cat: "FRONTEND",
      items: [
        ["HTML5", 95],
        ["CSS3", 92],
        ["JavaScript", 93],
        ["TypeScript", 85],
        ["React", 88],
        ["Astro", 78],
        ["Tailwind", 90],
        ["Bootstrap", 84],
      ],
    },
    {
      cat: "BACKEND",
      items: [
        ["PHP", 92],
        ["Laravel 8", 88],
        ["Node.js", 85],
        ["Express", 84],
        ["Python", 75],
      ],
    },
    {
      cat: "CMS",
      items: [
        ["WordPress", 95],
        ["WooCommerce", 85],
        ["ACF PRO", 90],
        ["Elementor", 82],
        ["Gutenberg", 80],
        ["WP REST API", 86],
        ["Strapi", 70],
      ],
    },
    {
      cat: "DATABASES",
      items: [
        ["MySQL", 92],
        ["MariaDB", 85],
        ["MongoDB", 78],
      ],
    },
    {
      cat: "CLOUD",
      items: [
        ["AWS EC2", 82],
        ["AWS S3", 80],
      ],
    },
    {
      cat: "TOOLS & DEVOPS",
      items: [
        ["Git", 90],
        ["GitHub", 88],
        ["Docker", 82],
        ["Vite", 85],
        ["WP-CLI", 85],
      ],
    },
  ],
  projects: [
    {
      title: "Plugin Suite Optimizada",
      tech: ["PHP", "WordPress", "ACF PRO"],
      desc: "Plugins modulares y arquitecturas con ACF PRO que recortaron el tiempo de carga en un 20%.",
    },
    {
      title: "Dashboard React + REST API",
      tech: ["React", "TypeScript", "AWS"],
      desc: "Interfaces escalables en React conectadas a APIs REST, con baja latencia y alta disponibilidad.",
    },
    {
      title: "E-Commerce Laravel / Woo",
      tech: ["Laravel 8", "WooCommerce", "MySQL"],
      desc: "Plataforma de venta conectada a CRMs y pasarelas de pago vía REST y SOAP, flujo de datos continuo.",
    },
    {
      title: "AWS Performance Audit",
      tech: ["AWS EC2", "MySQL", "PHP"],
      desc: "Refactor de aplicaciones y corrección de cuellos de botella: rendimiento y seguridad hasta +60%.",
    },
  ],
  exp: [
    {
      role: "Full Stack Developer",
      org: "Pureblink Inc.",
      dates: "MAY 2025 — MAY 2026",
      bullets: [
        "Refactor en AWS y cuellos MySQL/PHP: rendimiento y seguridad hasta +60%.",
        "Interfaces React conectadas a APIs REST con alta disponibilidad.",
        "Temas de WordPress desde cero con ACF PRO y landing de conversión.",
      ],
    },
    {
      role: "Semi Senior Web Developer",
      org: "Digital Studio",
      dates: "OCT 2014 — SEP 2024",
      bullets: [
        "Plugins propios en PHP y arquitecturas con ACF PRO: -20% de carga.",
        "Optimización de SEO, Core Web Vitals y conversión de landings.",
        "Integraciones con CRMs y pasarelas de pago vía REST y SOAP.",
      ],
    },
  ],
  edu: {
    org: "SENA",
    title: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
    dates: "2012 — 2014",
  },
  certs: [
    "IA con Claude Code (Claude 101 – Anthropic)",
    "Node.js + Express",
    "React",
    "WordPress",
    "HTML5 + CSS3 + JS",
  ],
  contact: [
    {
      label: "EMAIL",
      value: "ps4cristiantorr@gmail.com",
      href: "mailto:ps4cristiantorr@gmail.com",
    },
    { label: "GITHUB", value: "github.com/cristiantorres", href: "#" },
    { label: "LINKEDIN", value: "linkedin.com/in/cristiantorres", href: "#" },
    { label: "PORTAFOLIO", value: "cristiantorres.dev", href: "#" },
  ],
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- ICONOS POR TECNOLOGÍA ---------- */
const ICONS = {
  HTML5: {
    i: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24 3.4 21.5z"/></svg>`,
    c: "#E34F26",
  },
  CSS3: {
    i: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24 3.4 21.5z"/></svg>`,
    c: "#1572B6",
  },
  JavaScript: { i: `JS`, c: "#F7DF1E" },
  TypeScript: { i: `TS`, c: "#3178C6" },
  React: { i: `⚛`, c: "#61DAFB" },
  Astro: { i: `✦`, c: "#FF5D01" },
  Tailwind: { i: `❄`, c: "#38BDF8" },
  Bootstrap: { i: `B`, c: "#7952B3" },
  PHP: { i: `PHP`, c: "#8993BE" },
  "Laravel 8": { i: `L`, c: "#FF2D20" },
  "Node.js": { i: `⬢`, c: "#339933" },
  Express: { i: `EX`, c: "#E7EDF7" },
  Python: { i: `Py`, c: "#FFD43B" },
  WordPress: { i: `W`, c: "#21759B" },
  WooCommerce: { i: `🛒`, c: "#96588A" },
  "ACF PRO": { i: `A`, c: "#8B5CF6" },
  Elementor: { i: `E`, c: "#92003B" },
  Gutenberg: { i: `⛨`, c: "#00A0D2" },
  "WP REST API": { i: `WP`, c: "#34D399" },
  Strapi: { i: `S`, c: "#2E3B4E" },
  MySQL: { i: `≋`, c: "#4479A1" },
  MariaDB: { i: `M`, c: "#003545" },
  MongoDB: { i: `◉`, c: "#47A248" },
  "AWS EC2": { i: `▢`, c: "#FF9900" },
  "AWS S3": { i: `▤`, c: "#FF9900" },
  Git: { i: `⎇`, c: "#F05032" },
  GitHub: { i: `⌥`, c: "#E7EDF7" },
  Docker: { i: `🐳`, c: "#2496ED" },
  Vite: { i: `⚡`, c: "#646CFF" },
  "WP-CLI": { i: `⌘`, c: "#34D399" },
};
function iconFor(name) {
  const e = ICONS[name];
  if (!e)
    return `<span class="skill-ic"><span class="mono" style="color:var(--muted)">▹</span></span>`;
  const isImg = e.i.startsWith("<");
  return `<span class="skill-ic" style="color:${e.c}">${isImg ? e.i : `<span class="mono">${e.i}</span>`}</span>`;
}

/* ---------- RENDER ---------- */
function render() {
  $("#stackGrid").innerHTML = DATA.stack
    .map(
      (c) => `
    <div class="stack-block"><h3>${c.cat}</h3>
      ${c.items
        .map(
          ([n, l]) => `
        <div class="skill"><div class="skill-name">${iconFor(n)}<span class="s-lab">${n}</span><span>${l}%</span></div>
          <div class="bar"><div class="bar-fill" data-w="${l}"></div></div></div>`,
        )
        .join("")}
    </div>`,
    )
    .join("");

  $("#projGrid").innerHTML = DATA.projects
    .map(
      (p) => `
    <article class="proj-card">
      <h3>${p.title}</h3><p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links"><a href="#" target="_blank" rel="noopener">Demo</a><a href="#" target="_blank" rel="noopener">Código</a></div>
    </article>`,
    )
    .join("");

  $("#expList").innerHTML = DATA.exp
    .map(
      (e) => `
    <article class="exp-item">
      <div class="exp-role">${e.role}</div><div class="exp-org">${e.org}</div><div class="exp-dates">${e.dates}</div>
      <ul class="exp-bullets">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </article>`,
    )
    .join("");

  $("#edu").innerHTML =
    `<b>${DATA.edu.org}</b> — ${DATA.edu.title} (${DATA.edu.dates}).<br/><br/><b>Certificaciones:</b> ${DATA.certs.join(" · ")}`;

  $("#contactGrid").innerHTML = DATA.contact
    .map(
      (c) => `
    <a class="contact-card" href="${c.href}" target="_blank" rel="noopener">
      <div class="cc-label">${c.label}</div><div class="cc-value">${c.value}</div>
    </a>`,
    )
    .join("");
}

/* ---------- TABS ---------- */
const PANELS = [
  "pan-about",
  "pan-stack",
  "pan-projects",
  "pan-experience",
  "pan-contact",
];
let current = 0;

function openTab(i, scroll = true) {
  if (i === current && $(".panel.active")) {
    if (scroll) $(".panels").scrollTop = 0;
    return;
  }
  current = i;
  $$(".tab").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
    t.setAttribute("aria-selected", idx === i ? "true" : "false");
  });
  $$(".panel").forEach((p, idx) => {
    const on = idx === i;
    p.classList.toggle("active", on);
    if (on) {
      const el = $(".panels");
      el.scrollTop = 0;
      if (window.anime)
        anime({
          targets: p,
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 380,
          easing: "easeOutQuad",
        });
    }
  });
  onPanel(i);
}

function onPanel(i) {
  if (i === 0) animateMetrics();
  if (i === 1) animateBars();
}

/* ---------- Animaciones ---------- */
function animateMetrics() {
  $$(".m-val").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = +el.dataset.count;
    if (window.anime) {
      const o = { v: 0 };
      anime({
        targets: o,
        v: target,
        round: 1,
        duration: 900,
        easing: "easeOutQuad",
        update: () => {
          el.textContent = o.v;
        },
      });
    } else el.textContent = target;
  });
}
function animateBars() {
  $$(".bar-fill").forEach((b, i) => {
    if (b.dataset.done) return;
    b.dataset.done = "1";
    setTimeout(
      () => {
        b.style.width = b.dataset.w + "%";
      },
      60 + i * 30,
    );
  });
}

/* ---------- Clock ---------- */
function clock() {
  const el = $("#sbClock");
  setInterval(() => {
    el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false });
  }, 1000);
}

/* ---------- Events ---------- */
function initUI() {
  $$(".tab").forEach((t, i) => t.addEventListener("click", () => openTab(i)));
  const GOTO = { about: 0, projects: 2, contact: 4 };
  $$(".cta, [data-goto]").forEach((b) => {
    b.addEventListener("click", (e) => {
      const target = b.hasAttribute("data-goto") ? b.dataset.goto : "contact";
      if (GOTO[target] !== undefined) openTab(GOTO[target]);
      e.preventDefault();
    });
  });
  document.addEventListener("keydown", (e) => {
    const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    if (map[e.key]) openTab(map[e.key]);
  });
}

/* ---------- PWA ---------- */
function registerSW() {
  if (navigator.serviceWorker && navigator.serviceWorker.register)
    navigator.serviceWorker.register("sw.js").catch(() => {});
}

/* ---------- PORTRAIT FALLBACK ---------- */
function avatarFallback(img) {
  img.onerror = null;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="320" viewBox="0 0 250 320"><rect width="250" height="320" fill="#0B0F19"/><circle cx="125" cy="120" r="48" stroke="#22D3EE" stroke-width="3" fill="none"/><rect x="88" y="86" width="36" height="10"/><rect x="126" y="86" width="36" height="10"/><path d="M63 320 q62 -120 124 0 Z" fill="#22D3EE"/><text x="125" y="210" text-anchor="middle" font-family="monospace" font-size="22" fill="#22D3EE">CT</text></svg>`;
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ---------- PRELOADER · TERMINAL MATRIX ---------- */
const BOOT = [
  { t: "> iniciando kernel: command_center v2.1", c: "dim" },
  { t: "> nodes: {tabs:5, stack:30, proyectos:4}", c: "" },
  { t: "> motores: PHP · React · Node · WP", c: "dim" },
  { t: "> enlace seguro establecido [MYSQL:3306]", c: "ok" },
  { t: "> operador: CRISTIAN TORRES · NODE OK", c: "good" },
];
let rainRaf = null;

function initRain() {
  const c = $("#rain");
  if (!c || !c.getContext) return;
  const x = c.getContext("2d");
  const ch = "01";
  let W, H, cols;
  const resize = () => {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    cols = Array(Math.floor(W / 18)).fill(0);
  };
  resize();
  window.addEventListener("resize", resize);
  const draw = () => {
    x.fillStyle = "rgba(11,15,25,0.10)";
    x.fillRect(0, 0, W, H);
    x.font = "16px monospace";
    cols.forEach((v, i) => {
      if (v > H && Math.random() > 0.975) cols[i] = 0;
      x.fillStyle =
        Math.random() > 0.97
          ? "rgba(139,92,246,0.95)"
          : Math.random() > 0.55
            ? "rgba(34,211,238,0.9)"
            : "rgba(34,211,238,0.5)";
      x.fillText(ch[(Math.random() * ch.length) | 0], i * 18, v);
      cols[i] += 18;
    });
    rainRaf = requestAnimationFrame(draw);
  };
  draw();
}

function runBoot() {
  const log = $("#bootLog");
  if (!log) {
    hidePreloader(0);
    return;
  }
  let li = 0;
  const typeLine = () => {
    if (li >= BOOT.length) {
      log.insertAdjacentHTML("beforeend", `<span class="boot-caret">▌</span>`);
      hidePreloader(420);
      return;
    }
    const item = BOOT[li];
    li++;
    const row = document.createElement("div");
    row.className = item.c;
    log.appendChild(row);
    let i = 0;
    const tick = () => {
      row.textContent = item.t.slice(0, i);
      if (i < item.t.length) {
        i++;
        setTimeout(tick, 14);
      } else setTimeout(typeLine, 90);
    };
    tick();
  };
  typeLine();
}

function hidePreloader(delay) {
  const pre = $("#preloader");
  const removeIt = () => {
    if (pre && pre.parentNode) pre.parentNode.removeChild(pre);
  };
  setTimeout(() => {
    if (window.anime)
      anime({
        targets: pre,
        opacity: [1, 0],
        duration: 420,
        easing: "easeOutQuad",
        complete: removeIt,
      });
    else removeIt();
    if (rainRaf) {
      cancelAnimationFrame(rainRaf);
      rainRaf = null;
    }
  }, delay);
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const img = $("#portrait");
  if (img) img.onerror = () => avatarFallback(img);
  initRain();
  runBoot();
  render();
  clock();
  initUI();
  registerSW();
  // Fallback de seguridad: nunca queda el preloader colgado.
  /* setTimeout(() => {
    const p = $("#preloader");
    if (p && p.parentNode) {
      if (window.anime)
        anime({
          targets: p,
          opacity: [1, 0],
          duration: 360,
          easing: "easeOutQuad",
          complete: () => p.parentNode && p.parentNode.removeChild(p),
        });
      else if (p.parentNode) p.parentNode.removeChild(p);
    }
  }, 5000); */
});
