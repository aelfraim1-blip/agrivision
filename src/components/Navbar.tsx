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
    <header className="sticky top-0 z-40 bg-[#064e3b] backdrop-blur-md border-b-2 border-amber-500/40 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-3">
          
          {/* Logo & Brand (Top row on mobile, Left on desktop) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-md">
                <Sprout className="w-6 h-6 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg text-white tracking-tight whitespace-nowrap" translate="no">AI-<span className="text-amber-400">RIZE</span></span>
                  <div className="hidden lg:flex items-center flex-shrink-0 space-x-1.5 text-[10px] font-mono py-1 px-2.5 bg-[#033427] border border-amber-400/40 rounded-full text-amber-300 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400 animate-pulse"></span>
                    <span className="whitespace-nowrap font-bold">DEEP LEARNING CALIBRATED • V2.4</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-100/90 hidden md:block truncate">
                  {t('Smart Crop Doctor & Leaf Health Scanner • Rice & Corn Pathology')}
                </p>
              </div>
            </div>

            {/* Language Switcher - Moved to right of logo on mobile for better visibility */}
            <div className="md:hidden relative group flex items-center z-50">
              <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-amber-400/40 bg-[#043e2f] text-amber-200 text-xs font-semibold cursor-pointer hover:bg-[#033427] transition-colors shadow-sm">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase">{language}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#043e2f] border border-amber-500/40 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'en' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>English</button>
                  <button onClick={() => setLanguage('tl')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'tl' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>Tagalog</button>
                  <button onClick={() => setLanguage('hil')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'hil' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>Ilonggo</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto space-x-2 md:space-x-4">
            {/* Navigation Links - Scrollable on mobile */}
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide w-full md:w-auto mask-fade-right">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Home')}</span>
              </button>
              <button
                onClick={() => setActiveTab('scanner')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'scanner'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Camera Scanner')}</span>
              </button>
              <button
                onClick={() => setActiveTab('study')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'study'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Deep Learning Study')}</span>
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'results'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Results & Figures')}</span>
              </button>
              <button
                onClick={() => setActiveTab('dataset')}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'dataset'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Dataset Library')}</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-shrink-0 relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold shadow-md ring-1 ring-amber-300'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">{t('Field Logs')}</span>
                {savedLogsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-amber-400 text-emerald-950 font-extrabold shadow-sm">
                    {savedLogsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex-shrink-0 flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-amber-400/20 border-amber-300 text-amber-200'
                    : 'border-emerald-700/80 bg-[#043e2f] text-emerald-200 hover:border-amber-400/60 hover:text-white'
                }`}
                title="View Hybrid Pipeline Architecture details"
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{t('Model Pipeline Specs')}</span>
              </button>
            </nav>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:block relative group flex-shrink-0 z-50">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-400/40 bg-[#043e2f] text-amber-200 text-xs font-semibold cursor-pointer hover:bg-[#033427] hover:text-white transition-colors shadow-sm">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase">{language}</span>
              </div>
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#043e2f] border border-amber-500/40 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'en' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>English</button>
                  <button onClick={() => setLanguage('tl')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'tl' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>Tagalog</button>
                  <button onClick={() => setLanguage('hil')} className={`w-full text-left px-4 py-2 text-xs font-medium ${language === 'hil' ? 'text-amber-300 bg-[#064e3b]' : 'text-emerald-100 hover:bg-[#064e3b]'}`}>Ilonggo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
