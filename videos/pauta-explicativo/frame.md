---
name: Pauta Pronta — frame
source: pautapronta.com (CSS de produção index-DC3LDI9k.css), adaptado para 1920×1080
colors:
  paper: "#f7f3ec"        # fundo de todas as cenas
  cream: "#efe7d8"        # painéis, cartões secundários
  cream-deep: "#e6dcc7"   # itens lidos/descartados, trilhos
  rule: "#cfc6b3"         # fios e divisórias
  ink: "#0a0a0a"          # texto, contornos, sombras carimbadas
  ink-soft: "#2a2622"     # texto de corpo
  mute: "#6b665d"         # rótulos secundários
  navy: "#24456b"         # acento principal (palavra em itálico, botões, selecionados)
  navy-deep: "#1a3350"
  butter: "#e8c873"       # destaque, marca-texto, disco de personagem
  butter-deep: "#d3ae4f"
  rose: "#a8453a"         # divergência, alerta
  grass: "#5a7d3f"        # fato, confirmado
  sky: "#4b88a6"          # contexto
typography:
  display: { family: "Newsreader", weight: 400, italic-accent: true, sizes: [96, 120, 150] }
  body: { family: "Bricolage Grotesque", weights: [400, 600, 700], sizes: [30, 36, 44] }
  mono: { family: "JetBrains Mono", weight: 500, transform: uppercase, tracking: "0.16em", sizes: [20, 24] }
  hand: { family: "Caveat", weight: 700, sizes: [52, 64] }
spacing:
  gutter: 120
  radius: { card: 22, panel: 30, pill: 999 }
components:
  stamp: "borda 3px ink + sombra dura 8px 8px 0 ink (sem desfoque)"
  button: "pílula navy, texto paper, sombra 6px ink"
  chip: "pílula paper, borda 2px ink, rótulo mono"
  disc: "círculo de cor da marca com borda 3px ink atrás de cada personagem"
  logo: "círculo navy r22 + círculo ink deslocado + ponto butter (36,20) r5"
---

## Overview

Editorial, de papel e tinta: fundo papel quente, contornos pretos, sombras carimbadas duras,
serifa Newsreader com a palavra-chave em itálico navy. É o site do Pauta Pronta em escala de vídeo.

## The Frame

- Sempre claro (papel). Profundidade vem de grão sutil de papel, discos de cor e sombras carimbadas.
- Um acento por cena (navy), manteiga como marca-texto e disco. Rosa/verde/azul só com significado
  (divergência / fato / contexto).
- Personagens Open Peeps (tinta + cores da marca) vivem dentro de discos com borda.

## Composition Rules

- Headline à esquerda ou no terço superior, ancorada na margem de 120px; personagem no terço oposto.
- Interface do produto recriada grande e plana (sem cromo de navegador), sempre com dados reais.
- Anotações à mão (Caveat) só para a voz do usuário ("você confere antes de publicar").

## Do's and Don'ts

- Do: movimento suave (power3), revelação sequencial, frases ≥ 2,5s na tela.
- Don't: gradientes roxos/"IA", neon, texto rápido, câmera que balança, cores fora da paleta, bounce.
