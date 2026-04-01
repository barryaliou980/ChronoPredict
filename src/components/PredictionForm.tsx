"use client";

import { useState, useMemo } from "react";
import { SymptomsInput } from "@/types";

const SYMPTOM_LABELS: Record<string, string> = {
  itching: "Démangeaisons",
  skin_rash: "Éruption cutanée",
  nodal_skin_eruptions: "Éruptions cutanées nodulaires",
  continuous_sneezing: "Éternuements continus",
  shivering: "Frissons",
  chills: "Frissons intenses",
  joint_pain: "Douleur articulaire",
  stomach_pain: "Douleur abdominale",
  acidity: "Acidité",
  ulcers_on_tongue: "Ulcères sur la langue",
  muscle_wasting: "Atrophie musculaire",
  vomiting: "Vomissements",
  burning_micturition: "Brûlure urinaire",
  "spotting_ urination": "Miction irrégulière",
  fatigue: "Fatigue",
  weight_gain: "Prise de poids",
  anxiety: "Anxiété",
  cold_hands_and_feets: "Mains et pieds froids",
  mood_swings: "Sautes d'humeur",
  weight_loss: "Perte de poids",
  restlessness: "Agitation",
  lethargy: "Léthargie",
  patches_in_throat: "Plaques dans la gorge",
  irregular_sugar_level: "Glycémie irrégulière",
  cough: "Toux",
  high_fever: "Forte fièvre",
  sunken_eyes: "Yeux enfoncés",
  breathlessness: "Essoufflement",
  sweating: "Transpiration",
  dehydration: "Déshydratation",
  indigestion: "Indigestion",
  headache: "Maux de tête",
  yellowish_skin: "Peau jaunâtre",
  dark_urine: "Urine foncée",
  nausea: "Nausées",
  loss_of_appetite: "Perte d'appétit",
  pain_behind_the_eyes: "Douleur derrière les yeux",
  back_pain: "Mal de dos",
  constipation: "Constipation",
  abdominal_pain: "Douleur abdominale",
  diarrhoea: "Diarrhée",
  mild_fever: "Fièvre légère",
  yellow_urine: "Urine jaune",
  yellowing_of_eyes: "Jaunissement des yeux",
  acute_liver_failure: "Insuffisance hépatique",
  fluid_overload: "Surcharge liquidienne",
  swelling_of_stomach: "Gonflement de l'estomac",
  swelled_lymph_nodes: "Ganglions lymphatiques enflés",
  malaise: "Malaise",
  blurred_and_distorted_vision: "Vision floue",
  phlegm: "Mucosités",
  throat_irritation: "Irritation de la gorge",
  redness_of_eyes: "Yeux rouges",
  sinus_pressure: "Pression sinusale",
  runny_nose: "Nez qui coule",
  congestion: "Congestion",
  chest_pain: "Douleur thoracique",
  weakness_in_limbs: "Faiblesse des membres",
  fast_heart_rate: "Rythme cardiaque rapide",
  pain_during_bowel_movements: "Douleur lors de la défécation",
  pain_in_anal_region: "Douleur anale",
  bloody_stool: "Selles sanglantes",
  irritation_in_anus: "Irritation anale",
  neck_pain: "Douleur au cou",
  dizziness: "Vertiges",
  cramps: "Crampes",
  bruising: "Ecchymoses",
  obesity: "Obésité",
  swollen_legs: "Jambes enflées",
  swollen_blood_vessels: "Vaisseaux sanguins enflés",
  puffy_face_and_eyes: "Visage et yeux bouffis",
  enlarged_thyroid: "Thyroïde élargie",
  brittle_nails: "Ongles cassants",
  swollen_extremeties: "Extrémités enflées",
  excessive_hunger: "Faim excessive",
  extra_marital_contacts: "Contacts extraconjugaux",
  drying_and_tingling_lips: "Lèvres sèches et picotements",
  slurred_speech: "Élocution difficile",
  knee_pain: "Douleur au genou",
  hip_joint_pain: "Douleur à la hanche",
  muscle_weakness: "Faiblesse musculaire",
  stiff_neck: "Raideur de la nuque",
  swelling_joints: "Gonflement articulaire",
  movement_stiffness: "Raideur des mouvements",
  spinning_movements: "Vertiges rotatoires",
  loss_of_balance: "Perte d'équilibre",
  unsteadiness: "Instabilité",
  weakness_of_one_body_side: "Faiblesse d'un côté du corps",
  loss_of_smell: "Perte d'odorat",
  bladder_discomfort: "Inconfort vésical",
  "foul_smell_of urine": "Odeur nauséabonde de l'urine",
  continuous_feel_of_urine: "Envie continue d'uriner",
  passage_of_gases: "Flatulences",
  internal_itching: "Démangeaisons internes",
  "toxic_look_(typhos)": "Aspect toxique",
  depression: "Dépression",
  irritability: "Irritabilité",
  muscle_pain: "Douleur musculaire",
  altered_sensorium: "Altération de la conscience",
  red_spots_over_body: "Taches rouges sur le corps",
  belly_pain: "Douleur au ventre",
  abnormal_menstruation: "Menstruation anormale",
  "dischromic _patches": "Taches décolorées",
  watering_from_eyes: "Larmoiement",
  increased_appetite: "Appétit augmenté",
  polyuria: "Polyurie",
  family_history: "Antécédents familiaux",
  mucoid_sputum: "Crachat muqueux",
  rusty_sputum: "Crachat rouillé",
  lack_of_concentration: "Manque de concentration",
  visual_disturbances: "Troubles visuels",
  receiving_blood_transfusion: "Transfusion sanguine",
  receiving_unsterile_injections: "Injections non stériles",
  coma: "Coma",
  stomach_bleeding: "Saignement gastrique",
  distention_of_abdomen: "Distension abdominale",
  history_of_alcohol_consumption: "Antécédents d'alcool",
  "fluid_overload.1": "Surcharge liquidienne",
  blood_in_sputum: "Sang dans les crachats",
  prominent_veins_on_calf: "Veines saillantes au mollet",
  palpitations: "Palpitations",
  painful_walking: "Marche douloureuse",
  pus_filled_pimples: "Boutons purulents",
  blackheads: "Points noirs",
  scurring: "Cicatrices",
  skin_peeling: "Desquamation",
  silver_like_dusting: "Pellicules argentées",
  small_dents_in_nails: "Petites bosses sur les ongles",
  inflammatory_nails: "Ongles inflammés",
  blister: "Ampoule",
  red_sore_around_nose: "Plaie rouge autour du nez",
  yellow_crust_ooze: "Suintement croûteux jaune",
};

interface Props {
  onSubmit: (data: SymptomsInput) => void;
  isLoading: boolean;
}

export default function PredictionForm({ onSubmit, isLoading }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const allSymptoms = useMemo(() => Object.keys(SYMPTOM_LABELS), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allSymptoms;
    const q = search.toLowerCase();
    return allSymptoms.filter(
      (s) =>
        SYMPTOM_LABELS[s].toLowerCase().includes(q) ||
        s.toLowerCase().includes(q)
    );
  }, [search, allSymptoms]);

  const toggle = (symptom: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(symptom)) next.delete(symptom);
      else next.add(symptom);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    onSubmit({ symptoms: Array.from(selected) });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Selected symptoms */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-800">
            Symptômes sélectionnés
          </h2>
          <span className="text-sm text-slate-500">
            {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
          </span>
        </div>
        {selected.size > 0 ? (
          <div className="flex flex-wrap gap-2">
            {Array.from(selected).map((s) => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
              >
                {SYMPTOM_LABELS[s] || s} ×
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            Sélectionnez vos symptômes ci-dessous
          </p>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un symptôme..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      {/* Symptoms grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {filtered.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggle(symptom)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selected.has(symptom)
                  ? "bg-blue-50 text-blue-700 border border-blue-300 font-medium"
                  : "bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100"
              }`}
            >
              {SYMPTOM_LABELS[symptom] || symptom}
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-8">
            Aucun symptôme trouvé
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading || selected.size === 0}
          className="px-8 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
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
            "Analyser les symptômes"
          )}
        </button>
      </div>
    </div>
  );
}
