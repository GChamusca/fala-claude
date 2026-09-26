// Single source of truth for the edit: time warp (output → take), camera, captions and sound cues.
// Times in seconds. Take coordinates are the 1920×1080 browser viewport of the recording.

export const FPS = 30;
export const DURATION = 48;
export const TAKE_FPS = 30;

export type Key = [out: number, src: number];
export type Segment = { from: number; to: number; keys: Key[] };

// Each segment is one continuous stretch of the real recording, played with smooth speed ramps.
// Segments overlap by a few frames and cross-dissolve where the page itself changes.
export const SEGMENTS: Segment[] = [
  {
    from: 3.3, to: 29.9, keys: [
      [3.3, 2.4], [4.3, 3.6], [5.2, 4.6], [6.3, 6.6], [7.3, 9.6], [7.8, 10.3], // tema + criar
      [8.4, 19.5], [9.6, 22.5], [10.2, 25.1], [11.4, 32.0], [11.9, 34.0],     // conversa
      [12.4, 48.4], [13.1, 50.4],                                                // buscar
      [15.0, 112.0], [15.6, 115.0], [17.6, 120.0],                               // pesquisa → ângulos
      [18.6, 140.6], [19.4, 143.6], [20.2, 146.2], [20.9, 150.5], [21.6, 153.4],
      [22.3, 157.5], [23.0, 160.6], [23.8, 173.6],                               // três ângulos
      [24.3, 174.6], [25.0, 177.1], [25.6, 179.5], [26.1, 181.6], [26.9, 191.0], [27.3, 192.3], // formato + gerar
      [27.6, 195.0], [29.9, 745.0],                                              // geração acelerada
    ],
  },
  { from: 29.6, to: 37.5, keys: [[29.6, 785.6], [31.0, 789.6], [35.0, 797.0], [35.3, 806.2], [36.3, 813.3], [37.5, 816.2]] },
  { from: 37.2, to: 42.4, keys: [[37.2, 818.8], [38.0, 820.0], [42.4, 828.6]] },
];

// Camera: center (cx, cy) in take pixels and zoom (1 = whole 1920×1080 viewport).
export type Cam = [t: number, cx: number, cy: number, z: number];
export const CAMERA: Cam[] = [
  [3.3, 960, 540, 1.0], [4.4, 1070, 300, 1.85], [6.6, 1070, 320, 1.85], [7.3, 1070, 380, 1.55],
  [7.9, 960, 520, 1.15], [8.6, 960, 480, 1.45], [9.6, 960, 470, 1.6], [10.3, 960, 780, 1.55],
  [11.4, 1010, 860, 1.65], [11.9, 1150, 900, 1.6], [12.6, 1120, 900, 1.35], [13.1, 1200, 980, 1.6],
  [13.7, 960, 540, 1.05], [14.8, 960, 520, 1.25], [15.5, 960, 540, 1.0],
  [16.3, 520, 260, 1.8], [17.6, 520, 300, 1.8], [18.5, 560, 560, 1.35], [19.4, 560, 620, 1.3],
  [20.2, 565, 640, 1.5], [21.6, 565, 580, 1.5], [23.0, 565, 560, 1.5],
  [23.9, 1500, 360, 1.55], [24.6, 1450, 620, 1.3], [25.0, 1300, 860, 1.5],
  [25.6, 420, 780, 1.5], [26.1, 320, 850, 1.5], [26.9, 600, 900, 1.3], [27.3, 565, 960, 1.5],
  [27.8, 960, 540, 1.0], [29.6, 960, 520, 1.12],
  [30.0, 520, 600, 1.45], [31.0, 520, 600, 1.55], [34.8, 520, 600, 1.6],
  [35.4, 1300, 820, 1.35], [36.3, 1306, 823, 1.7], [36.9, 1645, 300, 1.8],
  [37.6, 930, 520, 1.55], [42.4, 930, 600, 1.7],
];

// Floating step cards.
export type Step = { from: number; to: number; n: string; title: string; sub: string };
export const STEPS: Step[] = [
  { from: 4.2, to: 7.8, n: '01', title: 'Conte sua ideia', sub: 'um tema, um link ou um ponto de vista' },
  { from: 8.3, to: 12.9, n: '02', title: 'Converse com o editor', sub: 'ele afina o recorte com você' },
  { from: 13.3, to: 15.5, n: '03', title: 'A redação cruza a cobertura', sub: 'matérias reais da imprensa brasileira' },
  { from: 15.8, to: 23.6, n: '04', title: 'Escolha o ângulo', sub: 'cada caminho sustentado por fontes' },
  { from: 23.8, to: 27.4, n: '05', title: 'Formato, estilo e tom', sub: 'carrossel · ilustração · explicador' },
  { from: 27.7, to: 29.7, n: '06', title: 'A redação trabalha a pauta', sub: 'texto, arte e checagem' },
  { from: 35.2, to: 37.3, n: '07', title: 'Você revisa e aprova', sub: 'a decisão final é sempre sua' },
  { from: 37.6, to: 42.2, n: '08', title: 'Documento de validação', sub: 'cada fato ligado à sua fonte' },
];

// Real numbers from this pauta (outline page of pedido d74f882a).
export const STAT_CALLOUT = { from: 16.0, to: 18.2, value: '200', label: 'matérias avaliadas nesta pesquisa' };

export const SHOWCASE = { from: 30.9, to: 35.1 };
export const HOOK_END = 3.7;
export const END_START = 42.0;

// Sound cues (seconds). Clicks and typing come from the recording via the warp.
export const SFX = {
  whoosh: [3.25, 13.55, 27.55, 37.2, 41.9],
  swoosh: [7.85, 15.4, 23.85, 29.55],
  riser: [27.9],
  impact: [29.95],
  shimmer: [30.9, 42.25],
  pop: [31.35, 32.2, 33.0, 33.8],
};
