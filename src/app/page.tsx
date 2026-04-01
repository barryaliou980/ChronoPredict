import Link from "next/link";

const features = [
  {
    title: "Analyse IA",
    description:
      "Modèles de machine learning entraînés sur des données médicales réelles pour une prédiction fiable.",
  },
  {
    title: "3 Catégories",
    description:
      "Évaluation de l'état de santé : sain, condition chronique unique ou conditions multiples.",
  },
  {
    title: "Résultats Instantanés",
    description:
      "Obtenez votre analyse de risque en quelques secondes avec des recommandations personnalisées.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-6">
            Intelligence Artificielle & Santé
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Prédiction de Maladies{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Chroniques par IA
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Analysez vos indicateurs de santé grâce à l'intelligence
            artificielle et obtenez une évaluation de votre risque de
            développer des maladies chroniques.
          </p>
          <Link
            href="/predict"
            className="inline-block px-8 py-3.5 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg shadow-blue-500/25"
          >
            Commencer l'analyse
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-slate-400">
        <p>
          Projet académique - Les résultats ne constituent pas un avis médical.
        </p>
      </footer>
    </div>
  );
}
