import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { EXCLUDED_KEYWORDS_PRESETS, INTRO_STYLES } from './constants';

interface LyricsSettingsPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    legibilityMode: boolean;
    modelTier: 'stable' | 'pro';
    loading: boolean;
    onGenerate: () => void;
}

const LyricsSettingsPanel = ({ project, onUpdate, legibilityMode, modelTier, loading, onGenerate }: LyricsSettingsPanelProps) => {
    // Local state for custom keywords
    const [customKeyword, setCustomKeyword] = useState('');
    const [customPresets, setCustomPresets] = useState<string[]>([]);

    const language = project.lyricLanguage ?? 'Korean Only';
    const lyricDurationSeconds = project.lyricDuration ?? 180;
    const isDanceMode = project.lyricDanceMode ?? false;
    const autoAdjustLength = project.lyricAutoAdjust ?? false;

    useEffect(() => {
        const saved = localStorage.getItem('suno_lyric_custom_negative_presets');
        if (saved) {
            try {
                setCustomPresets(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load custom presets", e);
            }
        }
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentExcluded = project.excludedThemes 
        ? project.excludedThemes.split(',').map(s => s.trim()).filter(s => s !== '') 
        : [];

    const addExcludedKeyword = (keyword: string) => {
        const trimmed = keyword.trim();
        if (!trimmed || currentExcluded.includes(trimmed)) return;
        const newList = [...currentExcluded, trimmed];
        onUpdate({ excludedThemes: newList.join(', ') });
        setCustomKeyword('');
    };

    const removeExcludedKeyword = (keyword: string) => {
        const newList = currentExcluded.filter(k => k !== keyword);
        onUpdate({ excludedThemes: newList.join(', ') });
    };

    const handleSaveCustomPreset = () => {
        const trimmed = customKeyword.trim();
        if (!trimmed) return;
        
        if (EXCLUDED_KEYWORDS_PRESETS.includes(trimmed) || customPresets.includes(trimmed)) {
            alert('이미 존재하는 프리셋입니다.');
            return;
        }
        
        const updated = [...customPresets, trimmed];
        setCustomPresets(updated);
        localStorage.setItem('suno_lyric_custom_negative_presets', JSON.stringify(updated));
        setCustomKeyword('');
    };

    const handleDeleteCustomPreset = (e: React.MouseEvent, keyword: string) => {
        e.stopPropagation();
        e.preventDefault();
        
        const updated = customPresets.filter(k => k !== keyword);
        setCustomPresets(updated);
        localStorage.setItem('suno_lyric_custom_negative_presets', JSON.stringify(updated));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExcludedKeyword(customKeyword);
        }
    };

    const titleColor = legibilityMode ? '#FFFFFF' : 'white';
    const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

    return (
        <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '0' }}>
            <h2 style={{ fontSize: '20px', borderBottom: '1px solid #374151', paddingBottom: '15px', margin: 0, display:'flex', alignItems:'center', gap:'10px', color: titleColor, fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>tune</span> 설정 (Settings)
            </h2>

            {/* Info Box */}
            <div style={{ backgroundColor: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #374151' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: labelColor }}>현재 스타일</p>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#e11d48', fontSize: '13px', lineHeight: '1.4' }}>
                    {project.styleDescription || '설정된 스타일 없음'}
                </p>
                {project.introStyle && (
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#fbbf24' }}>
                        + Intro: {INTRO_STYLES.find(s => s.id === project.introStyle)?.label}
                    </p>
                )}
                {project.referenceSongTitle && (
                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#818cf8' }}>
                        + Reference: {project.referenceSongTitle} ({project.referenceArtist})
                    </p>
                )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>언어 (Language)</label>
                    <select 
                        value={language} 
                        onChange={e => onUpdate({ lyricLanguage: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px' }}
                    >
                        <option>Korean Only</option>
                        <option>English Only</option>
                        <option>Japanese Only</option>
                        <option>Korean & English Mix</option>
                        <option>Japanese & English Mix</option>
                        <option>Spanish & English (Latin)</option>
                    </select>
                </div>
                
                {/* Range Slider for Duration */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ fontSize: '13px', color: labelColor }}>길이 (Duration)</label>
                        <span style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 'bold', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                            {formatTime(lyricDurationSeconds)}
                        </span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#374151', borderRadius: '6px' }}>
                        <input 
                            type="range" 
                            min="120" 
                            max="300" 
                            step="30" 
                            value={lyricDurationSeconds}
                            onChange={(e) => onUpdate({ lyricDuration: parseInt(e.target.value) })}
                            style={{ width: '100%', cursor: 'pointer', accentColor: '#e11d48', height: '6px' }} 
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af', marginTop: '5px' }}>
                            <span>2:00</span>
                            <span>3:00</span>
                            <span>4:00</span>
                            <span>5:00</span>
                        </div>
                    </div>
                </div>
                
                {/* Toggles */}
                <div 
                    onClick={() => onUpdate({ lyricDanceMode: !isDanceMode })}
                    style={{ padding: '12px', backgroundColor: '#1f2937', borderRadius: '8px', border: isDanceMode ? '1px solid #10b981' : '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: isDanceMode ? '#10b981' : (legibilityMode ? '#FFFFFF' : '#f9fafb') }}>Dance Mode (8-count)</div>
                    <div style={{ width: '36px', height: '20px', backgroundColor: isDanceMode ? '#10b981' : '#4b5563', borderRadius: '10px', position: 'relative' }}>
                        <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: isDanceMode ? '18px' : '2px', transition: 'left 0.2s' }} />
                    </div>
                </div>

                <div 
                    onClick={() => onUpdate({ lyricAutoAdjust: !autoAdjustLength })}
                    style={{ padding: '12px', backgroundColor: '#1f2937', borderRadius: '8px', border: autoAdjustLength ? '1px solid #fbbf24' : '1px solid #374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: autoAdjustLength ? '#fbbf24' : (legibilityMode ? '#FFFFFF' : '#f9fafb') }}>Auto-Length Adjust</div>
                    <div style={{ width: '36px', height: '20px', backgroundColor: autoAdjustLength ? '#fbbf24' : '#4b5563', borderRadius: '10px', position: 'relative' }}>
                        <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: autoAdjustLength ? '18px' : '2px', transition: 'left 0.2s' }} />
                    </div>
                </div>

                {/* Excluded Keywords */}
                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '5px' }}>제외 키워드 (Negative Constraints)</label>
                    
                    {/* Active Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px', padding: '8px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px', minHeight: '32px' }}>
                        {currentExcluded.length === 0 && <span style={{ fontSize: '12px', color: '#6b7280', padding: '4px' }}>제외할 키워드가 없습니다.</span>}
                        {currentExcluded.map((kw, idx) => (
                            <span key={idx} style={{ 
                                fontSize: '12px', padding: '4px 8px', borderRadius: '12px', 
                                backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)',
                                display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                                {kw}
                                <button 
                                    onClick={() => removeExcludedKeyword(kw)}
                                    style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1, display: 'flex', alignItems: 'center' }}
                                >×</button>
                            </span>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                        <input 
                            type="text" 
                            value={customKeyword}
                            onChange={e => setCustomKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="키워드 입력 (예: drums)..."
                            style={{ flex: 1, padding: '8px', backgroundColor: '#374151', border: '1px solid #4b5563', borderRadius: '6px', color: 'white', fontSize: '13px' }}
                        />
                        <button 
                            onClick={() => addExcludedKeyword(customKeyword)}
                            style={{ padding: '8px 12px', backgroundColor: '#374151', color: legibilityMode ? '#FFFFFF' : '#d1d5db', border: '1px solid #4b5563', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                        >
                            추가
                        </button>
                        <button 
                            onClick={handleSaveCustomPreset}
                            title="입력한 단어를 나만의 프리셋으로 저장"
                            style={{ padding: '8px 12px', backgroundColor: '#1f2937', color: '#10b981', border: '1px solid #10b981', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                            💾 Save
                        </button>
                    </div>

                    {/* Presets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {/* Default Presets */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {EXCLUDED_KEYWORDS_PRESETS.map((preset, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => currentExcluded.includes(preset) ? removeExcludedKeyword(preset) : addExcludedKeyword(preset)}
                                    style={{ 
                                        fontSize: '11px', padding: '3px 8px', borderRadius: '10px', 
                                        border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #4b5563', 
                                        backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                        color: currentExcluded.includes(preset) ? '#ef4444' : (legibilityMode ? '#9ca3af' : '#6b7280'),
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {currentExcluded.includes(preset) ? '-' : '+'} {preset}
                                </button>
                            ))}
                        </div>

                        {/* Custom Presets */}
                        {customPresets.length > 0 && (
                            <div style={{ borderTop: '1px dashed #4b5563', paddingTop: '8px', marginTop: '4px' }}>
                                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '5px' }}>나의 프리셋 (My Presets)</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {customPresets.map((preset, idx) => (
                                        <div key={preset} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <button 
                                                onClick={() => currentExcluded.includes(preset) ? removeExcludedKeyword(preset) : addExcludedKeyword(preset)}
                                                style={{ 
                                                    fontSize: '11px', padding: '3px 6px 3px 8px', borderRadius: '10px 0 0 10px', 
                                                    border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #10b981', 
                                                    backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                    color: currentExcluded.includes(preset) ? '#ef4444' : '#10b981',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    borderRight: 'none'
                                                }}
                                            >
                                                {currentExcluded.includes(preset) ? '-' : '+'} {preset}
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteCustomPreset(e, preset)}
                                                style={{
                                                    fontSize: '11px', padding: '3px 6px', borderRadius: '0 10px 10px 0',
                                                    border: currentExcluded.includes(preset) ? '1px solid #ef4444' : '1px solid #10b981',
                                                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                                                    backgroundColor: currentExcluded.includes(preset) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                    color: currentExcluded.includes(preset) ? '#ef4444' : '#10b981',
                                                    cursor: 'pointer'
                                                }}
                                                title="프리셋 삭제"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '10px', paddingTop: '10px', fontSize: '13px', color: labelColor, borderTop: '1px solid #374151' }}>
                    <span>BPM: {project.bpm} ({project.bpm >= 105 ? 'Fast' : 'Slow'})</span>
                    <span style={{ fontSize: '12px', color: modelTier === 'pro' ? '#818cf8' : '#6b7280', display: 'block', marginTop: '6px' }}>
                        Model: {modelTier === 'pro' ? 'Gemini 3.0 Pro' : 'Gemini 2.0 Flash'}
                    </span>
                </div>
            </div>

            <button 
                onClick={onGenerate}
                disabled={loading}
                style={{ 
                    width: '100%', padding: '15px', backgroundColor: loading ? '#4b5563' : '#e11d48', 
                    color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'wait' : 'pointer',
                    marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
            >
                {loading ? 'Thinking...' : <><span className="material-symbols-outlined">auto_awesome</span> 현재 설정으로 생성</>}
            </button>
        </div>
    );
};

export default LyricsSettingsPanel;