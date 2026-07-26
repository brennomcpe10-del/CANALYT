import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, Tag, Pin, Settings, Trash2 } from 'lucide-react';
import { NewsItem } from '../types';
import { NewsModal } from './NewsModal';

interface NewsSectionProps {
  newsList: NewsItem[];
  onManage?: () => void;
  onDeleteNews?: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsList, onManage, onDeleteNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

  const categories = ['Todos', 'Anúncio', 'Servidor VIP', 'Sorteio', 'Atualização'];

  const filteredNews = selectedCategory === 'Todos'
    ? newsList
    : newsList.filter(item => item.category === selectedCategory);

  return (
    <section id="noticias" className="py-20 relative bg-[#0a0c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Newspaper className="w-4 h-4" />
            <span>Fique por Dentro</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-4">
            Notícias & <span className="text-gradient-red">Anúncios</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Acompanhe as últimas novidades do canal, sorteios de PIX, atualizações de servidores e avisos da comunidade.
          </p>

          {onManage && (
            <div className="mt-4">
              <button
                onClick={onManage}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Gerenciar / Publicar Notícias</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/50'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveNews(item)}
              className="bg-[#121622] rounded-2xl border border-white/10 hover:border-red-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group shadow-xl hover:-translate-y-1"
            >
              {/* Image & Tag Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-black/20"></div>

                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
                  {item.category}
                </span>

                {item.pinned && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1 shadow-md">
                    <Pin className="w-3 h-3" />
                    Fixado
                  </span>
                )}

                {/* Quick Admin Actions */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {onManage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onManage();
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                      title="Editar Notícia"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteNews && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Tem certeza que deseja excluir a notícia "${item.title}"?`)) {
                          onDeleteNews(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-all"
                      title="Excluir Notícia"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                  <span>Ler Matéria Completa</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Post Modal */}
      <NewsModal news={activeNews} onClose={() => setActiveNews(null)} />
    </section>
  );
};
