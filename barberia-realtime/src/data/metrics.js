// src/data/metrics.js
export const metrics = [
  { id: 1, value: 25000, label: 'Horas Automatizadas', prefix: '+', suffix: '' },
  { id: 2, value: 50, label: 'Procesos Optimizados', prefix: '+', suffix: '' },
  { id: 3, value: 10, label: 'Soluciones Implementadas', prefix: '+', suffix: '' },
  { id: 4, value: 500, label: 'Usuarios Impactados', prefix: '+', suffix: '' },
  { id: 5, value: 30, label: 'Incremento de Productividad', prefix: '+', suffix: '%' },
  { id: 6, value: 500, label: 'Procesos Optimizados (COP)', prefix: '+$', suffix: 'M' },
];

export const processes = [
  { id: 'core',        label: 'CORE PLATFORM', x: 450, y: 240, isCore: true },
  { id: 'sales',       label: 'Ventas',         x: 450, y: 70 },
  { id: 'marketing',   label: 'Marketing',      x: 230, y: 120 },
  { id: 'crm',         label: 'CRM',            x: 260, y: 260 },
  { id: 'inventory',   label: 'Inventarios',    x: 180, y: 390 },
  { id: 'logistics',   label: 'Logística',      x: 390, y: 430 },
  { id: 'automation',  label: 'Automatización', x: 570, y: 390 },
  { id: 'ai',          label: 'IA Predictiva',  x: 720, y: 350 },
  { id: 'bi',          label: 'BI & Analytics', x: 670, y: 180 },
];

export const edges = [
  // Core connections
  { from: 'core', to: 'sales' },
  { from: 'core', to: 'marketing' },
  { from: 'core', to: 'crm' },
  { from: 'core', to: 'inventory' },
  { from: 'core', to: 'logistics' },
  { from: 'core', to: 'automation' },
  { from: 'core', to: 'ai' },
  { from: 'core', to: 'bi' },
  // Peer connections
  { from: 'marketing', to: 'sales' },
  { from: 'sales', to: 'crm' },
  { from: 'crm', to: 'automation' },
  { from: 'inventory', to: 'logistics' },
  { from: 'logistics', to: 'automation' },
  { from: 'automation', to: 'ai' },
  { from: 'ai', to: 'bi' },
  { from: 'bi', to: 'sales' },
];

