
import React, { useState } from 'react';
import { analyzeInspirationImage } from '../services/geminiService';
import { WardrobeItem, AnalysisResult } from '../types';

interface Props {
  wardrobe: WardrobeItem[];
}

const InspirationClone: React.FC<Props> = ({ wardrobe }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    // 模拟 AI 克隆与匹配逻辑
    setTimeout(() => {
      setAnalysis({
        garmentFeatures: ["极简廓形", "高级灰色调", "垂坠材质"],
        styleDescription: "参考图中体现了典型的‘知识分子风’，建议利用您的灰色长裤和白色真丝衬衫进行复刻。",
        vibe: "知性 · 高级 · 冷静",
        suggestedMatchFromWardrobe: ["深灰色西装长裤", "白色丝绸衬衫"],
        missingItemsToComplete: ["黑色极简细腰带", "方头乐福鞋"]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="relative flex flex-col h-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-lg font-serif italic text-zinc-800">灵感工坊 · Lab</h2>
         <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">创意匹配中</div>
      </div>

      {/* 状态控制 */}
      <div className="flex gap-2 justify-center mb-8">
        <div className="px-5 py-2 glass-panel rounded-full text-[10px] text-zinc-500 border border-white/5">
           模型：数字分身 v1.0
        </div>
        <button onClick={handleAnalyze} className="px-6 py-2 bg-zinc-800 text-white rounded-full text-[10px] font-bold shadow-lg shadow-zinc-200">
           {loading ? "分析中..." : "开始克隆"}
        </button>
      </div>

      <div className="relative flex-grow flex flex-col items-center">
        <div className="w-full max-w-[310px] aspect-[3/5] bg-white rounded-[48px] overflow-hidden relative border border-zinc-100 shadow-2xl">
           
           {/* 浮动参考图卡片 */}
           <div className="absolute top-6 left-6 w-24 h-32 bg-zinc-100 rounded-2xl overflow-hidden border-2 border-white shadow-2xl z-20 group">
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="灵感源" />
              <div className="absolute top-2 left-2 text-[7px] bg-black/60 text-white px-1.5 py-0.5 rounded-full font-bold">灵感源</div>
           </div>

           {/* 主预览区 */}
           <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50/50">
              <img 
                src="https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=500" 
                alt="数字分身" 
                className={`w-full h-full object-contain ${loading ? 'opacity-20 blur-xl' : 'opacity-80'} transition-all duration-1000`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-indigo-400/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-16 h-16 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
           </div>

           {/* 扫描动画装饰 */}
           <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-indigo-500/5 to-transparent z-10"></div>
        </div>

        {/* 结果反馈 */}
        {analysis && (
          <div className="mt-6 w-full glass-panel p-6 rounded-[32px] border border-zinc-100 animate-slideUp">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                <h4 className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest">克隆匹配结果</h4>
             </div>
             <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {analysis.suggestedMatchFromWardrobe.map((item, i) => (
                   <div key={i} className="min-w-[110px] bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex flex-col items-center text-center">
                      <div className="text-xl mb-2">👔</div>
                      <div className="text-[9px] text-zinc-800 font-bold leading-tight">{item}</div>
                      <div className="text-[7px] text-zinc-400 mt-2 uppercase tracking-tighter">匹配已有单品</div>
                   </div>
                ))}
                {analysis.missingItemsToComplete.map((item, i) => (
                   <div key={i} className="min-w-[110px] bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
                      <div className="text-xl mb-2">🛍️</div>
                      <div className="text-[9px] text-indigo-800 font-bold leading-tight">{item}</div>
                      <div className="text-[7px] text-indigo-400 mt-2 uppercase tracking-tighter">心愿清单推荐</div>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspirationClone;
