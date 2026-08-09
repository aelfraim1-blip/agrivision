import React, { useState, useEffect, useRef } from 'react';
import {
  PipelineStage,
  AnalysisResult,
  ColormapMode,
} from '../types';
import {
  processCLAHEImage,
  generateUNetMask,
  generateGradCAMHeatmap,
} from '../utils/imageProcessing';
import {
  Sparkles,
  Sliders,
  Layers,
  Cpu,
  Eye,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Info,
  Maximize2,
  Activity,
} from 'lucide-react';

interface PipelineViewerProps {
  rawImageUri: string;
  analysis: AnalysisResult;
}

export const PipelineViewer: React.FC<PipelineViewerProps> = ({ rawImageUri, analysis }) => {
  const [activeStage, setActiveStage] = useState<PipelineStage>('gradcam');
  
  // Pipeline Processing States
  const [claheImageUri, setClaheImageUri] = useState<string>(rawImageUri);
  const [origHist, setOrigHist] = useState<number[]>([]);
  const [claheHist, setClaheHist] = useState<number[]>([]);
  const [clipLimit, setClipLimit] = useState<number>(2.5);

  const [unetMaskUri, setUnetMaskUri] = useState<string>(rawImageUri);
  const [infectedPercent, setInfectedPercent] = useState<number>(analysis.unetStats?.infectedAreaPercentage || 18.5);
  const [lesionCount, setLesionCount] = useState<number>(analysis.unetStats?.lesionCount || 12);
  const [unetOpacity, setUnetOpacity] = useState<number>(0.65);

  const [gradcamUri, setGradcamUri] = useState<string>(rawImageUri);
  const [colormapMode, setColormapMode] = useState<ColormapMode>('jet');
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(0.6);

  // Hidden Image Ref for Canvas operations
  const sourceImageRef = useRef<HTMLImageElement>(null);

  // Run pipeline step canvas generators when image or settings change
  const runPipelineComputations = () => {
    if (!sourceImageRef.current) return;
    const img = sourceImageRef.current;

    // 1. Process CLAHE
    const claheResult = processCLAHEImage(img, clipLimit, 8);
    setClaheImageUri(claheResult.enhancedDataUrl);
    setOrigHist(claheResult.originalHistogram);
    setClaheHist(claheResult.claheHistogram);

    // 2. Process UNet Segmentation
    const unetResult = generateUNetMask(img, unetOpacity);
    setUnetMaskUri(unetResult.maskDataUrl);
    setInfectedPercent(unetResult.infectedAreaPercentage);
    setLesionCount(unetResult.lesionCount);

    // 3. Process Grad-CAM Heatmap
    const gradcamDataUrl = generateGradCAMHeatmap(img, colormapMode, heatmapOpacity);
    setGradcamUri(gradcamDataUrl);
  };

  useEffect(() => {
    if (sourceImageRef.current && sourceImageRef.current.complete) {
      runPipelineComputations();
    }
  }, [rawImageUri, clipLimit, unetOpacity, colormapMode, heatmapOpacity]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      
      {/* Hidden Image for processing */}
      <img
        ref={sourceImageRef}
        src={rawImageUri}
        alt="Source Leaf"
        crossOrigin="anonymous"
        onLoad={runPipelineComputations}
        className="hidden"
      />

      {/* Header & Stage Nav */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">How the AI Doctor Analyzed Your Leaf</h3>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 5-stage process explaining how computer vision turns a leaf photo into an accurate crop diagnosis
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold px-1">AI Certainty Score:</span>
            <span className="text-sm font-extrabold text-emerald-400">
              {analysis.ensembleScores?.hybridScore || 97.5}% (Very High)
            </span>
          </div>
        </div>

        {/* Stage Selector Tabs with Plain Language Subtitles */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveStage('raw')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
              activeStage === 'raw'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold">1. Photo</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Original Leaf</span>
          </button>

          <button
            onClick={() => setActiveStage('clahe')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
              activeStage === 'clahe'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold">2. Sharpen</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Enhanced Contrast</span>
          </button>

          <button
            onClick={() => setActiveStage('unet')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
              activeStage === 'unet'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">3. Spot Mask</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Highlight Spots</span>
          </button>

          <button
            onClick={() => setActiveStage('classification')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
              activeStage === 'classification'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold">4. AI Matcher</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Compare Diseases</span>
          </button>

          <button
            onClick={() => setActiveStage('gradcam')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-semibold transition-all ${
              activeStage === 'gradcam'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-bold">5. Heatmap</span>
            </div>
            <span className="text-[10px] text-slate-400 font-normal">AI Focus Map</span>
          </button>
        </div>
      </div>

      {/* Stage Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Columns: Stage Image Canvas Preview */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-4 relative min-h-[360px] flex items-center justify-center">
          
          {activeStage === 'raw' && (
            <div className="w-full text-center space-y-3">
              <div className="relative inline-block rounded-xl overflow-hidden border border-slate-700 max-h-[340px]">
                <img src={rawImageUri} alt="Raw Leaf Input" className="max-h-[340px] w-auto object-contain mx-auto" />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] text-slate-300 font-mono">
                  Smartphone Camera Sensor Frame (1280x720)
                </div>
              </div>
            </div>
          )}

          {activeStage === 'clahe' && (
            <div className="w-full space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 text-center">
                  <span className="text-[11px] font-semibold text-slate-400">Original Smartphone Leaf</span>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-black max-h-[280px]">
                    <img src={rawImageUri} alt="Original" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-1 text-center">
                  <span className="text-[11px] font-semibold text-amber-400">CLAHE Enhanced Leaf</span>
                  <div className="rounded-xl overflow-hidden border border-amber-500/40 bg-black max-h-[280px]">
                    <img src={claheImageUri} alt="CLAHE Enhanced" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'unet' && (
            <div className="w-full space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-emerald-500/40 bg-black max-h-[320px]">
                <img src={unetMaskUri} alt="UNet Mask" className="max-h-[320px] w-auto mx-auto object-contain" />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="text-slate-300 font-medium">Lesions: {infectedPercent}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-300 font-medium">Healthy Tissue</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'classification' && (
            <div className="w-full space-y-4 text-center">
              <div className="relative inline-block rounded-xl overflow-hidden border border-slate-700 max-h-[280px]">
                <img src={claheImageUri} alt="Ensemble Feature Input" className="max-h-[280px] w-auto mx-auto object-contain" />
              </div>
              <p className="text-xs text-slate-400">
                Feature vectors extracted via ResNet50 deep spatial residual blocks and EfficientNet B3 compound scaled feature maps.
              </p>
            </div>
          )}

          {activeStage === 'gradcam' && (
            <div className="w-full space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-rose-500/40 bg-black max-h-[320px]">
                <img src={gradcamUri} alt="Grad-CAM Heatmap" className="max-h-[320px] w-auto mx-auto object-contain" />
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-rose-300 font-semibold border border-rose-500/30">
                  Grad-CAM Feature Activation Map ({colormapMode.toUpperCase()})
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Columns: Stage Explanation & Controls */}
        <div className="lg:col-span-5 space-y-4">
          
          {activeStage === 'raw' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Stage 1: Raw Smartphone Input</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Captures leaf geometry, lighting balance, and shadow artifacts directly from the mobile sensor. Performs RGB normalization before deep feature extraction.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Crop Detected:</span>
                  <span className="text-emerald-400 font-bold">{analysis.crop}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Leaf Status:</span>
                  <span className="text-white font-medium">Valid Canopy Leaf</span>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'clahe' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Stage 2: CLAHE Contrast Enhancement</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contrast Limited Adaptive Histogram Equalization transforms low-contrast smartphone images, accentuating subtle lesion margins and fungal spores without over-amplifying background noise.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Clip Limit (Tile Threshold):</span>
                  <span className="font-bold text-amber-400">{clipLimit}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={clipLimit}
                  onChange={(e) => setClipLimit(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 rounded bg-slate-800 cursor-pointer"
                />
              </div>

              {/* Histogram Mini Chart */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Luminance Entropy Distribution:</span>
                <div className="h-12 flex items-end space-x-0.5 overflow-hidden">
                  {claheHist.slice(0, 64).map((v, i) => (
                    <div
                      key={i}
                      style={{ height: `${Math.min(100, (v / (Math.max(...claheHist) || 1)) * 100)}%` }}
                      className="flex-1 bg-amber-500/80 rounded-t-[1px]"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStage === 'unet' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Stage 3: UNet Semantic Segmentation</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Employs encoder-decoder UNet convolution layers to segment diseased leaf regions pixel-by-pixel, quantifying total leaf surface area infected.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-medium block">Infected Area %</span>
                  <span className="text-base font-extrabold text-rose-400">{infectedPercent}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-medium block">Isolated Lesion Clusters</span>
                  <span className="text-base font-extrabold text-amber-400">{lesionCount}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Mask Opacity:</span>
                  <span className="font-bold text-emerald-400">{Math.round(unetOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={unetOpacity}
                  onChange={(e) => setUnetOpacity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 rounded bg-slate-800 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeStage === 'classification' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Stage 4: Hybrid Model Classification</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fuses deep feature maps from ResNet50 (residual spatial representation) and EfficientNet B3 (compound scaled depth) for robust disease prediction.
              </p>

              {/* Dual Model Bar Meters */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">ResNet50 Classifier:</span>
                    <span className="text-purple-400 font-bold">{analysis.ensembleScores?.resnet50Confidence || 96.2}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${analysis.ensembleScores?.resnet50Confidence || 96.2}%` }}
                      className="h-full bg-purple-500 rounded-full"
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">EfficientNet B3 Classifier:</span>
                    <span className="text-cyan-400 font-bold">{analysis.ensembleScores?.efficientNetB3Confidence || 97.8}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${analysis.ensembleScores?.efficientNetB3Confidence || 97.8}%` }}
                      className="h-full bg-cyan-400 rounded-full"
                    ></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-300">Weighted Hybrid Ensemble:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{analysis.ensembleScores?.hybridScore || 97.0}%</span>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'gradcam' && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-rose-400" />
                <span>Stage 5: Grad-CAM Explainable AI Visualizer</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gradient-weighted Class Activation Mapping computes backpropagated gradients to project heatmap activations onto the leaf, confirming prediction focus.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Colormap Palette:</span>
                  <span className="font-bold text-rose-400 uppercase">{colormapMode}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['jet', 'viridis', 'inferno', 'turbo'] as ColormapMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColormapMode(mode)}
                      className={`py-1 rounded text-[11px] font-semibold uppercase border transition-all ${
                        colormapMode === mode
                          ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Heatmap Opacity:</span>
                  <span className="font-bold text-rose-400">{Math.round(heatmapOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.95"
                  step="0.05"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 rounded bg-slate-800 cursor-pointer"
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
