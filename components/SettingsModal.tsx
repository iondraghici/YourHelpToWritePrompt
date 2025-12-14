
import React, { useState, useEffect } from 'react';
import { X, Key, Check, Eye, EyeOff } from 'lucide-react';
import { AI_PROVIDERS } from '../services/aiService';
import { useAiExecution } from '../hooks/useAiExecution';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { getApiKey, saveApiKey } = useAiExecution();
    const [keys, setKeys] = useState<Record<string, string>>({});
    const [showKey, setShowKey] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (isOpen) {
            const initialKeys: Record<string, string> = {};
            AI_PROVIDERS.forEach((provider) => {
                initialKeys[provider.id] = getApiKey(provider.id) || '';
            });
            setKeys(initialKeys);
        }
    }, [isOpen]);

    const handleChange = (providerId: string, value: string) => {
        setKeys((prev) => ({ ...prev, [providerId]: value }));
    };

    const handleSave = (providerId: string) => {
        saveApiKey(providerId, keys[providerId]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <Key size={20} className="text-indigo-500" />
                        API Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Enter your API keys to enable direct execution of prompts based on the selected intent.
                        Keys are stored locally in your browser.
                    </p>

                    <div className="space-y-4">
                        {AI_PROVIDERS.map((provider) => (
                            <div key={provider.id}>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    {provider.name} API Key
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type={showKey[provider.id] ? 'text' : 'password'}
                                            value={keys[provider.id] || ''}
                                            onChange={(e) => handleChange(provider.id, e.target.value)}
                                            placeholder={`sk-...`}
                                            className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowKey((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        >
                                            {showKey[provider.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleSave(provider.id)}
                                        className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors"
                                        title="Save Key"
                                    >
                                        <Check size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
