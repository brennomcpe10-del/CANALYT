import React from 'react';
import { User, Mail, Gamepad2, Disc as Discord, ShieldCheck, LogOut, Edit3, X, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onEditProfile: () => void;
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  userProfile,
  onClose,
  onEditProfile,
  onLogout,
}) => {
  if (!isOpen) return null;

  const isAdmin = userProfile.email.toLowerCase() === 'brennomcpe10@gmail.com';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#121622] border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Badge */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl ${isAdmin ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' : 'bg-indigo-600 text-white'}`}>
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white font-mono">{userProfile.name}</h3>
              {isAdmin && (
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{userProfile.email}</p>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="bg-[#0b0d12] rounded-2xl p-4 border border-white/5 space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
            <span className="text-gray-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-red-400" />
              Nome Cadastrado:
            </span>
            <span className="font-bold text-white">{userProfile.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-400" />
              E-mail:
            </span>
            <span className="font-bold text-gray-200">{userProfile.email}</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
              Nick Minecraft:
            </span>
            <span className="font-bold text-emerald-400">
              {userProfile.minecraftNick || 'Não informado'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Discord className="w-3.5 h-3.5 text-indigo-400" />
              Discord Nametag:
            </span>
            <span className="font-bold text-indigo-300">
              {userProfile.discordNametag || 'Não informado'}
            </span>
          </div>
        </div>

        {/* Admin Permission Status Box */}
        <div className={`p-3.5 rounded-xl border text-xs mb-6 ${
          isAdmin 
            ? 'bg-red-950/40 border-red-500/40 text-red-200' 
            : 'bg-white/5 border-white/10 text-gray-400'
        }`}>
          {isAdmin ? (
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Acesso Total de Administrador Ativo!</strong>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  Você está logado como Administrador e possui permissão para editar todas as configurações do canal.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-300">Acesso de Visitante/Membro</strong>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  As configurações de edição do site são restritas unicamente à conta oficial do Administrador.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onEditProfile}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Dados</span>
          </button>

          <button
            onClick={onLogout}
            className="py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Trocar de Conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
