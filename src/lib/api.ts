import { SymptomsInput, PredictionResult, ImagePredictionResult } from "@/types";

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

export async function predictFromImage(
  file: File,
  modelType: string
): Promise<ImagePredictionResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model_type", modelType);

  const response = await fetch(`${API_URL}/api/predict/image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Erreur lors de l'analyse d'image");
  }

  return response.json();
}

export async function getDiseaseMapping(): Promise<Record<string, string>> {
  const response = await fetch(`${API_URL}/api/predict/image/mapping`);
  if (!response.ok) {
    throw new Error("Impossible de charger le mapping des maladies");
  }
  return response.json();
}
