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
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Search and Selection Status */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Quels sont vos symptômes ?
            </h2>
            <p className="text-slate-500 text-sm italic">
              Soyez le plus précis possible pour une meilleure analyse.
            </p>
          </div>
          <div className="px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-bold text-sm">
              {selected.size} {selected.size > 1 ? "symptômes sélectionnés" : "symptôme sélectionné"}
            </span>
          </div>
        </div>

        {/* Selected symptoms chips */}
        {selected.size > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            {Array.from(selected).map((s) => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                {SYMPTOM_LABELS[s] || s}
                <span className="text-slate-400 group-hover:text-primary transition-colors">×</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un symptôme (ex: fièvre, fatigue...)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {filtered.map((symptom) => {
            const isSelected = selected.has(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggle(symptom)}
                className={`group relative text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/25 border-primary"
                    : "bg-white text-slate-600 border border-slate-100 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <span className="relative z-10 font-semibold tracking-tight">
                  {SYMPTOM_LABELS[symptom] || symptom}
                </span>
                {isSelected && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium italic">
                Nous n'avons pas trouvé ce symptôme.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-8 text-center sticky bottom-8 z-10 w-full">
        <button
          onClick={handleSubmit}
          disabled={isLoading || selected.size === 0}
          className="group relative px-12 py-5 rounded-[2rem] text-lg font-extrabold text-white medical-gradient hover:scale-105 active:scale-95 disabled:grayscale-[0.5] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl shadow-primary/30"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Traitement...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              {selected.size === 0 ? "Sélectionnez vos symptômes" : "Générer mon Analyse Médicale"}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
