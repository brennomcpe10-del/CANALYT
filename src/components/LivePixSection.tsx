import React, { useState } from 'react';
import { DollarSign, MessageCircle, Volume2, Sparkles, Send, CheckCircle2, Play, Zap, ExternalLink } from 'lucide-react';
import { ChannelInfo, LivePixAlert } from '../types';

interface LivePixSectionProps {
  channelInfo: ChannelInfo;
}

export const LivePixSection: React.FC<LivePixSectionProps> = ({ channelInfo }) => {
  const [testAlert, setTestAlert] = useState<LivePixAlert>({
    donorName: 'ProGamer_BR',
    amount: 15,
    message: 'Manda um salve pra galera da live! Canal monstro, bora pra cima!'
  });

  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSimulateAlert = () => {
    setIsAlertActive(true);
    setIsSpeaking(true);

    // Web Speech API if supported for simulated TTS audio
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${testAlert.donorName} enviou ${testAlert.amount} reais. Mensagem: ${testAlert.message}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 4000);
    }

    setTimeout(() => {
      setIsAlertActive(false);
    }, 7000);
  };

  return (
    <section id="livepix" className="py-20 relative bg-[#09090b] border-y border-zinc-800">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-4 h-4" />
            <span>Apoio & Interatividade</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Apoie o Canal via <span className="text-emerald-400">LivePix</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Envie sua mensagem por PIX e veja ela destacar na tela em tempo real durante a live com voz sintetizada (TTS)!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Explanation Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-card-dark p-6 rounded-2xl border border-emerald-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span>Como funciona o LivePix?</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                O LivePix é a plataforma oficial que conecta você diretamente à transmissão ao vivo. Qualquer valor enviado via PIX gera um alerta instantâneo na tela com animações especiais e voz de inteligência artificial lendo sua mensagem.
              </p>

              {/* Steps List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Acesse a página do LivePix</h4>
                    <p className="text-xs text-gray-400">Clique no botão grande abaixo para abrir o canal oficial no LivePix.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Escreva sua mensagem & Nome</h4>
                    <p className="text-xs text-gray-400">Digite o nickname que deseja exibir e o texto da sua mensagem.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Pague com o QR Code do PIX</h4>
                    <p className="text-xs text-gray-400">O pagamento é confirmado instantaneamente pela sua conta do banco.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Veja sua mensagem na live!</h4>
                    <p className="text-xs text-gray-400">O streamer lerá e responderá ao vivo durante a transmissão.</p>
                  </div>
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={channelInfo.livepixUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-lg shadow-xl shadow-emerald-950/50 hover:scale-[1.02] transition-all border border-emerald-300"
                >
                  <DollarSign className="w-6 h-6" />
                  <span>ENVIAR MENSAGEM NO LIVEPIX AGORA</span>
                  <ExternalLink className="w-5 h-5 ml-1" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Live Stream Alert Simulator Interactive Box */}
          <div className="lg:col-span-6">
            <div className="bg-[#121622] rounded-2xl p-6 border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-mono">Simulador de Alerta da Live</h3>
                </div>
                <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                  Teste o som e visual
                </span>
              </div>

              {/* OBS Overlay Screen Mockup */}
              <div className="relative w-full h-64 bg-black rounded-xl border border-white/10 overflow-hidden mb-6 flex flex-col justify-between p-4 bg-gradient-to-br from-slate-900 to-black">
                {/* Simulated Game Overlay Background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80')] bg-cover bg-center"></div>

                {/* Top Status Bar in stream */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    OBS Live Overlay
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    TTS Ativo
                  </span>
                </div>

                {/* Animated Simulated Alert Overlay */}
                {isAlertActive ? (
                  <div className="relative z-20 my-auto bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-emerald-900/90 border-2 border-emerald-400 p-4 rounded-xl text-center shadow-2xl animate-pulse-glow transition-all">
                    <div className="text-amber-300 text-xs font-black uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      NOVA DOAÇÃO RECEBIDA!
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="text-xl font-extrabold text-white mb-1">
                      {testAlert.donorName} <span className="text-emerald-300">enviou R$ {Number(testAlert.amount).toFixed(2)}</span>
                    </div>
                    <div className="bg-black/60 rounded-lg p-2.5 text-sm text-gray-200 border border-white/10 font-sans italic">
                      "{testAlert.message}"
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 my-auto text-center text-gray-500 py-6">
                    <p className="text-xs uppercase tracking-wider mb-1">Aguardando doação...</p>
                    <p className="text-sm font-medium text-gray-400">Clique no botão "Testar Alerta na Tela" abaixo para ver como aparecerá ao vivo!</p>
                  </div>
                )}

                <div className="relative z-10 text-[10px] text-gray-500 text-right">
                  Powered by LivePix Integration
                </div>
              </div>

              {/* Simulation Controls Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Seu Nick (Nome)</label>
                    <input
                      type="text"
                      value={testAlert.donorName}
                      onChange={(e) => setTestAlert({ ...testAlert, donorName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Valor (R$)</label>
                    <input
                      type="number"
                      value={testAlert.amount}
                      onChange={(e) => setTestAlert({ ...testAlert, amount: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Valor R$"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Mensagem do PIX</label>
                  <textarea
                    rows={2}
                    value={testAlert.message}
                    onChange={(e) => setTestAlert({ ...testAlert, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Sua mensagem para a live"
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateAlert}
                  disabled={isAlertActive}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    isAlertActive 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
                  }`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isAlertActive ? 'Simulando Alerta ao Vivo...' : 'Testar Alerta na Tela'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
