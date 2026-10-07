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
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022c22] border-2 border-amber-500/30 shadow-2xl text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-28 lg:px-20 lg:py-32 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 bg-[#022c22]/80 backdrop-blur-sm border border-amber-400/50 px-4 py-2 rounded-full shadow-inner"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">Deep Learning Calibrated</span>
          </motion.div>

          <motion.h1 translate="no"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight"
          >
            PAL<span className="text-amber-400">A-I</span>S
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl leading-relaxed"
          >
            The Frontiers Tri-Model Ensemble for Agricultural Disease Detection. 
            Fusing <span className="text-amber-300 font-semibold">SE-ResNet-50</span>, <span className="text-emerald-300 font-semibold">ResNeSt-50</span>, and <span className="text-yellow-200 font-semibold">DenseNet-121</span> with CLAHE &amp; U-Net spatial priors for unprecedented foliar diagnostic precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-8"
          >
            <button
              onClick={() => setActiveTab('scanner')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 rounded-xl font-extrabold text-lg shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center space-x-2 group"
            >
              <ScanSearch className="w-5 h-5 text-emerald-950" />
              <span>{t('Launch Scanner')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-amber-400/40 hover:border-amber-300 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <BrainCircuit className="w-5 h-5 text-amber-300" />
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
          className="bg-white border border-emerald-900/10 rounded-2xl p-8 space-y-4 hover:border-amber-500/60 shadow-md hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-900/10 border border-emerald-900/20 flex items-center justify-center text-emerald-800 mb-6">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">{t('Tri-Model Ensemble')}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Eliminates single-model blindspots by synthesizing SE-ResNet-50 (spatial context), ResNeSt-50 (split-attention), and DenseNet-121 (feature reuse) architectures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-emerald-900/10 rounded-2xl p-8 space-y-4 hover:border-amber-500/60 shadow-md hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">{t('99.4% Peak Accuracy')}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Validated across a rigorous partition of 1,986 test images covering 23 complex disease classifications in rice and corn pathology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-emerald-900/10 rounded-2xl p-8 space-y-4 hover:border-amber-500/60 shadow-md hover:shadow-xl transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-900/10 border border-emerald-900/20 flex items-center justify-center text-emerald-800 mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">{t('Edge-Optimized (42ms)')}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Despite utilizing three complex backbones, the pipeline completes full inference in 42ms (23.8 FPS) making it viable for mobile field deployment.
          </p>
        </motion.div>
      </section>

      {/* Visual Pipeline Banner */}
      <section className="bg-white border border-emerald-900/10 rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-xl transition-all relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 text-amber-700 font-extrabold uppercase tracking-wider text-xs bg-amber-50 px-3 py-1.5 rounded-full border border-amber-300">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>{t('Full Diagnostic Pipeline')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 leading-tight">
              {t('From Raw Leaf to Confirmed Diagnosis.')}
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-lg">
              The PALA-IS architecture doesn't just classify—it pre-processes. CLAHE stabilizes lighting in field conditions, while U-Net semantic segmentation isolates chlorotic regions before the tri-model ensemble casts its vote.
            </p>
            <button
              onClick={() => setActiveTab('results')}
              className="px-6 py-3.5 bg-[#064e3b] hover:bg-[#043e2f] text-white rounded-xl font-bold transition-all text-sm mt-4 shadow-md flex items-center space-x-2"
            >
              <span>{t('View Empirical Results & Figures')}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
          
          <div className="flex-1 w-full max-w-md mx-auto">
            <div className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-emerald-900/10 shadow-xs">
                <span className="text-slate-500 text-xs font-mono">1. {t('Input')}</span>
                <span className="text-emerald-950 font-bold text-sm">{t('Raw Field Image')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-amber-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-emerald-700/30 shadow-xs">
                <span className="text-emerald-800 text-xs font-mono font-bold">2. {t('Enhance')}</span>
                <span className="text-emerald-900 font-bold text-sm">{t('CLAHE Histogram')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-amber-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-amber-400/40 shadow-xs">
                <span className="text-amber-700 text-xs font-mono font-bold">3. {t('Mask')}</span>
                <span className="text-emerald-950 font-bold text-sm">{t('U-Net Segmentation')}</span>
              </div>
              <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-amber-500 rotate-90" /></div>
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border-2 border-amber-400 shadow-sm">
                <span className="text-amber-800 text-xs font-mono font-bold">4. {t('Classify')}</span>
                <span className="text-emerald-950 font-extrabold text-sm">{t('Tri-Model Ensemble')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
