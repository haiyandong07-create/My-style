
import React, { useState } from 'react';
import { WardrobeItem, User } from '../types';

interface Props {
  wardrobe: WardrobeItem[];
  currentUser: User;
  installAvailable: boolean;
  onInstall: () => void;
}

const StyleDNA: React.FC<Props> = ({ wardrobe, currentUser, installAvailable, onInstall }) => {
  const [activeSubTab, setActiveSubTab] = useState<'avatar' | 'stats'>('avatar');
  const topWorn = [...wardrobe].sort((a, b) => b.wearFrequency - a.wearFrequency).slice(0, 3);

  return (
    <div className="animate-fade-in space-y-6 pb-20">
      {/* 顶部标签切换 */}
      <div className="flex justify-center gap-10 mb-4">
        <button 
          onClick={() => setActiveSubTab('avatar')}
          className={`text-[10px] font-black tracking-[0.2em] uppercase pb-2 transition-all ${activeSubTab === 'avatar' ? 'text-zinc-800 border-b-2 border-zinc-800' : 'text-zinc-400'}`}
        >
          数字分身
        </button>
        <button 
          onClick={() => setActiveSubTab('stats')}
          className={`text-[10px] font-black tracking-[0.2em] uppercase pb-2 transition-all ${activeSubTab === 'stats' ? 'text-zinc-800 border-b-2 border-zinc-800' : 'text-zinc-400'}`}
        >
          风格画像
        </button>
      </div>

      {activeSubTab === 'avatar' && (
        <div className="space-y-6 animate-slideUp">
          <div className="relative glass-panel rounded-[40px] p-8 flex flex-col items-center overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 bg-zinc-50 opacity-[0.2] pointer-events-none"></div>
            
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-48 h-72 bg-zinc-100 rounded-3xl border border-zinc-200 flex items-center justify-center relative group overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&q=80&w=500" 
                  alt="2D 分身" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-6 text-center">
                <div className="text-xl font-serif italic text-zinc-800 uppercase tracking-tighter">{currentUser.name}</div>
                <div className="text-[8px] text-zinc-400 uppercase tracking-widest mt-1">编号: {currentUser.id.toUpperCase()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-8">
              <button className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl flex flex-col items-center active:scale-95 transition-all">
                <span className="text-lg mb-1">📸</span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase">更新分身照片</span>
              </button>
              <button className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl flex flex-col items-center active:scale-95 transition-all">
                <span className="text-lg mb-1">🧊</span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase">导出 3D 资产</span>
              </button>
            </div>
          </div>

          {/* 离线下载模块 */}
          <div className="glass-panel rounded-[32px] p-6 border border-indigo-100 bg-indigo-50/30">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                   <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                   </svg>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-zinc-800">离线下载与安装</h4>
                   <p className="text-[8px] text-zinc-400">将应用保存至主屏幕，离线也能随时查看衣橱</p>
                </div>
             </div>
             
             {installAvailable ? (
               <button 
                onClick={onInstall}
                className="w-full shuffle-btn py-3 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all shadow-lg"
               >
                 立即下载离线 App
               </button>
             ) : (
               <div className="text-[8px] text-zinc-500 bg-white/50 p-3 rounded-xl border border-zinc-100 text-center leading-relaxed">
                  提示：如需下载，请点击浏览器菜单中的<br/>
                  <b>“添加到主屏幕”</b> 或 <b>“安装应用”</b>
               </div>
             )}
          </div>
        </div>
      )}

      {activeSubTab === 'stats' && (
        <div className="space-y-8 animate-slideUp">
          <div className="flex flex-col items-center py-4">
            <div className="w-24 h-24 rounded-full border border-zinc-200 flex items-center justify-center relative mb-4">
              <div className="text-center">
                <div className="text-2xl font-serif text-zinc-800">知性</div>
                <div className="text-[7px] text-zinc-400 uppercase tracking-widest">审美调性</div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 text-center max-w-[200px] leading-relaxed italic">
              “ 您的穿搭风格倾向于极简与职场的融合，展现出冷静且富有逻辑的审美特征。”
            </p>
          </div>

          <section>
            <h3 className="text-[9px] text-zinc-400 font-black tracking-[0.2em] uppercase mb-4 px-1">高频穿着榜</h3>
            <div className="space-y-3">
              {topWorn.map((item, idx) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 group shadow-sm">
                  <div className="w-10 h-10 bg-zinc-50 rounded-2xl flex items-center justify-center text-lg">
                    {idx === 0 ? '👑' : '💎'}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[11px] font-bold text-zinc-800">{item.description}</span>
                      <span className="text-[9px] text-zinc-400">{item.wearFrequency}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-zinc-800 h-full" style={{ width: `${item.wearFrequency}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default StyleDNA;
