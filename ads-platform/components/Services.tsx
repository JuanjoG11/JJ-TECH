import React from 'react'

const services = [
  { title: 'Desarrollo Web', items: ['Sistemas empresariales', 'Portales corporativos', 'Ecommerce'] },
  { title: 'Desarrollo Móvil', items: ['Android', 'iOS', 'React Native'] },
  { title: 'Automatización', items: ['Integraciones', 'Flujos empresariales', 'RPA'] },
  { title: 'Inteligencia Artificial', items: ['Chatbots', 'Asistentes', 'Optimización de anuncios'] }
]

const Services: React.FC = () => {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold gradient-text">Servicios</h2>
      <p className="mt-3 text-white/80">Soluciones tecnológicas para impulsar crecimiento y eficiencia.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {services.map((s) => (
          <div key={s.title} className="glass p-6 rounded-xl">
            <div className="font-semibold text-lg">{s.title}</div>
            <ul className="mt-3 text-sm text-white/80 space-y-2">
              {s.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
