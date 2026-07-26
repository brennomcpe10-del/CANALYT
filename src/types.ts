export type ThemeAccent = 'red' | 'purple' | 'cyan' | 'green';

export interface ChannelInfo {
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  livepixUrl: string;
  twitchUrl?: string;
  kickUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  isLiveNow: boolean;
  currentGame?: string;
  liveTitle?: string;
  subscribersCount: string;
  discordMembersCount: string;
  nextLiveDate: string; // ISO string or format
}

export interface VipPlan {
  id: string;
  name: string;
  tag: string;
  price: string;
  period: string;
  color: 'bronze' | 'silver' | 'gold' | 'diamond' | 'purple';
  popular?: boolean;
  benefits: string[];
  discordRole: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Anúncio' | 'Servidor VIP' | 'Sorteio' | 'Atualização' | 'Comunidade';
  date: string;
  author: string;
  imageUrl: string;
  pinned?: boolean;
}

export interface ScheduleItem {
  id: string;
  dayOfWeek: string; // e.g. "Segunda-Feira", "Quarta-Feira"
  time: string; // e.g. "20:00 BRT"
  game: string;
  gameCategory: string;
  description: string;
  isToday?: boolean;
  featured?: boolean;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'LivePix' | 'Lives' | 'Discord' | 'VIP' | 'Geral';
}

export interface SocialLink {
  id: string;
  name: string;
  description: string;
  url: string;
  badge: string;
  category: 'youtube' | 'discord' | 'livepix' | 'twitch' | 'kick' | 'instagram' | 'tiktok' | 'other';
  textColor?: string;
  color?: string;
}

export interface LivePixAlert {
  donorName: string;
  amount: number;
  message: string;
}

export interface UserProfile {
  name: string;
  email: string;
  minecraftNick?: string;
  discordNametag?: string;
  registeredAt: string;
}

