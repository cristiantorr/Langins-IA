/* ===== AI DATA ASSISTANT — app.js ===== */
const KNOWLEDGE = {
  resumen: `<span class="h">CRISTIAN TORRES</span> — Full Stack Developer con 10+ años en PHP, WordPress y React.<br/>Especializado en apps web, plugins e integraciones de APIs REST escalables. Combino desarrollo clásico con IA estratégica. Participo en todas las etapas: análisis, diseño, implementación, despliegue y mantenimiento.<br/><br/>Base de operaciones: <b>Medellín, Colombia</b>.`,
  stack: `<span class="h">STACK PRINCIPAL</span><br/><ul>
    <li>Frontend: HTML5 · CSS3 · JS · TypeScript · React · Astro · Tailwind</li>
    <li>Backend: PHP · Laravel 8 · Node.js · Express · Python</li>
    <li>CMS: WordPress · WooCommerce · ACF PRO · Elementor · Strapi</li>
    <li>DB: MySQL · MariaDB · MongoDB</li>
    <li>Cloud: AWS EC2 · AWS S3</li>
    <li>Tools: Git · GitHub · Docker · Vite · WP-CLI</li>
  </ul>`,
  proyectos: `<span class="h">OPERACIONES DESTACADAS</span><br/><ul>
    <li><b>Plugin Suite</b> — PHP/WordPress/ACF PRO · -20% tiempo de carga</li>
    <li><b>Dashboard React + REST</b> — React/TS/AWS · alta disponibilidad</li>
    <li><b>E-Commerce</b> — Laravel/WooCommerce/MySQL · CRMs y pagos vía REST/SOAP</li>
    <li><b>AWS Audit</b> — refactor y cuellos de botella · +60% rendimiento</li>
  </ul><br/>Demo y código disponibles bajo petición.`,
  experiencia: `<span class="h">EXPERIENCIA</span><br/><ul>
    <li><b>Full Stack Dev — Pureblink Inc.</b> (2025-2026): refactor AWS, React+REST, temas WP.</li>
    <li><b>Semi Senior — Digital Studio</b> (2014-2024): plugins PHP, SEO/Core Web Vitals, integraciones REST/SOAP.</li>
    <li><b>SENA</b> (2012-2014): Tecnólogo en Análisis y Desarrollo de Sistemas.</li>
  </ul>`,
  contacto: `<span class="h">CANALES</span><br/>
    Email: <a href="mailto:ps4cristiantorr@gmail.com">ps4cristiantorr@gmail.com</a><br/>
    GitHub: <a href="#">github.com/cristiantorres</a><br/>
    LinkedIn: <a href="#">linkedin.com/in/cristiantorres</a><br/>
    Portfolio: <a href="#">cristiantorres.dev</a><br/><br/>
    Disponible para roles remoto/híbrido.`,
  ayuda: `Comandos disponibles: <b>resumen</b>, <b>stack</b>, <b>proyectos</b>, <b>experiencia</b>, <b>contacto</b>.<br/>También puedes preguntar en lenguaje natural (ej. "qué sabes hacer?").`,
};

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ---------- CHAT ---------- */
const log = $("#log");

function addMsg(sender, html) {
  const wrap = document.createElement("div");
  wrap.className = "msg " + (sender === "user" ? "me" : "ai");
  const who = document.createElement("span");
  who.className = "m-sender";
  who.textContent = sender === "user" ? "TÚ" : "AI // CRISTIAN.TORRES";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = html;
  wrap.appendChild(who);
  wrap.appendChild(bubble);
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return bubble;
}

function typing() {
  const wrap = document.createElement("div");
  wrap.className = "msg ai";
  wrap.innerHTML = '<div class="bubble typing"><i></i><i></i><i></i></div>';
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return wrap;
}

function respond(text) {
  const t = typing();
  let i = 0;
  const iv = setInterval(() => {
    i += 3;
    if (i >= text.length) {
      clearInterval(iv);
      t.remove();
      addMsg("ai", text);
    }
  }, 40);
}

/* ---------- RESOLUCIÓN DE COMANDO ---------- */
function answer(raw) {
  const q = raw.toLowerCase();
  if (q.includes("stack") || q.includes("tech") || q.includes("habilidades")) return KNOWLEDGE.stack;
  if (q.includes("proyecto") || q.includes("project")) return KNOWLEDGE.proyectos;
  if (q.includes("experiencia") || q.includes("cv") || q.includes("trabajo") || q.includes("work")) return KNOWLEDGE.experiencia;
  if (q.includes("contacto") || q.includes("email") || q.includes("contact") || q.includes("linkedin") || q.includes("github")) return KNOWLEDGE.contacto;
  if (q.includes("quien") || q.includes("eres") || q.includes("resumen") || q.includes("who") || q.includes("perfil")) return KNOWLEDGE.resumen;
  if (q.includes("ayuda") || q.includes("help") || q === "?") return KNOWLEDGE.ayuda;
  return `No tengo datos para "<i>${raw}</i>". Intenta: resumen, stack, proyectos, experiencia, contacto o ayuda.`;
}

function send(text) {
  if (!text.trim()) return;
  addMsg("user", text);
  respond(answer(text));
}

/* ---------- TELEMETRÍA ---------- */
let up1 = 0, up2 = 0, up3 = 0;
function uptime() {
  up3++;
  if (up3 >= 60) { up3 = 0; up2++; if (up2 >= 60) { up2 = 0; up1++; } }
  document.getElementById("up1").textContent = up1;
  document.getElementById("up2").textContent = up2;
  document.getElementById("up3").textContent = up3;
}
let cpuV = 0;
function cpu() {
  const target = 55 + Math.floor(Math.random() * 35);
  cpuV += (target - cpuV) * 0.12;
  document.getElementById("cpuVal").textContent = Math.round(cpuV) + "%";
  document.getElementById("cpuFill").style.width = cpuV + "%";
  $$("#cells i").forEach((c, idx) => c.classList.toggle("on", idx < Math.round((cpuV / 100) * 6)));
}
function counters() {
  const pc = document.getElementById("projC");
  const sc = document.getElementById("stackC");
  let i = 0;
  const iv = setInterval(() => {
    i++;
    pc.textContent = Math.min(40, Math.round((i / 40) * 40));
    sc.textContent = Math.min(6, Math.round((i / 40) * 6));
    if (i >= 40) clearInterval(iv);
  }, 40);
}

/* ---------- CLOCK ---------- */
function clock() {
  setInterval(() => {
    document.getElementById("clock").textContent = new Date().toLocaleTimeString("es-CO", { hour12: false });
  }, 1000);
}

/* ---------- PWA ---------- */
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {}); }

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  clock();
  uptime();
  setInterval(uptime, 1000);
  setInterval(cpu, 1400);
  counters();

  $$(".act").forEach((b) => b.addEventListener("click", () => send(b.dataset.cmd)));
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    send($("#input").value);
    $("#input").value = "";
  });

  registerSW();

  setTimeout(() => respond(KNOWLEDGE.resumen), 300);
  setTimeout(() => respond(KNOWLEDGE.ayuda), 1600);
});