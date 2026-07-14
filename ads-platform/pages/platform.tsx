import React, { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function PlatformPage() {
  const [business, setBusiness] = useState('')
  const [city, setCity] = useState('')
  const [goal, setGoal] = useState('Aumentar ventas')
  const [resp, setResp] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/campaigns/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business, city, goal })
    })
    const data = await res.json()
    setResp(data)
    setLoading(false)
  }

  return (
    <Layout>
      <Head>
        <title>Platform — Ads Intelligence</title>
      </Head>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold gradient-text">Ads Intelligence Platform</h1>
        <p className="mt-2 text-white/80">Genera campañas optimizadas por IA en segundos.</p>

        <form onSubmit={handleGenerate} className="mt-8 grid grid-cols-1 gap-4">
          <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Tipo de negocio" className="p-3 rounded-lg bg-white/5 border border-white/10" />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="p-3 rounded-lg bg-white/5 border border-white/10" />
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-3 rounded-lg bg-white/5 border border-white/10">
            <option>Aumentar ventas</option>
            <option>Generar leads</option>
            <option>Incrementar tráfico</option>
          </select>

          <div className="flex items-center gap-3">
            <button className="bg-primary text-white px-5 py-2 rounded-lg" type="submit" disabled={loading}>{loading ? 'Generando...' : 'Generar campaña'}</button>
          </div>
        </form>

        {resp && (
          <div className="mt-8 glass p-6 rounded-lg">
            <h3 className="font-semibold">Campaña generada</h3>
            <div className="mt-3">Nombre: {resp.campaign?.name}</div>
            <div>Audiencias: {resp.campaign?.audiences?.join(', ')}</div>
            <div>Presupuesto recomendado: {resp.campaign?.recommendedBudget}</div>
            <div className="mt-3 font-medium">Copy sugerido</div>
            <div className="mt-1">{resp.campaign?.copy?.headline}</div>
            <div className="mt-1 text-white/80">{resp.campaign?.copy?.body}</div>
          </div>
        )}
      </section>
    </Layout>
  )
}
