import React from 'react';
import { Composition } from 'remotion';
import { Film } from './Film.tsx';
import { DURATION, FPS } from './timeline.ts';

export const Root: React.FC = () => (
  <>
    <Composition id="PautaPronta16x9" component={Film} defaultProps={{ layout: 'h' as const }}
      width={1920} height={1080} fps={FPS} durationInFrames={DURATION * FPS} />
    <Composition id="PautaPronta9x16" component={Film} defaultProps={{ layout: 'v' as const }}
      width={1080} height={1920} fps={FPS} durationInFrames={DURATION * FPS} />
  </>
);
