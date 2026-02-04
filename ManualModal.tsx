import React from 'react';

const ManualModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 5000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
        <div style={{
            backgroundColor: '#1f2937', width: '900px', maxWidth: '95vw', maxHeight: '85vh',
            borderRadius: '16px', border: '1px solid #374151', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', borderRadius: '16px 16px 0 0' }}>
                <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fbbf24' }}>menu_book</span>
                    Suno Studio Pro 매뉴얼
                </h2>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <div style={{ padding: '30px', overflowY: 'auto', color: '#e5e7eb', lineHeight: '1.7', backgroundColor: '#1f2937' }}>
                
                {/* --- NEW SECTION: Free Tier Guide --- */}
                <section style={{ marginBottom: '40px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #3b82f6', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', background: 'linear-gradient(90deg, #1e3a8a 0%, #111827 100%)', borderBottom: '1px solid #1e40af' }}>
                        <h3 style={{ margin: 0, color: '#93c5fd', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined" style={{ color: '#60a5fa' }}>tips_and_updates</span>
                            Suno Studio Pro: 무료 API 키 200% 활용 가이드
                        </h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#dbeafe', opacity: 0.8 }}>
                            Google AI Studio 무료 등급(Free Tier) 사용자를 위한 최적의 설정법과 팁을 확인하세요.
                        </p>
                    </div>

                    <div style={{ padding: '20px' }}>
                        {/* 1. Model Limits Table */}
                        <h4 style={{ color: 'white', marginTop: 0, marginBottom: '15px', fontSize: '15px', borderLeft: '4px solid #60a5fa', paddingLeft: '10px' }}>1. 모델별 한도 및 추천 용도</h4>
                        <div style={{ overflowX: 'auto', marginBottom: '25px', borderRadius: '8px', border: '1px solid #374151' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#374151', color: '#fbbf24' }}>
                                        <th style={{ padding: '12px' }}>구분</th>
                                        <th style={{ padding: '12px' }}>추천 모드 (모델)</th>
                                        <th style={{ padding: '12px' }}>일일 제한 (RPD)</th>
                                        <th style={{ padding: '12px' }}>주요 특징</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #374151' }}>
                                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#10b981' }}>메인 작업</td>
                                        <td style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Stable (3.0 Flash)</td>
                                        <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>1,500회</td>
                                        <td style={{ padding: '12px', color: '#d1d5db' }}>속도가 빠르고 사실상 무제한에 가깝습니다.</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #374151' }}>
                                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#818cf8' }}>심층 분석</td>
                                        <td style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Pro (3.0 Pro)</td>
                                        <td style={{ padding: '12px', color: '#ef4444', fontWeight: 'bold' }}>50회 미만</td>
                                        <td style={{ padding: '12px', color: '#d1d5db' }}>추론 능력이 뛰어나지만, 남용 시 차단됩니다.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#f59e0b' }}>가사 교정</td>
                                        <td style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Lyrics Editor</td>
                                        <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>1,500회</td>
                                        <td style={{ padding: '12px', color: '#d1d5db' }}>2.0 Flash 기반으로 안정적인 수정이 가능합니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 2. Switching Strategy */}
                        <h4 style={{ color: 'white', marginTop: 0, marginBottom: '15px', fontSize: '15px', borderLeft: '4px solid #fbbf24', paddingLeft: '10px' }}>
                            2. 상황별 스마트 스위칭 전략 (Golden Rules)
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#34d399', fontWeight: 'bold' }}>
                                    <span className="material-symbols-outlined">speed</span> 가사 초안 & 스케치
                                </div>
                                <p style={{ fontSize: '12px', color: '#d1fae5', margin: 0 }}>
                                    기본 가사 생성, 장르 설정 시에는 반드시 <strong>[Flash (3.0)]</strong>에 두세요. 분당 15회 요청이 가능하여 "다시 만들기"를 연타해도 안전합니다.
                                </p>
                            </div>
                            <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#818cf8', fontWeight: 'bold' }}>
                                    <span className="material-symbols-outlined">psychology</span> 복잡한 편곡 요청
                                </div>
                                <p style={{ fontSize: '12px', color: '#e0e7ff', margin: 0 }}>
                                    "가사가 너무 뻔하다"고 느껴질 때만 잠시 <strong>[Pro (3.0)]</strong>를 켜세요. 결과가 나오면 즉시 Flash 모드로 복귀하는 습관이 중요합니다.
                                </p>
                            </div>
                            <div style={{ gridColumn: '1 / -1', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#60a5fa', fontWeight: 'bold' }}>
                                    <span className="material-symbols-outlined">graphic_eq</span> 오디오 분석 (BPM 감지) 주의사항
                                </div>
                                <p style={{ fontSize: '12px', color: '#dbeafe', margin: 0 }}>
                                    오디오 파일은 텍스트보다 훨씬 많은 '토큰'을 소모합니다. <strong>1분 내외의 짧은 클립</strong> 위주로 분석하고, 연속 업로드 시 1~2분 휴식기를 가지세요.
                                </p>
                            </div>
                        </div>

                        {/* 3. Troubleshooting & Privacy */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ backgroundColor: '#374151', padding: '15px', borderRadius: '8px', fontSize: '13px' }}>
                                <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '5px' }}>🚧 장애 발생 시 대처법 (Troubleshooting)</strong>
                                <ul style={{ paddingLeft: '20px', margin: 0, color: '#d1d5db' }}>
                                    <li style={{ marginBottom: '5px' }}><strong>"429 Too Many Requests":</strong> 설정된 모델의 요청 한도 초과입니다. 앱의 자동 우회 시스템이 작동할 때까지 10초간 기다리거나, 모델을 한 단계 낮추세요 (Pro → Flash).</li>
                                    <li><strong>이미지 생성 안됨:</strong> 이미지 모델은 제한이 엄격합니다. <strong>Na Banana (Fast)</strong>를 우선 사용하고, 최종 확정 시에만 Pro (HD)를 쓰세요.</li>
                                </ul>
                            </div>
                            
                            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid #ef4444', display: 'flex', gap: '10px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>warning</span>
                                <div>
                                    <strong style={{ color: '#ef4444', fontSize: '13px' }}>⚠️ 꼭 알아두세요! (Privacy)</strong>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#fca5a5' }}>
                                        무료 API 키를 사용하면 입력한 가사나 프롬프트가 Google의 모델 학습 데이터로 활용될 수 있습니다. 보안이 중요한 미발표 곡 정보나 개인정보 입력 시 주의가 필요합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#e11d48', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>1. 프로젝트 시작 (Dashboard)</h3>
                    <p>새로운 음악 프로젝트를 생성하고 관리하는 공간입니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>New Project:</strong> 장르(K-Pop, Ballad 등), 무드, 제목을 설정하여 프로젝트를 생성합니다.</li>
                        <li><strong>프로젝트 관리:</strong> 클릭하여 편집하거나, JSON 파일로 내보내기/삭제가 가능합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#fbbf24', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>2. 기획 (Concept Tab)</h3>
                    <p>곡의 주제와 방향성을 설정합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>AI 아이디어 팩:</strong> 장르에 어울리는 제목, 주제, 스타일을 AI가 추천해줍니다.</li>
                        <li><strong>참고할 노래 (Reference):</strong> 유튜브나 기존 곡의 정보를 입력하면, 해당 곡의 바이브를 분석하여 가사와 사운드 생성에 반영합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#3b82f6', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>3. 구조 설계 (Structure Tab)</h3>
                    <p>곡의 흐름(Intro, Verse, Chorus 등)을 블록 단위로 설계합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>블록 편집:</strong> 각 파트의 설명(Description)을 수정하거나 순서를 변경할 수 있습니다.</li>
                        <li><strong>인트로 스타일:</strong> 곡의 시작 분위기를 결정합니다 (예: 속삭임, 강렬한 비트 등).</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#10b981', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>4. 가사 작업 (Lyrics Tab)</h3>
                    <p>AI를 활용해 곡의 구조에 맞는 가사를 생성합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>Dance Optimization Mode:</strong> 댄서들이 박자를 세기 쉽도록 8-count 구조에 맞춰 가사를 생성합니다.</li>
                        <li><strong>AI 길이 자동 조절:</strong> 설정된 목표 시간(Duration)에 맞춰 가사의 분량을 자동으로 조절합니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#ec4899', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>5. 사운드 디자인 (Sound Tab)</h3>
                    <p>Suno.ai에서 사용할 프롬프트를 생성합니다.</p>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>장르별 프리셋:</strong> 선택한 장르에 최적화된 BPM, Key, 악기 구성을 불러옵니다.</li>
                        <li><strong>Strict Dance Mode:</strong> 춤추기 좋은 정박(Steady Beat)을 유지하도록 프롬프트를 강화합니다.</li>
                        <li><strong>BPM 업로드:</strong> 오디오 파일을 업로드하여 BPM을 분석하고 프로젝트에 적용할 수 있습니다.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#ec4899', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '15px' }}>6. 아트 & 배포 (Art & Export)</h3>
                    <ul style={{ paddingLeft: '20px', color: '#d1d5db', fontSize: '14px' }}>
                        <li><strong>Art:</strong> 곡의 분위기에 어울리는 앨범 커버를 생성합니다.</li>
                        <li><strong>Export:</strong> 작업한 프로젝트를 JSON으로 백업하거나, 메타데이터 초안(제목, 가사, 태그 등)을 자동 생성하여 복사할 수 있습니다.</li>
                    </ul>
                </section>
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #374151', textAlign: 'center', backgroundColor: '#111827', borderRadius: '0 0 16px 16px' }}>
                <button onClick={onClose} style={{ padding: '10px 30px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    닫기
                </button>
            </div>
        </div>
    </div>
  );
};

export default ManualModal;