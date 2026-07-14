// src/components/SideNav.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, TrendingUp, Share2, Cpu, MessageCircle } from 'lucide-react';

const navItems = [
  { to: '/',               icon: LayoutGrid,   label: 'Mission'   },
  { to: '/transformaciones', icon: TrendingUp,  label: 'Transform' },
  { to: '/ecosistema',     icon: Share2,        label: 'Ecosystem' },
  { to: '/plataforma',     icon: Cpu,           label: 'Platform'  },
  { to: '/iniciar',        icon: MessageCircle, label: 'Iniciar'   },
];

export default function SideNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2rem',
        gap: '0.25rem',
        background: 'rgba(5,5,8,0.95)',
        borderRight: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
      }}
    >
      {/* Logo mark */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 900,
            fontSize: '1rem',
            color: '#fff',
          }}
        >
          JJ
        </div>
      </div>

      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={{ width: '100%', textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.75rem 0',
                color: isActive ? 'var(--primary)' : 'var(--muted)',
                background: isActive ? 'var(--primary-dim)' : 'transparent',
                borderRight: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              <Icon size={22} />
              <span style={{ fontSize: '0.6rem', marginTop: '0.3rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
