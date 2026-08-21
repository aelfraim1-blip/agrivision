import React from 'react';
import { Camera, BookOpen, History, Cpu, Sprout, BarChart3 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'scanner' | 'dataset' | 'history' | 'architecture' | 'results';
  setActiveTab: (tab: 'scanner' | 'dataset' | 'history' | 'architecture' | 'results') => void;
  savedLogsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedLogsCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">PALA-IS<span className="text-emerald-400"> AI</span></span>
                <div className="hidden lg:flex items-center space-x-1.5 text-[10px] font-mono py-1 px-2.5 bg-slate-950 border border-slate-800 rounded-full text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>SYSTEM READY: HYBRID PIPELINE V2.4</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Crop Doctor & Leaf Health Scanner • Instant Rice & Corn Pathology
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'scanner'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Camera Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'results'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Results &amp; Figures</span>
            </button>

            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dataset'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Dataset Library</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Field Logs</span>
              {savedLogsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-emerald-400 text-slate-900 font-bold">
                  {savedLogsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                  : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
              title="View Hybrid Pipeline Architecture details"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Model Pipeline Specs</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
