import React from 'react';
import { RocreSectionConfig, RocreData } from '../types';

interface SectionInputProps {
  config: RocreSectionConfig;
  value: string;
  onChange: (key: keyof RocreData, value: string) => void;
}

const SectionInput: React.FC<SectionInputProps> = ({ config, value, onChange }) => {
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors duration-200">
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${config.color}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            {config.label}
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
              {config.shortLabel}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{config.description}</p>
        </div>
      </div>
      <div className="p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(config.key, e.target.value)}
          placeholder={config.placeholder}
          className="w-full min-h-[120px] p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-700 text-sm resize-y font-mono bg-slate-50 focus:bg-white"
        />
      </div>
    </div>
  );
};

export default SectionInput;