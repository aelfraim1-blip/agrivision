export type CropType = 'Rice' | 'Corn';

export type DiseaseCategory = 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'Healthy';

export type PipelineStage = 'raw' | 'clahe' | 'unet' | 'classification' | 'gradcam';

export type ColormapMode = 'jet' | 'viridis' | 'inferno' | 'turbo';

export interface AccuracyMetric {
  // Classification Metrics
  top1Accuracy: number; // e.g. 98.2% (Exact primary diagnosis match)
  top3Accuracy: number; // e.g. 99.8% (Ground truth in top-3 candidates)
  macroPrecision: number; // e.g. 97.9% (Positive Predictive Value: TP / [TP + FP])
  macroRecall: number; // e.g. 98.5% (Sensitivity / True Positive Rate: TP / [TP + FN])
  specificityTNR: number; // e.g. 99.1% (True Negative Rate: TN / [TN + FP])
  macroF1Score: number; // e.g. 98.2% (Harmonic Mean: 2*(P*R)/(P+R))
  rocAucScore: number; // e.g. 99.4% (Multi-Class Area Under ROC Curve)

  // Spatial & Lesion Segmentation Metrics (U-Net)
  iouSegmentation: number; // e.g. 91.6% (Intersection over Union / Jaccard Index)
  diceCoefficient: number; // e.g. 94.8% (Dice Similarity Coefficient / F1 pixel mask)

  // Loss & Uncertainty Metrics
  crossEntropyLoss: number; // e.g. 0.038 (Categorical Log Loss)
  errorMargin: number; // e.g. ±1.2% (95% Confidence Interval margin)

  // Benchmark & Reliability
  datasetValidationBenchmark: number; // e.g. 98.8%
  reliabilityGrade: 'Optimal (Grade A+)' | 'High Precision (Grade A)' | 'Moderate Confidence' | 'Needs Review';

  // Comparative metrics vs. single models
  modelComparison?: {
    singleResNet50: {
      top1Accuracy: number;
      macroPrecision: number;
      macroRecall: number;
      macroF1Score: number;
      inferenceTimeMs: number;
      errorRate: number;
    };
    singleEfficientNetB3: {
      top1Accuracy: number;
      macroPrecision: number;
      macroRecall: number;
      macroF1Score: number;
      inferenceTimeMs: number;
      errorRate: number;
    };
    hybridEnsemble: {
      top1Accuracy: number;
      macroPrecision: number;
      macroRecall: number;
      macroF1Score: number;
      inferenceTimeMs: number;
      errorRate: number;
    };
    accuracyGainOverResNet: number; // e.g. +4.4%
    accuracyGainOverEfficientNet: number; // e.g. +2.8%
    errorReductionPercentage: number; // e.g. 61.1% error reduction
    varianceReduction: string; // e.g. '68% lower classification variance'
    robustnessScore: number; // e.g. 99.2%
  };
}

export interface EnsembleScores {
  resnet50Confidence: number; // e.g. 96.4
  efficientNetB3Confidence: number; // e.g. 97.8
  hybridScore: number; // e.g. 97.1
  topPredictions: { label: string; confidence: number; model: string }[];
}

export interface ClaheStats {
  contrastGain: string;
  clipLimit: number;
  tileGridSize: string;
  entropyBefore: number;
  entropyAfter: number;
}

export interface UnetStats {
  infectedAreaPercentage: number;
  lesionCount: number;
  healthyPixelPercentage: number;
  maskResolution: string;
}

export interface GradcamStats {
  primaryActivationRegion: string;
  peakAttentionScore: number;
  influentialFeatures: string[];
}

export interface TreatmentInfo {
  organic: string[];
  chemical: string[];
  dosage: string;
  spraySchedule: string;
  safetyPrecautions: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  crop: 'Rice' | 'Corn';
  diseaseName: string;
  scientificName: string;
  pathogenType: DiseaseCategory;
  severity: 'Healthy' | 'Low (1-15%)' | 'Moderate (16-40%)' | 'Severe (>40%)';
  overallConfidence: number;
  accuracyMetrics?: AccuracyMetric;
  ensembleScores: EnsembleScores;
  claheStats: ClaheStats;
  unetStats: UnetStats;
  gradcamStats: GradcamStats;
  symptoms: string[];
  causeAndConditions: string;
  treatment: TreatmentInfo;
  preventativeMeasures: string[];
  fieldActionUrgency: 'Immediate Action' | 'Monitor Weekly' | 'Routine Maintenance' | 'No Action Needed';
  imageUri: string;
  fieldName?: string;
  gpsLocation?: string;
  laymanSummary?: string;
  simpleActionPlan?: string[];
  farmerTip?: string;
}

export interface SampleDatasetItem {
  id: string;
  crop: 'Rice' | 'Corn';
  diseaseName: string;
  scientificName: string;
  category: DiseaseCategory;
  severity: 'Healthy' | 'Low' | 'Moderate' | 'Severe';
  description: string;
  keySymptoms: string[];
  sampleImageUrl: string;
  laymanSummary?: string;
  simpleActionPlan?: string[];
  farmerTip?: string;
}
