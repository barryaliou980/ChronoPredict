import { SymptomsInput, PredictionResult } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function predictDisease(
  data: SymptomsInput
): Promise<PredictionResult> {
  const response = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Erreur lors de la prédiction");
  }

  return response.json();
}

export async function fetchSymptoms(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/symptoms`);
  if (!response.ok) {
    throw new Error("Impossible de charger les symptômes");
  }
  const data = await response.json();
  return data.symptoms;
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}
