import React, { useState } from 'react';
import { LYRIC_CHEAT_SHEET } from './constants';

interface LyricCheatSheetProps {
    onInsertTag: (tag: string) => void;
    setTooltip: (tooltip: {text: string, x: number, y: number} | null) => void;
}

const LyricCheatSheet = ({ onInsertTag, setTooltip }: LyricCheatSheetProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent, text: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            text,
            x: rect.left + rect.width / 2,
            y: rect.top - 8
        });
    };

    const handleMouseLeave = () => setTooltip(null);

    return (
        <div style={{ border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    backgroundColor: '#fbbf24', padding: '10px 15px', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', userSelect: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: 'bold', fontSize: '14px' }}>
                    <span className="material-symbols-outlined">library_add</span>
                    가사 치트키 (Lyric Tags)
                </div>
                <span className="material-symbols-outlined" style={{ color: '#111827', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    expand_more
                </span>
            </div>
            
            {isOpen && (
                <div style={{ backgroundColor: '#111827', padding: '15px', maxHeight: '300px', overflowY: 'auto' }}>
                    <div style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginBottom: '15px' }}>
                        태그를 클릭하면 에디터에 즉시 추가됩니다.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        {LYRIC_CHEAT_SHEET.map((category, idx) => (
                            <div key={idx} style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', padding: '10px' }}>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{category.icon}</span>
                                    {category.title}
                                </h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {category.tags.map((tagObj, tIdx) => (
                                        <button 
                                            key={tIdx}
                                            onClick={() => onInsertTag(tagObj.label)}
                                            style={{ 
                                                fontSize: '11px', padding: '4px 8px', borderRadius: '4px',
                                                border: '1px solid #fbbf24', backgroundColor: 'transparent',
                                                color: '#fbbf24', cursor: 'pointer', transition: 'all 0.2s',
                                                fontFamily: 'monospace'
                                            }}
                                            onMouseEnter={(e) => { 
                                                e.currentTarget.style.backgroundColor = '#fbbf24'; 
                                                e.currentTarget.style.color = '#1f2937';
                                                handleMouseEnter(e, tagObj.desc);
                                            }}
                                            onMouseLeave={(e) => { 
                                                e.currentTarget.style.backgroundColor = 'transparent'; 
                                                e.currentTarget.style.color = '#fbbf24';
                                                handleMouseLeave();
                                            }}
                                        >
                                            {tagObj.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
         </div>
    );
};

export default LyricCheatSheet;