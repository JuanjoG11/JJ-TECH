// src/pages/Ecosystem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const nodes = [
  { id: 'logistics',   label: 'Logística',      x: 200, y: 140, kpi: '70% reducción en tiempos de validación',  color: '#1a6cff' },
  { id: 'sales',       label: 'Ventas',          x: 440, y: 80,  kpi: '+40% productividad comercial',             color: '#00d4ff' },
  { id: 'bi',          label: 'BI',              x: 620, y: 200, kpi: '80% menos tiempo de análisis',             color: '#7b61ff' },
  { id: 'inventory',   label: 'Inventario',      x: 140, y: 300, kpi: 'Trazabilidad total del stock',             color: '#1a6cff' },
  { id: 'automation',  label: 'Automatización',  x: 380, y: 310, kpi: '60% reducción costo operativo',           color: '#00d4ff' },
  { id: 'ai',          label: 'Inteligencia IA', x: 600, y: 360, kpi: 'Decisiones en tiempo real con IA',        color: '#7b61ff' },
  { id: 'crm',         label: 'CRM',             x: 290, y: 200, kpi: 'Seguimiento 360° del cliente',            color: '#1a6cff' },
];

const edges = [
  ['logistics', 'inventory'],
  ['logistics', 'crm'],
  ['logistics', 'automation'],
  ['sales', 'crm'],
  ['sales', 'bi'],
  ['bi', 'ai'],
  ['automation', 'ai'],
  ['automation', 'bi'],
  ['inventory', 'automation'],
  ['crm', 'automation'],
];

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

export default function Ecosystem() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const W = 780, H = 460;

  const connectedIds = hovered
    ? edges.flatMap(([a, b]) => {
        if (a === hovered) return [b];
        if (b === hovered) return [a];
        return [];
      })
    : [];

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 3rem 3rem 2rem' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Plataforma Integrada
        </p>
        <h1 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '0.75rem' }}>
          Un ecosistema,<br />
          <span style={{ color: 'var(--primary)' }}>toda su operación.</span>
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 520, lineHeight: 1.6, marginBottom: '2rem' }}>
          Todas las áreas de su empresa conectadas e integradas. Pase el cursor sobre cada módulo para ver su impacto.
        </p>
      </motion.div>

      <motion.div
        className="glass-panel"
        style={{ padding: '2rem', position: 'relative' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Draw edges */}
          {edges.map(([a, b], i) => {
            const A = nodeMap[a], B = nodeMap[b];
            const isHighlighted = hovered === a || hovered === b;
            return (
              <motion.line
                key={i}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={isHighlighted ? 'var(--accent)' : 'rgba(26,108,255,0.2)'}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={isHighlighted ? 'none' : '4 4'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node, i) => {
            const isHov = hovered === node.id;
            const isConnected = connectedIds.includes(node.id);
            return (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.circle
                  r={isHov ? 40 : isConnected ? 34 : 30}
                  fill={isHov ? `${node.color}22` : isConnected ? `${node.color}14` : 'rgba(10,10,20,0.8)'}
                  stroke={isHov ? node.color : isConnected ? `${node.color}88` : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isHov ? 2 : 1.5}
                  animate={{ r: isHov ? 40 : isConnected ? 34 : 30 }}
                  transition={{ duration: 0.2 }}
                  initial={{ r: 0, opacity: 0 }}
                />

                {/* Pulse on hover */}
                {isHov && (
                  <motion.circle
                    r={50}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={1}
                    initial={{ r: 40, opacity: 0.5 }}
                    animate={{ r: 60, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHov ? '#fff' : isConnected ? 'var(--text)' : 'var(--muted)'}
                  fontSize={isHov ? '11' : '10'}
                  fontFamily="Inter, sans-serif"
                  fontWeight={isHov ? '700' : '500'}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>

                {/* KPI Tooltip on hover */}
                {isHov && (
                  <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <rect x={-90} y={46} width={180} height={38} rx={8}
                      fill="rgba(10,10,20,0.95)" stroke={node.color} strokeWidth={1} />
                    <text x={0} y={65} textAnchor="middle"
                      fill={node.color} fontSize="10" fontFamily="Inter" fontWeight="600">
                      {node.kpi}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      <motion.div style={{ marginTop: '2rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <button className="btn-primary" onClick={() => navigate('/iniciar')}>
          Quiero este Ecosistema para mi Empresa →
        </button>
      </motion.div>
    </div>
  );
}
