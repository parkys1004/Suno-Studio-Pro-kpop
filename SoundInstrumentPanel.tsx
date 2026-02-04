import React, { useState, useEffect } from 'react';
import { Project, InstrumentPreset } from './types';
import { INSTRUMENTS } from './constants';

interface SoundInstrumentPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    legibilityMode: boolean;
    useStrictDanceMode: boolean;
    setUseStrictDanceMode: (v: boolean) => void;
    labelColor: string;
}

const SoundInstrumentPanel = ({ project, onUpdate, legibilityMode, useStrictDanceMode, setUseStrictDanceMode, labelColor }: SoundInstrumentPanelProps) => {
    const [customInstrumentPresets, setCustomInstrumentPresets] = useState<InstrumentPreset[]>([]);
    const [newPresetName, setNewPresetName] = useState('');

    useEffect(() => {
        const savedInstrumentPresets = localStorage.getItem('suno_instrument_presets');
        if (savedInstrumentPresets) {
            setCustomInstrumentPresets(JSON.parse(savedInstrumentPresets));
        }
    }, []);

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

    const toggleInstrument = (inst: string) => {
        const newInsts = project.instruments.includes(inst) 
          ? project.instruments.filter((i: string) => i !== inst)
          : [...project.instruments, inst];
        onUpdate({ instruments: newInsts });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '10px', borderRight: '1px solid #374151' }}>
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
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
    );
};

export default SoundInstrumentPanel;