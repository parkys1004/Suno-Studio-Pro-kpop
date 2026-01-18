
import React, { useState } from 'react';
import { Project } from './types';
import { GENRES, MOODS } from './constants';
import { Icon } from './SharedComponents';

// --- Dashboard Component ---
const Dashboard = ({ projects, onCreate, onOpen, onDelete, onExport, legibilityMode }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({ genre: 'K-Pop', subGenre: 'Girl Crush', mood: 'Energetic & Powerful', title: '' });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newProjectForm.title.trim()) return alert('제목을 입력하세요');
    onCreate(newProjectForm);
    setIsModalOpen(false);
    setNewProjectForm({ genre: 'K-Pop', subGenre: 'Girl Crush', mood: 'Energetic & Powerful', title: '' });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === 'Custom') {
      setNewProjectForm({ ...newProjectForm, genre: selected, subGenre: '' });
    } else {
      const genreObj = GENRES.find(g => g.label === selected);
      setNewProjectForm({ 
        ...newProjectForm, 
        genre: selected, 
        subGenre: genreObj && genreObj.subgenres.length > 0 ? genreObj.subgenres[0] : '' 
      });
    }
  };

  const titleColor = legibilityMode ? '#FFFFFF' : '#f3f4f6';
  const labelColor = legibilityMode ? '#E5E7EB' : '#9ca3af';

  const selectedGenreObj = GENRES.find(g => g.label === newProjectForm.genre);

  return (
    <div style={{ padding: '40px', width: '100%', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: titleColor }}>Projects</h2>
            <p style={{ color: labelColor, margin: 0 }}>Manage your music productions and ideas</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#e11d48', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(225, 29, 72, 0.2)' }}>
            <Icon name="add" /> New Project
          </button>
        </div>
        <div className="dashboard-projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          <div onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'rgba(31, 41, 55, 0.4)', borderRadius: '16px', border: '2px dashed #4b5563', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '320px', transition: 'all 0.2s' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#e11d48' }}>
                <Icon name="add" />
             </div>
             <span style={{ fontSize: '16px', fontWeight: 'bold', color: labelColor }}>Create New Project</span>
          </div>
          {projects.map((p: Project) => (
            <div key={p.id} onClick={() => onOpen(p.id)} style={{ backgroundColor: '#1f2937', borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ height: '180px', width: '100%', position: 'relative', backgroundColor: '#111827' }}>
                    {p.coverImage ? <img src={p.coverImage} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}><span style={{ fontSize: '48px', opacity: 0.2 }}>🎵</span></div>}
                     <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10 }}>
                         <button onClick={(e) => { e.stopPropagation(); onExport(p); }} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="download" /></button>
                         <button onClick={(e) => { e.stopPropagation(); setDeleteId(p.id); }} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" /></button>
                    </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px 0', color: 'white' }}>{p.title || 'Untitled Project'}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: '#374151', color: legibilityMode ? '#FFFFFF' : '#9ca3af', fontWeight: '500' }}>{p.genre}</span>
                        {p.subGenre && <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '12px', backgroundColor: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', border: '1px solid rgba(225, 29, 72, 0.2)', fontWeight: '500' }}>{p.subGenre}</span>}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #374151', paddingTop: '15px' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(p.createdAt).toLocaleDateString()}</span>
                        <span style={{ fontSize: '13px', color: '#818cf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>Open Studio <Icon name="arrow_forward" /></span>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      {deleteId && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}><div style={{ backgroundColor: '#1f2937', padding: '24px', borderRadius: '16px', border: '1px solid #374151', width: '320px', textAlign: 'center', maxWidth: '90vw' }}><h3 style={{ margin: '0 0 24px 0', color: 'white' }}>정말로 삭제하시겠습니까?</h3><div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}><button onClick={() => setDeleteId(null)} style={{ padding: '10px 20px', backgroundColor: '#374151', color: 'white', borderRadius: '8px' }}>취소</button><button onClick={() => { onDelete(deleteId); setDeleteId(null); }} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' }}>삭제</button></div></div></div>}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#1f2937', padding: '30px', borderRadius: '16px', width: '500px', maxWidth: '90vw' }}>
                <h3 style={{ marginTop: 0, color: 'white' }}>Start New Project</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0' }}>
                    <div>
                        <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Project Name</label>
                        <input type="text" value={newProjectForm.title} onChange={e => setNewProjectForm({...newProjectForm, title: e.target.value})} placeholder="Enter project name..." style={{ width: '100%', padding: '12px', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="responsive-grid-2" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Genre</label>
                            <select value={newProjectForm.genre} onChange={handleGenreChange} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                                {GENRES.map(g => <option key={g.label} value={g.label}>{g.label}</option>)}
                            </select>
                        </div>
                        {selectedGenreObj && selectedGenreObj.subgenres.length > 0 && (
                            <div>
                                <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Sub-Genre</label>
                                <select value={newProjectForm.subGenre} onChange={e => setNewProjectForm({...newProjectForm, subGenre: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                                    {selectedGenreObj.subgenres.map(sg => <option key={sg} value={sg}>{sg}</option>)}
                                </select>
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={{ display: 'block', color: labelColor, fontSize: '13px', marginBottom: '5px' }}>Mood</label>
                        <select value={newProjectForm.mood} onChange={e => setNewProjectForm({...newProjectForm, mood: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', border: '1px solid #374151', borderRadius: '8px' }}>
                            {MOODS.map(m => <option key={m.id} value={m.label}>{m.label} ({m.ko})</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleCreate} style={{ padding: '10px 24px', backgroundColor: '#e11d48', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Create Project</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
    