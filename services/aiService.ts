
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIProvider {
    id: string;
    name: string;
    execute: (apiKey: string, prompt: string) => Promise<string>;
}

export const executeGemini = async (apiKey: string, prompt: string): Promise<string> => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error(error instanceof Error ? error.message : 'Unknown Gemini API Error');
    }
};

export const AI_PROVIDERS: AIProvider[] = [
    {
        id: 'gemini',
        name: 'Google Gemini',
        execute: executeGemini,
    },
    // Future providers can be added here
];
