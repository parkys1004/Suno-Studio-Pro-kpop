import React, { useState } from 'react';
import { Project } from './types';
import { GENRE_PRESETS } from './constants';
import { getGenAI } from './utils';

interface SoundConfigPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    modelTier: 'stable' | 'pro';
    titleColor: string;
    labelColor: string;
    legibilityMode: boolean;
}

const SoundConfigPanel = ({ project, onUpdate, modelTier, titleColor, labelColor, legibilityMode }: SoundConfigPanelProps) => {
    const [isDetectingBPM, setIsDetectingBPM] = useState(false);

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

            // Model Selection: Use 'gemini-2.0-flash' explicitly for audio analysis if Pro is not required, 
            // or stick to the tier passed down. Let's use the tier logic for consistency.
            const modelName = modelTier === 'pro' ? 'gemini-3-flash-preview' : 'gemini-2.0-flash';
            
            const prompt = "Analyze the tempo of this audio clip. Estimate the BPM (Beats Per Minute). Return ONLY the integer number (e.g. 120). Do not write any other text.";
            
            const response: any = await getGenAI().models.generateContent({
                model: modelName,
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '10px', borderRight: '1px solid #374151' }}>
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
                             {['C', 'Cm', 'C#', 'C#m', 'D', 'Db', 'Dm', 'Eb', 'Ebm', 'E', 'Em', 'F', 'Fm', 'F#', 'F#m', 'G', 'Gm', 'Ab', 'Abm', 'A', 'Am', 'Bb', 'Bbm', 'B', 'Bm'].map(k => (
                                 <option key={k} value={k}>{k}</option>
                             ))}
                        </select>
                    </div>
                </div>

                <button 
                  onClick={() => window.open('https://k-pop-genre-key-map.vercel.app', '_blank')}
                  style={{ 
                      width: '100%', marginBottom: '15px', padding: '8px', 
                      backgroundColor: '#374151', color: '#fbbf24', border: '1px dashed #4b5563', 
                      borderRadius: '6px', fontSize: '12px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>public</span>
                  K-POP GENRE & KEY
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
    );
};

export default SoundConfigPanel;