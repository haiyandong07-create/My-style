
import React, { useState, useEffect, useRef } from 'react';
import { Category, WardrobeItem, User } from './types';
import DailyMirror from './components/DailyMirror';
import SmartWardrobe from './components/SmartWardrobe';
import InspirationClone from './components/InspirationClone';
import StyleDNA from './components/StyleDNA';
import AuthScreen from './components/AuthScreen';
import AdminConsole from './components/AdminConsole';
import { authService } from './services/authService';

const INITIAL_WARDROBE: (userId: string) => WardrobeItem[] = (userId) => [
  { id: '1', userId, category: Category.TOP, description: '白色丝绸衬衫', style: '职场', color: '白色', wearFrequency: 85 },
  { id: '2', userId, category: Category.BOTTOM, description: '深灰色西装长裤', style: '职场', color: '灰色', wearFrequency: 62 },
  { id: '3', userId, category: Category.OUTER, description: '驼色羊绒大衣', style: '复古', color: '驼色', wearFrequency: 12 },
  { id: '4', userId, category: Category.BOTTOM, description: '蓝色直筒牛仔裤', style: '休闲', color: '蓝色', wearFrequency: 90 },
  { id: '5', userId, category: Category.SHOES, description: '黑色方头皮鞋', style: '简约', color: '黑色', wearFrequency: 75 },
  { id: '6', userId, category: Category.BAGS, description: '极简手提包', style: '商务', color: '棕色', wearFrequency: 15 },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'mirror' | 'wardrobe' | 'clone' | 'dna'>('mirror');
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session) {
      handleLoginSuccess(session);
    }

    // 监听 PWA 安装事件
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      console.log('PWA 已安装');
    });
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    const userWardrobe = authService.getUserWardrobe(user.id);
    if (userWardrobe.length === 0) {
      const defaultItems = INITIAL_WARDROBE(user.id);
      setWardrobe(defaultItems);
      authService.saveUserWardrobe(user.id, defaultItems);
    } else {
      setWardrobe(userWardrobe);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setWardrobe([]);
    setActiveTab('mirror');
  };

  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setIsAdminVisible(true);
    }, 3000);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2EB] flex flex-col items-center safe-top select-none text-zinc-800">
      {isAdminVisible && <AdminConsole onClose={() => setIsAdminVisible(false)} />}

      <header 
        className="w-full max-w-md px-8 pt-8 pb-2 flex justify-between items-center z-10 opacity-60"
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
          {activeTab === 'mirror' ? '搭配魔镜' : activeTab === 'wardrobe' ? '数字档案' : activeTab === 'clone' ? '灵感实验室' : '风格DNA'}
        </div>
        <button onClick={handleLogout} className="text-[10px] text-zinc-400 font-bold uppercase hover:text-red-500 transition-colors">退出登录</button>
      </header>

      <main className="w-full max-w-md flex-grow overflow-y-auto pb-40 px-6 scrollbar-hide">
        {activeTab === 'mirror' && <DailyMirror wardrobe={wardrobe} />}
        {activeTab === 'wardrobe' && <SmartWardrobe wardrobe={wardrobe} />}
        {activeTab === 'clone' && <InspirationClone wardrobe={wardrobe} />}
        {activeTab === 'dna' && (
          <StyleDNA 
            wardrobe={wardrobe} 
            currentUser={currentUser} 
            installAvailable={!!deferredPrompt}
            onInstall={handleInstallApp}
          />
        )}
      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white/70 backdrop-blur-xl rounded-[32px] px-6 py-4 flex justify-between items-center shadow-lg shadow-zinc-200/50 z-50 safe-bottom border border-white/50">
        <NavButton icon="mirror" label="魔镜" active={activeTab === 'mirror'} onClick={() => setActiveTab('mirror')} />
        <NavButton icon="closet" label="档案" active={activeTab === 'wardrobe'} onClick={() => setActiveTab('wardrobe')} />
        <NavButton icon="vibe" label="工坊" active={activeTab === 'clone'} onClick={() => setActiveTab('clone')} />
        <NavButton icon="user" label="DNA" active={activeTab === 'dna'} onClick={() => setActiveTab('dna')} />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`p-3 rounded-2xl transition-all flex flex-col items-center gap-0.5 ${active ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-400'}`}>
      {icon === 'closet' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
      {icon === 'mirror' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
      {icon === 'vibe' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.718 2.154a2 2 0 01-3.793 0l-.718-2.154a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-1.414 1.414a2 2 0 01-3.414-1.414V5a2 2 0 012-2h14a2 2 0 012 2v10.428a2 2 0 01-3.414 1.414l-1.414-1.414z" /></svg>}
      {icon === 'user' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
      <span className="text-[7px] font-bold">{label}</span>
  </button>
);

export default App;
