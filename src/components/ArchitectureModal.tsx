import React from 'react';
import { Cpu, Layers, Sliders, Activity, X, CheckCircle, Sparkles } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Hybrid Pipeline Architecture Specs</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Technical explanation of the 5-tier vision & deep learning model ensemble engineered for Rice & Corn leaf diagnostics.
          </p>
        </div>

        {/* 5 Models Detailed Grid */}
        <div className="space-y-4">
          
          {/* 1. CLAHE */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">1. CLAHE (Contrast Limited Adaptive Histogram Equalization)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Purpose:</strong> Smartphone camera sensors in variable outdoor sunlight frequently suffer from harsh shadows or glare. CLAHE breaks the leaf image into localized grid tiles (e.g. 8x8), equalizing histograms while enforcing a contrast clip limit. This magnifies subtle fungal lesion borders and necrotic spot details without introducing noise artifacts.
            </p>
          </div>

          {/* 2. UNet */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">2. UNet Semantic Leaf Mask Segmentation</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Purpose:</strong> UNet utilizes a symmetric contracting path (encoder) and expanding path (decoder) with skip-connections. It performs pixel-wise classification to isolate diseased leaf tissue from healthy plant tissue and background debris, enabling accurate surface area infection percentage calculation (e.g. 24.5%).
            </p>
          </div>

          {/* 3. ResNet50 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">3. ResNet50 (Deep Residual Network)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Purpose:</strong> ResNet50 uses 50 deep convolutional layers with residual skip connections (<code className="text-purple-300">F(x) + x</code>) to prevent vanishing gradients. It excels at recognizing complex multi-scale spatial patterns such as spindle-shaped rice blast lesions and cigar-shaped corn blights.
            </p>
          </div>

          {/* 4. EfficientNet B3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">4. EfficientNet B3 (Compound Scaled Classifier)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Purpose:</strong> EfficientNet B3 uniformly scales network depth, width, and resolution using a compound coefficient. Fusing ResNet50 with EfficientNet B3 creates a high-accuracy hybrid ensemble that mitigates single-model bias and achieves 97%+ classification accuracy.
            </p>
          </div>

          {/* 5. Grad-CAM */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">5. Grad-CAM (Gradient-Weighted Class Activation Mapping)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Purpose:</strong> Provides Explainable AI (XAI). By backpropagating target disease gradients to the final convolutional layer, Grad-CAM overlays an attention heatmap directly onto the leaf image, proving to farmers and agronomists that the prediction is based on true lesion symptoms rather than background noise.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
          >
            Close Pipeline Specs
          </button>
        </div>

      </div>
    </div>
  );
};
