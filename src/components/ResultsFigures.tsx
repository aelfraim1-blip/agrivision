import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  MODEL_BENCHMARKS,
  TRAINING_CONVERGENCE,
  CONFUSION_MATRIX,
  DISEASE_CLASSES,
  ROC_CURVE_DATA,
  PR_CURVE_DATA,
  ABLATION_STUDY,
  STRESS_TEST_BENCHMARK,
  PER_DISEASE_METRICS,
} from '../data/benchmarkResultsData';
import {
  BarChart3,
  TrendingUp,
  Grid,
  Activity,
  Layers,
  ShieldAlert,
  Zap,
  Sparkles,
  Award,
  Download,
  Info,
  CheckCircle2,
  Filter,
  Eye,
} from 'lucide-react';

export const ResultsFigures: React.FC = () => {
  const [activeFigure, setActiveFigure] = useState<
    'benchmarks' | 'convergence' | 'confusion' | 'roc' | 'ablation' | 'stress' | 'pareto'
  >('benchmarks');

  const [selectedConfusionRow, setSelectedConfusionRow] = useState<number | null>(null);
  const [selectedCropFilter, setSelectedCropFilter] = useState<'All' | 'Rice' | 'Corn'>('All');

  const filteredDiseaseMetrics = PER_DISEASE_METRICS.filter(
    (item) => selectedCropFilter === 'All' || item.crop === selectedCropFilter
  );

  // Radar comparison data format
  const radarData = [
    { metric: 'Top-1 Accuracy', Ensemble: 98.8, EfficientNet: 95.6, ResNet: 94.2, MobileNet: 90.4 },
    { metric: 'Top-3 Coverage', Ensemble: 99.9, EfficientNet: 98.4, ResNet: 97.6, MobileNet: 94.7 },
    { metric: 'Macro Precision', Ensemble: 98.6, EfficientNet: 95.1, ResNet: 93.8, MobileNet: 89.8 },
    { metric: 'Macro Recall', Ensemble: 98.9, EfficientNet: 96.0, ResNet: 94.5, MobileNet: 90.9 },
    { metric: 'Specificity', Ensemble: 99.4, EfficientNet: 97.8, ResNet: 96.9, MobileNet: 94.1 },
    { metric: 'F1 Harmonic', Ensemble: 98.7, EfficientNet: 95.5, ResNet: 94.1, MobileNet: 90.3 },
    { metric: 'ROC-AUC x100', Ensemble: 99.6, EfficientNet: 97.8, ResNet: 96.5, MobileNet: 93.1 },
  ];

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 z-50">
          <p className="font-bold text-white border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between space-x-3">
              <span className="flex items-center space-x-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-mono font-bold text-slate-100">
                {entry.value}
                {entry.unit || '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Official Quantitative Benchmark Results</span>
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">Partition N=2,400 Field Images</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Model Comparison, Empirical Graphs &amp; Statistical Figures
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Comprehensive scientific evaluation demonstrating why the <strong className="text-emerald-400">PALA-IS Hybrid Ensemble</strong> (ResNet-50 + EfficientNet-B3 with CLAHE &amp; U-Net lesion prior) surpasses standalone single-backbone vision classifiers across accuracy, noise robustness, and error reduction.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 self-stretch lg:self-auto min-w-[280px]">
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Top-1 Accuracy</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">98.8%</div>
              <span className="text-[10px] text-emerald-300 font-medium">+4.6% vs single ResNet</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Macro F1-Score</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">98.7%</div>
              <span className="text-[10px] text-slate-400">Harmonic class balance</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Error Reduction</span>
              <div className="text-2xl font-black text-purple-400 font-mono">79.3%</div>
              <span className="text-[10px] text-slate-400">Fewer false negatives</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Inference Speed</span>
              <div className="text-2xl font-black text-amber-400 font-mono">38ms</div>
              <span className="text-[10px] text-slate-400">26.3 FPS Real-time</span>
            </div>
          </div>
        </div>

        {/* Figure Selector Navigation */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFigure('benchmarks')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'benchmarks'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Fig 1: Model Benchmarks</span>
          </button>

          <button
            onClick={() => setActiveFigure('convergence')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'convergence'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Fig 2: Learning Curves</span>
          </button>

          <button
            onClick={() => setActiveFigure('confusion')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'confusion'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Fig 3: Confusion Matrix</span>
          </button>

          <button
            onClick={() => setActiveFigure('roc')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'roc'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Fig 4: ROC &amp; PR Curves</span>
          </button>

          <button
            onClick={() => setActiveFigure('ablation')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'ablation'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Fig 5: Ablation Study</span>
          </button>

          <button
            onClick={() => setActiveFigure('stress')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'stress'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Fig 6: Field Stress Test</span>
          </button>

          <button
            onClick={() => setActiveFigure('pareto')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'pareto'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Fig 7: Latency vs. Accuracy</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FIGURE 1: MULTI-MODEL BENCHMARK COMPARISONS */}
      {/* ========================================================================= */}
      {activeFigure === 'benchmarks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Bar Chart */}
            <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Figure 1A: Classification Performance Across Vision Backbones</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comparing Top-1 Accuracy, Precision, Recall, and Harmonic F1-Score (Test Partition N=2,400)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800/50 self-start sm:self-auto">
                  Higher is Better (↑)
                </span>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MODEL_BENCHMARKS} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis domain={[85, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} />
                    <Bar dataKey="top1Accuracy" name="Top-1 Accuracy" fill="#10b981" radius={[4, 4, 0, 0]}>
                      {MODEL_BENCHMARKS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isProposed ? '#10b981' : entry.color} />
                      ))}
                    </Bar>
                    <Bar dataKey="macroF1Score" name="Macro F1-Score" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="macroPrecision" name="Precision" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Multi-Dimensional Radar Comparison */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">Figure 1B: Multi-Metric Radar Profile</h3>
                <p className="text-xs text-slate-400">Equiangular trade-off balance</p>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[85, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Radar
                      name="Hybrid Ensemble"
                      dataKey="Ensemble"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.4}
                    />
                    <Radar
                      name="EfficientNet-B3"
                      dataKey="EfficientNet"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="ResNet-50"
                      dataKey="ResNet"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.15}
                    />
                    <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Empirical Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">
                Comprehensive Multi-Model Performance Breakdown
              </h3>
              <span className="text-xs text-slate-400 font-mono">Statistical Confidence Interval: 95%</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-3 px-4">Architecture</th>
                    <th className="py-3 px-3">Params</th>
                    <th className="py-3 px-3 text-emerald-400">Top-1 Acc</th>
                    <th className="py-3 px-3">Top-3 Acc</th>
                    <th className="py-3 px-3">Precision</th>
                    <th className="py-3 px-3">Recall</th>
                    <th className="py-3 px-3">F1-Score</th>
                    <th className="py-3 px-3">ROC-AUC</th>
                    <th className="py-3 px-3 text-amber-400">Latency</th>
                    <th className="py-3 px-3 text-rose-400">Error %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {MODEL_BENCHMARKS.map((model) => (
                    <tr
                      key={model.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        model.isProposed ? 'bg-emerald-950/20 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-sans text-white flex items-center space-x-2">
                        {model.isProposed && <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        <span className={model.isProposed ? 'text-emerald-300 font-bold' : ''}>{model.name}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{model.parameters}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold text-sm">{model.top1Accuracy}%</td>
                      <td className="py-3 px-3 text-slate-300">{model.top3Accuracy}%</td>
                      <td className="py-3 px-3 text-slate-300">{model.macroPrecision}%</td>
                      <td className="py-3 px-3 text-slate-300">{model.macroRecall}%</td>
                      <td className="py-3 px-3 text-cyan-300 font-semibold">{model.macroF1Score}%</td>
                      <td className="py-3 px-3 text-purple-300">{model.rocAuc.toFixed(3)}</td>
                      <td className="py-3 px-3 text-amber-400">{model.inferenceTimeMs}ms</td>
                      <td className="py-3 px-3 text-rose-400">{model.errorRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 2: TRAINING CONVERGENCE & LEARNING DYNAMICS */}
      {/* ========================================================================= */}
      {activeFigure === 'convergence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Validation Accuracy vs Epochs */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">Figure 2A: Validation Accuracy Convergence (50 Epochs)</h3>
                <p className="text-xs text-slate-400">
                  Ensemble stabilizes at 98.8% by Epoch 35 without overfitting
                </p>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRAINING_CONVERGENCE} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="epoch"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'Training Epochs', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="ensembleValAcc"
                      name="Hybrid Ensemble"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="effnetValAcc"
                      name="EfficientNet-B3"
                      stroke="#06b6d4"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="resnetValAcc"
                      name="ResNet-50"
                      stroke="#a855f7"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilenetValAcc"
                      name="MobileNetV3"
                      stroke="#ec4899"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categorical Cross-Entropy Loss vs Epochs */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">Figure 2B: Training Log Loss Decay</h3>
                <p className="text-xs text-slate-400">
                  Categorical cross-entropy loss minimisation rate across iterations
                </p>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRAINING_CONVERGENCE} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="epoch"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'Training Epochs', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis domain={[0, 1.8]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="ensembleTrainLoss"
                      name="Hybrid Ensemble Loss"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="effnetTrainLoss"
                      name="EfficientNet Loss"
                      stroke="#06b6d4"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="resnetTrainLoss"
                      name="ResNet-50 Loss"
                      stroke="#a855f7"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilenetTrainLoss"
                      name="MobileNet Loss"
                      stroke="#ec4899"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Analytical Takeaway Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3 text-xs">
            <Info className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-bold text-white">Convergence Analysis:</span>
              <p className="text-slate-300 leading-relaxed">
                The Hybrid Ensemble exhibits faster loss decay (Cross-Entropy Loss = 0.031 at epoch 50) and reaches 95% validation accuracy in just 18 epochs—7 epochs earlier than single EfficientNet-B3 and 12 epochs earlier than ResNet-50. The joint gradient optimization prevents saddle-point stagnation on complex necrotic leaf patterns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 3: MULTI-CLASS CONFUSION MATRIX */}
      {/* ========================================================================= */}
      {activeFigure === 'confusion' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Figure 3: Multi-Class Confusion Matrix Heatmap (N=2,400 Test Images)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Rows represent True Ground-Truth Labels; Columns represent Hybrid Ensemble Predictions (300 images per class)
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Diagonal Match:</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  2,371 / 2,400 (98.79%)
                </span>
              </div>
            </div>

            {/* 8x8 Interactive Confusion Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse font-mono">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-sans text-slate-400 text-[11px] bg-slate-950">
                      True Class \ Pred
                    </th>
                    {DISEASE_CLASSES.map((label, idx) => (
                      <th
                        key={idx}
                        className="p-2 text-[10px] text-slate-400 font-sans uppercase tracking-tight bg-slate-950 min-w-[70px]"
                        title={label}
                      >
                        {label.replace('Rice ', 'R. ').replace('Corn ', 'C. ')}
                      </th>
                    ))}
                    <th className="p-2 text-emerald-400 font-sans text-[11px] bg-slate-950">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {CONFUSION_MATRIX.map((row, rowIdx) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedConfusionRow(rowIdx === selectedConfusionRow ? null : rowIdx)}
                      className={`cursor-pointer transition-colors ${
                        selectedConfusionRow === rowIdx ? 'bg-slate-800' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="p-2.5 text-left font-sans font-medium text-white flex items-center space-x-2 bg-slate-950/60">
                        <span className={`w-2 h-2 rounded-full ${row.crop === 'Rice' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span>{row.name}</span>
                      </td>
                      {row.predictions.map((val, colIdx) => {
                        const isDiagonal = rowIdx === colIdx;
                        const intensity = isDiagonal ? val / 300 : val / 5;
                        return (
                          <td
                            key={colIdx}
                            className={`p-2 transition-all ${
                              isDiagonal
                                ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/30'
                                : val > 0
                                ? 'bg-rose-500/20 text-rose-300 font-semibold'
                                : 'text-slate-600'
                            }`}
                            style={{
                              backgroundColor: isDiagonal
                                ? `rgba(16, 185, 129, ${0.2 + intensity * 0.4})`
                                : val > 0
                                ? `rgba(244, 63, 94, ${0.15 + intensity * 0.3})`
                                : undefined,
                            }}
                          >
                            {val}
                          </td>
                        );
                      })}
                      <td className="p-2 text-emerald-400 font-bold font-mono bg-slate-950/60">
                        {row.classAccuracy}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Legend & Selection Details */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500 inline-block" />
                  <span>Correct Hits (True Positives)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500 inline-block" />
                  <span>Misclassifications (Confusion)</span>
                </span>
              </div>
              <span className="text-[11px] font-mono">Lowest error rate in Healthy Foliage (99.7%)</span>
            </div>
          </div>

          {/* Per-Disease Comparative Filter Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Class-Specific Accuracy Comparison</h3>
                <p className="text-xs text-slate-400">Comparing detection performance by pathogen</p>
              </div>

              {/* Crop Filter */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                {(['All', 'Rice', 'Corn'] as const).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCropFilter(crop)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      selectedCropFilter === crop
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredDiseaseMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="disease" tick={{ fill: '#94a3b8', fontSize: 11 }} angle={-15} textAnchor="end" height={45} />
                  <YAxis domain={[90, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="ensemble" name="Hybrid Ensemble" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="effnet" name="EfficientNet-B3" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resnet" name="ResNet-50" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 4: ROC & PRECISION-RECALL CURVES */}
      {/* ========================================================================= */}
      {activeFigure === 'roc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROC Curve */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Figure 4A: Receiver Operating Characteristic (ROC)</h3>
                  <p className="text-xs text-slate-400">True Positive Rate (Sensitivity) vs. False Positive Rate (1 - Specificity)</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800/40">
                  AUC = 0.996
                </span>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ROC_CURVE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="fpr"
                      domain={[0, 1]}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'False Positive Rate (FPR)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis
                      domain={[0, 1]}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line type="monotone" dataKey="tprEnsemble" name="Hybrid Ensemble (AUC=0.996)" stroke="#10b981" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="tprEfficientNet" name="EfficientNet (AUC=0.978)" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="tprResNet" name="ResNet-50 (AUC=0.965)" stroke="#a855f7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="tprMobileNet" name="MobileNet (AUC=0.931)" stroke="#ec4899" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Precision-Recall Curve */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Figure 4B: Precision-Recall Curve</h3>
                  <p className="text-xs text-slate-400">Trade-off between precision (PPV) and recall under varying thresholds</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-800/40">
                  AP = 0.992
                </span>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PR_CURVE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="recall"
                      domain={[0, 1]}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'Recall (Sensitivity)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis
                      domain={[0.6, 1.0]}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      label={{ value: 'Precision', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line type="monotone" dataKey="precEnsemble" name="Hybrid Ensemble (AP=0.992)" stroke="#10b981" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="precEfficientNet" name="EfficientNet (AP=0.968)" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="precResNet" name="ResNet-50 (AP=0.942)" stroke="#a855f7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="precMobileNet" name="MobileNet (AP=0.898)" stroke="#ec4899" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 5: ABLATION STUDY */}
      {/* ========================================================================= */}
      {activeFigure === 'ablation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Figure 5: Architectural Ablation Study (Step-by-Step Cumulative Gain)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Evaluating the exact accuracy increment contributed by each module in the 5-stage pipeline
              </p>
            </div>

            {/* Waterfall-style visual cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {ABLATION_STUDY.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-white block">{step.step}</span>
                    <p className="text-[10px] text-slate-400 leading-tight">{step.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                    <span className="text-xl font-black font-mono" style={{ color: step.color }}>
                      {step.top1Accuracy}%
                    </span>
                    {step.gain > 0 && (
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">
                        +{step.gain}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Ablation Bar Visualizer */}
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ABLATION_STUDY} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="step" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} />
                  <YAxis domain={[85, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="top1Accuracy" name="Top-1 Accuracy" radius={[6, 6, 0, 0]}>
                    {ABLATION_STUDY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Bar dataKey="macroF1" name="Harmonic F1-Score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 6: ENVIRONMENTAL STRESS ROBUSTNESS */}
      {/* ========================================================================= */}
      {activeFigure === 'stress' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">Figure 6: Environmental Stress Robustness Benchmark</h3>
                <p className="text-xs text-slate-400">
                  Accuracy degradation under challenging real-world farm conditions (sun glare, shadows, dew droplets, and motion blur)
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800/40">
                Avg +6.8% Resilience Gain
              </span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STRESS_TEST_BENCHMARK} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="condition" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-15} textAnchor="end" height={55} />
                  <YAxis domain={[75, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="ensembleAccuracy" name="Hybrid Ensemble" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="effnetAccuracy" name="EfficientNet-B3" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resnetAccuracy" name="ResNet-50" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stress Conditions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {STRESS_TEST_BENCHMARK.map((scenario, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{scenario.condition}</span>
                    <span className="font-mono font-bold text-emerald-400">+{scenario.ensembleRobustnessAdvantage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{scenario.description}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400">
                    <span>Ensemble: <strong className="text-emerald-400">{scenario.ensembleAccuracy}%</strong></span>
                    <span>ResNet: <strong className="text-purple-400">{scenario.resnetAccuracy}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FIGURE 7: PARETO FRONTIER (LATENCY VS ACCURACY) */}
      {/* ========================================================================= */}
      {activeFigure === 'pareto' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Figure 7: Latency vs. Accuracy Pareto Frontier</h3>
                <p className="text-xs text-slate-400">
                  Evaluating model size (MB), latency (ms), and accuracy for edge smartphone deployment
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800/40">
                Target: &lt;50ms &amp; &gt;98% Accuracy
              </span>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    type="number"
                    dataKey="inferenceTimeMs"
                    name="Inference Time"
                    unit="ms"
                    domain={[0, 90]}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{ value: 'Inference Latency (ms) [Lower is Better →]', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="top1Accuracy"
                    name="Top-1 Accuracy"
                    unit="%"
                    domain={[88, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{ value: 'Top-1 Accuracy (%) [Higher is Better ↑]', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as (typeof MODEL_BENCHMARKS)[0];
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                            <span className="font-bold text-white block">{data.name}</span>
                            <div className="text-slate-300 font-mono">Accuracy: <strong className="text-emerald-400">{data.top1Accuracy}%</strong></div>
                            <div className="text-slate-300 font-mono">Latency: <strong className="text-amber-400">{data.inferenceTimeMs}ms</strong> ({data.fpsThroughput} FPS)</div>
                            <div className="text-slate-300 font-mono">Model Size: <strong>{data.modelSizeMb} MB</strong> ({data.parameters})</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Models" data={MODEL_BENCHMARKS} fill="#10b981">
                    {MODEL_BENCHMARKS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Pareto Sweet Spot Callout */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Optimal Pareto Sweet Spot Achieved</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                While Vision Transformers (ViT-B/16) require 78ms and 330MB of RAM for 93.1% accuracy, and MobileNetV3 achieves fast 14ms at the cost of high 9.6% error rate, the <strong className="text-emerald-400">Proposed Hybrid Ensemble achieves 98.8% accuracy at only 38ms latency</strong>—running comfortably at 26+ frames-per-second on modern mobile GPUs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info / Citation */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Agricultural Computer Vision Benchmark Partition • Rice &amp; Corn Foliar Pathology (N=2,400)</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">Framework: PyTorch / ONNX Runtime Edge Engine</span>
      </div>
    </div>
  );
};
