import React, { useState, useRef } from 'react';
import { Copy, Download, Check, RefreshCw, FileJson, AlertCircle, Upload, Play, Loader2 } from 'lucide-react';
import { saveTextFile, formatPrompt } from '../utils/fileUtils';
import { RocreData } from '../types';
import { useAiExecution } from '../hooks/useAiExecution';
import { AI_PROVIDERS } from '../services/aiService';

interface PreviewPanelProps {
  data: RocreData;
  onClear: () => void;
  onImport: (data: RocreData) => void;
  isValid: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ data, onClear, onImport, isValid }) => {
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptText = formatPrompt(data);
  const isEmpty = Object.values(data).every((val) => (val as string).trim() === '');
  const isDisabled = isEmpty || !isValid;

  const { isLoading, error, result, execute, getApiKey } = useAiExecution();
  const [selectedProvider, setSelectedProvider] = useState<string>(AI_PROVIDERS[0].id);

  const handleCopy = async () => {
    // ... (existing copy logic)
  };

  const handleSaveTxt = () => {
    // ... (existing save txt logic)
  };

  const handleExportJson = () => {
    // ... (existing export logic)
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ... (existing import logic)
  };

  const handleClearClick = () => {
    // ... (existing clear logic)
  };

  const handleRun = async () => {
    if (isDisabled || isLoading) return;

    // Auto-select Gemini if available, or just use selected (future proof)
    const providerId = selectedProvider;
    await execute(providerId, promptText);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
        <div className="p-4 bg-slate-800 dark:bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Prompt Preview</h2>
            <p className="text-slate-400 text-xs">Generated output</p>
          </div>
          <div className="flex items-center gap-2">
            {/* ... import content ... */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
              title="Import JSON"
            >
              <Upload size={18} />
            </button>
            <button
              onClick={handleClearClick}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
              title="Clear All Inputs"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="relative bg-slate-50 dark:bg-slate-950 overflow-y-auto min-h-[300px] max-h-[50vh] transition-colors duration-200">
          <div className="p-6">
            <pre
              className={`w-full h-full whitespace-pre-wrap font-mono text-sm leading-relaxed ${isEmpty ? 'text-slate-400 dark:text-slate-500 italic' : 'text-slate-800 dark:text-slate-200'}`}
            >
              {promptText}
            </pre>
          </div>
        </div>

        {!isValid && !isEmpty && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-t border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium">
            <AlertCircle size={14} />
            Please complete required fields (Role, Objective)
          </div>
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2 transition-colors duration-200">
          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isDisabled || isLoading}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-bold transition-all shadow-md text-sm sm:col-span-4 mb-2 ${isDisabled
              ? 'bg-slate-300 dark:bg-slate-700 text-slate-100 dark:text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/25'
              }`}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isLoading ? 'Running with Gemini...' : 'Run with Gemini AI'}
          </button>

          <button
            onClick={handleCopy}
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all text-sm ${copied
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              : isDisabled
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>

          {/* ... Save buttons ... */}
          <button
            onClick={handleSaveTxt}
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm ${isDisabled
              ? 'bg-slate-300 dark:bg-slate-700 text-slate-100 dark:text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow'
              }`}
          >
            <Download size={16} />
            Txt
          </button>
          <button
            onClick={handleExportJson}
            disabled={isDisabled}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm sm:col-span-2 ${isDisabled
              ? 'bg-slate-300 dark:bg-slate-700 text-slate-100 dark:text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 dark:bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500 hover:shadow'
              }`}
          >
            <FileJson size={16} />
            JSON
          </button>
        </div>
      </div>

      {/* Result Display */}
      {(result || error) && (
        <div className={`rounded-xl shadow-lg border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 ${error ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-white border-indigo-200 dark:bg-slate-800 dark:border-indigo-900'}`}>
          <div className={`p-3 text-sm font-semibold flex items-center justify-between ${error ? 'text-red-700 dark:text-red-400 bg-red-100/50 dark:bg-red-900/40' : 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/40'}`}>
            <span>{error ? 'Execution Error' : 'AI Response'}</span>
            {!error && <span className="text-xs bg-indigo-200 dark:bg-indigo-800 px-2 py-0.5 rounded-full">Gemini 1.5 Flash</span>}
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <pre className={`whitespace-pre-wrap font-sans text-sm leading-relaxed ${error ? 'text-red-600 dark:text-red-300' : 'text-slate-800 dark:text-slate-200'}`}>
              {error || result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};


export default PreviewPanel;
