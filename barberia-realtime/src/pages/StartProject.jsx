// src/pages/StartProject.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const WA_NUMBER = '573117100880';

export default function StartProject() {
  const [form, setForm] = useState({ name: '', company: '', whatsapp: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Requerido';
    if (!form.company.trim()) e.company = 'Requerido';
    if (!form.whatsapp.trim()) e.whatsapp = 'Requerido';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const msg = encodeURIComponent(
      `Hola! Soy ${form.name} de ${form.company}. Me interesa conocer cómo JJ TECH puede transformar mi operación.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    setSent(true);
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? '#ff5555' : 'var(--border)'}`,
    borderRadius: 10,
    padding: '0.85rem 1rem',
    color: 'var(--text)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
    }}>
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            style={{ width: '100%', maxWidth: 480 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Sin compromisos · Solo resultados
            </p>
            <h1 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '0.75rem' }}>
              ¿Listo para<br />
              <span style={{ color: 'var(--primary)' }}>transformar su empresa?</span>
            </h1>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Una reunión de 30 minutos es suficiente para identificar dónde su empresa pierde dinero hoy y cómo recuperarlo.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Su Nombre
                </label>
                <input
                  id="start-name"
                  type="text"
                  placeholder="Juan García"
                  value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                  style={inputStyle('name')}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = errors.name ? '#ff5555' : 'var(--border)'}
                  aria-label="Su nombre"
                />
                {errors.name && <p style={{ color: '#ff5555', fontSize: '0.7rem', marginTop: '0.25rem' }}>{errors.name}</p>}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Empresa
                </label>
                <input
                  id="start-company"
                  type="text"
                  placeholder="Mi Empresa S.A.S."
                  value={form.company}
                  onChange={e => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: '' }); }}
                  style={inputStyle('company')}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = errors.company ? '#ff5555' : 'var(--border)'}
                  aria-label="Nombre de su empresa"
                />
                {errors.company && <p style={{ color: '#ff5555', fontSize: '0.7rem', marginTop: '0.25rem' }}>{errors.company}</p>}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  WhatsApp
                </label>
                <input
                  id="start-whatsapp"
                  type="tel"
                  placeholder="+57 300 000 0000"
                  value={form.whatsapp}
                  onChange={e => { setForm({ ...form, whatsapp: e.target.value }); setErrors({ ...errors, whatsapp: '' }); }}
                  style={inputStyle('whatsapp')}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = errors.whatsapp ? '#ff5555' : 'var(--border)'}
                  aria-label="Número de WhatsApp"
                />
                {errors.whatsapp && <p style={{ color: '#ff5555', fontSize: '0.7rem', marginTop: '0.25rem' }}>{errors.whatsapp}</p>}
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '1rem', marginTop: '0.5rem' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Agendar Reunión Gratuita →
              </motion.button>
            </form>

            <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.7rem', textAlign: 'center' }}>
              Sin compromisos. La reunión es gratuita y sin presión.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            style={{ textAlign: 'center', maxWidth: 400 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle2 size={36} color="var(--accent)" />
            </motion.div>
            <h2 className="font-heading" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>
              ¡Listo!
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Su mensaje fue enviado a WhatsApp. Nos pondremos en contacto con usted en las próximas horas para coordinar la reunión.
            </p>
            <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: '', company: '', whatsapp: '' }); }}>
              Enviar otra consulta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
