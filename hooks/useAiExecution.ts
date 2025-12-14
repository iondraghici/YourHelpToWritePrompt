
import { useState } from 'react';
import { AI_PROVIDERS } from '../services/aiService';

const KEYS_STORAGE_KEY = 'rocre_api_keys';

export const useAiExecution = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const getApiKey = (providerId: string): string | null => {
        try {
            const keys = JSON.parse(localStorage.getItem(KEYS_STORAGE_KEY) || '{}');
            return keys[providerId] || null;
        } catch {
            return null;
        }
    };

    const saveApiKey = (providerId: string, key: string) => {
        try {
            const keys = JSON.parse(localStorage.getItem(KEYS_STORAGE_KEY) || '{}');
            keys[providerId] = key.trim();
            localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys));
        } catch (e) {
            console.error('Failed to save API key', e);
        }
    };

    const execute = async (providerId: string, prompt: string) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const apiKey = getApiKey(providerId);
            if (!apiKey) {
                throw new Error(`No API key found for ${providerId}. Please add it in Settings.`);
            }

            const provider = AI_PROVIDERS.find((p) => p.id === providerId);
            if (!provider) {
                throw new Error('Provider not found');
            }

            const response = await provider.execute(apiKey, prompt);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        result,
        execute,
        getApiKey,
        saveApiKey,
        clearResult: () => setResult(null),
    };
};
