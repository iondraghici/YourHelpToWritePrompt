import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PenTool, Loader2, Check, CircleHelp } from 'lucide-react';
import SectionInput from './components/SectionInput';
import PreviewPanel from './components/PreviewPanel';
import HelpModal from './components/HelpModal';
import { ROCRE_SECTIONS, INITIAL_DATA, getObjectivesForRole } from './constants';
import { RocreData } from './types';

const STORAGE_KEY = 'rocre_saved_data';

const App: React.FC = () => {
  // Initialize state from localStorage if available, otherwise use INITIAL_DATA
  const [rocreData, setRocreData] = useState<RocreData>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : INITIAL_DATA;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return INITIAL_DATA;
    }
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const isFirstRender = useRef(true);

  // Validate data
  const errors = useMemo(() => {
    const newErrors: Record<string, string> = {};
    ROCRE_SECTIONS.forEach((section) => {
      if (section.required && !rocreData[section.key].trim()) {
        newErrors[section.key] = `${section.label} is required`;
      }
    });
    return newErrors;
  }, [rocreData]);

  const isValid = Object.keys(errors).length === 0;

  // Save to localStorage whenever rocreData changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rocreData));
      setSaveStatus('saved');
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }

    const timer = setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);

    return () => clearTimeout(timer);
  }, [rocreData]);

  const handleInputChange = (key: keyof RocreData, value: string) => {
    setSaveStatus('saving');
    setRocreData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputBlur = (key: keyof RocreData) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const handleClear = () => {
    setSaveStatus('saving');
    setRocreData(INITIAL_DATA);
    setTouched({}); // Reset touched state so errors don't show immediately
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <PenTool size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ROCRE Architect</h1>
              <p className="text-xs text-slate-500 font-medium">Prompt Engineering Tool</p>
            </div>
          </div>
          
          <div className="flex items-center">
             {/* Status Indicator */}
            <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-300 mr-4 sm:mr-6 ${saveStatus === 'idle' ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 size={14} className="animate-spin text-blue-600" />
                  <span className="text-slate-500">Saving...</span>
                </>
              ) : (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="text-green-600">Saved</span>
                </>
              )}
            </div>

            <div className="hidden md:block text-sm text-slate-500 border-l border-slate-200 pl-6 mr-6">
              Role • Objective • Context • Restrictions • Examples
            </div>

            <button 
              onClick={() => setIsHelpOpen(true)}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-blue-800 font-semibold mb-1">How to use</h2>
                <p className="text-blue-600 text-sm">
                  Fill in the sections below following the R.O.C.R.E. method. The prompt preview on the right will update automatically as you type.
                </p>
              </div>
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="text-xs font-medium text-blue-700 hover:text-blue-800 underline mt-0.5 shrink-0 ml-4"
              >
                Read instructions
              </button>
            </div>

            {ROCRE_SECTIONS.map((section) => {
              // Calculate dynamic options for Objective based on Role
              const dynamicOptions = section.key === 'objective' 
                ? getObjectivesForRole(rocreData.role) 
                : undefined;

              return (
                <SectionInput
                  key={section.key}
                  config={section}
                  value={rocreData[section.key]}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  error={touched[section.key] ? errors[section.key] : undefined}
                  options={dynamicOptions}
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
                isValid={isValid}
              />
              
              <div className="mt-6 text-center text-slate-400 text-xs">
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