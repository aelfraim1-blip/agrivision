import React from 'react';
import { Cpu, Layers, Sliders, Activity, X, CheckCircle, Sparkles } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border-2 border-emerald-900/20 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto my-8 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-emerald-800" />
            <h2 className="text-xl font-extrabold text-emerald-950">Hybrid Pipeline &amp; Frontiers Tri-Ensemble Architecture Specs</h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Technical explanation of the vision &amp; deep learning model ensemble engineered for Rice &amp; Corn leaf diagnostics based on <em>Frontiers in Plant Science (DOI: 10.3389/fpls.2021.701038)</em>.
          </p>
        </div>

        {/* Models Detailed Grid */}
        <div className="space-y-4">
          
          {/* 1. CLAHE */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-extrabold text-emerald-950">1. CLAHE (Contrast Limited Adaptive Histogram Equalization)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> Resolves field illumination variance, sunshine flare, and shadows. CLAHE breaks the leaf image into localized grid tiles (8x8), equalizing histograms while enforcing a contrast clip limit. This magnifies subtle fungal lesion borders and necrotic spot details without introducing noise artifacts.
            </p>
          </div>

          {/* 2. UNet */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-extrabold text-emerald-950">2. UNet Semantic Leaf Mask Segmentation</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> UNet utilizes a symmetric contracting path (encoder) and expanding path (decoder) with skip-connections. It performs pixel-wise classification to isolate diseased leaf tissue from healthy plant tissue and background debris, enabling accurate surface area infection percentage calculation (e.g. 24.5%).
            </p>
          </div>

          {/* 3. SE-ResNet-50 */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-extrabold text-emerald-950">3. SE-ResNet-50 (Squeeze-and-Excitation Residual Attention)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> Explicitly models interdependencies between feature channels. The Squeeze-and-Excitation block compresses spatial features into channel descriptors and dynamically recalibrates channel weights, amplifying diagnostic foliar lesion signals while suppressing outdoor background clutter.
            </p>
          </div>

          {/* 4. ResNeSt-50 */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-extrabold text-emerald-950">4. ResNeSt-50 (Split-Attention Multi-Scale Networks)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> Resolves the multi-scale lesion size limitation. Splits feature channels into distinct cardinalities with Radix softmax attention across channel splits, allowing the network to simultaneously capture micro-lesions (1-5mm Brown Spot dots) and continuous macro-lesions (&gt;30mm Sheath Blight streaks).
            </p>
          </div>

          {/* 5. DenseNet-121 */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-extrabold text-emerald-950">5. DenseNet-121 (Dense Feature Connectivity &amp; Reuse)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> Connects every layer to every subsequent layer in a feed-forward fashion, ensuring maximum feature reuse, gradient propagation, and subtle marginal texture preservation across deep layers.
            </p>
          </div>

          {/* 6. Grad-CAM */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-900/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-extrabold text-emerald-950">6. Grad-CAM (Gradient-Weighted Class Activation Mapping)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Purpose:</strong> Provides Explainable AI (XAI). By backpropagating target disease gradients to the final convolutional layer, Grad-CAM overlays an attention heatmap directly onto the leaf image, proving to farmers and agronomists that the prediction is based on true lesion symptoms rather than background noise.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-emerald-900/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs shadow-md"
          >
            Close Pipeline Specs
          </button>
        </div>

      </div>
    </div>
  );
};
