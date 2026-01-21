
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface Props {
  onClose: () => void;
}

const AdminConsole: React.FC<Props> = ({ onClose }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(authService.getAllUsers());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("确定要删除该用户及其全部数据吗？此操作不可撤销。")) {
      authService.deleteUser(id);
      setUsers(authService.getAllUsers());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-fade-in safe-top">
      <header className="px-8 py-10 flex justify-between items-center border-b border-white/5">
        <div>
          <h2 className="text-xl font-serif italic text-white">System Console</h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">系统管理 · 隐身模式</p>
        </div>
        <button onClick={onClose} className="p-4 rounded-full bg-white/5 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <div className="flex-grow overflow-y-auto px-6 py-8 space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase mb-1">总注册用户</div>
              <div className="text-2xl font-light text-white">{users.length}</div>
           </div>
           <div className="bg-white/5 p-5 rounded-3xl border border-white/10">
              <div className="text-[10px] text-zinc-500 uppercase mb-1">服务状态</div>
              <div className="text-xs text-green-500 font-bold flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 运行正常
              </div>
           </div>
        </div>

        <h3 className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] px-2 mb-2">已注册账户列表</h3>
        {users.map(user => (
          <div key={user.id} className="bg-white/5 p-6 rounded-[32px] flex justify-between items-center border border-white/5 group">
            <div>
              <div className="text-sm font-bold text-zinc-200">{user.name}</div>
              <div className="text-[10px] text-zinc-500 mt-1">{user.email}</div>
              <div className="mt-3 flex gap-2">
                <span className="text-[7px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full uppercase">编号: {user.id}</span>
                {user.isPremium && <span className="text-[7px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full uppercase">高级会员</span>}
              </div>
            </div>
            <button 
              onClick={() => handleDelete(user.id)}
              className="p-3 rounded-2xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-20 text-zinc-700 text-xs">暂无注册用户信息。</div>
        )}
      </div>

      <footer className="p-8 border-t border-white/5 text-center">
        <p className="text-[8px] text-zinc-600 uppercase tracking-widest leading-loose">
          Style Genie 基础设施 · 内部访问权限<br/>
          所有数据仅本地存储在沙盒中
        </p>
      </footer>
    </div>
  );
};

export default AdminConsole;
