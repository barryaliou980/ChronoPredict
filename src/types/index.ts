export interface SymptomsInput {
  symptoms: string[];
}

export interface PredictionResult {
  prediction: string;
  probabilities: Record<string, number>;
  risk_level: string;
}
