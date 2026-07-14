/* =========================================
   JJ TECH – main.js
   ========================================= */

/* ── Intro Splash Animation ── */
(function () {
  const splash = document.getElementById('intro-splash');
  if (!splash) return;

  // Block scroll while splash is visible
  document.body.style.overflow = 'hidden';

  const letters = Array.from(document.querySelectorAll('.il:not(.intro-space)'));
  const sub     = document.getElementById('intro-sub');
  const bar     = document.getElementById('intro-bar');
  const fill    = bar ? bar.querySelector('.intro-bar-fill') : null;

  // Characters to cycle through during glitch scramble
  const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  function glitchLetter(el, finalChar, resolve) {
    let count = 0;
    const max = 6;
    const iv = setInterval(() => {
      el.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      count++;
      if (count >= max) {
        clearInterval(iv);
        el.textContent = finalChar;
        resolve();
      }
    }, 40);
  }

  function dropLetter(el, index) {
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.add('landed');
        el.classList.add('glow');

        // Glitch scramble effect
        const orig = el.dataset.char;
        glitchLetter(el, orig, () => {
          setTimeout(() => {
            el.classList.remove('glow');
            el.classList.add('settle');
            resolve();
          }, 80);
        });
      }, index * 90);
    });
  }

  async function runIntro() {
    // Small delay so fonts are loaded
    await new Promise(r => setTimeout(r, 150));

    // Drop letters one by one
    const drops = letters.map((el, i) => dropLetter(el, i));
    await Promise.all(drops);

    // Apply gradient to TECH letters (indices 2,3,4,5 → T E C H)
    letters.slice(2).forEach(el => el.classList.add('gradient-letter'));

    // Show subtitle + progress bar
    await new Promise(r => setTimeout(r, 150));
    if (sub) sub.classList.add('show');
    if (bar) bar.classList.add('show');
    if (fill) setTimeout(() => { fill.style.width = '100%'; }, 50);

    // Wait for bar to fill, then dismiss
    await new Promise(r => setTimeout(r, 1400));

    splash.classList.add('hide');
    document.body.style.overflow = '';

    // Remove from DOM after transition
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  }

  runIntro();
})();

/* ── Projects Data ── */
const projects = [
  {
    id: 'zentra', name: 'Zentra Core ERP', type: 'Dashboard Ejecutivo',
    desc: 'Dashboard corporativo integrado con facturación electrónica y analítica en tiempo real.',
    metric: 'Real-time', metricLabel: 'Decisiones en Vivo',
    url: 'https://zentra.tiendasymarcaseje.com/',
    x: 450, y: 260, isCore: true
  },
  {
    id: 'tennisymas', name: 'Tennis Y Más', type: 'E-Commerce Retail',
    desc: 'Tienda deportiva con pasarela de pagos, catálogo en vivo y gestión de pedidos automatizada.',
    metric: '+340%', metricLabel: 'Ventas Online',
    url: 'https://tennisymas.com/', x: 450, y: 80
  },
  {
    id: 'mgnails', name: 'MG Nails París', type: 'SaaS Internacional',
    desc: 'Sistema de reservas, control de personal y finanzas para spa operando en París, Francia.',
    metric: '🇫🇷', metricLabel: 'Operando en París',
    url: 'https://mgnailsparis.vercel.app/', x: 230, y: 120
  },
  {
    id: 'fletes', name: 'App Fletes', type: 'Logística',
    desc: 'Cálculo automático de tarifas, asignación de rutas y trazabilidad de despachos en tiempo real.',
    metric: '100%', metricLabel: 'Rutas Trazadas',
    url: 'https://fletes.tiendasymarcaseje.com/', x: 250, y: 280
  },
  {
    id: 'inventario', name: 'Inventario POS', type: 'ERP & POS Cloud',
    desc: 'Punto de venta y control de existencias sincronizados en la nube. Cero pérdidas de stock.',
    metric: 'Cero', metricLabel: 'Pérdidas de Stock',
    url: 'https://inventario.tennisymas.com/', x: 190, y: 390
  },
  {
    id: 'shoppic', name: 'Shoppic', type: 'E-Commerce Multicanal',
    desc: 'Retail multicanal conectado a bodega y envíos nacionales con stock siempre sincronizado.',
    metric: 'Sync', metricLabel: 'Control de Stock',
    url: 'https://shoppicvariedades.vercel.app/', x: 385, y: 430
  },
  {
    id: 'agenda', name: 'Agenda Spa', type: 'SaaS Agendamiento',
    desc: 'Agendamiento automático 24/7. Los clientes reservan sin llamadas, el negocio fluye solo.',
    metric: '+500', metricLabel: 'Citas al Mes',
    url: 'https://agendaaspa.vercel.app/', x: 565, y: 390
  },
  {
    id: 'rpm', name: 'Virtual RPM', type: 'Catálogo Interactivo',
    desc: 'Catálogo automotriz de alto rendimiento con carga instantánea y diseño premium.',
    metric: '< 1s', metricLabel: 'Tiempo de Carga',
    url: 'https://virtualrpm.vercel.app/', x: 710, y: 280
  },
  {
    id: 'barber', name: 'Brother Hood', type: 'Agendamiento Premium',
    desc: 'Landing page y sistema de citas en tiempo real para barbería premium con panel de barbero.',
    metric: 'Live', metricLabel: 'Agendamiento',
    url: 'https://luxurybrother.vercel.app/', x: 670, y: 120
  },
  {
    id: 'ajbrotech', name: 'AJ BroTechs', type: 'E-Commerce Tech',
    desc: 'Tienda de accesorios Apple-compatible con carrito, pago contra entrega y envíos a todo Colombia.',
    metric: '4.9★', metricLabel: 'Calificación clientes',
    url: 'https://ajbrotechs.vercel.app/', x: 590, y: 180
  }
];

const connections = [
  { from: 'zentra', to: 'tennisymas' }, { from: 'zentra', to: 'mgnails' },
  { from: 'zentra', to: 'fletes' }, { from: 'zentra', to: 'inventario' },
  { from: 'zentra', to: 'shoppic' }, { from: 'zentra', to: 'agenda' },
  { from: 'zentra', to: 'rpm' }, { from: 'zentra', to: 'barber' },
  { from: 'zentra', to: 'ajbrotech' },
  { from: 'mgnails', to: 'tennisymas' }, { from: 'tennisymas', to: 'barber' },
  { from: 'fletes', to: 'inventario' }, { from: 'inventario', to: 'shoppic' },
  { from: 'shoppic', to: 'agenda' }, { from: 'agenda', to: 'rpm' },
  { from: 'rpm', to: 'barber' }, { from: 'barber', to: 'mgnails' },
  { from: 'tennisymas', to: 'inventario' },
  { from: 'ajbrotech', to: 'tennisymas' }, { from: 'barber', to: 'ajbrotech' }
];

/* ── SVG Ecosystem Network ── */
function initEcosystemSVG() {
  const svg = document.getElementById('network-svg');
  if (!svg) return;

  const ns = 'http://www.w3.org/2000/svg';
  const nodeMap = Object.fromEntries(projects.map(p => [p.id, p]));

  // Draw edges
  connections.forEach((conn, idx) => {
    const A = nodeMap[conn.from], B = nodeMap[conn.to];
    if (!A || !B) return;
    const isCoreEdge = A.isCore || B.isCore;
    const pathId = `fp-${idx}`;

    // Hidden path for animateMotion
    const pathEl = document.createElementNS(ns, 'path');
    pathEl.setAttribute('id', pathId);
    pathEl.setAttribute('d', `M ${A.x} ${A.y} L ${B.x} ${B.y}`);
    pathEl.setAttribute('stroke', 'none'); pathEl.setAttribute('fill', 'none');
    svg.appendChild(pathEl);

    // Visible line
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', A.x); line.setAttribute('y1', A.y);
    line.setAttribute('x2', B.x); line.setAttribute('y2', B.y);
    line.setAttribute('class', `edge-line ${conn.from} ${conn.to}`);
    line.setAttribute('stroke', isCoreEdge ? 'rgba(26,108,255,0.25)' : 'rgba(255,255,255,0.07)');
    line.setAttribute('stroke-width', isCoreEdge ? '1.5' : '1');
    line.style.transition = 'stroke 0.3s, stroke-width 0.3s';
    svg.appendChild(line);

    // Animated particle
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('r', isCoreEdge ? '2.5' : '1.8');
    dot.setAttribute('fill', '#00d4ff');
    dot.style.filter = 'drop-shadow(0 0 4px #00d4ff)';
    const anim = document.createElementNS(ns, 'animateMotion');
    anim.setAttribute('dur', `${2.5 + Math.random() * 2.5}s`);
    anim.setAttribute('repeatCount', 'indefinite');
    const mpath = document.createElementNS(ns, 'mpath');
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);
    anim.appendChild(mpath); dot.appendChild(anim); svg.appendChild(dot);
  });

  // Draw nodes
  projects.forEach(proj => {
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', `node-group ${proj.id}`);
    g.setAttribute('transform', `translate(${proj.x},${proj.y})`);
    g.style.cursor = 'pointer';

    if (proj.isCore) {
      const ring = document.createElementNS(ns, 'circle');
      ring.setAttribute('r', '52'); ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', 'rgba(26,108,255,0.6)');
      ring.setAttribute('stroke-width', '1'); ring.setAttribute('stroke-dasharray', '4 8');
      const rot = document.createElementNS(ns, 'animateTransform');
      rot.setAttribute('attributeName', 'transform'); rot.setAttribute('type', 'rotate');
      rot.setAttribute('from', '0'); rot.setAttribute('to', '360');
      rot.setAttribute('dur', '20s'); rot.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(rot); g.appendChild(ring);
    }

    const ambient = document.createElementNS(ns, 'circle');
    ambient.setAttribute('r', proj.isCore ? '46' : '30');
    ambient.setAttribute('fill', 'none');
    ambient.setAttribute('stroke', proj.isCore ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.05)');
    ambient.setAttribute('stroke-width', '1.5');
    g.appendChild(ambient);

    const base = document.createElementNS(ns, 'circle');
    base.setAttribute('r', proj.isCore ? '38' : '24');
    base.setAttribute('fill', '#050508');
    base.setAttribute('stroke', proj.isCore ? '#1a6cff' : 'rgba(255,255,255,0.2)');
    base.setAttribute('stroke-width', proj.isCore ? '2' : '1.2');
    base.style.transition = 'fill 0.25s, stroke 0.25s, stroke-width 0.25s';
    g.appendChild(base);

    const statusDot = document.createElementNS(ns, 'circle');
    statusDot.setAttribute('cx', proj.isCore ? '26' : '16');
    statusDot.setAttribute('cy', proj.isCore ? '-26' : '-16');
    statusDot.setAttribute('r', proj.isCore ? '4' : '3');
    statusDot.setAttribute('fill', '#22cc88');
    g.appendChild(statusDot);

    const label = document.createElementNS(ns, 'text');
    label.setAttribute('text-anchor', 'middle'); label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('fill', proj.isCore ? '#00d4ff' : '#f0f0f8');
    label.setAttribute('font-size', proj.isCore ? '9.5' : '8.5');
    label.setAttribute('font-family', 'Outfit, sans-serif');
    label.setAttribute('font-weight', proj.isCore ? '800' : '600');
    label.style.pointerEvents = 'none'; label.style.userSelect = 'none';
    label.style.transition = 'fill 0.2s';
    label.textContent = proj.isCore ? 'ZENTRA ERP' : proj.name;
    g.appendChild(label);

    g.addEventListener('mouseenter', () => {
      base.setAttribute('stroke', '#00d4ff'); base.setAttribute('stroke-width', '2.5');
      base.setAttribute('fill', 'rgba(26,108,255,0.2)');
      if (!proj.isCore) label.setAttribute('fill', '#fff');
      document.querySelectorAll(`.edge-line.${proj.id}`).forEach(el => {
        el.setAttribute('stroke', '#00d4ff'); el.setAttribute('stroke-width', '2.5');
      });
      updateDrawer(proj);
    });

    g.addEventListener('mouseleave', () => {
      base.setAttribute('stroke', proj.isCore ? '#1a6cff' : 'rgba(255,255,255,0.2)');
      base.setAttribute('stroke-width', proj.isCore ? '2' : '1.2');
      base.setAttribute('fill', '#050508');
      label.setAttribute('fill', proj.isCore ? '#00d4ff' : '#f0f0f8');
      document.querySelectorAll(`.edge-line.${proj.id}`).forEach(el => {
        const core = el.classList.contains('zentra');
        el.setAttribute('stroke', core ? 'rgba(26,108,255,0.25)' : 'rgba(255,255,255,0.07)');
        el.setAttribute('stroke-width', core ? '1.5' : '1');
      });
    });

    svg.appendChild(g);
  });
}

/* ── Drawer ── */
let activeProj = projects[0];

function updateDrawer(proj) {
  activeProj = proj;
  const name = document.getElementById('proj-name');
  const type = document.getElementById('proj-type');
  const desc = document.getElementById('proj-desc');
  const metVal = document.getElementById('proj-metric');
  const metLabel = document.getElementById('proj-metric-label');
  if (name) name.textContent = proj.name;
  if (type) type.textContent = proj.type;
  if (desc) desc.textContent = proj.desc;
  if (metVal) metVal.textContent = proj.metric;
  if (metLabel) metLabel.textContent = proj.metricLabel;
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-open-demo');
  if (btn) btn.addEventListener('click', () => openDemo(activeProj.url, activeProj.name));
});

/* ── Demo Modal ── */
const BLOCKED_DOMAINS = [
  'agendaaspa.vercel.app', 'shoppicvariedades.vercel.app', 'tiendasymarcaseje.com'
];
function isBlocked(url) { return BLOCKED_DOMAINS.some(d => url.includes(d)); }

function openDemo(url, title) {
  const modal = document.getElementById('demoModal');
  const iframe = document.getElementById('demoIframe');
  const titleEl = document.getElementById('demoTitle');
  const loading = document.getElementById('demoLoading');
  const overlay = document.getElementById('demoOverlay');
  if (!modal) return;
  if (titleEl) titleEl.textContent = `Viendo: ${title}`;

  if (isBlocked(url)) {
    if (loading) {
      loading.style.display = 'flex';
      loading.style.flexDirection = 'column';
      loading.style.alignItems = 'center';
      loading.style.justifyContent = 'center';
      loading.style.padding = '3rem 2rem';
      loading.style.gap = '1rem';
      loading.innerHTML = `
        <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1a6cff,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:0.5rem">🚀</div>
        <h3 style="font-size:1.25rem;font-weight:800;color:#fff;font-family:'Outfit',sans-serif">Sistema en Vivo</h3>
        <p style="color:#7a7a90;font-size:0.875rem;line-height:1.6;text-align:center;max-width:400px">
          <strong style="color:#fff">${title}</strong> opera en producción y, por seguridad del dominio, solo es visible directamente.
        </p>
        <a href="${url}" target="_blank" rel="noopener noreferrer"
           style="display:inline-flex;align-items:center;gap:0.5rem;background:linear-gradient(135deg,#1a6cff,#00d4ff);color:#fff;padding:0.75rem 1.5rem;border-radius:12px;font-weight:700;font-size:0.875rem;text-decoration:none;margin-top:0.5rem">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir sistema en vivo
        </a>
        <button onclick="closeDemo()" style="background:transparent;border:1px solid rgba(255,255,255,0.15);color:#7a7a90;padding:0.6rem 1.5rem;border-radius:10px;cursor:pointer;font-size:0.82rem;margin-top:0.25rem">
          Cerrar
        </button>`;
    }
    iframe.src = 'about:blank';
    if (overlay) overlay.style.display = 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    return;
  }

  if (overlay) overlay.style.display = 'flex';
  iframe.src = url;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  iframe.onload = () => { if (overlay) overlay.style.display = 'none'; };
}

function closeDemo() {
  const modal = document.getElementById('demoModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    const iframe = document.getElementById('demoIframe');
    const loading = document.getElementById('demoLoading');
    if (iframe) iframe.src = 'about:blank';
    if (loading) loading.style.display = 'none';
  }, 250);
}

window.openDemo = openDemo;
window.closeDemo = closeDemo;

/* ── Animated Number Counter ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Intersection Observer for counters & cards ── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

/* ── Sticky Nav scroll effect ── */
function initNav() {
  const nav = document.getElementById('top-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(3,3,10,0.95)';
    } else {
      nav.style.background = 'rgba(3,3,10,0.8)';
    }
  }, { passive: true });
}

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  // Ecosystem SVG
  initEcosystemSVG();
  updateDrawer(projects[0]);

  // Counters
  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  // Cards fade-in
  document.querySelectorAll('.project-card, .service-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObs.observe(el);
  });

  // Nav hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        mobileNav.classList.add('open');
      } else {
        mobileNav.classList.remove('open');
      }
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Nav
  initNav();

  // Close modal on backdrop click
  const modal = document.getElementById('demoModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDemo();
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDemo();
  });

  // Preview images — fade in on load, show fallback on error
  document.querySelectorAll('.preview-img').forEach(img => {
    // Already cached/loaded
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
      return;
    }
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      const frame = img.closest('.preview-frame');
      if (!frame) return;
      // Build fallback from the onerror attr icon info
      const icon = img.getAttribute('data-icon') || 'fa-solid fa-globe';
      const label = img.getAttribute('data-label') || 'Sistema en producción';
      frame.innerHTML = `<div class="preview-fallback"><i class="${icon}"></i><span>${label}</span></div>`;
    });
  });
});
