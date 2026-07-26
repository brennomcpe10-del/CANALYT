import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Gamepad2, Bell, Radio, Sparkles, CheckCircle, Settings, Trash2 } from 'lucide-react';
import { ScheduleItem, ChannelInfo } from '../types';
import { checkScheduleLiveStatus, ScheduleLiveStatus } from '../utils/scheduleLiveHelper';

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
  channelInfo: ChannelInfo;
  onManage?: () => void;
  onDeleteSchedule?: (id: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ 
  schedule, 
  channelInfo,
  onManage,
  onDeleteSchedule 
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [remindedItems, setRemindedItems] = useState<Record<string, boolean>>({});
  const [liveStatus, setLiveStatus] = useState<ScheduleLiveStatus>(() => 
    checkScheduleLiveStatus(schedule)
  );

  useEffect(() => {
    const updateStatus = () => {
      setLiveStatus(checkScheduleLiveStatus(schedule));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, [schedule]);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(channelInfo.nextLiveDate);
      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [channelInfo.nextLiveDate]);

  const toggleReminder = (id: string) => {
    setRemindedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="agenda" className="py-20 relative bg-[#09090b] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-4 h-4" />
            <span>Cronograma Semanal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Agenda de <span className="text-gradient-red">Lives</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Confira os dias, horários e jogos das próximas transmissões. Não perca nenhuma gameplay!
          </p>

          {onManage && (
            <div className="mt-4">
              <button
                onClick={onManage}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Gerenciar / Editar Agenda de Lives</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Countdown or Live Now Banner */}
        {liveStatus.isLive ? (
          <div className="bg-red-950/40 rounded-2xl p-6 border-2 border-red-500 mb-12 shadow-2xl shadow-red-900/40 flex flex-col lg:flex-row items-center justify-between gap-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/50">
                <Radio className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-red-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  TRANSMISSÃO AO VIVO AGORA (DURAÇÃO: 1 HORA)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
                  {liveStatus.activeItem?.game || 'Live no Ar!'}
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  A live da agenda está em andamento. Assista agora no YouTube ou Twitch!
                </p>
              </div>
            </div>

            {/* Countdown for remaining time in 1h live window */}
            <div className="flex items-center gap-3 text-center">
              <div className="bg-[#0b0d12] border border-red-500/50 rounded-xl p-3 min-w-[80px]">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {String(liveStatus.minutesRemaining).padStart(2, '0')}
                </span>
                <span className="block text-[10px] text-gray-300 uppercase font-bold mt-0.5">Min Restantes</span>
              </div>
              <span className="text-2xl font-black text-red-500">:</span>
              <div className="bg-[#0b0d12] border border-red-500/50 rounded-xl p-3 min-w-[80px]">
                <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono animate-pulse">
                  {String(liveStatus.secondsRemaining).padStart(2, '0')}
                </span>
                <span className="block text-[10px] text-gray-300 uppercase font-bold mt-0.5">Segundos</span>
              </div>
            </div>

            <div>
              <a
                href={channelInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-red-600/50 hover:scale-105"
              >
                <Radio className="w-5 h-5 animate-pulse" />
                <span>ASSISTIR LIVE AGORA</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-card-dark rounded-2xl p-6 border border-red-500/30 mb-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40">
                <Radio className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-red-400 tracking-wider">Contagem Regressiva</span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-mono">Próxima Live Agendada</h3>
                <p className="text-xs text-gray-400 mt-0.5">Transmissão em HD no YouTube e Twitch</p>
              </div>
            </div>

            {/* Countdown Digital Timer */}
            <div className="flex items-center gap-3 text-center">
              <div className="bg-[#0b0d12] border border-white/10 rounded-xl p-3 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[10px] text-gray-400 uppercase font-bold mt-0.5">Horas</span>
              </div>
              <span className="text-2xl font-black text-red-500">:</span>
              <div className="bg-[#0b0d12] border border-white/10 rounded-xl p-3 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[10px] text-gray-400 uppercase font-bold mt-0.5">Minutos</span>
              </div>
              <span className="text-2xl font-black text-red-500">:</span>
              <div className="bg-[#0b0d12] border border-white/10 rounded-xl p-3 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[10px] text-gray-400 uppercase font-bold mt-0.5">Segundos</span>
              </div>
            </div>

            <div>
              <a
                href={channelInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-red-950/50"
              >
                <Bell className="w-4 h-4" />
                <span>Ativar Sininho no YouTube</span>
              </a>
            </div>
          </div>
        )}

        {/* Schedule Items List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((item) => {
            const isItemLiveNow = liveStatus.isLive && liveStatus.activeItem?.id === item.id;

            return (
              <div
                key={item.id}
                className={`bg-[#121622] rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isItemLiveNow
                    ? 'border-red-500 shadow-2xl shadow-red-600/40 ring-2 ring-red-500'
                    : item.isToday 
                      ? 'border-red-500/60 shadow-xl shadow-red-950/30' 
                      : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Active Live Badge or Today Badge */}
                {isItemLiveNow ? (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-lg animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    AO VIVO AGORA (1H)
                  </div>
                ) : item.isToday ? (
                  <div className="absolute top-0 right-0 bg-red-600/80 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    HOJE
                  </div>
                ) : null}

                {/* Quick Admin Actions */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {onManage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onManage();
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                      title="Editar Agenda"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteSchedule && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Tem certeza que deseja excluir o horário do dia "${item.dayOfWeek}" (${item.game})?`)) {
                          onDeleteSchedule(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                      title="Excluir Agenda"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  {/* Day & Time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-red-400 font-mono uppercase tracking-wider">
                      {item.dayOfWeek}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Game Title */}
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{item.game}</span>
                  </h3>

                  {/* Category Tag */}
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                      {item.gameCategory}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => toggleReminder(item.id)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      remindedItems[item.id]
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300'
                    }`}
                  >
                    {remindedItems[item.id] ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Lembrete Ativado!</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 text-gray-400" />
                        <span>Lembrar no Discord</span>
                      </>
                    )}
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
