import React from 'react';
import { Youtube, MessageSquare, DollarSign, Tv, Instagram, Mail, Settings, Shield, Heart } from 'lucide-react';
import { ChannelInfo } from '../types';

interface FooterProps {
  channelInfo: ChannelInfo;
  onOpenStreamerConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ channelInfo, onOpenStreamerConfig }) => {
  return (
    <footer className="bg-[#07090e] border-t border-white/10 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={channelInfo.logoUrl}
                alt={channelInfo.name}
                className="w-10 h-10 rounded-xl object-cover border border-red-500/50"
              />
              <span className="text-xl font-black text-white font-mono tracking-wider">
                {channelInfo.name}
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              {channelInfo.tagline} Portal oficial da comunidade gamer com doações ao vivo pelo LivePix, loja VIP e conteúdos diários.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={channelInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 border border-white/10 transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={channelInfo.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-gray-300 hover:text-indigo-400 border border-white/10 transition-all"
                title="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={channelInfo.livepixUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-emerald-600/20 text-gray-300 hover:text-emerald-400 border border-white/10 transition-all"
                title="LivePix"
              >
                <DollarSign className="w-4 h-4" />
              </a>

              <a
                href={channelInfo.twitchUrl || 'https://twitch.tv'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-purple-400 border border-white/10 transition-all"
                title="Twitch"
              >
                <Tv className="w-4 h-4" />
              </a>

              <a
                href={channelInfo.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-pink-600/20 text-gray-300 hover:text-pink-400 border border-white/10 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#livepix" className="hover:text-emerald-400 transition-colors">Apoiar via LivePix</a></li>
              <li><a href="#vip" className="hover:text-purple-400 transition-colors">Loja VIP (Em Breve)</a></li>
              <li><a href="#agenda" className="hover:text-white transition-colors">Agenda de Lives</a></li>
              <li><a href="#noticias" className="hover:text-white transition-colors">Notícias do Canal</a></li>
            </ul>
          </div>

          {/* Info Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Comunidade</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#links" className="hover:text-white transition-colors">Redes Sociais</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes (FAQ)</a></li>
              <li><a href={channelInfo.discordUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Regras do Discord</a></li>
              <li><a href="#livepix" className="hover:text-emerald-400 transition-colors">Alertas na Tela</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Contato & Parcerias</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>contato@{channelInfo.name.toLowerCase().replace(/\s+/g, '')}.com.br</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Para propostas comerciais, patrocínios e parcerias com a live, envie um e-mail ou chame no Discord.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onOpenStreamerConfig}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-[11px] font-bold flex items-center gap-1.5 transition-all"
                >
                  <Settings className="w-3.5 h-3.5 text-red-400" />
                  <span>Painel do Streamer</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Footer Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 <strong>{channelInfo.name}</strong>. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para a comunidade gamer.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
