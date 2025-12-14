import React from 'react';
import { RocreSectionConfig, RocreData, RocreOption } from '../types';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface SectionInputProps {
  config: RocreSectionConfig;
  value: string;
  onChange: (key: keyof RocreData, value: string) => void;
  onBlur: (key: keyof RocreData) => void;
  error?: string;
  options?: RocreOption[]; // Allow passing dynamic options that override config
}

const SectionInput: React.FC<SectionInputProps> = ({
  config,
  value,
  onChange,
  onBlur,
  error,
  options,
}) => {
  const Icon = config.icon;
  const displayOptions = options || config.options;

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      onChange(config.key, selectedValue);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border overflow-hidden transition-all duration-200 ${
        error
          ? 'border-red-300 dark:border-red-700 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div
        className={`p-4 border-b flex flex-col sm:flex-row sm:items-center gap-3 transition-colors duration-200 ${
          error
            ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30'
            : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50'
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm border ${
              error
                ? 'border-red-100 dark:border-red-800 text-red-500 dark:text-red-400'
                : `border-slate-100 dark:border-slate-600 ${config.color} dark:text-blue-400`
            }`}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              {config.label}
              {config.required && (
                <span className="text-red-500 font-bold" title="Required">
                  *
                </span>
              )}
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {config.shortLabel}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {config.description}
            </p>
          </div>
        </div>

        {displayOptions && displayOptions.length > 0 && (
          <div className="relative min-w-[200px] mt-2 sm:mt-0">
            <select
              onChange={handlePresetChange}
              className="w-full appearance-none bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-300 dark:focus:border-blue-700 cursor-pointer transition-colors"
              defaultValue=""
            >
              <option value="" disabled>
                Load Preset...
              </option>
              {displayOptions.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(config.key, e.target.value)}
          onBlur={() => onBlur(config.key)}
          placeholder={config.placeholder}
          className={`w-full min-h-[120px] p-3 rounded-lg border focus:ring-2 transition-all outline-none text-slate-700 dark:text-slate-200 text-sm resize-y font-mono 
            ${
              error
                ? 'border-red-200 dark:border-red-800 bg-red-50/10 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'
            }`}
        />
        {error && (
          <div className="mt-2 flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionInput;
