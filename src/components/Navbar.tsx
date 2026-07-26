import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  MessageSquare, 
  DollarSign, 
  Crown, 
  Calendar, 
  Newspaper, 
  Share2, 
  HelpCircle, 
  Menu, 
  X, 
  Radio, 
  Settings,
  Flame,
  Palette,
  User,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { ChannelInfo, ThemeAccent, UserProfile } from '../types';

interface NavbarProps {
  channelInfo: ChannelInfo;
  activeAccent: ThemeAccent;
  currentUserProfile: UserProfile | null;
  onAccentChange: (accent: ThemeAccent) => void;
  onOpenStreamerConfig: () => void;
  onOpenProfileModal: () => void;
  onOpenAdminRestrictedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  channelInfo,
  activeAccent,
  currentUserProfile,
  onAccentChange,
  onOpenStreamerConfig,
  onOpenProfileModal,
  onOpenAdminRestrictedModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = currentUserProfile?.email.toLowerCase() === 'brennomcpe10@gmail.com';

  const handleConfigClick = () => {
    if (isAdmin) {
      onOpenStreamerConfig();
    } else {
      onOpenAdminRestrictedModal();
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAccentColorClass = () => {
    switch (activeAccent) {
      case 'purple': return 'text-purple-500 border-purple-500 hover:bg-purple-500/10';
      case 'cyan': return 'text-cyan-400 border-cyan-400 hover:bg-cyan-400/10';
      case 'green': return 'text-emerald-400 border-emerald-400 hover:bg-emerald-400/10';
      case 'red':
      default:
        return 'text-red-500 border-red-500 hover:bg-red-500/10';
    }
  };

  const getAccentBgClass = () => {
    switch (activeAccent) {
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/40';
      case 'cyan': return 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-900/40 text-black font-semibold';
      case 'green': return 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-900/40 text-black font-semibold';
      case 'red':
      default:
        return 'bg-red-600 hover:bg-red-700 shadow-red-900/40';
    }
  };

  const navLinks = [
    { name: 'Início', href: '#inicio', icon: Tv },
    { name: 'LivePix', href: '#livepix', icon: DollarSign },
    { name: 'Loja VIP', href: '#vip', icon: Crown, badge: 'Em Breve' },
    { name: 'Agenda', href: '#agenda', icon: Calendar },
    { name: 'Notícias', href: '#noticias', icon: Newspaper },
    { name: 'Links', href: '#links', icon: Share2 },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 py-3 shadow-xl shadow-black/50' 
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Channel Name */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={channelInfo.logoUrl} 
                alt={channelInfo.name} 
                className="w-10 h-10 rounded-xl object-cover border-2 border-red-500/60 group-hover:border-red-400 transition-all group-hover:scale-105 shadow-md"
              />
              {channelInfo.isLiveNow && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center gap-1.5">
                {channelInfo.name}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                {channelInfo.isLiveNow ? (
                  <span className="inline-flex items-center gap-1 text-red-400 font-bold uppercase tracking-wider text-[10px]">
                    <Radio className="w-3 h-3 animate-pulse" />
                    AO VIVO
                  </span>
                ) : (
                  <span className="text-gray-400 text-[10px] font-medium">OFFLINE</span>
                )}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all relative group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 rounded-full uppercase font-bold tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Profile Badge */}
            {currentUserProfile && (
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left"
                title="Meu Perfil"
              >
                <div className={`p-1.5 rounded-lg ${isAdmin ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white'}`}>
                  <User className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{currentUserProfile.name.split(' ')[0]}</span>
                    {isAdmin && (
                      <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-md font-black uppercase">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 block truncate max-w-[100px]">
                    {currentUserProfile.email}
                  </span>
                </div>
              </button>
            )}

            {/* Theme Accent Picker dropdown */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => onAccentChange('red')}
                className={`w-6 h-6 rounded-full bg-red-600 transition-all ${activeAccent === 'red' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                title="Tema Vermelho Neon"
              />
              <button
                onClick={() => onAccentChange('purple')}
                className={`w-6 h-6 rounded-full bg-purple-600 transition-all ${activeAccent === 'purple' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                title="Tema Roxo Cyber"
              />
              <button
                onClick={() => onAccentChange('cyan')}
                className={`w-6 h-6 rounded-full bg-cyan-400 transition-all ${activeAccent === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                title="Tema Ciano Gamer"
              />
            </div>

            {/* Config Button for Streamer (Only for brennomcpe10@gmail.com) */}
            <button
              onClick={handleConfigClick}
              className={`p-2 rounded-xl transition-all border flex items-center gap-1 ${
                isAdmin 
                  ? 'text-red-400 hover:text-white bg-red-600/20 hover:bg-red-600/30 border-red-500/40' 
                  : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border-white/10'
              }`}
              title={isAdmin ? "Painel de Configurações do Streamer" : "Configurações (Exclusivo do Administrador)"}
            >
              <Settings className="w-5 h-5" />
              {!isAdmin && <Lock className="w-3 h-3 text-red-400" />}
            </button>

            {/* LivePix CTA */}
            <a
              href="#livepix"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all ${getAccentBgClass()}`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Apoiar no LivePix</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {currentUserProfile && (
              <button
                onClick={onOpenProfileModal}
                className="p-2 text-gray-200 bg-white/5 border border-white/10 rounded-lg"
                title="Meu Perfil"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleConfigClick}
              className={`p-2 rounded-lg border ${
                isAdmin 
                  ? 'text-red-400 bg-red-600/20 border-red-500/40' 
                  : 'text-gray-300 bg-white/5 border-white/10'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-200 hover:text-white bg-white/5 border border-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e111a] border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-medium text-gray-200 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-red-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-gray-400 font-medium">Tema de Cores:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => onAccentChange('red')} className="w-6 h-6 rounded-full bg-red-600" />
                <button onClick={() => onAccentChange('purple')} className="w-6 h-6 rounded-full bg-purple-600" />
                <button onClick={() => onAccentChange('cyan')} className="w-6 h-6 rounded-full bg-cyan-400" />
              </div>
            </div>

            <a
              href="#livepix"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-center bg-red-600 text-white shadow-lg"
            >
              <DollarSign className="w-5 h-5" />
              Enviar Mensagem pelo LivePix
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
