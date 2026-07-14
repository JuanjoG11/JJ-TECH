import React from 'react'

const MetricCard: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="glass p-6 rounded-xl flex flex-col items-start">
      <div className="text-xs text-white/80">{label}</div>
      <div className="mt-2 text-3xl font-bold gradient-text">{value}</div>
      <div className="mt-3 text-sm text-white/70">Resultados verificados por nuestro equipo</div>
    </div>
  )
}

export default MetricCard
