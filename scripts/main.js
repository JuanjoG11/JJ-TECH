window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    initStats();
  }, 3500); // Dramatic entrance
});

/* =========================================
   CUSTOM CURSOR
   ========================================= */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouse = { x: 0, y: 0 };
let follow = { x: 0, y: 0 };

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  cursor.style.left = mouse.x + 'px';
  cursor.style.top = mouse.y + 'px';
});

function animateCursor() {
  const speed = 0.12;
  follow.x += (mouse.x - follow.x) * speed;
  follow.y += (mouse.y - follow.y) * speed;
  follower.style.left = follow.x + 'px';
  follower.style.top = follow.y + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  follower.style.opacity = '1';
});

/* =========================================
   NAVBAR
   ========================================= */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNavLink();
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

/* =========================================
   PARTICLES CANVAS
   ========================================= */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H, animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#7c3aed' : '#06b6d4';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / maxDist) * 0.15;
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animId = requestAnimationFrame(animate);
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    particles = Array.from({ length: count }, () => new Particle());
    if (animId) cancelAnimationFrame(animId);
    animate();
  }

  const ro = new ResizeObserver(init);
  ro.observe(canvas.parentElement);
  init();
})();

/* =========================================
   SCROLL REVEAL
   ========================================= */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index in parent
      const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => observer.observe(el));

/* =========================================
   ANIMATED COUNTERS
   ========================================= */
function initStats() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start) + suffix;
          }
        }, 16);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObserver.observe(el));
}

/* =========================================
   DEMO — OS Holographic Modal
   ========================================= */
const openDemo = (url, title, isPrivate = false) => {
  const modal = document.getElementById('demoModal');
  const iframe = document.getElementById('demoIframe');
  const modalTitle = document.getElementById('demoTitle');
  const loading = document.getElementById('demoLoading');

  // Título en español, sin jargon técnico
  if (modalTitle) modalTitle.textContent = `Viendo: ${title}`;

  // Reset loading state
  if (loading) loading.classList.remove('hidden');

  // Auto-login or demo access if private
  let finalUrl = url;
  if (isPrivate) {
    const connector = url.includes('?') ? '&' : '?';
    finalUrl = `${url}${connector}demo_access=guest&bypass_login=true`;
  }

  // Store URL for fallback
  modal.dataset.currentUrl = finalUrl;

  iframe.src = finalUrl;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Hide loading state once iframe loads
  iframe.onload = () => {
    if (loading) loading.classList.add('hidden');
  };
};

function closeDemo() {
  demoModal.classList.remove('open');
  document.body.style.overflow = '';
  // Clear iframe source to stop background processes (e.g. videos/audio in demo)
  setTimeout(() => {
    demoIframe.src = '';
  }, 300);
}

// Make global
window.openDemo = openDemo;
window.closeDemo = closeDemo;

/* =========================================
   COMING SOON TOAST
   ========================================= */
function showComingsoon() {
  showToast('🔒 Este proyecto es privado. ¡Solicita una demo personalizada!');
}
window.showComingsoon = showComingsoon;

/* =========================================
   TOAST NOTIFICATION
   ========================================= */
function showToast(message, duration = 4000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
window.showToast = showToast;

/* =========================================
   QUOTE FORM — WhatsApp Integration
   ========================================= */
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('q-name').value.trim();
    const business = document.getElementById('q-business').value.trim();
    const phone = document.getElementById('q-phone').value.trim();
    const service = document.getElementById('q-service').value;
    const desc = document.getElementById('q-desc').value.trim();
    const budget = document.getElementById('q-budget').value;

    // Validation
    if (!name || !phone || !service || !desc) {
      showToast('⚠️ Por favor, llena los campos obligatorios.');
      return;
    }

    // Build WhatsApp message
    const msg = [
      `👋 *Hola JJ TECH! Vengo de su portafolio*`,
      ``,
      `👤 *Nombre:* ${name}`,
      business ? `🏢 *Negocio:* ${business}` : null,
      `📱 *Teléfono:* ${phone}`,
      ``,
      `🎯 *Servicio de interés:*`,
      `${service}`,
      ``,
      `📋 *Descripción del proyecto:*`,
      desc,
      budget ? `\n💰 *Presupuesto aproximado:* ${budget}` : null,
      ``,
      `_Enviado desde jjtech.dev_`
    ].filter(Boolean).join('\n');

    const waNumber = '573171008880';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

    // Submit feedback
    const btn = document.getElementById('submitQuote');
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Abriendo WhatsApp...';
    btn.disabled = true;

    showToast('✅ Formulario enviado. Abriendo WhatsApp...');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      quoteForm.reset();
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar por WhatsApp';
      btn.disabled = false;
    }, 800);
  });
}

/* =========================================
   SMOOTH SCROLL for anchor links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =========================================
   PROJECT CARDS — hover tilt effect
   ========================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
