import { continueRender, delayRender, staticFile } from 'remotion';

// Pauta Pronta identity (see Brain: PautaPronta_Estado_2026-09-06 §2).
export const C = {
  paper: '#f7f3ec',
  cream: '#efe7d8',
  navy: '#24456b',
  navyDeep: '#1a3350',
  butter: '#e8c873',
  ink: '#121212',
  muted: '#6f6a60',
};

// Brand fonts are bundled in public/fonts (Google Fonts, OFL) so renders don't depend on the network.
if (typeof document !== 'undefined' && !document.getElementById('pp-fonts')) {
  const handle = delayRender('Loading brand fonts');
  const link = document.createElement('link');
  link.id = 'pp-fonts'; link.rel = 'stylesheet'; link.href = staticFile('fonts/fonts.css');
  link.onload = () => {
    Promise.all([
      '400 20px Newsreader', '500 20px Newsreader', 'italic 400 20px Newsreader', 'italic 500 20px Newsreader',
      '400 20px "Bricolage Grotesque"', '600 20px "Bricolage Grotesque"', '400 20px "JetBrains Mono"',
    ].map(f => document.fonts.load(f))).then(() => continueRender(handle), () => continueRender(handle));
  };
  link.onerror = () => continueRender(handle);
  document.head.appendChild(link);
}

export const F = {
  serif: 'Newsreader, Georgia, serif',
  sans: '"Bricolage Grotesque", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

export const ITALIC = { fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' as const };

export type Layout = 'h' | 'v';
