import React from 'react';

interface LyricOptimizationModalProps {
    original: string;
    optimized: string;
    rationale: string;
    onClose: () => void;
    onApply: () => void;
}

const LyricOptimizationModal = ({ 
    original, 
    optimized, 
    rationale, 
    onClose, 
    onApply 
}: LyricOptimizationModalProps) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 5000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#1f2937', width: '90%', maxWidth: '1000px', maxHeight: '85vh',
                borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                    <h2 style={{ margin: 0, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
                        <span className="material-symbols-outlined">auto_fix_high</span>
                        가사 구조 및 태그 교정 제안
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, backgroundColor: '#1f2937' }}>
                    
                    {/* Analysis Report */}
                    <div style={{ backgroundColor: 'rgba(30, 58, 138, 0.3)', border: '1px solid #1d4ed8', borderRadius: '8px', padding: '15px' }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#60a5fa', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
                            분석 리포트
                        </h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#dbeafe', lineHeight: '1.6' }}>
                            {rationale}
                        </p>
                    </div>

                    {/* Comparison Grid */}
                    <div className="comparison-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '10px', alignItems: 'center', height: '400px' }}>
                        
                        {/* Original */}
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <label style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>원본 (Original)</label>
                            <textarea 
                                readOnly
                                value={original}
                                style={{ 
                                    flex: 1, padding: '15px', backgroundColor: '#111827', 
                                    border: '1px solid #374151', borderRadius: '8px', color: '#9ca3af', 
                                    resize: 'none', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6'
                                }}
                            />
                        </div>

                        {/* Arrow */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                             <span className="material-symbols-outlined" style={{ color: '#fbbf24', fontSize: '24px' }}>arrow_forward</span>
                        </div>

                        {/* Corrected */}
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <label style={{ color: '#10b981', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>교정 제안 (Corrected)</label>
                            <textarea 
                                readOnly
                                value={optimized}
                                style={{ 
                                    flex: 1, padding: '15px', backgroundColor: 'rgba(6, 78, 59, 0.2)', 
                                    border: '1px solid #10b981', borderRadius: '8px', color: '#d1fae5', 
                                    resize: 'none', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6'
                                }}
                            />
                        </div>
                    </div>
                    <style dangerouslySetInnerHTML={{__html: `
                        @media (max-width: 768px) {
                            .comparison-grid {
                                grid-template-columns: 1fr !important;
                                grid-template-rows: 1fr 40px 1fr !important;
                                height: auto !important;
                            }
                            .comparison-grid textarea {
                                min-height: 200px;
                            }
                            .comparison-grid .material-symbols-outlined {
                                transform: rotate(90deg);
                            }
                        }
                    `}} />
                </div>

                {/* Footer */}
                <div style={{ padding: '20px', borderTop: '1px solid #374151', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#111827' }}>
                    <button onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#374151', color: '#d1d5db', border: '1px solid #4b5563', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        취소
                    </button>
                    <button onClick={onApply} style={{ padding: '10px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                        교정 사항 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LyricOptimizationModal;