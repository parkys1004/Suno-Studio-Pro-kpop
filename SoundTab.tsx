import React, { useState } from 'react';
import { Project } from './types';
import SoundConfigPanel from './SoundConfigPanel';
import SoundInstrumentPanel from './SoundInstrumentPanel';
import SoundGeneratorPanel from './SoundGeneratorPanel';

// --- TAB: Sound ---
const SoundTab = ({ project, onUpdate, legibilityMode, modelTier }: { project: Project, onUpdate: (u: Partial<Project>) => void, legibilityMode: boolean, modelTier: 'stable' | 'pro' }) => {
  const [useStrictDanceMode, setUseStrictDanceMode] = useState(true);
  
  const titleColor = legibilityMode ? '#FFFFFF' : '#fbbf24';
  const labelColor = legibilityMode ? '#F9FAF8' : '#9ca3af';

  return (
      <div className="responsive-grid-3" style={{ width: '100%', display: 'grid', gridTemplateColumns: '3fr 2fr 5fr', gap: '20px', minHeight: '600px' }}>
          
          {/* Column 1: Configuration */}
          <SoundConfigPanel 
              project={project}
              onUpdate={onUpdate}
              modelTier={modelTier}
              titleColor={titleColor}
              labelColor={labelColor}
              legibilityMode={legibilityMode}
          />

          {/* Column 2: Instruments & Options */}
          <SoundInstrumentPanel 
              project={project}
              onUpdate={onUpdate}
              legibilityMode={legibilityMode}
              useStrictDanceMode={useStrictDanceMode}
              setUseStrictDanceMode={setUseStrictDanceMode}
              labelColor={labelColor}
          />

          {/* Column 3: Output & Generator */}
          <SoundGeneratorPanel 
              project={project}
              onUpdate={onUpdate}
              legibilityMode={legibilityMode}
              modelTier={modelTier}
              useStrictDanceMode={useStrictDanceMode}
              labelColor={labelColor}
          />
      </div>
  );
};

export default SoundTab;