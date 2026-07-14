// src/data/transformations.js
export const transformations = [
  {
    id: 1,
    title: 'Control de Fletes',
    before: {
      icon: '📋',
      label: 'Planillas manuales en Excel',
      pains: ['Errores en validaciones', 'Información duplicada', 'Sin trazabilidad financiera'],
    },
    after: {
      icon: '⚡',
      label: 'Sistema de Control en Tiempo Real',
      gains: ['85% menos errores operativos', '70% reducción en validaciones', 'Control financiero total'],
    },
    metric: '85%',
    metricLabel: 'Reducción de Errores',
    color: '#1a6cff',
  },
  {
    id: 2,
    title: 'Gestión de Devoluciones',
    before: {
      icon: '🔄',
      label: 'Proceso manual sin trazabilidad',
      pains: ['Sin identificación de causas', 'Proceso reactivo', 'Alta tasa de recurrencia'],
    },
    after: {
      icon: '🎯',
      label: 'Plataforma de Devoluciones Inteligente',
      gains: ['32% menos devoluciones', 'Trazabilidad completa', 'Identificación de causas raíz'],
    },
    metric: '32%',
    metricLabel: 'Reducción de Devoluciones',
    color: '#00d4ff',
  },
  {
    id: 3,
    title: 'Business Intelligence',
    before: {
      icon: '📊',
      label: 'Reportes manuales semanales',
      pains: ['Datos obsoletos al momento de verlos', 'Horas invertidas en Excel', 'Decisiones tardías'],
    },
    after: {
      icon: '🧠',
      label: 'Plataforma BI en Tiempo Real',
      gains: ['80% menos tiempo de análisis', 'Datos consolidados al instante', 'Decisiones basadas en datos'],
    },
    metric: '80%',
    metricLabel: 'Tiempo de Análisis',
    color: '#7b61ff',
  },
  {
    id: 4,
    title: 'Gestión Comercial',
    before: {
      icon: '📞',
      label: 'Seguimiento en papel y llamadas',
      pains: ['Sin historial centralizado', 'Oportunidades perdidas', 'Baja productividad del equipo'],
    },
    after: {
      icon: '🚀',
      label: 'CRM Empresarial Integrado',
      gains: ['Mayor seguimiento de clientes', 'Incremento de productividad', 'Información centralizada'],
    },
    metric: '+40%',
    metricLabel: 'Productividad Comercial',
    color: '#1a6cff',
  },
  {
    id: 5,
    title: 'Automatización Operativa',
    before: {
      icon: '⚙️',
      label: 'Procesos repetitivos manuales',
      pains: ['Alto costo operativo', 'Errores humanos frecuentes', 'Escalabilidad limitada'],
    },
    after: {
      icon: '🤖',
      label: 'Flujos de Trabajo Automatizados',
      gains: ['Eliminación de procesos manuales', 'Reducción del costo operativo', 'Escalabilidad total'],
    },
    metric: '60%',
    metricLabel: 'Reducción Costo Operativo',
    color: '#00d4ff',
  },
];
