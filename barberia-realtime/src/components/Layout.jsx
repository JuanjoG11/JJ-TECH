// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <SideNav />
      <main style={{ flex: 1, marginLeft: '80px', overflowY: 'auto', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
}
