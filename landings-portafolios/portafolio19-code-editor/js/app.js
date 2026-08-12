/* ===== CODE EDITOR — app.js ===== */
var $ = function (s) { return document.querySelector(s); };

var FILE_LINES = [
  { sec: true, rv: true, html: '<span class="cm">// ─────────────────────────────</span>' },
  { sec: true, rv: true, html: '<span class="cm">//  profile.ts · Cristian Torres</span>' },
  { sec: true, rv: true, html: '<span class="cm">//  Full Stack Developer · 10+ años</span>' },
  { sec: true, rv: true, html: '<span class="cm">// ─────────────────────────────</span>' },
  { sec: false, rv: true, html: '' },
  { sec: true, rv: true, html: '<span class="tok-cm">import</span> <span class="tok-pl">{ Experience }</span> <span class="tok-cm">from</span> <span class="tok-st">"10-years-in-production"</span>;' },
  { sec: true, rv: true, html: '' },
  { sec: true, rv: true, html: '<span class="tok-cm">interface</span> <span class="tok-fn">Developer</span> {' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;name: <span class="tok-st">"Cristian Torres"</span>;' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;location: <span class="tok-st">"Medellín, CO"</span>;' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;role: <span class="tok-st">"Full Stack Developer"</span>;' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;openToWork: <span class="tok-st">true</span>;' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;email: <span class="tok-st">"ps4cristiantorr@gmail.com"</span>;' },
  { sec: true, rv: true, html: '}' },
  { sec: false, rv: true, html: '' },
  { sec: true, rv: true, html: '// STACK' },
  { sec: true, rv: true, html: '<span class="tok-cm">const</span> <span class="tok-fn">STACK</span> = { <span class="tok-cm">backend</span>: [<span class="tok-st">"PHP"</span>, <span class="tok-st">"Laravel"</span>, <span class="tok-st">"Node"</span>], <span class="tok-cm">frontend</span>: [<span class="tok-st">"React"</span>, <span class="tok-st">"TS"</span>, <span class="tok-st">"Tailwind"</span>], <span class="tok-cm">cms</span>: [<span class="tok-st">"WordPress"</span>, <span class="tok-st">"ACF"</span>] };' },
  { sec: true, rv: true, html: '' },
  { sec: true, rv: true, html: '// PROYECTOS → resultados medibles' },
  { sec: true, rv: true, html: '<span class="tok-cm">const</span> <span class="tok-fn">PROJECTS</span>: <span class="tok-fn">Experience</span>[] = [' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;{ id: <span class="tok-nm">1</span>, title: <span class="tok-st">"Plugin Suite"</span>, impact: <span class="tok-st">"-20% carga"</span> },' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;{ id: <span class="tok-nm">2</span>, title: <span class="tok-st">"Dashboard React"</span>, impact: <span class="tok-st">"HA over REST"</span> },' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;{ id: <span class="tok-nm">3</span>, title: <span class="tok-st">"AWS Audit"</span>, impact: <span class="tok-st">"+60% perf"</span> },' },
  { sec: true, rv: true, html: '];' },
  { sec: false, rv: true, html: '' },
  { sec: true, rv: true, html: '// EXPERIENCIA' },
  { sec: true, rv: true, html: '<span class="tok-cm">const</span> <span class="tok-fn">EXPERIENCE</span> = [' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;{ role: <span class="tok-st">"Full Stack Dev"</span>, at: <span class="tok-st">"Pureblink Inc."</span>, years: <span class="tok-st">"2025-26"</span> },' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;{ role: <span class="tok-st">"Web Dev Semi Senior"</span>, at: <span class="tok-st">"Digital Studio"</span>, years: <span class="tok-st">"2014-24"</span> },' },
  { sec: true, rv: true, html: '];' },
  { sec: false, rv: true, html: '' },
  { sec: true, rv: true, html: '// CONTACTO' },
  { sec: true, rv: true, html: '<span class="tok-cm">export const</span> <span class="tok-fn">CONTACT</span> = [' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;<span class="tok-st">"mailto:ps4cristiantorr@gmail.com"</span>,' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;<span class="tok-st">"github.com/cristiantorres"</span>,' },
  { sec: true, rv: true, html: '&nbsp;&nbsp;<span class="tok-st">"linkedin.com/in/cristiantorres"</span>,' },
  { sec: true, rv: true, html: '];' },
  { sec: true, rv: true, html: '' },
  { sec: true, rv: true, html: '<span class="cm">// fin de archivo — gracias por leer el código ✦</span>' },
  { sec: true, rv: true, html: '<span class="cm">// hay un cursor esperando tu propuesta:</span>' }
];

function render() {
  var doc = $("#doc");
  var html = FILE_LINES.map(function (l) {
    return '<div class="sec rv">' + l.html + '</div>';
  }).join("");
  doc.innerHTML = html + '<div class="sec rv"><span class="tok-cm">▍</span></div>';

  var ln = $("#ln");
  var nums = [];
  for (var i = 1; i <= FILE_LINES.length + 1; i++) nums.push(i);
  ln.innerHTML = nums.join("<br>");
}

function reveal() {
  var els = Array.prototype.slice.call(document.querySelectorAll(".sec.rv"));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("on");
      io.unobserve(en.target);
    });
  }, { threshold: 0.4, rootMargin: "0px 0px -30% 0px" });
  els.forEach(function (el) { io.observe(el); });
}

function cursorBlink() {
  var cursor = document.createElement("span");
  cursor.className = "tok-cm";
  cursor.style.animation = "blink 1s steps(1) infinite";
  var style = document.createElement("style");
  style.textContent = "@keyframes blink { 50% { opacity: 0; } }";
  document.head.appendChild(style);
  var last = $("#doc .sec:last-child");
  if (last) last.appendChild(cursor);
}

function clock() { var el = $("#clock"); if (el) setInterval(function () { el.textContent = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }); }, 1000); }
function registerSW() { if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {}); }

document.addEventListener("DOMContentLoaded", function () {
  render();
  clock();
  registerSW();
  reveal();
  cursorBlink();
});