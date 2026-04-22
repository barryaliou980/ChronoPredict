"use client";

import { PredictionResult, ImagePredictionResult } from "@/types";
import Link from "next/link";

interface Props {
  symptomResult: PredictionResult;
  imageResult: ImagePredictionResult;
  imageDataUrl: string;
}

export default function ImageResultsDashboard({ symptomResult, imageResult, imageDataUrl }: Props) {
  const symptomConfidence = Object.entries(symptomResult.probabilities)
    .find(([k]) => k === symptomResult.prediction)?.[1] || 0;

  const combinedConfidence = (symptomConfidence + imageResult.confidence) / 2;

  const confidenceLevel = combinedConfidence >= 0.7 ? "high" : combinedConfidence >= 0.4 ? "medium" : "low";

  const confidenceConfig = {
    high: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Confiance Globale : Elevée", icon: "checkmark" },
    medium: { color: "text-amber-700", bg: "bg-amber-50", label: "Confiance Globale : Modérée", icon: "warning" },
    low: { color: "text-blue-700", bg: "bg-blue-50", label: "Confiance Globale : Faible", icon: "info" },
  };

  const config = confidenceConfig[confidenceLevel];

  const sortedImageProbs = Object.entries(imageResult.probabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const agreementMatch = imageResult.prediction.toLowerCase().includes(symptomResult.prediction.toLowerCase()) ||
    symptomResult.prediction.toLowerCase().includes(imageResult.prediction.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Combined Confidence Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="medical-gradient p-1" />
        <div className="p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase opacity-70">
                Rapport Combiné Symptômes + Image
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Diagnostic Confirmé
              </h2>
              <p className="text-slate-500 text-xs italic">
                ID Analyse: {Math.random().toString(36).substring(7).toUpperCase()} - {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm ${config.bg} ${config.color}`}>
              <span className="text-lg">
                {config.icon === "checkmark" ? "\u2713" : config.icon === "warning" ? "\u26A0" : "\u24D8"}
              </span>
              {config.label}
            </div>
          </div>

          {/* Agreement Indicator */}
          <div className={`mb-10 p-6 rounded-[2rem] border ${
            agreementMatch
              ? "bg-emerald-50/50 border-emerald-100"
              : "bg-amber-50/50 border-amber-100"
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                agreementMatch ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
              }`}>
                {agreementMatch ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`font-bold text-sm ${agreementMatch ? "text-emerald-700" : "text-amber-700"}`}>
                  {agreementMatch
                    ? "Les analyses par symptômes et par image convergent vers le même diagnostic."
                    : "Les analyses par symptômes et par image divergent. Une consultation médicale est fortement recommandée."
                  }
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Confiance combinée : {(combinedConfidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Symptom Analysis Section */}
            <div className="space-y-6">
              <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Analyse par Symptômes
              </h3>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h4 className="text-2xl font-black text-slate-900 mb-1">
                  {symptomResult.prediction}
                </h4>
                <p className="text-primary font-bold text-sm">
                  {(symptomConfidence * 100).toFixed(1)}% de probabilité
                </p>
                <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000"
                    style={{ width: `${symptomConfidence * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Image Analysis Section */}
            <div className="space-y-6">
              <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Confirmation par Image
              </h3>
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h4 className="text-2xl font-black text-slate-900 mb-1">
                  {imageResult.prediction}
                </h4>
                <p className="text-primary font-bold text-sm">
                  {(imageResult.confidence * 100).toFixed(1)}% de confiance
                </p>
                <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000"
                    style={{ width: `${imageResult.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image & Probabilities */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Uploaded Image */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              Image Analysée
            </h3>
          </div>
          <div className="p-6">
            <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={imageDataUrl}
                alt="Image médicale analysée"
                className="w-full max-h-[300px] object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 mt-4 italic">
              Type d'analyse : {imageResult.description || imageResult.model_type}
            </p>
          </div>
        </div>

        {/* Image Probabilities */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              Probabilités de l'Analyse Image
            </h3>
          </div>
          <div className="p-6 space-y-5">
            {sortedImageProbs.map(([cls, prob]) => (
              <div key={cls} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
                    {cls}
                  </span>
                  <span className="text-[10px] font-black text-primary">
                    {(prob * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000"
                    style={{ width: `${prob * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="max-w-sm">
            Analyse croisée symptômes et image. Ce document est généré automatiquement.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            Télécharger PDF
          </button>
          <Link
            href="/predict"
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-lg"
          >
            Nouvelle Analyse
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl">
        <h4 className="text-rose-700 font-bold text-sm mb-2 flex items-center gap-2">
          <span>Avertissement Légal Important</span>
        </h4>
        <p className="text-rose-600/80 text-xs leading-relaxed italic">
          Cette analyse combinée (symptômes + image) est fournie uniquement à titre informatif et éducatif.
          Elle ne constitue pas un avis médical, un diagnostic ou un traitement.
          L'analyse d'image par intelligence artificielle peut comporter des erreurs et ne remplace en aucun cas
          l'expertise d'un professionnel de santé qualifié. En cas d'urgence, contactez immédiatement les services
          de secours (15 ou 112).
        </p>
      </div>
    </div>
  );
}
