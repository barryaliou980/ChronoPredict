"use client";

import { useState } from "react";
import { PatientInput } from "@/types";

const STEPS = [
  {
    title: "Informations personnelles",
    fields: ["age", "sex", "bmi"],
  },
  {
    title: "Données médicales",
    fields: ["high_chol", "chol_check", "gen_hlth", "ment_hlth", "phys_hlth"],
  },
  {
    title: "Style de vie",
    fields: [
      "smoker",
      "phys_activity",
      "fruits",
      "veggies",
      "hvy_alcohol_consump",
      "diff_walk",
    ],
  },
];

const FIELD_LABELS: Record<string, string> = {
  age: "Catégorie d'âge",
  sex: "Sexe",
  bmi: "IMC (BMI)",
  high_chol: "Cholestérol élevé",
  chol_check: "Contrôle cholestérol (5 ans)",
  smoker: "Fumeur",
  phys_activity: "Activité physique",
  fruits: "Consomme des fruits",
  veggies: "Consomme des légumes",
  hvy_alcohol_consump: "Forte consommation d'alcool",
  gen_hlth: "Santé générale",
  ment_hlth: "Jours de mauvaise santé mentale",
  phys_hlth: "Jours de mauvaise santé physique",
  diff_walk: "Difficulté à marcher",
};

const BINARY_FIELDS = [
  "sex",
  "high_chol",
  "chol_check",
  "smoker",
  "phys_activity",
  "fruits",
  "veggies",
  "hvy_alcohol_consump",
  "diff_walk",
];

const BINARY_LABELS: Record<string, { 0: string; 1: string }> = {
  sex: { 0: "Femme", 1: "Homme" },
  high_chol: { 0: "Non", 1: "Oui" },
  chol_check: { 0: "Non", 1: "Oui" },
  smoker: { 0: "Non", 1: "Oui" },
  phys_activity: { 0: "Non", 1: "Oui" },
  fruits: { 0: "Non", 1: "Oui" },
  veggies: { 0: "Non", 1: "Oui" },
  hvy_alcohol_consump: { 0: "Non", 1: "Oui" },
  diff_walk: { 0: "Non", 1: "Oui" },
};

const AGE_OPTIONS = [
  { value: 1, label: "18-24 ans" },
  { value: 2, label: "25-29 ans" },
  { value: 3, label: "30-34 ans" },
  { value: 4, label: "35-39 ans" },
  { value: 5, label: "40-44 ans" },
  { value: 6, label: "45-49 ans" },
  { value: 7, label: "50-54 ans" },
  { value: 8, label: "55-59 ans" },
  { value: 9, label: "60-64 ans" },
  { value: 10, label: "65-69 ans" },
  { value: 11, label: "70-74 ans" },
  { value: 12, label: "75-79 ans" },
  { value: 13, label: "80+ ans" },
];

const GEN_HLTH_OPTIONS = [
  { value: 1, label: "Excellent" },
  { value: 2, label: "Très bon" },
  { value: 3, label: "Bon" },
  { value: 4, label: "Moyen" },
  { value: 5, label: "Mauvais" },
];

const INITIAL_DATA: PatientInput = {
  age: 7,
  sex: 1,
  bmi: 25,
  high_chol: 0,
  chol_check: 1,
  smoker: 0,
  phys_activity: 1,
  fruits: 1,
  veggies: 1,
  hvy_alcohol_consump: 0,
  gen_hlth: 3,
  ment_hlth: 5,
  phys_hlth: 5,
  diff_walk: 0,
};

interface Props {
  onSubmit: (data: PatientInput) => void;
  isLoading: boolean;
}

export default function PredictionForm({ onSubmit, isLoading }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<PatientInput>(INITIAL_DATA);

  const currentStep = STEPS[step];

  const updateField = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderField = (field: string) => {
    const label = FIELD_LABELS[field];

    // Age category select
    if (field === "age") {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
          <select
            value={formData.age}
            onChange={(e) => updateField(field, parseFloat(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {AGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // General health select
    if (field === "gen_hlth") {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
          <select
            value={formData.gen_hlth}
            onChange={(e) => updateField(field, parseFloat(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {GEN_HLTH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // Binary toggle buttons
    if (BINARY_FIELDS.includes(field)) {
      const labels = BINARY_LABELS[field];
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
          <div className="flex gap-4">
            {[0, 1].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => updateField(field, val)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData[field as keyof PatientInput] === val
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {labels[val as 0 | 1]}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Number inputs (bmi, ment_hlth, phys_hlth)
    return (
      <div key={field} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {field === "ment_hlth" || field === "phys_hlth" ? (
            <span className="text-xs text-slate-400 ml-1">(0-30 jours)</span>
          ) : null}
        </label>
        <input
          type="number"
          value={formData[field as keyof PatientInput]}
          onChange={(e) => updateField(field, parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          step={field === "bmi" ? 0.1 : 1}
          min={field === "bmi" ? 10 : 0}
          max={field === "bmi" ? 100 : 30}
        />
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`text-xs font-medium ${
                i <= step ? "text-blue-600" : "text-slate-400"
              }`}
            >
              Étape {i + 1}
            </div>
          ))}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {currentStep.title}
        </h2>

        <div className="space-y-5">
          {currentStep.fields.map(renderField)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Précédent
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyse en cours...
                </span>
              ) : (
                "Analyser"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
