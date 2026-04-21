"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageResultsDashboard from "@/components/ImageResultsDashboard";
import { PredictionResult, ImagePredictionResult } from "@/types";

export default function ImageResultsPage() {
  const router = useRouter();
  const [symptomResult, setSymptomResult] = useState<PredictionResult | null>(null);
  const [imageResult, setImageResult] = useState<ImagePredictionResult | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedSymptom = sessionStorage.getItem("predictionResult");
    const storedImage = sessionStorage.getItem("imagePredictionResult");
    const storedImageData = sessionStorage.getItem("imageDataUrl");

    if (!storedSymptom || !storedImage || !storedImageData) {
      router.push("/predict");
      return;
    }

    setSymptomResult(JSON.parse(storedSymptom));
    setImageResult(JSON.parse(storedImage));
    setImageDataUrl(storedImageData);
  }, [router]);

  if (!symptomResult || !imageResult || !imageDataUrl) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-primary font-bold text-sm">Analyse croisée</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Résultats Combinés
        </h1>
        <p className="text-slate-600">
          Synthèse de l'analyse par symptômes et de la confirmation par image
        </p>
      </div>

      <ImageResultsDashboard
        symptomResult={symptomResult}
        imageResult={imageResult}
        imageDataUrl={imageDataUrl}
      />
    </div>
  );
}
