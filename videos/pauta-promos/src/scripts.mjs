// Roteiros dos promos de 15s (conversão). Cada linha: o que a voz fala e a "cena" que a acompanha.
// As palavras entre *asteriscos* ganham destaque manteiga na legenda.
export const SIGN = { say: 'Poste mais. Poste melhor. Pauta Pronta.', shot: 'fecho' };
export const SIGN_R = { say: 'Pauta Pronta. Com a inteligência do REP.', shot: 'fecho' };
export const SIGN_I ={ say: 'Pauta Pronta. A apuração vem antes do post.', shot: 'fecho' };

export const SCRIPTS = {
  p1: {
    title: 'As 500 abas',
    lines: [
      { say: 'Chega de abrir quinhentas abas pra fazer um post.', shot: 'abas' },
      { say: 'O Pauta Pronta lê tudo por você: duzentas matérias em minutos.', shot: 'leitura' },
      { say: 'E entrega o post pronto. Com fonte.', shot: 'entrega' },
      SIGN,
    ],
  },
  p2: {
    title: 'O medo de errar',
    lines: [
      { say: 'Você postou… e depois descobriu que a notícia não era bem assim.', shot: 'erro' },
      { say: 'No Pauta Pronta, cada informação vem com a matéria de origem.', shot: 'validacao' },
      { say: 'Você confere antes de publicar.', shot: 'confere' },
      SIGN,
    ],
  },
  p3: {
    title: 'O cliente cobrando',
    lines: [
      { say: 'Seis da tarde. O assunto explodiu. E o cliente quer o post pra ontem.', shot: 'cobranca' },
      { say: 'Traga o tema.', shot: 'tema' },
      { say: 'Em minutos: texto, arte e legenda, prontos pra revisar.', shot: 'entrega' },
      SIGN,
    ],
  },
  p4: {
    title: 'Sem pauta: o Radar',
    lines: [
      { say: 'Quando você fica sabendo do assunto, todo mundo já postou.', shot: 'atrasado' },
      { say: 'O Radar do Pauta Pronta mostra o que está crescendo agora…', shot: 'radar' },
      { say: 'e transforma em pauta num clique.', shot: 'clique' },
      SIGN,
    ],
  },
  p5: {
    title: 'Contra a IA genérica',
    lines: [
      { say: 'IA genérica inventa.', shot: 'inventa' },
      { say: 'O Pauta Pronta lê a cobertura real e cita cada fonte.', shot: 'leitura' },
      { say: 'Nada de achismo: cada fato com a matéria de origem.', shot: 'validacao' },
      SIGN,
    ],
  },

  // Série "Inteligência": posiciona pela apuração (base, ângulos, análise), não pelo post.
  i1: {
    title: 'A base',
    hl: /milhares|cem|nenhuma|importa|fonte|apuração/i,
    lines: [
      { say: 'Todo dia, a gente lê milhares de matérias, de mais de cem veículos.', shot: 'base' },
      { say: 'Você não precisa ler nenhuma.', shot: 'folga' },
      { say: 'Pergunta o assunto e recebe o que importa. Com fonte.', shot: 'validacao' },
      SIGN_I,
    ],
  },
  i2: {
    title: 'Os ângulos',
    hl: /três|promessa|mudou|passos|quantas|matérias|apuração/i,
    lines: [
      { say: 'O mesmo assunto rende três histórias diferentes.', shot: 'assunto' },
      { say: 'A promessa, o que já mudou, os próximos passos.', shot: 'angulos' },
      { say: 'E mostra quantas matérias sustentam cada uma.', shot: 'escolhe' },
      SIGN_I,
    ],
  },
  i3: {
    title: 'Quem está falando',
    hl: /opinar|cobrindo|puxou|cresceu|cem|apuração/i,
    lines: [
      { say: 'Antes de opinar, saiba quem está cobrindo.', shot: 'radar' },
      { say: 'UOL, Metrópoles, CNN, Folha: veja quem puxou o assunto…', shot: 'quem' },
      { say: 'e o que cresceu cem por cento hoje.', shot: 'cresceu' },
      SIGN_I,
    ],
  },
  i4: {
    title: 'Prompt em branco',
    hl: /prompt|branco|inventa|cobertura|real/i,
    lines: [
      { say: 'Ainda começa cada post de um prompt em branco?', shot: 'prompt' },
      { say: 'A IA genérica inventa o resto.', shot: 'inventa' },
      { say: 'No Pauta Pronta, seu próximo post nasce da cobertura real.', shot: 'leitura' },
      { say: 'Não de um prompt em branco. Pauta Pronta.', shot: 'fecho' },
    ],
  },

  // Série "Quem está por trás": o REP (números de /api/stats e agentes do repo rep-brasil).
  e1: {
    title: 'O motor: REP',
    hl: /REP|setecentas|mil|cem|trinta|classificações|inteligência/i,
    lines: [
      { say: 'Por trás do Pauta Pronta existe o REP.', shot: 'rep' },
      { say: 'Mais de setecentas mil matérias, de mais de cem veículos.', shot: 'acervo' },
      { say: 'Cada uma ganha mais de trinta classificações.', shot: 'etiquetas' },
      SIGN_R,
    ],
  },
  e2: {
    title: 'A análise cruzada',
    hl: /cruza|fato|declaração|hipótese|lacuna|acusa|apoia|investiga|inteligência/i,
    lines: [
      { say: 'O REP não só lê as matérias. Ele cruza.', shot: 'cruza' },
      { say: 'Separa fato de declaração, de hipótese e de lacuna.', shot: 'matriz' },
      { say: 'Mostra quem acusa, quem apoia, quem investiga.', shot: 'teia' },
      SIGN_R,
    ],
  },

  // Série "A redação na sua mão".
  r1: {
    title: 'Do link ao post',
    hl: /link|REP|pauta|crédito|apurou|inteligência/i,
    lines: [
      { say: 'Achou uma matéria boa? Cola o link.', shot: 'link' },
      { say: 'O Pauta Pronta lê, confere no REP e monta a pauta.', shot: 'busca' },
      { say: 'Texto, arte e legenda, com crédito pra quem apurou.', shot: 'entrega' },
      SIGN_R,
    ],
  },
  r2: {
    title: 'Uma matéria é só um lado',
    hl: /lado|link|veículos|cobriram|acervo|REP|inteligência/i,
    lines: [
      { say: 'Uma matéria é só um lado da história.', shot: 'umlado' },
      { say: 'Cola o link e veja como os outros veículos cobriram.', shot: 'cobertura' },
      { say: 'Tudo no acervo do REP.', shot: 'acervo' },
      SIGN_R,
    ],
  },
  r3: {
    title: 'A redação na sua mão',
    hl: /pesquisa|checagem|análise|texto|redação|mão|inteligência/i,
    lines: [
      { say: 'Pesquisa, checagem, análise e texto.', shot: 'mesas' },
      { say: 'Antes, isso era uma redação inteira.', shot: 'redacao' },
      { say: 'Agora cabe na sua mão.', shot: 'mao' },
      SIGN_R,
    ],
  },
};
