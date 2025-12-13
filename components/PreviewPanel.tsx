import React, { useState } from 'react';
import { Copy, Download, Check, RefreshCw, FileJson, AlertCircle } from 'lucide-react';
import { saveTextFile, formatPrompt } from '../utils/fileUtils';
import { RocreData } from '../types';

interface PreviewPanelProps {
  data: RocreData;
  onClear: () => void;
  isValid: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ data, onClear, isValid }) => {
  const [copied, setCopied] = useState(false);
  const promptText = formatPrompt(data);
  const isEmpty = Object.values(data).every((val) => (val as string).trim() === '');
  const isDisabled = isEmpty || !isValid;

  const handleCopy = async () => {
    if (isDisabled) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSaveTxt = () => {
    if (isDisabled) return;
    const timestamp = new Date().toISOString().slice(0, 10);
    saveTextFile(promptText, `rocre-prompt-${timestamp}.txt`);
  };

  const handleExportJson = () => {
    if (isDisabled) return;
    const timestamp = new Date().toISOString().slice(0, 10);
    const jsonContent = JSON.stringify(data, null, 2);
    saveTextFile(jsonContent, `rocre-data-${timestamp}.json`, 'application/json');
  };

  const handleClearClick = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      onClear();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-800 text-white flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Prompt Preview</h2>
          <p className="text-slate-400 text-xs">Generated output</p>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={handleClearClick}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            title="Clear All Inputs"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="relative bg-slate-50 overflow-y-auto min-h-[300px] max-h-[60vh]">
        <div className="p-6">
           <pre className={`w-full h-full whitespace-pre-wrap font-mono text-sm leading-relaxed ${isEmpty ? 'text-slate-400 italic' : 'text-slate-800'}`}>
            {promptText}
          </pre>
        </div>
      </div>

      {!isValid && !isEmpty && (
        <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center justify-center gap-2 text-red-600 text-xs font-medium">
          <AlertCircle size={14} />
          Please complete required fields (Role, Objective)
        </div>
      )}

      <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={handleCopy}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all text-sm ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : isDisabled
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleSaveTxt}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm ${
            isDisabled
              ? 'bg-slate-300 text-slate-100 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow'
          }`}
        >
          <Download size={16} />
          Save .txt
        </button>

        <button
          onClick={handleExportJson}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm ${
            isDisabled
              ? 'bg-slate-300 text-slate-100 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow'
          }`}
        >
          <FileJson size={16} />
          Save JSON
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;