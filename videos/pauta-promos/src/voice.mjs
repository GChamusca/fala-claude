// Gera a narração de cada promo na ElevenLabs com tempo por palavra (para a legenda sincronizada).
// Uso: XI_KEY=... node src/voice.mjs <voz> [promo ...]    (a chave nunca vai para o repositório)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { SCRIPTS } from './scripts.mjs';

const VOICES = { raquel: 'GDzHdQOi6jjf8zaXhCYD', roberta: 'RGymW84CSmfVugnA5tvA', lucas: '7lu3ze7orhWaNeSPowWx', davi: '5p9IbzcK4R8rN1fpGdMF' };
const [voice = 'raquel', ...only] = process.argv.slice(2);
const TEMPO = { roberta: 1.07 }[voice] ?? 1; // Roberta fala mais pausado
const KEY = process.env.XI_KEY;
if (!KEY) throw new Error('defina XI_KEY');
const ROOT = new URL('../', import.meta.url);
fs.mkdirSync(new URL('assets/voice/', ROOT), { recursive: true });

for (const [id, s] of Object.entries(SCRIPTS)) {
  if (only.length && !only.includes(id)) continue;
  const text = s.lines.map((l) => l.say).join(' ');
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICES[voice]}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ text, model_id: 'eleven_v3', language_code: 'pt', voice_settings: { stability: 0.5, similarity_boost: 0.8 } }),
  });
  if (!r.ok) throw new Error(`${id}: ${r.status} ${await r.text()}`);
  const j = await r.json();
  fs.writeFileSync(new URL(`assets/voice/${id}.mp3`, ROOT), Buffer.from(j.audio_base64, 'base64'));
  // palavras com início/fim a partir do alinhamento por caractere
  const a = j.alignment, words = [];
  let cur = null;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) { if (cur) { words.push(cur); cur = null; } return; }
    if (!cur) cur = { w: '', s: a.character_start_times_seconds[i] };
    cur.w += ch; cur.e = a.character_end_times_seconds[i];
  });
  if (cur) words.push(cur);
  // acelera um pouco (ritmo de anúncio) e ajusta os tempos das palavras na mesma proporção
  const mp3 = new URL(`assets/voice/${id}.mp3`, ROOT).pathname;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', mp3, '-filter:a', `atempo=${TEMPO}`, '-b:a', '128k', mp3 + '.tmp.mp3']);
  fs.renameSync(mp3 + '.tmp.mp3', mp3);
  words.forEach((w) => { w.s = +(w.s / TEMPO).toFixed(3); w.e = +(w.e / TEMPO).toFixed(3); });
  fs.writeFileSync(new URL(`assets/voice/${id}.json`, ROOT), JSON.stringify({ voice, text, tempo: TEMPO, words }, null, 1));
  console.log(id, words.length, 'palavras,', words.at(-1).e.toFixed(2) + 's');
}
