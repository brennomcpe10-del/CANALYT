import React, { useState } from 'react';
import { User, Mail, Gamepad2, Disc as Discord, ShieldCheck, Sparkles, ArrowRight, Lock, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  currentUserProfile: UserProfile | null;
  onRegister: (profile: UserProfile) => void;
  onClose?: () => void;
  isMandatory?: boolean;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  currentUserProfile,
  onRegister,
  onClose,
  isMandatory = true,
}) => {
  const [name, setName] = useState(currentUserProfile?.name || '');
  const [email, setEmail] = useState(currentUserProfile?.email || '');
  const [minecraftNick, setMinecraftNick] = useState(currentUserProfile?.minecraftNick || '');
  const [discordNametag, setDiscordNametag] = useState(currentUserProfile?.discordNametag || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe o seu nome.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setError('');
    const profile: UserProfile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      minecraftNick: minecraftNick.trim() || undefined,
      discordNametag: discordNametag.trim() || undefined,
      registeredAt: currentUserProfile?.registeredAt || new Date().toISOString(),
    };

    onRegister(profile);
  };

  const handleFillAdmin = () => {
    setName('Brenno Admin');
    setEmail('brennomcpe10@gmail.com');
    setMinecraftNick('BrennoMCPE');
    setDiscordNametag('brenno#0001');
    setError('');
  };

  const isAdminEmail = email.trim().toLowerCase() === 'brennomcpe10@gmail.com';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-[#121622] border border-red-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white shadow-xl shadow-red-950/50 mb-3 border border-red-400/30">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            Bem-vindo à Comunidade!
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
            Identifique-se para acessar todas as áreas da live, loja VIP, sorteios e agenda do canal.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {/* Nome - Obrigatório */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-400" />
              <span>Seu Nome *</span>
              <span className="text-[10px] text-red-400 font-normal">(Obrigatório)</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João Silva"
              className="w-full bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* E-mail - Obrigatório */}
          <div>
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-red-400" />
                <span>E-mail *</span>
                <span className="text-[10px] text-red-400 font-normal">(Obrigatório)</span>
              </span>
              {isAdminEmail && (
                <span className="text-[10px] bg-red-600/30 text-red-400 border border-red-500/50 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  ADMIN DETECTADO
                </span>
              )}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: seuemail@exemplo.com"
              className={`w-full bg-[#0b0d12] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                isAdminEmail ? 'border-red-500 ring-2 ring-red-500/30' : 'border-white/10 focus:border-red-500'
              }`}
            />
            <p className="text-[11px] text-gray-400 mt-1">
              * O e-mail cadastrado concede acesso às áreas de membro e benefícios exclusivos.
            </p>
          </div>

          {/* Nick do Minecraft - Opcional */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nick do Minecraft</span>
              <span className="text-[10px] text-gray-400 font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              value={minecraftNick}
              onChange={(e) => setMinecraftNick(e.target.value)}
              placeholder="Ex: PlayerMinecraft_123"
              className="w-full bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Nametag do Discord - Opcional */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Discord className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nametag do Discord</span>
              <span className="text-[10px] text-gray-400 font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              value={discordNametag}
              onChange={(e) => setDiscordNametag(e.target.value)}
              placeholder="Ex: usuario#0000 ou @usuario"
              className="w-full bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Admin Fast Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleFillAdmin}
              className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <KeyRound className="w-3.5 h-3.5 text-red-400" />
              <span>Preencher como Streamer/Admin</span>
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 transition-all transform hover:scale-[1.02]"
            >
              <span>{currentUserProfile ? 'Atualizar Meu Registro' : 'Confirmar e Entrar no Site'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
