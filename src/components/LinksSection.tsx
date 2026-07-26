import React, { useState } from 'react';
import { Share2, Youtube, MessageSquare, DollarSign, Tv, Video, Instagram, Copy, Check, ExternalLink, Globe, Settings, Trash2 } from 'lucide-react';
import { ChannelInfo, SocialLink } from '../types';

interface LinksSectionProps {
  channelInfo: ChannelInfo;
  socialLinks?: SocialLink[];
  onManage?: () => void;
  onDeleteLink?: (id: string) => void;
}

export const LinksSection: React.FC<LinksSectionProps> = ({ channelInfo, socialLinks, onManage, onDeleteLink }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'youtube': return Youtube;
      case 'discord': return MessageSquare;
      case 'livepix': return DollarSign;
      case 'twitch': return Tv;
      case 'kick': return Video;
      case 'instagram': return Instagram;
      default: return Globe;
    }
  };

  const displayLinks = socialLinks && socialLinks.length > 0 ? socialLinks : [
    {
      id: 'l-1',
      name: 'YouTube Oficial',
      description: 'Inscrições, vídeos diários e lives ao vivo.',
      url: channelInfo.youtubeUrl,
      badge: 'Principal',
      category: 'youtube' as const,
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'l-2',
      name: 'Comunidade no Discord',
      description: 'Salas de voz, eventos, chat com inscritos e avisos.',
      url: channelInfo.discordUrl,
      badge: 'Chat Oficial',
      category: 'discord' as const,
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 'l-3',
      name: 'Plataforma LivePix',
      description: 'Envie PIX com mensagem e voz na tela da live.',
      url: channelInfo.livepixUrl,
      badge: 'Apoio',
      category: 'livepix' as const,
      color: 'from-emerald-600 to-teal-800'
    }
  ];

  return (
    <section id="links" className="py-20 relative bg-[#09090b] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Share2 className="w-4 h-4" />
            <span>Central de Conexão</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Links & <span className="text-cyan-400">Redes Oficiais</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Centralize todos os nossos canais, redes sociais e plataformas de live em um único lugar.
          </p>

          {onManage && (
            <div className="mt-4">
              <button
                onClick={onManage}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Gerenciar / Editar Links</span>
              </button>
            </div>
          )}
        </div>

        {/* Links Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayLinks.map((link) => {
            const Icon = getCategoryIcon(link.category);
            const isCopied = copiedLink === link.name;
            const gradientColor = link.color || 'from-cyan-600 to-blue-800';

            return (
              <div
                key={link.id || link.name}
                className="bg-[#121622] rounded-2xl border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-xl relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradientColor} text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                        {link.badge || 'Rede Social'}
                      </span>

                      {onManage && (
                        <button
                          onClick={onManage}
                          className="p-1 rounded bg-black/40 hover:bg-cyan-600 text-gray-400 hover:text-white transition-all"
                          title="Editar Link"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDeleteLink && (
                        <button
                          onClick={() => {
                            if (confirm(`Excluir o link "${link.name}"?`)) {
                              onDeleteLink(link.id);
                            }
                          }}
                          className="p-1 rounded bg-black/40 hover:bg-red-600 text-gray-400 hover:text-white transition-all"
                          title="Excluir Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {link.name}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {link.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10 group-hover:border-cyan-500/40"
                  >
                    <span>Acessar Canal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleCopy(link.url, link.name)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all"
                    title="Copiar Link"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
