
export enum Category {
  TOP = '上装',
  BOTTOM = '下装',
  OUTER = '外套',
  SHOES = '鞋履',
  BAGS = '包袋',
  ACCESSORY = '配饰'
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  isPremium: boolean;
  avatarData?: {
    height: number;
    weight?: number;
    bodyType?: string;
    photoUrl?: string;
  }
}

export interface WardrobeItem {
  id: string;
  userId: string;
  category: Category;
  description: string;
  style: string;
  color: string;
  wearFrequency: number;
  lastWornDate?: string;
}

export interface AnalysisResult {
  garmentFeatures: string[];
  styleDescription: string;
  vibe: string;
  suggestedMatchFromWardrobe: string[];
  missingItemsToComplete: string[];
}
