"use client";

import { useEffect, useMemo, useState } from "react";

type SceneId =
  | "title"
  | "crash"
  | "forestChoice"
  | "forestExplore"
  | "heal"
  | "dragonName"
  | "piratesIntro"
  | "pirateChoice"
  | "stealWater"
  | "befriend"
  | "pirateFight"
  | "captain"
  | "ship"
  | "trainingChoice"
  | "training"
  | "refuseTraining"
  | "temple"
  | "shadowChoice"
  | "shadowResult"
  | "guardian"
  | "football"
  | "r1"
  | "roadChoice"
  | "fastRoad"
  | "slowRoad"
  | "treasure"
  | "final";

type Choice = { label: string; next: SceneId; tone?: "danger" | "calm" | "mystic" };

type Scene = {
  title?: string;
  eyebrow?: string;
  text: string[];
  choices?: Choice[];
  art?: "road" | "forest" | "dragon" | "pirates" | "temple" | "football" | "r1" | "treasure";
};

const FINAL_ANSWER = "tinha que ser homis kskks";

const scenes: Record<Exclude<SceneId, "dragonName" | "football" | "treasure" | "final">, Scene> = {
  title: {
    eyebrow: "UM RPG DE ESCOLHAS",
    title: "Lucas e o Tesouro Final",
    text: ["Uma estrada. Uma floresta. Um dragão. E escolhas que mudam o caminho."],
    choices: [{ label: "Iniciar jornada", next: "crash", tone: "mystic" }],
    art: "road"
  },
  crash: {
    eyebrow: "PRÓLOGO",
    title: "A estrada interrompida",
    text: [
      "Lucas seguia pela BR em sua CB 300 vermelha quando uma sombra atravessou a pista.",
      "O guidão virou, os pneus perderam o contato com o asfalto e, por alguns segundos, tudo virou barulho, luz e silêncio.",
      "Quando abriu os olhos, estava ferido no meio de uma floresta desconhecida. A moto estava caída e ninguém respondeu aos seus gritos."
    ],
    choices: [{ label: "Levantar-se", next: "forestChoice" }],
    art: "road"
  },
  forestChoice: {
    eyebrow: "PRIMEIRA ESCOLHA",
    title: "Sobreviver vem primeiro",
    text: ["A barriga sangra, a cabeça dói e a floresta parece observar cada movimento."],
    choices: [
      { label: "Explorar a floresta", next: "forestExplore", tone: "mystic" },
      { label: "Cuidar dos ferimentos", next: "heal", tone: "calm" }
    ],
    art: "forest"
  },
  forestExplore: {
    eyebrow: "CAMINHO DA CURIOSIDADE",
    title: "A espada esquecida",
    text: [
      "Lucas encontra os restos de um acampamento antigo. Sob folhas e madeira apodrecida, uma espada ainda afiada espera por alguém.",
      "Com fome, ele a usa para cortar frutas. Ao alcançar um galho mais alto, algo enorme despenca sobre sua cabeça.",
      "Quando acorda, percebe que não era uma fruta: era um ovo gigantesco. Ele o leva até a CB 300.",
      "A casca treme. Rachaduras brilham por dentro. Um pequeno dragão rompe o ovo, tropeça até Lucas e encosta a cabeça em sua perna."
    ],
    choices: [{ label: "Acolher a criatura", next: "dragonName", tone: "mystic" }],
    art: "dragon"
  },
  heal: {
    eyebrow: "CAMINHO DA PRUDÊNCIA",
    title: "A planta do sono",
    text: [
      "Lucas encontra uma planta de folhas espessas e a coloca sobre o ferimento. O sangue diminui, mas seus olhos ficam pesados.",
      "A planta também é um poderoso sonífero.",
      "Ele desperta com o rosto molhado. Um pequeno dragão o lambe e observa cada reação, como se já tivesse decidido acompanhá-lo.",
      "Com dificuldade, Lucas volta até a CB 300. A criatura segue logo atrás."
    ],
    choices: [{ label: "Dar atenção ao dragão", next: "dragonName", tone: "mystic" }],
    art: "dragon"
  },
  piratesIntro: {
    eyebrow: "O SOM DA ÁGUA",
    title: "Vozes além das árvores",
    text: [
      "Depois de descansar, Lucas e seu novo companheiro escutam água correndo.",
      "Ao se aproximarem, ouvem vozes: “Apressem-se com os barris!” e “O capitão quer tudo pronto antes do pôr do sol!”",
      "Atrás das pedras existe um acampamento pirata construído ao redor de uma nascente."
    ],
    choices: [{ label: "Observar o acampamento", next: "pirateChoice" }],
    art: "pirates"
  },
  pirateChoice: {
    eyebrow: "SEGUNDA ESCOLHA",
    title: "Água ou confiança",
    text: ["Lucas precisa de água, mas os piratas parecem pouco amigáveis."],
    choices: [
      { label: "Tentar pegar água escondido", next: "stealWater", tone: "danger" },
      { label: "Tentar fazer amizade", next: "befriend", tone: "calm" }
    ],
    art: "pirates"
  },
  stealWater: {
    title: "O barulho da caneca",
    text: [
      "Lucas alcança um barril enquanto os piratas se distraem. O dragão esbarra em uma caneca de metal.",
      "O som ecoa pelo acampamento. “Peguem o invasor!”",
      "Ao verem a espada, os piratas concluem que Lucas veio roubar muito mais que água."
    ],
    choices: [{ label: "Sacar a espada", next: "pirateFight", tone: "danger" }],
    art: "pirates"
  },
  befriend: {
    title: "Um pedido que termina em fogo",
    text: [
      "Lucas sai com as mãos erguidas e pede apenas água.",
      "Um pirata ri do “lagarto de estimação” e tenta puxá-lo pela cauda.",
      "O dragão rosna e queima a ponta do chapéu dele. Os demais entendem aquilo como ameaça."
    ],
    choices: [{ label: "Proteger o dragão", next: "pirateFight", tone: "danger" }],
    art: "pirates"
  },
  pirateFight: {
    eyebrow: "BATALHA",
    title: "Espada e fogo",
    text: [
      "Lucas avança com a espada enquanto o dragão corta o ar com garras e pequenas rajadas de fogo.",
      "Quando o último pirata cai, apenas o capitão permanece de pé, observando tudo de longe."
    ],
    choices: [{ label: "Encarar o capitão", next: "captain" }],
    art: "pirates"
  },
  captain: {
    title: "O homem que aplaudiu",
    text: [
      "O capitão se aproxima batendo palmas devagar.",
      "“Que bela luta, meninos. E que animal habilidoso você tem, Lucas.”",
      "“Isso pode ser coragem… ou completa falta de juízo. Venham comigo. Existe algo em meu navio que pode ajudá-los a sair desta floresta.”"
    ],
    choices: [{ label: "Seguir o capitão", next: "ship" }],
    art: "pirates"
  },
  ship: {
    eyebrow: "A MALDIÇÃO DA FLORESTA",
    title: "A Bússola do Destino",
    text: [
      "Na cabine há mapas, moedas e uma espada negra presa à parede.",
      "O capitão mostra uma bússola quebrada: “Quando o sol desaparece, as Sombras despertam.”",
      "A pedra da bússola foi roubada por uma criatura e levada ao Templo das Glicínias Negras.",
      "Ao observar a espada de Lucas, ele completa: “Essa arma pertenceu a um antigo Caçador.”"
    ],
    choices: [{ label: "Ouvir a proposta", next: "trainingChoice" }],
    art: "temple"
  },
  trainingChoice: {
    eyebrow: "TERCEIRA ESCOLHA",
    title: "Força ou disciplina",
    text: ["O capitão oferece treinamento antes da ida ao templo."],
    choices: [
      { label: "Aceitar o treinamento", next: "training", tone: "mystic" },
      { label: "Confiar na própria força", next: "refuseTraining", tone: "danger" }
    ],
    art: "temple"
  },
  training: {
    title: "O estilo do Caçador",
    text: [
      "A espada reage à respiração e às emoções de Lucas.",
      "Ele aprende um estilo próprio, combinando velocidade, precisão e proteção ao dragão.",
      "Quando a lâmina desperta, um brilho azul percorre seu fio."
    ],
    choices: [{ label: "Partir para o templo", next: "temple" }],
    art: "temple"
  },
  refuseTraining: {
    title: "Coragem sem controle",
    text: [
      "“Eu só preciso saber onde está a bússola.”",
      "O capitão entrega o mapa: “Coragem sem controle costuma terminar em túmulo.”",
      "Sem dominar a espada, Lucas dependerá ainda mais do dragão."
    ],
    choices: [{ label: "Partir para o templo", next: "temple" }],
    art: "temple"
  },
  temple: {
    eyebrow: "TEMPLO DAS GLICÍNIAS NEGRAS",
    title: "A Sombra mascarada",
    text: [
      "Lanternas apagadas, flores roxas e marcas de garras cobrem o templo.",
      "Uma voz surge: “Outro humano procurando aquilo que não lhe pertence…”",
      "Um antigo guerreiro transformado em Sombra aparece com a pedra da bússola nas mãos."
    ],
    choices: [{ label: "Preparar-se", next: "shadowChoice" }],
    art: "temple"
  },
  shadowChoice: {
    eyebrow: "QUARTA ESCOLHA",
    title: "Como enfrentar a Sombra?",
    text: ["Cada decisão muda a forma da batalha."],
    choices: [
      { label: "Atacar imediatamente", next: "shadowResult", tone: "danger" },
      { label: "Observar seus movimentos", next: "shadowResult", tone: "calm" },
      { label: "Mandar o dragão distraí-la", next: "shadowResult", tone: "mystic" },
      { label: "Perguntar por que protege a pedra", next: "shadowResult" }
    ],
    art: "temple"
  },
  shadowResult: {
    title: "A pedra recuperada",
    text: [
      "A escolha de Lucas muda o ritmo do confronto, mas a parceria entre espada e dragão decide o desfecho.",
      "A Sombra cai. A pedra da Bússola do Destino volta a brilhar.",
      "No navio, o capitão conserta a bússola e entrega a Lucas uma Máscara de Caçador."
    ],
    choices: [{ label: "Seguir a bússola", next: "guardian" }],
    art: "temple"
  },
  guardian: {
    eyebrow: "O GUARDIÃO DA SAÍDA",
    title: "Uma batalha sem espadas",
    text: [
      "A bússola conduz Lucas a uma clareira com duas traves de pedra.",
      "Um Guardião mascarado protege o portão e faz surgir uma bola envolvida por energia.",
      "“Para deixar a floresta, você deverá provar precisão, coragem e controle.”"
    ],
    choices: [{ label: "Aceitar o desafio", next: "football" }],
    art: "football"
  },
  r1: {
    eyebrow: "A ESTRADA FINAL",
    title: "A máquina escolhida",
    text: [
      "O portão se abre. Do outro lado, uma R1 aguarda sob símbolos mágicos.",
      "O capitão surge pela última vez: “A CB 300 trouxe você até esta aventura. Esta máquina o levará para fora dela.”",
      "A Bússola do Destino se transforma em chave. O motor desperta."
    ],
    choices: [{ label: "Subir na R1", next: "roadChoice", tone: "mystic" }],
    art: "r1"
  },
  roadChoice: {
    eyebrow: "ÚLTIMA ESCOLHA",
    title: "Velocidade ou atenção",
    text: ["O dragão abre as asas. A estrada atravessa as montanhas e desaparece na névoa."],
    choices: [
      { label: "Acelerar e confiar na bússola", next: "fastRoad", tone: "danger" },
      { label: "Seguir devagar e observar", next: "slowRoad", tone: "calm" }
    ],
    art: "r1"
  },
  fastRoad: {
    title: "A fuga",
    text: [
      "Lucas acelera. A R1 corta a névoa, desvia de pedras e salta sobre uma ponte quebrada.",
      "O dragão voa ao lado, iluminando as curvas com pequenas chamas.",
      "Quando a floresta termina, uma luz solitária espera adiante."
    ],
    choices: [{ label: "Seguir até a luz", next: "treasure" }],
    art: "r1"
  },
  slowRoad: {
    title: "As pistas no caminho",
    text: [
      "Lucas segue com cuidado e encontra pequenos símbolos roxos gravados em pedras.",
      "Cada marca parece ter sido deixada por alguém que sabia que ele passaria por ali.",
      "No fim da estrada, uma luz solitária espera adiante."
    ],
    choices: [{ label: "Seguir até a luz", next: "treasure" }],
    art: "r1"
  }
};

function Art({ type, dragonName }: { type?: Scene["art"]; dragonName: string }) {
  if (type === "road") {
    return (
      <div className="hero-anime" role="img" aria-label="Animação de Lucas em sua moto vermelha">
        <div className="hero-moon" />
        <div className="hero-fireflies" />
      </div>
    );
  }
  const icon: Record<NonNullable<Scene["art"]>, string> = {
    road: "🏍️",
    forest: "🌲",
    dragon: "🐉",
    pirates: "🏴‍☠️",
    temple: "⚔️",
    football: "⚽",
    r1: "🏍️",
    treasure: "🎁"
  };
  return (
    <div className={`scene-art art-${type ?? "forest"}`}>
      <span>{icon[type ?? "forest"]}</span>
      {type === "dragon" && dragonName && <small>{dragonName}</small>}
    </div>
  );
}

export default function GamePage() {
  const [scene, setScene] = useState<SceneId>("title");
  const [dragonName, setDragonName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [goals, setGoals] = useState(0);
  const [keeperSide, setKeeperSide] = useState<"esquerda" | "centro" | "direita">("centro");
  const [message, setMessage] = useState("Escolha um canto para chutar.");
  const [answer, setAnswer] = useState("");
  const [finalError, setFinalError] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("lucas-rpg-dragon");
    if (savedName) setDragonName(savedName);
  }, []);

  const current = useMemo(() => {
    if (scene === "dragonName" || scene === "football" || scene === "treasure" || scene === "final") return null;
    return scenes[scene];
  }, [scene]);

  function go(next: SceneId) {
    setScene(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveDragonName() {
    const clean = draftName.trim() || "Draco";
    setDragonName(clean);
    localStorage.setItem("lucas-rpg-dragon", clean);
    go("piratesIntro");
  }

  function shoot(side: "esquerda" | "centro" | "direita") {
    const sides = ["esquerda", "centro", "direita"] as const;
    const keeper = sides[Math.floor(Math.random() * sides.length)];
    setKeeperSide(keeper);
    if (side !== keeper) {
      const nextGoals = goals + 1;
      setGoals(nextGoals);
      setMessage(`GOL! O Guardião saltou para ${keeper}.`);
      if (nextGoals >= 3) setTimeout(() => go("r1"), 900);
    } else {
      setMessage(`Defesa do Guardião no ${keeper}. Tente novamente.`);
    }
  }

  function unlockTreasure() {
    const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    if (normalize(answer) === normalize(FINAL_ANSWER)) {
      setFinalError("");
      go("final");
    } else {
      setFinalError("Pense no começo de tudo…");
    }
  }

  if (scene === "dragonName") {
    return (
      <main className="game-shell">
        <section className="game-card name-scene">
          <Art type="dragon" dragonName="" />
          <p className="eyebrow">UM NOVO COMPANHEIRO</p>
          <h1>Como Lucas deseja chamar o dragão?</h1>
          <p>O nome escolhido será usado durante toda a aventura.</p>
          <input
            className="text-input"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            placeholder="Digite o nome do dragão"
            maxLength={24}
            autoFocus
          />
          <button className="primary-button" onClick={saveDragonName}>Confirmar nome</button>
        </section>
      </main>
    );
  }

  if (scene === "football") {
    return (
      <main className="game-shell">
        <section className="game-card football-scene">
          <p className="eyebrow">DESAFIO DO GUARDIÃO</p>
          <h1>Marque três gols</h1>
          <p>Escolha um canto. O Guardião também escolherá uma direção para defender.</p>
          <div className="scoreboard"><span>Lucas</span><strong>{goals}/3</strong><span>Guardião: {keeperSide}</span></div>
          <div className="goal">
            <div className={`keeper keeper-${keeperSide}`}>🧤</div>
            <div className="net" />
          </div>
          <div className="shoot-buttons">
            <button onClick={() => shoot("esquerda")}>Chutar à esquerda</button>
            <button onClick={() => shoot("centro")}>Chutar no centro</button>
            <button onClick={() => shoot("direita")}>Chutar à direita</button>
          </div>
          <p className="feedback">{message}</p>
        </section>
      </main>
    );
  }

  if (scene === "treasure") {
    return (
      <main className="game-shell">
        <section className="game-card treasure-scene">
          <Art type="treasure" dragonName={dragonName} />
          <p className="eyebrow">A ÚLTIMA BARREIRA</p>
          <h1>Diga a primeira coisa que você me mandou</h1>
          <p>Se a resposta estiver correta, o presente será desbloqueado.</p>
          <input
            className="text-input"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Digite sua resposta"
          />
          {finalError && <p className="error-text">{finalError}</p>}
          <button className="primary-button" onClick={unlockTreasure}>Desbloquear presente</button>
        </section>
      </main>
    );
  }

  if (scene === "final") {
    return (
      <main className="game-shell final-shell">
        <section className="game-card final-card">
          <div className="chest-open">✨🎁✨</div>
          <p className="eyebrow">TESOURO ENCONTRADO</p>
          <h1>Oi, Baby ❤️</h1>
          <p>Espero que tenha gostado desta pequena aventura. Pensei em você em cada escolha e em cada detalhe.</p>
          <p><strong>Feliz aniversário! Te amo e obrigada por tudo.</strong></p>
          <p>Agora fale as palavras mágicas:</p>
          <blockquote>“Camarazinho e Tilapinha”</blockquote>
          <p>…e o seu presente será entregue.</p>
          <small>Com amor, Giselle.</small>
        </section>
      </main>
    );
  }

  if (!current) return null;

  if (scene === "title") {
    return (
      <main className="intro-shell">
        <section className="intro-frame">
          <nav className="intro-nav" aria-label="Navegação do jogo">
            <span className="brand-mark">✦</span>
            <div className="intro-nav-links">
              <span className="active">Início</span>
              <span>Aventura</span>
              <span>Escolhas</span>
            </div>
            <button className="nav-start" onClick={() => go("crash")}>Iniciar jornada</button>
          </nav>

          <div className="intro-content">
            <div className="intro-copy">
              <p className="eyebrow">UMA AVENTURA DE ESCOLHAS</p>
              <h1><span>Lucas</span> e o Tesouro Final</h1>
              <p className="intro-description">Após um acidente de moto na floresta, uma jornada inesperada começa. Cada decisão poderá aproximá-lo da saída — e do verdadeiro tesouro.</p>
              <button className="intro-button" onClick={() => go("crash")}>
                <span>✦</span> Iniciar jornada <span>✦</span>
              </button>
              <div className="intro-features">
                <div><strong>⚔</strong><span>Escolhas que mudam o caminho</span></div>
                <div><strong>☾</strong><span>Segredos escondidos na floresta</span></div>
                <div><strong>◆</strong><span>Um tesouro além do que se vê</span></div>
              </div>
            </div>

            <div className="intro-visual">
              <Art type="road" dragonName={dragonName} />
            </div>
          </div>

          <div className="intro-bottom-ornament">♡</div>
        </section>
      </main>
    );
  }

  return (
    <main className={`game-shell scene-${current.art ?? "forest"}`}>
      <section className="game-card">
        <Art type={current.art} dragonName={dragonName} />
        <div className="story-panel">
          {current.eyebrow && <p className="eyebrow">{current.eyebrow}</p>}
          {current.title && <h1>{current.title}</h1>}
          <div className="story-copy">
            {current.text.map((paragraph, index) => (
              <p key={`${scene}-${index}`}>{paragraph.replaceAll("dragão", dragonName || "dragão")}</p>
            ))}
          </div>
          <div className="choices">
            {current.choices?.map((choice) => (
              <button
                key={choice.label}
                className={`choice-button ${choice.tone ? `choice-${choice.tone}` : ""}`}
                onClick={() => go(choice.next)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      {scene !== "title" && <button className="restart" onClick={() => go("title")}>Recomeçar</button>}
    </main>
  );
}
