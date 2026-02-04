
export const EXCLUDED_KEYWORDS_PRESETS = [
    'Explicit', 'Violence', 'Drugs', 
    'Political', 'Sexual Themes', 'Sadness', 
    'Rap Parts', 'High Notes', 'English Lyrics',
    'Complex Words', 'Slang', 'Repetition'
];

export const DEFAULT_SAMPLE_PROMPTS = [
  {
    label: "✨ K-Pop Girl Crush",
    text: "[Intro: Heavy Bass], K-Pop Girl Crush, 130 BPM, Key F#m. Powerful 808 bass, trap beats, aggressive synth lead, confident female vocals, catchy hook, English rap verse. Charismatic and Bold style."
  },
  {
    label: "🌊 Refreshing Boy Group",
    text: "[Intro: Bright Synth], K-Pop Boy Group, 118 BPM, Key C. Cheongryang (Refreshing) vibe, funky guitar riff, slap bass, energetic drums, harmonization, high note ad-libs. Summer beach party vibe."
  },
  {
    label: "🇰🇷 Fusion Gugak Trap",
    text: "[Intro: Gayageum riff], Fusion Hip-hop, 95 BPM, Key Am. Traditional Korean instruments (Gayageum, Haegeum) mixed with heavy Trap beats. 808 bass, rap verses, Pansori style vocals in chorus. Unique and energetic."
  },
  {
    label: "🎤 Emotional OST Ballad",
    text: "[Intro: Soft Piano], K-Drama OST, 68 BPM, Key Eb. Emotional ballad, grand piano, orchestral strings, slow build-up, crying female vocals, climactic high note. Sad but beautiful."
  },
  {
    label: "🕺 Neo-Trot",
    text: "[Intro: Brass Hit], EDM Trot, 128 BPM, Key Am. Addictive melody, ppong-jak rhythm mixed with modern EDM beat. Brass section, synthesizer, energetic male vocals. Party atmosphere."
  }
];

export const PROMPT_CHEAT_SHEET = [
    {
        title: "Vocal Styles",
        icon: "mic",
        tags: [
            { label: "Female Vocals", desc: "여성 보컬" },
            { label: "Male Vocals", desc: "남성 보컬" },
            { label: "Duet", desc: "남녀 듀엣" },
            { label: "Choir", desc: "웅장한 합창" },
            { label: "Whisper", desc: "속삭이는 창법 (ASMR)" },
            { label: "Rap", desc: "랩 파트" },
            { label: "Autotune", desc: "오토튠 (기계음 보정)" },
            { label: "High Note", desc: "고음 (지르기)" },
            { label: "Husky", desc: "허스키한 목소리" },
            { label: "Falsetto", desc: "가성 (부드러운 고음)" },
            { label: "Gang Vocals", desc: "떼창 (다같이 외침)" },
            { label: "Narration", desc: "나레이션 (말하듯이)" },
            { label: "Screaming", desc: "스크리밍 (강렬한 외침)" },
            { label: "Growling", desc: "그로울링 (긁는 소리)" }
        ]
    },
    {
        title: "Emotional Moods",
        icon: "sentiment_satisfied",
        tags: [
            { label: "Uplifting", desc: "희망찬/고양되는" },
            { label: "Melancholic", desc: "우울한/애수 어린" },
            { label: "Energetic", desc: "에너지가 넘치는" },
            { label: "Chill", desc: "느긋한/편안한" },
            { label: "Dark", desc: "어둡고 무거운" },
            { label: "Romantic", desc: "낭만적인/사랑" },
            { label: "Dreamy", desc: "몽환적인/꿈같은" },
            { label: "Epic", desc: "대서사시적인/웅장한" },
            { label: "Sentimental", desc: "감성적인" },
            { label: "Groovy", desc: "리듬감 있는/흥겨운" },
            { label: "Sexy", desc: "매혹적인/섹시한" },
            { label: "Tense", desc: "긴장감 넘치는" },
            { label: "Nostalgic", desc: "향수를 불러일으키는" },
            { label: "Hopeful", desc: "희망적인" }
        ]
    },
    {
        title: "Main Instruments",
        icon: "piano",
        tags: [
            { label: "Piano", desc: "피아노" },
            { label: "Electric Guitar", desc: "일렉기타" },
            { label: "Acoustic Guitar", desc: "통기타" },
            { label: "Bass", desc: "베이스 기타" },
            { label: "808", desc: "808 베이스 (힙합)" },
            { label: "Synthesizer", desc: "신디사이저 (전자음)" },
            { label: "Strings", desc: "현악기 (바이올린 등)" },
            { label: "Violin", desc: "바이올린" },
            { label: "Brass", desc: "금관악기 (트럼펫 등)" },
            { label: "Saxophone", desc: "색소폰" },
            { label: "Drums", desc: "드럼 세트" },
            { label: "Percussion", desc: "타악기 (리듬)" },
            { label: "Flute", desc: "플루트" },
            { label: "Organ", desc: "오르간" }
        ]
    },
    {
        title: "Rhythm & Tempo",
        icon: "speed",
        tags: [
            { label: "Fast Tempo", desc: "빠른 템포" },
            { label: "Slow Tempo", desc: "느린 템포" },
            { label: "Syncopated", desc: "당김음 (엇박자)" },
            { label: "Steady Beat", desc: "정박자 (일정한 비트)" },
            { label: "Groovy Bassline", desc: "그루브한 베이스라인" },
            { label: "Breakbeat", desc: "브레이크비트 (쪼개진 리듬)" },
            { label: "Blast Beat", desc: "블래스트 비트 (매우 빠름)" },
            { label: "Shuffle", desc: "셔플 리듬" },
            { label: "Swing", desc: "스윙 리듬 (재즈)" },
            { label: "Polyrhythm", desc: "복합 리듬" },
            { label: "Half-time", desc: "하프 타임 (느리게 느껴짐)" }
        ]
    },
    {
        title: "Production Qualities",
        icon: "equalizer",
        tags: [
            { label: "Reverb", desc: "리버브 (공간감/울림)" },
            { label: "Clean Mix", desc: "깔끔한 믹싱" },
            { label: "Distorted", desc: "왜곡된 소리 (거친 느낌)" },
            { label: "Lo-fi", desc: "로파이 (빈티지/지지직)" },
            { label: "Wide Stereo", desc: "넓은 스테레오감" },
            { label: "Heavy Bass", desc: "둥둥거리는 베이스 강조" },
            { label: "Minimal", desc: "미니멀 (최소한의 악기)" },
            { label: "Maximalist", desc: "맥시멀 (꽉 찬 사운드)" },
            { label: "Atmospheric", desc: "분위기 있는 (대기음)" },
            { label: "Compressed", desc: "압축된 (단단한 소리)" },
            { label: "Raw", desc: "다듬어지지 않은 (날것의)" },
            { label: "Cinematic", desc: "영화 같은 웅장함" }
        ]
    },
    {
        title: "Quality Boosters (Experimental)",
        icon: "grade",
        tags: [
            { label: "[Is_MAX_MODE: MAX]", desc: "최대 성능 모드 (Experimental)" },
            { label: "[QUALITY: MAX]", desc: "음질 최우선 설정" },
            { label: "[REALISM: MAX]", desc: "사실적인 사운드 질감" },
            { label: "[REAL_INSTRUMENTS: MAX]", desc: "실제 악기 소리 강조" }
        ]
    }
];

export const LYRIC_CHEAT_SHEET = [
    {
        title: "1. 노래 구조 (Structure)",
        icon: "view_timeline",
        tags: [
            { label: "[Intro]", desc: "곡의 시작. 분위기 조성" },
            { label: "[Verse]", desc: "이야기 전개 (Verse 1, 2...)" },
            { label: "[Pre-Chorus]", desc: "빌드업. 분위기 고조" },
            { label: "[Chorus]", desc: "하이라이트/후렴. 에너지 최고조" },
            { label: "[Hook]", desc: "가장 중독성 있는 핵심 구간" },
            { label: "[Bridge]", desc: "분위기 반전이나 새로운 멜로디" },
            { label: "[Outro]", desc: "곡의 마무리" },
            { label: "[Fade Out]", desc: "서서히 소리가 줄어들며 끝남" },
            { label: "[Big Finish]", desc: "웅장하고 확실하게 딱 끝냄" },
            { label: "[End]", desc: "v5 필수: 가사 맨 끝에 작성 (깔끔한 종료)" }
        ]
    },
    {
        title: "2. 보컬 & 연출 (Vocal Style)",
        icon: "record_voice_over",
        tags: [
            { label: "()", desc: "소괄호: 백보컬/추임새 (예: (Ooh-yeah))" },
            { label: "[Choir]", desc: "웅장한 합창/코러스 라인" },
            { label: "[Backing Vocals]", desc: "메인 보컬 뒤에 깔리는 화음" },
            { label: "[Whisper]", desc: "속삭이듯 부름" },
            { label: "[Shout]", desc: "소리치듯 부름" },
            { label: "[Scream]", desc: "절규 (락/메탈/이모 힙합)" },
            { label: "[Spoken]", desc: "노래하지 않고 말하듯이 처리" },
            { label: "[Narration]", desc: "내레이션" },
            { label: "[Autotune]", desc: "기계적인 보컬 느낌 강조" },
            { label: "[Female Vocals]", desc: "여성 보컬 강제 (듀엣 시 유용)" },
            { label: "[Male Vocals]", desc: "남성 보컬 강제 (듀엣 시 유용)" },
            { label: "[Duet]", desc: "두 명의 보컬이 같이 부르는 느낌" }
        ]
    },
    {
        title: "3. 연주 & 분위기 (Instrumental)",
        icon: "piano",
        tags: [
            { label: "[Instrumental Interlude]", desc: "가사 없는 간주 구간" },
            { label: "[Solo]", desc: "악기 솔로 (악기명 지정 권장)" },
            { label: "[Guitar Solo]", desc: "기타 독주" },
            { label: "[Saxophone Solo]", desc: "색소폰 독주" },
            { label: "[Synth Solo]", desc: "신디사이저 독주" },
            { label: "[Drop]", desc: "비트가 터지는 구간 (EDM/힙합)" },
            { label: "[Break]", desc: "모든 악기가 멈추거나 리듬이 끊김" },
            { label: "[Build up]", desc: "점층적으로 고조되는 연출" },
            { label: "[Piano Breakdown]", desc: "피아노로 분위기 전환 (믹스매치)" }
        ]
    },
    {
        title: "4. v5 꿀팁 (Advanced Tips)",
        icon: "auto_awesome",
        tags: [
            { label: "[End]", desc: "가사 마지막 줄에 필수! (확실한 끝맺음)" },
            { label: "[Rap Verse]", desc: "발라드 중간에 랩 삽입 (장르 비틀기)" },
            { label: "[Clean End]", desc: "군더더기 없는 종료 유도" },
            { label: "[Ad-libs]", desc: "보컬의 자유로운 기교 유도" },
            { label: "[Short Pause]", desc: "잠깐의 정적 (호흡 조절)" },
            { label: "[Bass Drop]", desc: "베이스가 강조되는 구간" },
            { label: "[Acapella]", desc: "반주 없이 목소리만 나옴" }
        ]
    },
    {
        title: "5. 현장감 & 배경음 (Ambience)",
        icon: "surround_sound",
        tags: [
            { label: "[Sound of Rain]", desc: "빗소리 (Lo-fi, 재즈)" },
            { label: "[Crowd Cheering]", desc: "관중 환호/박수 (라이브 느낌)" },
            { label: "[Vinyl Crackle]", desc: "LP 지지직 소리 (빈티지)" },
            { label: "[Siren]", desc: "사이렌 소리 (힙합, 드릴)" },
            { label: "[Phone Ringing]", desc: "전화 벨소리 (내레이션 전후)" },
            { label: "[Waves]", desc: "파도 소리 (힐링, 어쿠스틱)" }
        ]
    },
    {
        title: "6. 인간적인 소리 (Human Sounds)",
        icon: "face",
        tags: [
            { label: "[Cough]", desc: "헛기침/목 가다듬기 (리얼함)" },
            { label: "[Laugh]", desc: "웃음소리/키득거림" },
            { label: "[Heavy Breathing]", desc: "거친 숨소리/헉헉" },
            { label: "[Sigh]", desc: "한숨 소리" },
            { label: "[Count in]", desc: "1, 2, 3, 4 카운트" },
            { label: "[Whistle]", desc: "휘파람 소리" }
        ]
    },
    {
        title: "7. DJ & 테크니컬 (Tech Effects)",
        icon: "settings_input_component",
        tags: [
            { label: "[Tape Stop]", desc: "늘어지며 뚝 끊기는 효과" },
            { label: "[Record Scratch]", desc: "DJ 스크래치 (끽-)" },
            { label: "[Glitch]", desc: "버벅거리는 오류음" },
            { label: "[Silence]", desc: "순간 음소거 (Stop)" },
            { label: "[Feedback]", desc: "삐- 하는 하울링" },
            { label: "[Muffled]", desc: "문밖에서 듣는 먹먹한 소리" }
        ]
    },
    {
        title: "8. 리듬 & 타악기 (Percussion)",
        icon: "drums",
        tags: [
            { label: "[Handclaps]", desc: "박수 짝짝 소리" },
            { label: "[Finger Snaps]", desc: "손가락 튕기는 소리" },
            { label: "[Bass Drop]", desc: "웅장하게 떨어지는 저음" },
            { label: "[Drum Fill]", desc: "화려한 드럼 구간" }
        ]
    }
];
