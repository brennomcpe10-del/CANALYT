import React, { useState } from 'react';
import { 
  X, Settings, Save, RotateCcw, Radio, Check, Upload, Image, Plus, Trash2, Edit2, 
  Crown, Calendar, Newspaper, Share2, HelpCircle, AlertCircle, Users, Youtube, MessageSquare
} from 'lucide-react';
import { ChannelInfo, VipPlan, ScheduleItem, NewsItem, SocialLink, FaqItem } from '../types';

interface StreamerConfigModalProps {
  initialTab?: 'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq';
  channelInfo: ChannelInfo;
  vipPlans: VipPlan[];
  schedule: ScheduleItem[];
  newsList: NewsItem[];
  socialLinks: SocialLink[];
  faqList: FaqItem[];
  simulatedLiveStartTime?: Date | null;
  onStartSimulatedLive?: () => void;
  onStopSimulatedLive?: () => void;
  onSaveChannelInfo: (info: ChannelInfo) => void;
  onResetChannelInfo: () => void;
  onSaveVipPlans: (plans: VipPlan[]) => void;
  onSaveSchedule: (schedule: ScheduleItem[]) => void;
  onSaveNews: (news: NewsItem[]) => void;
  onSaveSocialLinks: (links: SocialLink[]) => void;
  onSaveFaq: (faq: FaqItem[]) => void;
  onClose: () => void;
}

export const StreamerConfigModal: React.FC<StreamerConfigModalProps> = ({
  initialTab = 'geral',
  channelInfo,
  vipPlans,
  schedule,
  newsList,
  socialLinks,
  faqList,
  simulatedLiveStartTime,
  onStartSimulatedLive,
  onStopSimulatedLive,
  onSaveChannelInfo,
  onResetChannelInfo,
  onSaveVipPlans,
  onSaveSchedule,
  onSaveNews,
  onSaveSocialLinks,
  onSaveFaq,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq'>(initialTab);
  const [formDataInfo, setFormDataInfo] = useState<ChannelInfo>({ ...channelInfo });
  const [localVipPlans, setLocalVipPlans] = useState<VipPlan[]>([...vipPlans]);
  const [localSchedule, setLocalSchedule] = useState<ScheduleItem[]>([...schedule]);
  const [localNews, setLocalNews] = useState<NewsItem[]>([...newsList]);
  const [localLinks, setLocalLinks] = useState<SocialLink[]>([...socialLinks]);
  const [localFaq, setLocalFaq] = useState<FaqItem[]>([...faqList]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // States for sub-form editing
  const [editingVip, setEditingVip] = useState<VipPlan | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // Helper for image upload from computer file (.jpg, .png, etc.)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Main Save Handler
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveChannelInfo(formDataInfo);
    onSaveVipPlans(localVipPlans);
    onSaveSchedule(localSchedule);
    onSaveNews(localNews);
    onSaveSocialLinks(localLinks);
    onSaveFaq(localFaq);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#121622] border border-red-500/40 rounded-2xl max-w-4xl w-full my-6 relative shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/10 z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <div className="p-3 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono">Painel do Streamer</h3>
            <p className="text-xs text-gray-400">Gerencie todo o conteúdo do seu site de streamer em um só lugar.</p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-black/40 border border-white/10 mb-5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('geral')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'geral' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>1. Geral & Foto</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vip')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'vip' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Loja VIP ({localVipPlans.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('agenda')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'agenda' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>3. Agenda ({localSchedule.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('noticias')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'noticias' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>4. Notícias ({localNews.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'links' ? 'bg-cyan-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>5. Links ({localLinks.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'faq' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>6. FAQ ({localFaq.length})</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm">
          
          {/* TAB 1: GERAL & FOTO DO CANAL */}
          {activeTab === 'geral' && (
            <div className="space-y-4">
              
              {/* Channel Logo Upload (.jpg) */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Foto do Canal (Logo / Avatar)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-500/60 shadow-lg bg-black flex-shrink-0 group">
                    <img
                      src={formDataInfo.logoUrl}
                      alt="Logo Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Image className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 shadow-md transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Carregar arquivo do PC (.jpg / .png)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, (url) => setFormDataInfo({ ...formDataInfo, logoUrl: url }))}
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[11px] text-gray-400 block mb-1">Ou cole o link de uma imagem da internet:</span>
                      <input
                        type="url"
                        value={formDataInfo.logoUrl}
                        onChange={(e) => setFormDataInfo({ ...formDataInfo, logoUrl: e.target.value })}
                        placeholder="https://exemplo.com/minha-foto.jpg"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel Banner Upload (.jpg) */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Banner do Canal (Capa de Fundo)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-36 h-20 rounded-xl overflow-hidden border border-white/20 bg-black flex-shrink-0">
                    <img
                      src={formDataInfo.bannerUrl}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-2 transition-all">
                      <Upload className="w-4 h-4 text-red-400" />
                      <span>Carregar Banner (.jpg / .png)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, (url) => setFormDataInfo({ ...formDataInfo, bannerUrl: url }))}
                      />
                    </label>

                    <input
                      type="url"
                      value={formDataInfo.bannerUrl}
                      onChange={(e) => setFormDataInfo({ ...formDataInfo, bannerUrl: e.target.value })}
                      placeholder="URL da capa de fundo"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Channel Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Nome do Canal</label>
                  <input
                    type="text"
                    value={formDataInfo.name}
                    onChange={(e) => setFormDataInfo({ ...formDataInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Subtítulo / Slogan</label>
                  <input
                    type="text"
                    value={formDataInfo.tagline}
                    onChange={(e) => setFormDataInfo({ ...formDataInfo, tagline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Descrição do Canal</label>
                <textarea
                  rows={2}
                  value={formDataInfo.description}
                  onChange={(e) => setFormDataInfo({ ...formDataInfo, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              {/* Live Status Toggle & Schedule Automation */}
              <div className="bg-[#181d2a] p-4 rounded-xl border border-red-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                      Status Automático de Live (Sincronizado com a Agenda)
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">
                      O selo <strong className="text-red-400">TRANSMISSÃO AO VIVO AGORA</strong> só é ativado automaticamente quando o dia e horário agendado chegar, durando <strong className="text-white">exatamente 1 hora</strong>. Após esse tempo, a live encerra sozinha.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      channelInfo.isLiveNow 
                        ? 'bg-red-600 text-white animate-pulse' 
                        : 'bg-gray-800 text-gray-400 border border-white/10'
                    }`}>
                      {channelInfo.isLiveNow ? '🔴 AO VIVO (1h)' : '⚪ OFFLINE (Aguardando Agenda)'}
                    </span>
                  </div>
                </div>

                {/* Simulation Mode Bar for Testing 1h Live */}
                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-300">
                    {simulatedLiveStartTime ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Simulação Ativa: Live de 1 hora iniciada às {new Date(simulatedLiveStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
                      </span>
                    ) : (
                      <span>Deseja testar a visualização de 1 hora de live ao vivo agora?</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {simulatedLiveStartTime ? (
                      <button
                        type="button"
                        onClick={onStopSimulatedLive}
                        className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs"
                      >
                        Encerrar Simulação
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onStartSimulatedLive}
                        className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Simular Live de 1 Hora Agora</span>
                      </button>
                    )}
                  </div>
                </div>

                {channelInfo.isLiveNow && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">Jogo Atual</label>
                      <input
                        type="text"
                        value={formDataInfo.currentGame || ''}
                        onChange={(e) => setFormDataInfo({ ...formDataInfo, currentGame: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">Título da Live</label>
                      <input
                        type="text"
                        value={formDataInfo.liveTitle || ''}
                        onChange={(e) => setFormDataInfo({ ...formDataInfo, liveTitle: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Key Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">URL YouTube</label>
                  <input
                    type="url"
                    value={formDataInfo.youtubeUrl}
                    onChange={(e) => setFormDataInfo({ ...formDataInfo, youtubeUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">URL Discord</label>
                  <input
                    type="url"
                    value={formDataInfo.discordUrl}
                    onChange={(e) => setFormDataInfo({ ...formDataInfo, discordUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">URL LivePix</label>
                  <input
                    type="url"
                    value={formDataInfo.livepixUrl}
                    onChange={(e) => setFormDataInfo({ ...formDataInfo, livepixUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Channel Metrics (Subscribers & Discord Members) */}
              <div className="bg-[#181d2a] p-4 rounded-xl border border-white/10 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-red-400" />
                  Estatísticas do Canal e Comunidade
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                      Número de Inscritos / Seguidores
                    </label>
                    <input
                      type="text"
                      value={formDataInfo.subscribersCount || ''}
                      onChange={(e) => setFormDataInfo({ ...formDataInfo, subscribersCount: e.target.value })}
                      placeholder="Ex: 12.5k ou 12.500"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                      Membros no Servidor do Discord
                    </label>
                    <input
                      type="text"
                      value={formDataInfo.discordMembersCount || ''}
                      onChange={(e) => setFormDataInfo({ ...formDataInfo, discordMembersCount: e.target.value })}
                      placeholder="Ex: 3.8k ou 3.800"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LOJA VIP */}
          {activeTab === 'vip' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Planos da Loja VIP</h4>
                <button
                  type="button"
                  onClick={() => setEditingVip({
                    id: `vip-${Date.now()}`,
                    name: 'NOVO PLANO VIP',
                    tag: 'Exclusivo',
                    price: 'R$ 14,90',
                    period: '/mês',
                    color: 'purple',
                    benefits: ['Benefício 1', 'Benefício 2'],
                    discordRole: 'Cargo VIP Discord'
                  })}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Novo Plano</span>
                </button>
              </div>

              {/* VIP Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {localVipPlans.map((plan) => (
                  <div key={plan.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        {plan.tag}
                      </span>
                      <h5 className="font-bold text-white text-sm mt-1">{plan.name}</h5>
                      <span className="text-xs text-amber-400 font-mono font-bold">{plan.price} {plan.period}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingVip(plan)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="Editar Plano"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocalVipPlans(localVipPlans.filter(p => p.id !== plan.id))}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                        title="Excluir Plano"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline VIP Editor Form */}
              {editingVip && (
                <div className="p-4 rounded-xl bg-black/60 border border-purple-500/50 space-y-3 mt-4 animate-fade-in">
                  <h5 className="font-bold text-purple-400 text-xs uppercase tracking-wider">
                    {localVipPlans.some(p => p.id === editingVip.id) ? 'Editar Plano VIP' : 'Criar Novo Plano VIP'}
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Nome do Plano</label>
                      <input
                        type="text"
                        value={editingVip.name}
                        onChange={(e) => setEditingVip({ ...editingVip, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Preço (Ex: R$ 19,90)</label>
                      <input
                        type="text"
                        value={editingVip.price}
                        onChange={(e) => setEditingVip({ ...editingVip, price: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Tag (Ex: Mais Vendido)</label>
                      <input
                        type="text"
                        value={editingVip.tag}
                        onChange={(e) => setEditingVip({ ...editingVip, tag: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Vantagens (uma por linha)</label>
                    <textarea
                      rows={3}
                      value={editingVip.benefits.join('\n')}
                      onChange={(e) => setEditingVip({ ...editingVip, benefits: e.target.value.split('\n') })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-sans"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingVip(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-700 text-xs font-bold text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (localVipPlans.some(p => p.id === editingVip.id)) {
                          setLocalVipPlans(localVipPlans.map(p => p.id === editingVip.id ? editingVip : p));
                        } else {
                          setLocalVipPlans([...localVipPlans, editingVip]);
                        }
                        setEditingVip(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-purple-600 text-xs font-bold text-white"
                    >
                      Salvar Plano
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: AGENDA DE LIVES */}
          {activeTab === 'agenda' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Cronograma Semanal</h4>
                <button
                  type="button"
                  onClick={() => setEditingSchedule({
                    id: `sch-${Date.now()}`,
                    dayOfWeek: 'Sábado',
                    time: '20:00 - 23:00',
                    game: 'Novo Jogo / Evento',
                    gameCategory: 'Gameplay',
                    description: 'Descrição do evento de live.',
                    isToday: false
                  })}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Horário</span>
                </button>
              </div>

              {/* Schedule Items List */}
              <div className="space-y-2">
                {localSchedule.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-red-400">{item.dayOfWeek}</span>
                        <span className="text-xs text-gray-400">({item.time})</span>
                        {item.isToday && <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">HOJE</span>}
                      </div>
                      <h5 className="font-bold text-white text-sm">{item.game}</h5>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingSchedule(item)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocalSchedule(localSchedule.filter(s => s.id !== item.id))}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline Schedule Form */}
              {editingSchedule && (
                <div className="p-4 rounded-xl bg-black/60 border border-red-500/50 space-y-3 mt-4 animate-fade-in">
                  <h5 className="font-bold text-red-400 text-xs uppercase tracking-wider">
                    {localSchedule.some(s => s.id === editingSchedule.id) ? 'Editar Horário' : 'Novo Horário na Agenda'}
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Dia da Semana</label>
                      <input
                        type="text"
                        value={editingSchedule.dayOfWeek}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, dayOfWeek: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Horário (Ex: 20:00 - 23:00)</label>
                      <input
                        type="text"
                        value={editingSchedule.time}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Jogo / Tema</label>
                      <input
                        type="text"
                        value={editingSchedule.game}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, game: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={editingSchedule.isToday || false}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, isToday: e.target.checked })}
                        className="rounded border-white/10 bg-white/5 text-red-600 focus:ring-0"
                      />
                      <span>Marcar como Live de HOJE</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingSchedule(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-700 text-xs font-bold text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (localSchedule.some(s => s.id === editingSchedule.id)) {
                          setLocalSchedule(localSchedule.map(s => s.id === editingSchedule.id ? editingSchedule : s));
                        } else {
                          setLocalSchedule([...localSchedule, editingSchedule]);
                        }
                        setEditingSchedule(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white"
                    >
                      Salvar Horário
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: NOTÍCIAS & ANÚNCIOS */}
          {activeTab === 'noticias' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Notícias e Avisos</h4>
                <button
                  type="button"
                  onClick={() => setEditingNews({
                    id: `news-${Date.now()}`,
                    title: 'Nova Notícia do Canal',
                    summary: 'Resumo da publicação...',
                    content: 'Conteúdo completo da matéria.',
                    category: 'Anúncio',
                    date: 'Hoje',
                    author: formDataInfo.name,
                    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80'
                  })}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar Notícia</span>
                </button>
              </div>

              {/* News Items List */}
              <div className="space-y-2">
                {localNews.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-red-400">{item.category}</span>
                        <h5 className="font-bold text-white text-xs truncate">{item.title}</h5>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingNews(item)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocalNews(localNews.filter(n => n.id !== item.id))}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline News Form */}
              {editingNews && (
                <div className="p-4 rounded-xl bg-black/60 border border-red-500/50 space-y-3 mt-4 animate-fade-in">
                  <h5 className="font-bold text-red-400 text-xs uppercase tracking-wider">
                    {localNews.some(n => n.id === editingNews.id) ? 'Editar Notícia' : 'Nova Notícia'}
                  </h5>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Título</label>
                    <input
                      type="text"
                      value={editingNews.title}
                      onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Resumo Curto</label>
                    <input
                      type="text"
                      value={editingNews.summary}
                      onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Imagem da Notícia (.jpg / .png / URL)</label>
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white cursor-pointer inline-flex items-center gap-1.5 flex-shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, (url) => setEditingNews({ ...editingNews, imageUrl: url }))}
                        />
                      </label>
                      <input
                        type="url"
                        value={editingNews.imageUrl}
                        onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Conteúdo Completo (Aceita texto e formatação)</label>
                    <textarea
                      rows={4}
                      value={editingNews.content}
                      onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-sans"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingNews(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-700 text-xs font-bold text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (localNews.some(n => n.id === editingNews.id)) {
                          setLocalNews(localNews.map(n => n.id === editingNews.id ? editingNews : n));
                        } else {
                          setLocalNews([...localNews, editingNews]);
                        }
                        setEditingNews(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white"
                    >
                      Salvar Notícia
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: LINKS & REDES OFICIAIS */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Links e Redes Oficiais</h4>
                <button
                  type="button"
                  onClick={() => setEditingLink({
                    id: `link-${Date.now()}`,
                    name: 'Nova Rede / Link',
                    description: 'Descrição do canal ou rede.',
                    url: 'https://exemplo.com',
                    badge: 'Novo',
                    category: 'other'
                  })}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Link</span>
                </button>
              </div>

              {/* Links List */}
              <div className="space-y-2">
                {localLinks.map((link) => (
                  <div key={link.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400">{link.badge || 'Link'}</span>
                      <h5 className="font-bold text-white text-sm">{link.name}</h5>
                      <span className="text-xs text-gray-400">{link.url}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingLink(link)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocalLinks(localLinks.filter(l => l.id !== link.id))}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline Link Form */}
              {editingLink && (
                <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/50 space-y-3 mt-4 animate-fade-in">
                  <h5 className="font-bold text-cyan-400 text-xs uppercase tracking-wider">
                    {localLinks.some(l => l.id === editingLink.id) ? 'Editar Link' : 'Novo Link'}
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Nome</label>
                      <input
                        type="text"
                        value={editingLink.name}
                        onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">URL / Endereço</label>
                      <input
                        type="url"
                        value={editingLink.url}
                        onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Descrição Curta</label>
                    <input
                      type="text"
                      value={editingLink.description}
                      onChange={(e) => setEditingLink({ ...editingLink, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingLink(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-700 text-xs font-bold text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (localLinks.some(l => l.id === editingLink.id)) {
                          setLocalLinks(localLinks.map(l => l.id === editingLink.id ? editingLink : l));
                        } else {
                          setLocalLinks([...localLinks, editingLink]);
                        }
                        setEditingLink(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-cyan-600 text-xs font-bold text-white"
                    >
                      Salvar Link
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 6: PERGUNTAS FREQUENTES (FAQ) */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Perguntas Frequentes</h4>
                <button
                  type="button"
                  onClick={() => setEditingFaq({
                    id: `faq-${Date.now()}`,
                    question: 'Nova pergunta do chat?',
                    answer: 'Resposta explicativa aqui...',
                    category: 'Geral'
                  })}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Pergunta</span>
                </button>
              </div>

              {/* FAQ Items List */}
              <div className="space-y-2">
                {localFaq.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-400">{item.category}</span>
                      <h5 className="font-bold text-white text-sm">{item.question}</h5>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(item)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocalFaq(localFaq.filter(f => f.id !== item.id))}
                        className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline FAQ Form */}
              {editingFaq && (
                <div className="p-4 rounded-xl bg-black/60 border border-purple-500/50 space-y-3 mt-4 animate-fade-in">
                  <h5 className="font-bold text-purple-400 text-xs uppercase tracking-wider">
                    {localFaq.some(f => f.id === editingFaq.id) ? 'Editar Pergunta' : 'Nova Pergunta'}
                  </h5>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Pergunta</label>
                    <input
                      type="text"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Resposta</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-sans"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-700 text-xs font-bold text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (localFaq.some(f => f.id === editingFaq.id)) {
                          setLocalFaq(localFaq.map(f => f.id === editingFaq.id ? editingFaq : f));
                        } else {
                          setLocalFaq([...localFaq, editingFaq]);
                        }
                        setEditingFaq(null);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-purple-600 text-xs font-bold text-white"
                    >
                      Salvar Pergunta
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetChannelInfo}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Tudo</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-950/50 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Salvo com Sucesso!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Todas Alterações</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
