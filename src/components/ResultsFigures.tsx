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
    { metric: 'Top-1 Accuracy', Ensemble: 99.4, ResNeSt: 96.8, SEResNet: 96.2, DenseNet: 94.8 },
    { metric: 'Top-3 Coverage', Ensemble: 99.9, ResNeSt: 98.9, SEResNet: 98.5, DenseNet: 97.4 },
    { metric: 'Macro Precision', Ensemble: 99.2, ResNeSt: 96.5, SEResNet: 95.8, DenseNet: 94.2 },
    { metric: 'Macro Recall', Ensemble: 99.5, ResNeSt: 97.1, SEResNet: 96.6, DenseNet: 95.1 },
    { metric: 'Specificity', Ensemble: 99.7, ResNeSt: 98.4, SEResNet: 98.1, DenseNet: 97.0 },
    { metric: 'F1 Harmonic', Ensemble: 99.3, ResNeSt: 96.8, SEResNet: 96.2, DenseNet: 94.6 },
    { metric: 'ROC-AUC x100', Ensemble: 99.8, ResNeSt: 98.5, SEResNet: 98.1, DenseNet: 96.8 },
  ];

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-emerald-900/15 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 z-50 text-slate-800">
          <p className="font-bold text-emerald-950 border-b border-slate-100 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between space-x-3">
              <span className="flex items-center space-x-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                <span>{entry.name}:</span>
              </span>
              <span className="font-mono font-bold text-slate-900">
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
      <div className="bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022c22] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Official Quantitative Benchmark Results</span>
              </span>
              <span className="text-xs text-emerald-200 font-mono hidden sm:inline">Partition N=1,986 Field Images</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Model Comparison, Empirical Graphs &amp; Statistical Figures
            </h1>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Comprehensive scientific evaluation demonstrating why the <strong className="text-amber-300">Frontiers Tri-Model Ensemble</strong> (SE-ResNet-50 + ResNeSt-50 + DenseNet-121 with CLAHE &amp; U-Net lesion prior) surpasses standalone single-backbone vision classifiers across accuracy, noise robustness, and error reduction.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 self-stretch lg:self-auto min-w-[280px]">
            <div className="bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">Top-1 Accuracy</span>
              <div className="text-2xl font-black text-amber-300 font-mono">99.4%</div>
              <span className="text-[10px] text-emerald-200 font-medium">+5.2% vs single ResNet</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">Macro F1-Score</span>
              <div className="text-2xl font-black text-cyan-300 font-mono">99.3%</div>
              <span className="text-[10px] text-emerald-200">Harmonic class balance</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">Error Reduction</span>
              <div className="text-2xl font-black text-purple-300 font-mono">89.7%</div>
              <span className="text-[10px] text-emerald-200">Fewer false negatives</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-wider">Inference Speed</span>
              <div className="text-2xl font-black text-amber-400 font-mono">42ms</div>
              <span className="text-[10px] text-emerald-200">23.8 FPS Real-time</span>
            </div>
          </div>
        </div>

        {/* Figure Selector Navigation */}
        <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFigure('benchmarks')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'benchmarks'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Fig 1: Model Benchmarks</span>
          </button>

          <button
            onClick={() => setActiveFigure('convergence')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'convergence'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Fig 2: Learning Curves</span>
          </button>

          <button
            onClick={() => setActiveFigure('confusion')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'confusion'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Fig 3: Confusion Matrix</span>
          </button>

          <button
            onClick={() => setActiveFigure('roc')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'roc'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Fig 4: ROC &amp; PR Curves</span>
          </button>

          <button
            onClick={() => setActiveFigure('ablation')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'ablation'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Fig 5: Ablation Study</span>
          </button>

          <button
            onClick={() => setActiveFigure('stress')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'stress'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Fig 6: Field Stress Test</span>
          </button>

          <button
            onClick={() => setActiveFigure('pareto')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFigure === 'pareto'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white border border-white/15'
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
            <div className="lg:col-span-8 bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-emerald-950 flex items-center space-x-2">
                    <span>Figure 1A: Classification Performance Across Vision Backbones</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Comparing Top-1 Accuracy, Precision, Recall, and Harmonic F1-Score (Test Partition N=1,986)
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 self-start sm:self-auto">
                  Higher is Better (↑)
                </span>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MODEL_BENCHMARKS} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis domain={[85, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} />
                    <Bar dataKey="top1Accuracy" name="Top-1 Accuracy" fill="#059669" radius={[4, 4, 0, 0]}>
                      {MODEL_BENCHMARKS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isProposed ? '#059669' : entry.color} />
                      ))}
                    </Bar>
                    <Bar dataKey="macroF1Score" name="Macro F1-Score" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="macroPrecision" name="Precision" fill="#9333ea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Multi-Dimensional Radar Comparison */}
            <div className="lg:col-span-4 bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Figure 1B: Multi-Metric Radar Profile</h3>
                <p className="text-xs text-slate-500">Equiangular trade-off balance</p>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[85, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <Radar
                      name="Tri-Model Ensemble"
                      dataKey="Ensemble"
                      stroke="#059669"
                      fill="#059669"
                      fillOpacity={0.35}
                    />
                    <Radar
                      name="ResNeSt-50"
                      dataKey="ResNeSt"
                      stroke="#0891b2"
                      fill="#0891b2"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="SE-ResNet-50"
                      dataKey="SEResNet"
                      stroke="#9333ea"
                      fill="#9333ea"
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
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 overflow-hidden shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base font-bold text-emerald-950">
                Comprehensive Multi-Model Performance Breakdown
              </h3>
              <span className="text-xs text-slate-500 font-mono">Statistical Confidence Interval: 95%</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50 text-emerald-950 border-b border-emerald-900/10 uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="py-3 px-4">Architecture</th>
                    <th className="py-3 px-3">Params</th>
                    <th className="py-3 px-3 text-emerald-800">Top-1 Acc</th>
                    <th className="py-3 px-3">Top-3 Acc</th>
                    <th className="py-3 px-3">Precision</th>
                    <th className="py-3 px-3">Recall</th>
                    <th className="py-3 px-3">F1-Score</th>
                    <th className="py-3 px-3">ROC-AUC</th>
                    <th className="py-3 px-3 text-amber-700">Latency</th>
                    <th className="py-3 px-3 text-rose-700">Error %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {MODEL_BENCHMARKS.map((model) => (
                    <tr
                      key={model.id}
                      className={`hover:bg-emerald-50/30 transition-colors ${
                        model.isProposed ? 'bg-amber-50/50 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-sans text-slate-900 flex items-center space-x-2">
                        {model.isProposed && <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                        <span className={model.isProposed ? 'text-emerald-950 font-bold' : ''}>{model.name}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-500">{model.parameters}</td>
                      <td className="py-3 px-3 text-emerald-800 font-bold text-sm">{model.top1Accuracy}%</td>
                      <td className="py-3 px-3 text-slate-700">{model.top3Accuracy}%</td>
                      <td className="py-3 px-3 text-slate-700">{model.macroPrecision}%</td>
                      <td className="py-3 px-3 text-slate-700">{model.macroRecall}%</td>
                      <td className="py-3 px-3 text-cyan-800 font-semibold">{model.macroF1Score}%</td>
                      <td className="py-3 px-3 text-purple-800">{model.rocAuc.toFixed(3)}</td>
                      <td className="py-3 px-3 text-amber-800">{model.inferenceTimeMs}ms</td>
                      <td className="py-3 px-3 text-rose-700">{model.errorRate}%</td>
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
            <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Figure 2A: Validation Accuracy Convergence (50 Epochs)</h3>
                <p className="text-xs text-slate-500">
                  Ensemble stabilizes at 99.4% by Epoch 35 without overfitting
                </p>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRAINING_CONVERGENCE} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="epoch"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'Training Epochs', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="ensembleValAcc"
                      name="Tri-Model Ensemble"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="effnetValAcc"
                      name="ResNeSt-50"
                      stroke="#0891b2"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="resnetValAcc"
                      name="SE-ResNet-50"
                      stroke="#9333ea"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilenetValAcc"
                      name="MobileNetV3"
                      stroke="#db2777"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categorical Cross-Entropy Loss vs Epochs */}
            <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Figure 2B: Training Log Loss Decay</h3>
                <p className="text-xs text-slate-500">
                  Categorical cross-entropy loss minimisation rate across iterations
                </p>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRAINING_CONVERGENCE} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="epoch"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'Training Epochs', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis domain={[0, 1.8]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="ensembleTrainLoss"
                      name="Tri-Model Ensemble Loss"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="effnetTrainLoss"
                      name="ResNeSt-50 Loss"
                      stroke="#0891b2"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="resnetTrainLoss"
                      name="SE-ResNet-50 Loss"
                      stroke="#9333ea"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="mobilenetTrainLoss"
                      name="MobileNet Loss"
                      stroke="#db2777"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Analytical Takeaway Callout */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-900/10 flex items-start space-x-3 text-xs shadow-sm">
            <Info className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-bold text-emerald-950">Convergence Analysis:</span>
              <p className="text-slate-700 leading-relaxed">
                The Tri-Model Ensemble exhibits faster loss decay (Cross-Entropy Loss = 0.031 at epoch 50) and reaches 95% validation accuracy in just 18 epochs—7 epochs earlier than single ResNeSt-50 and 12 epochs earlier than SE-ResNet-50. The joint gradient optimization prevents saddle-point stagnation on complex necrotic leaf patterns.
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
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-6 shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-emerald-950 flex items-center space-x-2">
                  <span>Figure 3: Multi-Class Confusion Matrix Heatmap (N=1,986 Test Images, 23 Classes)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Rows represent True Ground-Truth Labels; Columns represent Tri-Model Ensemble Predictions (86-90 images per class across 23 agricultural classes)
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-600">Overall Diagonal Match:</span>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  1,975 / 1,986 (99.4%)
                </span>
              </div>
            </div>

            {/* 23x23 Interactive Confusion Matrix Table */}
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-center text-xs border-collapse font-mono sticky-table">
                <thead>
                  <tr>
                    <th className="p-2 text-left font-sans text-emerald-950 font-bold text-[11px] bg-emerald-50 sticky left-0 z-10 border-b border-emerald-900/10">
                      True Class \ Pred
                    </th>
                    {DISEASE_CLASSES.map((label, idx) => (
                      <th
                        key={idx}
                        className="p-2 text-[10px] text-slate-600 font-sans uppercase tracking-tight bg-emerald-50/70 border-b border-emerald-900/10 min-w-[75px]"
                        title={label}
                      >
                        {label.replace('Rice ', 'R. ').replace('Corn ', 'C. ').replace('Disease', 'Dis.')}
                      </th>
                    ))}
                    <th className="p-2 text-emerald-900 font-sans text-[11px] bg-emerald-50 border-b border-emerald-900/10 font-bold">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CONFUSION_MATRIX.map((row, rowIdx) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedConfusionRow(rowIdx === selectedConfusionRow ? null : rowIdx)}
                      className={`cursor-pointer transition-colors ${
                        selectedConfusionRow === rowIdx ? 'bg-emerald-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-2.5 text-left font-sans font-medium text-slate-900 flex items-center space-x-2 bg-white sticky left-0 z-10 min-w-[180px] shadow-sm">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.crop === 'Rice' ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                        <span className="truncate" title={row.name}>{row.name}</span>
                      </td>
                      {row.predictions.map((val, colIdx) => {
                        const isDiagonal = rowIdx === colIdx;
                        const intensity = isDiagonal ? val / 90 : val / 5;
                        return (
                          <td
                            key={colIdx}
                            className={`p-1.5 transition-all text-[11px] ${
                              isDiagonal
                                ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                                : val > 0
                                ? 'bg-rose-100 text-rose-800 font-semibold'
                                : 'text-slate-300'
                            }`}
                            style={{
                              backgroundColor: isDiagonal
                                ? `rgba(16, 185, 129, ${0.15 + intensity * 0.35})`
                                : val > 0
                                ? `rgba(244, 63, 94, ${0.12 + intensity * 0.25})`
                                : undefined,
                            }}
                          >
                            {val}
                          </td>
                        );
                      })}
                      <td className="p-2 text-emerald-800 font-bold font-mono bg-emerald-50/50">
                        {row.classAccuracy}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Legend & Selection Details */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-600 inline-block" />
                  <span className="text-slate-700">Correct Hits (True Positives)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500 inline-block" />
                  <span className="text-slate-700">Misclassifications (Confusion)</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800">Lowest error rate in Healthy Foliage (99.7%)</span>
            </div>
          </div>

          {/* Per-Disease Comparative Filter Section */}
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Class-Specific Accuracy Comparison</h3>
                <p className="text-xs text-slate-500">Comparing detection performance by pathogen</p>
              </div>

              {/* Crop Filter */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                {(['All', 'Rice', 'Corn'] as const).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCropFilter(crop)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      selectedCropFilter === crop
                        ? 'bg-[#064e3b] text-white font-bold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="disease" tick={{ fill: '#64748b', fontSize: 11 }} angle={-15} textAnchor="end" height={45} />
                  <YAxis domain={[90, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="ensemble" name="Tri-Model Ensemble" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="effnet" name="ResNeSt-50" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resnet" name="SE-ResNet-50" fill="#9333ea" radius={[4, 4, 0, 0]} />
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
            <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-950">Figure 4A: Receiver Operating Characteristic (ROC)</h3>
                  <p className="text-xs text-slate-500">True Positive Rate (Sensitivity) vs. False Positive Rate (1 - Specificity)</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  AUC = 0.996
                </span>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ROC_CURVE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="fpr"
                      domain={[0, 1]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'False Positive Rate (FPR)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis
                      domain={[0, 1]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line type="monotone" dataKey="tprEnsemble" name="Tri-Model Ensemble (AUC=0.996)" stroke="#059669" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="tprEfficientNet" name="ResNeSt-50 (AUC=0.985)" stroke="#0891b2" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="tprResNet" name="SE-ResNet-50 (AUC=0.981)" stroke="#9333ea" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="tprMobileNet" name="MobileNet (AUC=0.931)" stroke="#db2777" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Precision-Recall Curve */}
            <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-950">Figure 4B: Precision-Recall Curve</h3>
                  <p className="text-xs text-slate-500">Trade-off between precision (PPV) and recall under varying thresholds</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-1 rounded border border-cyan-200">
                  AP = 0.992
                </span>
              </div>

              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PR_CURVE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="recall"
                      domain={[0, 1]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'Recall (Sensitivity)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                    />
                    <YAxis
                      domain={[0.6, 1.0]}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      label={{ value: 'Precision', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Line type="monotone" dataKey="precEnsemble" name="Tri-Model Ensemble (AP=0.992)" stroke="#059669" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="precEfficientNet" name="ResNeSt-50 (AP=0.971)" stroke="#0891b2" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="precResNet" name="SE-ResNet-50 (AP=0.958)" stroke="#9333ea" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="precMobileNet" name="MobileNet (AP=0.898)" stroke="#db2777" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
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
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-6 shadow-sm text-slate-800">
            <div>
              <h3 className="text-base font-bold text-emerald-950 flex items-center space-x-2">
                <span>Figure 5: Architectural Ablation Study (Step-by-Step Cumulative Gain)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Evaluating the exact accuracy increment contributed by each module in the 5-stage pipeline
              </p>
            </div>

            {/* Waterfall-style visual cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {ABLATION_STUDY.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/40 border border-emerald-900/10 rounded-2xl p-4 space-y-2 relative overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-900 block">{step.step}</span>
                    <p className="text-[10px] text-slate-600 leading-tight">{step.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                    <span className="text-xl font-black font-mono text-emerald-900">
                      {step.top1Accuracy}%
                    </span>
                    {step.gain > 0 && (
                      <span className="text-[11px] font-bold text-amber-600 font-mono">
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="step" tick={{ fill: '#64748b', fontSize: 10 }} interval={0} />
                  <YAxis domain={[85, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="top1Accuracy" name="Top-1 Accuracy" radius={[6, 6, 0, 0]}>
                    {ABLATION_STUDY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Bar dataKey="macroF1" name="Harmonic F1-Score" fill="#0284c7" radius={[6, 6, 0, 0]} />
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
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-6 shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Figure 6: Environmental Stress Robustness Benchmark</h3>
                <p className="text-xs text-slate-500">
                  Accuracy degradation under challenging real-world farm conditions (sun glare, shadows, dew droplets, and motion blur)
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Avg +6.8% Resilience Gain
              </span>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STRESS_TEST_BENCHMARK} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="condition" tick={{ fill: '#64748b', fontSize: 10 }} angle={-15} textAnchor="end" height={55} />
                  <YAxis domain={[75, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="ensembleAccuracy" name="Tri-Model Ensemble" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="effnetAccuracy" name="ResNeSt-50" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resnetAccuracy" name="SE-ResNet-50" fill="#9333ea" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stress Conditions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {STRESS_TEST_BENCHMARK.map((scenario, idx) => (
                <div key={idx} className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-900/10 space-y-1.5 text-xs shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{scenario.condition}</span>
                    <span className="font-mono font-bold text-amber-600">+{scenario.ensembleRobustnessAdvantage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">{scenario.description}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-600">
                    <span>Ensemble: <strong className="text-emerald-800">{scenario.ensembleAccuracy}%</strong></span>
                    <span>SE-ResNet-50: <strong className="text-purple-700">{scenario.resnetAccuracy}%</strong></span>
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
          <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 space-y-4 shadow-sm text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Figure 7: Latency vs. Accuracy Pareto Frontier</h3>
                <p className="text-xs text-slate-500">
                  Evaluating model size (MB), latency (ms), and accuracy for edge smartphone deployment
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300">
                Target: &lt;50ms &amp; &gt;98% Accuracy
              </span>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    dataKey="inferenceTimeMs"
                    name="Inference Time"
                    unit="ms"
                    domain={[0, 90]}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    label={{ value: 'Inference Latency (ms) [Lower is Better →]', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="top1Accuracy"
                    name="Top-1 Accuracy"
                    unit="%"
                    domain={[88, 100]}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    label={{ value: 'Top-1 Accuracy (%) [Higher is Better ↑]', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as (typeof MODEL_BENCHMARKS)[0];
                        return (
                          <div className="bg-white border border-emerald-900/15 p-3 rounded-xl shadow-2xl text-xs space-y-1 text-slate-800">
                            <span className="font-bold text-emerald-950 block">{data.name}</span>
                            <div className="text-slate-600 font-mono">Accuracy: <strong className="text-emerald-800">{data.top1Accuracy}%</strong></div>
                            <div className="text-slate-600 font-mono">Latency: <strong className="text-amber-600">{data.inferenceTimeMs}ms</strong> ({data.fpsThroughput} FPS)</div>
                            <div className="text-slate-600 font-mono">Model Size: <strong>{data.modelSizeMb} MB</strong> ({data.parameters})</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Models" data={MODEL_BENCHMARKS} fill="#059669">
                    {MODEL_BENCHMARKS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Pareto Sweet Spot Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center space-x-2 text-amber-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Optimal Pareto Sweet Spot Achieved</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                While Vision Transformers (ViT-B/16) require 78ms and 330MB of RAM for 93.1% accuracy, and MobileNetV3 achieves fast 14ms at the cost of high 9.6% error rate, the <strong className="text-emerald-900">Proposed Tri-Model Ensemble achieves 99.4% accuracy at only 42ms latency</strong>—running comfortably at 23.8+ frames-per-second on modern mobile GPUs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info / Citation */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3 shadow-sm">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Agricultural Computer Vision Benchmark Partition • Rice &amp; Corn Foliar Pathology (N=1,986)</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">Framework: PyTorch / ONNX Runtime Edge Engine</span>
      </div>
    </div>
  );
};
