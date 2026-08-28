import React from 'react';
import { Camera, BookOpen, History, Cpu, Sprout, BarChart3, Brain, Home as HomeIcon, Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface NavbarProps {
  activeTab: 'home' | 'scanner' | 'study' | 'dataset' | 'history' | 'architecture' | 'results';
  setActiveTab: (tab: 'home' | 'scanner' | 'study' | 'dataset' | 'history' | 'architecture' | 'results') => void;
  savedLogsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, savedLogsCount }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3">
          
          {/* Logo & Brand (Top row on mobile, Left on desktop) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg text-white tracking-tight whitespace-nowrap" translate="no">PAL<span className="text-emerald-400">A-I</span>S</span>
                  <div className="hidden lg:flex items-center flex-shrink-0 space-x-1.5 text-[10px] font-mono py-1 px-2.5 bg-slate-950 border border-slate-800 rounded-full text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-500 animate-pulse"></span>
                    <span className="whitespace-nowrap">DEEP LEARNING CALIBRATED • V2.4</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 hidden md:block truncate">
                  {t('Smart Crop Doctor & Leaf Health Scanner • Rice & Corn Pathology')}
                </p>
              </div>
            </div>

            {/* Language Switcher - Moved to right of logo on mobile for better visibility */}
            <div className="md:hidden relative group flex items-center z-50">
              <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700 transition-colors">
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-2 text-xs ${language === 'en' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>English</button>
                  <button onClick={() => setLanguage('tl')} className={`w-full text-left px-4 py-2 text-xs ${language === 'tl' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>Tagalog</button>
                  <button onClick={() => setLanguage('hil')} className={`w-full text-left px-4 py-2 text-xs ${language === 'hil' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>Ilonggo</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto space-x-2 md:space-x-4">
            {/* Navigation Links - Scrollable on mobile */}
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide w-full md:w-auto mask-fade-right">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'home'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Home')}</span>
              </button>
              <button
                onClick={() => setActiveTab('scanner')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'scanner'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Camera Scanner')}</span>
              </button>
              <button
                onClick={() => setActiveTab('study')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'study'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Brain className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{t('Deep Learning Study')}</span>
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'results'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{t('Results & Figures')}</span>
              </button>
              <button
                onClick={() => setActiveTab('dataset')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'dataset'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Dataset Library')}</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-shrink-0 relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Field Logs')}</span>
                {savedLogsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-emerald-400 text-slate-900 font-bold">
                    {savedLogsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex-shrink-0 flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
                title="View Hybrid Pipeline Architecture details"
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline">{t('Model Pipeline Specs')}</span>
              </button>
            </nav>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:block relative group flex-shrink-0 z-50">
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700 transition-colors">
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{language}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-2 text-xs ${language === 'en' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>English</button>
                  <button onClick={() => setLanguage('tl')} className={`w-full text-left px-4 py-2 text-xs ${language === 'tl' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>Tagalog</button>
                  <button onClick={() => setLanguage('hil')} className={`w-full text-left px-4 py-2 text-xs ${language === 'hil' ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300 hover:bg-slate-700'}`}>Ilonggo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
