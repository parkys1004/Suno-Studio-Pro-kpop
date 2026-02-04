import React from 'react';
import { GENRE_GUIDE_DATA } from './constants';

const ConfigManualModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#1f2937', width: '1000px', maxWidth: '95vw', maxHeight: '90vh',
                borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                    <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>library_music</span>
                        프로젝트 구성 가이드 (Genre & Style Guide)
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '25px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', backgroundColor: '#1f2937' }}>
                    {GENRE_GUIDE_DATA.map((section, idx) => (
                        <div key={idx} style={{ 
                            backgroundColor: '#111827', borderRadius: '12px', padding: '15px', 
                            borderLeft: `4px solid ${section.color}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: section.color, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px dashed ${section.color}40`, paddingBottom: '8px' }}>
                                {section.title}
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none' }}>
                                {section.items.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '10px', fontSize: '13px', lineHeight: '1.5' }}>
                                        <div style={{ color: '#e5e7eb', fontWeight: 'bold', marginBottom: '2px' }}>• {item.term}</div>
                                        <div style={{ color: '#9ca3af', paddingLeft: '10px', fontSize: '12px' }}>{item.desc}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '15px', borderTop: '1px solid #374151', textAlign: 'center', backgroundColor: '#111827' }}>
                    <button onClick={onClose} style={{ padding: '10px 30px', backgroundColor: '#374151', color: 'white', border: '1px solid #4b5563', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        닫기 (Close)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigManualModal;