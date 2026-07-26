import React from 'react';
import { Youtube, MessageSquare, DollarSign, Radio, Sparkles, Users, Award, Play } from 'lucide-react';
import { ChannelInfo, ThemeAccent } from '../types';

interface HeroProps {
  channelInfo: ChannelInfo;
  activeAccent: ThemeAccent;
}

export const Hero: React.FC<HeroProps> = ({ channelInfo, activeAccent }) => {
  const getGradientText = () => {
    switch (activeAccent) {
      case 'purple': return 'text-gradient-purple';
      case 'cyan': return 'bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent';
      case 'green': return 'bg-gradient-to-r from-white via-emerald-200 to-emerald-500 bg-clip-text text-transparent';
      case 'red':
      default:
        return 'text-gradient-red';
    }
  };

  const getAccentBorder = () => {
    switch (activeAccent) {
      case 'purple': return 'border-purple-500/50 shadow-purple-900/30';
      case 'cyan': return 'border-cyan-400/50 shadow-cyan-900/30';
      case 'green': return 'border-emerald-500/50 shadow-emerald-900/30';
      case 'red':
      default:
        return 'border-red-500/50 shadow-red-900/30';
    }
  };

  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Banner with Dark Overlay & Grid */}
      <div className="absolute inset-0 z-0">
        <img 
          src={channelInfo.bannerUrl} 
          alt="Banner do Canal" 
          className="w-full h-full object-cover object-center opacity-25 filter blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/60 via-[#09090b]/90 to-[#09090b]"></div>
        <div className="absolute inset-0 bg-gamer-grid opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Live Status Badge */}
          {channelInfo.isLiveNow ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mb-6 animate-pulse shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">TRANSMISSÃO AO VIVO AGORA</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300 mb-6 shadow-md">
              <Radio className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Próxima live em breve • Fique ligado</span>
            </div>
          )}

          {/* Logo Container with Gamer Ring */}
          <div className="relative mb-6 group">
            <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600 via-purple-600 to-cyan-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500`}></div>
            <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl p-1 bg-[#121622] border-2 ${getAccentBorder()} shadow-2xl`}>
              <img 
                src={channelInfo.logoUrl} 
                alt={channelInfo.name} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Channel Name */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-3 font-mono ${getGradientText()}`}>
            {channelInfo.name}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-2xl mb-4">
            {channelInfo.tagline}
          </p>

          {/* Bio Description */}
          <p className="text-sm sm:text-base text-gray-400 max-w-3xl mb-8 leading-relaxed">
            {channelInfo.description}
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
            
            {/* Assistir no YouTube */}
            <a
              href={channelInfo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-red-900/30 hover:scale-[1.02] transition-all border border-red-500/30"
            >
              <Youtube className="w-5 h-5" />
              <span>Assistir no YouTube</span>
            </a>

            {/* Entrar no Discord */}
            <a
              href={channelInfo.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-900/30 hover:scale-[1.02] transition-all border border-indigo-500/30"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Entrar no Discord</span>
            </a>

            {/* Enviar mensagem pelo LivePix */}
            <a
              href="#livepix"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-base shadow-lg shadow-emerald-900/30 hover:scale-[1.02] transition-all border border-emerald-400/40"
            >
              <DollarSign className="w-5 h-5" />
              <span>Enviar via LivePix</span>
            </a>

          </div>

          {/* Current Live Card (if active) */}
          {channelInfo.isLiveNow && (
            <div className="w-full max-w-4xl bg-card-dark rounded-2xl p-5 border border-red-500/30 shadow-2xl text-left flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 flex-shrink-0">
                  <Play className="w-6 h-6 fill-red-500 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">
                      AO VIVO AGORA
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      Jogo: <strong className="text-white">{channelInfo.currentGame}</strong>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 line-clamp-1">
                    {channelInfo.liveTitle}
                  </h3>
                </div>
              </div>
              <a
                href={channelInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-all flex-shrink-0"
              >
                <span>Assistir Transmissão</span>
                <Play className="w-4 h-4 fill-white" />
              </a>
            </div>
          )}

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            <div className="bg-card-dark p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-red-400 flex justify-center mb-1">
                <Youtube className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{channelInfo.subscribersCount}</div>
              <div className="text-xs text-gray-400">Inscritos no Canal</div>
            </div>

            <div className="bg-card-dark p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-indigo-400 flex justify-center mb-1">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white font-mono">{channelInfo.discordMembersCount}</div>
              <div className="text-xs text-gray-400">Membros no Discord</div>
            </div>

            <div className="bg-card-dark p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-emerald-400 flex justify-center mb-1">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white font-mono">100%</div>
              <div className="text-xs text-gray-400">Mensagens na Tela</div>
            </div>

            <div className="bg-card-dark p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-amber-400 flex justify-center mb-1">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white font-mono">VIPs</div>
              <div className="text-xs text-gray-400">Cargos Exclusivos</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
