/* ===== THE MATRIX TERMINAL — app.js ===== */

/* ---------- DATOS REALES (CV) ---------- */
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
        ["Tailwind CSS", 90],
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
      cat: "BASES DE DATOS",
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
      cat: "HERRAMIENTAS",
      items: [
        ["Git", 90],
        ["GitHub", 88],
        ["Bitbucket", 80],
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
      desc: "Suite de plugins propios y arquitecturas modulares con ACF PRO que redujo el tiempo de carga del sitio en un 20%.",
      demo: "#",
      code: "#",
    },
    {
      title: "Dashboard React + REST API",
      tech: ["React", "TypeScript", "AWS"],
      desc: "Interfaces escalables en React conectadas a APIs REST, reduciendo tiempos de respuesta y asegurando alta disponibilidad.",
      demo: "#",
      code: "#",
    },
    {
      title: "E-Commerce Laravel / Woo",
      tech: ["Laravel 8", "WooCommerce", "MySQL"],
      desc: "Plataforma de comercio conectada a CRMs y pasarelas de pago vía APIs REST y SOAP, con flujo de datos continuo.",
      demo: "#",
      code: "#",
    },
    {
      title: "AWS Performance Audit",
      tech: ["AWS EC2", "MySQL", "PHP"],
      desc: "Refactor de aplicaciones en AWS y corrección de cuellos de botella en MySQL/PHP: rendimiento y seguridad hasta +60%.",
      demo: "#",
      code: "#",
    },
  ],
  experience: [
    {
      role: "Full Stack Developer",
      org: "Pureblink Inc.",
      dates: "MAY 2025 — MAY 2026",
      bullets: [
        "Refactor de aplicaciones en AWS y cuellos de botella en MySQL/PHP: rendimiento y seguridad hasta +60%.",
        "Interfaces escalables en React conectadas a APIs REST, con alta disponibilidad.",
        "Temas de WordPress desde cero con ACF PRO y landing pages de alta conversión.",
      ],
    },
    {
      role: "Semi Senior Web Developer",
      org: "Digital Studio",
      dates: "OCT 2014 — SEP 2024",
      bullets: [
        "Plugins propios en PHP y arquitecturas modulares con ACF PRO: -20% tiempo de carga.",
        "Optimización de SEO, Core Web Vitals y renderizado: mejoró posicionamiento y conversión.",
        "Integraciones con CRMs y pasarelas de pago vía APIs REST y SOAP.",
      ],
    },
  ],
  edu: {
    role: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
    org: "SENA",
    dates: "2012 — 2014",
  },
  certs: [
    "IA con Agentes (Claude 101 – Anthropic)",
    "Node.js + Express",
    "React",
    "WordPress",
    "HTML5 + JS + CSS3",
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
  location: "MEDELLÍN, COLOMBIA",
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- BOOT SEQUENCE ---------- */
function boot() {
  const box = $("#bootLog");
  const lines = [
    "> INIT MATRIX_OS v2.0.7 ............ OK",
    "> LOADING CORE_DRIVERS ............. OK",
    "> MAPEANDO STACK_GRID .............. OK",
    "> COMPILANDO PERFIL_DEV ............ OK",
    "> ACCESO RECLUTADOR ................ GRANTED",
    "",
    'Bienvenido. Escribe "help" para ver los comandos.',
    "Navega con los tabs laterales o con la terminal.",
    "",
  ];
  let idx = 0;
  const type = (el, text, done) => {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      el.textContent = text.slice(0, n);
      box.scrollTop = box.scrollHeight;
      if (n >= text.length) {
        clearInterval(iv);
        done();
      }
    }, 11);
  };
  const next = () => {
    if (idx >= lines.length) return finish();
    const el = document.createElement("div");
    box.appendChild(el);
    type(el, lines[idx++], () => setTimeout(next, 110));
  };
  const finish = () => {
    setTimeout(() => {
      $("#boot").classList.add("fade-out");
      setTimeout(() => {
        $("#boot").style.display = "none";
        $("#shell").classList.remove("hidden");
        afterBoot();
      }, 700);
    }, 220);
  };
  next();
}

function afterBoot() {
  typeTerm(["Conectado a la matriz.", 'Teclea "help" o pulsa los tabs.'], "ok");
  animateCounters();
}

/* ---------- MATRIX RAIN ---------- */
function matrixRain() {
  const c = $("#matrixRain");
  const ctx = c.getContext("2d");
  const F = 16;
  const glyphs = "アカサタナハマヤラワ0123456789ABCDEFZ@#%&*".split("");
  let drops = [];
  const resize = () => {
    c.width = innerWidth;
    c.height = innerHeight;
    drops = Array(Math.floor(c.width / F)).fill(1);
  };
  addEventListener("resize", resize);
  resize();
  setInterval(() => {
    ctx.fillStyle = "rgba(12,12,12,0.06)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = F + "px monospace";
    ctx.fillStyle = "#00FF41";
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(
        glyphs[(Math.random() * glyphs.length) | 0],
        i * F,
        drops[i] * F,
      );
      if (drops[i] * F > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 50);
}

/* ---------- CLOCK ---------- */
function clock() {
  const el = $("#clock");
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false });
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------- NAVEGACIÓN POR TABS (sin scroll) ---------- */
let currentView = "home";

function switchView(name) {
  if (name === currentView || !$(`.view[data-view="${name}"]`)) return;
  const cur = $(".view.active");
  const next = $(`.view[data-view="${name}"]`);
  currentView = name;
  $$(".nav-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === name),
  );
  if (cur && cur !== next) {
    cur.classList.add("leaving");
    setTimeout(() => cur.classList.remove("active", "leaving"), 260);
  }
  setTimeout(() => {
    next.classList.add("active");
    $("#views").scrollTop = 0;
    if (window.anime)
      anime({
        targets: next,
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 360,
        easing: "easeOutQuad",
      });
    onViewActive(name);
  }, 40);
}

function onViewActive(name) {
  if (name === "home") animateCounters();
  if (name === "stack") animateBars();
}

/* ---------- ANIMACIONES DE MÉTRICAS ---------- */
function animateCounters() {
  $$(".stat-num").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = +el.dataset.count;
    if (window.anime) {
      const o = { v: 0 };
      anime({
        targets: o,
        v: target,
        round: 1,
        duration: 1100,
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
      60 + i * 35,
    );
  });
}

/* ---------- RENDER DE VISTAS ---------- */
function renderAll() {
  $("#stackGrid").innerHTML = DATA.stack
    .map(
      (cat) => `
    <div class="stack-block"><h3>${cat.cat}</h3>
      ${cat.items
        .map(
          ([name, lvl]) => `
        <div class="skill">
          <div class="skill-name"><span>${name}</span><span>${lvl}%</span></div>
          <div class="bar"><div class="bar-fill" data-w="${lvl}"></div></div>
        </div>`,
        )
        .join("")}
    </div>`,
    )
    .join("");

  $("#projGrid").innerHTML = DATA.projects
    .map(
      (p) => `
    <article class="proj-card">
      <h3>${p.title}</h3>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="proj-links">
        <a href="${p.demo}" target="_blank" rel="noopener">[ demo ]</a>
        <a href="${p.code}" target="_blank" rel="noopener">[ código ]</a>
      </div>
    </article>`,
    )
    .join("");

  const exp = DATA.experience
    .map(
      (e) => `
    <div class="tl-item">
      <div class="tl-role">${e.role}</div>
      <div class="tl-org">${e.org}</div>
      <div class="tl-dates">${e.dates}</div>
      <ul class="tl-bullets">${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>`,
    )
    .join("");

  $(".timeline").innerHTML =
    exp +
    `
    <div class="tl-item">
      <div class="tl-role">${DATA.edu.role}</div>
      <div class="tl-org">${DATA.edu.org}</div>
      <div class="tl-dates">${DATA.edu.dates}</div>
    </div>
    <div class="tl-item">
      <div class="tl-role">Cursos y certificaciones</div>
      <ul class="tl-bullets">${DATA.certs.map((c) => `<li>${c}</li>`).join("")}</ul>
    </div>`;

  const cg = document.querySelector(".contact-grid");
  cg.innerHTML = DATA.contact
    .map(
      (c) => `
    <a class="contact-card" href="${c.href}" target="_blank" rel="noopener">
      <div class="cc-label">${c.label}</div>
      <div class="cc-value">${c.value}</div>
    </a>`,
    )
    .join("");
}

/* ---------- TERMINAL INTERACTIVA ---------- */
function printTerm(text, cls) {
  const el = document.createElement("div");
  el.className = "ln" + (cls ? " " + cls : "");
  el.innerHTML = text;
  $("#termLog").appendChild(el);
  $("#termLog").scrollTop = $("#termLog").scrollHeight;
}
function typeTerm(lines, cls) {
  let i = 0;
  const step = () => {
    if (i >= lines.length) return;
    printTerm(lines[i++], cls);
    setTimeout(step, 120);
  };
  step();
}
function execCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  printTerm(`cristian@portafolio:~$ <span class="ok">${raw}</span>`);
  const nav = ["home", "stack", "projects", "experience", "contact"];
  if (nav.includes(cmd)) {
    switchView(cmd);
    printTerm(`→ abriendo módulo <span class="ok">${cmd}</span>`);
    return;
  }
  switch (cmd) {
    case "":
      break;
    case "help":
      printTerm("Comandos disponibles:");
      printTerm(
        "  <span class='ok'>home</span> <span class='ok'>stack</span> <span class='ok'>projects</span> <span class='ok'>experience</span> <span class='ok'>contact</span>",
      );
      printTerm(
        "  <span class='ok'>whoami</span> — identidad &nbsp;·&nbsp; <span class='ok'>skills</span> — stack top",
      );
      printTerm("  <span class='ok'>clear</span> — limpia la terminal");
      break;
    case "whoami":
      printTerm("CRISTIAN TORRES — FULL STACK DEVELOPER");
      printTerm("10+ años · PHP · WordPress · React · Medellín, Colombia");
      break;
    case "skills":
      printTerm(
        "Frontend: React / TypeScript / Astro / Tailwind · Backend: PHP / Laravel 8 / Node.js",
      );
      printTerm(
        "CMS: WordPress / WooCommerce / ACF PRO · DB: MySQL / MariaDB / MongoDB · Cloud: AWS EC2 / S3",
      );
      break;
    case "clear":
      $("#termLog").innerHTML = "";
      break;
    default:
      printTerm(
        `comando no reconocido: <span class="err">${cmd}</span>. Escribe "help".`,
      );
  }
}

/* ---------- EVENTS ---------- */
function initUI() {
  $$(".nav-btn, .btn-neon, .btn-ghost").forEach((b) => {
    if (b.dataset.view)
      b.addEventListener("click", () => switchView(b.dataset.view));
  });
  $("#termForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#cmdInput");
    execCommand(input.value);
    input.value = "";
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.id === "cmdInput") return;
    const map = {
      1: "home",
      2: "stack",
      3: "projects",
      4: "experience",
      5: "contact",
    };
    if (map[e.key]) switchView(map[e.key]);
  });
}

/* ---------- PWA ---------- */
function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initUI();
  matrixRain();
  clock();
  registerSW();
  boot();
});
