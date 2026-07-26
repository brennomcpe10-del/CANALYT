import { ChannelInfo, VipPlan, NewsItem, ScheduleItem, FaqItem, SocialLink } from '../types';

export const defaultChannelInfo: ChannelInfo = {
  name: "NEXUS LIVE",
  tagline: "O ponto de encontro da comunidade gamer!",
  description: "Canal oficial de transmissões ao vivo. Gameplays diárias, torneios com inscritos, sorteios exclusivos e interatividade total via LivePix e Discord.",
  logoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
  bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
  youtubeUrl: "https://youtube.com/@nexusliveoficial",
  discordUrl: "https://discord.gg/nexuscommunity",
  livepixUrl: "https://livepix.gg/nexuslive",
  twitchUrl: "https://twitch.tv/nexuslive",
  kickUrl: "https://kick.com/nexuslive",
  instagramUrl: "https://instagram.com/nexuslive",
  tiktokUrl: "https://tiktok.com/@nexuslive",
  isLiveNow: true,
  currentGame: "GTA RP / Valorant",
  liveTitle: "🔴 AO VIVO: GTA RP + Jogando com Inscritos & Sorteio de PIX no LivePix!",
  subscribersCount: "125K",
  discordMembersCount: "18.4K",
  nextLiveDate: "2026-07-25T20:00:00"
};

export const defaultVipPlans: VipPlan[] = [
  {
    id: "vip-bronze",
    name: "VIP BRONZE",
    tag: "Iniciante",
    price: "R$ 9,90",
    period: "/mês",
    color: "bronze",
    discordRole: "Role VIP Bronze Amarelo",
    benefits: [
      "Cargo VIP Bronze exclusivo no Discord",
      "Selo de Apoiador no chat da live",
      "Acesso a sala secreta de chat no Discord",
      "Emotes exclusivos liberados",
      "Imunidade a modo lento no chat"
    ]
  },
  {
    id: "vip-prata",
    name: "VIP PRATA",
    tag: "Mais Vendido",
    price: "R$ 19,90",
    period: "/mês",
    color: "silver",
    popular: true,
    discordRole: "Role VIP Prata Brilhante",
    benefits: [
      "Todos os benefícios do VIP Bronze",
      "Cargo VIP Prata em destaque no Discord",
      "Prioridade na fila para jogar ao vivo com o streamer",
      "Acesso antecipado a sorteios mensais de PIX e Jogos",
      "Salas de voz exclusivas VIP no Discord",
      "Insígnia de destaque nos comentários"
    ]
  },
  {
    id: "vip-ouro",
    name: "VIP OURO",
    tag: "Lendário",
    price: "R$ 39,90",
    period: "/mês",
    color: "gold",
    discordRole: "Role VIP Ouro Dourado",
    benefits: [
      "Todos os benefícios do VIP Prata",
      "Cargo VIP Ouro no topo da lista do Discord",
      "Vaga garantida nos eventos e torneios com prêmios",
      "Mensagem de voz personalizada gravada pelo streamer",
      "Direito a pedir 1 música ou desafio por live",
      "Acesso ao grupo VIP no WhatsApp/Telegram"
    ]
  },
  {
    id: "vip-diamante",
    name: "SUPREMO DIAMANTE",
    tag: "Exclusivo",
    price: "R$ 79,90",
    period: "/mês",
    color: "diamond",
    discordRole: "Role Supremo Diamante Cyan Neon",
    benefits: [
      "Todos os benefícios do VIP Ouro",
      "Cargo Supremo Diamante Neon com cor personalizada",
      "Canal de texto/voz pessoal exclusivo para falar com o streamer",
      "Agendamento de 1 partida duo/squad exclusiva semanal",
      "Comando personalizado de entrada no chat com TTS",
      "Desconto especial em futuras mercadorias do canal"
    ]
  }
];

export const defaultNews: NewsItem[] = [
  {
    id: "news-1",
    title: "🔥 Grande Torneio da Comunidade com R$ 1.000 em Prêmios!",
    summary: "Inscrições abertas no Discord oficial. Torneio aberto para todos os inscritos com transmissão ao vivo no YouTube.",
    content: `Estamos super empolgados em anunciar nosso maior torneio da temporada!

### Como vai funcionar?
O torneio acontecerá neste sábado a partir das 19:00 no horário de Brasília. As partidas serão transmitidas ao vivo no canal do YouTube com narração e comentários em tempo real.

### Premiação total:
- 🥇 **1º Lugar:** R$ 500 em PIX + Cargo Campeão no Discord
- 🥈 **2º Lugar:** R$ 300 em PIX
- 🥉 **3º Lugar:** R$ 200 em PIX

### Como participar?
Para se inscrever, acesse o nosso canal **#torneio-inscricoes** no Discord oficial. É 100% gratuito para todos os inscritos do canal. Os membros VIP têm vaga prioritária garantida na chave!`,
    category: "Sorteio",
    date: "25 de Julho, 2026",
    author: "NexusLive",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    pinned: true
  },
  {
    id: "news-2",
    title: "🎮 Atualização no Servidor de GTA RP e Novo Horário de Lives",
    summary: "Confira as principais novidades da semana no servidor da comunidade e os novos dias de transmissões ao vivo.",
    content: `Galera, atendendo a pedidos de vocês, estamos ajustando nosso cronograma semanal de lives para trazer mais conteúdo de alta qualidade!

### Novidades da Semana:
1. **GTA RP:** O servidor recebeu uma grande atualização de veículos e facções.
2. **Horários:** Agora teremos lives de Terça a Domingo, sempre iniciando pontualmente às 20h.
3. **Interatividade:** Novas animações e sons no LivePix para quando vocês mandarem mensagens na tela!

Agradecemos imensamente todo o apoio que vocês têm dado no chat e nas doações. Vamos pra cima!`,
    category: "Anúncio",
    date: "22 de Julho, 2026",
    author: "Equipe de Moderação",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "news-3",
    title: "⚡ Prévia da Loja VIP: O que esperar no lançamento?",
    summary: "Estamos preparando o sistema automático de VIPs para integração direta com o Discord e benefícios in-game.",
    content: `A Loja VIP do canal está sendo desenvolvida com muito carinho! Em breve você poderá adquirir seus cargos VIPs de forma 100% automática, recebendo a tag no Discord na hora.

Fique atento na aba **Loja VIP** aqui no site para ser o primeiro a saber quando for lançada!`,
    category: "Servidor VIP",
    date: "18 de Julho, 2026",
    author: "Dev Team",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
  }
];

export const defaultSchedule: ScheduleItem[] = [
  {
    id: "sch-1",
    dayOfWeek: "Terça-Feira",
    time: "20:00 - 23:30",
    game: "GTA RP Cidade Alta / Complexo",
    gameCategory: "Roleplay & Resenha",
    description: "Ações da facção, patrulha com a galera e interatividade no chat.",
    isToday: false,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sch-2",
    dayOfWeek: "Quarta-Feira",
    time: "20:00 - 23:00",
    game: "Valorant / CS2",
    gameCategory: "FPS Competitivo",
    description: "Subindo de elo na ranqueada e abrindo salas personalizadas para jogarmos com inscritos.",
    isToday: false,
    imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sch-3",
    dayOfWeek: "Sexta-Feira",
    time: "20:00 - 01:00",
    game: "Sextou da Zoeira & Jogos de Terror",
    gameCategory: "Especial com Inscritos",
    description: "Phasmophobia, Lethal Company, Roblox e react de memes enviados no Discord.",
    isToday: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sch-4",
    dayOfWeek: "Sábado",
    time: "19:00 - 23:30",
    game: "Torneio & Sorteios no LivePix",
    gameCategory: "Evento Especial",
    description: "Dia oficial de grandes prêmios, disputas ao vivo e participação em massa da comunidade.",
    isToday: false,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "sch-5",
    dayOfWeek: "Domingo",
    time: "18:00 - 21:30",
    game: "Chill Stream / React & Podcast",
    gameCategory: "Bate-Papo & Variedades",
    description: "Conversa aberta com os inscritos, tirando dúvidas, avaliando setups e trocando ideia no Discord.",
    isToday: false,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
  }
];

export const defaultFaq: FaqItem[] = [
  {
    id: "faq-1",
    question: "Como envio uma mensagem na tela durante a live via LivePix?",
    answer: "É muito simples! Basta clicar no botão 'Enviar LivePix' em nosso site ou ir para livepix.gg/nexuslive. Digite seu nome, o valor que deseja enviar (a partir de R$ 1,00) e escreva sua mensagem. Assim que o pagamento via PIX for confirmado (é instantâneo), sua mensagem aparecerá com destaque e voz sintetizada (TTS) ao vivo na tela da live!",
    category: "LivePix"
  },
  {
    id: "faq-2",
    question: "Quais são os dias e horários de live?",
    answer: "Nossas lives acontecem regularmente de Terça a Domingo, sempre a partir das 20:00 (horário de Brasília), com exceção de Sábado onde começamos mais cedo às 19:00. Você pode consultar nossa agenda completa atualizada na seção 'Agenda de Lives'.",
    category: "Lives"
  },
  {
    id: "faq-3",
    question: "Como faço para participar das partidas com inscritos?",
    answer: "Entra no nosso servidor do Discord! Lá divulgamos os códigos de sala, organizamos as filas e sorteios. Os membros VIP do canal têm fila prioritária nas salas de jogo.",
    category: "Discord"
  },
  {
    id: "faq-4",
    question: "A Loja VIP já está aceitando pagamentos?",
    answer: "Atualmente a Loja VIP está em fase final de preparação ('Em breve'). No entanto, você já pode conferir todos os planos e benefícios. Assim que abrirmos os pagamentos, o cargo será entregue automaticamente via bot do Discord!",
    category: "VIP"
  },
  {
    id: "faq-5",
    question: "Onde posso acompanhar as novidades e avisos de lives?",
    answer: "O melhor lugar para nunca perder nada é no nosso Discord no canal #avisos-live, além das postagens frequentes aqui na seção 'Notícias' do site e no Instagram oficial do canal.",
    category: "Geral"
  },
  {
    id: "faq-6",
    question: "Quais são as regras para envio de mensagens no LivePix?",
    answer: "Pedimos que mantenha o respeito! São proibidas mensagens com ofensas, preconceito, links maliciosos, vazamento de dados pessoais ou conteúdo inadequado. Mensagens impróprias serão filtradas e o usuário poderá ser banido.",
    category: "LivePix"
  }
];

export const defaultSocialLinks: SocialLink[] = [
  {
    id: "link-1",
    name: "YouTube Oficial",
    description: "Inscrições, vídeos diários e lives ao vivo.",
    url: "https://youtube.com/@nexusliveoficial",
    badge: "Principal",
    category: "youtube",
    color: "from-red-600 to-red-800",
    textColor: "text-red-400"
  },
  {
    id: "link-2",
    name: "Comunidade no Discord",
    description: "Salas de voz, eventos, chat com inscritos e avisos.",
    url: "https://discord.gg/nexuscommunity",
    badge: "Chat Oficial",
    category: "discord",
    color: "from-indigo-600 to-indigo-800",
    textColor: "text-indigo-400"
  },
  {
    id: "link-3",
    name: "Plataforma LivePix",
    description: "Envie PIX com mensagem e voz na tela da live.",
    url: "https://livepix.gg/nexuslive",
    badge: "Apoio",
    category: "livepix",
    color: "from-emerald-600 to-teal-800",
    textColor: "text-emerald-400"
  },
  {
    id: "link-4",
    name: "Canal na Twitch",
    description: "Transmissões secundárias e maratonas de jogos.",
    url: "https://twitch.tv/nexuslive",
    badge: "Live",
    category: "twitch",
    color: "from-purple-600 to-purple-800",
    textColor: "text-purple-400"
  },
  {
    id: "link-5",
    name: "Canal na Kick",
    description: "Lives exclusivas sem censura e chat rápido.",
    url: "https://kick.com/nexuslive",
    badge: "Novo",
    category: "kick",
    color: "from-emerald-500 to-green-700",
    textColor: "text-emerald-300"
  },
  {
    id: "link-6",
    name: "Instagram do Canal",
    description: "Fotos dos bastidores, stories e rotina.",
    url: "https://instagram.com/nexuslive",
    badge: "Rede Social",
    category: "instagram",
    color: "from-pink-600 to-amber-600",
    textColor: "text-pink-400"
  }
];
