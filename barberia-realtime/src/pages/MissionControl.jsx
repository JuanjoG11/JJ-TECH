// src/pages/MissionControl.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import { metrics, processes, edges } from '../data/metrics';
import { Activity, Cpu, Server, Network, Layers, AlertCircle, Database, HelpCircle } from 'lucide-react';

/* ── Live Flow Particle Network ── */
function ProcessNetwork({ activeNode, setActiveNode }) {
  const W = 900, H = 500;
  const nodeMap = Object.fromEntries(processes.map(p => [p.id, p]));

  // Live telemetry definitions for each node
  const nodeTelemetry = {
    core: { desc: 'Operations Hub - Núcleo de Integración JJ TECH.', metric: 'Cero Latencia', throughput: '1,452 req/s', db: '99.99%', status: 'NÚCLEO ACTIVO' },
    logistics: { desc: 'Automatización de despachos y asignación de rutas.', metric: '-70% tiempo validación', throughput: '425 req/s', db: '4 ms', status: 'RUTAS OPTIMIZADAS' },
    sales: { desc: 'Integración de canales y sincronización de leads.', metric: '+40% productividad comercial', throughput: '210 req/s', db: '12 ms', status: 'LEADS SINCRONIZADOS' },
    bi: { desc: 'Análisis estratégico consolidado y reportes automatizados.', metric: '80% menos tiempo análisis', throughput: '85 req/s', db: '2 ms', status: 'REPORTES AL INSTANTE' },
    inventory: { desc: 'Sincronización en tiempo real de almacén y POS.', metric: 'Cero pérdidas por descuadres', throughput: '320 req/s', db: '1 ms', status: 'STOCK ALINEADO' },
    automation: { desc: 'Orquestación de flujos y eliminación de tareas repetitivas.', metric: '60% menos costo operativo', throughput: '820 req/s', db: '3 ms', status: 'FLUJOS EJECUTANDO' },
    ai: { desc: 'Modelos predictivos y soporte inteligente 24/7.', metric: 'Decisiones basadas en datos', throughput: '150 req/s', db: '45 ms', status: 'MODELOS PREDICTIVOS OK' },
    crm: { desc: 'Seguimiento completo del cliente y ciclo de ventas.', metric: 'Trazabilidad Comercial 360°', throughput: '180 req/s', db: '8 ms', status: 'SOCKETS CONECTADOS' },
    marketing: { desc: 'Optimización de campañas y embudos automatizados.', metric: '+120% conversión leads', throughput: '95 req/s', db: '15 ms', status: 'CAMPANAS ACTIVAS' }
  };

  // Sparkline data state for real-time oscilloscope animation
  const [sparklinePoints, setSparklinePoints] = useState(Array.from({ length: 30 }, () => Math.random() * 25 + 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setSparklinePoints(prev => [...prev.slice(1), Math.random() * 25 + 5]);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const sparklinePath = sparklinePoints
    .map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${idx * 6} ${35 - val}`)
    .join(' ');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', width: '100%' }}>
      {/* Visual Canvas Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        background: 'radial-gradient(circle at center, rgba(10, 20, 40, 0.25) 0%, rgba(5, 5, 8, 0.98) 100%)',
        borderRadius: 24,
        border: '1px solid rgba(26, 108, 255, 0.2)',
        padding: '1.5rem',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 40px rgba(0, 228, 255, 0.05), 0 20px 50px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Futuristic grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(26, 108, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 108, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none'
        }} />

        {/* Ambient background glows */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(26, 108, 255, 0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(0, 212, 255, 0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* SVG Network */}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', position: 'relative', zIndex: 2 }}>
          
          {/* Connection Edges with animated data flows */}
          {edges.map((edge, i) => {
            const A = nodeMap[edge.from];
            const B = nodeMap[edge.to];
            if (!A || !B) return null;
            const isHighlighted = activeNode === edge.from || activeNode === edge.to;
            const isCoreEdge = A.isCore || B.isCore;

            return (
              <g key={i}>
                {/* Visual glow line */}
                <line
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={isHighlighted ? 'var(--accent)' : isCoreEdge ? 'rgba(26, 108, 255, 0.25)' : 'rgba(26, 108, 255, 0.12)'}
                  strokeWidth={isHighlighted ? 2.5 : isCoreEdge ? 1.5 : 1}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />

                {/* Animated data packet traveling from A to B */}
                <motion.circle
                  r={isHighlighted ? 3.5 : 2}
                  fill="var(--accent)"
                  style={{ filter: isHighlighted ? 'drop-shadow(0 0 6px var(--accent))' : 'drop-shadow(0 0 3px var(--primary))' }}
                  animate={{
                    cx: [A.x, B.x],
                    cy: [A.y, B.y]
                  }}
                  transition={{
                    duration: isHighlighted ? 2 : (isCoreEdge ? 3.2 : 4.5),
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.3
                  }}
                />

                {/* Reverse feedback data flow for core connections */}
                {isCoreEdge && (
                  <motion.circle
                    r={1.5}
                    fill="var(--primary)"
                    style={{ filter: 'drop-shadow(0 0 2px var(--primary))' }}
                    animate={{
                      cx: [B.x, A.x],
                      cy: [B.y, A.y]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.5 + 0.5
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Node Render Loop */}
          {processes.map((p) => {
            const isActive = activeNode === p.id;
            const isCore = p.isCore;

            return (
              <g
                key={p.id}
                transform={`translate(${p.x},${p.y})`}
                onMouseEnter={() => setActiveNode(p.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Node Ring Pulsing Effect */}
                <circle
                  r={isCore ? 46 : 30}
                  fill="none"
                  stroke={isCore ? 'rgba(0, 212, 255, 0.15)' : 'rgba(26, 108, 255, 0.1)'}
                  strokeWidth={1.5}
                />
                
                {/* Rotating Dotted Ring for Core Hub */}
                {isCore && (
                  <motion.circle
                    r={52}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth={1}
                    strokeDasharray="4 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Pulsing Active Glow */}
                {isActive && (
                  <motion.circle
                    r={isCore ? 58 : 42}
                    fill="none"
                    stroke={isCore ? 'var(--accent)' : 'var(--primary)'}
                    strokeWidth={1.5}
                    initial={{ r: isCore ? 46 : 30, opacity: 0.8 }}
                    animate={{ r: isCore ? 64 : 48, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                {/* Node Base Circle */}
                <circle
                  r={isCore ? 38 : 24}
                  fill={isActive ? 'rgba(26, 108, 255, 0.25)' : 'rgba(5, 5, 8, 0.95)'}
                  stroke={isActive ? 'var(--accent)' : isCore ? 'var(--primary)' : 'rgba(26, 108, 255, 0.4)'}
                  strokeWidth={isActive ? 2.5 : isCore ? 2 : 1}
                  style={{ transition: 'fill 0.25s, stroke 0.25s, stroke-width 0.25s' }}
                />

                {/* Small indicator dot for status */}
                <circle
                  cx={isCore ? 26 : 16}
                  cy={isCore ? -26 : -16}
                  r={isCore ? 4 : 3}
                  fill={isActive ? 'var(--accent)' : '#22cc88'}
                  style={{ filter: isActive ? 'drop-shadow(0 0 4px var(--accent))' : 'none' }}
                />

                {/* Node Label Text */}
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? '#ffffff' : isCore ? 'var(--accent)' : 'var(--text)'}
                  fontSize={isCore ? '9' : '8.5'}
                  fontFamily="Outfit, sans-serif"
                  fontWeight={isActive || isCore ? '800' : '500'}
                  style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.2s', letterSpacing: '0.02em' }}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive Living Telemetry Console */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                background: 'rgba(5, 5, 10, 0.85)',
                border: '1px solid rgba(26, 108, 255, 0.3)',
                borderRadius: 16,
                padding: '1.25rem',
                backdropFilter: 'blur(16px)',
                zIndex: 10,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(26, 108, 255, 0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              {/* Telemetry Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
                  <strong style={{ fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Outfit' }}>
                    {nodeMap[activeNode]?.label}
                  </strong>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', lineHeight: 1.4 }}>
                  {nodeTelemetry[activeNode]?.desc}
                </span>
              </div>

              {/* Real-time Oscilloscope Sparkline Graph */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Tráfico y Flujo de Información
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="180" height="35" style={{ overflow: 'visible' }}>
                    <path
                      d={sparklinePath}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, fontFamily: 'monospace' }}>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Data metrics summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Rendimiento</span>
                  <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, fontFamily: 'monospace' }}>{nodeTelemetry[activeNode]?.throughput}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>Latencia</span>
                  <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, fontFamily: 'monospace' }}>{nodeTelemetry[activeNode]?.db}</span>
                </div>
              </div>

              {/* Highlight impact metric */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>Impacto Comercial</span>
                <span style={{
                  background: 'linear-gradient(135deg, rgba(26, 108, 255, 0.15), rgba(0, 212, 255, 0.15))',
                  border: '1px solid var(--accent)',
                  color: '#fff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'inline-block'
                }}>
                  {nodeTelemetry[activeNode]?.metric}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function MissionControl() {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '3rem 3rem 3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Top Status Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22cc88', boxShadow: '0 0 8px #22cc88' }} />
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Red Operativa Conectada · Enterprise Intelligence Platform
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={12} color="var(--primary)" /> Latencia: 14ms</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Cpu size={12} color="var(--accent)" /> IA Core: Activo</span>
        </div>
      </div>

      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
          Ecosystem Hub
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          Red Operativa del Negocio.<br />
          <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Eficiencia Integrada.
          </span>
        </h1>
        <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: 540, fontSize: '0.95rem', lineHeight: 1.6 }}>
          La empresa representada como una red operativa viva donde cada área está conectada. Pase el cursor sobre los nodos para ver el rendimiento, latencia y flujos de información en tiempo real.
        </p>
      </motion.div>

      {/* Primary Network Core Card */}
      <motion.div
        className="glass-panel"
        style={{
          padding: '2rem',
          background: 'rgba(10, 10, 15, 0.2)',
          borderColor: 'rgba(26, 108, 255, 0.1)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              CONSOLA DE VISUALIZACIÓN DE FLUJO
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Ecosistema Operacional Completo
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.35rem 0.75rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--muted)' }}>
            <Network size={12} color="var(--accent)" />
            Interactúe con la red
          </div>
        </div>

        <ProcessNetwork activeNode={activeNode} setActiveNode={setActiveNode} />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="btn-primary" onClick={() => navigate('/iniciar')}>
          Agendar Diagnóstico Operativo →
        </button>
        <button className="btn-outline" onClick={() => navigate('/transformaciones')}>
          Ver Transformaciones
        </button>
      </motion.div>
    </div>
  );
}
