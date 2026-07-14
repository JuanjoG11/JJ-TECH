import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-12">
      <img
        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1920"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      <motion.div
        className="relative z-10 max-w-2xl text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-6 text-white uppercase">
          Impulsa tu negocio con <span className="text-[var(--accent)]">resultados medibles</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Soluciones de automatización, IA y Business Intelligence que reducen costos, aumentan productividad y generan crecimiento sostenible.
        </p>
        <a href="/resultados" className="btn-primary">
          Ver nuestros resultados
        </a>
      </motion.div>
    </section>
  );
}
