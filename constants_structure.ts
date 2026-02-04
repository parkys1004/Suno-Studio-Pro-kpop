
export const INTRO_STYLES = [
  { id: '1', label: '속삭임 (Whisper)', desc: '아이돌 곡 시그니처. 멤버의 속삭임이나 나레이션으로 시작해 팬들의 이목 집중.', sunoTags: '[Whisper Intro], [Narration], [Member Name Shoutout]' },
  { id: '2', label: '강렬한 비트 (Impact)', desc: '시작하자마자 강한 베이스와 킥으로 때려박는 스타일. 걸크러쉬/다크 컨셉.', sunoTags: '[Heavy 808 Bass], [Explosive Intro], [Trap Beat Start]' },
  { id: '3', label: '감성 피아노 (Emotional)', desc: '잔잔한 피아노 선율로 시작. 발라드나 드라마 OST 도입부 느낌.', sunoTags: '[Melodic Piano Intro], [Soft Atmosphere], [Emotional Start]' },
  { id: '4', label: '국악기 독주 (Fusion)', desc: '가야금이나 해금의 독주로 시작하여 한국적인 미를 강조.', sunoTags: '[Gayageum Solo], [Haegeum Melody], [Traditional Korean Intro]' },
  { id: '5', label: '카운트다운 (Count-in)', desc: 'One, Two, Three! 힘찬 카운트와 함께 밴드 사운드 혹은 댄스 브레이크 시작.', sunoTags: '[Spoken Count-in], [Energetic Start], [Band Hit]' },
  { id: '6', label: '레트로 신스 (City Pop)', desc: '80년대 느낌의 신디사이저와 드럼 머신. 몽환적이고 세련된 도입부.', sunoTags: '[Retro Synth Intro], [City Pop Vibe], [80s Drum Machine]' },
  { id: '7', label: '아카펠라/코러스 (Harmony)', desc: '악기 없이 보컬 화음으로 시작하여 목소리에 집중.', sunoTags: '[Acapella Intro], [Vocal Harmony], [Choir Start]' },
  { id: '8', label: '통화 연결음 (Phone FX)', desc: '따르릉 소리, 부재중 메시지 녹음 등 현실적인 효과음으로 스토리텔링 시작.', sunoTags: '[Phone Ringtone SFX], [Voicemail Intro], [Lo-fi Filter]' },
  { id: '9', label: '뉴스/라디오 (Broadcast)', desc: '뉴스 속보나 라디오 채널을 돌리는 듯한 지직거리는 소리. 컨셉츄얼한 곡.', sunoTags: '[Radio Tuning SFX], [News Breaking Intro], [Static Noise]' },
  { id: '10', label: '기타 솔로 (Guitar Riff)', desc: '매력적인 기타 리프(Riff) 하나로 시작하여 분위기를 장악.', sunoTags: '[Electric Guitar Riff], [Acoustic Guitar Solo], [Funky Guitar Intro]' },
  { id: '11', label: '자연의 소리 (Ambience)', desc: '빗소리, 파도 소리, 도시의 소음 등 공간감을 주는 배경음으로 시작.', sunoTags: '[Rain Sound], [Ocean Waves], [City Ambience Intro]' },
  { id: '12', label: '사이렌/알람 (Tension)', desc: '위급한 사이렌이나 알람 소리로 긴장감을 고조시키며 강렬하게 시작.', sunoTags: '[Siren SFX], [Alarm Sound], [Emergency Intro]' }
];

export const BLOCK_SAMPLES: Record<string, string[]> = {
  'Intro': [
    'Whisper Narration',
    'Explosive Dance Beat',
    'Emotional Piano Solo',
    'Gugak Melody (Gayageum)',
    'Counting (One, Two, Three!)'
  ],
  'Verse': [
    'Rhythmic Rap',
    'Melodic Singing (Low range)',
    'Storytelling',
    'Building Up',
    'Groovy Bass Line'
  ],
  'Chorus': [
    'Killing Part (Hook)',
    'High Note Explosion',
    'Addictive Repetition',
    'Group Harmony',
    'Drop (EDM Style)'
  ],
  'Bridge': [
    'Mood Change (Slow down)',
    'High Note Ad-lib',
    'Rap Break',
    'Minimal Instrument',
    'Build up to Final Chorus'
  ],
  'Drop': [
    'Dance Break (Choreography Focus)',
    'Heavy Bass Drop',
    'Synth Lead Solo',
    'Traditional Percussion Break'
  ],
  'Instrumental': [
    'Guitar Solo',
    'Haegeum Solo',
    'Piano Interlude',
    'Synth Solo'
  ],
  'Outro': [
    'Ending Fairy Pose (Fade out)',
    'High Note Finish',
    'Whisper Ending',
    'Abrupt Stop',
    'Instrumental Fade'
  ]
};

export const TEMPLATE_CATEGORIES: Record<string, string[]> = {
    "✨ 기본 (Basic)": ["Custom"],
    "🎤 K-Pop & Idol": [
        "Standard K-Pop",
        "Girl Crush (Strong)",
        "Boy Group (Performance)",
        "High Teen (School Concept)",
        "K-Pop Gen 2 (Retro Hook)",
        "Solo Idol (Dance)",
        "Summer Song (Cool)",
        "Winter Song (Carol)",
        "Latin-Kpop (Fusion)"
    ],
    "😎 Trendy & Vibe": [
        "Y2K Style (NewJeans Vibe)",
        "Cyberpunk (Aespa Style)",
        "Dreamy / Fairy",
        "City Pop (Retro)",
        "Jersey Club Remix",
        "Hyperpop (Glitch)"
    ],
    "🎧 Hip-Hop & R&B": [
        "Hip-Hop (Trap)",
        "R&B Groove",
        "Rap Cypher (Team)",
        "UK Garage / 2-Step"
    ],
    "🎹 Ballad & OST": [
        "Emotional Ballad (OST)",
        "Rock Ballad (Band)",
        "Musical Style",
        "Grand Epic (Final)",
        "Movie Trailer (Build-up)"
    ],
    "🎸 Band & Rock": [
        "Modern Rock (Anthem)",
        "Rock Ballad (Band)",
        "Punk Rock (Fast)",
        "Heavy Metal (Breakdown)"
    ],
    "⚡ Electronic & House": [
        "House (Club Standard)",
        "Future Bass (Emotional)",
        "Festival / EDM",
        "Drum & Bass (Liquid)"
    ],
    "🎷 Jazz & Trot": [
        "Traditional Trot (Ppong-jak)",
        "EDM Trot (Party)",
        "Bossa Nova (Cafe)",
        "Jazz Bar (Solo)"
    ],
    "🌿 Healing & Acoustic": [
        "Acoustic Indie",
        "Acoustic Cafe",
        "Introvert / Lofi",
        "Shoegaze (Dreamy)",
        "Ambient / Meditation",
        "Piano Solo (Calm)"
    ],
    "📱 Short Form (TikTok/Shorts)": [
        "Viral Hook Song (Short)",
        "TikTok Challenge (15s)",
        "YouTube Intro (Logo)"
    ],
    "🎉 Party & Club": [
        "Festival / EDM",
        "EDM Trot (Party)",
        "Drum & Bass (Liquid)",
        "Heavy Metal (Breakdown)",
        "Punk Rock (Fast)"
    ],
    "🏮 Fusion & Special": [
        "Fusion Gugak (Joseon Pop)",
        "Neo-Soul (Groovy)",
        "Chiptune / 8-bit (Game)",
        "Tango / Dramatic (Performance)",
        "Gospel Choir (Uplifting)"
    ]
};

export const STRUCTURE_MANUAL_DATA = [
    {
        title: "1. Intro: 도입부",
        color: "#fbbf24", // Gold
        items: [
            { term: "Whisper Narration (속삭이는 나레이션)", desc: "곡의 시작을 알리는 감각적인 음성" },
            { term: "Explosive Dance Beat (폭발적인 댄스 비트)", desc: "시작부터 에너지를 터뜨리는 강렬한 리듬" },
            { term: "Emotional Piano Solo (감성적인 피아노 솔로)", desc: "서정적이고 차분하게 시작하는 선율" },
            { term: "Gugak Melody (국악 선율/가야금)", desc: "한국적인 색채를 입힌 전통 악기 도입" },
            { term: "Counting (카운팅)", desc: "\"One, Two, Three!\"와 같이 박자를 맞추며 시작" }
        ]
    },
    {
        title: "2. Verse: 절",
        color: "#3b82f6", // Blue
        items: [
            { term: "Rhythmic Rap (리드미컬 랩)", desc: "리듬감을 강조한 랩 파트" },
            { term: "Melodic Singing (낮은 음역대 가창)", desc: "보컬의 매력을 보여주는 중저음 구간" },
            { term: "Storytelling (스토리텔링)", desc: "곡의 서사와 가사 내용을 전달하는 파트" },
            { term: "Building Up (빌드업)", desc: "감정과 에너지를 서서히 끌어올리는 과정" },
            { term: "Groovy Bass Line (그루비한 베이스 라인)", desc: "베이스 악기를 강조해 리듬을 살린 구간" }
        ]
    },
    {
        title: "3. Chorus: 후렴구",
        color: "#e11d48", // Rose (Main)
        items: [
            { term: "Killing Part/Hook (킬링 파트/훅)", desc: "곡에서 가장 강렬하고 기억에 남는 핵심 지점" },
            { term: "High Note Explosion (고음 폭발)", desc: "보컬의 가창력을 극대화하는 하이라이트" },
            { term: "Addictive Repetition (중독적인 반복)", desc: "누구나 따라 부르기 쉬운 반복적인 멜로디와 가사" },
            { term: "Group Harmony (그룹 화음)", desc: "멤버들의 목소리가 합쳐져 풍성함을 주는 구간" },
            { term: "Drop/EDM Style (EDM 스타일 드랍)", desc: "보컬 대신 강렬한 비트가 주인공이 되는 구간" }
        ]
    },
    {
        title: "4. Bridge: 브릿지",
        color: "#a855f7", // Purple
        items: [
            { term: "Mood Change/Slow down (무드 전환)", desc: "곡의 흐름을 잠시 늦추거나 분위기를 바꾸는 구간" },
            { term: "High Note Ad-lib (고음 애드리브)", desc: "화려한 기교로 긴장감을 고조시키는 보컬" },
            { term: "Rap Break (랩 브레이크)", desc: "분위기를 환기시키는 강렬한 랩 구간" },
            { term: "Minimal Instrument (최소화된 악기)", desc: "악기 소리를 줄여 목소리에 집중시키는 기법" },
            { term: "Build up to Final Chorus (마지막 후렴 빌드업)", desc: "최종 클라이맥스로 가기 전 에너지를 응축하는 단계" }
        ]
    },
    {
        title: "5. Drop & Instrumental: 퍼포먼스",
        color: "#10b981", // Green
        items: [
            { term: "Dance Break (댄스 브레이크)", desc: "화려한 퍼포먼스와 안무에 집중하는 구간" },
            { term: "Heavy Bass Drop (헤비 베이스 드랍)", desc: "웅장하고 무거운 저음을 강조한 비트" },
            { term: "Synth Lead Solo (신스 리드 솔로)", desc: "전자음악 사운드가 주도하는 연주 파트" },
            { term: "Traditional Percussion Break", desc: "꽹과리, 장구 등 국악 타악기를 활용한 리듬 구간" },
            { term: "Haegeum Solo (해금 솔로)", desc: "애절하고 독특한 해금 소리를 강조한 간주" }
        ]
    },
    {
        title: "6. Outro: 종결부",
        color: "#9ca3af", // Gray
        items: [
            { term: "Ending Fairy Pose (엔딩 요정 포즈)", desc: "무대 위 화면을 응시하며 여운을 남기는 마무리" },
            { term: "High Note Finish (고음 마무리)", desc: "시원한 고음으로 곡을 끝맺는 방식" },
            { term: "Whisper Ending (속삭이는 엔딩)", desc: "속삭이듯 읊조리며 사라지는 마무리" },
            { term: "Abrupt Stop (갑작스러운 정지)", desc: "긴장감 있게 뚝 끊기며 끝나는 방식" },
            { term: "Instrumental Fade (연주 페이드 아웃)", desc: "악기 소리가 점점 작아지며 자연스럽게 종료" }
        ]
    }
];

export const STRUCTURE_TEMPLATES = {
  // --- K-POP & IDOL (9) ---
  'Custom': [],
  'Standard K-Pop': [
      { type: 'Intro', description: 'Signature Sound & Member Narration', duration: 4 },
      { type: 'Verse', description: 'Verse 1 (Storytelling)', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus (Build-up)', duration: 8 },
      { type: 'Chorus', description: 'Main Hook (Killing Part)', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Rap Part)', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus', duration: 8 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Bridge', description: 'Emotional High Note & Slow down', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus (Explosion)', duration: 16 },
      { type: 'Outro', description: 'Ending Pose Fade', duration: 4 }
  ],
  'Girl Crush (Strong)': [
      { type: 'Intro', description: 'English Narration & Bass', duration: 8 },
      { type: 'Verse', description: 'Low Tone Rap', duration: 16 },
      { type: 'Chorus', description: 'Drop (Minimal Vocals)', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Drop', duration: 16 },
      { type: 'Bridge', description: 'Vocal Build Up', duration: 8 },
      { type: 'Drop', description: 'Final Dance Break', duration: 16 },
      { type: 'Outro', description: 'Signature Pose', duration: 4 }
  ],
  'Boy Group (Performance)': [
      { type: 'Intro', description: 'Dark Sound & Breath', duration: 8 },
      { type: 'Verse', description: 'Intense Rap', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus (Melodic)', duration: 8 },
      { type: 'Chorus', description: 'Powerful Unison', duration: 16 },
      { type: 'Drop', description: 'Dance Break (Instrumental)', duration: 16 },
      { type: 'Bridge', description: 'High Note Ad-lib', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Heavy Breathing', duration: 4 }
  ],
  'High Teen (School Concept)': [
      { type: 'Intro', description: 'School Bell & Guitar', duration: 8 },
      { type: 'Verse', description: 'Cheerful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Energetic Chorus', duration: 16 },
      { type: 'Verse', description: 'Rap (Playful)', duration: 16 },
      { type: 'Bridge', description: 'Cheerleading Chant', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Laughing & Fade', duration: 4 }
  ],
  'Summer Song (Cool)': [
      { type: 'Intro', description: 'Wave Sound & Tropical House', duration: 8 },
      { type: 'Verse', description: 'Fresh Vocals', duration: 16 },
      { type: 'Chorus', description: 'Cool & High Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Cool & High Melody', duration: 16 },
      { type: 'Bridge', description: 'Slow down', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus with Ad-libs', duration: 16 },
      { type: 'Outro', description: 'Yeah~!', duration: 4 }
  ],
  'Winter Song (Carol)': [
      { type: 'Intro', description: 'Sleigh Bells & Piano', duration: 8 },
      { type: 'Verse', description: 'Warm Vocals', duration: 16 },
      { type: 'Chorus', description: 'Carol Harmony', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Carol Harmony', duration: 16 },
      { type: 'Bridge', description: 'Jazz Piano Solo', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Merry Christmas Whisper', duration: 4 }
  ],
  'Latin-Kpop (Fusion)': [
      { type: 'Intro', description: 'Spanish Guitar Riff', duration: 8 },
      { type: 'Verse', description: 'Seductive K-Pop Vocals', duration: 16 },
      { type: 'Chorus', description: 'Reggaeton Beat Drop', duration: 16 },
      { type: 'Verse', description: 'Rap with Latin Flow', duration: 16 },
      { type: 'Chorus', description: 'Reggaeton Beat Drop', duration: 16 },
      { type: 'Outro', description: 'Adios', duration: 4 }
  ],
  'K-Pop Gen 2 (Retro Hook)': [
      { type: 'Intro', description: 'Dramatic Synth Intro', duration: 8 },
      { type: 'Chorus', description: 'Main Hook (Intro Chorus)', duration: 16 },
      { type: 'Verse', description: 'Verse 1', duration: 16 },
      { type: 'Chorus', description: 'Main Hook (Repetition)', duration: 16 },
      { type: 'Verse', description: 'Rap Bridge', duration: 16 },
      { type: 'Chorus', description: 'Key Change Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Fade Out', duration: 8 }
  ],
  'Solo Idol (Dance)': [
      { type: 'Intro', description: 'Focus on Vocal Ad-lib', duration: 8 },
      { type: 'Verse', description: 'Verse 1', duration: 16 },
      { type: 'Verse', description: 'Pre-Chorus', duration: 8 },
      { type: 'Chorus', description: 'Main Chorus (Performance)', duration: 16 },
      { type: 'Instrumental', description: 'Dance Break', duration: 8 },
      { type: 'Bridge', description: 'High Note', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Ending Pose', duration: 4 }
  ],

  // --- TRENDY & VIBE (6) ---
  'Y2K Style (NewJeans Vibe)': [
      { type: 'Intro', description: 'Retro Synth & Beat', duration: 8 },
      { type: 'Chorus', description: 'Catchy Hook Intro', duration: 16 },
      { type: 'Verse', description: 'Groovy Vocal', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Outro', description: 'Fade out with Ad-libs', duration: 8 }
  ],
  'Cyberpunk (Aespa Style)': [
      { type: 'Intro', description: 'Glitch Sound & Metallic Beat', duration: 8 },
      { type: 'Verse', description: 'Unique Flow', duration: 16 },
      { type: 'Chorus', description: 'Hyperpop Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Tempo Change)', duration: 16 },
      { type: 'Chorus', description: 'Hyperpop Melody', duration: 16 },
      { type: 'Bridge', description: 'Distorted Bass', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'System Shutdown FX', duration: 4 }
  ],
  'Dreamy / Fairy': [
      { type: 'Intro', description: 'Wind Chimes & Pad', duration: 8 },
      { type: 'Verse', description: 'Soft Vocals', duration: 16 },
      { type: 'Chorus', description: 'Magical Melody', duration: 16 },
      { type: 'Instrumental', description: 'Synth Pluck Solo', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Magical Melody', duration: 16 },
      { type: 'Outro', description: 'Disappearing Sound', duration: 8 }
  ],
  'City Pop (Retro)': [
      { type: 'Intro', description: '80s Drum Fill & Synth', duration: 8 },
      { type: 'Verse', description: 'Dreamy Vocals', duration: 16 },
      { type: 'Chorus', description: 'Nostalgic Melody', duration: 16 },
      { type: 'Instrumental', description: 'Saxophone or Synth Solo', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Nostalgic Melody', duration: 16 },
      { type: 'Outro', description: 'Long Fade Out', duration: 16 }
  ],
  'Jersey Club Remix': [
      { type: 'Intro', description: 'Sample Chop & Fast Beat', duration: 8 },
      { type: 'Chorus', description: 'Repetitive Hook (Fast)', duration: 16 },
      { type: 'Verse', description: 'Short Rap Verse', duration: 16 },
      { type: 'Drop', description: 'Bed Squeak Sample & Kick', duration: 16 },
      { type: 'Chorus', description: 'Repetitive Hook', duration: 16 },
      { type: 'Outro', description: 'Abrupt Cut', duration: 4 }
  ],
  'Hyperpop (Glitch)': [
      { type: 'Intro', description: 'Distorted Noise', duration: 4 },
      { type: 'Chorus', description: 'Autotune Overload', duration: 16 },
      { type: 'Verse', description: 'Fast Paced Singing', duration: 8 },
      { type: 'Bridge', description: 'Complete Silence or Noise', duration: 4 },
      { type: 'Chorus', description: 'Max Volume Chorus', duration: 16 },
      { type: 'Outro', description: 'Glitch Out', duration: 4 }
  ],

  // --- HIP-HOP & R&B (4) ---
  'Hip-Hop (Trap)': [
      { type: 'Intro', description: 'Beat Tag & Mumble', duration: 8 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Verse', description: 'Verse 1 (Tight Flow)', duration: 16 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Different Flow)', duration: 16 },
      { type: 'Chorus', description: 'Main Theme', duration: 16 },
      { type: 'Outro', description: 'Fade out', duration: 8 }
  ],
  'R&B Groove': [
      { type: 'Intro', description: 'Electric Piano Chords', duration: 8 },
      { type: 'Verse', description: 'Groovy Vocals', duration: 16 },
      { type: 'Chorus', description: 'Falsetto Hook', duration: 16 },
      { type: 'Verse', description: 'Singing Rap', duration: 16 },
      { type: 'Chorus', description: 'Falsetto Hook', duration: 16 },
      { type: 'Instrumental', description: 'Bass Solo', duration: 8 },
      { type: 'Outro', description: 'Vocal Runs', duration: 8 }
  ],
  'Rap Cypher (Team)': [
      { type: 'Intro', description: 'Hype Man Intro', duration: 8 },
      { type: 'Verse', description: 'Rapper 1 (Flow A)', duration: 16 },
      { type: 'Verse', description: 'Rapper 2 (Flow B)', duration: 16 },
      { type: 'Verse', description: 'Rapper 3 (Flow C)', duration: 16 },
      { type: 'Verse', description: 'Rapper 4 (Fast)', duration: 16 },
      { type: 'Outro', description: 'Beat Fade', duration: 8 }
  ],
  'UK Garage / 2-Step': [
      { type: 'Intro', description: 'Shuffling Hats', duration: 8 },
      { type: 'Verse', description: 'Soulful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Chopped Vocal Sample', duration: 16 },
      { type: 'Drop', description: 'Heavy Bassline', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Outro', description: 'Drum Fade', duration: 8 }
  ],

  // --- BALLAD & OST (5) ---
  'Emotional Ballad (OST)': [
      { type: 'Intro', description: 'Piano Solo', duration: 8 },
      { type: 'Verse', description: 'Calm Vocals', duration: 16 },
      { type: 'Chorus', description: 'Emotional Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2 (Strings Enter)', duration: 16 },
      { type: 'Chorus', description: 'Emotional Melody', duration: 16 },
      { type: 'Bridge', description: 'Orchestral Climax', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus (Max Emotion)', duration: 16 },
      { type: 'Outro', description: 'Piano Fade out', duration: 8 }
  ],
  'Rock Ballad (Band)': [
      { type: 'Intro', description: 'Electric Guitar Solo', duration: 8 },
      { type: 'Verse', description: 'Bass & Vocal', duration: 16 },
      { type: 'Chorus', description: 'Full Band Explosion', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Full Band', duration: 16 },
      { type: 'Instrumental', description: 'Guitar Solo', duration: 16 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Band Finish', duration: 8 }
  ],
  'Musical Style': [
      { type: 'Intro', description: 'Orchestra Overture', duration: 8 },
      { type: 'Verse', description: 'Dialogue Style Singing', duration: 16 },
      { type: 'Chorus', description: 'Grand Ensemble', duration: 16 },
      { type: 'Bridge', description: 'Dramatic Key Change', duration: 8 },
      { type: 'Chorus', description: 'Grand Ensemble (Fortissimo)', duration: 16 },
      { type: 'Outro', description: 'Final Chord Hold', duration: 8 }
  ],
  'Grand Epic (Final)': [
      { type: 'Intro', description: 'Marching Drums & Choir', duration: 16 },
      { type: 'Verse', description: 'Low & Serious', duration: 16 },
      { type: 'Chorus', description: 'Epic Harmony', duration: 16 },
      { type: 'Bridge', description: 'Silence then Explosion', duration: 8 },
      { type: 'Chorus', description: 'Maximum Volume & Choir', duration: 16 },
      { type: 'Outro', description: 'Orchestral Hit', duration: 4 }
  ],
  'Movie Trailer (Build-up)': [
      { type: 'Intro', description: 'Low Drone & Ticking', duration: 8 },
      { type: 'Verse', description: 'Slow Piano Notes', duration: 8 },
      { type: 'Bridge', description: 'Rising Tension (Riser)', duration: 8 },
      { type: 'Drop', description: 'Epic Impact Hits', duration: 8 },
      { type: 'Chorus', description: 'Full Orchestra Action', duration: 16 },
      { type: 'Outro', description: 'Sudden Silence', duration: 4 }
  ],

  // --- INDIE & ACOUSTIC (6) - Updated with Piano Solo ---
  'Acoustic Indie': [
      { type: 'Intro', description: 'Guitar Arpeggio', duration: 8 },
      { type: 'Verse', description: 'Soft Whispering', duration: 16 },
      { type: 'Chorus', description: 'Folk Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Bridge', description: 'Humming / Scat', duration: 8 },
      { type: 'Chorus', description: 'Folk Melody', duration: 16 },
      { type: 'Outro', description: 'Guitar Chord', duration: 4 }
  ],
  'Introvert / Lofi': [
      { type: 'Intro', description: 'Vinyl Crackle & Rain', duration: 8 },
      { type: 'Verse', description: 'Mumbled Singing', duration: 16 },
      { type: 'Chorus', description: 'Simple Repetitive Melody', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Simple Repetitive Melody', duration: 16 },
      { type: 'Outro', description: 'Tape Stop', duration: 4 }
  ],
  'Acoustic Cafe': [
      { type: 'Intro', description: 'Guitar Strumming', duration: 4 },
      { type: 'Verse', description: 'Sweet Vocals', duration: 16 },
      { type: 'Chorus', description: 'Comforting Melody', duration: 16 },
      { type: 'Verse', description: 'Whistling', duration: 16 },
      { type: 'Chorus', description: 'Comforting Melody', duration: 16 },
      { type: 'Outro', description: 'Coffee Pouring Sound', duration: 4 }
  ],
  'Shoegaze (Dreamy)': [
      { type: 'Intro', description: 'Wall of Sound Guitar', duration: 16 },
      { type: 'Verse', description: 'Buried Vocals', duration: 16 },
      { type: 'Chorus', description: 'Loud Distorted Wash', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Outro', description: 'Feedback Noise', duration: 16 }
  ],
  'Ambient / Meditation': [
      { type: 'Intro', description: 'Nature Sounds', duration: 16 },
      { type: 'Verse', description: 'Slow Pad Swell', duration: 16 },
      { type: 'Chorus', description: 'No Melody (Atmosphere)', duration: 16 },
      { type: 'Verse', description: 'Chimes & Bells', duration: 16 },
      { type: 'Outro', description: 'Slow Fade to Silence', duration: 16 }
  ],
  'Piano Solo (Calm)': [
      { type: 'Intro', description: 'Gentle Arpeggio', duration: 8 },
      { type: 'Verse', description: 'Main Theme A', duration: 16 },
      { type: 'Chorus', description: 'Variation B', duration: 16 },
      { type: 'Verse', description: 'Main Theme A (Variation)', duration: 16 },
      { type: 'Outro', description: 'Slowing down', duration: 8 }
  ],

  // --- PARTY & EDM (7) - Updated with House & Future Bass ---
  'Festival / EDM': [
      { type: 'Intro', description: 'Build Up Riser', duration: 16 },
      { type: 'Drop', description: 'Big Room Drop (Jump!)', duration: 16 },
      { type: 'Verse', description: 'Hype Vocals', duration: 16 },
      { type: 'Chorus', description: 'Sing-along Anthem', duration: 16 },
      { type: 'Drop', description: 'Second Drop', duration: 16 },
      { type: 'Outro', description: 'Fireworks Sound', duration: 8 }
  ],
  'EDM Trot (Party)': [
      { type: 'Intro', description: 'Brass & Electronic Beat', duration: 8 },
      { type: 'Verse', description: 'Trot Melody', duration: 16 },
      { type: 'Chorus', description: 'Addictive Hook', duration: 16 },
      { type: 'Instrumental', description: 'Dance Break (Synthesizer)', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Addictive Hook', duration: 16 },
      { type: 'Outro', description: 'High Energy Finish', duration: 4 }
  ],
  'Drum & Bass (Liquid)': [
      { type: 'Intro', description: 'Fast Breakbeat & Pad', duration: 8 },
      { type: 'Verse', description: 'Fast Vocal Delivery', duration: 16 },
      { type: 'Drop', description: 'Reese Bass & Rolling Drums', duration: 16 },
      { type: 'Bridge', description: 'Half-time Section', duration: 8 },
      { type: 'Drop', description: 'Full Energy', duration: 16 },
      { type: 'Outro', description: 'Beat Fade', duration: 8 }
  ],
  'House (Club Standard)': [
      { type: 'Intro', description: 'DJ Intro (Beat mix)', duration: 16 },
      { type: 'Verse', description: 'Vocal Build', duration: 16 },
      { type: 'Chorus', description: 'Drop (Main Groove)', duration: 16 },
      { type: 'Verse', description: 'Breakdown', duration: 8 },
      { type: 'Chorus', description: 'Drop', duration: 16 },
      { type: 'Outro', description: 'DJ Outro', duration: 16 }
  ],
  'Future Bass (Emotional)': [
      { type: 'Intro', description: 'Synth Chords', duration: 8 },
      { type: 'Verse', description: 'Soft Vocals', duration: 16 },
      { type: 'Bridge', description: 'Snare Build Up', duration: 8 },
      { type: 'Drop', description: 'Wobbly Chords (Super Saw)', duration: 16 },
      { type: 'Outro', description: 'Fade', duration: 8 }
  ],

  // --- BAND & ROCK (6) - Updated with Modern Rock ---
  'Heavy Metal (Breakdown)': [
      { type: 'Intro', description: 'Guitar Feedback & Scream', duration: 4 },
      { type: 'Verse', description: 'Aggressive Riff', duration: 16 },
      { type: 'Chorus', description: 'Melodic Shout', duration: 16 },
      { type: 'Drop', description: 'Heavy Breakdown (Mosh)', duration: 16 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Double Kick Blast', duration: 4 }
  ],
  'Punk Rock (Fast)': [
      { type: 'Intro', description: '1-2-3-4 Count & Fast Guitar', duration: 4 },
      { type: 'Verse', description: 'Power Chords', duration: 8 },
      { type: 'Chorus', description: 'Anthemic Shout', duration: 8 },
      { type: 'Verse', description: 'Verse 2', duration: 8 },
      { type: 'Chorus', description: 'Anthemic Shout', duration: 8 },
      { type: 'Outro', description: 'Feedback', duration: 4 }
  ],
  'Modern Rock (Anthem)': [
      { type: 'Intro', description: 'Guitar Riff', duration: 8 },
      { type: 'Verse', description: 'Bass & Drums driven', duration: 16 },
      { type: 'Chorus', description: 'Explosive Energy', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Bridge', description: 'Slow down & Build', duration: 8 },
      { type: 'Chorus', description: 'Final Chorus', duration: 16 },
      { type: 'Outro', description: 'Guitar Feedback', duration: 8 }
  ],

  // --- JAZZ & TROT (4) - Updated with Trot and Bossa ---
  'Traditional Trot (Ppong-jak)': [
      { type: 'Intro', description: 'Accordion & Brass', duration: 8 },
      { type: 'Verse', description: 'Verse 1 (Emotional)', duration: 16 },
      { type: 'Chorus', description: 'Main Melody (Ppong-jak Rhythm)', duration: 16 },
      { type: 'Instrumental', description: 'Brass Solo', duration: 16 },
      { type: 'Verse', description: 'Verse 2', duration: 16 },
      { type: 'Chorus', description: 'Main Melody', duration: 16 },
      { type: 'Outro', description: 'Grand Finale', duration: 8 }
  ],
  'Bossa Nova (Cafe)': [
      { type: 'Intro', description: 'Nylon Guitar & Shaker', duration: 8 },
      { type: 'Verse', description: 'Soft Whisper Vocals', duration: 16 },
      { type: 'Chorus', description: 'Melodic Hook', duration: 16 },
      { type: 'Instrumental', description: 'Flute or Piano Solo', duration: 16 },
      { type: 'Chorus', description: 'Melodic Hook', duration: 16 },
      { type: 'Outro', description: 'Humming Fade', duration: 8 }
  ],
  'Jazz Bar (Solo)': [
      { type: 'Intro', description: 'Double Bass & Brush Drum', duration: 8 },
      { type: 'Verse', description: 'Soulful Vocals', duration: 16 },
      { type: 'Chorus', description: 'Swing Rhythm', duration: 16 },
      { type: 'Instrumental', description: 'Piano Improvisation', duration: 16 },
      { type: 'Chorus', description: 'Swing Rhythm', duration: 16 },
      { type: 'Outro', description: 'Scat Singing', duration: 8 }
  ],

  // --- SHORT FORM (3) ---
  'Viral Hook Song (Short)': [
      { type: 'Intro', description: 'Impact Sound', duration: 4 },
      { type: 'Chorus', description: 'Viral Challenge Part', duration: 16 },
      { type: 'Verse', description: 'Short Rap', duration: 8 },
      { type: 'Chorus', description: 'Viral Challenge Part', duration: 16 },
      { type: 'Outro', description: 'Signature Sound', duration: 4 }
  ],
  'TikTok Challenge (15s)': [
      { type: 'Intro', description: 'Catchy Phrase', duration: 2 },
      { type: 'Chorus', description: 'Main Dance Part', duration: 8 },
      { type: 'Outro', description: 'Funny Sound', duration: 2 }
  ],
  'YouTube Intro (Logo)': [
      { type: 'Intro', description: 'Whoosh Sound', duration: 2 },
      { type: 'Chorus', description: 'Channel Jingle', duration: 4 },
      { type: 'Outro', description: 'Ding!', duration: 2 }
  ],

  // --- FUSION & SPECIAL (5) ---
  'Fusion Gugak (Joseon Pop)': [
      { type: 'Intro', description: 'Gayageum Riff', duration: 8 },
      { type: 'Verse', description: 'Pansori Style Vocals', duration: 16 },
      { type: 'Chorus', description: 'Modern Pop Hook', duration: 16 },
      { type: 'Instrumental', description: 'Traditional & Trap Drop', duration: 8 },
      { type: 'Verse', description: 'Rap Verse', duration: 16 },
      { type: 'Chorus', description: 'Main Hook', duration: 16 },
      { type: 'Outro', description: 'Kwaenggwari Ending', duration: 8 }
  ],
  'Neo-Soul (Groovy)': [
      { type: 'Intro', description: 'Laid back drum beat', duration: 8 },
      { type: 'Verse', description: 'Complex Chords & Vocal', duration: 16 },
      { type: 'Chorus', description: 'Smooth Harmony', duration: 16 },
      { type: 'Instrumental', description: 'Organ Solo', duration: 8 },
      { type: 'Outro', description: 'Vocal Ad-libs fade', duration: 8 }
  ],
  'Chiptune / 8-bit (Game)': [
      { type: 'Intro', description: '8-bit Start Sound', duration: 8 },
      { type: 'Verse', description: 'Synthesized Vocals', duration: 16 },
      { type: 'Chorus', description: 'Catchy Game Melody', duration: 16 },
      { type: 'Bridge', description: 'Boss Fight Tension', duration: 8 },
      { type: 'Chorus', description: 'Victory Fanfare', duration: 16 },
      { type: 'Outro', description: 'Game Over SFX', duration: 4 }
  ],
  'Tango / Dramatic (Performance)': [
      { type: 'Intro', description: 'Accordion & Staccato Strings', duration: 8 },
      { type: 'Verse', description: 'Whispered Vocals (Tension)', duration: 16 },
      { type: 'Chorus', description: 'Dramatic Tango Rhythm', duration: 16 },
      { type: 'Instrumental', description: 'Violin Solo (Fast)', duration: 16 },
      { type: 'Chorus', description: 'Dramatic Tango Rhythm', duration: 16 },
      { type: 'Outro', description: 'Final Pose (Sharp Stop)', duration: 4 }
  ],
  'Gospel Choir (Uplifting)': [
      { type: 'Intro', description: 'Organ & Hand Claps', duration: 8 },
      { type: 'Verse', description: 'Solo Soulful Vocal', duration: 16 },
      { type: 'Chorus', description: 'Full Choir Harmony', duration: 16 },
      { type: 'Bridge', description: 'Call & Response', duration: 8 },
      { type: 'Chorus', description: 'Grand Finale (Key Change)', duration: 16 },
      { type: 'Outro', description: 'Amen / Fade Out', duration: 8 }
  ]
};
