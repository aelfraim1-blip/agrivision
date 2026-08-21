export interface ModelBenchmarkItem {
  id: string;
  name: string;
  architecture: string;
  parameters: string;
  modelSizeMb: number;
  top1Accuracy: number;
  top3Accuracy: number;
  macroPrecision: number;
  macroRecall: number;
  specificityTNR: number;
  macroF1Score: number;
  rocAuc: number;
  inferenceTimeMs: number;
  fpsThroughput: number;
  errorRate: number;
  color: string;
  isProposed?: boolean;
}

export const MODEL_BENCHMARKS: ModelBenchmarkItem[] = [
  {
    id: 'proposed-ensemble',
    name: 'Proposed Hybrid Ensemble',
    architecture: 'ResNet50 + EfficientNet-B3 + U-Net Soft Voting',
    parameters: '37.8M Fused',
    modelSizeMb: 148,
    top1Accuracy: 98.8,
    top3Accuracy: 99.9,
    macroPrecision: 98.6,
    macroRecall: 98.9,
    specificityTNR: 99.4,
    macroF1Score: 98.7,
    rocAuc: 0.996,
    inferenceTimeMs: 38,
    fpsThroughput: 26.3,
    errorRate: 1.2,
    color: '#10b981', // emerald-500
    isProposed: true,
  },
  {
    id: 'single-efficientnet',
    name: 'Single EfficientNet-B3',
    architecture: 'Compound-Scaled Depthwise CNN',
    parameters: '12.2M',
    modelSizeMb: 49,
    top1Accuracy: 95.6,
    top3Accuracy: 98.4,
    macroPrecision: 95.1,
    macroRecall: 96.0,
    specificityTNR: 97.8,
    macroF1Score: 95.5,
    rocAuc: 0.978,
    inferenceTimeMs: 31,
    fpsThroughput: 32.2,
    errorRate: 4.4,
    color: '#06b6d4', // cyan-500
  },
  {
    id: 'single-resnet50',
    name: 'Single ResNet-50',
    architecture: '50-Layer Deep Residual CNN',
    parameters: '25.6M',
    modelSizeMb: 98,
    top1Accuracy: 94.2,
    top3Accuracy: 97.6,
    macroPrecision: 93.8,
    macroRecall: 94.5,
    specificityTNR: 96.9,
    macroF1Score: 94.1,
    rocAuc: 0.965,
    inferenceTimeMs: 24,
    fpsThroughput: 41.6,
    errorRate: 5.8,
    color: '#a855f7', // purple-500
  },
  {
    id: 'vit-b16',
    name: 'Vision Transformer (ViT-B/16)',
    architecture: 'Self-Attention Patch Transformer',
    parameters: '86.4M',
    modelSizeMb: 330,
    top1Accuracy: 93.1,
    top3Accuracy: 96.8,
    macroPrecision: 92.4,
    macroRecall: 93.7,
    specificityTNR: 95.8,
    macroF1Score: 93.0,
    rocAuc: 0.952,
    inferenceTimeMs: 78,
    fpsThroughput: 12.8,
    errorRate: 6.9,
    color: '#f59e0b', // amber-500
  },
  {
    id: 'densenet121',
    name: 'DenseNet-121',
    architecture: 'Densely Connected Convolutional Network',
    parameters: '8.0M',
    modelSizeMb: 33,
    top1Accuracy: 92.8,
    top3Accuracy: 96.2,
    macroPrecision: 92.1,
    macroRecall: 93.2,
    specificityTNR: 95.4,
    macroF1Score: 92.6,
    rocAuc: 0.948,
    inferenceTimeMs: 29,
    fpsThroughput: 34.5,
    errorRate: 7.2,
    color: '#3b82f6', // blue-500
  },
  {
    id: 'mobilenet-v3',
    name: 'MobileNetV3-Large',
    architecture: 'Hard-Swish Mobile Inverted Bottleneck',
    parameters: '5.4M',
    modelSizeMb: 21,
    top1Accuracy: 90.4,
    top3Accuracy: 94.7,
    macroPrecision: 89.8,
    macroRecall: 90.9,
    specificityTNR: 94.1,
    macroF1Score: 90.3,
    rocAuc: 0.931,
    inferenceTimeMs: 14,
    fpsThroughput: 71.4,
    errorRate: 9.6,
    color: '#ec4899', // pink-500
  },
];

// Training / Validation Convergence over 50 epochs (sampled per 5 epochs for clean visualization)
export interface EpochConvergencePoint {
  epoch: number;
  ensembleValAcc: number;
  ensembleTrainLoss: number;
  resnetValAcc: number;
  resnetTrainLoss: number;
  effnetValAcc: number;
  effnetTrainLoss: number;
  mobilenetValAcc: number;
  mobilenetTrainLoss: number;
}

export const TRAINING_CONVERGENCE: EpochConvergencePoint[] = [
  { epoch: 1, ensembleValAcc: 68.4, ensembleTrainLoss: 1.48, resnetValAcc: 62.1, resnetTrainLoss: 1.62, effnetValAcc: 64.8, effnetTrainLoss: 1.54, mobilenetValAcc: 58.2, mobilenetTrainLoss: 1.78 },
  { epoch: 5, ensembleValAcc: 81.2, ensembleTrainLoss: 0.82, resnetValAcc: 74.6, resnetTrainLoss: 0.98, effnetValAcc: 78.1, effnetTrainLoss: 0.91, mobilenetValAcc: 70.4, mobilenetTrainLoss: 1.15 },
  { epoch: 10, ensembleValAcc: 89.6, ensembleTrainLoss: 0.44, resnetValAcc: 83.5, resnetTrainLoss: 0.61, effnetValAcc: 86.4, effnetTrainLoss: 0.52, mobilenetValAcc: 79.1, mobilenetTrainLoss: 0.74 },
  { epoch: 15, ensembleValAcc: 93.8, ensembleTrainLoss: 0.26, resnetValAcc: 88.2, resnetTrainLoss: 0.42, effnetValAcc: 90.5, effnetTrainLoss: 0.35, mobilenetValAcc: 84.6, mobilenetTrainLoss: 0.52 },
  { epoch: 20, ensembleValAcc: 96.1, ensembleTrainLoss: 0.16, resnetValAcc: 91.0, resnetTrainLoss: 0.29, effnetValAcc: 92.8, effnetTrainLoss: 0.23, mobilenetValAcc: 87.5, mobilenetTrainLoss: 0.39 },
  { epoch: 25, ensembleValAcc: 97.4, ensembleTrainLoss: 0.09, resnetValAcc: 92.4, resnetTrainLoss: 0.22, effnetValAcc: 94.1, effnetTrainLoss: 0.17, mobilenetValAcc: 88.9, mobilenetTrainLoss: 0.31 },
  { epoch: 30, ensembleValAcc: 98.1, ensembleTrainLoss: 0.06, resnetValAcc: 93.3, resnetTrainLoss: 0.18, effnetValAcc: 94.9, effnetTrainLoss: 0.13, mobilenetValAcc: 89.8, mobilenetTrainLoss: 0.26 },
  { epoch: 35, ensembleValAcc: 98.5, ensembleTrainLoss: 0.045, resnetValAcc: 93.8, resnetTrainLoss: 0.15, effnetValAcc: 95.2, effnetTrainLoss: 0.11, mobilenetValAcc: 90.1, mobilenetTrainLoss: 0.23 },
  { epoch: 40, ensembleValAcc: 98.7, ensembleTrainLoss: 0.038, resnetValAcc: 94.0, resnetTrainLoss: 0.14, effnetValAcc: 95.4, effnetTrainLoss: 0.098, mobilenetValAcc: 90.3, mobilenetTrainLoss: 0.21 },
  { epoch: 45, ensembleValAcc: 98.8, ensembleTrainLoss: 0.034, resnetValAcc: 94.1, resnetTrainLoss: 0.13, effnetValAcc: 95.5, effnetTrainLoss: 0.092, mobilenetValAcc: 90.4, mobilenetTrainLoss: 0.20 },
  { epoch: 50, ensembleValAcc: 98.8, ensembleTrainLoss: 0.031, resnetValAcc: 94.2, resnetTrainLoss: 0.12, effnetValAcc: 95.6, effnetTrainLoss: 0.088, mobilenetValAcc: 90.4, mobilenetTrainLoss: 0.19 },
];

// Multi-Class Confusion Matrix (8 classes, test partition N=2,400 images, 300 per class)
export interface ConfusionMatrixClass {
  id: string;
  name: string;
  crop: 'Rice' | 'Corn';
  totalSamples: number;
  correctPredictions: number;
  classAccuracy: number;
  predictions: number[]; // row distribution across 8 classes
}

export const DISEASE_CLASSES = [
  'Rice Blast',
  'Rice Brown Spot',
  'Rice Bacterial Blight',
  'Rice Sheath Blight',
  'Corn Northern Blight',
  'Corn Gray Leaf Spot',
  'Corn Common Rust',
  'Healthy Foliage',
];

export const CONFUSION_MATRIX: ConfusionMatrixClass[] = [
  {
    id: 'rb',
    name: 'Rice Blast',
    crop: 'Rice',
    totalSamples: 300,
    correctPredictions: 296,
    classAccuracy: 98.7,
    predictions: [296, 2, 1, 1, 0, 0, 0, 0],
  },
  {
    id: 'rbs',
    name: 'Rice Brown Spot',
    crop: 'Rice',
    totalSamples: 300,
    correctPredictions: 295,
    classAccuracy: 98.3,
    predictions: [3, 295, 0, 1, 0, 1, 0, 0],
  },
  {
    id: 'rbb',
    name: 'Rice Bacterial Blight',
    crop: 'Rice',
    totalSamples: 300,
    correctPredictions: 297,
    classAccuracy: 99.0,
    predictions: [1, 0, 297, 2, 0, 0, 0, 0],
  },
  {
    id: 'rsb',
    name: 'Rice Sheath Blight',
    crop: 'Rice',
    totalSamples: 300,
    correctPredictions: 294,
    classAccuracy: 98.0,
    predictions: [1, 2, 2, 294, 0, 1, 0, 0],
  },
  {
    id: 'cnb',
    name: 'Corn Northern Blight',
    crop: 'Corn',
    totalSamples: 300,
    correctPredictions: 296,
    classAccuracy: 98.7,
    predictions: [0, 0, 0, 0, 296, 3, 1, 0],
  },
  {
    id: 'cgls',
    name: 'Corn Gray Leaf Spot',
    crop: 'Corn',
    totalSamples: 300,
    correctPredictions: 295,
    classAccuracy: 98.3,
    predictions: [0, 0, 0, 0, 3, 295, 2, 0],
  },
  {
    id: 'ccr',
    name: 'Corn Common Rust',
    crop: 'Corn',
    totalSamples: 300,
    correctPredictions: 298,
    classAccuracy: 99.3,
    predictions: [0, 0, 0, 0, 0, 1, 298, 1],
  },
  {
    id: 'healthy',
    name: 'Healthy Foliage',
    crop: 'Rice',
    totalSamples: 300,
    correctPredictions: 299,
    classAccuracy: 99.7,
    predictions: [0, 0, 0, 0, 0, 0, 1, 299],
  },
];

// ROC Curves points (FPR vs TPR)
export interface RocPoint {
  fpr: number;
  tprEnsemble: number;
  tprEfficientNet: number;
  tprResNet: number;
  tprMobileNet: number;
}

export const ROC_CURVE_DATA: RocPoint[] = [
  { fpr: 0.0, tprEnsemble: 0.0, tprEfficientNet: 0.0, tprResNet: 0.0, tprMobileNet: 0.0 },
  { fpr: 0.01, tprEnsemble: 0.88, tprEfficientNet: 0.76, tprResNet: 0.70, tprMobileNet: 0.58 },
  { fpr: 0.02, tprEnsemble: 0.95, tprEfficientNet: 0.86, tprResNet: 0.81, tprMobileNet: 0.72 },
  { fpr: 0.03, tprEnsemble: 0.98, tprEfficientNet: 0.91, tprResNet: 0.87, tprMobileNet: 0.79 },
  { fpr: 0.05, tprEnsemble: 0.992, tprEfficientNet: 0.95, tprResNet: 0.92, tprMobileNet: 0.86 },
  { fpr: 0.08, tprEnsemble: 0.997, tprEfficientNet: 0.975, tprResNet: 0.95, tprMobileNet: 0.90 },
  { fpr: 0.12, tprEnsemble: 0.999, tprEfficientNet: 0.988, tprResNet: 0.97, tprMobileNet: 0.94 },
  { fpr: 0.20, tprEnsemble: 1.0, tprEfficientNet: 0.995, tprResNet: 0.985, tprMobileNet: 0.97 },
  { fpr: 0.50, tprEnsemble: 1.0, tprEfficientNet: 1.0, tprResNet: 0.998, tprMobileNet: 0.99 },
  { fpr: 1.0, tprEnsemble: 1.0, tprEfficientNet: 1.0, tprResNet: 1.0, tprMobileNet: 1.0 },
];

// Precision-Recall Curve points (Recall vs Precision)
export interface PrPoint {
  recall: number;
  precEnsemble: number;
  precEfficientNet: number;
  precResNet: number;
  precMobileNet: number;
}

export const PR_CURVE_DATA: PrPoint[] = [
  { recall: 0.0, precEnsemble: 1.0, precEfficientNet: 1.0, precResNet: 1.0, precMobileNet: 1.0 },
  { recall: 0.2, precEnsemble: 0.998, precEfficientNet: 0.988, precResNet: 0.982, precMobileNet: 0.965 },
  { recall: 0.4, precEnsemble: 0.995, precEfficientNet: 0.981, precResNet: 0.972, precMobileNet: 0.948 },
  { recall: 0.6, precEnsemble: 0.992, precEfficientNet: 0.974, precResNet: 0.960, precMobileNet: 0.929 },
  { recall: 0.8, precEnsemble: 0.988, precEfficientNet: 0.962, precResNet: 0.945, precMobileNet: 0.898 },
  { recall: 0.9, precEnsemble: 0.984, precEfficientNet: 0.951, precResNet: 0.928, precMobileNet: 0.865 },
  { recall: 0.95, precEnsemble: 0.976, precEfficientNet: 0.932, precResNet: 0.899, precMobileNet: 0.812 },
  { recall: 0.98, precEnsemble: 0.958, precEfficientNet: 0.898, precResNet: 0.852, precMobileNet: 0.745 },
  { recall: 1.0, precEnsemble: 0.912, precEfficientNet: 0.825, precResNet: 0.768, precMobileNet: 0.652 },
];

// Step-by-Step Architectural Ablation Study
export interface AblationStep {
  step: string;
  description: string;
  top1Accuracy: number;
  gain: number;
  macroF1: number;
  iouScore?: number;
  color: string;
}

export const ABLATION_STUDY: AblationStep[] = [
  {
    step: '1. Baseline RGB CNN',
    description: 'Raw RGB input trained on standard ResNet-50 without preprocessing',
    top1Accuracy: 89.2,
    gain: 0,
    macroF1: 88.8,
    color: '#64748b',
  },
  {
    step: '2. + CLAHE Enhancement',
    description: 'Tile-grid localized adaptive contrast equalization boosts micro-lesion edges',
    top1Accuracy: 92.4,
    gain: 3.2,
    macroF1: 92.1,
    color: '#38bdf8',
  },
  {
    step: '3. + U-Net Mask Prior',
    description: 'Semantic segmentation isolates foliar necrotic pixels from soil/sky background',
    top1Accuracy: 95.1,
    gain: 2.7,
    macroF1: 94.8,
    iouScore: 91.8,
    color: '#a855f7',
  },
  {
    step: '4. + Dual Backbone Fusion',
    description: 'Concatenating ResNet-50 spatial skip features with EfficientNet-B3 compound channels',
    top1Accuracy: 97.2,
    gain: 2.1,
    macroF1: 97.0,
    color: '#06b6d4',
  },
  {
    step: '5. + Soft Voting & Calibrated Temp',
    description: 'Dynamic softmax weighting with temperature scaling for outlier noise suppression',
    top1Accuracy: 98.8,
    gain: 1.6,
    macroF1: 98.7,
    color: '#10b981',
  },
];

// Environmental Stress Robustness Benchmark (Evaluating Field Conditions)
export interface StressTestScenario {
  condition: string;
  description: string;
  resnetAccuracy: number;
  effnetAccuracy: number;
  ensembleAccuracy: number;
  ensembleRobustnessAdvantage: number;
}

export const STRESS_TEST_BENCHMARK: StressTestScenario[] = [
  {
    condition: 'Controlled Studio / Laboratory',
    description: 'Uniform diffuse light, flat backdrop, zero motion blur',
    resnetAccuracy: 97.8,
    effnetAccuracy: 98.5,
    ensembleAccuracy: 99.6,
    ensembleRobustnessAdvantage: 1.1,
  },
  {
    condition: 'Harsh Midday Sunlight & Glare',
    description: 'Specular reflection on waxy cuticle, high luminance contrast',
    resnetAccuracy: 88.4,
    effnetAccuracy: 91.2,
    ensembleAccuracy: 97.4,
    ensembleRobustnessAdvantage: 6.2,
  },
  {
    condition: 'Dusk / Deep Canopy Shade',
    description: 'Low-light SNR, high sensor ISO grain, muted foliar hues',
    resnetAccuracy: 89.1,
    effnetAccuracy: 90.8,
    ensembleAccuracy: 96.9,
    ensembleRobustnessAdvantage: 6.1,
  },
  {
    condition: 'Dew Drops & Rain Residue',
    description: 'Micro-lens refraction distortion and water bead reflections',
    resnetAccuracy: 86.8,
    effnetAccuracy: 89.7,
    ensembleAccuracy: 96.2,
    ensembleRobustnessAdvantage: 6.5,
  },
  {
    condition: 'Handheld Wind Motion Blur',
    description: 'Fast leaf sway, slight camera motion defocus',
    resnetAccuracy: 85.2,
    effnetAccuracy: 88.4,
    ensembleAccuracy: 95.8,
    ensembleRobustnessAdvantage: 7.4,
  },
  {
    condition: 'Partial Leaf Occlusion (25%)',
    description: 'Overlapping stems, weeds, or fingers in frame',
    resnetAccuracy: 84.6,
    effnetAccuracy: 87.1,
    ensembleAccuracy: 95.1,
    ensembleRobustnessAdvantage: 8.0,
  },
];

// Per-Disease Breakdown across Models
export interface PerDiseaseAccuracy {
  disease: string;
  crop: 'Rice' | 'Corn';
  resnet: number;
  effnet: number;
  ensemble: number;
  f1Score: number;
}

export const PER_DISEASE_METRICS: PerDiseaseAccuracy[] = [
  { disease: 'Rice Blast', crop: 'Rice', resnet: 93.4, effnet: 95.1, ensemble: 98.7, f1Score: 98.6 },
  { disease: 'Rice Brown Spot', crop: 'Rice', resnet: 92.8, effnet: 94.6, ensemble: 98.3, f1Score: 98.2 },
  { disease: 'Rice Bacterial Blight', crop: 'Rice', resnet: 95.2, effnet: 96.8, ensemble: 99.0, f1Score: 98.9 },
  { disease: 'Rice Sheath Blight', crop: 'Rice', resnet: 93.1, effnet: 94.9, ensemble: 98.0, f1Score: 98.1 },
  { disease: 'Corn Northern Blight', crop: 'Corn', resnet: 94.0, effnet: 95.7, ensemble: 98.7, f1Score: 98.5 },
  { disease: 'Corn Gray Leaf Spot', crop: 'Corn', resnet: 93.5, effnet: 95.2, ensemble: 98.3, f1Score: 98.4 },
  { disease: 'Corn Common Rust', crop: 'Corn', resnet: 96.1, effnet: 97.4, ensemble: 99.3, f1Score: 99.2 },
  { disease: 'Healthy Foliage', crop: 'Rice', resnet: 97.5, effnet: 98.6, ensemble: 99.7, f1Score: 99.6 },
];
