/*
 * Mis 36 pirulos (tatoclemente.dev/36): audio de cabina.
 *
 * Lo carga el panel de la portada recién cuando la persona toca «Activar audio de cabina».
 * Todo es síntesis con Web Audio, sin archivos:
 * - música sintetizada (shuffle entre rockabilly, surf y swing) que corre aparte del scroll y en
 *   la pista 18 baja de a poco, como una radio que se aleja;
 * - ambientes que siguen el scroll sin volver a dispararse: motor y viento en el vuelo (el motor
 *   desacelera en la aproximación), brasas en el menú, agua en el amerizaje, cinta en el equipaje;
 * - golpes en los momentos clave de las animaciones: avionetas que cruzan, sellos, ruedas, ding del
 *   cartel de cabina, bandeja, chapuzón, tapa, hielo, botellas y la notificación del final.
 * Cada golpe suena una vez al pasar bajando por su momento y se rearma recién cuando la persona
 * vuelve a subir casi una pantalla y pasaron 6 s.
 *
 * Lo copia tools/exportar_produccion.py desde tools/audio/audio.js: no editar en public/36.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------- piezas de síntesis
  function piezas(ctx) {
    const sr = ctx.sampleRate;
    const g = (v = 0) => { const n = ctx.createGain(); n.gain.value = v; return n; };
    const filtro = (tipo, f, q = 0.7) => { const n = ctx.createBiquadFilter(); n.type = tipo; n.frequency.value = f; n.Q.value = q; return n; };
    const osc = (tipo, f) => { const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = f; return o; };
    const cadena = (...n) => { for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]); return n[n.length - 1]; };
    // envolvente percusiva: sube en `ataque` hasta `pico` y cae en `caida` segundos
    const env = (n, t, ataque, pico, caida) => {
      n.gain.setValueAtTime(0.0001, t);
      n.gain.exponentialRampToValueAtTime(Math.max(pico, 0.0002), t + ataque);
      n.gain.exponentialRampToValueAtTime(0.0001, t + ataque + caida);
    };
    function ruido(tipo, seg) {
      const n = Math.floor(sr * seg), b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, m = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        if (tipo === 'blanco') d[i] = w;
        else if (tipo === 'marron') { m = (m + 0.02 * w) / 1.02; d[i] = m * 3.5; }
        else { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; }
      }
      return b;
    }
    const BLANCO = ruido('blanco', 2), ROSA = ruido('rosa', 3), MARRON = ruido('marron', 4);
    const tramo = (buf, t, dur) => {
      const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
      s.start(t, Math.random() * (buf.duration - 0.2)); s.stop(t + dur); return s;
    };
    const lazo = (buf) => { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; };
    const tono = (dest, tipo, f0, f1, t, ataque, pico, caida) => {
      const o = osc(tipo, f0), e = g();
      if (f1 !== f0) { o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + ataque + caida * 0.6); }
      env(e, t, ataque, pico, caida); cadena(o, e, dest); o.start(t); o.stop(t + ataque + caida + 0.05);
    };
    const soplo = (dest, buf, tipo, f, q, t, ataque, pico, caida) => {
      const fl = filtro(tipo, f, q), e = g(); env(e, t, ataque, pico, caida);
      cadena(tramo(buf, t, ataque + caida + 0.05), fl, e, dest); return fl;
    };
    // parámetros que se mueven con el scroll: solo se reprograman si el valor cambió de verdad
    const ultimo = new WeakMap();
    const suave = (p, v, tc = 0.12) => {
      const u = ultimo.get(p);
      if (u !== undefined && Math.abs(u - v) <= Math.max(0.004, Math.abs(u) * 0.004)) return;
      ultimo.set(p, v); p.setTargetAtTime(v, ctx.currentTime, tc);
    };
    function impulso(seg, caida) {
      const n = Math.floor(sr * seg), b = ctx.createBuffer(2, n, sr);
      for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, caida); }
      return b;
    }
    const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
    return { sr, g, filtro, osc, cadena, env, ruido, BLANCO, ROSA, MARRON, tramo, lazo, tono, soplo, suave, impulso, hz };
  }

  // ---------------------------------------------------------------- efectos y ambientes
  function sonidos(ctx, P) {
    const { sr, g, filtro, osc, cadena, env, BLANCO, ROSA, MARRON, lazo, tono, soplo, suave } = P;
    const ef = {
      // golpe seco del sello: cuerpo grave, chasquido de goma y papel, un rebote apenas
      sello(d, t, k = 1) {
        tono(d, 'sine', 140, 48, t, 0.003, 0.85 * k, 0.17);
        soplo(d, BLANCO, 'bandpass', 1400, 0.9, t, 0.002, 0.45 * k, 0.06);
        soplo(d, BLANCO, 'bandpass', 2700, 1.2, t + 0.05, 0.002, 0.1 * k, 0.04);
      },
      // dos chirridos de goma, el peso del avión y el retumbo de la pista
      ruedas(d, t) {
        [0, 0.14].forEach((dt, i) => {
          const f = soplo(d, ROSA, 'bandpass', 2500 - i * 300, 7, t + dt, 0.006, 0.5 - i * 0.15, 0.17);
          f.frequency.setValueAtTime(2600 - i * 300, t + dt); f.frequency.exponentialRampToValueAtTime(1100, t + dt + 0.17);
        });
        tono(d, 'sine', 85, 38, t + 0.02, 0.004, 0.65, 0.3);
        soplo(d, MARRON, 'lowpass', 260, 0.7, t + 0.02, 0.03, 0.45, 0.75);
      },
      // avioneta que cruza de derecha a izquierda, con efecto Doppler
      pasada(d, t, dur = 2.8) {
        const o = osc('sawtooth', 62), o2 = osc('square', 124), lp = filtro('lowpass', 950, 0.9), dos = g(0.3), am = g(0.7), e = g();
        const lfo = osc('sine', 27), prof = g(0.3);
        o.frequency.setValueAtTime(66, t); o.frequency.linearRampToValueAtTime(62, t + dur * 0.45); o.frequency.linearRampToValueAtTime(51, t + dur * 0.62); o.frequency.linearRampToValueAtTime(48, t + dur);
        o2.frequency.setValueAtTime(132, t); o2.frequency.linearRampToValueAtTime(124, t + dur * 0.45); o2.frequency.linearRampToValueAtTime(102, t + dur * 0.62); o2.frequency.linearRampToValueAtTime(96, t + dur);
        e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(0.3, t + dur * 0.5); e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        lfo.connect(prof); prof.connect(am.gain);
        o.connect(lp); cadena(o2, dos, lp); cadena(lp, am, e);
        if (ctx.createStereoPanner) {
          const pan = ctx.createStereoPanner(); pan.pan.setValueAtTime(0.85, t); pan.pan.linearRampToValueAtTime(-0.85, t + dur);
          cadena(e, pan, d);
        } else e.connect(d);
        [o, o2, lfo].forEach((s) => { s.start(t); s.stop(t + dur + 0.05); });
      },
      // ding-dong del cartel de cabina
      ding(d, t) {
        [[1318.5, 0], [1046.5, 0.42]].forEach(([f, dt]) => {
          [[1, 0.2, 1.6], [2.76, 0.045, 0.6], [5.4, 0.018, 0.25]].forEach(([m, v, c]) => tono(d, 'sine', f * m, f * m, t + dt, 0.004, v, c));
        });
      },
      // la bandeja que se sacude
      bandeja(d, t) {
        tono(d, 'sine', 95, 55, t, 0.004, 0.4, 0.11);
        soplo(d, ROSA, 'lowpass', 700, 0.8, t, 0.003, 0.22, 0.09);
      },
      // el hidroavión toca el agua: golpe, cortina de agua que se apaga y gotas
      chapuzon(d, t) {
        const f = soplo(d, BLANCO, 'lowpass', 6000, 0.5, t, 0.012, 0.55, 0.85);
        f.frequency.setValueAtTime(6000, t); f.frequency.exponentialRampToValueAtTime(450, t + 0.8);
        tono(d, 'sine', 90, 40, t, 0.008, 0.45, 0.3);
        for (let i = 0; i < 8; i++) {
          const td = t + 0.12 + Math.random() * 0.65, f0 = 600 + Math.random() * 900;
          tono(d, 'sine', f0, f0 * 1.7, td, 0.003, 0.05 + Math.random() * 0.06, 0.07);
        }
      },
      // la cinta frena cuando llega la conservadora
      frena(d, t) {
        tono(d, 'sine', 120, 60, t, 0.004, 0.28, 0.13);
        soplo(d, ROSA, 'bandpass', 600, 1, t, 0.003, 0.18, 0.1);
      },
      // la tapa de la conservadora: crujido de plástico y el pop al despegar
      tapa(d, t) {
        const o = osc('sawtooth', 150), bp = filtro('bandpass', 900, 9), e = g();
        o.frequency.setValueAtTime(150, t); o.frequency.linearRampToValueAtTime(230, t + 0.2);
        env(e, t, 0.02, 0.1, 0.2); cadena(o, bp, e, d); o.start(t); o.stop(t + 0.3);
        tono(d, 'sine', 380, 170, t + 0.18, 0.002, 0.32, 0.07);
        soplo(d, BLANCO, 'bandpass', 3000, 1.5, t + 0.18, 0.001, 0.18, 0.02);
      },
      // cubitos que saltan
      hielo(d, t) {
        [0, 0.07, 0.16, 0.21].forEach((dt) => { const f = 4800 + Math.random() * 2600; tono(d, 'sine', f, f, t + dt, 0.001, 0.06, 0.07); });
      },
      // botellas que asoman y chocan
      botellas(d, t) {
        [[0, 1], [0.11, 0.7], [0.27, 0.45]].forEach(([dt, k]) => {
          const base = 2300 + Math.random() * 500;
          [[1, 0.15, 0.55], [1.53, 0.075, 0.35], [2.66, 0.045, 0.2], [3.9, 0.025, 0.12]].forEach(([m, v, c]) => tono(d, 'sine', base * m, base * m, t + dt, 0.001, v * k, c));
        });
        tono(d, 'sine', 210, 200, t, 0.003, 0.16, 0.12);
      },
      // «Las rodillas salieron del grupo.»: aviso corto de chat
      notificacion(d, t) {
        [[988, 0], [1480, 0.085]].forEach(([f, dt]) => tono(d, 'sine', f * 0.92, f, t + dt, 0.004, 0.24, 0.22));
      },
    };

    // --- ambientes: arrancan una vez y el scroll solo les mueve el volumen (y al motor, el tono)
    function motor(dest) {
      const o1 = osc('sawtooth', 46), o2 = osc('square', 92), lp = filtro('lowpass', 560, 0.8), dos = g(0.25);
      const am = g(0.7), lfo = osc('sine', 24), prof = g(0.3), escape = filtro('bandpass', 280, 0.9), gEsc = g(0.5), vol = g(0);
      o1.connect(lp); cadena(o2, dos, lp); lp.connect(am);
      cadena(lazo(MARRON), escape, gEsc, am);
      lfo.connect(prof); prof.connect(am.gain);
      cadena(am, vol, dest);
      [o1, o2, lfo].forEach((s) => s.start());
      return {
        fijar(f, v) {
          suave(o1.frequency, f, 0.3); suave(o2.frequency, f * 2, 0.3); suave(lfo.frequency, f * 0.52, 0.3);
          suave(lp.frequency, 300 + f * 6, 0.3); suave(vol.gain, v, 0.15);
        },
      };
    }
    function viento(dest) {
      const bp = filtro('bandpass', 650, 0.45), hp = filtro('highpass', 160, 0.7), lfo = osc('sine', 0.09), prof = g(260), vol = g(0);
      lfo.connect(prof); prof.connect(bp.frequency); lfo.start();
      cadena(lazo(ROSA), hp, bp, vol, dest);
      return { fijar(v) { suave(vol.gain, v); } };
    }
    function brasas(dest) {
      const n = Math.floor(sr * 3), b = ctx.createBuffer(1, n, sr), x = b.getChannelData(0);
      let prev = 0;
      for (let i = 0; i < n; i++) { const w = Math.random() * 2 - 1; x[i] = (w - prev) * 0.02; prev = w; } // siseo fino
      for (let k = 0; k < 120; k++) { // chispas
        const i0 = Math.floor(Math.random() * (n - sr * 0.02)), amp = Math.pow(Math.random(), 2.2) * 0.85 + 0.05, largo = Math.floor(sr * (0.0008 + Math.random() * 0.004));
        for (let j = 0; j < largo; j++) x[i0 + j] += (Math.random() * 2 - 1) * amp * Math.exp(-j / (largo / 4));
      }
      for (let k = 0; k < 14; k++) { // la grasa que estalla, más grave
        const i0 = Math.floor(Math.random() * (n - sr * 0.03)), amp = 0.35 + Math.random() * 0.3, largo = Math.floor(sr * 0.012), f = 600 + Math.random() * 900;
        for (let j = 0; j < largo; j++) x[i0 + j] += Math.sin((2 * Math.PI * f * j) / sr) * amp * Math.exp(-j / (largo / 5));
      }
      const src = ctx.createBufferSource(); src.buffer = b; src.loop = true; src.start();
      const vol = g(0); cadena(src, filtro('highpass', 700, 0.7), vol, dest);
      return { fijar(v) { suave(vol.gain, v); } };
    }
    function agua(dest) {
      const lp = filtro('lowpass', 480, 0.6), am = g(0.75), lfo = osc('sine', 0.16), prof = g(0.25), vol = g(0);
      lfo.connect(prof); prof.connect(am.gain); lfo.start();
      cadena(lazo(MARRON), lp, am);
      cadena(lazo(ROSA), filtro('bandpass', 1800, 0.8), g(0.05), am);
      cadena(am, vol, dest);
      return { fijar(v) { suave(vol.gain, v); } };
    }
    function cinta(dest) {
      const seg = 0.8, n = Math.floor(sr * seg), b = ctx.createBuffer(1, n, sr), x = b.getChannelData(0);
      for (let i = 0; i < n; i++) { const t = i / sr; x[i] = 0.08 * Math.sin(2 * Math.PI * 100 * t) + 0.03 * Math.sin(2 * Math.PI * 200 * t); }
      const paso = Math.floor(n / 6), largo = Math.floor(sr * 0.03);
      for (let k = 0; k < 6; k++) for (let j = 0; j < largo; j++) x[k * paso + j] += (Math.random() * 2 - 1) * (k % 2 ? 0.3 : 0.45) * Math.exp(-j / (largo / 6));
      const src = ctx.createBufferSource(); src.buffer = b; src.loop = true; src.start();
      const vol = g(0); cadena(src, filtro('lowpass', 5000, 0.7), vol, dest);
      return { fijar(v) { suave(vol.gain, v); } };
    }
    return { ef, motor, viento, brasas, agua, cinta };
  }

  // ---------------------------------------------------------------- música
  // Shuffle a 148 bpm en mi: blues de 12 compases con contrabajo, batería con escobillas,
  // guitara con trémolo (Karplus-Strong) y unos vientos. Una vuelta sin punteo, otra con punteo.
  function musica(ctx, P, dest, eco) {
    const { g, filtro, osc, cadena, env, BLANCO, tramo, hz, sr } = P;
    const NEGRA = 60 / 148, COMPAS = 4 * NEGRA, SW = (NEGRA * 2) / 3;
    const ACORDES = [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 7];
    const LICKS = { a: [64, 67, 68, 71, 73, 71, 68, 64], b: [71, 0, 68, 0, 64, 67, 68, 0], vuelta: [71, 69, 66, 63, 59, 0, 0, 0] };
    const PLAN = { 0: ['a', 0], 2: ['b', 0], 4: ['a', 5], 6: ['b', 0], 8: ['a', 7], 9: ['b', 5], 10: ['a', 0], 11: ['vuelta', 0] };
    const gtr = g(1), trem = g(0.8), lfo = osc('sine', 5.8), prof = g(0.2), brillo = filtro('peaking', 2600, 1), envio = g(0.45);
    brillo.gain.value = 4; lfo.connect(prof); prof.connect(trem.gain); lfo.start();
    cadena(gtr, brillo, trem, dest); trem.connect(envio); envio.connect(eco);
    const cuerdas = new Map();
    function cuerda(m, br, caida, seg) {
      const k = `${m}|${br}|${caida}`;
      if (cuerdas.has(k)) return cuerdas.get(k);
      const f = hz(m), N = Math.max(2, Math.round(sr / f)), n = Math.floor(sr * seg), b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0), y = new Float32Array(N);
      let lp = 0, pico = 0;
      for (let i = 0; i < N; i++) { lp += br * (Math.random() * 2 - 1 - lp); y[i] = lp; }
      for (let i = 0; i < n; i++) { const p = i % N; d[i] = y[p]; y[p] = caida * 0.5 * (y[p] + y[(p + 1) % N]); pico = Math.max(pico, Math.abs(d[i])); }
      const fade = Math.min(n, Math.floor(sr * 0.04));
      for (let i = 0; i < n; i++) d[i] = (d[i] / (pico || 1)) * 0.8 * (i > n - fade ? (n - i) / fade : 1);
      const c = { b, rate: (f * N) / sr };
      cuerdas.set(k, c);
      return c;
    }
    function pulsar(t, m, vol, br, caida, seg) {
      const c = cuerda(m, br, caida, seg), s = ctx.createBufferSource();
      s.buffer = c.b; s.playbackRate.value = c.rate; cadena(s, g(vol), gtr); s.start(t);
    }
    function bajo(t, m, slap) {
      const f = hz(m), o = osc('triangle', f), o2 = osc('sine', f), lp = filtro('lowpass', 1300, 0.8), e = g();
      lp.frequency.setValueAtTime(1300, t); lp.frequency.exponentialRampToValueAtTime(320, t + 0.2);
      env(e, t, 0.005, 0.42, NEGRA * 0.95);
      o.connect(lp); o2.connect(lp); cadena(lp, e, dest);
      [o, o2].forEach((s) => { s.start(t); s.stop(t + NEGRA + 0.05); });
      if (slap) { const bp = filtro('bandpass', 2200, 1.2), e2 = g(); env(e2, t, 0.001, 0.15, 0.025); cadena(tramo(BLANCO, t, 0.04), bp, e2, dest); }
    }
    function bombo(t) {
      const o = osc('sine', 130), e = g(); o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(44, t + 0.11);
      env(e, t, 0.003, 0.5, 0.24); cadena(o, e, dest); o.start(t); o.stop(t + 0.3);
    }
    function caja(t) {
      const bp = filtro('bandpass', 1900, 0.6), e = g(); env(e, t, 0.002, 0.19, 0.13); cadena(tramo(BLANCO, t, 0.2), bp, e, dest);
      const o = osc('triangle', 190), e2 = g(); env(e2, t, 0.002, 0.1, 0.06); cadena(o, e2, dest); o.start(t); o.stop(t + 0.1);
    }
    function platillo(t, v) {
      const hp = filtro('highpass', 7200, 0.7), e = g(); env(e, t, 0.001, v, 0.035); cadena(tramo(BLANCO, t, 0.06), hp, e, dest);
    }
    function vientos(t, notas, dur, vol) {
      notas.forEach((m) => [-6, 6].forEach((det) => {
        const o = osc('sawtooth', hz(m)), lp = filtro('lowpass', 380, 1.4), e = g();
        o.detune.value = det;
        lp.frequency.setValueAtTime(380, t); lp.frequency.exponentialRampToValueAtTime(1700, t + 0.06); lp.frequency.exponentialRampToValueAtTime(800, t + dur);
        e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(vol, t + 0.05); e.gain.setValueAtTime(vol, t + dur); e.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.2);
        cadena(o, lp, e, dest); o.start(t); o.stop(t + dur + 0.25);
      }));
    }
    function compas(i, t, conPunteo) {
      const R = ACORDES[i];
      (i % 2 ? [10, 9, 7, 4] : [0, 4, 7, 9]).forEach((iv, k) => bajo(t + k * NEGRA, 40 + R + iv, k % 2 === 1));
      for (let k = 0; k < 4; k++) {
        const tb = t + k * NEGRA;
        if (k % 2 === 0) bombo(tb); else caja(tb);
        platillo(tb, k === 0 ? 0.06 : 0.045); platillo(tb + SW, 0.03);
        pulsar(tb + SW, 52 + R, 0.1, 0.3, 0.97, 0.22); pulsar(tb + SW + 0.008, 59 + R, 0.08, 0.3, 0.97, 0.22);
      }
      if (i === 1 || i === 3 || i === 5 || i === 7 || i === 9) vientos(t, [56 + R, 62 + R], NEGRA * 1.4, 0.05);
      if (i === 11) vientos(t, [56 + R, 62 + R], COMPAS * 0.92, 0.04);
      if (conPunteo && PLAN[i]) {
        const [nombre, tr] = PLAN[i];
        LICKS[nombre].forEach((m, k) => { if (m) pulsar(t + Math.floor(k / 2) * NEGRA + (k % 2 ? SW : 0), m + tr, 0.2, 0.65, 0.996, 0.9); });
      }
    }
    let tSig = 0, n = 0, reloj = null;
    function programar() {
      const hasta = ctx.currentTime + 0.3;
      while (tSig < hasta) { compas(n % 12, tSig, Math.floor(n / 12) % 2 === 1); tSig += COMPAS; n++; }
    }
    return {
      seguir() {
        if (tSig < ctx.currentTime + 0.05) tSig = ctx.currentTime + 0.08;
        if (!reloj) { reloj = setInterval(programar, 60); programar(); }
      },
      pausa() { clearInterval(reloj); reloj = null; },
      // para la prueba offline: programa `compases` compases desde t
      renderizar(t, compases) { tSig = t; n = 0; while (n < compases) { compas(n % 12, tSig, Math.floor(n / 12) % 2 === 1); tSig += COMPAS; n++; } },
    };
  }

  // ---------------------------------------------------------------- mezcla y sincronía con el scroll
  function crear(ctx) {
    const P = piezas(ctx), { g, filtro, suave } = P;
    const salida = g(0), comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 10; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.2;
    salida.connect(comp); comp.connect(ctx.destination);
    const eco = ctx.createConvolver(), vueltaEco = g(0.8);
    eco.buffer = P.impulso(2.6, 3.2); eco.connect(vueltaEco); vueltaEco.connect(salida);
    const bus = (v, envio) => { const n = g(v); n.connect(salida); const e = g(envio); n.connect(e); e.connect(eco); return n; };
    // música: entrada → bajada para los golpes → paso bajo (pista 18) → volumen
    const mDuck = g(1), mLP = filtro('lowpass', 18000, 0.5), mVol = g(0.5), mEco = g(0.12);
    mDuck.connect(mLP); mLP.connect(mVol); mVol.connect(salida); mVol.connect(mEco); mEco.connect(eco);
    const busGolpes = bus(0.85, 0.2), busAmb = bus(0.65, 0.08);
    const S = sonidos(ctx, P), M = musica(ctx, P, mDuck, eco);
    let amb = null;
    const depurar = /[?&]audio-debug\b/.test(location.search);
    if (depurar) window.__cabina = { log: [], ctx };

    // geometría de las escenas, medida como la de las animaciones (rangos cover, contain, entry, exit)
    const ESCENAS = ['.s1', '.s3', '.trk', '.s4', '.s5', '.s-am', '.s6', '.s7'];
    let alto = 0, maxY = 0, pos = {}, sucio = true;
    const caja = {};
    function rango(sel, nombre, p) {
      const c = caja[sel]; if (!c) return Infinity;
      const T = c.T, H = c.H, c0 = Math.min(T, T + H - alto), c1 = Math.max(T, T + H - alto);
      let a, b;
      if (nombre === 'contain') { a = c0; b = c1; } else if (nombre === 'entry') { a = T - alto; b = c0; }
      else if (nombre === 'exit') { a = c1; b = T + H; } else { a = T - alto; b = T + H; }
      return a + (b - a) * p;
    }
    const entre = (a, b, p) => a + (b - a) * p;
    function medir() {
      const y = window.pageYOffset, raiz = document.scrollingElement || document.documentElement;
      alto = window.innerHeight; maxY = Math.max(0, raiz.scrollHeight - alto);
      ESCENAS.forEach((sel) => { const el = document.querySelector(sel); if (el) { const r = el.getBoundingClientRect(); caja[sel] = { T: r.top + y, H: r.height }; } });
      pos = {
        vuelo0: rango('.s1', 'contain', 0.05), vuelo1: rango('.s1', 'contain', 0.2),
        pasadaA: rango('.s1', 'contain', 0.22), pasadaB: rango('.s1', 'contain', 0.46),
        sello: rango('.s3', 'entry', 0.795),
        aprox0: rango('.trk', 'contain', 0), viento1: rango('.trk', 'contain', 0.85), ruedas: rango('.trk', 'contain', 0.965),
        ralenti0: rango('.s5', 'entry', 0), ralenti1: rango('.s5', 'entry', 0.5),
        brasas0: rango('.s5', 'cover', 0.12), brasas1: rango('.s5', 'cover', 0.28), brasas2: rango('.s5', 'cover', 0.72), brasas3: rango('.s5', 'cover', 0.9),
        ding: entre(rango('.s5', 'entry', 0.6), rango('.s5', 'cover', 0.36), 0.11),
        bandeja: entre(rango('.s5', 'entry', 0.7), rango('.s5', 'cover', 0.4), 0.7),
        agua0: rango('.s-am', 'contain', 0), agua1: rango('.s-am', 'contain', 0.06), agua2: rango('.s-am', 'contain', 0.94), agua3: rango('.s-am', 'exit', 0.3),
        chapuzon: rango('.s-am', 'contain', 0.302), sello2: rango('.s-am', 'contain', 0.346),
        cinta0: rango('.s6', 'entry', 0.02), cinta1: rango('.s6', 'entry', 0.12), cinta2: rango('.s6', 'entry', 0.72), cinta3: rango('.s6', 'entry', 0.78),
        // la cinta frena cuando llega la conservadora (llega: 86 % de entry 0-90 %) y recién ahí cruje la tapa
        frena: rango('.s6', 'entry', 0.774), tapa: rango('.s6', 'cover', 0.38), hielo: rango('.s6', 'cover', 0.49), botellas: rango('.s6', 'cover', 0.5),
        fin0: rango('.s7', 'entry', 0.1), fin1: maxY,
      };
      if (depurar) window.__cabina.pos = pos;
      sucio = false;
    }
    // golpes: [posición, efecto, cuánto baja la música]
    const GOLPES = [['pasadaA', 'pasada', 0], ['pasadaB', 'pasada', 0], ['sello', 'sello', 0.55], ['ruedas', 'ruedas', 0.5],
      ['ding', 'ding', 0.25], ['bandeja', 'bandeja', 0.15], ['chapuzon', 'chapuzon', 0.5], ['sello2', 'sello', 0.45],
      ['frena', 'frena', 0.1], ['tapa', 'tapa', 0.2], ['hielo', 'hielo', 0], ['botellas', 'botellas', 0.2]]
      .map(([clave, efecto, duck]) => ({ clave, efecto, duck, armado: true, ultimo: -1e9 }));
    function bajarMusica(prof) {
      if (!prof) return;
      const t = ctx.currentTime, p = mDuck.gain;
      p.cancelScheduledValues(t); p.setValueAtTime(p.value, t);
      p.setTargetAtTime(1 - prof, t, 0.02); p.setTargetAtTime(1, t + 0.3, 0.35);
    }
    function tocar(efecto, duck, cuando = ctx.currentTime + 0.01) {
      S.ef[efecto](busGolpes, cuando);
      bajarMusica(duck);
    }
    const r = (y, a, b) => (b <= a ? (y >= b ? 1 : 0) : Math.min(1, Math.max(0, (y - a) / (b - a))));
    let yPrev = null, ultimoGolpe = 0;
    function mezclar(y) {
      const vuelo = r(y, pos.vuelo0, pos.vuelo1), aprox = r(y, pos.aprox0, pos.ruedas), tierra = y >= pos.ruedas;
      // volúmenes medidos offline para que los ambientes queden unos 6 dB debajo de la música
      amb.motor.fijar(tierra ? 26 : 46 - 14 * aprox, vuelo * (tierra ? 0.1 * (1 - r(y, pos.ralenti0, pos.ralenti1)) : 0.16 - 0.04 * aprox));
      amb.viento.fijar(0.22 * vuelo * (1 - r(y, pos.aprox0, pos.viento1)));
      amb.brasas.fijar(0.6 * r(y, pos.brasas0, pos.brasas1) * (1 - r(y, pos.brasas2, pos.brasas3)));
      amb.agua.fijar(0.22 * r(y, pos.agua0, pos.agua1) * (1 - r(y, pos.agua2, pos.agua3)));
      amb.cinta.fijar(0.4 * r(y, pos.cinta0, pos.cinta1) * (1 - r(y, pos.cinta2, pos.cinta3)));
      // pista 18: la música baja y se apaga de agudos, como una radio que se aleja
      const fin = r(y, pos.fin0, pos.fin1);
      suave(mLP.frequency, 18000 * Math.pow(900 / 18000, fin), 0.3);
      suave(mVol.gain, 0.5 * (1 - 0.7 * fin), 0.3);
      // golpes: una vez al pasar bajando; saltos grandes (anclas, restauración del scroll) no suenan
      const t = ctx.currentTime;
      if (yPrev === null) yPrev = y;
      const salto = Math.abs(y - yPrev) > 1.3 * alto;
      GOLPES.forEach((c) => {
        const cy = pos[c.clave];
        if (!c.armado && y < cy - 0.8 * alto && t - c.ultimo > 6) c.armado = true;
        if (c.armado && yPrev < cy && y >= cy) {
          c.armado = false; c.ultimo = t;
          // golpes muy seguidos (o un scroll rápido) se escalonan en vez de pisarse
          const cuando = Math.max(t + 0.01, ultimoGolpe + 0.12);
          if (!salto) { ultimoGolpe = cuando; tocar(c.efecto, c.duck, cuando); }
          if (depurar) window.__cabina.log.push({ golpe: c.clave, y: Math.round(y), en: Math.round(cy), ...(salto ? { omitido: 'salto' } : {}) });
        }
      });
      yPrev = y;
    }

    let encendido = false, pendiente = false, ro = null, avisado = false;
    function cuadro() {
      pendiente = false;
      if (!encendido) return;
      if (sucio) medir();
      mezclar(window.pageYOffset);
    }
    const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(cuadro); } };
    const invalidar = () => { sucio = true; pedir(); };
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', invalidar, { passive: true });
    if (window.ResizeObserver) { ro = new ResizeObserver(invalidar); ro.observe(document.body); }
    document.addEventListener('visibilitychange', () => {
      if (!encendido) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    });
    // la notificación del final suena cuando aparece el aviso
    const sistema = document.querySelector('.sistema');
    if (sistema && window.MutationObserver) {
      new MutationObserver(() => {
        const on = sistema.hasAttribute('data-on');
        if (on && !avisado) {
          avisado = true;
          if (encendido) { tocar('notificacion', 0.3); if (depurar) window.__cabina.log.push({ golpe: 'notificacion', y: Math.round(window.pageYOffset) }); }
        }
        if (!on) avisado = false;
      }).observe(sistema, { attributes: true, attributeFilter: ['data-on'] });
    }

    return {
      encender() {
        if (encendido) return;
        encendido = true;
        if (ctx.state !== 'running') ctx.resume();
        if (!amb) amb = { motor: S.motor(busAmb), viento: S.viento(busAmb), brasas: S.brasas(busAmb), agua: S.agua(busAmb), cinta: S.cinta(busAmb) };
        M.seguir();
        yPrev = null; invalidar();
        const t = ctx.currentTime;
        salida.gain.cancelScheduledValues(t); salida.gain.setValueAtTime(salida.gain.value, t); salida.gain.setTargetAtTime(1, t, 0.25);
        if (depurar) window.__cabina.estado = 'encendido';
      },
      apagar() {
        if (!encendido) return;
        encendido = false;
        const t = ctx.currentTime;
        salida.gain.cancelScheduledValues(t); salida.gain.setValueAtTime(salida.gain.value, t); salida.gain.setTargetAtTime(0, t, 0.1);
        setTimeout(() => { if (!encendido) { M.pausa(); ctx.suspend(); } }, 600);
        if (depurar) window.__cabina.estado = 'apagado';
      },
    };
  }

  // para la prueba offline (tools/audio/prueba-audio.mjs): efectos y música sobre cualquier contexto
  function banco(ctx) {
    const P = piezas(ctx), eco = ctx.createConvolver(), vuelta = P.g(0.8);
    eco.buffer = P.impulso(2.6, 3.2); eco.connect(vuelta); vuelta.connect(ctx.destination);
    const S = sonidos(ctx, P);
    return { P, S, eco, musica: (dest) => musica(ctx, P, dest, eco) };
  }

  window.Cabina36 = { crear, banco };
})();
