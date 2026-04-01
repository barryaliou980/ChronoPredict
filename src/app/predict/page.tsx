"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PredictionForm from "@/components/PredictionForm";
import { predictDisease } from "@/lib/api";
import { SymptomsInput } from "@/types";

export default function PredictPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SymptomsInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await predictDisease(data);
      // Store result in sessionStorage and navigate to results
      sessionStorage.setItem("predictionResult", JSON.stringify(result));
      router.push("/predict/results");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue lors de l'analyse."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="medical-hero-bg min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Analyse de <span className="text-primary">Santé Personnalisée</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Complétez le questionnaire ci-dessous. Notre IA analysera vos symptômes en temps réel pour évaluer les risques potentiels.
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-10 p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 animate-shake">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            ⚠
          </div>
          <p className="text-sm font-bold text-rose-700">
            {error}
          </p>
        </div>
      )}

      <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
