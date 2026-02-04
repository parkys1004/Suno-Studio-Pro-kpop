import React, { useState, useEffect } from 'react';
import { Project, SamplePrompt } from './types';
import { getGenAI } from './utils';
import { INTRO_STYLES, DEFAULT_SAMPLE_PROMPTS } from './constants';
import SoundPromptCheatSheet from './SoundPromptCheatSheet';
import SoundCustomPromptModal from './SoundCustomPromptModal';

interface SoundGeneratorPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    legibilityMode: boolean;
    modelTier: 'stable' | 'pro';
    useStrictDanceMode: boolean;
    labelColor: string;
}

const SoundGeneratorPanel = ({ project, onUpdate, legibilityMode, modelTier, useStrictDanceMode, labelColor }: SoundGeneratorPanelProps) => {
    const [loading, setLoading] = useState(false);
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    const [localPrompt, setLocalPrompt] = useState(project.sunoPrompt || '');
    const [sunoVersion, setSunoVersion] = useState<'v3.5' | 'v5'>('v5');
    const [promptStyle, setPromptStyle] = useState<'structured' | 'simple'>('structured');
    const [samplePrompts, setSamplePrompts] = useState<SamplePrompt[]>([]);
    const [isAddPromptOpen, setIsAddPromptOpen] = useState(false);
    
    // Tooltip State for this panel
    const [tooltip, setTooltip] = useState<{text: string, x: number, y: number} | null>(null);

    useEffect(() => {
        setLocalPrompt(project.sunoPrompt || '');
    }, [project.sunoPrompt]);

    useEffect(() => {
        const savedPrompts = localStorage.getItem('suno_custom_prompts');
        if (savedPrompts) {
            setSamplePrompts(JSON.parse(savedPrompts));
        } else {
            setSamplePrompts(DEFAULT_SAMPLE_PROMPTS);
        }
    }, []);

    const saveSamplePrompts = (prompts: SamplePrompt[]) => {
        setSamplePrompts(prompts);
        localStorage.setItem('suno_custom_prompts', JSON.stringify(prompts));
    };

    const handleAddPrompt = (label: string, text: string) => {
        const updated = [...samplePrompts, { label, text }];
        saveSamplePrompts(updated);
        setIsAddPromptOpen(false);
    };

    const deleteSamplePrompt = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        const updated = [...samplePrompts];
        updated.splice(index, 1);
        saveSamplePrompts(updated);
    };

    const addCheatSheetTag = (tag: string) => {
        setLocalPrompt(prev => {
            const trimmed = prev.trim();
            if (trimmed.length > 0 && !trimmed.endsWith(',')) {
                return `${trimmed}, ${tag}`;
            }
            return `${trimmed} ${tag}`;
        });
    };

    const handleSavePrompt = () => {
        onUpdate({ sunoPrompt: localPrompt });
        const btn = document.getElementById('save-prompt-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = 'Saved!';
            setTimeout(() => { btn.innerText = originalText; }, 1500);
        }
    };
  
    const copyToClipboard = () => {
        navigator.clipboard.writeText(localPrompt);
        alert('Prompt Copied!');
    };

    const generateWithFallback = async (primaryModel: string, prompt: string, config: any) => {
        const genAI = getGenAI();
        try {
            return await genAI.models.generateContent({ model: primaryModel, contents: prompt, config });
        } catch (e1) {
            console.warn(`${primaryModel} failed. Trying 2.0...`, e1);
            if (modelTier === 'stable') {
                try {
                    return await genAI.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt, config });
                } catch (e2) {
                    throw e2; // Do not fall back to 1.5, allow error to bubble if 2.0 fails
                }
            }
            throw e1;
        }
    };

    const generatePrompt = async () => {
        setLoading(true);
        try {
            // Model Selection
            const modelName = modelTier === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
            
            let danceInstruction = '';
            if (useStrictDanceMode) {
                 danceInstruction = `
                 STRICT DANCE MODE:
                 - The beat MUST be constant and steady (Metronomic).
                 - Emphasis on the "1" count.
                 - Clear percussion suitable for K-Pop choreography.
                 `;
            }
    
            let introInstruction = '';
            if (project.introStyle) {
                const style = INTRO_STYLES.find(s => s.id === project.introStyle);
                if (style) {
                    introInstruction = `Intro Style: ${style.sunoTags}`;
                }
            }
    
            // Add Reference Song Instruction
            let referenceInstruction = '';
            if (project.referenceSongTitle) {
                 referenceInstruction = `Reference Style: "${project.referenceSongTitle}"${project.referenceArtist ? ` by ${project.referenceArtist}` : ''}. Use this song as a sonic reference (vibe, mixing, instrumentation).`;
            }
    
            const versionContext = sunoVersion === 'v5' 
                ? "Suno v5 (Latest). Focus on natural language descriptions." 
                : "Suno.ai v3.5 (Standard).";
    
            // Logic based on Prompt Style Selection
            let structureInstruction = '';
    
            if (promptStyle === 'structured') {
                // 5-Step Structure
                structureInstruction = `
                STRICT REQUIREMENT: Generate the prompt adhering to the following 5-step structure logic (output as a single cohesive paragraph).
                
                Structure Steps:
                1. Identity: Define vocalist gender (based on Vocal Type) and genre in exactly one sentence.
                2. Mood: Specify tempo (${project.bpm} BPM), emotional mood, and key (${project.key}).
                3. Instruments: List instruments (${(project.instruments || []).join(', ')}) using playing verbs (e.g., plays, provides, supports, riffs) instead of just nouns.
                4. Performance: Describe vocal texture, delivery style, register/range, and phrasing.
                5. Production: Describe the acoustic space, reverb amount, mix placement, and sonic characteristics (e.g., saturation, lofi, clean).
                
                Example of desired style: "A male K-pop singer performs an energetic track. The tempo is fast at 130 BPM in F# minor. Distorted synthesizers riff aggressively while a heavy 808 bass supports the rhythm. The vocals are powerful and breathy with tight phrasing. The production is clean with wide stereo width and modern saturation."
                `;
            } else {
                // Basic Tags
                structureInstruction = `
                Requirement:
                - Create a high-quality comma-separated list of tags and style descriptors.
                - Include genre, mood, key instruments, vocal type, and production style.
                - Add style adjectives (e.g., 'atmospheric', 'heavy', 'uplifting').
                - Format: "[Tag 1], [Tag 2], [Tag 3], ..."
                - Limit to around 200 characters max.
                `;
            }
    
            const prompt = `
              Construct a high-quality prompt for a music generation AI (${versionContext}).
              
              CRITICAL RULE: Do NOT include specific Artist Names or Song Titles in the output. Suno blocks artist names.
              Instead, translate the style of "${project.referenceSongTitle || ''} ${project.referenceArtist || ''}" into technical musical terms (e.g., genre, instruments, vocal style, bpm, mood).
    
              Project Metadata:
              - Genre: ${project.genre} (${project.subGenre})
              - Mood: ${project.mood}
              - Style: ${project.styleDescription}
              - Instruments: ${(project.instruments || []).join(', ')}
              - Vocal Type: ${project.vocalType}
              - BPM: ${project.bpm}
              - Key: ${project.key}
              
              ${referenceInstruction}
              ${danceInstruction}
              ${introInstruction}
    
              ${structureInstruction}
              
              Output ONLY the prompt string.
            `;
            
            const config: any = {};
            if (modelTier === 'pro') {
                config.thinkingConfig = { thinkingBudget: 1024 };
            }

            const response: any = await generateWithFallback(modelName, prompt, config);
            onUpdate({ sunoPrompt: response.text });
        } catch (e) {
            alert('Prompt generation failed. Please check your connection or API key.');
        }
        setLoading(false);
    };

    const generateCompositionAdvice = async () => {
        setLoadingAdvice(true);
        try {
            const modelName = modelTier === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
            const prompt = `
              Provide professional AI music composition suggestions for a ${project.genre} (${project.subGenre}) song.
              Mood: ${project.mood}. 
              BPM: ${project.bpm}. 
              Key: ${project.key}. 
              Instruments: ${project.instruments.join(', ')}.
    
              Requirements:
              - Provide structured advice in Korean.
              - Focus on 3 categories: 
                1. Rhythmic Patterns (리듬 가이드)
                2. Melodic Style (멜로디 제안)
                3. Harmonic Progression (추천 코드 진행)
              - Be specific to the genre.
              - keep it concise and actionable for someone creating music in Suno.ai.
              - Format with Markdown.
            `;
    
            const response: any = await generateWithFallback(modelName, prompt, {});
            onUpdate({ compositionAdvice: response.text });
        } catch (e) {
            alert('Composition advice generation failed');
        }
        setLoadingAdvice(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {/* Tooltip */}
            {tooltip && (
              <div style={{
                  position: 'fixed',
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: 'translate(-50%, -100%)',
                  backgroundColor: '#111827',
                  color: '#fbbf24',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  pointerEvents: 'none',
                  zIndex: 9999,
                  border: '1px solid #4b5563',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
              }}>
                  {tooltip.text}
                  <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #4b5563' }}></div>
              </div>
            )}

            <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                <span className="material-symbols-outlined">auto_awesome</span> 생성 (Prompt)
                <span style={{ fontSize: '12px', color: modelTier === 'pro' ? '#818cf8' : '#6b7280', marginLeft: 'auto', border: `1px solid ${modelTier === 'pro' ? '#818cf8' : '#4b5563'}`, padding: '4px 8px', borderRadius: '4px' }}>
                      Model: {modelTier === 'pro' ? 'Gemini 3.0 Pro' : 'Gemini 3.0 Flash'}
                </span>
            </h2>

            {/* Version Selector */}
            <div style={{ display: 'flex', backgroundColor: '#111827', padding: '4px', borderRadius: '8px', gap: '4px', border: '1px solid #374151' }}>
                <button onClick={() => setSunoVersion('v3.5')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: sunoVersion === 'v3.5' ? '#374151' : 'transparent', color: sunoVersion === 'v3.5' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>Suno v3.5</button>
                <button onClick={() => setSunoVersion('v5')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: sunoVersion === 'v5' ? '#e11d48' : 'transparent', color: sunoVersion === 'v5' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>Suno v5 (Pro)</button>
            </div>

            {/* Prompt Style Selector */}
            <div>
                <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '8px' }}>프롬프트 스타일 (Prompt Style)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setPromptStyle('structured')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: promptStyle === 'structured' ? '1px solid #3b82f6' : '1px solid #4b5563', backgroundColor: promptStyle === 'structured' ? 'rgba(59, 130, 246, 0.15)' : '#1f2937', color: promptStyle === 'structured' ? '#3b82f6' : '#9ca3af', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>article</span> 5단계 구조화
                    </button>
                    <button onClick={() => setPromptStyle('simple')} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: promptStyle === 'simple' ? '1px solid #fbbf24' : '1px solid #4b5563', backgroundColor: promptStyle === 'simple' ? 'rgba(251, 191, 36, 0.15)' : '#1f2937', color: promptStyle === 'simple' ? '#fbbf24' : '#9ca3af', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                       <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>label</span> 기본 생성 (Tag)
                    </button>
                </div>
                {promptStyle === 'structured' && (
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', fontSize: '12px', color: '#93c5fd' }}>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>ℹ️ 5단계 생성 정보 (Data Sources):</strong>
                        <ul style={{ margin: 0, paddingLeft: '15px', lineHeight: '1.5' }}>
                            <li><strong>1. Identity:</strong> 장르 ({project.genre}) + 보컬 타입 ({project.vocalType})</li>
                            <li><strong>2. Mood:</strong> 분위기 ({project.mood}) + BPM ({project.bpm}) + Key ({project.key})</li>
                            <li><strong>3. Instruments:</strong> 선택된 악기 ({project.instruments ? project.instruments.length : 0}개)</li>
                            <li><strong>4. Performance:</strong> 스타일 설명 (Style Description)</li>
                            <li><strong>5. Production:</strong> 음향 공간감 및 믹싱 스타일</li>
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={generatePrompt} disabled={loading} style={{ flex: '1 1 120px', padding: '15px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {loading ? 'Generating...' : <><span className="material-symbols-outlined">auto_fix_high</span> 프롬프트 생성</>}
                </button>
                <button onClick={generateCompositionAdvice} disabled={loadingAdvice} style={{ flex: '1 1 120px', padding: '15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {loadingAdvice ? 'Guiding...' : <><span className="material-symbols-outlined">music_note</span> AI 작곡 가이드</>}
                </button>
            </div>

            <SoundPromptCheatSheet onAddTag={addCheatSheetTag} setTooltip={setTooltip} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <textarea 
                    value={localPrompt}
                    onChange={e => setLocalPrompt(e.target.value)}
                    placeholder="Suno.ai 프롬프트가 여기에 생성됩니다."
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #374151', color: '#fbbf24', resize: 'none', fontFamily: 'monospace', minHeight: '120px', boxSizing: 'border-box' }}
                />
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                     <span style={{ fontSize: '11px', color: '#6b7280' }}>
                        {localPrompt.length} chars
                     </span>
                     <div style={{ display: 'flex', gap: '8px' }}>
                        <button id="save-prompt-btn" onClick={handleSavePrompt} style={{ padding: '6px 12px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Save</button>
                        <button 
                            onClick={copyToClipboard} 
                            style={{ 
                                padding: '8px 16px', backgroundColor: '#10b981', 
                                color: 'white', border: 'none', borderRadius: '8px', 
                                fontSize: '13px', cursor: 'pointer', fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>content_copy</span> 프롬프트 복사
                        </button>
                    </div>
                </div>
              </div>

              {project.compositionAdvice && (
                  <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginTop: '10px' }}>
                      <h3 style={{ margin: '0 0 15px 0', color: '#3b82f6', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="material-symbols-outlined">lightbulb</span> AI 작곡 제안 (Composition Advice)
                      </h3>
                      <div style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: '1.6', paddingRight: '10px', whiteSpace: 'pre-wrap' }}>
                          {project.compositionAdvice}
                      </div>
                  </div>
              )}
            </div>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid #374151', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <p style={{ fontSize: '13px', color: labelColor, margin: 0 }}>📌 Quick Sample Prompts</p>
                  <button onClick={() => setIsAddPromptOpen(true)} style={{ background: 'transparent', border: '1px solid #4b5563', color: labelColor, borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}>+ Add Custom</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {samplePrompts.map((sample, idx) => (
                      <div key={idx} style={{ position: 'relative', display: 'inline-flex' }}>
                          <button 
                              onClick={() => onUpdate({ sunoPrompt: sample.text })}
                              style={{ padding: '6px 24px 6px 10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '15px', color: legibilityMode ? '#FFFFFF' : '#d1d5db', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#374151'; e.currentTarget.style.borderColor = '#6b7280'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1f2937'; e.currentTarget.style.borderColor = '#374151'; }}
                              title={sample.text}
                          >
                              {sample.label}
                          </button>
                          <span onClick={(e) => deleteSamplePrompt(e, idx)} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#ef4444', cursor: 'pointer', opacity: 0.6 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}>&times;</span>
                      </div>
                  ))}
              </div>
            </div>

            {isAddPromptOpen && <SoundCustomPromptModal onClose={() => setIsAddPromptOpen(false)} onSave={handleAddPrompt} labelColor={labelColor} />}
        </div>
    );
};

export default SoundGeneratorPanel;