
import React, { useState, useEffect } from 'react';
import { getGenAI } from './utils';
import { Project, SamplePrompt, InstrumentPreset } from './types';
import { INTRO_STYLES, DEFAULT_SAMPLE_PROMPTS, GENRE_PRESETS, INSTRUMENTS } from './constants';

// --- TAB: Sound ---
const SoundTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [useStrictDanceMode, setUseStrictDanceMode] = useState(true);
  const [samplePrompts, setSamplePrompts] = useState<SamplePrompt[]>([]);
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false);
  const [newPromptForm, setNewPromptForm] = useState({ label: '', text: '' });
  const [localPrompt, setLocalPrompt] = useState(project.sunoPrompt || '');
  const [isDetectingBPM, setIsDetectingBPM] = useState(false);
  const [sunoVersion, setSunoVersion] = useState<'v3.5' | 'v5'>('v5');
  const [isDanceGuideOpen, setIsDanceGuideOpen] = useState(false);
  
  // NEW: Prompt Style State (Structured vs Simple)
  const [promptStyle, setPromptStyle] = useState<'structured' | 'simple'>('structured');
  
  // Custom Instrument Preset State
  const [customInstrumentPresets, setCustomInstrumentPresets] = useState<InstrumentPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');

  // Constants specific to SoundTab - UPDATED FOR KPOP
  const DANCE_GUIDE = [
    { genre: 'Girl Crush', bpm: '130 - 140', key: 'F#m, C#m', desc: '강렬한 퍼포먼스. 묵직한 베이스 비트 필수.' },
    { genre: 'Cheongryang (Cool)', bpm: '115 - 126', key: 'C, G, D', desc: '청량한 느낌. 달리기 쉬운 템포.' },
    { genre: 'K-HipHop / Trap', bpm: '140 - 150', key: 'Am, Gm', desc: '빠른 하이햇과 808 베이스. 스웨그 안무.' },
    { genre: 'TikTok Challenge', bpm: '128 - 130', key: 'Any', desc: '짧고 반복적인 동작에 최적화된 하우스 리듬.' },
    { genre: 'Fusion Gugak', bpm: '90 - 110', key: 'Dm, Em', desc: '굿거리 장단이나 자진모리를 현대적으로 해석.' },
    { genre: 'Ballad (Choreo)', bpm: '70 - 90', key: 'Bb, Eb', desc: '현대무용 스타일의 서정적인 안무.' },
    { genre: 'Disco / Retro', bpm: '120 - 124', key: 'E, A', desc: '복고풍 댄스. 정박자가 매우 중요.' },
  ];

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

    const savedInstrumentPresets = localStorage.getItem('suno_instrument_presets');
    if (savedInstrumentPresets) {
        setCustomInstrumentPresets(JSON.parse(savedInstrumentPresets));
    }
  }, []);

  const saveSamplePrompts = (prompts: SamplePrompt[]) => {
      setSamplePrompts(prompts);
      localStorage.setItem('suno_custom_prompts', JSON.stringify(prompts));
  };

  const saveInstrumentPresets = (presets: InstrumentPreset[]) => {
      setCustomInstrumentPresets(presets);
      localStorage.setItem('suno_instrument_presets', JSON.stringify(presets));
  };

  const handleSaveInstrumentPreset = () => {
      if (!newPresetName.trim()) {
          alert('프리셋 이름을 입력하세요.');
          return;
      }
      if (project.instruments.length === 0) {
          alert('최소 하나 이상의 악기를 선택해야 합니다.');
          return;
      }
      const updated = [...customInstrumentPresets, { name: newPresetName.trim(), instruments: [...project.instruments] }];
      saveInstrumentPresets(updated);
      setNewPresetName('');
  };

  const handleDeleteInstrumentPreset = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      const updated = [...customInstrumentPresets];
      updated.splice(index, 1);
      saveInstrumentPresets(updated);
  };

  const applyInstrumentPreset = (preset: InstrumentPreset) => {
      onUpdate({ instruments: preset.instruments });
  };

  const deleteSamplePrompt = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      const updated = [...samplePrompts];
      updated.splice(index, 1);
      saveSamplePrompts(updated);
  };

  const handleAddPrompt = () => {
      if (!newPromptForm.label || !newPromptForm.text) {
          alert('Label and Text are required');
          return;
      }
      const updated = [...samplePrompts, newPromptForm];
      saveSamplePrompts(updated);
      setNewPromptForm({ label: '', text: '' });
      setIsAddPromptOpen(false);
  };

  const toggleInstrument = (inst: string) => {
      const newInsts = project.instruments.includes(inst) 
        ? project.instruments.filter((i: string) => i !== inst)
        : [...project.instruments, inst];
      onUpdate({ instruments: newInsts });
  };

  const handleBpmUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      if (file.size > 10 * 1024 * 1024) {
          alert('File is too large. Please use a clip under 10MB.');
          return;
      }

      setIsDetectingBPM(true);
      try {
          const base64Data = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                  const result = reader.result as string;
                  const base64 = result.split(',')[1];
                  resolve(base64);
              };
              reader.onerror = reject;
          });

          const prompt = "Analyze the tempo of this audio clip. Estimate the BPM (Beats Per Minute). Return ONLY the integer number (e.g. 120). Do not write any other text.";
          
          const response: any = await getGenAI().models.generateContent({
              model: 'gemini-2.5-flash',
              contents: {
                  parts: [
                      { text: prompt },
                      {
                          inlineData: {
                              mimeType: file.type,
                              data: base64Data
                          }
                      }
                  ]
              }
          });

          const text = response.text?.trim();
          const bpmMatch = text?.match(/\d+/);
          
          if (bpmMatch) {
              const bpm = parseInt(bpmMatch[0]);
              if (bpm > 0 && bpm < 300) {
                   onUpdate({ bpm });
                   alert(`BPM Detected: ${bpm}`);
              } else {
                   alert('Detected value seems invalid. Please try again.');
              }
          } else {
              alert('Could not detect BPM from the audio.');
          }
      } catch (e) {
          console.error(e);
          alert('Failed to analyze audio.');
      } finally {
          setIsDetectingBPM(false);
          e.target.value = '';
      }
  };

  const generatePrompt = async () => {
    setLoading(true);
    try {
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

        const response: any = await getGenAI().models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt,
        });
        
        onUpdate({ sunoPrompt: response.text });
    } catch (e) {
        alert('Prompt generation failed');
    }
    setLoading(false);
  };

  const generateCompositionAdvice = async () => {
    setLoadingAdvice(true);
    try {
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

        const response: any = await getGenAI().models.generateContent({
             model: 'gemini-3-flash-preview',
             contents: prompt,
        });
        
        onUpdate({ compositionAdvice: response.text });
    } catch (e) {
        alert('Composition advice generation failed');
    }
    setLoadingAdvice(false);
  };

  const applyPreset = (preset: any) => {
      onUpdate({
          bpm: preset.bpm,
          key: preset.key,
          instruments: preset.instruments || []
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

  const titleColor = legibilityMode ? '#FFFFFF' : '#fbbf24';
  const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

  return (
      <div className="responsive-grid-3" style={{ width: '100%', height: 'calc(100vh - 150px)', display: 'grid', gridTemplateColumns: '3fr 2fr 5fr', gap: '20px', minHeight: '600px' }}>
          
          {/* Column 1: Configuration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px', borderRight: '1px solid #374151' }}>
              <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: titleColor, display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                  <span className="material-symbols-outlined">settings</span> 설정 (Config)
              </h2>

              {/* Presets */}
              <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: labelColor }}>장르 프리셋 (Presets)</label>
                  <select 
                      value={project.selectedSoundPreset || ''}
                      onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                             onUpdate({ selectedSoundPreset: "" });
                             return;
                          }
                          const preset = GENRE_PRESETS[project.genre]?.find(p => p.label === val);
                          if (preset) {
                             // Combine all updates into a single onUpdate call to prevent race conditions
                             onUpdate({
                                 bpm: preset.bpm,
                                 key: preset.key,
                                 instruments: preset.instruments || [],
                                 selectedSoundPreset: val
                             });
                          }
                      }}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#111827', color: 'white', border: '1px solid #4b5563', borderRadius: '6px' }}
                  >
                      <option value="">-- 프리셋 선택 --</option>
                      {GENRE_PRESETS[project.genre]?.map((p, i) => (
                          <option key={i} value={p.label}>{p.label}</option>
                      ))}
                  </select>
              </div>

              {/* BPM & Key */}
              <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '8px', border: '1px solid #374151' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                      {/* BPM Section */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: labelColor, fontWeight: '500' }}>BPM</label>
                          <div style={{ display: 'flex', gap: '8px', height: '42px' }}>
                             <input 
                                type="number" 
                                value={project.bpm || ''} 
                                onChange={e => {
                                  const val = parseInt(e.target.value);
                                  onUpdate({ bpm: isNaN(val) ? 0 : val });
                                }}
                                style={{ 
                                    flex: 1, padding: '0 12px', backgroundColor: '#111827', 
                                    border: '1px solid #4b5563', color: 'white', borderRadius: '6px', 
                                    minWidth: '0', height: '100%', fontSize: '14px', boxSizing: 'border-box'
                                }} 
                             />
                             <input 
                                type="file" 
                                id="bpm-upload"
                                accept="audio/*" 
                                style={{ display: 'none' }}
                                onChange={handleBpmUpload}
                             />
                             <label 
                                htmlFor="bpm-upload"
                                title="Upload audio to detect BPM"
                                style={{ 
                                    width: '42px', backgroundColor: '#374151', color: '#e5e7eb', borderRadius: '6px', 
                                    cursor: isDetectingBPM ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent:'center',
                                    flexShrink: 0, height: '100%', border: '1px solid #4b5563', boxSizing: 'border-box',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4b5563'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#374151'}
                             >
                                {isDetectingBPM ? '⏳' : <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>graphic_eq</span>}
                             </label>
                         </div>
                      </div>
                      
                      {/* Key Section */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: labelColor, fontWeight: '500' }}>Key (조성)</label>
                          <select 
                              value={project.key || ''} 
                              onChange={e => onUpdate({ key: e.target.value })}
                              style={{ 
                                  width: '100%', padding: '0 12px', backgroundColor: '#111827', 
                                  border: '1px solid #4b5563', color: 'white', borderRadius: '6px',
                                  height: '42px', fontSize: '14px', boxSizing: 'border-box', cursor: 'pointer'
                              }}
                          >
                               {['C', 'Cm', 'C#', 'C#m', 'D', 'Dm', 'Eb', 'Ebm', 'E', 'Em', 'F', 'Fm', 'F#', 'F#m', 'G', 'Gm', 'Ab', 'Abm', 'A', 'Am', 'Bb', 'Bbm', 'B', 'Bm'].map(k => (
                                   <option key={k} value={k}>{k}</option>
                               ))}
                          </select>
                      </div>
                  </div>

                  <button 
                    onClick={() => setIsDanceGuideOpen(true)}
                    style={{ 
                        width: '100%', marginBottom: '15px', padding: '8px', 
                        backgroundColor: '#374151', color: '#fbbf24', border: '1px dashed #4b5563', 
                        borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>menu_book</span>
                    BPM & Key 가이드 보기
                  </button>

                  <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: labelColor }}>보컬 타입 (Vocal Type)</label>
                      <select 
                          value={project.vocalType || ''} 
                          onChange={e => onUpdate({ vocalType: e.target.value })}
                          style={{ width: '100%', padding: '10px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '4px' }}
                      >
                          <option value="Male">Male (남성)</option>
                          <option value="Female">Female (여성)</option>
                          <option value="Duet">Duet (듀엣)</option>
                          <option value="Choir">Choir (합창)</option>
                          <option value="Instrumental">Instrumental (연주곡)</option>
                      </select>
                  </div>
              </div>
          </div>

          {/* Column 2: Instruments & Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '10px', borderRight: '1px solid #374151' }}>
              <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#e11d48', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                  <span className="material-symbols-outlined">piano</span> 악기 (Instruments)
              </h2>

               {/* Dance Mode Toggle */}
               <div 
                    onClick={() => setUseStrictDanceMode(!useStrictDanceMode)}
                    style={{ 
                        padding: '15px', backgroundColor: '#1f2937', borderRadius: '8px', 
                        border: useStrictDanceMode ? '1px solid #10b981' : '1px solid #374151', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="material-symbols-outlined" style={{ color: useStrictDanceMode ? '#10b981' : '#6b7280' }}>music_note</span>
                        <div>
                            <span style={{ display: 'block', fontWeight: 'bold', color: useStrictDanceMode ? '#10b981' : (legibilityMode ? '#FFFFFF' : '#f3f4f6'), fontSize: '13px' }}>Strict Dance Mode</span>
                            <span style={{ fontSize: '10px', color: labelColor }}>Steady beat & clear rhythm</span>
                        </div>
                    </div>
                     <div style={{ width: '36px', height: '20px', backgroundColor: useStrictDanceMode ? '#10b981' : '#4b5563', borderRadius: '10px', position: 'relative' }}>
                        <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: useStrictDanceMode ? '18px' : '2px', transition: 'left 0.2s' }} />
                    </div>
                </div>

              {/* Instrument Selection */}
              <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {INSTRUMENTS.map(inst => (
                          <button
                              key={inst}
                              onClick={() => toggleInstrument(inst)}
                              style={{
                                  padding: '6px 10px', fontSize: '11px', borderRadius: '15px', border: '1px solid',
                                  backgroundColor: project.instruments?.includes(inst) ? 'rgba(225, 29, 72, 0.2)' : '#1f2937',
                                  borderColor: project.instruments?.includes(inst) ? '#e11d48' : '#374151',
                                  color: project.instruments?.includes(inst) ? '#e11d48' : (legibilityMode ? '#E5E7EB' : '#9ca3af'),
                                  cursor: 'pointer', flexGrow: 1, textAlign: 'center'
                              }}
                          >
                              {inst}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Custom Instrument Presets */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid #374151', paddingTop: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '8px' }}>나의 악기 프리셋 (My Presets)</label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <input 
                            type="text" 
                            value={newPresetName}
                            onChange={(e) => setNewPresetName(e.target.value)}
                            placeholder="프리셋 이름..."
                            style={{ flex: 1, padding: '8px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                        <button 
                            onClick={handleSaveInstrumentPreset}
                            style={{ padding: '0 12px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                        >
                            Save
                        </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                      {customInstrumentPresets.length > 0 ? customInstrumentPresets.map((p, idx) => (
                          <div 
                            key={idx}
                            style={{ position: 'relative', display: 'inline-flex' }}
                          >
                              <button 
                                onClick={() => applyInstrumentPreset(p)}
                                style={{ 
                                    padding: '6px 28px 6px 12px', 
                                    backgroundColor: '#374151', 
                                    border: '1px solid #4b5563',
                                    borderRadius: '15px',
                                    color: '#FFFFFF',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                                title={p.instruments.join(', ')}
                              >
                                {p.name}
                              </button>
                              <span 
                                onClick={(e) => handleDeleteInstrumentPreset(e, idx)}
                                style={{ 
                                    position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                                    fontSize: '14px', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold'
                                }}
                              >
                                &times;
                              </span>
                          </div>
                      )) : (
                          <span style={{ fontSize: '11px', color: '#6b7280' }}>저장된 프리셋이 없습니다.</span>
                      )}
                  </div>
              </div>
          </div>

          {/* Column 3: Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '18px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                  <span className="material-symbols-outlined">auto_awesome</span> 생성 (Prompt)
              </h2>

              {/* Version Selector */}
              <div style={{ display: 'flex', backgroundColor: '#111827', padding: '4px', borderRadius: '8px', gap: '4px', border: '1px solid #374151' }}>
                  <button 
                    onClick={() => setSunoVersion('v3.5')}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: sunoVersion === 'v3.5' ? '#374151' : 'transparent', color: sunoVersion === 'v3.5' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    Suno v3.5
                  </button>
                  <button 
                    onClick={() => setSunoVersion('v5')}
                    style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: sunoVersion === 'v5' ? '#e11d48' : 'transparent', color: sunoVersion === 'v5' ? 'white' : '#6b7280', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    Suno v5 (Pro)
                  </button>
              </div>

              {/* NEW: Prompt Style Selector */}
              <div>
                  <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '8px' }}>프롬프트 스타일 (Prompt Style)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setPromptStyle('structured')}
                        style={{ 
                            flex: 1, padding: '10px', borderRadius: '6px', 
                            border: promptStyle === 'structured' ? '1px solid #3b82f6' : '1px solid #4b5563',
                            backgroundColor: promptStyle === 'structured' ? 'rgba(59, 130, 246, 0.15)' : '#1f2937',
                            color: promptStyle === 'structured' ? '#3b82f6' : '#9ca3af',
                            fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>article</span>
                        5단계 구조화
                      </button>
                      <button 
                        onClick={() => setPromptStyle('simple')}
                        style={{ 
                            flex: 1, padding: '10px', borderRadius: '6px', 
                            border: promptStyle === 'simple' ? '1px solid #fbbf24' : '1px solid #4b5563',
                            backgroundColor: promptStyle === 'simple' ? 'rgba(251, 191, 36, 0.15)' : '#1f2937',
                            color: promptStyle === 'simple' ? '#fbbf24' : '#9ca3af',
                            fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                        }}
                      >
                         <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>label</span>
                         기본 생성 (Tag)
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
                  <button 
                      onClick={generatePrompt}
                      disabled={loading}
                      style={{ flex: '1 1 120px', padding: '15px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                      {loading ? 'Generating...' : <><span className="material-symbols-outlined">auto_fix_high</span> 프롬프트 생성</>}
                  </button>
                  <button 
                      onClick={generateCompositionAdvice}
                      disabled={loadingAdvice}
                      style={{ flex: '1 1 120px', padding: '15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                      {loadingAdvice ? 'Guiding...' : <><span className="material-symbols-outlined">music_note</span> AI 작곡 가이드</>}
                  </button>
              </div>

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
                          <button 
                              id="save-prompt-btn"
                              onClick={handleSavePrompt}
                              style={{ padding: '6px 12px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                          >
                              Save
                          </button>
                          <button 
                              onClick={copyToClipboard}
                              style={{ padding: '6px 12px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                          >
                              Copy
                          </button>
                      </div>
                  </div>
                </div>

                {/* AI Composition Advice Display */}
                {project.compositionAdvice && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '20px', marginTop: '10px' }}>
                        <h3 style={{ margin: '0 0 15px 0', color: '#3b82f6', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined">lightbulb</span> AI 작곡 제안 (Composition Advice)
                        </h3>
                        <div style={{ 
                            fontSize: '13px', color: '#e5e7eb', lineHeight: '1.6', 
                            maxHeight: '400px', overflowY: 'auto', paddingRight: '10px',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {project.compositionAdvice}
                        </div>
                    </div>
                )}
              </div>
              
              <div style={{ marginTop: 'auto', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <p style={{ fontSize: '13px', color: labelColor, margin: 0 }}>📌 Quick Sample Prompts</p>
                    <button 
                        onClick={() => setIsAddPromptOpen(true)}
                        style={{ 
                            background: 'transparent', border: '1px solid #4b5563', color: labelColor,
                            borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer'
                        }}
                    >
                        + Add Custom
                    </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '120px', overflowY: 'auto' }}>
                    {samplePrompts.map((sample, idx) => (
                        <div 
                            key={idx}
                            style={{ position: 'relative', display: 'inline-flex' }}
                        >
                            <button 
                                onClick={() => onUpdate({ sunoPrompt: sample.text })}
                                style={{ 
                                    padding: '6px 24px 6px 10px', 
                                    backgroundColor: '#1f2937', 
                                    border: '1px solid #374151',
                                    borderRadius: '15px',
                                    color: legibilityMode ? '#FFFFFF' : '#d1d5db',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '180px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#374151';
                                    e.currentTarget.style.borderColor = '#6b7280';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1f2937';
                                    e.currentTarget.style.borderColor = '#374151';
                                }}
                                title={sample.text}
                            >
                                {sample.label}
                            </button>
                            <span 
                                onClick={(e) => deleteSamplePrompt(e, idx)}
                                style={{ 
                                    position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
                                    fontSize: '12px', color: '#ef4444', cursor: 'pointer',
                                    opacity: 0.6
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                            >
                                &times;
                            </span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
          
          {isAddPromptOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(4px)' }}>
                <div style={{ backgroundColor: '#1f2937', padding: '24px', borderRadius: '16px', border: '1px solid #374151', width: '400px', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'white' }}>Add Custom Prompt</h3>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '4px' }}>Label (Name)</label>
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="e.g. My Favorite Jazz"
                            value={newPromptForm.label}
                            onChange={(e) => setNewPromptForm({...newPromptForm, label: e.target.value})}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '4px' }}>Prompt Text</label>
                        <textarea 
                            placeholder="Paste your prompt here..."
                            value={newPromptForm.text}
                            onChange={(e) => setNewPromptForm({...newPromptForm, text: e.target.value})}
                            style={{ width: '100%', height: '100px', padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', resize: 'none', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button 
                            onClick={() => setIsAddPromptOpen(false)}
                            style={{ padding: '8px 16px', backgroundColor: 'transparent', color: labelColor, border: 'none', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleAddPrompt}
                            style={{ padding: '8px 16px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Save Prompt
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Dance Guide Modal */}
        {isDanceGuideOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(4px)' }}>
                <div style={{ backgroundColor: '#1f2937', padding: '24px', borderRadius: '16px', border: '1px solid #374151', width: '600px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #374151', paddingBottom: '10px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>accessibility_new</span>
                            BPM & Key 가이드
                        </h3>
                        <button onClick={() => setIsDanceGuideOpen(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    
                    <div style={{ color: '#d1d5db' }}>
                        <p style={{ fontSize: '13px', color: labelColor, marginBottom: '15px' }}>
                            Suno.ai에서 선호하는 음악을 만들기 위한 추천 설정값입니다.
                        </p>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #4b5563', color: '#e11d48' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>장르 (Genre)</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>BPM Range</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>추천 Key</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DANCE_GUIDE.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #374151' }}>
                                        <td style={{ padding: '10px', fontWeight: 'bold', color: '#FFFFFF' }}>{item.genre}</td>
                                        <td style={{ padding: '10px', color: '#fbbf24' }}>{item.bpm}</td>
                                        <td style={{ padding: '10px', color: '#FFFFFF' }}>{item.key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button 
                            onClick={() => setIsDanceGuideOpen(false)}
                            style={{ padding: '8px 24px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            확인 (Close)
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
  );
};

export default SoundTab;
