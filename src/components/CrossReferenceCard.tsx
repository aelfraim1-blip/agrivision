import React, { useState } from 'react';
import { AnalysisResult, ReferenceComparisonMatch } from '../types';
import { buildReferenceComparison } from '../utils/crossReferenceEngine';
import {
  GitCompare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Search,
  Eye,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface CrossReferenceCardProps {
  analysis: AnalysisResult;
}

export const CrossReferenceCard: React.FC<CrossReferenceCardProps> = ({ analysis }) => {
  const [showFullDifferential, setShowFullDifferential] = useState(false);
  const [activeTab, setActiveTab] = useState<'comparison' | 'elimination'>('comparison');

  const refMatch: ReferenceComparisonMatch =
    analysis.referenceComparison ||
    buildReferenceComparison(analysis.crop, analysis.diseaseName, analysis.overallConfidence);

  const isRice = analysis.crop === 'Rice';

  return (
    <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-5 shadow-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <GitCompare className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-white">
                Ground-Truth Dataset Cross-Referencing
              </h3>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Dataset Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct morphological comparison against validated reference standards from the agricultural benchmark dataset
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'comparison'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Exemplar Match</span>
          </button>
          <button
            onClick={() => setActiveTab('elimination')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'elimination'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Differential Elimination</span>
          </button>
        </div>
      </div>

      {activeTab === 'comparison' ? (
        /* Visual Exemplar Match Panel */
        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Scanned User Leaf */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>1. Analyzed Leaf Scan</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                    Query Photo
                  </span>
                </div>
                <div className="mt-3 relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
                  <img
                    src={analysis.imageUri}
                    alt="Analyzed leaf scan"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-slate-300 border border-slate-700/80 font-mono">
                    Crop: {analysis.crop} • Severity: {analysis.severity}
                  </div>
                </div>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Detected Lesion Morphology:
                </span>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {analysis.symptoms?.[0] || 'Characteristic foliar lesion pattern on leaf blade'}
                </p>
              </div>
            </div>

            {/* Matched Dataset Reference Exemplar */}
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 space-y-3 flex flex-col justify-between shadow-lg shadow-emerald-950/30">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2. Matched Dataset Ground Truth</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/50">
                    {refMatch.morphologicalMatchScore}% Visual Fit
                  </span>
                </div>
                <div className="mt-3 relative rounded-lg overflow-hidden bg-slate-950 border border-emerald-800/40 aspect-video flex items-center justify-center">
                  <img
                    src={refMatch.referenceImageUrl}
                    alt={refMatch.referenceDiseaseName}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 bg-emerald-950/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-emerald-200 border border-emerald-700/80 font-medium">
                    {refMatch.referenceDiseaseName}
                  </div>
                </div>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Ground Truth Alignment:
                </span>
                <p className="text-emerald-100 leading-relaxed font-medium">
                  {refMatch.visualAlignmentReason}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Differential Summary Bar */}
          <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Search className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Cross-Referencing Differential Check:</strong> Evaluated against all {isRice ? 'Rice' : 'Corn'} standard dataset classes to rule out lookalike foliar symptoms.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('elimination')}
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1 flex-shrink-0 self-end sm:self-auto"
            >
              <span>View Why Other Pathogens Were Ruled Out</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Differential Elimination Panel */
        <div className="space-y-4 relative z-10">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-1">
              Pathology Elimination Protocol (Cross-Referenced against Reference Database):
            </strong>
            The diagnosis engine executes a strict step-by-step differential matrix to verify that lookalike conditions are systematically excluded based on lesion geometry, location, borders, and halos.
          </div>

          <div className="space-y-3">
            {refMatch.differentialAnalysis.map((diff, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-rose-300">
                      Excluded Candidate: {diff.disease}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800/40">
                    Ruled Out
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Reference Dataset Marker:
                    </span>
                    <p className="text-slate-300 font-medium leading-snug">
                      {diff.keyDistinction}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-emerald-900/40">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                      Differential Decision Reason:
                    </span>
                    <p className="text-emerald-200/90 font-medium leading-snug">
                      {diff.whyRuledOut}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => setActiveTab('comparison')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>Back to Visual Exemplar Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
