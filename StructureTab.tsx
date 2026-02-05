import React, { useState, useEffect } from 'react';
import { Project, SongBlock } from './types';
import { BLOCK_SAMPLES, STRUCTURE_TEMPLATES, INTRO_STYLES, TEMPLATE_CATEGORIES } from './constants';
import StructureManualModal from './StructureManualModal';

// --- TAB: Structure ---
const StructureTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  // Use persisted template or default to 'Custom'
  const selectedTemplate = project.selectedStructureTemplate || 'Custom';
  const [savedDjNames, setSavedDjNames] = useState<string[]>([]);
  const [showManual, setShowManual] = useState(false); // Manual Modal State
  const [tooltip, setTooltip] = useState<{text: string, x: number, y: number} | null>(null); // New Tooltip State

  useEffect(() => {
    const saved = localStorage.getItem('suno_dj_names');
    if (saved) {
        try {
            setSavedDjNames(JSON.parse(saved));
        } catch(e) { console.error(e); }
    } else {
        setSavedDjNames(['DJ Seoul', 'Brave Brothers', 'JYP']);
    }
  }, []);

  const handleSaveDjName = () => {
    const name = project.djName?.trim();
    if (name && !savedDjNames.includes(name)) {
        const updated = [...savedDjNames, name];
        setSavedDjNames(updated);
        localStorage.setItem('suno_dj_names', JSON.stringify(updated));
    }
  };

  const handleDeleteDjName = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    const updated = savedDjNames.filter(n => n !== name);
    setSavedDjNames(updated);
    localStorage.setItem('suno_dj_names', JSON.stringify(updated));
  };

  // Calculate uncategorized templates (safety net)
  const allCategorized = Object.values(TEMPLATE_CATEGORIES).flat();
  const uncategorized = Object.keys(STRUCTURE_TEMPLATES).filter(t => !allCategorized.includes(t));

  const moveBlock = (index: number, direction: -1 | 1) => {
     const newStructure = [...project.structure];
     if (index + direction < 0 || index + direction >= newStructure.length) return;
     const temp = newStructure[index];
     newStructure[index] = newStructure[index + direction];
     newStructure[index + direction] = temp;
     onUpdate({ structure: newStructure });
  };

  const addBlock = (type: string) => {
     const newBlock = { 
         id: Date.now().toString(), 
         type, 
         description: BLOCK_SAMPLES[type]?.[0] || '...',
         duration: type === 'Intro' || type === 'Outro' ? 4 : 8 
     };
     onUpdate({ structure: [...project.structure, newBlock] });
  };

  const removeBlock = (index: number) => {
      const newStructure = [...project.structure];
      newStructure.splice(index, 1);
      onUpdate({ structure: newStructure });
  };

  const updateBlockDescription = (index: number, desc: string) => {
      const newStructure = project.structure.map((block: SongBlock, i: number) => 
        i === index ? { ...block, description: desc } : block
      );
      onUpdate({ structure: newStructure });
  };

  const applyTemplate = (templateName: string) => {
    if (templateName === 'Custom') {
        onUpdate({ selectedStructureTemplate: 'Custom' });
        return;
    }

    // @ts-ignore
    const template = STRUCTURE_TEMPLATES[templateName];
    if (template) {
        const newStructure = template.map((block: any, idx: number) => ({
            ...block,
            id: Date.now().toString() + idx
        }));
        onUpdate({ structure: newStructure, selectedStructureTemplate: templateName });
    }
  };

  // Tooltip Handlers
  const handleMouseEnter = (e: React.MouseEvent, type: string) => {
    const descriptions: Record<string, string> = {
        'Intro': '곡의 도입부입니다. 분위기를 조성하거나 시그니처 사운드를 배치합니다.',
        'Verse': '이야기를 풀어가는 절(Verse)입니다. 랩이나 보컬로 서사를 전달합니다.',
        'Chorus': '곡의 핵심이 되는 후렴구(Hook)입니다. 가장 기억에 남는 멜로디를 배치하세요.',
        'Bridge': '분위기를 반전시키거나 고조시키는 연결 구간입니다. (보통 2절 후 배치)',
        'Drop': '강렬한 비트와 퍼포먼스가 강조되는 구간입니다. (댄스 브레이크/EDM)',
        'Instrumental': '보컬 없이 악기 연주(솔로 등)가 중심이 되는 간주입니다.',
        'Outro': '곡을 마무리하는 엔딩 구간입니다. 페이드 아웃이나 엔딩 포즈를 유도합니다.'
    };
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
        text: descriptions[type] || type,
        x: rect.left + rect.width / 2,
        y: rect.top - 8
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  const titleColor = legibilityMode ? '#FFFFFF' : 'white';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Tooltip Renderer */}
        {tooltip && (
            <div style={{
                position: 'fixed',
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translate(-50%, -100%)',
                backgroundColor: '#111827',
                color: '#fbbf24',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                pointerEvents: 'none',
                zIndex: 9999,
                border: '1px solid #4b5563',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
                {tooltip.text}
                <div style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0, 
                    height: 0, 
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #4b5563'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0, 
                    height: 0, 
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #111827'
                }}></div>
            </div>
        )}

        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>🎹 곡 구조 설계 (Structure Editor)</span>
            <button 
                onClick={() => setShowManual(true)}
                style={{
                    fontSize: '13px', padding: '6px 12px', backgroundColor: '#1f2937', 
                    border: '1px solid #4b5563', color: '#fbbf24', borderRadius: '6px', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
                구조 매뉴얼
            </button>
        </h2>
        
        {showManual && <StructureManualModal onClose={() => setShowManual(false)} />}
        
        <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ color: legibilityMode ? '#FFFFFF' : '#d1d5db', fontSize: '14px' }}>구조 템플릿 불러오기:</span>
            <select 
                value={selectedTemplate} 
                onChange={(e) => applyTemplate(e.target.value)}
                style={{ 
                    padding: '8px 12px', borderRadius: '8px', backgroundColor: '#111827', 
                    color: 'white', border: '1px solid #4b5563', minWidth: '250px', cursor: 'pointer'
                }}
            >
                {Object.entries(TEMPLATE_CATEGORIES).map(([category, templates]) => (
                    <optgroup key={category} label={category} style={{ color: '#fbbf24', fontWeight: 'bold', fontStyle: 'normal' }}>
                        {templates.map(t => (
                            // @ts-ignore
                            STRUCTURE_TEMPLATES[t] ? (
                                <option key={t} value={t} style={{ color: 'white', fontWeight: 'normal' }}>{t}</option>
                            ) : null
                        ))}
                    </optgroup>
                ))}
                
                {uncategorized.length > 0 && (
                    <optgroup label="📂 기타 (Others)" style={{ color: '#9ca3af', fontWeight: 'bold' }}>
                        {uncategorized.map(t => (
                            <option key={t} value={t} style={{ color: 'white', fontWeight: 'normal' }}>{t}</option>
                        ))}
                    </optgroup>
                )}
            </select>
            {selectedTemplate !== 'Custom' && (
                <span style={{ 
                    fontSize: '12px', color: '#10b981', fontWeight: 'bold', 
                    padding: '4px 8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                    현재 템플릿: {selectedTemplate}
                </span>
            )}
            <span style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af' }}>* 선택 시 현재 구조가 변경됩니다.</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['Intro', 'Verse', 'Chorus', 'Bridge', 'Drop', 'Instrumental', 'Outro'].map(type => (
                <button 
                    key={type} 
                    onClick={() => addBlock(type)}
                    onMouseEnter={(e) => handleMouseEnter(e, type)}
                    onMouseLeave={handleMouseLeave}
                    style={{ padding: '8px 16px', backgroundColor: '#374151', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + {type}
                </button>
            ))}
        </div>

        {/* Updated: Flex Wrap to remove horizontal scrollbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start', paddingBottom: '20px' }}>
            {project.structure.map((block: SongBlock, i: number) => (
                <div key={block.id} style={{ 
                    minWidth: '220px', 
                    flex: block.duration,
                    backgroundColor: block.type === 'Chorus' ? '#e11d48' : block.type === 'Verse' ? '#2563eb' : '#4b5563',
                    borderRadius: '8px', padding: '15px', position: 'relative',
                    transition: 'all 0.2s',
                    flexShrink: 0
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#FFFFFF' }}>{block.type}</span>
                        <button onClick={() => removeBlock(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>×</button>
                    </div>
                    
                    {/* Sample Selection */}
                    <select 
                       value={block.description} 
                       onChange={(e) => updateBlockDescription(i, e.target.value)}
                       style={{ width: '100%', marginBottom: '5px', backgroundColor: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', fontSize: '12px', padding: '4px', borderRadius: '4px' }}
                    >
                        <option value={block.description}>{block.description} (Custom)</option>
                        {BLOCK_SAMPLES[block.type]?.map((sample, idx) => (
                            <option key={idx} value={sample}>{sample}</option>
                        ))}
                    </select>

                    <input 
                        type="text" 
                        value={block.description}
                        onChange={(e) => updateBlockDescription(i, e.target.value)}
                        placeholder="직접 입력..."
                        style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '12px', padding: '4px', borderRadius: '4px', boxSizing: 'border-box' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
                         <button onClick={() => moveBlock(i, -1)} style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>◀</button>
                         <button onClick={() => moveBlock(i, 1)} style={{ fontSize: '10px', background: 'rgba(0,0,0,0.3)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>▶</button>
                    </div>
                </div>
            ))}
        </div>

        {/* Intro Style Selector */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #374151', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '18px', color: '#e11d48', margin: 0, fontWeight: legibilityMode ? 'bold' : 'normal' }}>🎧 인트로 스타일 설정 (Intro Vibe)</h3>
                {project.introStyle && (
                    <button 
                        onClick={() => onUpdate({ introStyle: undefined })}
                        style={{ 
                            fontSize: '12px', padding: '6px 12px', backgroundColor: '#374151', 
                            border: '1px solid #4b5563', color: legibilityMode ? '#FFFFFF' : '#d1d5db', borderRadius: '6px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '5px'
                        }}
                        title="선택된 인트로 스타일을 해제합니다"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                        선택 해제 (Clear)
                    </button>
                )}
            </div>
            <p style={{ fontSize: '13px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', marginBottom: '20px' }}>
                원하는 인트로 분위기를 선택하면 <strong>가사(Lyrics)</strong>와 <strong>사운드(Prompt)</strong> 생성에 자동으로 반영됩니다.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {INTRO_STYLES.map(style => {
                    const isSelected = project.introStyle === style.id;
                    return (
                        <div 
                            key={style.id}
                            onClick={() => onUpdate({ introStyle: style.id })}
                            style={{ 
                                padding: '15px', 
                                backgroundColor: isSelected ? 'rgba(225, 29, 72, 0.15)' : '#1f2937', 
                                border: isSelected ? '1px solid #e11d48' : '1px solid #374151',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            {isSelected && <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#e11d48' }}>✔</div>}
                            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px', color: isSelected ? '#fbbf24' : 'white' }}>
                                {style.label}
                            </div>
                            <div style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', lineHeight: '1.4' }}>
                                {style.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* TIP Section */}
        <div className="responsive-grid-2" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
             <div style={{ padding: '20px', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: '#fbbf24' }}>💡 구조 설계 팁 (Structure Tips)</h3>
                <ul style={{ fontSize: '13px', color: legibilityMode ? '#FFFFFF' : '#d1d5db', paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li><strong>3분 이상 곡 만들기:</strong> [Intro] - [Verse] - [Chorus] - [Verse] - [Chorus] - [Bridge] - [Chorus] - [Outro] 구조를 추천합니다.</li>
                    <li><strong>빌드업:</strong> Chorus 전에 Bridge를 배치하면 감정을 고조시킬 수 있습니다.</li>
                    <li><strong>K-Pop 스타일:</strong> 인트로에 'Whisper Narration'을 추가하여 트렌디함을 살려보세요.</li>
                </ul>
             </div>

            <div style={{ padding: '20px', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: legibilityMode ? '#FFFFFF' : 'white' }}>🎧 K-Pop 시그니처 & 엔딩 설정</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[0]?.type === 'Intro' && project.structure[0]?.description.includes('Signature')} 
                               onChange={(e) => {
                                   if (e.target.checked) {
                                       const desc = project.djName ? `Signature Sound Intro (Producer Tag: ${project.djName})` : 'Signature Sound Intro (Catchy start)';
                                       if (project.structure[0].type !== 'Intro') {
                                           const newStructure = [{ id: Date.now().toString(), type: 'Intro', description: desc, duration: 4 }, ...project.structure];
                                           onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[0] = { ...newStructure[0], description: desc };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        Signature Sound Intro (시그니처 사운드)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[project.structure.length-1]?.type === 'Outro' && project.structure[project.structure.length-1]?.description.includes('Ending')} 
                                onChange={(e) => {
                                   if (e.target.checked) {
                                       // Logic to ensure outro exists
                                       const desc = 'Ending Pose & Fade Out';
                                       const last = project.structure[project.structure.length-1];
                                       if (last.type !== 'Outro') {
                                            const newStructure = [...project.structure, { id: Date.now().toString(), type: 'Outro', description: desc, duration: 4 }];
                                            onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[newStructure.length-1] = { ...newStructure[newStructure.length-1], description: desc };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        Ending Fairy Outro (엔딩 요정 / 페이드 아웃)
                    </label>
                    
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1f2937', borderRadius: '6px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: legibilityMode ? '#FFFFFF' : '#9ca3af', marginBottom: '5px' }}>DJ/Producer Name (시그니처 태그)</label>
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                            <input 
                                type="text" 
                                value={project.djName || ''}
                                onChange={(e) => onUpdate({ djName: e.target.value })}
                                placeholder="예: DJ Seoul, Brave Sound (입력시 Intro에 반영)"
                                style={{ flex: 1, padding: '8px', backgroundColor: '#374151', border: 'none', color: 'white', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                            />
                            <button 
                                onClick={handleSaveDjName}
                                title="현재 이름을 리스트에 저장"
                                style={{ padding: '0 10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: '#10b981', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                            </button>
                        </div>

                        {/* Saved Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {savedDjNames.map((name, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => onUpdate({ djName: name })}
                                    style={{ 
                                        fontSize: '11px', padding: '4px 8px', borderRadius: '12px', 
                                        backgroundColor: '#111827', border: '1px solid #4b5563', 
                                        color: legibilityMode ? '#FFFFFF' : '#d1d5db', cursor: 'pointer', 
                                        display: 'flex', alignItems: 'center', gap: '4px' 
                                    }}
                                >
                                    {name} 
                                    <span 
                                        onClick={(e) => handleDeleteDjName(e, name)} 
                                        style={{ fontSize: '14px', color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                        
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: '8px 0 0 0' }}>* 이름을 입력하고 체크박스를 켜면 Intro 블록에 시그니처 사운드 태그가 자동 추가됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StructureTab;