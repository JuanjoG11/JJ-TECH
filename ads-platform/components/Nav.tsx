import React, { useState } from 'react'
import Link from 'next/link'

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-xl font-bold gradient-text">JJ</div>
          <div className="text-lg font-semibold">JJ TECH</div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#services" className="text-white/90">Servicios</Link>
          <Link href="#cases" className="text-white/90">Casos</Link>
          <Link href="/platform" className="bg-white text-primary px-4 py-2 rounded-lg">Probar plataforma</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white/90">Menu</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden py-2 flex flex-col gap-2">
          <a href="#services" className="text-white/90">Servicios</a>
          <a href="#cases" className="text-white/90">Casos</a>
          <a href="/platform" className="text-white/90">Probar plataforma</a>
        </div>
      )}
    </div>
  )
}

export default Nav
