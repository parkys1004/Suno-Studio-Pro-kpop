import React from 'react';

export const Icon = ({ name }: { name: string }) => <span className="material-symbols-outlined" style={{ fontSize: '1.2em', verticalAlign: 'bottom' }}>{name}</span>;

export const NavButton = ({ active, onClick, icon, label, legibilityMode }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      background: 'none', border: 'none', 
      color: active 
        ? (legibilityMode ? '#FDE047' : '#e11d48') 
        : (legibilityMode ? '#E5E7EB' : '#6b7280'), 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
      cursor: 'pointer', width: '100%', padding: '10px 0'
    }}
  >
    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{icon}</span>
    <span style={{ fontSize: '11px', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>
  </button>
);
