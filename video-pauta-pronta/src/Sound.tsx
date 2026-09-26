import React from 'react';
import { Audio, interpolate, Sequence, staticFile } from 'remotion';
import take from './take.json';
import { DURATION, FPS, SFX } from './timeline.ts';
import { outForSrc } from './warp.ts';
import { CLICK_TIMES } from './Stage.tsx';

type Ev = { t: number; type: string };
// Typing bursts from the recording, mapped to output time.
const TYPING = (() => {
  const spans: { s: number; e: number }[] = [];
  for (const e of take as Ev[]) {
    if (e.type !== 'k') continue;
    const last = spans[spans.length - 1];
    if (!last || e.t - last.e > 1) spans.push({ s: e.t, e: e.t }); else last.e = e.t;
  }
  return spans.map(sp => ({ from: outForSrc(sp.s), to: outForSrc(sp.e) }))
    .filter((x): x is { from: number; to: number } => x.from !== null && x.to !== null);
})();

const Cue: React.FC<{ at: number; file: string; volume?: number; dur?: number; rate?: number }> = ({ at, file, volume = 0.6, dur = 3, rate = 1 }) => (
  <Sequence from={Math.max(0, Math.round(at * FPS))} durationInFrames={Math.round(dur * FPS)}>
    <Audio src={staticFile(`audio/${file}`)} volume={volume} playbackRate={rate} />
  </Sequence>
);

export const Sound: React.FC = () => (
  <>
    <Audio src={staticFile('audio/music.mp3')}
      volume={f => interpolate(f / FPS, [0, 0.4, DURATION - 1.2, DURATION], [0, 0.72, 0.72, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
    {CLICK_TIMES.map((t, i) => <Cue key={`c${i}`} at={t} file="click.mp3" volume={0.9} dur={0.5} />)}
    {TYPING.map((sp, i) => {
      const len = Math.max(0.4, sp.to - sp.from);
      return (
        <Sequence key={`t${i}`} from={Math.round(sp.from * FPS)} durationInFrames={Math.round(len * FPS)}>
          <Audio src={staticFile('audio/typing.mp3')} playbackRate={i === 0 ? 1 : 1.6}
            volume={f => interpolate(f, [0, 3, len * FPS - 4, len * FPS], [0, 0.4, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
        </Sequence>
      );
    })}
    {SFX.whoosh.map((t, i) => <Cue key={`w${i}`} at={t} file="whoosh.mp3" volume={0.45} dur={1.3} />)}
    {SFX.swoosh.map((t, i) => <Cue key={`s${i}`} at={t} file="swoosh2.mp3" volume={0.4} dur={0.9} />)}
    {SFX.riser.map((t, i) => <Cue key={`r${i}`} at={t} file="riser.mp3" volume={0.45} dur={2.1} />)}
    {SFX.impact.map((t, i) => <Cue key={`i${i}`} at={t} file="impact.mp3" volume={0.85} dur={2.6} />)}
    {SFX.shimmer.map((t, i) => <Cue key={`h${i}`} at={t} file="shimmer.mp3" volume={0.4} dur={1.6} />)}
    {SFX.pop.map((t, i) => <Cue key={`p${i}`} at={t} file="pop.mp3" volume={0.55} dur={0.5} />)}
  </>
);
