# Vídeo de lançamento — Pauta Pronta

Filme de 48 s (16:9 e 9:16) feito em JavaScript com [Remotion](https://www.remotion.dev/), a partir de uma
**gravação real** do pautapronta.com: a pauta "Canetas emagrecedoras no SUS" (pedido `d74f882a`), criada na
conta de teste, em carrossel, estilo Ilustração, tom Explicador.

## Como funciona

- `src/timeline.ts` — a edição inteira: curva de tempo (saída → gravação), câmera, cartões de passo e sons.
- `src/warp.ts` — interpolação monotônica (acelera sem voltar no tempo) e câmera suavizada.
- `src/Stage.tsx` — janela do navegador com câmera, quadros reais, cursor e cliques reconstruídos do log.
- `src/Overlays.tsx` — abertura, cartões, número real (200 matérias), vitrine 3D dos slides, encerramento.
- `src/Sound.tsx` — trilha + efeitos; cliques e digitação vêm do log da gravação.
- `src/take.json` — eventos da gravação (cursor, cliques, teclas) em segundos desde o primeiro quadro.

A trilha (`public/audio/music.mp3`) é original, gerada por código: `node scripts/music.mjs` escreve
`public/audio/music.wav`, convertido com `ffmpeg -i music.wav -b:a 256k music.mp3`. Os efeitos
sonoros foram gerados na ElevenLabs. Fontes da marca (Newsreader, Bricolage Grotesque, JetBrains Mono,
licença OFL) ficam em `public/fonts`.

## Renderizar

A gravação bruta (`public/take.mp4`, ~90 MB) não vai para o Git. Com ela no lugar:

```bash
npm install
node scripts/extract-frames.mts   # extrai só os quadros usados → public/warp/
npm run render:16x9
npm run render:9x16
```

Para usar outro Chromium, defina `REMOTION_BROWSER`.

## Observação sobre a gravação

Para gravar, foi aplicada **só no navegador local** uma regra CSS que mantém o Radar embutido dentro
da moldura. Em produção (25/09/2026), o CSS publicado espera as classes `rep-radar-pauta rep-radar-embedded`,
que o JS publicado não aplica, e o Radar cobre a home, o /dashboard e o /criar. A tela de revisão visual entre
versões (exceção do fluxo) foi omitida do corte.
