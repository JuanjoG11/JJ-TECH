// src/components/MetricCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ value, label, prefix = '', suffix = '', delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value).replace('%', '').replace('+', '').replace('$', '')) || 0;

  useEffect(() => {
    let start = null;
    const duration = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timer = setTimeout(() => requestAnimationFrame(step), delay * 1000);
    return () => clearTimeout(timer);
  }, [numericValue, delay]);

  const formattedDisplay = display.toLocaleString('es-ES');

  return (
    <motion.div
      className="glass-panel p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      style={{
        cursor: 'default',
        background: 'rgba(13, 13, 20, 0.4)',
        borderColor: 'rgba(26, 108, 255, 0.15)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
    >
      <div
        className="font-heading"
        style={{
          fontSize: '2.4rem',
          fontWeight: 900,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.75rem',
        }}
      >
        {prefix}{formattedDisplay}{suffix}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
        {label}
      </div>
    </motion.div>
  );
}

