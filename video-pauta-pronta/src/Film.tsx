import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Backdrop, EndCard, Flash, Footer, Grain, Hook, Showcase, StatCallout, StepCards } from './Overlays.tsx';
import { Sound } from './Sound.tsx';
import { Stage } from './Stage.tsx';
import { type Layout } from './theme.ts';

export const Film: React.FC<{ layout: Layout }> = ({ layout }) => (
  <AbsoluteFill>
    <Backdrop layout={layout} />
    <Hook layout={layout} />
    <Stage layout={layout} />
    <StatCallout layout={layout} />
    <Showcase layout={layout} />
    <StepCards layout={layout} />
    <Footer layout={layout} />
    <Flash />
    <EndCard layout={layout} />
    <Grain />
    <Sound />
  </AbsoluteFill>
);
