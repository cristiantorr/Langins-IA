/* ===== PRELOAD CONSTRUCTOR — app.js ===== */
var DATA = {
  stack: [
    { cat: "Backend", items: [["PHP",92],["Laravel",88],["Node.js",85],["Express",84]] },
    { cat: "Frontend", items: [["React",88],["TypeScript",85],["JavaScript",93],["Tailwind",90]] },
    { cat: "CMS", items: [["WordPress",95],["ACF PRO",90],["WooCommerce",85]] },
    { cat: "Nube datos", items: [["MySQL",92],["AWS",82],["Docker",78]] }
  ],
  projects: [
    { t:"Plugin Suite", tech:["PHP","WP","ACF"], d:"Plugins modulares con ACF PRO: −20 % de carga." },
    { t:"Dashboard React", tech:["React","TS","AWS"], d:"Interfaces de alta disponibilidad sobre APIs REST." },
    { t:"Ecommerce", tech:["Laravel","Woo","MySQL"], d:"Integración de CRMs y pagos vía REST/SOAP." },
    { t:"AWS Audit", tech:["AWS","MySQL","PHP"], d:"Refactor de cuellos de botella: +60 %." }
  ],
  exp: [
    { r:"Full Stack Developer", org:"Pureblink Inc.", y:"2025 — 2026", b:["Refactor AWS + MySQL/PHP: +60 %.","APIs REST alta disponibilidad."] },
    { r:"Desarrollador Semi Senior", org:"Digital Studio", y:"2014 — 2024", b:["Plugins PHP + ACF PRO: −20 %.","SEO y conversión."] }
  ],
  contact: [
    { l:"EMAIL", v:"ps4cristiantorr@gmail.com", h:"mailto:ps4cristiantorr@gmail.com" },
    { l:"GITHUB", v:"github.com/cristiantorres", h:"#" },
    { l:"LINKEDIN", v:"linkedin.com/in/cristiantorres", h:"#" },
    { l:"WEB", v:"cristiantorres.dev", h:"#" }
  ]
};
var $ = function(s){ return document.querySelector(s); };
var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); };

/* ---------- helper scatter (determinista) ---------- */
function scX(i){ return Math.cos(i*2.71)*240; }
function scY(i){ return Math.sin(i*2.71)*205; }

/* ---------- CONSTRUIR FIGURAS AL SCROLL ---------- */
function assembleFig(fig) {
  fig.classList.add("assembled");
  var lines = fig.querySelectorAll(".fig-line");
  var pts = fig.querySelectorAll(".fig-pt");
  if (window.anime) {
    anime({ targets: lines, opacity:[0,1],
      strokeDashoffset: function(el){ return [el.getTotalLength ? el.getTotalLength() : 900, 0]; },
      easing:"easeInOutQuad", duration:900, delay:anime.stagger(100) });
    anime({ targets: pts, opacity:[0,1], scale:[-(.1), 1],
      translateX:function(el,i){ return [scX(i) || 0, 0]; },
      translateY:function(el,i){ return [scY(i), 0]; },
      rotate:[-14, 0],
      easing:"easeOutElastic(1,0.6)", duration:950, delay:anime.stagger(48) });
  } else {
    lines.forEach(function(l){ l.setAttribute("stroke-dashoffset","0"); l.style.opacity=1; });
    pts.forEach(function(p){ p.style.opacity=1; p.style.transform="none"; });
  }
  // levitación suave tras armado
  anime({ targets: fig, translateY:[0, -10, 0], duration:3400, loop:true, easing:"easeInOutSine", delay: 600 });
}

function wireFigures() {
  var figs = $$(".figure");
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting || en.target.dataset.done) return;
      en.target.dataset.done = "1";
      assembleFig(en.target);
    });
  }, { threshold: 0.25 });
  figs.forEach(function(f){ io.observe(f); });
}

/* ---------- RENDER ---------- */
function render() {
  $("#stackGrid").innerHTML = DATA.stack.map(function(c){
    return '<div class="sblock"><h3>'+c.cat+'</h3>'+c.items.map(function(it){
      return '<div class="skill"><div class="skill-name"><span>'+it[0]+'</span><span>'+it[1]+'%</span></div><div class="bar"><div class="bar-fill" data-w="'+it[1]+'"></div></div></div>';
    }).join("")+'</div>';
  }).join("");
  $("#projGrid").innerHTML = DATA.projects.map(function(p){
    return '<div class="proj-card"><h3>'+p.t+'</h3><p>'+p.d+'</p><div class="tags">'+p.tech.map(function(t){return '<span>'+t+'</span>';}).join("")+'</div></div>';
  }).join("");
  $("#timeline").innerHTML = DATA.exp.map(function(e){
    return '<div class="tl"><div class="role">'+e.r+'</div><div class="org">'+e.org+' <span class="dates">· '+e.y+'</span></div><ul>'+e.b.map(function(b){return '<li>'+b+'</li>';}).join("")+'</ul></div>';
  }).join("");
  $("#contactGrid").innerHTML = DATA.contact.map(function(c){
    return '<a class="hc" href="' + c.h + '" target="_blank" rel="noopener"><div class="l">' + c.l + '</div><div class="v">' + c.v + '</div></a>';
  }).join("");
}

/* ---------- REVEAL CONTENIDO ---------- */
function revealContent() {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var el = en.target; el.classList.add("on"); io.unobserve(el);
      if(window.anime){ anime({ targets: el.querySelectorAll(".sblock,.proj-card,.tl,.hc,.photo,.lede,.k"), opacity:[0,1], translateY:[20,0], delay:anime.stagger(50), duration:500, easing:"easeOutQuad" }); }
      var bars = el.querySelectorAll(".bar-fill");
      if(bars.length) setTimeout(function(){ bars.forEach(function(b,i){ setTimeout(function(){ b.style.width=b.dataset.w+"%"; }, i*50); }); },150);
    });
  }, { threshold:0.1, rootMargin:"0px 0px -30px 0px" });
  $$(".rv").forEach(function(el){ io.observe(el); });
}

/* ---------- PRELOADER (grafo crece + contador) ---------- */
function runPreloader() {
  var ns = 120, cur = { v:0 };
  var count = $("#pl-n");
  var seed = $("#graph-seed");
  (function buildSeed(){
    var svg = '<svg viewBox="0 0 180 160"><g fill="none" stroke="#8B5CF6" stroke-width="2">';
    svg += '<path id="e1" class="fig-line" d="M90 30 L160 110 L90 132 L30 110 Z"/></g>';
    svg += '<g fill="#F0ABFC"><circle cx="90" cy="30" r="9"/><circle cx="30" cy="110" r="7"/><circle cx="160" cy="110" r="7"/><circle cx="90" cy="132" r="8"/></g></svg>';
    seed.insertAdjacentHTML("afterbegin", svg);
    var line = seed.querySelector('.fig-line');
    if(window.anime && line){ anime({ targets: line, strokeDashoffset:[line.getTotalLength()||900,0], opacity:[0,1], duration:1400, easing:'easeInOutQuad' }); }
  })();
  anime({ targets: cur, v:[0,ns], duration:1600, easing:"easeInOutQuad",
    update:function(){ count.textContent = Math.round(cur.v); },
    complete:function(){ finish(); }
  });
  function finish(){
    var pre = $("#preloader");
    pre.classList.add("hidden");
    document.body.classList.remove("locked");
    setTimeout(function(){ pre.remove(); }, 500);
  }
}

function avatarFallback(img){
  img.onerror=null;
  var svg='<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360" viewBox="0 0 300 360"><rect width="300" height="360" fill="#22D8F5"/><circle cx="150" cy="120" r="60" fill="#0A0F1E"/><path d="M40 360 q110 -130 220 0 Z" fill="#0A0F1E"/><text x="150" y="300" text-anchor="middle" font-family="monospace" font-size="46" font-weight="700" fill="#2AF5B0">C·T</text></svg>';
  img.src="data:image/svg+xml;utf8,"+encodeURIComponent(svg);
}
function registerSW(){ if(navigator.serviceWorker && navigator.serviceWorker.register) navigator.serviceWorker.register("sw.js").catch(function(){}); }

document.addEventListener("DOMContentLoaded", function(){
  var img=$("#portrait"); if(img) img.onerror=function(){ avatarFallback(img); };
  render(); registerSW(); revealContent(); wireFigures();
  if(window.anime){ runPreloader(); } else { var pp=$("#pl-pct"); if(pp) pp.textContent="100%"; $("#preloader").classList.add("hidden"); document.body.classList.remove("locked"); }
});