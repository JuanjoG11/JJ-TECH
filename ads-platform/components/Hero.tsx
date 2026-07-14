import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/85 to-techgreen/85" style={{filter: 'saturate(1.05) blur(18px)'}}></div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass p-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight gradient-text">Transformamos negocios mediante software, automatización e inteligencia artificial.</h1>
          <p className="mt-6 text-lg text-white/90">Desarrollamos aplicaciones, automatizamos procesos empresariales y potenciamos tus ventas con tecnología de última generación.</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a className="bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition" href="#">Solicitar asesoría</a>
            <a className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition" href="#">Ver casos de éxito</a>
            <a className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium backdrop-blur-xs border border-white/10" href="#">Probar plataforma</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
