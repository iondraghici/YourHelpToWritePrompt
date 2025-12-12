import React, { useState } from 'react';
import { Copy, Download, Check, RefreshCw, FileJson } from 'lucide-react';
import { saveTextFile, formatPrompt } from '../utils/fileUtils';
import { RocreData } from '../types';

interface PreviewPanelProps {
  data: RocreData;
  onClear: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ data, onClear }) => {
  const [copied, setCopied] = useState(false);
  const promptText = formatPrompt(data);
  const isEmpty = Object.values(data).every((val) => (val as string).trim() === '');

  const handleCopy = async () => {
    if (isEmpty) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSaveTxt = () => {
    if (isEmpty) return;
    const timestamp = new Date().toISOString().slice(0, 10);
    saveTextFile(promptText, `rocre-prompt-${timestamp}.txt`);
  };

  const handleExportJson = () => {
    if (isEmpty) return;
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
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden sticky top-6">
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

      <div className="flex-1 p-0 relative bg-slate-50 overflow-y-auto max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-200px)]">
        <div className="absolute inset-0 p-6">
           <pre className={`w-full h-full whitespace-pre-wrap font-mono text-sm leading-relaxed ${isEmpty ? 'text-slate-400 italic' : 'text-slate-800'}`}>
            {promptText}
          </pre>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={handleCopy}
          disabled={isEmpty}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all text-sm ${
            copied
              ? 'bg-green-100 text-green-700 border border-green-200'
              : isEmpty
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <button
          onClick={handleSaveTxt}
          disabled={isEmpty}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm ${
            isEmpty
              ? 'bg-slate-300 text-slate-100 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow'
          }`}
        >
          <Download size={16} />
          Save .txt
        </button>

        <button
          onClick={handleExportJson}
          disabled={isEmpty}
          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-medium transition-all shadow-sm text-sm ${
            isEmpty
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