import React, { useState } from 'react';
import { Type } from "@google/genai";
import { getGenAI } from './utils';
import { Project, SongBlock } from './types';

interface LyricsVariationsPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    legibilityMode: boolean;
    modelTier: 'stable' | 'pro';
}

const LyricsVariationsPanel = ({ project, onUpdate, legibilityMode, modelTier }: LyricsVariationsPanelProps) => {
    const [loadingVariations, setLoadingVariations] = useState(false);
    
    // Derived state from project persistence
    const variations = project.lyricVariations || [];
    const selectedVariationIndex = project.selectedLyricVariationIndex ?? null;
    const focusedCardIndex = project.focusedLyricVariationIndex ?? null;

    const generateVariations = async () => {
        setLoadingVariations(true);
        try {
            const structureText = project.structure.map((s: SongBlock) => `[${s.type}]: ${s.description}`).join('\n');
            const prompt = `
              Generate 5 distinct and creative lyric concepts for a ${project.genre} song.
              Topic: ${project.concept || 'Freestyle'}
              Mood: ${project.mood}
              Style: ${project.styleDescription || 'Standard'}
              
              CRITICAL: Follow this Structure strictly in this exact order for all 5 variations:
              ${structureText}
              
              Requirements:
              1. Create 5 different versions (e.g., Emotional, Rhythmic, Story-telling, Minimal, Energetic).
              2. For each version, provide:
                 - "title": A catchy title.
                 - "rationale": A brief description (in Korean) of the style/vibe.
                 - "lyrics": The full lyrics structured with tags like [Verse], [Chorus]. Do NOT include BPM or Metadata headers.
              3. Ensure lyrics are suitable for Suno.ai (musical generation).
              4. CRITICAL: Every version MUST include lyrics for EACH block defined in the structure in the exact order provided. Do not skip blocks or change their order.
              
              Return ONLY a JSON array of 5 objects.
              Schema: [{ title: string, rationale: string, lyrics: string }]
            `;
  
            // Model Selection with 2-Layer Fallback (Updated)
            const primaryModel = modelTier === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
            const genAI = getGenAI();
            const config = {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            rationale: { type: Type.STRING },
                            lyrics: { type: Type.STRING }
                        },
                        required: ['title', 'rationale', 'lyrics']
                    }
                }
            };

            let response: any;
            try {
                response = await genAI.models.generateContent({
                    model: primaryModel,
                    contents: prompt,
                    config: config
                });
            } catch (firstError) {
                console.warn(`Variation gen failed on ${primaryModel}, trying fallback...`, firstError);
                // Fallback to gemini-2.0-flash (Stable)
                if (modelTier === 'stable') {
                    try {
                        response = await genAI.models.generateContent({
                            model: 'gemini-2.0-flash',
                            contents: prompt,
                            config: config
                        });
                    } catch (secondError) {
                         throw secondError;
                    }
                } else {
                    throw firstError;
                }
            }
          
          const data = JSON.parse(response.text || '[]');
          onUpdate({ lyricVariations: data, selectedLyricVariationIndex: null, focusedLyricVariationIndex: null });
        } catch (e: any) {
            console.error(e);
            let msg = `아이디어 생성 오류 (${modelTier} 모드)`;
            if (e.message?.includes('429') || e.message?.includes('quota')) {
                msg += '\n⚠️ 무료 사용량 초과 (잠시 후 다시 시도하세요)';
            }
            alert(msg);
        }
        setLoadingVariations(false);
    };

    const applyVariation = (v: any, index: number) => {
        if (confirm('이 가사를 에디터에 적용하시겠습니까? (기존 내용은 덮어씌워집니다)')) {
            onUpdate({ lyrics: v.lyrics, selectedLyricVariationIndex: index });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderLeft: '1px solid #374151', borderRight: '1px solid #374151', padding: '0 20px' }}>
            <h2 style={{ fontSize: '20px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#3b82f6', display:'flex', alignItems:'center', gap:'10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                <span className="material-symbols-outlined">lightbulb</span> 아이디어 (5 Variations)
                <span style={{ fontSize: '12px', color: modelTier === 'pro' ? '#818cf8' : '#6b7280', marginLeft: 'auto', border: `1px solid ${modelTier === 'pro' ? '#818cf8' : '#4b5563'}`, padding: '4px 8px', borderRadius: '4px', fontWeight: 'normal' }}>
                     Model: {modelTier === 'pro' ? 'Gemini 3.0 Pro' : 'Gemini 3.0 Flash'}
                </span>
            </h2>
            
            <div style={{ backgroundColor: '#1e3a8a', borderRadius: '8px', padding: '15px' }}>
                <p style={{ fontSize: '12px', color: '#bfdbfe', margin: '0 0 10px 0' }}>
                    주제와 무드에 맞는 5가지 다른 스타일의 가사를 제안받아보세요. (설정한 구조가 반영됩니다)
                </p>
                <button 
                   onClick={generateVariations}
                   disabled={loadingVariations}
                   style={{ 
                       width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', 
                       border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loadingVariations ? 'wait' : 'pointer',
                       display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                   }}
                >
                   {loadingVariations ? '아이디어 구상 중...' : <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>auto_awesome</span> 5가지 버전 생성하기</>}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {variations.length > 0 ? variations.map((v: any, i: number) => {
                    const isApplied = selectedVariationIndex === i;
                    const isSelected = focusedCardIndex === i;

                    let borderColor = '#4b5563';
                    let bgColor = '#1f2937';
                    let boxShadow = 'none';
                    let transform = 'scale(1)';

                    if (isApplied) {
                       borderColor = '#34d399';
                       bgColor = 'rgba(6, 78, 59, 0.4)';
                       boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
                       transform = 'scale(1.02)';
                    }
                    
                    if (isSelected) {
                        borderColor = '#3b82f6';
                        if (!isApplied) {
                           bgColor = 'rgba(59, 130, 246, 0.15)';
                           transform = 'scale(1.02)';
                        }
                    }

                    return (
                        <div key={i} 
                            onClick={() => onUpdate({ focusedLyricVariationIndex: i })}
                            style={{ 
                            backgroundColor: bgColor, 
                            borderRadius: '8px', 
                            border: `2px solid ${borderColor}`,
                            padding: '15px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '8px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: boxShadow,
                            transform: transform,
                            cursor: 'pointer'
                        }}>
                            <div style={{ fontWeight: 'bold', color: isApplied ? '#34d399' : (isSelected ? '#60a5fa' : '#fbbf24'), fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                               <span>{i+1}. {v.title}</span>
                               {isApplied && <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#34d399' }}>check_circle</span>}
                            </div>
                            <div style={{ fontSize: '12px', color: isApplied ? '#d1fae5' : (legibilityMode ? '#E5E7EB' : '#9ca3af'), lineHeight: '1.4' }}>{v.rationale}</div>
                            <button 
                               onClick={(e) => {
                                   e.stopPropagation();
                                   applyVariation(v, i);
                               }}
                               style={{ 
                                   marginTop: '5px', 
                                   padding: '10px', 
                                   backgroundColor: isApplied ? '#10b981' : '#374151', 
                                   border: 'none', 
                                   borderRadius: '6px', 
                                   color: 'white', 
                                   fontSize: '13px', 
                                   cursor: 'pointer', 
                                   display: 'flex', 
                                   alignItems: 'center', 
                                   justifyContent: 'center', 
                                   gap: '8px',
                                   fontWeight: isApplied ? 'bold' : '500',
                                   transition: 'all 0.2s',
                                   boxShadow: isApplied ? '0 4px 6px rgba(0,0,0,0.2)' : 'none'
                               }}
                            >
                               {isApplied ? (
                                   <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span> 적용됨 (Applied)</>
                               ) : (
                                   <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span> 에디터로 적용</>
                               )}
                            </button>
                        </div>
                    );
                }) : (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#4b5563' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>library_music</span>
                        <p style={{ fontSize: '13px' }}>생성된 아이디어가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LyricsVariationsPanel;