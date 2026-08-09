export type CropType = 'Rice' | 'Corn' | 'Auto-detect';

export type DiseaseCategory = 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'Healthy';

export type PipelineStage = 'raw' | 'clahe' | 'unet' | 'classification' | 'gradcam';

export type ColormapMode = 'jet' | 'viridis' | 'inferno' | 'turbo';

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
