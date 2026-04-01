"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PredictionForm from "@/components/PredictionForm";
import { predictDisease } from "@/lib/api";
import { PatientInput } from "@/types";

export default function PredictPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PatientInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await predictDisease(data);
      // Store result in sessionStorage and navigate to results
      sessionStorage.setItem("predictionResult", JSON.stringify(result));
      router.push("/predict/results");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Analyse de risque
        </h1>
        <p className="text-slate-600">
          Renseignez vos données de santé pour obtenir une prédiction
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
