"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResultsDashboard from "@/components/ResultsDashboard";
import { PredictionResult } from "@/types";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("predictionResult");
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.push("/predict");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Résultats de l'analyse
        </h1>
        <p className="text-slate-600">
          Voici les résultats de votre évaluation de risque
        </p>
      </div>

      <ResultsDashboard result={result} />
    </div>
  );
}
