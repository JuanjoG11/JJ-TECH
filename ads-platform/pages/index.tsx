import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import MetricCard from '../components/MetricCard'
import Services from '../components/Services'
import CaseCard from '../components/CaseCard'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Ads Intelligence Platform — JJ TECH</title>
      </Head>

      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Proyectos" value="120+" />
        <MetricCard label="Empresas" value="80+" />
        <MetricCard label="Horas Automatizadas" value="45k+" />
        <MetricCard label="Ahorro Promedio" value="30%" />
      </section>

      <Services />

      <section id="cases" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold gradient-text">Casos de éxito</h2>
          <Link href="#" className="text-white/80">Ver todos</Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <CaseCard title="Ecommerce X" subtitle="Optimización de conversiones" metric="+48% CVR" />
          <CaseCard title="Logística Y" subtitle="Automatización de rutas" metric="-22% costos" />
          <CaseCard title="SaaS Z" subtitle="Campañas IA" metric="+3.2x ROAS" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h3 className="text-2xl font-bold">¿Listo para transformar tu marketing?</h3>
        <p className="mt-3 text-white/80">Prueba nuestra Ads Intelligence Platform y genera tu primera campaña en minutos.</p>
        <div className="mt-6">
          <Link href="/platform" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">Comenzar ahora</Link>
        </div>
      </section>
    </Layout>
  )
}
