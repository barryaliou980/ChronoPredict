export interface SymptomsInput {
  symptoms: string[];
}

export interface PredictionResult {
  prediction: string;
  probabilities: Record<string, number>;
  risk_level: string;
}

export interface ImagePredictionResult {
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  model_type: string;
  description: string;
}

export interface ImageModelInfo {
  model_type: string;
  name: string;
  description: string;
  diseases: string[];
  classes: string[];
  is_available: boolean;
}
