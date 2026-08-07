"use client";

import { useEffect, useMemo, useState } from "react";

type Tone = "danger" | "calm" | "mystic" | "gold";
type ArtType = "home" | "road" | "crash" | "forest" | "camp" | "dragon" | "pirates" | "ship" | "training" | "temple" | "football" | "r1" | "treasure";

type SceneId =
  | "title" | "message" | "home" | "homeChoice" | "road" | "crash" | "crashReaction"
  | "forestChoice" | "exploreApproach" | "campSearch" | "eggChoice" | "healSearch" | "plantChoice" | "dragonReaction"
  | "dragonName" | "waterTrail" | "pirateChoice" | "stealWater" | "talkPirates" | "pirateFightStart" | "pirateFightMove" | "captain"
  | "ship" | "trainingChoice" | "trainingStyle" | "trainingTrial" | "refuseTraining" | "templeArrival" | "shadowOpening" | "shadowCounter" | "shadowFinal"
  | "guardian" | "footballPrep" | "football" | "r1" | "roadChoice" | "fastObstacle" | "slowClue" | "treasure" | "final";

type Choice = {
  label: string;
  next: SceneId;
  tone?: Tone;
  effect?: Partial<GameFlags>;
  note?: string;
};

type Scene = {
  chapter: string;
  title: string;
  text: string[];
  art: ArtType;
  prompt?: string;
  choices: Choice[];
};

type GameFlags = {
  openingMood: string;
  crashInstinct: string;
  forestPath: string;
  eggDecision: string;
  dragonBond: number;
  pirateApproach: string;
  combatStyle: string;
  captainTrust: number;
  trainingStyle: string;
  trainingChoice: string;
  shadowApproach: string;
  guardianHelp: string;
  finalRoad: string;
};

const initialFlags: GameFlags = {
  openingMood: "",
  crashInstinct: "",
  forestPath: "",
  eggDecision: "",
  dragonBond: 0,
  pirateApproach: "",
  combatStyle: "",
  captainTrust: 0,
  trainingStyle: "",
  trainingChoice: "",
  shadowApproach: "",
  guardianHelp: "",
  finalRoad: ""
};

const FINAL_ANSWER = "tinha que ser homis kskks";

const chapters = [
  { id: "home", label: "Casa", icon: "⌂" },
  { id: "forest", label: "Floresta", icon: "♧" },
  { id: "dragon", label: "Dragão", icon: "◇" },
  { id: "pirates", label: "Piratas", icon: "⚓" },
  { id: "temple", label: "Templo", icon: "⚔" },
  { id: "football", label: "Guardião", icon: "⚽" },
  { id: "r1", label: "Saída", icon: "✦" },
  { id: "treasure", label: "Tesouro", icon: "◆" }
];

const chapterOrder: Record<string, number> = {
  title: 0, message: 0, home: 0, homeChoice: 0, road: 0,
  crash: 1, crashReaction: 1, forestChoice: 1, exploreApproach: 1, campSearch: 1, eggChoice: 1, healSearch: 1, plantChoice: 1,
  dragonReaction: 2, dragonName: 2, waterTrail: 2,
  pirateChoice: 3, stealWater: 3, talkPirates: 3, pirateFightStart: 3, pirateFightMove: 3, captain: 3, ship: 3,
  trainingChoice: 4, trainingStyle: 4, trainingTrial: 4, refuseTraining: 4, templeArrival: 4, shadowOpening: 4, shadowCounter: 4, shadowFinal: 4,
  guardian: 5, footballPrep: 5, football: 5,
  r1: 6, roadChoice: 6, fastObstacle: 6, slowClue: 6,
  treasure: 7, final: 7
};

const scenes: Partial<Record<SceneId, Scene>> = {
  message: {
    chapter: "ANTES DE COMEÇAR",
    title: "Uma mensagem para você",
    art: "home",
    text: [
      "Oi, vida. Tudo bem? Antes de tudo, quero te desejar parabéns e muitos anos de vida. Espero que você consiga conquistar tudo o que deseja e que esse novo ciclo seja muito especial.",
      "Eu tentei criar um RPG porque sei que você gosta, mas acho que não deu muito certo kkkkk. Então improvisei mais ou menos e fiz essa aventura para você.",
      "Enfim… segue aí e boa sorte.",
      "Talvez não tenha ficado exatamente como um RPG de verdade, mas cada parte foi pensada com carinho, lembrando das coisas que você gosta e das nossas histórias."
    ],
    prompt: "Preparado para entrar na história?",
    choices: [{ label: "Começar a aventura", next: "home", tone: "gold" }]
  },
  home: {
    chapter: "CAPÍTULO I · O COMEÇO",
    title: "Uma noite inquieta",
    art: "home",
    text: [
      "Certo dia, Lucas estava em casa se sentindo ansioso e inquieto. Ele tentou se distrair, mas nada parecia funcionar.",
      "Depois de alguns minutos olhando para a chave da CB 300 vermelha, decidiu sair para espairecer e dar uma volta pela cidade.",
      "Do lado de fora, a noite parecia calma demais. Lucas respirou fundo, colocou o celular no bolso e decidiu que alguns minutos sobre duas rodas poderiam silenciar a confusão dentro da cabeça."
    ],
    prompt: "Antes de sair, como Lucas tenta organizar a cabeça?",
    choices: [
      { label: "Colocar uma música e sair", next: "homeChoice", tone: "mystic", effect: { openingMood: "música" }, note: "A música ajuda Lucas a respirar melhor." },
      { label: "Sair em silêncio para pensar", next: "homeChoice", tone: "calm", effect: { openingMood: "silêncio" }, note: "O silêncio deixa Lucas atento ao caminho." },
      { label: "Mandar uma mensagem rápida", next: "homeChoice", tone: "gold", effect: { openingMood: "mensagem" }, note: "Uma pequena conexão antes da aventura." }
    ]
  },
  homeChoice: {
    chapter: "CAPÍTULO I · O COMEÇO",
    title: "Sem destino certo",
    art: "home",
    text: [
      "Lucas veste a jaqueta, pega a chave e desce até a moto. O motor da CB 300 desperta e o som familiar traz uma sensação de liberdade.",
      "Ele decide não planejar o caminho. Só quer andar até a ansiedade diminuir.",
      "Antes de colocar o capacete, ele permaneceu alguns segundos parado diante da moto. A ansiedade ainda estava ali, mas o ronco conhecido do motor parecia dizer que a noite poderia tomar outro rumo."
    ],
    prompt: "Qual caminho ele escolhe na cidade?",
    choices: [
      { label: "Seguir pelas avenidas iluminadas", next: "road", tone: "gold", effect: { openingMood: "avenidas" } },
      { label: "Procurar uma rota mais tranquila", next: "road", tone: "calm", effect: { openingMood: "rota tranquila" } },
      { label: "Acelerar até onde a estrada levar", next: "road", tone: "danger", effect: { openingMood: "impulso" } }
    ]
  },
  road: {
    chapter: "PRÓLOGO",
    title: "A estrada interrompida",
    art: "road",
    text: [
      "Depois de algum tempo pilotando sem destino certo, Lucas acaba entrando em uma BR. A estrada está tranquila, o vento bate contra sua jaqueta e, aos poucos, sua mente começa a ficar mais leve.",
      "A cidade desaparece atrás dele. Restam apenas o farol, o som do motor e a faixa branca atravessando a escuridão.",
      "Até que uma sombra atravessa a pista.",
      "As luzes dos postes ficaram cada vez mais distantes. Lucas percebeu que havia ido mais longe do que pretendia, porém não voltou; naquele momento, continuar parecia mais fácil do que encarar novamente o silêncio de casa."
    ],
    prompt: "Lucas tem apenas um instante para reagir.",
    choices: [
      { label: "Frear com força", next: "crash", tone: "danger", effect: { crashInstinct: "freou" } },
      { label: "Desviar para o acostamento", next: "crash", tone: "calm", effect: { crashInstinct: "desviou" } },
      { label: "Proteger a cabeça e soltar a moto", next: "crash", tone: "mystic", effect: { crashInstinct: "se protegeu" } }
    ]
  },
  crash: {
    chapter: "PRÓLOGO",
    title: "Barulho, luz e silêncio",
    art: "crash",
    text: [
      "O guidão vira, os pneus perdem o contato com o asfalto e a CB 300 atravessa a vegetação.",
      "Por alguns segundos, tudo se transforma em metal raspando, folhas quebrando e uma luz branca diante dos olhos.",
      "Quando Lucas desperta, está ferido no meio de uma floresta desconhecida. A moto está caída perto dele e nenhum sinal da BR pode ser visto.",
      "A dor veio aos poucos. Primeiro no ombro, depois na barriga e nas pernas. O cheiro de terra molhada misturava-se ao de combustível, enquanto folhas ainda caíam ao redor da moto."
    ],
    prompt: "Ele chama por ajuda, mas ninguém responde. O que verifica primeiro?",
    choices: [
      { label: "Checar o ferimento na barriga", next: "crashReaction", tone: "calm", effect: { forestPath: "ferimento" } },
      { label: "Tentar levantar a moto", next: "crashReaction", tone: "danger", effect: { forestPath: "moto" } },
      { label: "Procurar o celular", next: "crashReaction", tone: "mystic", effect: { forestPath: "celular" } }
    ]
  },
  crashReaction: {
    chapter: "CAPÍTULO II · A FLORESTA",
    title: "Nenhum sinal de saída",
    art: "crash",
    text: [
      "O celular está sem sinal, a moto não liga e o ferimento continua sangrando. Lucas percebe que ficar parado não resolverá nada.",
      "A floresta é densa, úmida e estranhamente silenciosa. Entre as árvores, dois caminhos parecem possíveis.",
      "Lucas tentou reconhecer algum som de carros ao longe, mas ouviu apenas o vento passando pelas copas. A sensação de estar sendo observado tornou o silêncio ainda mais pesado."
    ],
    prompt: "Qual necessidade vem primeiro?",
    choices: [
      { label: "Explorar e procurar recursos", next: "exploreApproach", tone: "mystic", effect: { forestPath: "explorar" } },
      { label: "Cuidar dos ferimentos", next: "healSearch", tone: "calm", effect: { forestPath: "curar" } },
      { label: "Tentar consertar a moto antes", next: "forestChoice", tone: "danger", effect: { forestPath: "moto" } }
    ]
  },
  forestChoice: {
    chapter: "CAPÍTULO II · A FLORESTA",
    title: "A moto não responde",
    art: "crash",
    text: [
      "Lucas tenta levantar a CB 300 e verifica o painel. Nada acende. A queda danificou mais do que ele consegue reparar sem ferramentas.",
      "Ao ouvir um estalo entre as árvores, entende que precisa sair dali antes que escureça ainda mais.",
      "Ele passou a mão pelo tanque arranhado e prometeu a si mesmo que voltaria para buscá-la. Antes disso, precisaria descobrir onde estava — e o que havia naquela floresta."
    ],
    prompt: "Agora ele precisa escolher.",
    choices: [
      { label: "Explorar a floresta", next: "exploreApproach", tone: "mystic", effect: { forestPath: "explorar" } },
      { label: "Buscar algo para o ferimento", next: "healSearch", tone: "calm", effect: { forestPath: "curar" } }
    ]
  },
  exploreApproach: {
    chapter: "CAMINHO DA CURIOSIDADE",
    title: "Marcas entre as árvores",
    art: "forest",
    text: [
      "Lucas segue por um caminho estreito e encontra pegadas antigas, galhos cortados e restos de tecido presos nos arbustos.",
      "Mais à frente, uma fumaça quase apagada sobe entre as árvores. Pode ser ajuda — ou perigo.",
      "Quanto mais avançava, mais a vegetação parecia fechar o caminho atrás dele. As marcas encontradas não eram recentes, mas provavam que outra pessoa já havia sobrevivido tempo suficiente para passar por ali."
    ],
    prompt: "Como se aproximar?",
    choices: [
      { label: "Seguir as pegadas", next: "campSearch", tone: "calm", effect: { captainTrust: 1 } },
      { label: "Ir direto até a fumaça", next: "campSearch", tone: "danger", effect: { captainTrust: 0 } },
      { label: "Contornar e observar escondido", next: "campSearch", tone: "mystic", effect: { captainTrust: 1 } }
    ]
  },
  campSearch: {
    chapter: "CAMINHO DA CURIOSIDADE",
    title: "O acampamento abandonado",
    art: "camp",
    text: [
      "O local está vazio há muito tempo. Há madeira apodrecida, uma fogueira fria e uma mochila rasgada.",
      "Sob um pano coberto de folhas, Lucas encontra uma espada antiga ainda afiada. Próximo dali, árvores carregadas de frutos cercam uma pedra enorme.",
      "Lucas examinou o lugar com cuidado. Havia pratos quebrados, símbolos riscados na madeira e uma fotografia tão desgastada que já não mostrava rosto algum. Alguém havia deixado o acampamento às pressas."
    ],
    prompt: "O que ele faz primeiro?",
    choices: [
      { label: "Examinar a espada", next: "eggChoice", tone: "mystic", effect: { combatStyle: "precisão" } },
      { label: "Procurar comida", next: "eggChoice", tone: "calm", effect: { combatStyle: "sobrevivência" } },
      { label: "Investigar a mochila", next: "eggChoice", tone: "gold", effect: { captainTrust: 2 } }
    ]
  },
  eggChoice: {
    chapter: "O OVO MISTERIOSO",
    title: "Aquilo não era uma fruta",
    art: "dragon",
    text: [
      "Ao tentar alcançar um fruto alto, algo pesado despenca e acerta Lucas. Ele desmaia por alguns minutos.",
      "Quando acorda, percebe que o objeto é um enorme ovo coberto por marcas luminosas. A casca vibra como se algo respirasse lá dentro.",
      "Ao aproximar o ouvido, Lucas escutou pequenas batidas vindas do interior. Não pareciam ameaçadoras; soavam como o coração acelerado de uma criatura que também queria sair dali."
    ],
    prompt: "O que Lucas faz com o ovo?",
    choices: [
      { label: "Levar o ovo até a moto", next: "dragonReaction", tone: "calm", effect: { eggDecision: "levou", dragonBond: 2 } },
      { label: "Esperar o ovo rachar ali", next: "dragonReaction", tone: "mystic", effect: { eggDecision: "esperou", dragonBond: 1 } },
      { label: "Tocar as marcas luminosas", next: "dragonReaction", tone: "gold", effect: { eggDecision: "tocou", dragonBond: 2 } }
    ]
  },
  healSearch: {
    chapter: "CAMINHO DA PRUDÊNCIA",
    title: "Folhas que estancam o sangue",
    art: "forest",
    text: [
      "Lucas anda com dificuldade e encontra uma área úmida coberta por plantas diferentes das demais.",
      "Uma delas possui folhas grossas e um líquido transparente. Ele se lembra de ter visto algo semelhante sendo usado em ferimentos, mas não tem certeza.",
      "Cada passo puxava o ferimento e deixava um rastro discreto nas folhas. Mesmo assim, Lucas obrigou-se a observar as plantas com atenção, sabendo que uma escolha errada poderia piorar tudo."
    ],
    prompt: "Como testar a planta?",
    choices: [
      { label: "Aplicar apenas um pouco", next: "plantChoice", tone: "calm", effect: { dragonBond: 1 } },
      { label: "Cheirar e observar primeiro", next: "plantChoice", tone: "mystic", effect: { captainTrust: 1 } },
      { label: "Aplicar rapidamente no ferimento", next: "plantChoice", tone: "danger", effect: { captainTrust: 0 } }
    ]
  },
  plantChoice: {
    chapter: "CAMINHO DA PRUDÊNCIA",
    title: "A planta do sono",
    art: "forest",
    text: [
      "O sangramento diminui, mas a visão de Lucas começa a ficar pesada. A planta também possui um forte efeito sonífero.",
      "Ele tenta permanecer acordado, porém cai entre as folhas. Quando desperta, sente algo molhado em seu rosto: um pequeno dragão está lambendo sua bochecha.",
      "Durante o sono, ele sonhou com asas cruzando um céu vermelho e uma voz distante chamando seu nome. Ao despertar, não sabia se tinha sido apenas efeito da planta ou um aviso daquela floresta."
    ],
    prompt: "Como Lucas reage ao animal desconhecido?",
    choices: [
      { label: "Ficar imóvel e observar", next: "dragonReaction", tone: "calm", effect: { dragonBond: 2, eggDecision: "observou" } },
      { label: "Estender a mão devagar", next: "dragonReaction", tone: "gold", effect: { dragonBond: 3, eggDecision: "acolheu" } },
      { label: "Afastar-se e pegar um galho", next: "dragonReaction", tone: "danger", effect: { dragonBond: 0, eggDecision: "desconfiou" } }
    ]
  },
  dragonReaction: {
    chapter: "CAPÍTULO III · UM NOVO COMPANHEIRO",
    title: "O primeiro vínculo",
    art: "dragon",
    text: [
      "O pequeno dragão inclina a cabeça e observa Lucas com curiosidade. Apesar das garras e da fumaça saindo de suas narinas, ele parece mais perdido do que perigoso.",
      "Depois de alguns instantes, a criatura se aproxima e encosta a cabeça na perna de Lucas. Ela decidiu acompanhá-lo.",
      "O filhote tinha os olhos atentos e uma das asas ainda amassada, como se tivesse acabado de nascer. Lucas percebeu que, apesar de estranho, aquele encontro talvez não fosse um acidente."
    ],
    prompt: "Como fortalecer essa confiança?",
    choices: [
      { label: "Dividir a comida encontrada", next: "dragonName", tone: "calm", effect: { dragonBond: 3 } },
      { label: "Fazer carinho e conversar", next: "dragonName", tone: "gold", effect: { dragonBond: 4 } },
      { label: "Testar se ele entende comandos", next: "dragonName", tone: "mystic", effect: { dragonBond: 2 } }
    ]
  },
  waterTrail: {
    chapter: "CAPÍTULO IV · O ACAMPAMENTO PIRATA",
    title: "Vozes além da nascente",
    art: "pirates",
    text: [
      "Lucas e seu novo companheiro escutam água correndo. Ao seguir o som, também ouvem vozes e o barulho de barris sendo arrastados.",
      "Atrás de pedras cobertas por musgo, existe um acampamento pirata construído ao redor de uma nascente. Lucas precisa de água, mas os homens estão armados.",
      "A sede tornava difícil ignorar a nascente. Lucas se abaixou atrás das pedras, observando bandeiras rasgadas, facas sobre mesas e um navio impossível encalhado entre árvores gigantes."
    ],
    prompt: "Antes de agir, o que ele observa?",
    choices: [
      { label: "Contar quantos piratas existem", next: "pirateChoice", tone: "calm", effect: { pirateApproach: "estratégia" } },
      { label: "Procurar uma rota até os barris", next: "pirateChoice", tone: "mystic", effect: { pirateApproach: "furtivo" } },
      { label: "Ver se alguém parece amigável", next: "pirateChoice", tone: "gold", effect: { pirateApproach: "diplomacia" } }
    ]
  },
  pirateChoice: {
    chapter: "DECISÃO NO ACAMPAMENTO",
    title: "Água ou confiança",
    art: "pirates",
    text: [
      "O dragão se esconde atrás de Lucas, mas sua cauda inquieta bate nas pedras. Qualquer erro poderá chamar atenção.",
      "Lucas precisa decidir como entrar no acampamento.",
      "Os homens riam alto, mas mantinham as armas sempre próximas. Pela maneira como vigiavam a floresta, Lucas entendeu que os piratas também temiam alguma coisa escondida além do acampamento."
    ],
    prompt: "Qual abordagem usar?",
    choices: [
      { label: "Pegar água escondido", next: "stealWater", tone: "mystic", effect: { pirateApproach: "furtivo" } },
      { label: "Pedir água diretamente", next: "talkPirates", tone: "calm", effect: { pirateApproach: "diplomacia", captainTrust: 1 } },
      { label: "Distrair os piratas antes", next: "stealWater", tone: "gold", effect: { pirateApproach: "distração", dragonBond: 3 } }
    ]
  },
  stealWater: {
    chapter: "O PLANO SILENCIOSO",
    title: "A caneca de metal",
    art: "pirates",
    text: [
      "Lucas alcança um barril enquanto os piratas discutem. O dragão tenta segui-lo, mas esbarra em uma caneca de metal.",
      "O objeto cai e o som ecoa pelo acampamento. Um pirata vê a espada e grita que Lucas veio roubar suas coisas.",
      "Por um instante, tudo ficou imóvel. Então cadeiras arrastaram, mãos buscaram espadas e o acampamento inteiro se voltou para Lucas. A sede havia deixado de ser o maior problema."
    ],
    prompt: "A luta parece inevitável. Qual é a primeira ação?",
    choices: [
      { label: "Tentar explicar antes de atacar", next: "pirateFightStart", tone: "calm", effect: { captainTrust: 2, combatStyle: "defensivo" } },
      { label: "Sacar a espada imediatamente", next: "pirateFightStart", tone: "danger", effect: { combatStyle: "agressivo" } },
      { label: "Mandar o dragão criar fumaça", next: "pirateFightStart", tone: "mystic", effect: { combatStyle: "estratégico", dragonBond: 3 } }
    ]
  },
  talkPirates: {
    chapter: "UMA TENTATIVA DE PAZ",
    title: "O lagarto de estimação",
    art: "pirates",
    text: [
      "Lucas sai do esconderijo com as mãos levantadas e diz que precisa apenas de água.",
      "Um pirata ri, chama o dragão de lagarto de estimação e puxa sua cauda. O dragão solta uma chama e queima o chapéu dele. Os demais sacam as armas.",
      "Lucas ainda tentou manter a voz calma, mas o filhote mostrou os dentes ao sentir a cauda ser puxada. A pequena chama arrancou risadas por apenas um segundo — até que o chapéu começou a queimar."
    ],
    prompt: "Como Lucas impede que a situação piore?",
    choices: [
      { label: "Ficar entre o dragão e os piratas", next: "pirateFightStart", tone: "calm", effect: { captainTrust: 2, combatStyle: "proteção" } },
      { label: "Ordenar que o dragão recue", next: "pirateFightStart", tone: "mystic", effect: { captainTrust: 1, dragonBond: 2 } },
      { label: "Desafiar o pirata que puxou a cauda", next: "pirateFightStart", tone: "danger", effect: { combatStyle: "duelo" } }
    ]
  },
  pirateFightStart: {
    chapter: "BATALHA · PRIMEIRO MOVIMENTO",
    title: "Espada, fogo e barris",
    art: "pirates",
    text: [
      "Os piratas cercam Lucas. Alguns avançam pela frente enquanto outros tentam alcançar o dragão pelos lados.",
      "O terreno está cheio de barris, cordas e tábuas soltas. Lucas pode usar o ambiente a seu favor.",
      "Lucas apertou o cabo da espada antiga. Nunca havia lutado daquele jeito, mas seus movimentos pareciam guiados por uma memória que não era sua, como se a própria lâmina reconhecesse o perigo."
    ],
    prompt: "Qual estratégia ele escolhe?",
    choices: [
      { label: "Cortar as cordas dos barris", next: "pirateFightMove", tone: "mystic", effect: { combatStyle: "ambiente", captainTrust: 2 } },
      { label: "Lutar costas com costas com o dragão", next: "pirateFightMove", tone: "gold", effect: { combatStyle: "parceria", dragonBond: 4 } },
      { label: "Abrir caminho até a nascente", next: "pirateFightMove", tone: "calm", effect: { combatStyle: "objetivo" } }
    ]
  },
  pirateFightMove: {
    chapter: "BATALHA · GOLPE FINAL",
    title: "O último grupo avança",
    art: "pirates",
    text: [
      "Lucas e o dragão derrubam boa parte dos piratas, mas três homens ainda bloqueiam a saída.",
      "Atrás deles, uma figura permanece imóvel, observando a batalha do convés do navio.",
      "O chão estava coberto de água, madeira quebrada e faíscas. Lucas respirava com dificuldade, enquanto seu companheiro permanecia perto dele, esperando o próximo sinal."
    ],
    prompt: "Como encerrar a luta?",
    choices: [
      { label: "Golpe rápido para desarmá-los", next: "captain", tone: "calm", effect: { captainTrust: 3 } },
      { label: "Ataque combinado com o dragão", next: "captain", tone: "gold", effect: { dragonBond: 4, captainTrust: 2 } },
      { label: "Investida direta contra o líder", next: "captain", tone: "danger", effect: { captainTrust: 1 } }
    ]
  },
  captain: {
    chapter: "O CAPITÃO",
    title: "O homem que aplaudiu",
    art: "pirates",
    text: [
      "Quando o último pirata cai, o capitão se aproxima batendo palmas lentamente.",
      "“Que bela luta, meninos. E que animal habilidoso você tem, Lucas.”",
      "Ele oferece água e diz conhecer algo capaz de tirar os dois da floresta, mas deixa claro que ainda precisa decidir se pode confiar neles.",
      "O capitão não demonstrava medo nem raiva pela derrota dos homens. Seu olhar estava preso à espada de Lucas, como se finalmente tivesse encontrado algo que procurava havia muitos anos."
    ],
    prompt: "Como Lucas responde ao capitão?",
    choices: [
      { label: "Agradecer e aceitar a conversa", next: "ship", tone: "calm", effect: { captainTrust: 4 } },
      { label: "Exigir primeiro uma explicação", next: "ship", tone: "mystic", effect: { captainTrust: 2 } },
      { label: "Manter a espada preparada", next: "ship", tone: "danger", effect: { captainTrust: 1 } }
    ]
  },
  ship: {
    chapter: "CAPÍTULO V · A MALDIÇÃO",
    title: "A Bússola do Destino",
    art: "ship",
    text: [
      "Dentro da cabine há mapas, moedas, máscaras e uma espada negra presa à parede.",
      "O capitão mostra uma bússola quebrada. Ele explica que, quando o sol desaparece, criaturas chamadas Sombras despertam.",
      "A pedra mágica da bússola foi levada ao Templo das Glicínias Negras. Ao observar a espada encontrada por Lucas, ele reconhece a arma de um antigo Caçador.",
      "O interior do navio cheirava a madeira antiga e ervas queimadas. Nos mapas, todas as rotas terminavam na mesma floresta, mas nenhuma mostrava um caminho de volta para a cidade."
    ],
    prompt: "O capitão oferece treinamento antes da missão.",
    choices: [
      { label: "Aceitar o treinamento", next: "trainingStyle", tone: "gold", effect: { trainingChoice: "aceitou" } },
      { label: "Pedir para ver o mapa primeiro", next: "trainingChoice", tone: "mystic", effect: { trainingChoice: "investigou" } },
      { label: "Recusar e confiar na própria força", next: "refuseTraining", tone: "danger", effect: { trainingChoice: "recusou" } }
    ]
  },
  trainingChoice: {
    chapter: "ANTES DO TREINAMENTO",
    title: "As marcas no mapa",
    art: "ship",
    text: [
      "Lucas analisa o mapa e percebe três entradas possíveis no templo: o portão principal, um túnel antigo e uma passagem sobre as árvores.",
      "O capitão avisa que nenhuma rota será segura sem aprender a controlar a espada.",
      "O capitão explicou que a floresta alterava quem permanecia nela por tempo demais. Segundo ele, dominar a espada não serviria apenas para vencer uma batalha, mas para impedir que Lucas se tornasse parte daquele lugar."
    ],
    prompt: "Depois de estudar o caminho, o que Lucas decide?",
    choices: [
      { label: "Aceitar o treinamento", next: "trainingStyle", tone: "gold", effect: { trainingChoice: "aceitou após mapa" } },
      { label: "Memorizar o túnel e recusar", next: "refuseTraining", tone: "mystic", effect: { trainingChoice: "túnel" } }
    ]
  },
  trainingStyle: {
    chapter: "TREINAMENTO DO CAÇADOR",
    title: "Escolha um estilo",
    art: "training",
    text: [
      "No convés, o capitão explica que a espada reage à respiração, à intenção e à forma como Lucas protege aquilo que considera importante.",
      "Quatro estilos surgem como possibilidades. A escolha mudará os próximos movimentos no templo.",
      "No convés, o vento mudou de direção quando Lucas segurou a lâmina. Pequenos reflexos percorreram o metal, reagindo à respiração dele e ao vínculo criado com seu companheiro."
    ],
    prompt: "Qual estilo combina mais com Lucas?",
    choices: [
      { label: "Tempestade · velocidade", next: "trainingTrial", tone: "mystic", effect: { trainingStyle: "Tempestade" } },
      { label: "Chamas · força e proteção", next: "trainingTrial", tone: "danger", effect: { trainingStyle: "Chamas", dragonBond: 4 } },
      { label: "Sombras · furtividade", next: "trainingTrial", tone: "calm", effect: { trainingStyle: "Sombras" } },
      { label: "Marés · precisão e equilíbrio", next: "trainingTrial", tone: "gold", effect: { trainingStyle: "Marés" } }
    ]
  },
  trainingTrial: {
    chapter: "TREINAMENTO · PROVA FINAL",
    title: "Até onde continuar?",
    art: "training",
    text: [
      "Depois de horas de treino, Lucas está exausto. O capitão prepara uma última prova: atravessar o convés enquanto alvos surgem dos dois lados.",
      "No meio da prova, o dragão se desequilibra e prende uma asa entre as cordas.",
      "O exercício parecia simples até as cordas começarem a se mover sozinhas. O capitão observava em silêncio, avaliando não apenas a técnica de Lucas, mas o tipo de pessoa que ele escolheria ser sob pressão."
    ],
    prompt: "Qual decisão vem primeiro?",
    choices: [
      { label: "Abandonar a prova e ajudar o dragão", next: "templeArrival", tone: "gold", effect: { trainingChoice: "protegeu o dragão", dragonBond: 5, captainTrust: 4 } },
      { label: "Concluir a prova e voltar rápido", next: "templeArrival", tone: "mystic", effect: { trainingChoice: "concluiu", captainTrust: 3 } },
      { label: "Pedir que o dragão se liberte sozinho", next: "templeArrival", tone: "danger", effect: { trainingChoice: "exigiu independência", dragonBond: 2 } }
    ]
  },
  refuseTraining: {
    chapter: "CORAGEM SEM CONTROLE",
    title: "Uma escolha arriscada",
    art: "training",
    text: [
      "“Eu só preciso saber onde está a bússola”, diz Lucas.",
      "O capitão entrega o mapa e avisa: “Coragem sem controle costuma terminar em túmulo.”",
      "Sem dominar completamente a espada, Lucas precisará confiar mais em observação, improviso e no dragão.",
      "Mesmo sem aceitar as instruções completas, Lucas ouviu o último aviso do capitão: as Sombras não atacavam somente o corpo. Elas usavam lembranças, dúvidas e medos para enfraquecer quem entrava no templo."
    ],
    prompt: "Antes de partir, qual preparação ele faz sozinho?",
    choices: [
      { label: "Testar o peso da espada", next: "templeArrival", tone: "calm", effect: { trainingStyle: "Instinto" } },
      { label: "Combinar sinais com o dragão", next: "templeArrival", tone: "gold", effect: { trainingStyle: "Parceria", dragonBond: 4 } },
      { label: "Estudar a entrada pelo túnel", next: "templeArrival", tone: "mystic", effect: { trainingStyle: "Furtivo" } }
    ]
  },
  templeArrival: {
    chapter: "CAPÍTULO VI · O TEMPLO",
    title: "Glicínias negras",
    art: "temple",
    text: [
      "Lanternas apagadas, flores roxas e marcas de garras cobrem o caminho. O ar fica mais frio a cada passo.",
      "Diante do templo, Lucas encontra três entradas. A pedra da bússola pulsa em algum lugar lá dentro.",
      "As glicínias balançavam mesmo sem vento. A cada passo pelos corredores, Lucas via marcas de espadas nas paredes e ouvia sussurros que pareciam repetir pensamentos que nunca havia dito em voz alta."
    ],
    prompt: "Por onde entrar?",
    choices: [
      { label: "Portão principal", next: "shadowOpening", tone: "danger", effect: { shadowApproach: "direto" } },
      { label: "Túnel abaixo das raízes", next: "shadowOpening", tone: "mystic", effect: { shadowApproach: "túnel" } },
      { label: "Passagem sobre as árvores", next: "shadowOpening", tone: "calm", effect: { shadowApproach: "alto" } }
    ]
  },
  shadowOpening: {
    chapter: "BATALHA CONTRA A SOMBRA",
    title: "A máscara rachada",
    art: "temple",
    text: [
      "Uma voz surge na escuridão: “Outro humano procurando aquilo que não lhe pertence…”",
      "Um antigo guerreiro transformado em Sombra aparece segurando a pedra da bússola. Marcas negras percorrem seus braços.",
      "A criatura se moveu sem produzir som. Por trás da máscara rachada, dois olhos cansados observavam Lucas, como se o guerreiro preso ali ainda tentasse pedir ajuda."
    ],
    prompt: "Como Lucas inicia o confronto?",
    choices: [
      { label: "Atacar antes que ela termine de falar", next: "shadowCounter", tone: "danger", effect: { shadowApproach: "ataque" } },
      { label: "Observar sua postura", next: "shadowCounter", tone: "calm", effect: { shadowApproach: "observação" } },
      { label: "Perguntar por que protege a pedra", next: "shadowCounter", tone: "gold", effect: { shadowApproach: "diálogo" } },
      { label: "Mandar o dragão distrair", next: "shadowCounter", tone: "mystic", effect: { shadowApproach: "distração", dragonBond: 4 } }
    ]
  },
  shadowCounter: {
    chapter: "BATALHA · SEGUNDO MOVIMENTO",
    title: "A lâmina encontra resistência",
    art: "temple",
    text: [
      "A Sombra bloqueia o primeiro movimento e lança uma onda escura pelo salão. Lucas é jogado contra uma coluna.",
      "O dragão fica entre ele e a criatura, mas corre perigo. A espada começa a reagir ao estilo escolhido.",
      "A pancada roubou o ar de Lucas, mas ele se levantou antes que a Sombra avançasse novamente. Na lâmina, o reflexo escuro começou a dar lugar a uma luz da cor do estilo escolhido."
    ],
    prompt: "Qual é a prioridade agora?",
    choices: [
      { label: "Proteger o dragão", next: "shadowFinal", tone: "gold", effect: { dragonBond: 5, combatStyle: "proteção" } },
      { label: "Usar o cenário para cercar a Sombra", next: "shadowFinal", tone: "mystic", effect: { combatStyle: "estratégia" } },
      { label: "Continuar atacando sem recuar", next: "shadowFinal", tone: "danger", effect: { combatStyle: "pressão" } },
      { label: "Tentar quebrar a máscara", next: "shadowFinal", tone: "calm", effect: { combatStyle: "precisão" } }
    ]
  },
  shadowFinal: {
    chapter: "BATALHA · DECISÃO FINAL",
    title: "O golpe que encerra a maldição",
    art: "temple",
    text: [
      "A máscara da Sombra começa a rachar. Por um instante, Lucas vê o rosto de um guerreiro cansado, ainda preso dentro da criatura.",
      "A pedra da bússola flutua acima do altar enquanto o templo começa a desmoronar.",
      "O guerreiro ergueu a mão por baixo da máscara, hesitando entre atacar e resistir à própria maldição. Lucas compreendeu que o último golpe definiria mais do que o resultado daquela luta."
    ],
    prompt: "Como terminar o confronto?",
    choices: [
      { label: "Destruir a marca negra, não o guerreiro", next: "guardian", tone: "gold", effect: { captainTrust: 5 } },
      { label: "Usar o golpe do estilo escolhido", next: "guardian", tone: "mystic", effect: { combatStyle: "técnica final" } },
      { label: "Criar uma abertura para o dragão", next: "guardian", tone: "calm", effect: { dragonBond: 5 } }
    ]
  },
  guardian: {
    chapter: "CAPÍTULO VII · O GUARDIÃO",
    title: "Uma batalha sem espadas",
    art: "football",
    text: [
      "Com a pedra recuperada, a Bússola do Destino conduz Lucas até uma clareira cercada por ruínas.",
      "No centro há um campo de futebol antigo, duas traves de pedra e um Guardião mascarado protegendo o único portão de saída.",
      "“Espadas não decidirão esta batalha. Para sair, você deverá provar precisão, coragem e controle.”",
      "A clareira parecia pertencer a outro mundo. Arquibancadas vazias surgiam entre árvores, e antigas bolas de futebol, transformadas em pedra, estavam espalhadas ao redor do campo."
    ],
    prompt: "Como Lucas pretende enfrentar o desafio?",
    choices: [
      { label: "Jogar sozinho e de forma justa", next: "footballPrep", tone: "calm", effect: { guardianHelp: "sozinho" } },
      { label: "Combinar uma jogada com o dragão", next: "footballPrep", tone: "gold", effect: { guardianHelp: "dragão", dragonBond: 5 } },
      { label: "Estudar primeiro os movimentos do goleiro", next: "footballPrep", tone: "mystic", effect: { guardianHelp: "observação" } }
    ]
  },
  footballPrep: {
    chapter: "DESAFIO DO GUARDIÃO",
    title: "A estratégia para os três gols",
    art: "football",
    text: [
      "O Guardião posiciona a bola no centro do campo. Cada chute será uma disputa de leitura e coragem.",
      "Lucas precisa marcar três gols. O dragão observa do lado de fora, pronto para ajudar apenas se for chamado.",
      "Lucas tocou na bola e sentiu uma energia vibrar sob o pé. O Guardião não era apenas rápido: ele parecia antecipar intenções, obrigando Lucas a esconder o canto escolhido até o último instante."
    ],
    prompt: "Escolha a primeira estratégia.",
    choices: [
      { label: "Chute colocado", next: "football", tone: "calm", effect: { guardianHelp: "colocado" } },
      { label: "Chute forte", next: "football", tone: "danger", effect: { guardianHelp: "força" } },
      { label: "Fingir o canto antes de chutar", next: "football", tone: "mystic", effect: { guardianHelp: "finta" } }
    ]
  },
  r1: {
    chapter: "CAPÍTULO VIII · A SAÍDA",
    title: "A máquina escolhida",
    art: "r1",
    text: [
      "Quando o terceiro gol entra, o portão se abre e revela uma estrada iluminada atravessando as montanhas.",
      "Ao lado dela está uma R1 protegida por símbolos mágicos. O capitão surge pela última vez: “A CB 300 trouxe você até esta aventura. Esta máquina o levará para fora dela.”",
      "A Bússola do Destino se transforma em chave. O motor desperta.",
      "A moto era diferente de qualquer máquina comum. Linhas de luz percorriam a carenagem azul e branca, e o painel exibia o mesmo símbolo da bússola, aguardando que Lucas escolhesse partir."
    ],
    prompt: "Antes de partir, o que Lucas confere?",
    choices: [
      { label: "Ajustar a moto e verificar a estrada", next: "roadChoice", tone: "calm" },
      { label: "Colocar o dragão em posição segura", next: "roadChoice", tone: "gold", effect: { dragonBond: 5 } },
      { label: "Acelerar assim que o motor ligar", next: "roadChoice", tone: "danger" }
    ]
  },
  roadChoice: {
    chapter: "A ESTRADA FINAL",
    title: "Velocidade ou atenção",
    art: "r1",
    text: [
      "A estrada desaparece na névoa. O dragão abre as asas e acompanha a R1 pelo alto.",
      "A bússola aponta para uma luz distante, mas o caminho se divide entre uma rota rápida e uma trilha marcada por símbolos roxos.",
      "Ao olhar para trás, Lucas viu a floresta fechando o portão lentamente. Não havia mais retorno; dali em diante, cada curva o aproximaria do mundo conhecido — ou do último segredo daquela aventura."
    ],
    prompt: "Qual caminho Lucas escolhe?",
    choices: [
      { label: "Acelerar e confiar na bússola", next: "fastObstacle", tone: "danger", effect: { finalRoad: "rápida" } },
      { label: "Seguir devagar e observar as pistas", next: "slowClue", tone: "calm", effect: { finalRoad: "pistas" } },
      { label: "Deixar o dragão escolher pelo alto", next: "slowClue", tone: "mystic", effect: { finalRoad: "dragão", dragonBond: 5 } }
    ]
  },
  fastObstacle: {
    chapter: "ROTA DA VELOCIDADE",
    title: "A ponte quebrada",
    art: "r1",
    text: [
      "A R1 corta a névoa em alta velocidade. De repente, Lucas vê uma ponte parcialmente destruída sobre um desfiladeiro.",
      "Não há tempo para voltar. O dragão voa ao lado, esperando uma decisão.",
      "O vento pressionava seu corpo contra a moto, e as luzes mágicas da estrada passavam como riscos ao redor. Lucas precisava confiar nos reflexos, na máquina e no companheiro que voava ao seu lado."
    ],
    prompt: "Como atravessar?",
    choices: [
      { label: "Acelerar e saltar", next: "treasure", tone: "danger" },
      { label: "Usar uma rampa lateral", next: "treasure", tone: "mystic" },
      { label: "Pedir que o dragão ilumine a passagem", next: "treasure", tone: "gold", effect: { dragonBond: 5 } }
    ]
  },
  slowClue: {
    chapter: "ROTA DAS PISTAS",
    title: "Marcas deixadas para Lucas",
    art: "r1",
    text: [
      "Lucas segue com cuidado e encontra símbolos roxos gravados nas pedras. Cada marca parece ter sido colocada por alguém que sabia que ele passaria ali.",
      "Em uma bifurcação, três sinais aparecem: um coração, uma estrela e uma seta quase apagada.",
      "As marcas não pareciam antigas. Algumas pétalas roxas ainda estavam frescas sobre as pedras, como se alguém tivesse passado por ali poucas horas antes e preparado o caminho especialmente para ele."
    ],
    prompt: "Qual símbolo seguir?",
    choices: [
      { label: "Seguir o coração", next: "treasure", tone: "gold" },
      { label: "Seguir a estrela", next: "treasure", tone: "mystic" },
      { label: "Seguir a seta escondida", next: "treasure", tone: "calm" }
    ]
  }
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function SceneVisual({ art, title, dragonName }: { art: ArtType; title: string; dragonName: string }) {
  const visuals: Record<ArtType, { icon: string; kicker: string; src: string; note: string; alt: string }> = {
    home: { icon: "⌂", kicker: "NOITE NA CIDADE", src: "/assets/fase-casa-cidade.png", note: "O começo da aventura antes da floresta.", alt: "Lucas em casa ao lado da moto vermelha durante a noite." },
    road: { icon: "➶", kicker: "BR · MADRUGADA", src: "/assets/fase-casa-cidade.png", note: "A volta de moto que muda tudo.", alt: "Lucas em casa ao lado da moto vermelha durante a noite." },
    crash: { icon: "✧", kicker: "ACIDENTE NA FLORESTA", src: "/assets/fase-acidente-floresta.png", note: "O instante em que Lucas percebe que está sozinho na mata.", alt: "Lucas ferido ajoelhado na floresta ao lado da CB 300 caída." },
    forest: { icon: "♧", kicker: "FLORESTA DESCONHECIDA", src: "/assets/fase-acidente-floresta.png", note: "A floresta esconde trilhas, plantas e mistérios.", alt: "Lucas ferido ajoelhado na floresta ao lado da CB 300 caída." },
    camp: { icon: "⚔", kicker: "ACAMPAMENTO ABANDONADO", src: "/assets/fase-acidente-floresta.png", note: "Entre restos esquecidos, uma nova pista aparece.", alt: "Lucas ferido ajoelhado na floresta ao lado da CB 300 caída." },
    dragon: { icon: "◇", kicker: dragonName ? `${dragonName.toUpperCase()} · COMPANHEIRO` : "UM NOVO COMPANHEIRO", src: "/assets/fase-dragao-nascimento.png", note: "O nascimento do vínculo mais importante da jornada.", alt: "Lucas ajoelhado diante de um pequeno dragão recém-nascido na floresta." },
    pirates: { icon: "⚓", kicker: "NASCENTE DOS PIRATAS", src: "/assets/fase-piratas-escondido.png", note: "Água, perigo e escolhas que podem virar batalha.", alt: "Lucas escondido observando um acampamento pirata na floresta com o dragão ao lado." },
    ship: { icon: "☸", kicker: "NAVIO DO CAPITÃO", src: "/assets/fase-piratas-escondido.png", note: "Depois da luta, o capitão revela uma rota maior que a floresta.", alt: "Lucas escondido observando um acampamento pirata na floresta com o dragão ao lado." },
    training: { icon: "⚔", kicker: "TREINAMENTO DO CAÇADOR", src: "/assets/fase-templo-espada.png", note: "A espada e o templo preparam Lucas para a batalha final.", alt: "Lucas segurando uma espada luminosa diante do templo ao lado do dragão." },
    temple: { icon: "✦", kicker: "GLICÍNIAS NEGRAS", src: "/assets/fase-templo-espada.png", note: "O templo guarda a sombra, a espada e a decisão mais difícil.", alt: "Lucas segurando uma espada luminosa diante do templo ao lado do dragão." },
    football: { icon: "⚽", kicker: "CAMPO DO GUARDIÃO", src: "/assets/fase-futebol-guardiao.png", note: "Uma batalha decidida com leitura, calma e precisão.", alt: "Lucas preparando um chute em um campo antigo enquanto um guardião protege o gol." },
    r1: { icon: "➤", kicker: "ESTRADA DA SAÍDA", src: "/assets/fase-r1-saida.png", note: "A última corrida leva Lucas para fora da floresta.", alt: "Lucas pilotando uma moto R1 azul em uma estrada mágica ao lado de um dragão." },
    treasure: { icon: "◆", kicker: "TESOURO FINAL", src: "/assets/fase-tesouro-final.png", note: "A aventura termina onde o presente finalmente se revela.", alt: "Lucas abrindo um baú iluminado cercado por tesouros com o dragão ao lado." }
  };
  const data = visuals[art];
  return (
    <div className={`scene-visual visual-${art}`}>
      <img className="scene-image" src={data.src} alt={data.alt} />
      <div className="scene-image-overlay" />
      <div className="visual-fog" />
      <div className="visual-symbol">{data.icon}</div>
      <div className="visual-caption">
        <span>{data.kicker}</span>
        <strong>{title}</strong>
        <small>{data.note}</small>
      </div>
    </div>
  );
}

function AdventureMap({ scene }: { scene: SceneId }) {
  const active = chapterOrder[scene] ?? 0;
  return (
    <div className="adventure-map" aria-label="Mapa da aventura">
      <div className="map-line"><i style={{ width: `${(active / 7) * 100}%` }} /></div>
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className={`map-node ${index < active ? "done" : ""} ${index === active ? "active" : ""}`}>
          <b>{chapter.icon}</b>
          <span>{chapter.label}</span>
        </div>
      ))}
    </div>
  );
}


function consequenceText(scene: SceneId, flags: GameFlags, dragonName: string) {
  const companion = dragonName || "o pequeno dragão";
  const lines: string[] = [];

  if (["crashReaction", "forestChoice", "exploreApproach", "healSearch"].includes(scene)) {
    if (flags.crashInstinct === "freou") lines.push("A frenagem reduziu parte do impacto, mas deixou o pulso de Lucas dolorido. Ele precisará evitar movimentos bruscos com a espada.");
    if (flags.crashInstinct === "desviou") lines.push("Ao desviar, Lucas caiu mais fundo na mata. Em compensação, percebe marcas de pneus que poderão ajudá-lo a reconhecer a direção da estrada mais tarde.");
    if (flags.crashInstinct === "se protegeu") lines.push("Por ter protegido a cabeça, Lucas consegue pensar com clareza, embora a moto tenha sido arremessada para mais longe entre as árvores.");
  }

  if (["waterTrail", "pirateChoice", "stealWater", "talkPirates", "pirateFightStart"].includes(scene)) {
    if (flags.forestPath === "curar") lines.push("A experiência com as plantas permite que Lucas reconheça folhas adormecedoras perto da nascente. Elas podem virar uma distração sem ferir ninguém.");
    if (flags.forestPath === "explorar") lines.push("A espada encontrada no acampamento reage à presença dos piratas. Lucas percebe que poderá cortar cordas e usar o terreno em vez de depender apenas da força.");
    if (flags.eggDecision === "acolheu" || flags.dragonBond >= 4) lines.push(`${companion} permanece colado à perna de Lucas e responde aos sinais dele sem hesitar. O vínculo entre os dois já começa a mudar a forma como enfrentam o perigo.`);
  }

  if (["captain", "ship", "trainingChoice", "trainingStyle", "trainingTrial", "refuseTraining"].includes(scene)) {
    if (flags.pirateApproach === "diplomacia") lines.push("O capitão soube que Lucas tentou conversar antes da luta. Por isso, sua desconfiança dá lugar a uma curiosidade respeitosa.");
    if (flags.pirateApproach === "furtivo") lines.push("O capitão não esqueceu que Lucas entrou escondido no acampamento. Ele oferece ajuda, mas mantém a bússola longe do alcance das mãos dele.");
    if (flags.combatStyle === "parceria" || flags.combatStyle === "proteção") lines.push(`A maneira como Lucas protegeu ${companion} impressionou o capitão. Para ele, isso vale mais do que qualquer golpe bonito.`);
  }

  if (["templeArrival", "shadowOpening", "shadowCounter", "shadowFinal"].includes(scene)) {
    if (flags.trainingStyle === "Tempestade") lines.push("A Respiração da Tempestade acelera os reflexos de Lucas. Ele pode atravessar ataques antes que a Sombra complete o movimento.");
    if (flags.trainingStyle === "Chamas") lines.push(`A Respiração das Chamas envolve a espada com calor e cria uma proteção ao redor de ${companion}.`);
    if (flags.trainingStyle === "Sombras" || flags.trainingStyle === "Furtivo") lines.push("O treinamento furtivo revela rachaduras nas paredes e passagens que a Sombra não consegue vigiar ao mesmo tempo.");
    if (flags.trainingStyle === "Marés") lines.push("A Respiração das Marés ajuda Lucas a perceber o ritmo da criatura e esperar o instante exato para contra-atacar.");
    if (flags.trainingStyle === "Parceria") lines.push(`Sem uma técnica tradicional, Lucas e ${companion} criaram sinais próprios. O golpe conjunto só existe por causa das decisões tomadas desde o nascimento do filhote.`);
    if (flags.trainingChoice === "recusou") lines.push("Por ter recusado o treinamento, Lucas não consegue ferir a Sombra com força bruta. Ele terá de vencer usando observação, diálogo ou a ajuda do companheiro.");
  }

  if (["guardian", "footballPrep", "football"].includes(scene)) {
    if (flags.shadowApproach === "diálogo") lines.push("Ao poupar tempo para ouvir a Sombra, Lucas recebeu uma pista: o Guardião sempre olha para o lado oposto antes de saltar.");
    if (flags.combatStyle === "proteção") lines.push(`O Guardião reconhece o instinto protetor de Lucas e permite que ${companion} participe de uma das jogadas.`);
    if (flags.combatStyle === "pressão") lines.push("O esforço excessivo no templo deixou a perna de Lucas pesada. Chutes fortes serão poderosos, mas menos precisos.");
  }

  if (["r1", "roadChoice", "fastObstacle", "slowClue", "treasure"].includes(scene)) {
    if (flags.dragonBond >= 5) lines.push(`${companion} não segue Lucas apenas por instinto. Ele escolheu permanecer ao lado dele e será essencial para atravessar o último caminho.`);
    if (flags.captainTrust >= 4) lines.push("Antes de se despedir, o capitão revela uma rota segura escondida no mapa. A confiança conquistada durante a aventura finalmente produz uma vantagem real.");
    if (flags.captainTrust <= 1 && flags.pirateApproach) lines.push("O capitão cumpriu o acordo, mas não revelou todos os perigos da estrada. Lucas terá de descobrir sozinho o que existe além da névoa.");
  }

  return lines;
}

function extraChoices(scene: SceneId, flags: GameFlags, dragonName: string): Choice[] {
  const companion = dragonName || "o pequeno dragão";
  if (scene === "pirateChoice" && flags.forestPath === "curar") {
    return [{ label: "Usar as plantas para criar uma distração", next: "stealWater", tone: "mystic", effect: { pirateApproach: "ervas", captainTrust: 2 }, note: "Disponível porque Lucas cuidou dos ferimentos e aprendeu sobre as plantas." }];
  }
  if (scene === "pirateFightStart" && flags.forestPath === "explorar") {
    return [{ label: "Cortar as cordas com a espada encontrada", next: "pirateFightMove", tone: "gold", effect: { combatStyle: "armadilha", captainTrust: 3 }, note: "A espada do acampamento abre um caminho diferente na batalha." }];
  }
  if (scene === "shadowOpening" && flags.trainingStyle === "Sombras") {
    return [{ label: "Desaparecer entre as lanternas apagadas", next: "shadowCounter", tone: "mystic", effect: { shadowApproach: "técnica das sombras", combatStyle: "furtividade" }, note: "Escolha exclusiva do treinamento de Sombras." }];
  }
  if (scene === "shadowOpening" && flags.trainingStyle === "Tempestade") {
    return [{ label: "Avançar antes do primeiro piscar", next: "shadowCounter", tone: "mystic", effect: { shadowApproach: "tempestade", combatStyle: "velocidade" }, note: "Escolha exclusiva da Respiração da Tempestade." }];
  }
  if (scene === "shadowCounter" && flags.trainingStyle === "Chamas") {
    return [{ label: `Criar um círculo de fogo para proteger ${companion}`, next: "shadowFinal", tone: "danger", effect: { combatStyle: "barreira de chamas", dragonBond: 5 }, note: "Escolha exclusiva da Respiração das Chamas." }];
  }
  if (scene === "shadowCounter" && flags.trainingStyle === "Marés") {
    return [{ label: "Esperar o ritmo da onda escura e contra-atacar", next: "shadowFinal", tone: "calm", effect: { combatStyle: "contra-ataque das marés" }, note: "Escolha exclusiva da Respiração das Marés." }];
  }
  if (scene === "shadowFinal" && flags.trainingChoice === "recusou") {
    return [{ label: `Usar o sinal secreto criado com ${companion}`, next: "guardian", tone: "gold", effect: { combatStyle: "golpe conjunto", dragonBond: 5 }, note: "Final exclusivo de quem recusou o treinamento e confiou na parceria." }];
  }
  if (scene === "guardian" && flags.shadowApproach === "diálogo") {
    return [{ label: "Usar a pista deixada pelo guerreiro libertado", next: "footballPrep", tone: "gold", effect: { guardianHelp: "pista da sombra" }, note: "A conversa no templo revelou o movimento do Guardião." }];
  }
  if (scene === "roadChoice" && flags.captainTrust >= 4) {
    return [{ label: "Seguir a rota secreta revelada pelo capitão", next: "slowClue", tone: "gold", effect: { finalRoad: "rota secreta" }, note: "A confiança conquistada desbloqueou este caminho." }];
  }
  return [];
}

function destinyProfile(flags: GameFlags) {
  if (flags.dragonBond >= 5 && ["proteção", "parceria", "golpe conjunto", "barreira de chamas"].includes(flags.combatStyle)) return "Protetor do Dragão";
  if (flags.captainTrust >= 4 && ["diplomacia", "ervas"].includes(flags.pirateApproach)) return "Herói Diplomático";
  if (["estratégia", "ambiente", "armadilha", "precisão", "contra-ataque das marés"].includes(flags.combatStyle)) return "Caçador Estratégico";
  if (["agressivo", "pressão", "duelo"].includes(flags.combatStyle)) return "Guerreiro Impulsivo";
  return "Aventureiro Leal";
}

export default function GamePage() {
  const [scene, setScene] = useState<SceneId>("title");
  const [flags, setFlags] = useState<GameFlags>(initialFlags);
  const [dragonName, setDragonName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [nameError, setNameError] = useState("");
  const [goals, setGoals] = useState(0);
  const [keeperSide, setKeeperSide] = useState<"esquerda" | "centro" | "direita">("centro");
  const [message, setMessage] = useState("Escolha um canto para chutar.");
  const [answer, setAnswer] = useState("");
  const [finalError, setFinalError] = useState("");
  const [history, setHistory] = useState<SceneId[]>([]);

  useEffect(() => {
    const savedName = localStorage.getItem("lucas-rpg-dragon");
    if (savedName && savedName.trim().toLowerCase() !== "draco") setDragonName(savedName);
  }, []);

  const current = useMemo(() => scenes[scene], [scene]);

  function go(next: SceneId, effect?: Partial<GameFlags>) {
    setHistory((value) => [...value, scene]);
    if (effect) setFlags((value) => ({ ...value, ...effect, dragonBond: Math.max(value.dragonBond, effect.dragonBond ?? value.dragonBond), captainTrust: Math.max(value.captainTrust, effect.captainTrust ?? value.captainTrust) }));
    setScene(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    const previous = history.at(-1);
    if (!previous) return;
    setHistory((value) => value.slice(0, -1));
    setScene(previous);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setScene("title");
    setFlags(initialFlags);
    setGoals(0);
    setMessage("Escolha um canto para chutar.");
    setAnswer("");
    setHistory([]);
  }

  function saveDragonName() {
    const clean = draftName.trim();
    if (!clean) {
      setNameError("Escolha um nome para o pequeno dragão antes de continuar.");
      return;
    }
    setNameError("");
    setDragonName(clean);
    localStorage.setItem("lucas-rpg-dragon", clean);
    go("waterTrail");
  }

  function personalizeStory(text: string) {
    if (!dragonName) return text;
    return text
      .replaceAll("Com o dragão", `Com ${dragonName}`)
      .replaceAll("com o dragão", `com ${dragonName}`)
      .replaceAll("Para o dragão", `Para ${dragonName}`)
      .replaceAll("para o dragão", `para ${dragonName}`)
      .replaceAll("Do dragão", `De ${dragonName}`)
      .replaceAll("do dragão", `de ${dragonName}`)
      .replaceAll("Ao dragão", `A ${dragonName}`)
      .replaceAll("ao dragão", `a ${dragonName}`)
      .replaceAll("O dragão", dragonName)
      .replaceAll("o dragão", dragonName);
  }

  function shoot(side: "esquerda" | "centro" | "direita") {
    const sides = ["esquerda", "centro", "direita"] as const;
    const keeper = sides[Math.floor(Math.random() * sides.length)];
    setKeeperSide(keeper);
    const bonus = flags.guardianHelp === "observação" || flags.guardianHelp === "finta";
    const goal = side !== keeper || (bonus && Math.random() > 0.45);
    if (goal) {
      const nextGoals = goals + 1;
      setGoals(nextGoals);
      setMessage(`GOL! O Guardião saltou para ${keeper}.`);
      if (nextGoals >= 3) setTimeout(() => go("r1"), 850);
    } else {
      setMessage(`Defesa do Guardião no ${keeper}. Tente uma nova leitura.`);
    }
  }

  function unlockTreasure() {
    if (normalize(answer) === normalize(FINAL_ANSWER)) {
      setFinalError("");
      go("final");
    } else {
      setFinalError("Pense no começo de tudo…");
    }
  }

  if (scene === "title") {
    return (
      <main className="intro-shell">
        <section className="intro-frame">
          <nav className="intro-nav">
            <span className="brand-mark">✦</span>
            <div className="intro-nav-links"><span className="active">Início</span><span>História</span><span>Escolhas</span><span>Tesouro</span></div>
            <button className="nav-start" onClick={() => go("message")}>Iniciar jornada</button>
          </nav>
          <div className="intro-content">
            <div className="intro-copy">
              <p className="eyebrow">UMA AVENTURA DE ESCOLHAS</p>
              <h1><span>Lucas</span> e o Tesouro Final</h1>
              <p className="intro-description">Uma volta de moto se transforma em uma jornada por uma floresta amaldiçoada. Cada decisão revela um novo caminho.</p>
              <button className="intro-button" onClick={() => go("message")}><span>✦</span> Iniciar jornada <span>✦</span></button>
              <div className="intro-features">
                <div><strong>⚔</strong><span>Mais decisões durante toda a história</span></div>
                <div><strong>☾</strong><span>Caminhos que mudam diálogos e vantagens</span></div>
                <div><strong>◆</strong><span>Um presente protegido pelo tesouro final</span></div>
              </div>
            </div>
            <div className="intro-visual"><div className="hero-anime"><div className="hero-moon"/><div className="hero-fireflies"/></div></div>
          </div>
          <div className="intro-bottom-ornament">♡</div>
        </section>
      </main>
    );
  }

  if (scene === "dragonName") {
    return (
      <main className="game-shell"><AdventureMap scene={scene}/><section className="game-stage single-stage">
        <SceneVisual art="dragon" title="Um nome para o companheiro" dragonName="" />
        <div className="story-panel centered-panel"><p className="eyebrow">CAPÍTULO III · UM NOVO COMPANHEIRO</p><h1>Como Lucas deseja chamar o dragão?</h1><p className="lead">O nome escolhido aparecerá nos diálogos e acompanhará Lucas até o final.</p>
          <input className="text-input" value={draftName} onChange={(e) => { setDraftName(e.target.value); if (nameError) setNameError(""); }} placeholder="Digite o nome do dragão" maxLength={24} autoFocus/>
          {nameError && <p className="error-text">{nameError}</p>}
          <button className="primary-button" onClick={saveDragonName}>Confirmar nome</button>
        </div>
      </section><GameControls back={back} restart={restart} canBack={history.length>0}/></main>
    );
  }

  if (scene === "football") {
    return (
      <main className="game-shell"><AdventureMap scene={scene}/><section className="game-stage single-stage">
        <SceneVisual art="football" title="Três gols para abrir o portão" dragonName={dragonName}/>
        <div className="story-panel centered-panel football-scene"><p className="eyebrow">DESAFIO DO GUARDIÃO</p><h1>Marque três gols</h1><p className="lead">A estratégia escolhida antes do jogo pode facilitar a leitura do goleiro.</p>
          <div className="scoreboard"><span>Lucas</span><strong>{goals}/3</strong><span>Guardião: {keeperSide}</span></div>
          <div className="goal"><div className={`keeper keeper-${keeperSide}`}>◆</div><div className="net"/></div>
          <div className="shoot-buttons"><button onClick={() => shoot("esquerda")}>Esquerda</button><button onClick={() => shoot("centro")}>Centro</button><button onClick={() => shoot("direita")}>Direita</button></div>
          <p className="feedback">{message}</p>
        </div>
      </section><GameControls back={back} restart={restart} canBack={history.length>0}/></main>
    );
  }

  if (scene === "treasure") {
    return (
      <main className="game-shell"><AdventureMap scene={scene}/><section className="game-stage single-stage">
        <SceneVisual art="treasure" title="A última barreira" dragonName={dragonName}/>
        <div className="story-panel centered-panel"><p className="eyebrow">TESOURO FINAL</p><h1>Diga a primeira coisa que você me mandou</h1><p className="lead">A resposta correta desbloqueará o seu presente.</p>
          <input className="text-input" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Digite sua resposta"/>
          {finalError && <p className="error-text">{finalError}</p>}
          <button className="primary-button" onClick={unlockTreasure}>Desbloquear presente</button>
        </div>
      </section><GameControls back={back} restart={restart} canBack={history.length>0}/></main>
    );
  }

  if (scene === "final") {
    const profile = destinyProfile(flags);
    return (
      <main className="game-shell"><AdventureMap scene={scene}/><section className="game-stage final-stage"><div className="final-card">
        <div className="chest-open">✦ ◆ ✦</div><p className="eyebrow">FIM DA JORNADA</p><h1>Obrigada por viver essa história comigo ❤️</h1>
        <p>Espero que você tenha gostado, mesmo eu tendo improvisado esse RPG do meu jeitinho kkkkk.</p>
        <p>Fiz cada parte com muito carinho, pensando em você, nas coisas que você gosta e em tudo que vivemos juntos.</p>
        <div className="destiny-result"><span>O destino construído por Lucas</span><strong>{profile}</strong><small>As escolhas feitas durante a aventura formaram este caminho.</small></div>
        <p><strong>Eu te amo, vida. ❤️</strong></p>
        <small>Com amor, Giselle.</small>
      </div></section><GameControls back={back} restart={restart} canBack={false}/></main>
    );
  }

  if (!current) return null;

  const dynamicSummary = [
    flags.trainingStyle && `Estilo: ${flags.trainingStyle}`,
    dragonName && `Companheiro: ${dragonName}`,
    flags.dragonBond >= 4 && "Vínculo forte",
    flags.captainTrust >= 4 && "Confiança do capitão"
  ].filter((item): item is string => Boolean(item));

  return (
    <main className={`game-shell scene-${current.art}`}>
      <AdventureMap scene={scene}/>
      <section className="game-stage">
        <SceneVisual art={current.art} title={current.title} dragonName={dragonName}/>
        <div className="story-panel">
          <div className="story-header"><div><p className="eyebrow">{current.chapter}</p><h1>{current.title}</h1></div>{dynamicSummary.length>0 && <div className="status-pills">{dynamicSummary.map(x=><span key={x}>{x}</span>)}</div>}</div>
          <div className="story-copy">
            {current.text.map((p,i)=><p key={`${scene}-${i}`}>{personalizeStory(p)}</p>)}
            {consequenceText(scene, flags, dragonName).map((p,i)=><p className="consequence-paragraph" key={`consequence-${scene}-${i}`}><strong>Consequência da jornada:</strong> {p}</p>)}
          </div>
          {current.prompt && <div className="decision-prompt"><span>DECISÃO</span><strong>{current.prompt}</strong></div>}
          <div className="choices">{[...current.choices, ...extraChoices(scene, flags, dragonName)].map((choice,index)=><button key={`${choice.label}-${index}`} className={`choice-button ${choice.tone?`choice-${choice.tone}`:""}`} onClick={()=>go(choice.next,choice.effect)}><b>{String(index+1).padStart(2,"0")}</b><span>{choice.label}{choice.note && <small>{choice.note}</small>}</span><i>›</i></button>)}</div>
        </div>
      </section>
      <GameControls back={back} restart={restart} canBack={history.length>0}/>
    </main>
  );
}

function GameControls({ back, restart, canBack }: { back:()=>void; restart:()=>void; canBack:boolean }) {
  return <div className="game-controls">{canBack && <button onClick={back}>← Voltar</button>}<button onClick={restart}>Recomeçar</button></div>;
}
