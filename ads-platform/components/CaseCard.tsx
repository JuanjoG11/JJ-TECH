import React from 'react'

const CaseCard: React.FC<{ title: string; subtitle: string; metric: string }> = ({ title, subtitle, metric }) => {
  return (
    <div className="glass p-4 rounded-lg">
      <div className="text-sm text-white/80">{subtitle}</div>
      <div className="mt-2 font-semibold text-lg">{title}</div>
      <div className="mt-3 text-primary font-bold">{metric}</div>
    </div>
  )
}

export default CaseCard
