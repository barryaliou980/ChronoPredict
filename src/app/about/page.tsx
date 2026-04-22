import Link from "next/link";

export default function AboutPage() {
  // test CICD 
  const techStack = [
    {
      title: "Frontend",
      description: "Next.js 16, React 19, TypeScript, Tailwind CSS 4",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Backend",
      description: "Python, FastAPI, Scikit-learn, Pydantic",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Machine Learning",
      description: "Logistic Regression, Random Forest, Gradient Boosting — entraînés sur 132 symptômes",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M12 2a4 4 0 0 0-4 4c0 2 2 3 2 6H6a2 2 0 0 0-2 2v2h16v-2a2 2 0 0 0-2-2h-4c0-3 2-4 2-6a4 4 0 0 0-4-4z" />
          <path d="M8 18v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
        </svg>
      ),
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Infrastructure",
      description: "Docker, Docker Compose, déploiement Vercel + Render",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" />
        </svg>
      ),
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const stats = [
    { value: "42", label: "Maladies détectées" },
    { value: "132", label: "Symptômes analysés" },
    { value: "100%", label: "Accuracy du modèle" },
    { value: "4 920", label: "Échantillons d'entraînement" },
  ];

  return (
    <div className="medical-hero-bg min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            INF 716 — Hiver 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            À propos de{" "}
            <span className="text-primary italic">ChronoPredict</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Projet réalisé dans le cadre du cours{" "}
            <span className="font-semibold text-slate-700">INF 716 — Intelligence Artificielle</span>,
            Université de Sherbrooke, session Hiver 2026.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-12 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Résumé exécutif
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                ChronoPredict est une application web d{"'"}aide au diagnostic
                médical qui exploite des algorithmes de machine learning pour
                analyser les symptômes d{"'"}un patient et prédire la maladie la
                plus probable parmi 42 pathologies. Ce projet s{"'"}inscrit dans
                le cadre du cours <span className="font-semibold text-slate-800">INF 716 — Intelligence Artificielle</span> de
                l{"'"}Université de Sherbrooke (Hiver 2026).
              </p>
              <p className="text-slate-600 leading-relaxed">
                Le modèle est entraîné sur le dataset{" "}
                <span className="font-semibold text-slate-800">
                  Disease Prediction Using Machine Learning
                </span>{" "}
                (Kaggle), contenant 4 920 observations avec 132 symptômes
                binaires. Trois algorithmes sont comparés — Logistic Regression,
                Random Forest et Gradient Boosting — et le meilleur est
                automatiquement sélectionné pour la mise en production.
              </p>
              <p className="text-slate-600 leading-relaxed">
                L{"'"}objectif pédagogique est de démontrer l{"'"}intégration
                complète d{"'"}un pipeline de machine learning dans une
                application web moderne : de la collecte et du prétraitement des
                données jusqu{"'"}au déploiement d{"'"}un modèle prédictif
                accessible via une interface utilisateur intuitive.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="text-2xl font-black text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-12">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            Stack Technique
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {techStack.map((tech) => (
              <div key={tech.title} className="flex gap-4 group/item">
                <div
                  className={`w-14 h-14 ${tech.color} rounded-2xl flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform`}
                >
                  {tech.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">{tech.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-12">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            Dataset
          </h2>
          <div className="space-y-4 text-slate-600">
            <p>
              <span className="font-semibold text-slate-800">Source :</span>{" "}
              Kaggle — Disease Prediction Using Machine Learning (kaushil268)
            </p>
            <p>
              <span className="font-semibold text-slate-800">Contenu :</span>{" "}
              4 920 observations, 132 symptômes binaires, 42 maladies
            </p>
            <p>
              <span className="font-semibold text-slate-800">Licence :</span>{" "}
              Open Database License (ODbL)
            </p>
            <p>
              <span className="font-semibold text-slate-800">
                Maladies couvertes :
              </span>{" "}
              Diabète, Hypertension, Crise cardiaque, Paludisme, Tuberculose,
              Pneumonie, Dengue, Typhoïde, Hépatites (A-E), Migraine, Arthrite,
              Varicelle, Asthme, Infection urinaire, Psoriasis, et bien
              d{"'"}autres.
            </p>
          </div>
        </div>

        {/* Objectifs pédagogiques */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 md:p-12">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            Objectifs pédagogiques
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Intégration d'IA en application réelle",
                description: "Déployer un modèle de ML dans une application web fonctionnelle avec API REST.",
              },
              {
                title: "Comparaison d'algorithmes",
                description: "Évaluer et comparer Logistic Regression, Random Forest et Gradient Boosting sur un même dataset.",
              },
              {
                title: "Pipeline ML complet",
                description: "Prétraitement, entraînement, évaluation, sérialisation et inférence en production.",
              },
              {
                title: "Développement Full-Stack",
                description: "Architecture frontend/backend découplée avec Next.js, FastAPI et Docker.",
              },
            ].map((obj, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm shrink-0 font-black">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{obj.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{obj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-8 bg-rose-50 border border-rose-100 rounded-3xl">
          <h4 className="text-rose-700 font-bold text-sm mb-2 flex items-center gap-2">
            <span>⚠</span> Avertissement
          </h4>
          <p className="text-rose-600/80 text-sm leading-relaxed">
            Ce projet est réalisé dans le cadre du cours INF 716 de
            l{"'"}Université de Sherbrooke, à des fins éducatives et de
            démonstration uniquement. Il ne constitue en aucun cas un outil de
            diagnostic médical. Les prédictions ne remplacent pas l{"'"}avis
            d{"'"}un professionnel de santé.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4 text-center">
          <Link
            href="/predict"
            className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1"
          >
            Tester l{"'"}Analyse
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
