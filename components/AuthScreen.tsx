
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface Props {
  onLoginSuccess: (user: User) => void;
}

const AuthScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      const user = authService.register(email, name);
      onLoginSuccess(user);
    } else {
      const user = authService.login(email);
      if (user) {
        onLoginSuccess(user);
      } else {
        alert("账号不存在。");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2EB] flex flex-col items-center justify-center p-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-serif tracking-[0.2em] font-bold text-zinc-800 mb-2">STYLE GENIE</h1>
        <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em]">数字美学顾问 · Digital Aesthetic Advisor</p>
      </div>

      <div className="w-full max-w-xs bg-white p-10 rounded-[48px] shadow-2xl shadow-zinc-300/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <input 
              type="text" 
              placeholder="您的姓名" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 text-xs text-zinc-800 outline-none"
              required
            />
          )}
          <input 
            type="email" 
            placeholder="邮箱地址" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-6 text-xs text-zinc-800 outline-none"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-zinc-800 py-4 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest"
          >
            {isRegistering ? '开启数字档案' : '验证身份'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-8 text-[9px] text-zinc-400 font-bold uppercase tracking-widest"
        >
          {isRegistering ? '已有账号？去登录' : '没有账号？立即加入'}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
