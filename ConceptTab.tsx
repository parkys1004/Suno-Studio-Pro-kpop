
import React, { useState } from 'react';
import { Type } from "@google/genai";
import { getGenAI } from './utils';
import { Project, ThemePack, ReferenceSuggestion } from './types';

// --- TAB: Concept ---
const ConceptTab = ({ project, onUpdate, legibilityMode }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean }) => {
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [loadingTitles, setLoadingTitles] = useState(false);
  const [loadingReferences, setLoadingReferences] = useState(false);
  const [themePacks, setThemePacks] = useState<ThemePack[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [referenceSuggestions, setReferenceSuggestions] = useState<ReferenceSuggestion[]>([]);
  const [ideaKeywords, setIdeaKeywords] = useState('');

  const generateThemePacks = async () => {
    setLoadingPacks(true);
    try {
        const keywordContext = ideaKeywords.trim() 
            ? `\n        User Keywords/Themes: "${ideaKeywords}".\n        Please prioritize these keywords in the generated concepts.`
            : '';

        const prompt = `Generate 12 unique and creative "Song Idea Packs" for a ${project.genre} (${project.subGenre}) song with a ${project.mood} mood.${keywordContext}
        Each pack must include:
        1. A catchy English Title with Korean translation (Format: "English Title (한글 제목)").
        2. A Topic: A 1-2 sentence description in Korean of the story or scenario.
        3. A Style: A 1-2 sentence description in Korean of the musical production, era, and vibe.

        Strict Requirements:
        - Return ONLY a JSON array of objects.
        - Each object should have keys: "title", "topic", "style".
        - Do not include markdown code blocks or any other text.
        - Use Korean for "topic" and "style".
        `;

        const response: any = await getGenAI().models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            topic: { type: Type.STRING },
                            style: { type: Type.STRING }
                        },
                        required: ['title', 'topic', 'style']
                    }
                }
            }
        });

        const data = JSON.parse(response.text || '[]');
        setThemePacks(data);
    } catch (e) {
        console.error(e);
        alert('아이디어 팩 생성 중 오류가 발생했습니다.');
    }
    setLoadingPacks(false);
  };

  const generateTitleSuggestions = async () => {
      if (!project.concept) {
          alert('제목을 추천받으려면 먼저 [주제]를 입력해주세요.');
          return;
      }
      setLoadingTitles(true);
      try {
          const prompt = `Suggest 5 catchy and creative song titles for a ${project.genre} song.
          Topic/Theme: ${project.concept}
          Mood: ${project.mood}
          Requirements:
          - Return ONLY a JSON array of 5 strings.
          - Each string MUST strictly follow the format: "English Title (Korean Title)".
          - Example: "Midnight Love (한밤의 사랑)", "Blue Sky (푸른 하늘)"
          - Do not include any other text or markdown.`;

          const response: any = await getGenAI().models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt,
              config: {
                  responseMimeType: 'application/json',
                  responseSchema: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
              }
          });

          const data = JSON.parse(response.text || '[]');
          setTitleSuggestions(data);
      } catch (e) {
          console.error(e);
          alert('제목 추천 중 오류가 발생했습니다.');
      }
      setLoadingTitles(false);
  };

  const generateReferenceSuggestions = async () => {
      setLoadingReferences(true);
      try {
          const prompt = `Suggest 5 popular and characteristic songs that represent the ${project.genre} (${project.subGenre}) genre with a ${project.mood} mood.
          Return ONLY a JSON array of objects.
          Each object should have keys: "song" and "artist".
          Do not include markdown code blocks.`;

          const response: any = await getGenAI().models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: prompt,
              config: {
                  responseMimeType: 'application/json',
                  responseSchema: {
                      type: Type.ARRAY,
                      items: {
                          type: Type.OBJECT,
                          properties: {
                              song: { type: Type.STRING },
                              artist: { type: Type.STRING }
                          },
                          required: ['song', 'artist']
                      }
                  }
              }
          });

          const data = JSON.parse(response.text || '[]');
          setReferenceSuggestions(data);
      } catch (e) {
          console.error(e);
          alert('참고 곡 추천 중 오류가 발생했습니다.');
      }
      setLoadingReferences(false);
  };

  const applyThemePack = (pack: ThemePack) => {
      // Use the full title including Korean translation
      onUpdate({
          title: pack.title,
          concept: pack.topic,
          styleDescription: pack.style
      });
  };

  const applySuggestedTitle = (fullTitle: string) => {
      // Use the full title including Korean translation
      onUpdate({ title: fullTitle });
  };

  const applyReference = (song: string, artist: string) => {
      onUpdate({ referenceSongTitle: song, referenceArtist: artist });
  };

  const searchYouTube = () => {
      const query = `${project.referenceSongTitle || ''} ${project.referenceArtist || ''}`.trim() || `${project.genre} ${project.mood} music`;
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  const primaryTextColor = legibilityMode ? '#FFFFFF' : 'white';
  const labelColor = legibilityMode ? '#F9FAF8' : '#d1d5db';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ borderBottom: '1px solid #374151', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: primaryTextColor, fontWeight: legibilityMode ? 'bold' : 'normal' }}>
        <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>auto_awesome</span>
        🎵 프로젝트 기획 (Concept)
      </h2>

      {/* AI Theme Pack Suggestion Section */}
      <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #e11d48' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ flex: '1 1 300px', marginRight: '0' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#e11d48', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: legibilityMode ? 'bold' : 'normal' }}>
                    <span className="material-symbols-outlined">bolt</span> AI 아이디어 팩 (장르별 추천)
                </h3>
                <p style={{ margin: '5px 0 10px 0', fontSize: '13px', color: legibilityMode ? '#E5E7EB' : '#9ca3af' }}>장르와 무드에 맞는 제목, 주제, 스타일을 한 번에 추천받으세요.</p>
                <input 
                    type="text"
                    value={ideaKeywords}
                    onChange={(e) => setIdeaKeywords(e.target.value)}
                    placeholder="✨ 키워드 입력 (선택사항: 예 - 여름, 이별, 커피, 여행...)"
                    style={{ 
                        width: '100%', padding: '10px', backgroundColor: '#1f2937', 
                        border: '1px solid #4b5563', borderRadius: '6px', 
                        color: 'white', fontSize: '13px', boxSizing: 'border-box'
                    }}
                />
              </div>
              <button 
                onClick={generateThemePacks}
                disabled={loadingPacks}
                style={{ 
                    padding: '10px 20px', backgroundColor: '#e11d48', color: 'white', border: 'none', 
                    borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' 
                }}
              >
                {loadingPacks ? 'AI 추천 생성 중...' : <><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>magic_button</span> 추천 팩 생성</>}
              </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px', maxHeight: '400px', overflowY: 'auto', padding: '5px' }}>
              {themePacks.length > 0 ? themePacks.map((pack, i) => (
                  <div 
                    key={i}
                    onClick={() => applyThemePack(pack)}
                    style={{ 
                        padding: '15px', backgroundColor: '#1f2937', borderRadius: '10px', cursor: 'pointer', 
                        border: '1px solid #374151', transition: 'all 0.2s', textAlign: 'left'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#e11d48'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                      <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fbbf24', marginBottom: '8px' }}>{pack.title}</div>
                      <div style={{ fontSize: '12px', color: '#d1d5db', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          <strong>주제:</strong> {pack.topic}
                      </div>
                      <div style={{ fontSize: '11px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          <strong>스타일:</strong> {pack.style}
                      </div>
                  </div>
              )) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#4b5563' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '10px' }}>lightbulb</span>
                      <p>버튼을 눌러 AI가 추천하는 아이디어 팩을 확인해보세요.</p>
                  </div>
              )}
          </div>
      </div>
      
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', color: labelColor, marginBottom: '10px', fontWeight: 'bold' }}>곡의 주제 및 아이디어 (Topic)</label>
                <textarea 
                value={project.concept || ''}
                onChange={e => onUpdate({ concept: e.target.value })}
                placeholder="예: 해변가 파티에서 만난 첫사랑, 뜨거운 모래사장..."
                style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', resize: 'none', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', color: '#e11d48', fontWeight: 'bold', marginBottom: '10px' }}>스타일 (Style) - 사운드 생성 가이드</label>
                <textarea 
                value={project.styleDescription || ''}
                onChange={e => onUpdate({ styleDescription: e.target.value })}
                placeholder="예: 1990년대 스타일의 올드스쿨 느낌, 슬프지만 춤추기 좋은, 여성 보컬의 애절함..."
                style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #e11d48', color: 'white', resize: 'none', boxSizing: 'border-box' }}
                />
            </div>
          </div>

          <div>
             <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ color: labelColor, fontWeight: 'bold' }}>현재 제목 (Title)</label>
                    <button 
                        onClick={generateTitleSuggestions}
                        disabled={loadingTitles}
                        style={{ 
                            fontSize: '11px', padding: '4px 10px', backgroundColor: '#3b82f6', color: 'white', 
                            border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' 
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>magic_button</span>
                        {loadingTitles ? '추천 중...' : 'AI 제목 추천 (5가지)'}
                    </button>
                </div>
                <input 
                    type="text" 
                    value={project.title}
                    onChange={e => onUpdate({ title: e.target.value })}
                    style={{ width: '100%', padding: '15px', borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', fontSize: '18px', fontWeight: 'bold', boxSizing: 'border-box' }}
                />
                
                {/* Title Suggestions Chips */}
                {titleSuggestions.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {titleSuggestions.map((st, i) => (
                            <button 
                                key={i}
                                onClick={() => applySuggestedTitle(st)}
                                style={{ 
                                    padding: '6px 12px', backgroundColor: '#1f2937', border: '1px solid #3b82f6', 
                                    color: '#93c5fd', borderRadius: '15px', fontSize: '12px', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1f2937'}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                )}
             </div>

             {/* Reference Song Section */}
             <div style={{ padding: '20px', backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                    <label style={{ color: '#818cf8', fontWeight: 'bold' }}>참고할 노래 (Reference)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            onClick={generateReferenceSuggestions}
                            disabled={loadingReferences}
                            style={{ fontSize: '11px', backgroundColor: '#818cf8', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>auto_awesome</span>
                            {loadingReferences ? '추천 중...' : 'AI 추천'}
                        </button>
                        <button 
                            onClick={searchYouTube}
                            style={{ fontSize: '11px', backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>smart_display</span>
                            YouTube
                        </button>
                    </div>
                </div>

                {/* Reference Suggestions Chips */}
                {referenceSuggestions.length > 0 && (
                    <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {referenceSuggestions.map((ref, idx) => (
                            <div 
                                key={idx}
                                onClick={() => applyReference(ref.song, ref.artist)}
                                style={{ 
                                    fontSize: '11px', padding: '8px 12px', backgroundColor: '#111827', 
                                    border: '1px solid #4b5563', borderRadius: '6px', cursor: 'pointer',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#818cf8'; e.currentTarget.style.backgroundColor = 'rgba(129, 140, 248, 0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#4b5563'; e.currentTarget.style.backgroundColor = '#111827'; }}
                            >
                                <span style={{ color: legibilityMode ? '#FFFFFF' : '#d1d5db' }}><strong>{ref.song}</strong> - {ref.artist}</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#818cf8' }}>add_circle</span>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="text" 
                        value={project.referenceSongTitle || ''}
                        onChange={e => onUpdate({ referenceSongTitle: e.target.value })}
                        placeholder="노래 제목 (예: Hype Boy)"
                        style={{ width: '100%', padding: '12px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                    <input 
                        type="text" 
                        value={project.referenceArtist || ''}
                        onChange={e => onUpdate({ referenceArtist: e.target.value })}
                        placeholder="가수 이름 (예: NewJeans)"
                        style={{ width: '100%', padding: '12px', backgroundColor: '#111827', border: '1px solid #4b5563', color: 'white', borderRadius: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <p style={{ fontSize: '12px', color: legibilityMode ? '#E5E7EB' : '#9ca3af', marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', marginTop: '2px' }}>info</span>
                    참고 곡 정보를 입력하면 AI가 비슷한 바이브의 가사와 사운드 프롬프트를 생성해줍니다.
                </p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default ConceptTab;
