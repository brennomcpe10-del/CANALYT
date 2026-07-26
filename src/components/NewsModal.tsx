import React from 'react';
import { X, Calendar, User, Tag, Share2 } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#121622] border border-white/10 rounded-2xl max-w-2xl w-full my-8 relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/60 hover:bg-black/90 p-2 rounded-full backdrop-blur-md transition-all border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-red-600 text-white text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-md tracking-wider">
              {news.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-2 leading-tight">
              {news.title}
            </h2>
          </div>
        </div>

        {/* Post Metadata */}
        <div className="p-6 pt-2 space-y-6">
          <div className="flex items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>{news.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-400" />
              <span>Por {news.author}</span>
            </div>
          </div>

          {/* Full Markdown Content */}
          <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {news.content}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-500">Comunidade Oficial Nexus</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
            >
              Fechar Matéria
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
