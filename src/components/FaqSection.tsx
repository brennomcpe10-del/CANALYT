import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Settings, Trash2 } from 'lucide-react';
import { FaqItem, ChannelInfo } from '../types';

interface FaqSectionProps {
  faqList: FaqItem[];
  channelInfo: ChannelInfo;
  onManage?: () => void;
  onDeleteFaq?: (id: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqList, channelInfo, onManage, onDeleteFaq }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'LivePix', 'Lives', 'Discord', 'VIP', 'Geral'];

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaq = faqList.filter(item => {
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 relative bg-[#0a0c14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Perguntas <span className="text-gradient-purple">Frequentes</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Respostas rápidas sobre LivePix, eventos no Discord, Loja VIP e horários de lives.
          </p>

          {onManage && (
            <div className="mt-4">
              <button
                onClick={onManage}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Gerenciar / Editar Perguntas</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Category Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar pergunta (ex: LivePix, VIP, Discord)..."
              className="w-full bg-[#121622] border border-white/10 focus:border-purple-500 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-[#121622] rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-purple-500/50 shadow-lg shadow-purple-950/20' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {item.category}
                      </span>
                      <span>{item.question}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {onManage && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            onManage();
                          }}
                          className="p-1.5 rounded-lg bg-black/40 hover:bg-purple-600 text-gray-400 hover:text-white transition-all cursor-pointer"
                          title="Editar Pergunta"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {onDeleteFaq && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Tem certeza que deseja excluir a pergunta "${item.question}"?`)) {
                              onDeleteFaq(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-black/40 hover:bg-red-600 text-gray-400 hover:text-white transition-all cursor-pointer"
                          title="Excluir Pergunta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-purple-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 font-sans">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#121622] rounded-2xl border border-white/10">
              <HelpCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Nenhuma pergunta encontrada para sua busca.</p>
            </div>
          )}
        </div>

        {/* Discord CTA if question not answered */}
        <div className="mt-12 p-6 rounded-2xl bg-card-dark border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Não encontrou sua resposta?</h4>
            <p className="text-xs text-gray-400">Nossa equipe de moderação responde no canal #suporte no Discord!</p>
          </div>
          <a
            href={channelInfo.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Perguntar no Discord</span>
          </a>
        </div>

      </div>
    </section>
  );
};
