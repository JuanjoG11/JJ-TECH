// src/pages/EnterprisePlatform.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart2, RefreshCw, Truck, Users, Bot, ShoppingCart } from 'lucide-react';

const modules = [
  {
    id: 'bi',
    icon: BarChart2,
    title: 'Business Intelligence',
    desc: 'Dashboards ejecutivos con datos consolidados en tiempo real. Elimine los reportes manuales.',
    stat: '80% menos tiempo de análisis',
    color: '#7b61ff',
  },
  {
    id: 'returns',
    icon: RefreshCw,
    title: 'Control de Devoluciones',
    desc: 'Trazabilidad completa del proceso de devolución. Identifique causas raíz y reduzca la recurrencia.',
    stat: '32% menos devoluciones',
    color: '#1a6cff',
  },
  {
    id: 'freight',
    icon: Truck,
    title: 'Control de Fletes',
    desc: 'Gestión financiera de transportes en tiempo real. Elimine las planillas manuales de validación.',
    stat: '85% menos errores operativos',
    color: '#00d4ff',
  },
  {
    id: 'crm',
    icon: Users,
    title: 'Gestión Comercial CRM',
    desc: 'Seguimiento 360° de clientes, oportunidades y productividad del equipo comercial.',
    stat: '+40% productividad',
    color: '#1a6cff',
  },
  {
    id: 'automation',
    icon: Bot,
    title: 'Automatización con IA',
    desc: 'Flujos de trabajo inteligentes que eliminan procesos manuales repetitivos y reducen costos.',
    stat: '60% reducción de costo operativo',
    color: '#00d4ff',
  },
  {
    id: 'inventory',
    icon: ShoppingCart,
    title: 'Control de Inventario',
    desc: 'Trazabilidad total del stock, alertas automatizadas y sincronización con operaciones.',
    stat: 'Cero pérdidas por descuadres',
    color: '#7b61ff',
  },
];

export default function EnterprisePlatform() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 3rem 3rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Suite Empresarial
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '0.75rem' }}>
          Una plataforma.<br />
          <span style={{ color: 'var(--primary)' }}>Control total.</span>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 520, lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Cada módulo resuelve un problema real de su operación. Todos integrados en un sistema que crece con su empresa.
        </p>
      </motion.div>

      {/* OS-like panel grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          const isActive = active === mod.id;
          return (
            <motion.div
              key={mod.id}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                borderColor: isActive ? mod.color : 'var(--border)',
                borderWidth: isActive ? 1.5 : 1,
                transition: 'border-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(isActive ? null : mod.id)}
            >
              {/* Glow bg accent */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 120, height: 120,
                background: `radial-gradient(circle at top right, ${mod.color}18, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Status indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${mod.color}18`,
                  border: `1px solid ${mod.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={mod.color} />
                </div>
                <div style={{
                  fontSize: '0.6rem', color: '#22cc88', letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontWeight: 600,
                  background: 'rgba(34,204,136,0.1)', padding: '0.2rem 0.6rem',
                  borderRadius: 20, border: '1px solid rgba(34,204,136,0.2)',
                }}>
                  Activo
                </div>
              </div>

              <h3 className="font-heading" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {mod.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '1rem' }}>
                {mod.desc}
              </p>

              {/* Metric pill */}
              <div style={{
                display: 'inline-block',
                background: `${mod.color}15`,
                border: `1px solid ${mod.color}40`,
                borderRadius: 20,
                padding: '0.25rem 0.75rem',
                fontSize: '0.7rem',
                color: mod.color,
                fontWeight: 600,
              }}>
                {mod.stat}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div style={{ marginTop: '2.5rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <button className="btn-primary" onClick={() => navigate('/iniciar')}>
          Construir mi Plataforma →
        </button>
      </motion.div>
    </div>
  );
}
