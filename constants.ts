
// Re-export constants from split files
export * from './constants_music';
export * from './constants_structure';
export * from './constants_visual';
export * from './constants_prompt';

export const responsiveGlobalStyles = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
  body { overflow-x: hidden; width: 100%; position: relative; }
  #root { width: 100%; overflow-x: hidden; }
  
  /* Layout Transitions */
  .studio-container { display: flex; width: 100%; height: 100%; }
  .studio-main-content { flex: 1; overflow-y: auto; padding: 30px; background-color: #1f2937; }
  
  @media (max-width: 768px) {
    .studio-container { flex-direction: column !important; }
    .sidebar-nav { 
      width: 100% !important; 
      height: auto !important; 
      flex-direction: row !important; 
      padding: 0 !important; 
      border-right: none !important; 
      border-top: 1px solid #374151 !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      z-index: 1000 !important;
      justify-content: space-around !important;
      background-color: #111827 !important;
    }
    .sidebar-nav button { padding: 8px 0 !important; gap: 2px !important; }
    .sidebar-nav span:last-child { font-size: 9px !important; }
    .sidebar-divider { display: none !important; }
    .sidebar-footer { display: none !important; }
    .studio-main-content { padding: 15px !important; padding-bottom: 80px !important; }
    
    /* Responsive Grids */
    .responsive-grid-2 { grid-template-columns: 1fr !important; }
    .responsive-grid-3 { grid-template-columns: 1fr !important; }
    .lyrics-view { grid-template-columns: 1fr !important; height: auto !important; }
    
    /* Dashboard */
    .dashboard-header { flex-direction: column !important; align-items: flex-start !important; gap: 15px !important; }
    .dashboard-projects { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important; }
    
    /* Header */
    .app-header { padding: 0 10px !important; }
    .header-logo span:last-child { display: none !important; }
    .header-actions { gap: 5px !important; }
    .header-actions button { padding: 6px 8px !important; font-size: 11px !important; }
  }
`;
