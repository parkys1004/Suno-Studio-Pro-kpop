
import React, { useState } from 'react';
import { Project, SongBlock } from './types';
import { BLOCK_SAMPLES, STRUCTURE_TEMPLATES, INTRO_STYLES } from './constants';

// --- TAB: Structure ---
const StructureTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('Custom');

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
    setSelectedTemplate(templateName);
    if (templateName === 'Custom') return;

    // @ts-ignore
    const template = STRUCTURE_TEMPLATES[templateName];
    if (template) {
        const newStructure = template.map((block: any, idx: number) => ({
            ...block,
            id: Date.now().toString() + idx
        }));
        onUpdate({ structure: newStructure });
    }
  };

  const titleColor = legibilityMode ? '#FFFFFF' : 'white';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal' }}>🎹 곡 구조 설계 (Structure Editor)</h2>
        
        <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ color: legibilityMode ? '#FFFFFF' : '#d1d5db', fontSize: '14px' }}>구조 템플릿 불러오기:</span>
            <select 
                value={selectedTemplate} 
                onChange={(e) => applyTemplate(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563' }}
            >
                {Object.keys(STRUCTURE_TEMPLATES).map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
            <span style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af' }}>* 선택 시 현재 구조가 변경됩니다.</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['Intro', 'Verse', 'Chorus', 'Bridge', 'Drop', 'Instrumental', 'Outro'].map(type => (
                <button 
                    key={type} 
                    onClick={() => addBlock(type)}
                    style={{ padding: '8px 16px', backgroundColor: '#374151', border: 'none', borderRadius: '20px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + {type}
                </button>
            ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'flex-start' }}>
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
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', color: legibilityMode ? '#FFFFFF' : 'white' }}>🎧 DJ/Producer Intro/Outro 설정</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[0]?.type === 'Intro' && project.structure[0]?.description.includes('DJ')} 
                               onChange={(e) => {
                                   if (e.target.checked) {
                                       if (project.structure[0].type !== 'Intro') {
                                           const newStructure = [{ id: Date.now().toString(), type: 'Intro', description: 'DJ Friendly Intro (Percussion only)', duration: 4 }, ...project.structure];
                                           onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[0] = { ...newStructure[0], description: 'DJ Friendly Intro (Percussion only)' };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        DJ Friendly Intro (Percussion Only)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: legibilityMode ? '#FFFFFF' : 'inherit' }}>
                        <input type="checkbox" checked={project.structure[project.structure.length-1]?.type === 'Outro' && project.structure[project.structure.length-1]?.description.includes('DJ')} 
                                onChange={(e) => {
                                   if (e.target.checked) {
                                       // Logic to ensure outro exists
                                       const last = project.structure[project.structure.length-1];
                                       if (last.type !== 'Outro') {
                                            const newStructure = [...project.structure, { id: Date.now().toString(), type: 'Outro', description: 'DJ Friendly Outro (Beat loop)', duration: 4 }];
                                            onUpdate({ structure: newStructure });
                                       } else {
                                            const newStructure = [...project.structure];
                                            newStructure[newStructure.length-1] = { ...newStructure[newStructure.length-1], description: 'DJ Friendly Outro (Beat loop)' };
                                            onUpdate({ structure: newStructure });
                                       }
                                   }
                               }}
                        /> 
                        DJ Friendly Outro (Mixable Loop)
                    </label>
                    
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1f2937', borderRadius: '6px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: legibilityMode ? '#FFFFFF' : '#9ca3af', marginBottom: '5px' }}>DJ/Producer Name (가사에 포함)</label>
                        <input 
                            type="text" 
                            value={project.djName || ''}
                            onChange={(e) => onUpdate({ djName: e.target.value })}
                            placeholder="예: DJ Seoul (입력시 Intro에 시그니처 반영)"
                            style={{ width: '100%', padding: '8px', backgroundColor: '#374151', border: 'none', color: 'white', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                           <button 
                               onClick={() => onUpdate({ djName: 'Brave Brothers' })}
                               style={{ 
                                   background: 'transparent', border: '1px solid #4b5563', borderRadius: '12px', 
                                   color: legibilityMode ? '#FFFFFF' : '#9ca3af', padding: '4px 10px', fontSize: '11px', cursor: 'pointer',
                                   transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '5px'
                               }}
                               onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#e11d48'; e.currentTarget.style.color = '#e11d48';}}
                               onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#4b5563'; e.currentTarget.style.color = legibilityMode ? '#FFFFFF' : '#9ca3af';}}
                           >
                               <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>smart_toy</span>
                               Apply "Brave Brothers" Style
                           </button>
                        </div>
                        <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0 0 0' }}>* 이름을 입력하면 가사 생성 시 Intro 또는 Outro 중 한 곳에만 "JYP!" 처럼 시그니처 사운드가 추가됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StructureTab;
