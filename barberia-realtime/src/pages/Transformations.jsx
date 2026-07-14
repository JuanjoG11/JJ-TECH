// src/pages/Transformations.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { transformations } from '../data/transformations';

function TransformCard({ item, isSelected, onClick }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="glass-panel"
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        borderColor: isSelected ? item.color : 'var(--border)',
        borderWidth: isSelected ? 1.5 : 1,
        transition: 'border-color 0.2s',
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            Caso de Éxito
          </p>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{item.title}</h3>
        </div>
        <div style={{
          fontSize: '1.6rem',
          fontWeight: 900,
          fontFamily: 'Outfit, sans-serif',
          color: item.color,
          textAlign: 'right',
          lineHeight: 1,
        }}>
          {item.metric}
          <div style={{ fontSize: '0.6rem', color: 'var(--muted)', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {item.metricLabel}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              {/* Before */}
              <div style={{ background: 'rgba(255,50,50,0.06)', borderRadius: 12, padding: '1rem' }}>
                <div style={{ fontSize: '0.65rem', color: '#ff5555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Antes
                </div>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{item.before.icon}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{item.before.label}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {item.before.pains.map((p, i) => (
                    <li key={i} style={{ fontSize: '0.75rem', color: '#ff8888', paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✗</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              {/* After */}
              <div style={{ background: 'rgba(0,212,255,0.06)', borderRadius: 12, padding: '1rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Después
                </div>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{item.after.icon}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{item.after.label}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {item.after.gains.map((g, i) => (
                    <li key={i} style={{ fontSize: '0.75rem', color: 'var(--accent)', paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span> {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Transformations() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 3rem 3rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Casos Reales · Resultados Medibles
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '0.75rem' }}>
          Del Caos<br />
          <span style={{ color: 'var(--primary)' }}>al Control Total.</span>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 520, lineHeight: 1.6, marginBottom: '2rem' }}>
          Cada proyecto entrega retorno económico medible. Seleccione un caso para ver la transformación completa.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {transformations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <TransformCard
              item={item}
              isSelected={selected === i}
              onClick={() => setSelected(selected === i ? -1 : i)}
            />
          </motion.div>
        ))}
      </div>

      <motion.div style={{ marginTop: '2.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <button className="btn-primary" onClick={() => navigate('/iniciar')}>
          Quiero Resultados Como Estos →
        </button>
      </motion.div>
    </div>
  );
}
