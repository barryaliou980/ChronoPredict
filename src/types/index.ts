export interface PatientInput {
  age: number;
  sex: number;
  high_chol: number;
  chol_check: number;
  bmi: number;
  smoker: number;
  phys_activity: number;
  fruits: number;
  veggies: number;
  hvy_alcohol_consump: number;
  gen_hlth: number;
  ment_hlth: number;
  phys_hlth: number;
  diff_walk: number;
}

export interface PredictionResult {
  prediction: string;
  probabilities: Record<string, number>;
  risk_level: string;
}
