
import { User, WardrobeItem } from "../types";

const USERS_KEY = 'style_genie_users';
const SESSION_KEY = 'style_genie_session';

export const authService = {
  register: (email: string, name: string): User => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      isPremium: true
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  login: (email: string): User | null => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  getCurrentSession: (): User | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getAllUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  deleteUser: (userId: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const filteredUsers = users.filter(u => u.id !== userId);
    localStorage.setItem(USERS_KEY, JSON.stringify(filteredUsers));
    localStorage.removeItem(`wardrobe_${userId}`);
  },

  getUserWardrobe: (userId: string): WardrobeItem[] => {
    const data = localStorage.getItem(`wardrobe_${userId}`);
    return data ? JSON.parse(data) : [];
  },

  saveUserWardrobe: (userId: string, wardrobe: WardrobeItem[]) => {
    localStorage.setItem(`wardrobe_${userId}`, JSON.stringify(wardrobe));
  }
};
