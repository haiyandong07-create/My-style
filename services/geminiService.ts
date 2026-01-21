
import { GoogleGenAI, Type } from "@google/genai";
import { WardrobeItem } from "../types";

// Always initialize GoogleGenAI with the API key from process.env.API_KEY using named parameter.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOutfitRecommendation = async (
  wardrobe: WardrobeItem[],
  mode: string
) => {
  const ai = getAI();
  const prompt = `我的衣橱：${JSON.stringify(wardrobe)}。
  当前日程/模式："${mode}"（包含场景描述）。
  
  请作为一名专业的私人时尚顾问，根据以上信息：
  1. 从衣橱中挑选最合适的搭配方案。
  2. 提供穿搭理由，并解释如何契合当天的“日程心情”。
  3. 提供进阶细节补全建议（配饰、鞋品）。
  
  回复语言：中文。风格：高级、克制、富有审美。`;

  // Using gemini-3-flash-preview for general text tasks as per guidelines.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};

export const analyzeInspirationImage = async (
  refImageBase64: string,
  userImageBase64: string,
  wardrobe: WardrobeItem[]
) => {
  const ai = getAI();
  
  const refPart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: refImageBase64,
    },
  };

  const userPart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: userImageBase64,
    },
  };

  const prompt = `任务：风格克隆与进阶建议。
  1. 第一张图片是灵感参考图。
  2. 第二张图片是用户照片。
  3. 可用衣橱：${JSON.stringify(wardrobe)}。

  识别参考图中的设计元素并进行风格分解。
  建议复刻造型的具体方案。
  额外识别用户衣橱中缺失的关键单品或套装建议，以完美达成灵感效果。
  
  请务必以中文返回 JSON 结果。`;

  // Using gemini-3-pro-preview for complex reasoning tasks.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [refPart, userPart, { text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          garmentFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
          styleDescription: { type: Type.STRING },
          vibe: { type: Type.STRING },
          suggestedMatchFromWardrobe: { type: Type.ARRAY, items: { type: Type.STRING } },
          missingItemsToComplete: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["garmentFeatures", "styleDescription", "vibe", "suggestedMatchFromWardrobe", "missingItemsToComplete"]
      }
    }
  });

  try {
    // Access response.text directly (do not call it as a method).
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI 解析失败", e);
    return null;
  }
};
