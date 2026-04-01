"use client";

import { PredictionResult } from "@/types";
import Link from "next/link";

const DISEASE_LABELS: Record<string, string> = {
  "(vertigo) Paroymsal  Positional Vertigo": "Vertige positionnel",
  AIDS: "SIDA",
  Acne: "Acné",
  "Alcoholic hepatitis": "Hépatite alcoolique",
  Allergy: "Allergie",
  Arthritis: "Arthrite",
  "Bronchial Asthma": "Asthme bronchique",
  "Cervical spondylosis": "Spondylose cervicale",
  "Chicken pox": "Varicelle",
  "Chronic cholestasis": "Cholestase chronique",
  "Common Cold": "Rhume",
  Dengue: "Dengue",
  Diabetes: "Diabète",
  "Dimorphic hemmorhoids(piles)": "Hémorroïdes",
  "Drug Reaction": "Réaction médicamenteuse",
  "Fungal infection": "Infection fongique",
  GERD: "Reflux gastro-œsophagien",
  Gastroenteritis: "Gastro-entérite",
  "Heart attack": "Crise cardiaque",
  "Hepatitis B": "Hépatite B",
  "Hepatitis C": "Hépatite C",
  "Hepatitis D": "Hépatite D",
  "Hepatitis E": "Hépatite E",
  Hypertension: "Hypertension",
  Hyperthyroidism: "Hyperthyroïdie",
  Hypoglycemia: "Hypoglycémie",
  Hypothyroidism: "Hypothyroïdie",
  Impetigo: "Impétigo",
  Jaundice: "Jaunisse",
  Malaria: "Paludisme",
  Migraine: "Migraine",
  Osteoarthristis: "Arthrose",
  "Paralysis (brain hemorrhage)": "Paralysie (AVC)",
  "Peptic ulcer diseae": "Ulcère peptique",
  Pneumonia: "Pneumonie",
  Psoriasis: "Psoriasis",
  Tuberculosis: "Tuberculose",
  Typhoid: "Typhoïde",
  "Urinary tract infection": "Infection urinaire",
  "Varicose veins": "Varices",
  "hepatitis A": "Hépatite A",
};

const RISK_CONFIG: Record<string, { color: string; bg: string; text: string }> =
  {
    Low: {
      color: "text-green-700",
      bg: "bg-green-100",
      text: "Confiance faible",
    },
    Medium: {
      color: "text-amber-700",
      bg: "bg-amber-100",
      text: "Confiance modérée",
    },
    High: {
      color: "text-blue-700",
      bg: "bg-blue-100",
      text: "Confiance élevée",
    },
  };

const BAR_COLORS = [
  "bg-blue-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-rose-500",
];

interface Props {
  result: PredictionResult;
}

export default function ResultsDashboard({ result }: Props) {
  const risk = RISK_CONFIG[result.risk_level] || RISK_CONFIG.Medium;

  const sortedProbs = Object.entries(result.probabilities).sort(
    ([, a], [, b]) => b - a
  );

  const maxProb = Math.max(...Object.values(result.probabilities));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Prediction header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
        <p className="text-sm text-slate-500 mb-2">
          Maladie détectée
        </p>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {DISEASE_LABELS[result.prediction] || result.prediction}
        </h2>
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${risk.bg} ${risk.color}`}
        >
          {risk.text}
        </span>
      </div>

      {/* Top 5 probability chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">
          Top 5 des maladies les plus probables
        </h3>
        <div className="space-y-4">
          {sortedProbs.map(([disease, probability], index) => (
            <div key={disease}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">
                  {DISEASE_LABELS[disease] || disease}
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

      {/* Disclaimer */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Important
        </h3>
        <p className="text-sm text-slate-600">
          Cette analyse est basée sur un modèle de machine learning entraîné sur
          des données médicales. Elle ne remplace en aucun cas un diagnostic
          médical professionnel. Veuillez consulter un médecin pour toute
          préoccupation de santé.
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
