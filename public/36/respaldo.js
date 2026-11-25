/*
 * Mis 36 pirulos (tatoclemente.dev/36): respaldo en JavaScript de las animaciones por scroll.
 *
 * Lo carga el aviso del final del <head> solo cuando el navegador no tiene las timelines de
 * scroll de CSS (por ejemplo Safari antes de iOS 26), o con ?fallback si el exportador lo habilita (QA).
 * No define animaciones propias: aplica las reglas del bloque nativo (los mismos @keyframes y
 * los mismos rangos) como animaciones CSS pausadas y las adelanta con currentTime según el
 * scroll, con la misma cuenta de rangos que hace el navegador (cover, contain, entry, exit).
 * Por cuadro solo lee scrollY: las posiciones se miden de una vez y se vuelven a medir cuando
 * cambia el tamaño de algo (ResizeObserver, resize).
 * Si algo falla, desarma todo y queda la versión estática.
 *
 * Lo genera tools/exportar_produccion.py desde tools/respaldo/respaldo.js: no editar en public/36.
 */
(function () {
  'use strict';

  var REGLAS = ".hud { animation: hud-in linear both 1s paused; --anim-tl: scroll(root block); --anim-ar: 6% 11%; }\n.hud-n { animation: alt linear both 1s paused; --anim-tl: scroll(root block); --anim-ar: 0% 100%; }\n.trazo { animation: trazo linear both 1s paused; --anim-tl: scroll(root block); --anim-ar: 0% 100%; }\n.poster { animation: poster-out linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.cielo { animation: cielo-in linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.t-a { animation: tow-a linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.t-b { animation: tow-b linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.pase { animation: pase-in linear both 1s paused; --anim-tl: --s3; --anim-ar: entry 10% entry 70%; }\n.sello { animation: sello linear both 1s paused; --anim-tl: --s3; --anim-ar: entry 55% entry 90%; }\n.rwv { animation: aterriza linear both 1s paused; --anim-tl: --t4; --anim-ar: contain 0% contain 100%; }\n.cartel-aero { animation: cartel-in linear both 1s paused; --anim-tl: --t4; --anim-ar: contain 0% contain 100%; }\n.manga4 { animation: sube linear both 1s paused; --anim-tl: --t4; --anim-ar: contain 30% contain 80%; }\n.menu span { animation: sube linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 10% entry 60%; }\n.menu span + span { --anim-ar: entry 25% entry 75%; }\n.tray .bnd { animation: comba linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 40% cover 45%; }\n.tray .chori { animation: cae linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 35% entry 85%; }\n.tray .morci { animation: cae linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 45% entry 95%; }\n.tray .esq { animation: dobla linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 70% cover 40%; }\n.vajilla { animation: estampa linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 70% cover 40%; }\n.am-agua { animation: am-sube-agua linear both 1s paused; --anim-tl: --am; --anim-ar: contain 0% contain 10%; }\n.am-1 { animation: sube linear both 1s paused; --anim-tl: --am; --anim-ar: contain 4% contain 12%; }\n.am-cartel { animation: sube linear both 1s paused; --anim-tl: --am; --anim-ar: contain 9% contain 17%; }\n.am-avion { animation: am-baja linear both 1s paused; --anim-tl: --am; --anim-ar: contain 10% contain 56%; }\n.am-splash { animation: am-splash linear both 1s paused; --anim-tl: --am; --anim-ar: contain 10% contain 56%; }\n.am-estela { animation: am-estela linear both 1s paused; --anim-tl: --am; --anim-ar: contain 10% contain 56%; }\n.am-reflejo { animation: am-ref linear both 1s paused; --anim-tl: --am; --anim-ar: contain 10% contain 56%; }\n.am-sello { animation: am-sello linear both 1s paused; --anim-tl: --am; --anim-ar: contain 29% contain 37%; }\n.am-hay { animation: am-hay linear both 1s paused; --anim-tl: --am; --anim-ar: contain 44% contain 54%; }\n.am-tarjeta { animation: am-card linear both 1s paused; --anim-tl: --am; --anim-ar: contain 56% contain 67%; }\n.am-p { animation: am-pop linear both 1s paused; --anim-tl: --am; --anim-ar: contain 63% contain 69%; }\n.am-p.p2 { --anim-ar: contain 66% contain 72%; }\n.am-p.p3 { --anim-ar: contain 69% contain 75%; }\n.am-ok { animation: am-pop linear both 1s paused; --anim-tl: --am; --anim-ar: contain 69% contain 74%; }\n.p2 .am-ok { --anim-ar: contain 72% contain 77%; }\n.p3 .am-ok { --anim-ar: contain 75% contain 80%; }\n.am-juzgar { animation: sube linear both 1s paused; --anim-tl: --am; --anim-ar: contain 81% contain 87%; }\n.am-nota { animation: am-escribe linear both 1s paused; --anim-tl: --am; --anim-ar: contain 90% contain 98%; }\n.am-ast { animation: am-pop linear both 1s paused; --anim-tl: --am; --anim-ar: contain 90% contain 94%; }\n.tagw { animation: cuelga linear both 1s paused; --anim-tl: --s6; --anim-ar: entry 55% cover 52%; }\n.carga { animation: llega linear both 1s paused; --anim-tl: --s6; --anim-ar: entry 0% entry 90%; }\n.cinta-tablas { animation: cinta linear both 1s paused; --anim-tl: --s6; --anim-ar: entry 0% entry 90%; }\n.cooler .tapa { animation: abre linear both 1s paused; --anim-tl: --s6; --anim-ar: cover 34% cover 50%; }\n.cooler .botellas { animation: asoma linear both 1s paused; --anim-tl: --s6; --anim-ar: cover 38% cover 54%; }\n.cooler .hielo rect { animation: salta linear both 1s paused; --anim-tl: --s6; --anim-ar: cover 40% cover 56%; }\n.cooler .hielo rect:nth-child(2) { --anim-ar: cover 42% cover 58%; }\n.cooler .hielo rect:nth-child(3) { --anim-ar: cover 44% cover 60%; }\n.cooler .frio { animation: frio linear both 1s paused; --anim-tl: --s6; --anim-ar: cover 36% cover 58%; }\n.cabina .luz { animation: luz linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 60% cover 36%; }\n.ding { animation: ding linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 60% cover 36%; }\n.tray { animation: sacude linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 70% cover 40%; }\n.salpicado circle { animation: gota linear both 1s paused; --anim-tl: --s5; --anim-ar: entry 70% cover 40%; }\n.capa.cn-1 { animation: capa-1 linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.capa.cn-2 { animation: capa-2 linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.capa.cn-3 { animation: capa-3 linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.nube-cerca { animation: cerca linear both 1s paused; --anim-tl: --s1; --anim-ar: contain 0% contain 100%; }\n.n18 { animation: sube linear both 1s paused; --anim-tl: --s7; --anim-ar: entry 10% entry 80%; }";
  var TIMELINES = {"--s1": ".s1", "--s3": ".s3", "--s4": ".s4", "--t4": ".trk", "--s5": ".s5", "--s6": ".s6", "--s7": ".s7", "--am": ".s-am"};
  var NOMBRES = ["abre", "alt", "am-baja", "am-card", "am-escribe", "am-estela", "am-hay", "am-pop", "am-ref", "am-sello", "am-splash", "am-sube-agua", "asoma", "aterriza", "cae", "capa-1", "capa-2", "capa-3", "cartel-in", "cerca", "cielo-in", "cinta", "comba", "cuelga", "ding", "dobla", "estampa", "frio", "gota", "hud-in", "llega", "luz", "pase-in", "poster-out", "sacude", "salta", "sello", "sube", "tow-a", "tow-b", "trazo"];

  var doc = document, html = doc.documentElement, win = window;
  var nativo = doc.getElementById('anim-nativo');
  var estatico = doc.getElementById('anim-estatico');
  var yo = doc.currentScript;
  var forzado = !!(yo && yo.hasAttribute('data-forzado'));
  var reducir = win.matchMedia('(prefers-reduced-motion: reduce)');
  if (!nativo || !estatico) return;

  // Las propiedades auxiliares no se heredan: cada elemento lee solo lo que declara.
  ['--anim-tl', '--anim-ar'].forEach(function (nombre) {
    try { CSS.registerProperty({ name: nombre, syntax: '*', inherits: false }); } catch { /* ya registrada */ }
  });

  var RAIZ = {};
  var estilo = null, activo = false, escuchando = false, pendiente = false, sucio = true;
  var anims = [], sujetos = [], alto = 0, maxY = 0, ancho = -1, ro = null;
  var qa = null, qaN = 0, qaDesde = 0, qaUltimo = 0;

  function lista(v) { v = (v || '').trim(); return v ? v.split(/\s*,\s*/) : []; }
  function elegir(l, i) { return l.length ? l[i % l.length] : ''; }

  // animation-range: "<inicio> [<fin>]"; cada lado es "normal" o "[nombre] [porcentaje | px]".
  function lado(t, k, esFin) {
    var l = { n: null, p: esFin ? 1 : 0, x: 0 }, m;
    if (t[k.i] === 'normal') { k.i++; return l; }
    if (t[k.i] && /^[a-z-]+$/.test(t[k.i])) l.n = t[k.i++];
    if (t[k.i] && (m = /^(-?[\d.]+)(%|px)$/.exec(t[k.i]))) {
      k.i++;
      if (m[2] === '%') l.p = parseFloat(m[1]) / 100;
      else { l.p = 0; l.x = parseFloat(m[1]); }
    }
    return l;
  }
  function rango(txt) {
    var t = (txt || 'normal').trim().split(/\s+/), k = { i: 0 };
    var ini = lado(t, k, false);
    // Sin fin explícito: el mismo rango nombrado al 100 %, o toda la timeline.
    var fin = k.i < t.length ? lado(t, k, true) : { n: ini.n, p: 1, x: 0 };
    return { ini: ini, fin: fin };
  }

  // scrollY en el que cae un borde del rango, con la misma geometría que usa el navegador:
  // T y H son el borde superior y el alto del sujeto en el documento, alto es el del viewport.
  function borde(s, l) {
    if (s === RAIZ) return maxY * l.p + l.x;
    var T = s.T, H = s.H, c0 = Math.min(T, T + H - alto), c1 = Math.max(T, T + H - alto), a, b;
    switch (l.n) {
      case 'contain': a = c0; b = c1; break;
      case 'entry': a = T - alto; b = c0; break;
      case 'exit': a = c1; b = T + H; break;
      case 'entry-crossing': a = T - alto; b = T + H - alto; break;
      case 'exit-crossing': a = T; b = T + H; break;
      default: a = T - alto; b = T + H; // cover o normal
    }
    return a + (b - a) * l.p + l.x;
  }

  function sujeto(el) {
    for (var i = 0; i < sujetos.length; i++) if (sujetos[i].el === el) return sujetos[i];
    var s = { el: el, T: 0, H: 0 };
    sujetos.push(s);
    return s;
  }

  // Junta las animaciones CSS del respaldo y, para cada una, su timeline y su rango.
  function recolectar() {
    anims = [];
    sujetos = [];
    var todas = doc.getAnimations();
    for (var i = 0; i < todas.length; i++) {
      var a = todas[i], ef = a.effect, el = ef && ef.target;
      if (!el || ef.pseudoElement || a.timeline !== doc.timeline || NOMBRES.indexOf(a.animationName) < 0) continue;
      var cs = win.getComputedStyle(el);
      var j = Math.max(0, lista(cs.animationName).indexOf(a.animationName));
      var tl = elegir(lista(cs.getPropertyValue('--anim-tl')), j);
      var s = null;
      if (tl.indexOf('scroll(') === 0) s = RAIZ;
      else if (Object.prototype.hasOwnProperty.call(TIMELINES, tl)) {
        var c = el.closest(TIMELINES[tl]);
        if (c) s = sujeto(c);
      }
      if (!s) continue;
      var d = ef.getComputedTiming().activeDuration;
      anims.push({
        a: a, s: s, r: rango(elegir(lista(cs.getPropertyValue('--anim-ar')), j)),
        d: d > 0 && d < Infinity ? d : 1000, ini: 0, fin: 0, t: -1
      });
    }
  }

  // Lecturas de layout: solo acá, y solo cuando algo cambió de tamaño.
  function medir() {
    var y = win.pageYOffset, raiz = doc.scrollingElement || html, i, s, o, r;
    alto = win.innerHeight;
    maxY = Math.max(0, raiz.scrollHeight - alto);
    for (i = 0; i < sujetos.length; i++) {
      s = sujetos[i];
      r = s.el.getBoundingClientRect();
      s.T = r.top + y;
      s.H = r.height;
    }
    for (i = 0; i < anims.length; i++) {
      o = anims[i];
      o.ini = borde(o.s, o.r.ini);
      o.fin = borde(o.s, o.r.fin);
    }
    sucio = false;
  }

  // Por cuadro: una lectura (scrollY) y después solo escrituras, y solo de lo que cambió.
  function actualizar() {
    var y = win.pageYOffset;
    for (var i = 0; i < anims.length; i++) {
      var o = anims[i];
      var p = o.fin > o.ini ? (y - o.ini) / (o.fin - o.ini) : (y >= o.fin ? 1 : 0);
      var t = (p < 0 ? 0 : p > 1 ? 1 : p) * o.d;
      if (t !== o.t) { o.t = t; o.a.currentTime = t; }
    }
  }

  function cuadro(ahora) {
    pendiente = false;
    if (!activo) return;
    if (sucio) medir();
    actualizar();
    if (qa) contarQa(ahora);
  }
  function pedirCuadro() {
    if (!pendiente) { pendiente = true; win.requestAnimationFrame(cuadro); }
  }
  function invalidar() { sucio = true; pedirCuadro(); }
  function alRedimensionar() {
    if (!activo) return;
    if (win.innerWidth !== ancho) { ancho = win.innerWidth; recolectar(); observar(); }
    invalidar();
  }
  function observar() {
    if (ro) ro.disconnect();
    ro = new ResizeObserver(invalidar);
    ro.observe(doc.body);
    for (var i = 0; i < sujetos.length; i++) ro.observe(sujetos[i].el);
  }
  function escuchar() {
    if (escuchando) return;
    escuchando = true;
    win.addEventListener('scroll', pedirCuadro, { passive: true });
    win.addEventListener('resize', alRedimensionar, { passive: true });
    win.addEventListener('pageshow', invalidar, { passive: true });
    win.addEventListener('load', invalidar, { passive: true });
  }

  // Cambia la estática (o la nativa, en QA) por las reglas del respaldo, en el mismo lugar de la cascada.
  function activar() {
    if (activo) return true;
    if (!forzado && win.pageYOffset > win.innerHeight / 2) return false; // ya está leyendo la estática
    estilo = doc.createElement('style');
    estilo.id = 'anim-respaldo';
    estilo.textContent = REGLAS;
    nativo.parentNode.insertBefore(estilo, nativo.nextSibling);
    nativo.media = 'not all';
    estatico.media = 'not all';
    html.setAttribute('data-animaciones', forzado ? 'respaldo-qa' : 'respaldo');
    html.classList.remove('anim-pendiente'); // en la misma tarea: no se pinta nada en el medio
    activo = true;
    sucio = true;
    return true;
  }

  function desactivar() {
    activo = false;
    if (estilo && estilo.parentNode) estilo.parentNode.removeChild(estilo);
    if (qa && qa.parentNode) qa.parentNode.removeChild(qa);
    if (ro) ro.disconnect();
    estilo = qa = ro = null;
    anims = [];
    sujetos = [];
    nativo.removeAttribute('media');
    estatico.removeAttribute('media');
    html.removeAttribute('data-animaciones');
    html.classList.remove('anim-pendiente');
  }

  function iniciar() {
    if (!activo) return;
    try {
      ancho = win.innerWidth;
      recolectar();
      if (!anims.length) throw new Error('no encontré animaciones para manejar');
      medir();
      actualizar();
      observar();
      escuchar();
      if (forzado && !qa) crearQa();
    } catch (e) {
      desactivar();
      if (win.console) console.warn('Mis 36 pirulos: el respaldo de animaciones no arrancó; queda la versión estática.', e);
    }
  }

  function arrancar() {
    if (reducir.matches || !activar()) { html.classList.remove('anim-pendiente'); return; }
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
  }

  // QA (?fallback, solo si el exportador lo habilita): un cartel confirma que corre el respaldo y muestra los fps.
  function crearQa() {
    qa = doc.createElement('div');
    qa.id = 'anim-qa';
    qa.setAttribute('aria-hidden', 'true');
    qa.textContent = 'Fallback JS';
    qa.style.cssText = 'position:fixed;left:8px;bottom:calc(8px + env(safe-area-inset-bottom, 0px));z-index:2147483647;' +
      'padding:5px 7px;background:#1B2A4A;color:#F2C12E;border:1px solid #F2C12E;' +
      'font:500 10px/1.2 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.06em;pointer-events:none';
    doc.body.appendChild(qa);
  }
  function contarQa(ahora) {
    if (ahora - qaUltimo > 150) { qaDesde = ahora; qaN = 0; }
    qaUltimo = ahora;
    qaN++;
    if (ahora - qaDesde >= 1000) {
      qa.textContent = 'Fallback JS · ' + Math.round((qaN - 1) * 1000 / (ahora - qaDesde)) + ' fps';
      qaDesde = ahora;
      qaN = 1;
    }
  }

  function alCambiarMovimiento() {
    if (reducir.matches) desactivar();
    else arrancar();
  }
  if (reducir.addEventListener) reducir.addEventListener('change', alCambiarMovimiento);
  else if (reducir.addListener) reducir.addListener(alCambiarMovimiento);

  arrancar();
})();
