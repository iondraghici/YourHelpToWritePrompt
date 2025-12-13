import React from 'react';
import { RocreSectionConfig, RocreData } from '../types';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface SectionInputProps {
  config: RocreSectionConfig;
  value: string;
  onChange: (key: keyof RocreData, value: string) => void;
  onBlur: (key: keyof RocreData) => void;
  error?: string;
}

const SectionInput: React.FC<SectionInputProps> = ({ config, value, onChange, onBlur, error }) => {
  const Icon = config.icon;

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      onChange(config.key, selectedValue);
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200 ${
        error 
          ? 'border-red-300 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center gap-3 ${error ? 'bg-red-50 border-red-100' : 'bg-slate-50/50 border-slate-100'}`}>
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 rounded-lg bg-white shadow-sm border ${error ? 'border-red-100 text-red-500' : `border-slate-100 ${config.color}`}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              {config.label}
              {config.required && <span className="text-red-500 font-bold" title="Required">*</span>}
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                {config.shortLabel}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{config.description}</p>
          </div>
        </div>

        {config.options && config.options.length > 0 && (
          <div className="relative min-w-[200px] mt-2 sm:mt-0">
            <select
              onChange={handlePresetChange}
              className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Load Preset...</option>
              {config.options.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>
      <div className="p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(config.key, e.target.value)}
          onBlur={() => onBlur(config.key)}
          placeholder={config.placeholder}
          className={`w-full min-h-[120px] p-3 rounded-lg border focus:ring-2 transition-all outline-none text-slate-700 text-sm resize-y font-mono 
            ${error 
              ? 'border-red-200 bg-red-50/10 focus:border-red-400 focus:ring-red-100' 
              : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-blue-100'
            }`}
        />
        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-red-600 text-xs font-medium animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionInput;