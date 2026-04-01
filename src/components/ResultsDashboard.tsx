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
  "Hepatitis A": "Hépatite A",
  "hepatitis A": "Hépatite A",
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
};

const RISK_CONFIG: Record<string, { color: string; bg: string; text: string; icon: string }> = {
  Low: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    text: "Confiance de l'Analyse : Faible",
    icon: "ⓘ",
  },
  Medium: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    text: "Confiance de l'Analyse : Modérée",
    icon: "⚠",
  },
  High: {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    text: "Confiance de l'Analyse : Élevée",
    icon: "✓",
  },
};

interface Props {
  result: PredictionResult;
}

export default function ResultsDashboard({ result }: Props) {
  const risk = RISK_CONFIG[result.risk_level] || RISK_CONFIG.Medium;

  const sortedProbs = Object.entries(result.probabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const mainPrediction = DISEASE_LABELS[result.prediction] || result.prediction;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Main Report Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="medical-gradient p-1" />
        <div className="p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase opacity-70">
                Rapport d'Analyse Prédictive
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Évaluation Diagnostique
              </h2>
              <p className="text-slate-500 text-xs italic">
                ID Analyse: {Math.random().toString(36).substring(7).toUpperCase()} • {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm ${risk.bg} ${risk.color}`}>
              <span className="text-lg">{risk.icon}</span>
              {risk.text}
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Primary Result */}
            <div className="md:col-span-3 space-y-10">
              <div>
                <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                  Diagnostic Probable
                </h3>
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-5xl font-black text-slate-900 mb-2 leading-none">
                    {mainPrediction}
                  </h4>
                  <p className="text-primary font-bold text-sm">
                    {(Object.entries(result.probabilities).find(([k]) => k === result.prediction)?.[1] || 0 * 100).toFixed(1)}% de probabilité
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                  Recommandations Immédiates
                </h3>
                <div className="space-y-4">
                  {[
                    "Consulter un médecin généraliste pour validation.",
                    "Surveiller l'évolution des symptômes sur 48h.",
                    "Maintenir une hydratation optimale.",
                    "Éviter l'automédication avant avis médical."
                  ].map((rec, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                        {i + 1}
                      </div>
                      <p className="text-slate-600 text-sm font-medium">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Probability Breakdown */}
            <div className="md:col-span-2 space-y-8 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100">
              <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                Analyse Comparative
              </h3>
              <div className="space-y-6">
                {(sortedProbs as [string, number][]).map(([disease, prob], index) => (
                  <div key={disease} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[150px]">
                        {DISEASE_LABELS[disease] || disease}
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
              
              <div className="pt-6 border-t border-slate-200">
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Les probabilités sont calculées par un réseau de neurones multicouches basé sur la corrélation symptomatique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Action */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="max-w-sm">
            Ce document est généré automatiquement. Données traitées conformément à la protection des données de santé (HDS).
          </p>
        </div>
        
        <div className="flex gap-4">
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

      <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl">
        <h4 className="text-rose-700 font-bold text-sm mb-2 flex items-center gap-2">
          <span>⚠</span> Avertissement Légal Important
        </h4>
        <p className="text-rose-600/80 text-xs leading-relaxed italic">
          Cette prédiction est fournie uniquement à titre informatif et éducatif. 
          Elle ne constitue pas un avis médical, un diagnostic ou un traitement. 
          L'utilisateur assume l'entière responsabilité de l'utilisation de ces informations. 
          En cas d'urgence, contactez immédiatement les services de secours (15 ou 112).
        </p>
      </div>
    </div>
  );
}
