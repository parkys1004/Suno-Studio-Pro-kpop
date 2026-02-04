
export const GENRES = [
  { label: 'K-Pop', subgenres: ['Girl Crush', 'Refreshing', 'High Teen', 'Dark Concept', 'Jersey Club', 'Easy Listening', 'Afrobeats'] },
  { label: 'Ballad', subgenres: ['Traditional Ballad', 'Rock Ballad', 'R&B Ballad', 'Indie Ballad'] },
  { label: 'Hip-Hop', subgenres: ['Trap', 'Boom Bap', 'Singing Rap', 'K-HipHop', 'Jazz Rap', 'Old School'] },
  { label: 'R&B', subgenres: ['K-R&B', 'Soul', 'Groovy', 'Neo Soul', 'Alternative R&B'] },
  { label: 'Electronic', subgenres: ['House', 'Future Bass', 'Techno', 'Deep House', 'Hyperpop'] },
  { label: 'Fusion', subgenres: ['Fusion Gugak', 'Joseon Pop', 'Pansori Hip-Hop', 'Folk Rock Fusion'] },
  { label: 'Trot', subgenres: ['Dance Trot', 'Traditional Trot', 'EDM Trot', 'Semi-Trot'] },
  { label: 'Band/Rock', subgenres: ['Modern Rock', 'Punk Rock', 'Synth Rock', 'Metal', 'Acoustic Rock'] },
  { label: 'Indie/Folk', subgenres: ['Acoustic Folk', 'City Pop', 'Lo-fi', 'Dream Pop'] },
  { label: 'Jazz/Bossa', subgenres: ['Standard Jazz', 'Bossa Nova', 'Swing', 'Fusion Jazz'] },
  { label: 'OST', subgenres: ['Drama OST', 'Cinematic', 'Musical Style', 'Game Music'] },
  { label: 'Healing/Meditation', subgenres: ['Piano Solo', 'Ambient', 'Nature Sounds (ASMR)', 'Meditation Guide', 'Deep Sleep Music', 'Singing Bowl'] },
  { label: 'Custom', subgenres: [] }
];

export const MOODS = [
  { id: 'energetic', label: 'Energetic & Powerful', ko: '신나는 / 파워풀한', color: '#FF4500' },
  { id: 'sentimental', label: 'Sentimental & Sad', ko: '아련한 / 슬픈', color: '#4682B4' },
  { id: 'refreshing', label: 'Refreshing & Cool', ko: '청량한 / 시원한', color: '#00CED1' },
  { id: 'dreamy', label: 'Dreamy & Mystical', ko: '몽환적인 / 신비로운', color: '#9370DB' },
  { id: 'hip', label: 'Hip & Swag', ko: '힙한 / 스웨그 넘치는', color: '#FFD700' },
  { id: 'lovely', label: 'Lovely & Sweet', ko: '사랑스러운 / 달콤한', color: '#FF69B4' },
  { id: 'dark', label: 'Dark & Intense', ko: '강렬한 / 어두운', color: '#2F4F4F' },
  { id: 'retro', label: 'Retro & Funky', ko: '레트로 / 펑키한', color: '#FF6347' },
  { id: 'chill', label: 'Chill & Relaxed', ko: '편안한 / 여유로운', color: '#8FBC8F' },
  { id: 'traditional', label: 'Traditional & Han', ko: '한국적 / 한이 서린', color: '#8B4513' },
  { id: 'grand', label: 'Grand & Epic', ko: '웅장한 / 압도적인', color: '#B8860B' },
  { id: 'urban', label: 'Urban & Sophisticated', ko: '도시적인 / 세련된', color: '#708090' },
  { id: 'warm', label: 'Warm & Comforting', ko: '따스한 / 위로가 되는', color: '#F4A460' },
  { id: 'playful', label: 'Playful & Quirky', ko: '발랄한 / 장난스러운', color: '#ADFF2F' },
  { id: 'tense', label: 'Tense & Thrilling', ko: '긴박한 / 긴장감 넘치는', color: '#8B0000' }
];

export const INSTRUMENTS = [
  'Piano', 'Soft Piano', 'Synthesizer', 'Synth Pads', 'Organ',
  'Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Bass', 'Slap Bass', '808 Bass',
  'Drums', 'Trap Beats', 'Electronic Drums', 'Percussion',
  'Strings', 'Violin', 'Cello', 'Orchestra',
  'Brass', 'Trumpet', 'Saxophone',
  'Gayageum (Zither)', 'Haegeum (Fiddle)', 'Janggu (Drum)', 'Kwaenggwari (Gong)', 'Daeguem (Flute)', 'Piri',
  'Backing Vocals', 'Whistle', 'FX'
];

export const GENRE_DEFAULTS: Record<string, string[]> = {
  'K-Pop': ['Synthesizer', 'Bass', 'Electronic Drums', 'Vocals', 'Backing Vocals', 'FX'],
  'Ballad': ['Piano', 'Strings', 'Acoustic Guitar', 'Bass', 'Drums'],
  'Hip-Hop': ['808 Bass', 'Trap Beats', 'Synthesizer', 'Piano'],
  'R&B': ['Electric Piano', 'Bass', 'Snap', 'Soft Synth', 'Electric Guitar'],
  'Fusion': ['Gayageum (Zither)', 'Haegeum (Fiddle)', 'Trap Beats', 'Synthesizer', 'Janggu (Drum)'],
  'Trot': ['Brass', 'Accordion', 'Electronic Drums', 'Synthesizer', 'Bass'],
  'Band/Rock': ['Electric Guitar', 'Bass', 'Drums', 'Synthesizer'],
  'Indie/Folk': ['Acoustic Guitar', 'Piano', 'Shaker', 'Bass'],
  'OST': ['Orchestra', 'Piano', 'Strings', 'Acoustic Guitar'],
  'Custom': ['Drums', 'Bass', 'Piano', 'Synthesizer']
};

export const GENRE_PRESETS: Record<string, { label: string, bpm: number, key: string, instruments?: string[] }[]> = {
  'K-Pop': [
    { label: '💖 Girl Crush (Blackpink Style)', bpm: 130, key: 'F#m', instruments: ['Synthesizer', '808 Bass', 'Trap Beats', 'Brass'] },
    { label: '🌊 Refreshing (Seventeen Style)', bpm: 118, key: 'C', instruments: ['Electric Guitar', 'Synthesizer', 'Slap Bass', 'Vocals'] },
    { label: '🏫 High Teen (NewJeans Style)', bpm: 105, key: 'G', instruments: ['Synth Pads', 'Drum Break', 'Bass', 'Soft Vocals'] },
    { label: '😈 Dark Concept (Stray Kids Style)', bpm: 140, key: 'Em', instruments: ['Distorted Synth', 'Heavy Drums', 'Screams', 'Bass'] },
    { label: '🧚 Dreamy (Oh My Girl Style)', bpm: 120, key: 'Eb', instruments: ['Strings', 'Wind Chimes', 'Piano', 'Synth'] }
  ],
  'Ballad': [
    { label: '🎹 Traditional Ballad', bpm: 68, key: 'C', instruments: ['Grand Piano', 'Strings', 'Bass', 'Drums'] },
    { label: '🎸 Rock Ballad', bpm: 75, key: 'D', instruments: ['Electric Guitar', 'Drums', 'Bass', 'Piano'] },
    { label: '🍂 Indie Acoustic', bpm: 80, key: 'G', instruments: ['Acoustic Guitar', 'Shaker', 'Melodica'] },
    { label: '🌙 R&B Ballad', bpm: 85, key: 'Bb', instruments: ['Electric Piano', 'Synth Bass', 'Soft Drums'] },
    { label: '🎬 Cinematic Ballad (OST)', bpm: 65, key: 'F', instruments: ['Full Orchestra', 'Piano', 'Timpani'] }
  ],
  'Hip-Hop': [
    { label: '⛓️ Trap (Club)', bpm: 140, key: 'C#m', instruments: ['808 Bass', 'Hi-hat Rolls', 'Synth', 'Autotune'] },
    { label: '🎤 Singing Rap (Melodic)', bpm: 95, key: 'Am', instruments: ['Piano', 'Lofi Drums', 'Bass', 'Acoustic Guitar'] },
    { label: '🎷 Jazz Rap', bpm: 90, key: 'Bb', instruments: ['Saxophone', 'Double Bass', 'Piano', 'Brush Drums'] },
    { label: '🎧 Boom Bap (Old School)', bpm: 92, key: 'Fm', instruments: ['Breakbeat', 'Sampled Horns', 'Scratch', 'Bass'] },
    { label: '💂 Drill (Grime)', bpm: 142, key: 'Gm', instruments: ['Sliding 808', 'Dark Piano', 'Snare', 'Violin'] }
  ],
  'R&B': [
    { label: '🌙 K-R&B (Trendy)', bpm: 90, key: 'Fm', instruments: ['Electric Piano', 'Synth Bass', 'Finger Snap'] },
    { label: '🍷 Neo Soul (Groovy)', bpm: 80, key: 'Eb', instruments: ['Organ', 'Bass', 'Clean Guitar', 'Rimshot'] },
    { label: '🕯️ Slow Jam (Sexy)', bpm: 70, key: 'Ab', instruments: ['Synth Pads', 'Sub Bass', 'Chimes'] },
    { label: '🌌 Alternative R&B', bpm: 110, key: 'Bm', instruments: ['Distorted Drums', 'Atmospheric Synth', 'Reverb'] },
    { label: '🕺 Funk R&B', bpm: 115, key: 'E', instruments: ['Slap Bass', 'Brass Section', 'Funky Guitar'] }
  ],
  'Electronic': [
    { label: '🏠 House (Club)', bpm: 124, key: 'Am', instruments: ['909 Kick', 'Piano Chords', 'Hi-hats', 'Bass'] },
    { label: '✨ Future Bass', bpm: 150, key: 'F', instruments: ['Super Saw Synth', 'Vocal Chops', '808', 'Arpeggio'] },
    { label: '🍸 Deep House', bpm: 122, key: 'Cm', instruments: ['Sub Bass', 'Soft Pads', 'Shaker', 'Pluck Synth'] },
    { label: '🔧 Techno (Hard)', bpm: 130, key: 'Dm', instruments: ['Industrial Kick', 'Acid Synth', 'Rumble Bass'] },
    { label: '👾 Hyperpop', bpm: 160, key: 'G#m', instruments: ['Glitch FX', 'Distorted Bass', 'Square Wave'] }
  ],
  'Fusion': [
    { label: '🇰🇷 Fusion Gugak (Leenalchi)', bpm: 130, key: 'Am', instruments: ['Bass', 'Drums', 'Pansori Vocals', 'Kwaenggwari'] },
    { label: '🏮 Joseon Pop', bpm: 100, key: 'Dm', instruments: ['Gayageum', 'Synth', 'Trap Beats', 'Daeguem'] },
    { label: '🏯 Historical Epic', bpm: 145, key: 'Cm', instruments: ['Taiko Drums', 'Haegeum', 'Orchestra', 'Choir'] },
    { label: '🎸 Folk Rock Fusion', bpm: 110, key: 'G', instruments: ['Acoustic Guitar', 'Janggu', 'Piano'] },
    { label: '🔮 Shamanic Techno', bpm: 135, key: 'Em', instruments: ['Electronic Beat', 'Piri', 'Jing', 'Throat Singing'] }
  ],
  'Trot': [
    { label: '💃 Dance Trot', bpm: 130, key: 'Am', instruments: ['Brass', 'Synthesizer', 'Electronic Drums', 'Bass'] },
    { label: '😭 Traditional Trot', bpm: 85, key: 'Dm', instruments: ['Accordion', 'Guitar', 'Violin', 'Woodblock'] },
    { label: '⚡ EDM Trot', bpm: 135, key: 'Gm', instruments: ['Heavy Kick', 'Saw Synth', 'Brass', 'Clap'] },
    { label: '🎸 Semi-Trot', bpm: 120, key: 'C', instruments: ['Acoustic Guitar', 'Light Percussion', 'Harmonica'] },
    { label: '📻 Retro Trot', bpm: 125, key: 'Em', instruments: ['Organ', 'Electric Guitar', 'Double Bass'] }
  ],
  'Band/Rock': [
    { label: '🎸 Modern Rock', bpm: 120, key: 'E', instruments: ['Electric Guitar', 'Synth', 'Bass', 'Drums'] },
    { label: '🛹 Punk Rock', bpm: 160, key: 'A', instruments: ['Distorted Guitar', 'Fast Drums', 'Bass', 'Gang Vocals'] },
    { label: '🎹 Synth Rock', bpm: 128, key: 'Bm', instruments: ['Synthesizer', 'Drum Machine', 'Electric Guitar'] },
    { label: '🤘 Heavy Metal', bpm: 150, key: 'Dm', instruments: ['Distortion', 'Double Bass Drum', 'Screams'] },
    { label: '🪵 Acoustic Rock', bpm: 100, key: 'G', instruments: ['Acoustic Guitar', 'Cajon', 'Piano', 'Bass'] }
  ],
  'Indie/Folk': [
    { label: '🌃 City Pop', bpm: 110, key: 'F', instruments: ['Retro Synth', 'Funky Guitar', 'Bass', 'Saxophone'] },
    { label: '☕ Cafe Acoustic', bpm: 80, key: 'D', instruments: ['Acoustic Guitar', 'Piano', 'Shaker'] },
    { label: '📼 Lo-fi Indie', bpm: 85, key: 'Ab', instruments: ['Vinyl Crackle', 'Soft Keys', 'Muted Trumpet'] },
    { label: '☁️ Dream Pop', bpm: 100, key: 'C#m', instruments: ['Reverb Guitar', 'Whisper Vocals', 'Synth Pad'] },
    { label: '📖 Folk Ballad', bpm: 75, key: 'C', instruments: ['Harmonica', 'Acoustic Guitar', 'Accordion'] }
  ],
  'Jazz/Bossa': [
    { label: '🎺 Standard Jazz', bpm: 120, key: 'Bb', instruments: ['Walking Bass', 'Piano', 'Ride Cymbal', 'Trumpet'] },
    { label: '🏖️ Bossa Nova', bpm: 130, key: 'Dmaj7', instruments: ['Nylon Guitar', 'Shaker', 'Piano', 'Flute'] },
    { label: '🕶️ Acid Jazz', bpm: 105, key: 'Am', instruments: ['Funky Drums', 'Rhodes', 'Brass', 'Wah Guitar'] },
    { label: '🎷 Big Band', bpm: 160, key: 'C', instruments: ['Brass Section', 'Upright Bass', 'Drums'] },
    { label: '🧘 Smooth Jazz', bpm: 95, key: 'E', instruments: ['Saxophone', 'Synth Pads', 'Electric Bass'] }
  ],
  'OST': [
    { label: '🎬 Drama Emotional', bpm: 65, key: 'Bb', instruments: ['Piano', 'Orchestra', 'Strings'] },
    { label: '⚔️ Epic Action', bpm: 120, key: 'Gm', instruments: ['Percussion', 'Brass', 'Strings', 'Choir'] },
    { label: '💕 Rom-Com', bpm: 110, key: 'G', instruments: ['Pizzicato Strings', 'Whistle', 'Piano', 'Shaker'] },
    { label: '🔎 Mystery/Thriller', bpm: 90, key: 'Dm', instruments: ['Low Strings', 'FX', 'Piano', 'Sub Bass'] },
    { label: '🎎 Historical (Sageuk)', bpm: 80, key: 'Cm', instruments: ['Daegeum', 'Gayageum', 'Strings', 'Percussion'] }
  ],
  'Healing/Meditation': [
    { label: '🎹 Piano Solo', bpm: 60, key: 'C', instruments: ['Soft Piano', 'Reverb'] },
    { label: '🌌 Ambient', bpm: 0, key: 'E', instruments: ['Synth Pads', 'No Drums', 'Drone'] },
    { label: '🌿 Nature ASMR', bpm: 60, key: 'G', instruments: ['Rain Sound', 'Flute', 'Wind Chimes'] },
    { label: '💤 Deep Sleep', bpm: 50, key: 'Bb', instruments: ['Low Frequencies', 'Soft Synth', 'White Noise'] },
    { label: '🧘 Singing Bowl', bpm: 0, key: 'C', instruments: ['Bell Sounds', 'Soft Chimes', 'Silence'] }
  ],
  'Custom': [
    { label: 'Basic', bpm: 100, key: 'C', instruments: ['Piano', 'Drums', 'Bass'] }
  ]
};

export const GENRE_GUIDE_DATA = [
    {
        title: "1. K-Pop (케이팝)",
        color: "#e11d48", // Rose
        items: [
            { term: "Girl Crush (걸크러쉬)", desc: "당당하고 강렬한 여성미를 강조하는 파워풀한 스타일입니다." },
            { term: "Refreshing (청량)", desc: "시원하고 맑은 느낌의 멜로디와 밝은 에너지가 특징입니다." },
            { term: "High Teen (하이틴)", desc: "하이틴 영화처럼 발랄하고 키치하며 트렌디한 감성을 담습니다." },
            { term: "Dark Concept (다크 컨셉)", desc: "웅장하고 무거우며, 신비롭거나 카리스마 넘치는 분위기입니다." },
            { term: "Jersey Club (저지 클럽)", desc: "독특한 킥 드럼 패턴과 빠른 템포가 결합된 트렌디한 비트입니다." },
            { term: "Easy Listening (이지리스닝)", desc: "편안하게 귀에 들어와 일상에서 반복해 듣기 좋은 곡들입니다." },
            { term: "Afrobeats (아프로비츠)", desc: "아프리카 특유의 리듬감을 K-Pop에 접목한 그루비한 스타일입니다." }
        ]
    },
    {
        title: "2. Ballad (발라드)",
        color: "#3b82f6", // Blue
        items: [
            { term: "Traditional Ballad (전통 발라드)", desc: "정석적인 기승전결과 호소력 짙은 보컬 중심의 곡입니다." },
            { term: "Rock Ballad (락 발라드)", desc: "밴드 사운드의 강렬함과 발라드의 감성이 합쳐진 스타일입니다." },
            { term: "R&B Ballad (R&B 발라드)", desc: "알앤비 특유의 세련된 리듬과 기교가 섞인 감성적인 곡입니다." },
            { term: "Indie Ballad (인디 발라드)", desc: "아티스트만의 독창적이고 소박한 감성이 돋보이는 발라드입니다." }
        ]
    },
    {
        title: "3. Hip-Hop (힙합)",
        color: "#f59e0b", // Amber
        items: [
            { term: "Trap (트랩)", desc: "묵직한 베이스와 화려한 하이햇 컨트롤이 특징인 현대 힙합의 주류입니다." },
            { term: "Boom Bap (붐뱁)", desc: "묵직한 드럼 비트와 샘플링을 기반으로 한 고전적인 힙합 스타일입니다." },
            { term: "Singing Rap (싱잉랩)", desc: "랩에 멜로디를 얹어 노래하듯 전달하는 부드러운 스타일입니다." },
            { term: "K-HipHop (국힙)", desc: "한국적인 정서와 메시지가 담긴 한국 힙합 장르입니다." },
            { term: "Jazz Rap (재즈랩)", desc: "재즈 선율을 샘플링하여 지적이고 편안한 분위기를 풍기는 힙합입니다." },
            { term: "Old School (올드스쿨)", desc: "힙합 초기의 리듬과 정통 스타일을 지향하는 사운드입니다." }
        ]
    },
    {
        title: "4. R&B (알앤비)",
        color: "#8b5cf6", // Violet
        items: [
            { term: "K-R&B (K-알앤비)", desc: "한국 특유의 감각적인 보컬과 세련된 편곡이 결합된 장르입니다." },
            { term: "Soul (소울)", desc: "감정의 깊은 울림과 보컬의 힘이 강조된 흑인 음악 기반 장르입니다." },
            { term: "Groovy (그루비)", desc: "리듬감이 살아있어 자연스럽게 몸이 움직여지는 경쾌한 곡들입니다." },
            { term: "Neo Soul (네오 소울)", desc: "고전 소울에 재즈, 힙합 등을 섞은 몽환적이고 현대적인 스타일입니다." },
            { term: "Alternative R&B (얼터너티브 R&B)", desc: "기존 알앤비의 틀을 벗어나 실험적이고 신비로운 사운드를 추구합니다." }
        ]
    },
    {
        title: "5. Electronic (일렉트로닉)",
        color: "#10b981", // Emerald
        items: [
            { term: "House (하우스)", desc: "4/4 박자의 일정한 비트가 반복되는 전자 음악의 대표 장르입니다." },
            { term: "Future Bass (퓨처 베이스)", desc: "밝고 화려한 신디사이저 사운드와 팝적인 멜로디가 강조된 음악입니다." },
            { term: "Techno (테크노)", desc: "기계적이고 반복적인 리듬을 통해 몰입감을 주는 전자 음악입니다." },
            { term: "Deep House (딥 하우스)", desc: "하우스보다 느릿하고 몽환적이며 재즈적인 느낌이 가미된 음악입니다." },
            { term: "Hyperpop (하이퍼팝)", desc: "과장된 변조와 고속 비트를 사용하는 미래지향적이고 실험적인 팝입니다." }
        ]
    },
    {
        title: "6. Fusion (퓨전)",
        color: "#db2777", // Pink
        items: [
            { term: "Fusion Gugak (퓨전 국악)", desc: "전통 국악기와 현대적인 밴드/전자 사운드를 결합한 형태입니다." },
            { term: "Joseon Pop (조선팝)", desc: "민요나 판소리를 팝적인 리듬으로 풀어낸 대중적인 퓨전 음악입니다." },
            { term: "Pansori Hip-Hop (판소리 힙합)", desc: "판소리의 서사와 창법을 힙합 비트에 얹은 독특한 스타일입니다." },
            { term: "Folk Rock Fusion (포크 락 퓨전)", desc: "서정적인 포크 음악과 강렬한 락 음악을 조화시킨 장르입니다." }
        ]
    },
    {
        title: "7. Trot (트로트)",
        color: "#f97316", // Orange
        items: [
            { term: "Dance Trot (댄스 트로트)", desc: "빠른 댄스 비트와 트로트가 만나 흥을 돋우는 신나는 스타일입니다." },
            { term: "Traditional Trot (전통 트로트)", desc: "정통 창법과 꺾기가 살아있는 고유의 성인가요 스타일입니다." },
            { term: "EDM Trot (EDM 트로트)", desc: "강렬한 전자 음악 비트에 트로트 멜로디를 얹은 현대적인 장르입니다." },
            { term: "Semi-Trot (세미 트로트)", desc: "팝과 트로트의 중간 느낌으로 전 세대가 부담 없이 즐기는 스타일입니다." }
        ]
    },
    {
        title: "8. Band/Rock (밴드/락)",
        color: "#ef4444", // Red
        items: [
            { term: "Modern Rock (모던 락)", desc: "대중적이고 세련된 멜로디를 강조한 현대적인 락 사운드입니다." },
            { term: "Punk Rock (펑크 락)", desc: "빠르고 단순하며 저항적이고 에너지가 넘치는 사운드입니다." },
            { term: "Synth Rock (신스 락)", desc: "전자 음악의 신디사이저와 락의 기타 사운드가 조화를 이루는 장르입니다." },
            { term: "Metal (메탈)", desc: "아주 강렬한 기타 리프와 드럼, 파워풀한 보컬이 특징인 장르입니다." },
            { term: "Acoustic Rock (어쿠스틱 락)", desc: "통기타를 중심으로 부드럽고 자연스러운 사운드를 내는 락입니다." }
        ]
    },
    {
        title: "9. Indie/Folk (인디/포크)",
        color: "#14b8a6", // Teal
        items: [
            { term: "Acoustic Folk (어쿠스틱 포크)", desc: "소박한 악기 구성과 가사를 중시하는 서정적인 장르입니다." },
            { term: "City Pop (시티팝)", desc: "80년대 도회적인 분위기와 세련된 청량감을 주는 팝 사운드입니다." },
            { term: "Lo-fi (로파이)", desc: "일부러 잡음을 섞거나 음질을 낮춰 편안하고 빈티지한 분위기를 줍니다." },
            { term: "Dream Pop (드림팝)", desc: "마치 꿈속을 헤매는 듯 몽환적이고 잔잔한 공간감이 돋보이는 음악입니다." }
        ]
    },
    {
        title: "10. Jazz/Bossa (재즈/보사노바)",
        color: "#a855f7", // Purple
        items: [
            { term: "Standard Jazz (스탠다드 재즈)", desc: "재즈 역사에서 오랫동안 사랑받아온 정통 명곡 스타일입니다." },
            { term: "Bossa Nova (보사노바)", desc: "브라질 리듬에 재즈 화성이 섞인 부드럽고 감미로운 음악입니다." },
            { term: "Swing (스윙)", desc: "춤추기에 적합한 경쾌하고 리드미컬한 재즈 스타일입니다." },
            { term: "Fusion Jazz (퓨전 재즈)", desc: "재즈에 락이나 전자 음악 요소가 결합된 세련된 현대 재즈입니다." }
        ]
    },
    {
        title: "11. OST (사운드트랙)",
        color: "#ec4899", // Pink-500
        items: [
            { term: "Drama OST (드라마 OST)", desc: "드라마의 명장면을 떠올리게 하는 서사 중심의 곡들입니다." },
            { term: "Cinematic (시네마틱)", desc: "영화처럼 웅장하고 공간감이 느껴지는 배경 음악 스타일입니다." },
            { term: "Musical Style (뮤지컬 스타일)", desc: "가창력이 돋보이며 연극적인 요소가 강한 곡입니다." },
            { term: "Game Music (게임 음악)", desc: "게임의 세계관과 몰입도를 높여주는 배경 음악 및 테마곡입니다." }
        ]
    },
    {
        title: "12. Healing/Meditation (힐링/명상)",
        color: "#6366f1", // Indigo
        items: [
            { term: "Piano Solo (피아노 솔로)", desc: "맑고 잔잔한 피아노 연주로 마음의 안정을 주는 곡입니다." },
            { term: "Ambient (앰비언트)", desc: "뚜렷한 리듬보다 분위기를 감싸주는 몽환적인 배경 사운드입니다." },
            { term: "Nature Sounds (ASMR)", desc: "빗소리, 파도 소리 등 자연의 소리로 심리적 안정을 줍니다." },
            { term: "Meditation Guide (명상 가이드)", desc: "명상을 돕는 잔잔한 음악과 안내가 포함된 형태입니다." },
            { term: "Deep Sleep Music (수면 음악)", desc: "깊은 잠을 유도하기 위해 극도로 잔잔하고 부드러운 곡들입니다." },
            { term: "Singing Bowl (싱잉볼)", desc: "명상 도구인 싱잉볼의 고유한 진동음을 담아 이완을 돕습니다." }
        ]
    }
];
