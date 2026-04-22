import Link from "next/link";

const features = [
  {
    title: "Analyse Avancée",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
        <path d="M16 5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2" />
        <circle cx="18" cy="18" r="3" />
        <path d="m20.5 20.5 1 1" />
      </svg>
    ),
    description:
      "Algorithmes de Machine Learning de pointe pour une précision diagnostique optimale.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Confidentialité",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    description:
      "Vos données sont anonymisées et traitées avec les standards de sécurité les plus stricts.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Support Médical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    description:
      "Des recommandations basées sur les protocoles médicaux internationaux actuels.",
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function Home() {
  return (
    <div className="medical-hero-bg min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Innovation en Santé Numérique
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Anticipez votre santé avec <br />
              <span className="text-primary italic">l'Intelligence Artificielle</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Une plateforme sécurisée d'analyse prédictive pour vous aider à comprendre, surveiller et prévenir les risques de maladies chroniques.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/predict"
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/25 hover:-translate-y-1"
              >
                Démarrer mon évaluation
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all duration-300"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes for trust */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 opacity-30">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-medical/20 rounded-full blur-[100px]"></div>
        </div>
      </section>


      {/* Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi choisir ChronoPredict ?</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-3xl border border-slate-100 bg-white card-hover"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed italic">
                  "{feature.description}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </div>
                <span className="font-bold text-white text-xl">ChronoPredict</span>
             </div>
             <p className="max-w-sm text-slate-400">
               Pionnier de la médecine préventive assistée par ordinateur. Notre mission est de démocratiser l'accès aux outils de diagnostic avancés.
             </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 underline decoration-primary decoration-2 underline-offset-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/predict" className="hover:text-primary transition-colors">Analyse</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 underline decoration-primary decoration-2 underline-offset-8">Légal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">CGU</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Avis Médical</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-sm">
          <p className="italic text-slate-500">
            &copy; 2026 ChronoPredict. Projet académique à des fins de démonstration. <br />
            Attention : Cet outil ne remplace en aucun cas une consultation médicale professionnelle.
          </p>
        </div>
      </footer>
    </div>
  );
}
