import React from 'react';
import { Lock, ShieldAlert, KeyRound, X } from 'lucide-react';

interface AdminRestrictedModalProps {
  isOpen: boolean;
  userEmail: string;
  onClose: () => void;
  onSwitchToAdmin: () => void;
}

export const AdminRestrictedModal: React.FC<AdminRestrictedModalProps> = ({
  isOpen,
  userEmail,
  onClose,
  onSwitchToAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#121622] border border-red-500/40 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 mb-4">
          <Lock className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-white font-mono mb-2">
          Acesso Restrito de Edição
        </h3>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          As configurações e ferramentas de gerenciamento do site são exclusivas para a conta oficial do streamer.
          <br />
          Seu e-mail cadastrado é <span className="text-white font-semibold">{userEmail}</span>.
        </p>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 mb-6 flex items-center gap-2 text-left">
          <ShieldAlert className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <span>Para editar títulos, links, valores VIP e agenda, conecte-se com a conta do streamer.</span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onSwitchToAdmin}
            className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/50"
          >
            <KeyRound className="w-4 h-4" />
            <span>Entrar como Administrador</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-all"
          >
            Entendido, Continuar como Visitante
          </button>
        </div>
      </div>
    </div>
  );
};
