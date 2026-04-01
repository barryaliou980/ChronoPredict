"use client";

import { PredictionResult } from "@/types";
import Link from "next/link";

const DISEASE_LABELS: Record<string, string> = {
  Healthy: "En bonne santé",
  "Single Condition": "Une condition chronique",
  "Multiple Conditions": "Conditions multiples",
};

const RISK_CONFIG: Record<string, { color: string; bg: string; text: string }> =
  {
    Low: {
      color: "text-green-700",
      bg: "bg-green-100",
      text: "Risque faible",
    },
    Medium: {
      color: "text-amber-700",
      bg: "bg-amber-100",
      text: "Risque modéré",
    },
    High: { color: "text-red-700", bg: "bg-red-100", text: "Risque élevé" },
  };

const BAR_COLORS = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-rose-500",
];

const RECOMMENDATIONS: Record<string, string[]> = {
  Healthy: [
    "Continuez à maintenir un mode de vie sain",
    "Effectuez des bilans de santé réguliers",
    "Maintenez une activité physique régulière",
    "Conservez une alimentation équilibrée riche en fruits et légumes",
  ],
  "Single Condition": [
    "Consultez votre médecin pour un diagnostic précis",
    "Surveillez régulièrement vos indicateurs de santé (glycémie, tension, cholestérol)",
    "Adoptez un régime alimentaire adapté à votre condition",
    "Pratiquez une activité physique régulière adaptée",
    "Arrêtez le tabac si applicable",
  ],
  "Multiple Conditions": [
    "Un suivi médical régulier est fortement recommandé",
    "Consultez plusieurs spécialistes si nécessaire",
    "Suivez rigoureusement les traitements prescrits",
    "Adoptez un mode de vie sain global (alimentation, exercice, sommeil)",
    "Surveillez de près vos indicateurs de santé",
  ],
};

interface Props {
  result: PredictionResult;
}

export default function ResultsDashboard({ result }: Props) {
  const risk = RISK_CONFIG[result.risk_level] || RISK_CONFIG.Medium;

  const sortedProbs = Object.entries(result.probabilities).sort(
    ([, a], [, b]) => b - a
  );

  const maxProb = Math.max(...Object.values(result.probabilities));

  const recommendations = RECOMMENDATIONS[result.prediction] || RECOMMENDATIONS.Healthy;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Prediction header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <p className="text-sm text-slate-500 mb-2">Résultat de l&apos;analyse</p>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {DISEASE_LABELS[result.prediction] || result.prediction}
        </h2>
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${risk.bg} ${risk.color}`}
        >
          {risk.text}
        </span>
      </div>

      {/* Probability chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">
          Probabilités par catégorie
        </h3>
        <div className="space-y-4">
          {sortedProbs.map(([category, probability], index) => (
            <div key={category}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {DISEASE_LABELS[category] || category}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {(probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className={`${BAR_COLORS[index % BAR_COLORS.length]} h-3 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${(probability / maxProb) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Recommandations
        </h3>
        <ul className="space-y-3">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
              <span className="text-sm text-slate-600">{rec}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-400 italic">
          Ces recommandations sont fournies à titre indicatif uniquement. Veuillez
          consulter un professionnel de santé pour un avis médical personnalisé.
        </p>
      </div>

      {/* Action */}
      <div className="text-center">
        <Link
          href="/predict"
          className="inline-block px-8 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all shadow-sm"
        >
          Nouvelle prédiction
        </Link>
      </div>
    </div>
  );
}
