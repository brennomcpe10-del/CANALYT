import React, { useState } from 'react';
import { Crown, Check, ShieldAlert, Sparkles, Clock, Bell, X, Shield, ArrowRight, Settings, Trash2 } from 'lucide-react';
import { VipPlan, ChannelInfo } from '../types';

interface VipStoreSectionProps {
  vipPlans: VipPlan[];
  channelInfo: ChannelInfo;
  onManage?: () => void;
  onDeletePlan?: (id: string) => void;
}

export const VipStoreSection: React.FC<VipStoreSectionProps> = ({ vipPlans, channelInfo, onManage, onDeletePlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<VipPlan | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyDiscord, setNotifyDiscord] = useState('');
  const [submittedNotify, setSubmittedNotify] = useState(false);

  const handleOpenModal = (plan: VipPlan) => {
    setSelectedPlan(plan);
    setSubmittedNotify(false);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail && !notifyDiscord) return;
    setSubmittedNotify(true);
  };

  const getPlanHeaderGradient = (color: string) => {
    switch (color) {
      case 'gold':
        return 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/40 text-amber-300';
      case 'diamond':
        return 'from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-400/40 text-cyan-300';
      case 'silver':
        return 'from-slate-400/20 via-gray-400/10 to-transparent border-slate-400/40 text-slate-200';
      case 'bronze':
      default:
        return 'from-amber-800/20 via-amber-900/10 to-transparent border-amber-700/40 text-amber-500';
    }
  };

  const getPlanBadgeColor = (color: string) => {
    switch (color) {
      case 'gold': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'diamond': return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/40';
      case 'silver': return 'bg-slate-400/20 text-slate-300 border-slate-400/40';
      case 'bronze':
      default:
        return 'bg-amber-800/20 text-amber-500 border-amber-700/40';
    }
  };

  return (
    <section id="vip" className="py-20 relative bg-[#09090b]">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Em Construção</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Loja <span className="text-gradient-purple">VIP</span> Oficial
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Seja um membro VIP do canal, desbloqueie vantagens exclusivas no Discord, prioridade nas partidas e destaque no chat das lives!
          </p>

          {/* Banner Status Em Construção */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-purple-900/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium">
              <ShieldAlert className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span>O sistema de pagamento automático via PIX / Cartão está sendo preparado. Garanta sua vaga antecipada!</span>
            </div>
            {onManage && (
              <button
                onClick={onManage}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Gerenciar / Editar Loja VIP</span>
              </button>
            )}
          </div>
        </div>

        {/* VIP Plans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#121622] rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                plan.popular 
                  ? 'border-purple-500 shadow-2xl shadow-purple-950/50 scale-[1.02]' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Quick Admin Actions */}
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {onManage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onManage();
                    }}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-purple-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                    title="Editar Plano VIP"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                )}
                {onDeletePlan && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Tem certeza que deseja excluir o plano ${plan.name}?`)) {
                        onDeletePlan(plan.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                    title="Excluir Plano VIP"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Popular Tag */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                  MAIS POPULAR
                </div>
              )}

              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-b ${getPlanHeaderGradient(plan.color)}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${getPlanBadgeColor(plan.color)}`}>
                    {plan.tag}
                  </span>
                  <Crown className={`w-6 h-6 ${plan.color === 'gold' ? 'text-amber-400' : plan.color === 'diamond' ? 'text-cyan-400' : 'text-purple-400'}`} />
                </div>

                <h3 className="text-xl font-black text-white font-mono tracking-tight">
                  {plan.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-gray-400">{plan.period}</span>
                </div>
              </div>

              {/* Card Benefits List */}
              <div className="p-6 space-y-4 flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Vantagens Incluídas:</div>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenModal(plan)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-white flex items-center justify-center gap-2 transition-all group-hover:bg-purple-600 group-hover:text-white"
                >
                  <Clock className="w-4 h-4" />
                  <span>EM BREVE (Notificar-me)</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Notify / Pre-registration Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#121622] border border-purple-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-purple-400 uppercase font-bold tracking-wider">Interesse no Plano VIP</span>
                <h3 className="text-xl font-black text-white font-mono">{selectedPlan.name}</h3>
              </div>
            </div>

            {submittedNotify ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Inscrição Confirmada!</h4>
                <p className="text-xs text-gray-300">
                  Você está na lista prioritária do plano <strong>{selectedPlan.name}</strong>. Avisaremos no Discord e e-mail assim que os pagamentos forem liberados!
                </p>
                <div className="pt-3">
                  <a
                    href={channelInfo.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    Entrar no Discord Agora
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-4">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Deixe seus dados para receber um cupom de desconto exclusivo de abertura e acesso antecipado ao cargo <strong>{selectedPlan.name} ({selectedPlan.price})</strong>:
                </p>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Seu Tag do Discord (ex: Nick#0000)</label>
                  <input
                    type="text"
                    value={notifyDiscord}
                    onChange={(e) => setNotifyDiscord(e.target.value)}
                    placeholder="Seu usuário no Discord"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Seu E-mail (Opcional)</label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50"
                >
                  <Bell className="w-4 h-4" />
                  <span>Quero Acesso Antecipado ao VIP</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
