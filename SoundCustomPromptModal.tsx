import React, { useState } from 'react';

interface SoundCustomPromptModalProps {
    onClose: () => void;
    onSave: (label: string, text: string) => void;
    labelColor: string;
}

const SoundCustomPromptModal = ({ onClose, onSave, labelColor }: SoundCustomPromptModalProps) => {
    const [form, setForm] = useState({ label: '', text: '' });

    const handleSave = () => {
        if (!form.label || !form.text) {
            alert('Label and Text are required');
            return;
        }
        onSave(form.label, form.text);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(4px)' }}>
            <div style={{ backgroundColor: '#1f2937', padding: '24px', borderRadius: '16px', border: '1px solid #374151', width: '400px', maxWidth: '90vw', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'white' }}>Add Custom Prompt</h3>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '4px' }}>Label (Name)</label>
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="e.g. My Favorite Jazz"
                        value={form.label}
                        onChange={(e) => setForm({...form, label: e.target.value})}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: labelColor, marginBottom: '4px' }}>Prompt Text</label>
                    <textarea 
                        placeholder="Paste your prompt here..."
                        value={form.text}
                        onChange={(e) => setForm({...form, text: e.target.value})}
                        style={{ width: '100%', height: '100px', padding: '10px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', borderRadius: '6px', resize: 'none', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={onClose}
                        style={{ padding: '8px 16px', backgroundColor: 'transparent', color: labelColor, border: 'none', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        style={{ padding: '8px 16px', backgroundColor: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Save Prompt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SoundCustomPromptModal;