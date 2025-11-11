
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

export const generateLogos = async (prompt: string, aspectRatio: AspectRatio): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 3,
        outputMimeType: 'image/png',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error generating images with Gemini API:", error);
    throw new Error("Failed to generate logos. Please check the console for more details.");
  }
};
