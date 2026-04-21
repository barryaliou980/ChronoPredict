"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploadForm from "@/components/ImageUploadForm";
import { predictFromImage } from "@/lib/api";
import Link from "next/link";

export default function ImagePredictPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [modelType, setModelType] = useState<string | null>(null);
  const [instruction, setInstruction] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const storedPrediction = sessionStorage.getItem("imageConfirmPrediction");
    const storedModelType = sessionStorage.getItem("imageConfirmModelType");
    const storedInstruction = sessionStorage.getItem("imageConfirmInstruction");
    const storedLabel = sessionStorage.getItem("imageConfirmLabel");

    if (!storedPrediction || !storedModelType) {
      router.push("/predict");
      return;
    }

    setPrediction(storedPrediction);
    setModelType(storedModelType);
    setInstruction(storedInstruction || "");
    setLabel(storedLabel || "");
  }, [router]);

  const handleSubmit = async (file: File) => {
    if (!modelType) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await predictFromImage(file, modelType);

      // Store image as data URL for results page
      const reader = new FileReader();
      reader.onload = (e) => {
        sessionStorage.setItem("imageDataUrl", e.target?.result as string);
        sessionStorage.setItem("imagePredictionResult", JSON.stringify(result));
        router.push("/predict/image/results");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue lors de l'analyse d'image."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!prediction || !modelType) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="medical-hero-bg min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-primary font-bold text-sm">Confirmation par image</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Analyse <span className="text-primary">{label}</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Votre analyse par symptômes a identifié <strong className="text-slate-700">{prediction}</strong>.
          Confirmez ce diagnostic en téléchargeant une image médicale.
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-10 p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 animate-shake">
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            !
          </div>
          <p className="text-sm font-bold text-rose-700">{error}</p>
        </div>
      )}

      <ImageUploadForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        instruction={instruction}
      />

      <div className="max-w-2xl mx-auto mt-12 text-center">
        <Link
          href="/predict/results"
          className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          Retour aux résultats des symptômes
        </Link>
      </div>
    </div>
  );
}
