
import React, { useState } from 'react';
import { WardrobeItem } from '../types';
import { generateOutfitRecommendation } from '../services/geminiService';

interface Props {
  wardrobe: WardrobeItem[];
}

const DailyMirror: React.FC<Props> = ({ wardrobe }) => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleShuffle = async () => {
    setLoading(true);
    try {
      const result = await generateOutfitRecommendation(wardrobe, "复古职场风格");
      setRecommendation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col animate-fade-in pb-12">
      {/* 顶部标题 */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-serif tracking-[0.3em] font-bold text-zinc-800">STYLE GENIE</h1>
      </div>

      {/* 主展示区卡片 */}
      <div className="relative bg-white rounded-[40px] p-6 shadow-xl shadow-zinc-200/50 mb-8 overflow-hidden">
        {/* 天气与日程卡片 */}
        <div className="absolute top-8 left-8 z-20 flex flex-col items-start bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/40">
           <div className="flex items-center gap-2 mb-1">
             <span className="text-xl font-medium">22°C</span>
             <svg className="w-4 h-4 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
           </div>
           <div className="text-[10px] text-zinc-500 font-bold">多云 · 商务会议</div>
        </div>

        {/* 主图容器 */}
        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=1000" 
            alt="推荐穿搭" 
            className={`w-full h-full object-cover transition-all duration-1000 ${loading ? 'scale-110 blur-sm brightness-90' : 'scale-100'}`}
          />
          
          {/* AI 标注点 (Callouts) */}
          <div className="absolute top-[25%] right-[15%]">
             <div className="bg-white/40 backdrop-blur-sm border border-white/60 px-3 py-1.5 rounded-full text-[8px] text-white shadow-sm">幸运色</div>
          </div>
          <div className="absolute bottom-[35%] right-[25%]">
             <div className="bg-white/40 backdrop-blur-sm border border-white/60 px-3 py-1.5 rounded-full text-[8px] text-white shadow-sm">幸运色</div>
          </div>
          <div className="absolute bottom-[20%] left-[25%]">
             <div className="bg-white/40 backdrop-blur-sm border border-white/60 px-3 py-1.5 rounded-full text-[8px] text-white shadow-sm">显腿长视觉</div>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
              <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* 风格标题与单品滑动区 */}
      <div className="px-2">
        <h2 className="text-lg font-serif italic text-zinc-800 mb-6">复古职场风 · Business Vintage</h2>
        
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {/* 推荐项 1 */}
          <div className="min-w-[120px] aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 p-2">
             <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover rounded-2xl" />
          </div>
          {/* 推荐项 2 */}
          <div className="min-w-[120px] aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100 p-2">
             <img src="https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover rounded-2xl" />
          </div>
          {/* 推荐项 3 (待补全项) */}
          <div className="min-w-[120px] aspect-[4/5] bg-white rounded-3xl border-2 border-dashed border-zinc-100 p-4 flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center mb-3">
                <img src="https://cdn-icons-png.flaticon.com/512/3261/3261313.png" className="w-6 h-6 opacity-40" />
             </div>
             <div className="text-[8px] text-zinc-400 font-bold uppercase leading-tight">还差 1 件单品补全造型</div>
          </div>
        </div>
      </div>

      {/* Shuffle 按钮区域 */}
      <div className="flex flex-col items-center mt-10">
        <button 
          onClick={handleShuffle}
          disabled={loading}
          className="w-20 h-20 rounded-full shuffle-btn flex items-center justify-center active:scale-90 transition-transform shadow-xl mb-4"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>
        <span className="text-xs font-medium text-zinc-400">重组搭配</span>
      </div>
    </div>
  );
};

export default DailyMirror;
