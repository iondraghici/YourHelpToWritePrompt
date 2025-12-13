import React from 'react';
import { X, Terminal, Monitor, BookOpen, Chrome } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-800">Instructions & Installation</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          
          {/* Usage Guide */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <BookOpen size={20} />
              <h3 className="font-bold text-lg">How to use ROCRE</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>The ROCRE framework helps you build powerful AI prompts by breaking them down into 5 key components:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Role:</strong> Who should the AI be? (e.g., "Expert Coder"). Use the dropdown to load expert presets.</li>
                <li><strong>Objective:</strong> What is the main task? The system intelligently suggests objectives based on your selected Role.</li>
                <li><strong>Context:</strong> Background info, audience, or data to guide the output.</li>
                <li><strong>Restrictions:</strong> What to avoid, formatting rules, or length constraints.</li>
                <li><strong>Examples:</strong> Show the AI what 'good' looks like (One-shot/Few-shot prompting).</li>
              </ul>
            </div>
          </section>

          {/* Local Installation */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <Terminal size={20} />
              <h3 className="font-bold text-lg">Local Installation</h3>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-x-auto">
              <p className="mb-2 text-slate-500"># 1. Create a new project (using Vite)</p>
              <p className="mb-4 text-yellow-300">npm create vite@latest rocre-architect -- --template react-ts</p>
              
              <p className="mb-2 text-slate-500"># 2. Install dependencies</p>
              <p className="mb-4">npm install lucide-react</p>
              
              <p className="mb-2 text-slate-500"># 3. Start the development server</p>
              <p className="text-green-400">npm run dev</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Ensure you have <a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="text-blue-600 underline">Node.js</a> installed.
              For PWA features to work locally, the app is served at <code className="bg-slate-100 px-1 rounded">http://localhost:3000</code> or similar.
            </p>
          </section>

          {/* Chrome Integration */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <Chrome size={20} />
              <h3 className="font-bold text-lg">Chrome Integration</h3>
            </div>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>You can install ROCRE Architect as a standalone app in Google Chrome (PWA):</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Open this application in <strong>Google Chrome</strong> (or Edge/Brave).</li>
                <li>Ensure you are viewing via <strong>localhost</strong> or <strong>HTTPS</strong>.</li>
                <li>Look for the <strong>Install icon</strong> <span className="inline-block align-middle bg-slate-200 rounded px-1 text-[10px] mx-1">↓</span> in the address bar (right side).</li>
                <li>Click <strong>Install</strong> to add it to your desktop or dock.</li>
                <li>Alternatively: <strong>Menu (⋮) &gt; Cast, Save and Share &gt; Install ROCRE Architect...</strong></li>
              </ol>
              <div className="mt-2 bg-blue-50 text-blue-700 p-3 rounded-lg border border-blue-100 flex gap-2">
                <Monitor size={16} className="shrink-0 mt-0.5" />
                <p className="text-xs">Once installed, ROCRE runs in its own window, behaves like a native Windows/Mac app, and can be pinned to your taskbar.</p>
              </div>
            </div>
          </section>

        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;