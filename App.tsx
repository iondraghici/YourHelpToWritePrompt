import React, { useState } from 'react';
import { PenTool, Loader2, Check, CircleHelp, Moon, Sun } from 'lucide-react';
import SectionInput from './components/SectionInput';
import PreviewPanel from './components/PreviewPanel';
import HelpModal from './components/HelpModal';
import {
  ROCRE_SECTIONS,
  getObjectivesForRole,
  getContextsForRole,
  getRestrictionsForRole,
  TASK_TYPES,
} from './constants';
import { useRocre } from './hooks/useRocre';
import { useDarkMode } from './hooks/useDarkMode';

import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const {
    rocreData,
    touched,
    saveStatus,
    errors,
    isValid,
    handleInputChange,
    handleInputBlur,
    handleClear,
    handleImport,
  } = useRocre();

  const { isDark, toggleTheme } = useDarkMode();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const getFilteredRoles = () => {
    if (!selectedIntent) return ROCRE_SECTIONS[0].options || [];

    const intent = TASK_TYPES.find((t) => t.value === selectedIntent);
    if (!intent) return ROCRE_SECTIONS[0].options || [];

    return (ROCRE_SECTIONS[0].options || []).filter((role) => {
      const lowerRole = role.label.toLowerCase();
      // Also check role description for better matching
      const lowerValue = role.value.toLowerCase();
      return intent.roleKeywords.some((keyword) =>
        lowerRole.includes(keyword) || lowerValue.includes(keyword)
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-200">
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <PenTool size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                ROCRE Architect
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Prompt Engineering Tool
              </p>
            </div>
          </div>

          <div className="flex items-center">
            {/* Status Indicator */}
            <div
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-300 mr-4 sm:mr-6 ${saveStatus === 'idle' ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
            >
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 size={14} className="animate-spin text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-500 dark:text-slate-400">Saving...</span>
                </>
              ) : (
                <>
                  <Check size={14} className="text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">Saved</span>
                </>
              )}
            </div>

            <div className="hidden md:block text-sm text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-6 mr-6">
              Role • Objective • Context • Restrictions • Examples
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors mr-3"
            >
              API Settings
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors mr-2"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="Help & Installation"
            >
              <CircleHelp size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-6">

            {/* Intent Selector */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-all hover:shadow-md">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                What is your main goal?
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedIntent(null)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${!selectedIntent
                    ? 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700'
                    }`}
                >
                  Show All
                </button>
                {TASK_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedIntent(type.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${selectedIntent === type.value
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700'
                      }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-blue-800 dark:text-blue-300 font-semibold mb-1">How to use</h2>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Fill in the sections below following the R.O.C.R.E. method. The prompt preview on
                  the right will update automatically as you type.
                </p>
              </div>
              <button
                onClick={() => setIsHelpOpen(true)}
                className="text-xs font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 underline mt-0.5 shrink-0 ml-4"
              >
                Read instructions
              </button>
            </div>

            {ROCRE_SECTIONS.map((section) => {
              // Calculate dynamic options based on Role
              const options =
                section.key === 'role'
                  ? getFilteredRoles()
                  : section.key === 'objective'
                    ? getObjectivesForRole(rocreData.role)
                    : section.key === 'context'
                      ? getContextsForRole(rocreData.role)
                      : section.key === 'restrictions'
                        ? getRestrictionsForRole(rocreData.role)
                        : section.options;
              return (
                <SectionInput
                  key={section.key}
                  config={{ ...section, options }}
                  value={rocreData[section.key as keyof typeof rocreData]}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  error={touched[section.key] ? errors[section.key] : undefined}
                  options={options}
                />
              );
            })}
          </div>

          {/* Right Column: Preview (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <PreviewPanel
                data={rocreData}
                onClear={handleClear}
                onImport={handleImport}
                isValid={isValid}
              />

              <div className="mt-6 text-center text-slate-400 dark:text-slate-500 text-xs">
                <p>Private & Secure. No data leaves your device.</p>
                <p className="mt-1">© {new Date().getFullYear()} ROCRE Architect</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
