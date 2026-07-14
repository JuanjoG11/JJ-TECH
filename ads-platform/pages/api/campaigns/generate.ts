import type { NextApiRequest, NextApiResponse } from 'next'

type CampaignResponse = {
  id: string
  name: string
  audiences: string[]
  recommendedBudget: string
  copy: {
    headline: string
    body: string
    cta: string
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  // This is a stubbed response for the scaffold. Integrate OpenAI + business logic.
  const body = req.body || {}
  // Simulate slightly more detailed generated response
  const sample: CampaignResponse = {
    id: 'camp_001',
    name: `${body.business || 'Negocio'} - Campaña Inicial`,
    audiences: ['Intereses: Tecnología', 'Edad: 25-45', 'Ubicación: Ciudad indicada'],
    recommendedBudget: 'USD 1500 / month',
    copy: {
      headline: 'Impulsa tus ventas con tecnología e IA',
      body: 'Nuestra plataforma crea campañas con segmentación y copys optimizados por IA para maximizar conversiones.',
      cta: 'Solicitar asesoría'
    }
  }

  res.status(200).json({ ok: true, campaign: sample })
}
