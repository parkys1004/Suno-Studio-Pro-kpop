import React, { useState } from 'react';
import { Type } from "@google/genai";
import { getGenAI } from './utils';
import { Project, SongBlock } from './types';
import { INTRO_STYLES } from './constants';
import LyricOptimizationModal from './LyricOptimizationModal';
import LyricsSettingsPanel from './LyricsSettingsPanel';
import LyricsVariationsPanel from './LyricsVariationsPanel';
import LyricsEditorPanel from './LyricsEditorPanel';

// --- TAB: Lyrics ---
const LyricsTab = ({ project, onUpdate, legibilityMode, modelTier }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean, modelTier: 'stable' | 'pro' }) => {
  const [loading, setLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{ original: string, optimized: string, rationale: string } | null>(null);
  const [tooltip, setTooltip] = useState<{text: string, x: number, y: number} | null>(null);

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const generateLyrics = async () => {
    setLoading(true);
    try {
        const structureText = project.structure.map((s: SongBlock) => `[${s.type}]: ${s.description}`).join('\n');
        const formattedDuration = formatTime(project.lyricDuration ?? 180);

        let introInstruction = '';
        if (project.introStyle) {
            const style = INTRO_STYLES.find(s => s.id === project.introStyle);
            if (style) {
                introInstruction = `
                SPECIAL INTRO INSTRUCTION:
                The user has selected the intro vibe: "${style.label}".
                ${style.desc}
                Please indicate this vibe in the [Intro] section of the lyrics (e.g., [Intro: Whisper Narration] or [Intro: Gayageum Solo]).
                `;
            }
        }

        let danceModeInstruction = '';
        if (project.lyricDanceMode) {
            danceModeInstruction = `
            
            *** STRICT DANCE LYRIC MODE ACTIVATED ***
            OBJECTIVE: Generate lyrics strictly optimized for choreography and dancers (8-count structure).

            1. SYLLABLE COUNT & DISPLAY:
               - You MUST display the syllable count at the end of EVERY line in parentheses. 
                 Format: "Lyric text here (count)"
               - DANCE PRESET: Target consistent 8 syllables per line for choreo synchronization.
               - Maintain consistent syllable counts within each 4-line block.

            2. 8-COUNT STRUCTURE (VISUAL):
               - Group lyrics strictly into 4-line blocks (representing one 8-count phrase).
               - Add an empty line between every 4-line block.
               - This is critical for dancers to count the beat.

            3. CONTENT & RHYTHM:
               - Use [Strict Rhythm] (Jeong-bak).
               - Add [Breath] or pause implied at the end of lines.
               - Avoid complex sentences or rubato.
               - Simple, clear words that hit the beat.
            `;
        }

        const referenceInfo = project.referenceSongTitle
            ? `Reference Vibe/Flow: Make the lyrics and rhythm reminiscent of the song "${project.referenceSongTitle}" by ${project.referenceArtist || 'Unknown Artist'}. Capture its emotional tone and rhythmic delivery.`
            : '';

        const prompt = `
          Write lyrics for a ${project.genre} song titled "${project.title}".
          Mood: ${project.mood}.
          Style Description: ${project.styleDescription || 'Standard style'}.
          BPM: ${project.bpm || 95}
          Language Preference: ${project.lyricLanguage ?? 'Korean Only'}.
          Target Duration: Approximately ${formattedDuration}.
          
          CRITICAL: Follow this Structure strictly in this exact order:
          ${structureText}

          Negative Constraints (DO NOT INCLUDE): ${project.excludedThemes || 'None'}.
          
          ${danceModeInstruction}
          
          ${introInstruction}
          ${referenceInfo}

          Instructions:
          - Reflect the "Style Description" in the choice of words and emotional tone.
          ${project.lyricAutoAdjust ? `- Target Duration is ${formattedDuration}. STRICTLY Adjust the number of lines and stanza length accordingly to match the duration.` : `- Target Duration is ${formattedDuration}.`}
          - Output MUST strictly match the defined structure blocks. Generate lyrics for EVERY block in the list.
          - Output format: Include the structure tags (e.g., [Verse 1]) before the lyrics for each block.
          - Do NOT include metadata headers (Title, BPM, Mood, etc.) in the output. Start directly with the first section tag.
          
          CRITICAL: DANCEABILITY & RHYTHM (Jeong-bak / 정박):
          - The song must have a comfortable, unchanging, steady beat suitable for social dancing.
          - Lyrics must match this steady rhythm perfectly (On-Beat). 
          - avoid complex syncopation, rubato, or wordy poetic lines that disrupt the groove.
          
          ${project.djName ? `- IMPORTANT: Include a shoutout to "${project.djName}" in EITHER the [Intro] OR the [Outro]. Choose ONE location only. Do NOT repeat it.` : ''}
        `;

        // Model Selection Logic for Lyrics with 2-Layer Fallback (Updated)
        const primaryModel = modelTier === 'pro' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
        let response: any;
        const genAI = getGenAI();

        try {
            const config: any = {};
            if (modelTier === 'pro') {
                config.thinkingConfig = { thinkingBudget: 1024 }; 
            }
            
            response = await genAI.models.generateContent({
                model: primaryModel, 
                contents: prompt,
                config: config
            });
        } catch (firstError: any) {
            console.warn(`Primary model ${primaryModel} failed. Attempting fallback...`, firstError);
            
            // Fallback Logic: Try gemini-2.0-flash (Stable)
            if (modelTier === 'stable') {
                try {
                    response = await genAI.models.generateContent({
                        model: 'gemini-2.0-flash', 
                        contents: prompt
                    });
                } catch (secondError) {
                    throw secondError; // If 2.0 fails, throw error. Do NOT use 1.5.
                }
            } else {
                throw firstError; // If Pro mode fails, show error
            }
        }
        
        onUpdate({ lyrics: response.text });
    } catch (e: any) {
        console.error(e);
        let msg = `가사 생성 실패 (${modelTier} 모드)`;
        if (e.message?.includes('429') || e.message?.includes('quota')) {
            msg += '\n⚠️ 무료 사용량 초과 (Quota Exceeded). 잠시 후 다시 시도하세요.';
        } else {
            msg += `\n오류: ${e.message?.substring(0, 50)}...`;
        }
        alert(msg);
    }
    setLoading(false);
  };

  const optimizeLyrics = async () => {
    if (!project.lyrics) return;
    setIsOptimizing(true);
    try {
        const prompt = `
            Act as a professional Lyrics Editor for AI Music Generation (Suno.ai).
            Analyze the following lyrics and provide an optimized version with corrected structure tags and formatting.

            Input Lyrics:
            """
            ${project.lyrics}
            """

            Tasks:
            1. Analyze the current structure and identify issues (e.g., missing tags, repetitive lines, unclear sections, bracket errors).
            2. Create a "Rationale" (in Korean language) explaining what was fixed and why (e.g., "Standardized tags", "Removed non-lyrical metadata", "Added structure clear markers").
            3. Generate the "Optimized Lyrics" with:
               - Clear section tags on their own lines (e.g., [Verse 1], [Chorus], [Bridge]).
               - Exactly 1 empty line between sections.
               - No metadata headers (Title, BPM, etc.) at the top.
               - Ad-libs wrapped in parentheses.
            
            Return ONLY a JSON object.
        `;
        
        // Use 2.0 flash for optimization utility (Stable/Fast) - 1.5 is deprecated
        const response: any = await getGenAI().models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        rationale: { type: Type.STRING, description: "Analysis report in Korean" },
                        optimizedLyrics: { type: Type.STRING, description: "The full corrected lyrics text" }
                    },
                    required: ['rationale', 'optimizedLyrics']
                }
            }
        });

        const data = JSON.parse(response.text);
        
        if (data.optimizedLyrics) {
             setOptimizationResult({
                 original: project.lyrics,
                 optimized: data.optimizedLyrics,
                 rationale: data.rationale || "자동 교정이 완료되었습니다."
             });
        }
    } catch (e) {
        alert('Optimization failed. Please check your connection.');
        console.error(e);
    }
    setIsOptimizing(false);
  };

  const handleApplyOptimization = () => {
      if (optimizationResult) {
          onUpdate({ lyrics: optimizationResult.optimized });
          setOptimizationResult(null);
      }
  };

  return (
    <div className="lyrics-view" style={{ width: '100%', display: 'grid', gridTemplateColumns: '320px 360px 1fr', gap: '20px', minHeight: '600px' }}>
      
      {/* Global Floating Tooltip */}
      {tooltip && (
          <div style={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              backgroundColor: '#111827',
              color: '#fbbf24',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              pointerEvents: 'none',
              zIndex: 9999,
              border: '1px solid #4b5563',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
              {tooltip.text}
              <div style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0, 
                  height: 0, 
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid #4b5563'
              }}></div>
              <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0, 
                  height: 0, 
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid #111827'
              }}></div>
          </div>
      )}

      {/* Optimization Modal */}
      {optimizationResult && (
          <LyricOptimizationModal 
            original={optimizationResult.original}
            optimized={optimizationResult.optimized}
            rationale={optimizationResult.rationale}
            onClose={() => setOptimizationResult(null)}
            onApply={handleApplyOptimization}
          />
      )}

      {/* Internal Style for hiding scrollbar locally */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Column 1: Settings */}
      <LyricsSettingsPanel 
          project={project}
          onUpdate={onUpdate}
          legibilityMode={legibilityMode}
          modelTier={modelTier}
          loading={loading}
          onGenerate={generateLyrics}
      />

      {/* Column 2: Variations */}
      <LyricsVariationsPanel 
          project={project}
          onUpdate={onUpdate}
          legibilityMode={legibilityMode}
          modelTier={modelTier}
      />

      {/* Column 3: Editor */}
      <LyricsEditorPanel 
          project={project}
          onUpdate={onUpdate}
          legibilityMode={legibilityMode}
          isOptimizing={isOptimizing}
          onOptimize={optimizeLyrics}
          setTooltip={setTooltip}
      />
    </div>
  );
};

export default LyricsTab;