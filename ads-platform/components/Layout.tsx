import React from 'react'
import Nav from './Nav'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
          <div className="min-h-screen text-white">
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#071336] via-[#08112b] to-[#071336] opacity-95"></div>
            <div className="relative">
              <Nav />
              <main>{children}</main>

              <footer className="mt-12">
                <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-white/60">© {new Date().getFullYear()} JJ TECH — Ads Intelligence Platform</div>
              </footer>
            </div>
          </div>
  )
}

export default Layout
