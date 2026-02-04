import React, { useRef } from 'react';
import { Project } from './types';
import LyricCheatSheet from './LyricCheatSheet';

interface LyricsEditorPanelProps {
    project: Project;
    onUpdate: (u: Partial<Project>) => void;
    legibilityMode: boolean;
    isOptimizing: boolean;
    onOptimize: () => void;
    setTooltip: (tooltip: {text: string, x: number, y: number} | null) => void;
}

const LyricsEditorPanel = ({ project, onUpdate, legibilityMode, isOptimizing, onOptimize, setTooltip }: LyricsEditorPanelProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleInsertTag = (tag: string) => {
        const text = project.lyrics || '';
        
        // If we have ref access, insert at cursor
        if (textAreaRef.current) {
            const start = textAreaRef.current.selectionStart;
            const end = textAreaRef.current.selectionEnd;
            
            const before = text.substring(0, start);
            const after = text.substring(end, text.length);
            
            const newText = before + tag + after;
            onUpdate({ lyrics: newText });
            
            // Restore focus and move cursor after tag
            setTimeout(() => {
                if (textAreaRef.current) {
                    textAreaRef.current.focus();
                    textAreaRef.current.setSelectionRange(start + tag.length, start + tag.length);
                }
            }, 0);
        } else {
            // Fallback: append to end
            onUpdate({ lyrics: text + (text ? '\n' : '') + tag });
        }
    };

    const copyToClipboard = () => {
        if (!project.lyrics) return;
        navigator.clipboard.writeText(project.lyrics);
        alert('Lyrics Copied!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: '15px', height: '41px' }}>
                <h2 style={{ fontSize: '20px', margin: 0, color: '#e11d48', display:'flex', alignItems:'center', gap:'10px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                   <span className="material-symbols-outlined">edit_note</span> 에디터 (Editor)
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                       {(project.lyrics || '').length}자
                    </span>
                    {/* Optimize Button */}
                    <button
                       onClick={onOptimize}
                       disabled={!project.lyrics || isOptimizing}
                       style={{
                          padding: '6px 12px', backgroundColor: '#3b82f6',
                          color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer',
                          fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px'
                       }}
                       title="가사 구조 및 태그 최적화"
                    >
                      {isOptimizing ? <span className="material-symbols-outlined" style={{animation: 'spin 1s linear infinite'}}>sync</span> : <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>build</span>}
                      최적화
                    </button>
                    <button
                        onClick={copyToClipboard}
                        disabled={!project.lyrics}
                        style={{
                           padding: '8px 16px', backgroundColor: '#10b981',
                           color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
                           fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
                           boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                   >
                       <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>content_copy</span> 가사 복사
                   </button>
               </div>
            </div>
            
            <LyricCheatSheet onInsertTag={handleInsertTag} setTooltip={setTooltip} />

            <textarea 
               ref={textAreaRef}
               value={project.lyrics || ''}
               onChange={e => onUpdate({ lyrics: e.target.value })}
               placeholder="AI가 생성한 가사가 이곳에 표시됩니다. 직접 수정할 수도 있습니다."
               style={{ 
                   flex: 1, padding: '20px', borderRadius: '8px', backgroundColor: '#111827', 
                   border: '1px solid #374151', color: '#e5e7eb', resize: 'none', lineHeight: '1.6', fontFamily: 'monospace',
                   fontSize: '14px', minHeight: '500px'
               }}
           />
         </div>
    );
};

export default LyricsEditorPanel;