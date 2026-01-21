
import React, { useState } from 'react';
import { WardrobeItem, Category } from '../types';

interface Props {
  wardrobe: WardrobeItem[];
}

const SmartWardrobe: React.FC<Props> = ({ wardrobe }) => {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const categories = ['全部', Category.TOP, Category.BOTTOM, Category.OUTER, Category.SHOES];
  
  const filteredItems = activeCategory === '全部' 
    ? wardrobe 
    : wardrobe.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col h-full animate-fade-in py-4">
      <h2 className="text-xl font-serif italic mb-8 px-2 text-zinc-800">数字档案 · Archive</h2>
      
      {/* 搜索 */}
      <div className="relative mb-8 px-2">
        <input 
          type="text" 
          placeholder="搜索单品或风格..." 
          className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 text-[11px] text-zinc-600 shadow-sm outline-none"
        />
        <svg className="absolute left-6 top-4 w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* 分类 */}
      <div className="flex gap-4 overflow-x-auto pb-6 mb-6 scrollbar-hide px-2">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-zinc-800 text-white shadow-md' : 'bg-white text-zinc-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 衣橱列表 */}
      <div className="grid grid-cols-2 gap-5 mb-20 px-2">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[32px] p-6 flex flex-col items-center border border-zinc-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-24 flex items-center justify-center mb-4 text-4xl">
              {item.category === Category.TOP ? '👔' : item.category === Category.BOTTOM ? '👖' : '🧥'}
            </div>
            <div className="w-full text-center">
               <div className="text-[10px] text-zinc-800 font-bold mb-1 truncate">{item.description}</div>
               <div className="text-[8px] text-zinc-400 uppercase tracking-widest">{item.color} · {item.style}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartWardrobe;
