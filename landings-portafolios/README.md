# Portafolios PWA — Cristian Torres (Full Stack Developer)

Colección de **5 propuestas conceptuales** de portafolio web con estética *Matrix / Cyberpunk / Terminal retro*,
orientadas exclusivamente a reclutadores técnicos y gerentes de ingeniería.

Filosofía común: **sin scroll vertical** — todo cabe en una pantalla y se navega por **tabs / paneles deslizantes / terminal**.
Encontrar *Experiencia, Proyectos y Stack* toma menos de 10 segundos.

Stack de cada propuesta:
- HTML5 semántico + **Tailwind CSS vía CDN** (layout) + CSS custom (variables, efectos).
- **JavaScript vanilla** + **anime.js v3** (CDN) para transiciones y animaciones.
- Estructura **PWA** básica: `manifest.webmanifest` + `sw.js` (cache-first).

---

## Contenido (tomado del CV `cristian_alonso_torres_patino_CV.pdf`)

| Dato | Valor |
|---|---|
| Nombre | Cristian Torres |
| Rol | Full Stack Developer (10+ años) |
| Stack | React · TypeScript · PHP · Laravel 8 · Node.js · WordPress · MySQL · AWS · Docker |
| Contacto | `ps4cristiantorr@gmail.com` · Medellín, Colombia |

> Reemplaza los `#` de los enlaces Demo/Código/GitHub/LinkedIn por tus URLs reales.

---

## Propuesta 01 — The Matrix Terminal  (`portafolio01-matrix-terminal`)

- **Flujo UX/UI:** secuencia de *boot* tipada → terminal central con lluvia de código Matrix de fondo. Navegación por **tabs laterales** (comandos `~/home`, `~/stack`, `~/projects`, `~/experience`, `~/contact`) **o escribiendo comandos** (`help`, `stack`, `whoami`, `clear`). Área de contenido de alto fijo con scroll interno oculto. Cero scroll de página.
- **Paleta / Tipografía:** verde Matrix `#00FF41`/`#0C0C0C`, acento cian. Body **Share Tech Mono**, código **JetBrains Mono**.
- **Efectos:** lluvia de katakana en `<canvas>`, cursor parpadeante, *typewriter* de boot, glitch al cambiar de sección, contadores animados, barras de skill que se llenan.

## Propuesta 02 — Mission Control HUD (`portafolio02-hud-mission-control`)

- **Flujo:** interfaz de "nave espacial". **Rail lateral fijo** con iconos HUD + **panel que desliza horizontalmente** (`translateX` con anime.js) entre 5 módulos. Marcos de esquina HUD y barra de status con radar. Cero scroll.
- **Paleta / Tipografía:** cian `#00E5FF`, azul `#2979FF`, magenta `#FF2979`, fondo `#0A0E17`. Títulos **Orbitron**, body **Share Tech Mono**.
- **Efectos:** scanlines, radar giratorio, neones pulsantes, anillo de capacidad (conic-gradient) que se llena, medidores, tarjetas con hover.

## Propuesta 03 — Retro Cyberdeck / CRT (`portafolio03-retro-cyberdeck`)

- **Flujo UX:** monitor CRT con secuencia **POWER ON → POST → OK** y tecla para empezar. Luego interfaz DOS: **menú lateral** fijo + **pantallas que se intercambian** con parpadeo de CRT. Navegable por clic o **teclas 1–5**. Sin scroll.
- **Paleta / Tipografía:** rosa `#FF2A6D`, púrpura `#8A2BE2`, cian `#05D9E8`, fondo `#01012B`. Títulos **Press Start 2P**, body **VT323** (pixel/retro).
- **Efectos:** scanlines + curvatura de CRT, flicker al cambiar de pantalla, arte ASCII (logo generado), RGB glow, teclado como navegación.

## Propuesta 04 — Neon Command Center (`portafolio04-neon-command-center`)

- **Flujo UX:** la **más legible/corporativa**. **Tab bar superior** estilo SO (role=tablist, ARIA correcto) + **panel a pantalla completa** con fade/slide. Barra de status inferior. El reclutador halla al instante.
- **Paleta / Tipografía:** azul marino `#0B0F19`, cian/azul `#22D3EE`/`#38BDF8`, púrpura `#8B5CF6`. **Space Grotesk** (UI) + **IBM Plex Mono** (datos).
- **Efectos:** subrayado de tab deslizante, fade-up de paneles, contadores, barras de progreso, hover elevación; glitch mínimo y elegante.

## Variante 05 — AI Data Assistant (`portafolio05-ai-data-assistant`)

- **Flujo UX:** columna izquierda fija de **telemetría animada** (uptime, CPU, contadores) + **panel right tipo chat-asistente**: el reclutador pulsa *quick actions* o escribe; el sistema responde tipando el contenido real del CV. Log con scroll interno acotado. Cada pantalla no scrola.
- **Paleta / Tipografía:** ámbar/neón `#FFB000` sobre `#0F0E08` + cian de acento (para diferenciarlo). **Fira Code** + **Space Mono**.
- **Efectos:** *typing indicator* (puntos), reveal de mensajes con anime.js, contadores/uptime en tiempo real, células CPU animadas, cursor parpadeando.

---

## Serie II — Animación intensiva con anime.js (propuestas 06 a 10)

Estas 5 propuestas hacen un uso intensivo de **anime.js** (bucles infinitos, `anime.stagger`, easings
elásticos, `keyframes`, tilt 3D y morphs) manteniendo la regla de **una pantalla sin scroll**.

## Variante 06 — Neon Hologram (`portafolio06-neon-hologram`)

- **Flujo UX:** identidad holográfica en el centro + **chips de navegación** a la izquierda. Paneles que entran con blur+stagger.
- **Paleta / Tipografía:** cian `#00D9FF`, púrpura `#A78BFA`, rosa `#FF2FA0` sobre `#0B1026`. **Audiowide** + **Rajdhani**.
- **Efectos anime.js:** el nombre se anima letra a letra (`stagger` + `easeOutExpo`), **tilt 3D** en las tarjetas de proyectos (`rotateX/rotateY` con retorno elástico `easeOutElastic`), 18 *floaters* de neón en bucle infinito, estrellas `+` parpadeando, barrido de luz en la línea HUD, contadores.

## Variante 07 — Particle Neural (`portafolio07-particle-neural`)

- **Flujo UX:** **red neuronal de partículas** en `<canvas>` que reacciona al ratón (repulsión y conexiones por distancia) + navegación por **puntos laterales** con etiqueta. Paneles con fade+stagger.
- **Paleta / Tipografía:** verde `#38FF8C`, cian `#38BDF8` sobre `#0F0F16`. **Orbitron** + **Space Grotesk**.
- **Efectos anime.js:** partículas que se conectan según distancia, `keyframes` de "pulse" en el nombre, glow de synapsis, barras que se llenan escalonadas.

## Variante 08 — Liquid Neon (`portafolio08-liquid-neon`)

- **Flujo UX:** tab bar superior con **underline que se desliza** + paneles que entran con `easeOutBack` horizontal.
- **Paleta / Tipografía:** rosa `#FF2FA0`, púrpura `#B026FF`, cian `#00F0FF` sobre `#150A1E`. **Space Grotesk** + **IBM Plex Mono**.
- **Efectos anime.js:** **3 blobs líquidos** (blur 70px) que se mueven/escalan/rotan en bucle con `direction: alternate` y `easeInOutSine`; entrada de paneles con rebote elástico.

## Variante 09 — Orbital Interface (`portafolio09-orbital-interface`)

- **Flujo UX:** sistema solar: **planetas-botón en órbita** alrededor de un **núcleo central** que muestra la sección activa. Navegación por planeta, teclas 1-5 o clic.
- **Paleta / Tipografía:** cian `#00E5FF`, ámbar `#FFC93C`, púrpura `#8B5CF6` sobre `#0A0F1E`. **Orbitron** + **Exo 2**.
- **Efectos anime.js:** anillos de órbita girando continuamente (360° loop), planetas posicionados por trigonometría, estrella que parpadea, paneles que entran con `easeOutBack` (fuego solar), estrellas `✦` animadas.

## Variante 10 — Typography Motion (`portafolio10-typography-motion`)

- **Flujo UX:** la más "cinética": tipografía gigante que **se escribe letra a letra** y luego **flota en una onda infinita**; marquee superior en bucle; navegación por chips. Paneles con blur+slide.
- **Paleta / Tipografía:** rojo `#FF4D6D`, cian `#00F0FF`, amarillo `#FFE600` sobre `#0D0D14`. **Anton** (display) + **Space Mono**.
- **Efectos anime.js:** `stagger` elástico en cada letra del nombre, onda infinita (`translateY` alternado por índice), marquee `translateX -50%` en loop, títulos de sección con reveal letra a letra, typewriter en el rol.

---

## Estructura PWA (en cada carpeta)

```
portafolioXX-nombre/
├── index.html            # Tailwind (CDN) + enlaces CSS/JS/fuentes/PWA
├── css/style.css         # variables + efectos (lluvia, glitch, scanlines, CRT...)
├── js/app.js             # lógica de tabs/paneles/terminal + render de datos + PWA
├── manifest.webmanifest  # name, theme_color, icons 192/512, display: standalone
├── sw.js                 # service worker cache-first + fallback offline
└── assets/icon-{192,512}.png
```

### Cómo probar

Las vistas usan CDN (Tailwind, Google Fonts, anime.js). Para que el Service Worker y el manifest funcionen,
sirve la carpeta por HTTP, por ejemplo:

```powershell
# desde la carpeta del proyecto
python -m http.server 8080
# abre http://localhost:8080/portafolio01-matrix-terminal/
```

O usa la extensión "Live Server" de VS Code.

### Pasos para publicarlo como PWA instalable

1. Sustituye los iconos de `assets/` por los tuyos (PNG 192 y 512) si lo deseas.
2. Ajusta `theme_color` y `background_color` por el tema de cada propuesta (ya configurados).
3. Sirve la web por **HTTPS** (o localhost) y el navegador ofrecerá "Instalar".
4. Para producción real, compila Tailwind (evita el plugin de Play CDN).