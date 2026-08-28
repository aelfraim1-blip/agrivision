import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Network, Zap, ShieldCheck, Activity, BrainCircuit, ScanSearch } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setActiveTab: (tab: 'home' | 'scanner' | 'study' | 'dataset' | 'history' | 'architecture' | 'results') => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-indigo-900/20 z-0" />
        <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-28 lg:px-20 lg:py-32 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 bg-slate-950/50 backdrop-blur-sm border border-emerald-500/30 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">Deep Learning Calibrated</span>
          </motion.div>

          <motion.h1 translate="no"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
          >
            PAL<span className="text-emerald-400">A-I</span>S
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            The Frontiers Tri-Model Ensemble for Agricultural Disease Detection. 
            Fusing <span className="text-purple-400 font-semibold">SE-ResNet-50</span>, <span className="text-cyan-400 font-semibold">ResNeSt-50</span>, and <span className="text-blue-400 font-semibold">DenseNet-121</span> with CLAHE & U-Net spatial priors for unprecedented foliar diagnostic precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-8"
          >
            <button
              onClick={() => setActiveTab('scanner')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center space-x-2 group"
            >
              <ScanSearch className="w-5 h-5" />
              <span>{t('Launch Scanner')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2"
            >
              <BrainCircuit className="w-5 h-5 text-emerald-400" />
              <span>{t('View Training Study')}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tri-Model Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-purple-500/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{t('Tri-Model Ensemble')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Eliminates single-model blindspots by synthesizing SE-ResNet-50 (spatial context), ResNeSt-50 (split-attention), and DenseNet-121 (feature reuse) architectures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-emerald-500/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{t('99.4% Peak Accuracy')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Validated across a rigorous partition of 1,986 test images covering 23 complex disease classifications in rice and corn pathology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-amber-500/30 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{t('Edge-Optimized (42ms)')}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Despite utilizing three complex backbones, the pipeline completes full inference in 42ms (23.8 FPS) making it viable for mobile field deployment.
          </p>
        </motion.div>
      </section>

      {/* Visual Pipeline Banner */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
              <Activity className="w-4 h-4" />
              <span>{t('Full Diagnostic Pipeline')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t('From Raw Leaf to Confirmed Diagnosis.')}
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              The PALA-IS architecture doesn't just classify—it pre-processes. CLAHE stabilizes lighting in field conditions, while U-Net semantic segmentation isolates chlorotic regions before the tri-model ensemble casts its vote.
            </p>
            <button
              onClick={() => setActiveTab('results')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all text-sm mt-4"
            >
              {t('View Empirical Results & Figures')}
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-md mx-auto">
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-xs font-mono">1. {t('Input')}</span>
                <span className="text-white font-semibold text-sm">{t('Raw Field Image')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-emerald-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-400 text-xs font-mono">2. {t('Enhance')}</span>
                <span className="text-emerald-300 font-semibold text-sm">{t('CLAHE Histogram')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-emerald-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-indigo-500/20">
                <span className="text-indigo-400 text-xs font-mono">3. {t('Mask')}</span>
                <span className="text-indigo-300 font-semibold text-sm">{t('U-Net Segmentation')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-emerald-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <span className="text-purple-400 text-xs font-mono">4. {t('Classify')}</span>
                <span className="text-purple-300 font-semibold text-sm">{t('Tri-Model Ensemble')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
