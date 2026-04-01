import { useState, useEffect, useRef, useCallback } from "react";

const TW = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/";
const FC = {"🇫🇷":"1f1eb-1f1f7","🇺🇸":"1f1fa-1f1f8","🇯🇵":"1f1ef-1f1f5","🇹🇭":"1f1f9-1f1ed","🇧🇷":"1f1e7-1f1f7","🇲🇽":"1f1f2-1f1fd","🇦🇪":"1f1e6-1f1ea","🇲🇺":"1f1f2-1f1fa","🇬🇷":"1f1ec-1f1f7","🇮🇹":"1f1ee-1f1f9","🇪🇸":"1f1ea-1f1f8","🇬🇧":"1f1ec-1f1e7","🇵🇹":"1f1f5-1f1f9","🇲🇦":"1f1f2-1f1e6","🇸🇳":"1f1f8-1f1f3","🇨🇦":"1f1e8-1f1e6","🇩🇴":"1f1e9-1f1f4","🇮🇩":"1f1ee-1f1e9","🇰🇷":"1f1f0-1f1f7","🇦🇺":"1f1e6-1f1fa","🇿🇦":"1f1ff-1f1e6","🇵🇫":"1f1f5-1f1eb","🇸🇨":"1f1f8-1f1e8","🇲🇻":"1f1f2-1f1fb","🇨🇺":"1f1e8-1f1fa","🇲🇬":"1f1f2-1f1ec","🇷🇪":"1f1f7-1f1ea"};
const E = ({e,s=24}) => {const c=FC[e]; return c ? <img src={`${TW}${c}.png`} alt="" style={{width:s,height:s,verticalAlign:"middle",display:"inline-block"}}/> : <span style={{fontSize:s*0.8}}>{e}</span>;};

const fm = n => Math.round(n).toLocaleString("fr-FR");
const fme = n => fm(n) + " €";

const DESTS = [
  {n:"Bordeaux",f:"🇫🇷",mE:5000,pE:120,img:"https://images.unsplash.com/photo-1559593323-28eb93240f82?w=400&q=80"},
  {n:"Barcelone",f:"🇪🇸",mE:8000,pE:140,img:"https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80"},
  {n:"Rome",f:"🇮🇹",mE:10000,pE:160,img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80"},
  {n:"Lisbonne",f:"🇵🇹",mE:10000,pE:130,img:"https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&q=80"},
  {n:"Marrakech",f:"🇲🇦",mE:15000,pE:280,img:"https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400&q=80"},
  {n:"Athènes",f:"🇬🇷",mE:12500,pE:190,img:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80"},
  {n:"Dakar",f:"🇸🇳",mE:22000,pE:420,img:"https://images.unsplash.com/photo-1605893516102-710af736e1cc?w=400&q=80"},
  {n:"Dubaï",f:"🇦🇪",mE:28000,mB:55000,pE:580,pB:3200,img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"},
  {n:"New York",f:"🇺🇸",mE:25000,mB:60000,pE:620,pB:3800,promo:18750,img:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",dream:true},
  {n:"Montréal",f:"🇨🇦",mE:30000,pE:650,img:"https://images.unsplash.com/photo-1519178614-68673b201f36?w=400&q=80"},
  {n:"Miami",f:"🇺🇸",mE:32000,pE:750,img:"https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&q=80"},
  {n:"São Paulo",f:"🇧🇷",mE:35000,mB:87500,pE:600,pB:4200,img:"https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=400&q=80"},
  {n:"Bangkok",f:"🇹🇭",mE:40000,mB:80000,pE:520,pB:3500,img:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80"},
  {n:"Tokyo",f:"🇯🇵",mE:45000,mB:80000,pE:1100,pB:5500,img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",dream:true},
  {n:"Los Angeles",f:"🇺🇸",mE:50000,mB:90000,pE:980,pB:5000,img:"https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&q=80",dream:true},
  {n:"Île Maurice",f:"🇲🇺",mE:30000,mB:82500,pE:700,pB:3800,img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"},
  {n:"Bali",f:"🇮🇩",mE:48000,mB:85000,pE:1050,pB:5200,img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",dream:true},
  {n:"Le Cap",f:"🇿🇦",mE:35000,mB:87500,pE:580,pB:4000,img:"https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80"},
];

const CARDS = [
  {id:"gaf",name:"Gold Air France",sub:"Flying Blue",cost:"0 €",costLabel:"1ère année",cost2:"195 €/an ensuite",bonus:"25 000 miles",bonusUp:"+40 000 si upgrade Plat",color:"#0055A4",gradient:"linear-gradient(135deg,#001a4d,#003399,#0055A4)",
    benefits:["0,5 à 1 mile/€ dépensé","Bagage soute gratuit (court/moyen courrier)","Assurance annulation jusqu'à 7 000 €","Paiement 3× sans frais billets AF/KLM","XP Flying Blue (statut Silver/Gold accéléré)","Accès prioritaire Accor Arena, PSG, F1 2026","Miles Uber ×2 (dès 4 courses/mois)","Double cumul Accor + Flying Blue","Assurance train SNCF (nouveau 2026)"]},
  {id:"gam",name:"Gold Amex",sub:"Membership Rewards",cost:"0 €",costLabel:"1ère année",cost2:"195 €/an ensuite",bonus:"Points MR",bonusUp:"+80 000 pts si upgrade Plat",color:"#B8860B",gradient:"linear-gradient(135deg,#1a1500,#3d2e00,#6b5000)",
    benefits:["1 pt MR par € dépensé","Convertible vers 15+ programmes aériens","Ratio 5:4 vers Flying Blue (5 000 pts = 4 000 miles)","Ratio 5:4 vers Qatar Avios","Ratio 1:1 vers British Airways","Cashback possible (0,012 €/pt)","Bonus transfert +25% ponctuels","Assurance voyage complète","Accès offres Amex (concerts, événements)"]},
  {id:"paf",name:"Platinum Air France",sub:"Flying Blue Premium",cost:"535 €",costLabel:"/an",bonus:"+40 000 miles",color:"#4169E1",gradient:"linear-gradient(135deg,#0a0e30,#1a2970,#2940a0)",
    benefits:["Tout le Gold AF +","Priority Pass illimité (1 300+ lounges)","Package Flying Blue Extra Essentiel offert","Loge Accor Arena + Stade de France","Accès PSG & événements F1 2026","Assurance annulation jusqu'à 10 000 €","+40 XP Flying Blue / an","Platinum for 2 (statut partagé avec 1 proche)","Conciergerie voyage 24h/24","Rentable dès 4+ vols/an"]},
  {id:"pam",name:"Platinum Amex",sub:"Le combo ultime",cost:"840 €",costLabel:"/an (0€ an 1 via parrainage)",bonus:"+80 000 pts MR",color:"#8B7355",gradient:"linear-gradient(135deg,#1a1510,#332a1a,#4d3d28)",
    benefits:["Tout le Gold Amex +","Priority Pass illimité (1 700+ lounges)","Crédit dining 200 €/an (restaurants partenaires)","Transfert vers 15+ programmes aériens","80 000 pts MR bonus = ~64 000 miles FB","Accès Centurion Lounges (aéroports US)","Assurance premium voyage + véhicule","Conciergerie Platinum 24h/24","Global Dining Collection (restos étoilés)","Fine Hotels & Resorts (surclassement + crédits)","Statut Gold Hilton & Marriott offert"]},
];

const HACKS = [
  {icon:"🔥",title:"Double dipping Accor + Amex",desc:"Lie Flying Blue à Accor Live Limitless. Chaque nuit d'hôtel = points Accor + miles FB + miles carte Amex. Triple cumul dans 5 500+ hôtels.",tag:"Premium",tagColor:"#FFD700"},
  {icon:"🚗",title:"Uber × Flying Blue : seuil 4 courses",desc:"Lie Uber à Flying Blue. Dès 4 courses/mois : taux double (2 miles/€) + miles carte Amex en plus.",tag:"Quotidien",tagColor:"#4AABFF"},
  {icon:"📅",title:"Promo Rewards — chaque 1er du mois",desc:"Flying Blue publie des vols -25% à -50% en miles. Paris → NY dès 18 750 miles. Tes miles valent 30 à 50% de plus.",tag:"Mensuel",tagColor:"#22C55E"},
  {icon:"✈️",title:"Stopover gratuit Paris ou Amsterdam",desc:"Sur les vols en miles AF/KLM, ajoute un arrêt gratuit. Paris → Tokyo avec 2 semaines à Amsterdam — même prix.",tag:"Premium",tagColor:"#FFD700"},
  {icon:"⚡",title:"Bonus transfert MR → FB (+25%)",desc:"Amex propose ponctuellement 1 000 pts = 1 250 miles au lieu de 800. C'est +56% de valeur. Quelques jours seulement.",tag:"Éphémère",tagColor:"#A78BFA"},
  {icon:"🛒",title:"Portail Shopping Flying Blue",desc:"Passe par le portail FB pour tes achats en ligne (Apple, Nike, Fnac…). Miles portail + miles carte = double cumul.",tag:"Facile",tagColor:"#22C55E"},
  {icon:"🏨",title:"Booking × Flying Blue",desc:"Réserve via Booking en membre FB : 2 miles/€ + jusqu'à 15% de réduction. Combine avec paiement Amex pour triple cumul.",tag:"Facile",tagColor:"#22C55E"},
  {icon:"💎",title:"Qatar Avios via points MR",desc:"Les pts MR se transfèrent vers Qatar Avios (5:4). Utilisables sur Qatar + British Airways + Japan Airlines (oneworld).",tag:"Avancé",tagColor:"#A78BFA"},
];

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Section = ({ children, style }) => {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)", ...style }}>{children}</div>;
};

export default function Amexo() {
  const [cards, setCards] = useState({ gaf: true, gam: true, paf: false, pam: false });
  const [horizon, setHorizon] = useState(1);
  const [expenses, setExpenses] = useState({ courses: 400, restos: 200, transport: 150, shopping: 200, abos: 100, hotels: 0, uber: 0, af: 0 });
  const [flights, setFlights] = useState({ court: 2, moyen: 2, long: 0 });
  const [parr, setParr] = useState({ gaf: 2, gam: 1, include: false });
  const [showResults, setShowResults] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState("sim");

  const totalMois = Object.values(expenses).reduce((a, b) => a + b, 0);
  const baseM = expenses.courses + expenses.restos + expenses.transport + expenses.shopping + expenses.abos;
  const milesMois = (baseM * 0.5) + (expenses.hotels * 1.0) + (expenses.uber * 2.0) + (expenses.af * 1.0);
  const milesVols = (flights.court * 500 + flights.moyen * 2000 + flights.long * 5000) * horizon;
  const milesCumul = (milesMois * 12 * horizon) + milesVols;
  const bonusGAF = cards.gaf ? 25000 : 0;
  const bonusPAF = cards.paf ? 40000 : 0;
  const milesAF = milesCumul + bonusGAF + bonusPAF;
  const ptsMR = totalMois * 12 * horizon;
  const gamPts = cards.gam ? ptsMR : 0;
  const pamPts = cards.pam ? ptsMR + 80000 : 0;
  const mrToFB = Math.round((gamPts + pamPts) * 0.8);
  const parrMiles = parr.include ? (parr.gaf * 25000 + Math.round(parr.gam * 12000 * 0.8)) : 0;
  const totalFB = milesAF + mrToFB + parrMiles;
  const valFB = totalFB * 0.015;
  const valBiz = totalFB * 0.045;
  const totalVols = flights.court + flights.moyen + flights.long;

  const cotGAF = cards.gaf ? (horizon >= 2 ? 195 * (horizon - 1) : 0) : 0;
  const cotGAM = cards.gam ? (horizon >= 2 ? 195 * (horizon - 1) : 0) : 0;
  const cotPAF = cards.paf ? 535 * horizon : 0;
  const cotPAM = cards.pam ? (horizon >= 2 ? 840 * (horizon - 1) : 0) : 0;
  const totalCot = cotGAF + cotGAM + cotPAF + cotPAM;
  const bagVal = totalVols * 45 * horizon;
  const loungeVal = (cards.paf || cards.pam) ? totalVols * 30 * horizon : 0;
  const assurVal = (cards.paf || cards.pam ? 500 : cards.gaf ? 250 : 0) * horizon;
  const diningVal = cards.pam ? 200 * horizon : 0;
  const totalAvantages = bagVal + loungeVal + assurVal + diningVal;
  const roiNet = valFB + totalAvantages - totalCot;

  const handleCalc = () => { setShowResults(true); setTimeout(() => document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" }), 100); };

  const inp = (label, icon, key, note) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>{icon} {label}</label>
      <input type="number" value={expenses[key]} onChange={e => setExpenses(p => ({ ...p, [key]: Number(e.target.value) || 0 }))}
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 14px", fontSize: 16, fontFamily: "'SF Mono',monospace", color: "#fff", outline: "none", width: "100%", WebkitAppearance: "none" }} />
      {note && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{note}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily: "-apple-system,'SF Pro Display','Helvetica Neue',sans-serif", background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(30,144,255,0.3)}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#000}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .card-hover{transition:all 0.4s cubic-bezier(0.23,1,0.32,1)}
        .card-hover:hover{transform:translateY(-4px)}
        .glow-blue{box-shadow:0 0 60px rgba(30,144,255,0.15),0 0 120px rgba(30,144,255,0.05)}
        .btn-primary{background:linear-gradient(135deg,#1E90FF,#4AABFF);color:#fff;border:none;border-radius:14px;padding:16px 32px;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.3s;font-family:inherit;letter-spacing:-0.3px}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(30,144,255,0.3)}
        .btn-secondary{background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:14px 28px;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.3s;font-family:inherit}
        .btn-secondary:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.2)}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.08);border-radius:20px}
        .tag{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:0.3px}
        @media(max-width:640px){
          .grid-2{grid-template-columns:1fr !important}
          .grid-3{grid-template-columns:1fr !important}
          .grid-4{grid-template-columns:1fr 1fr !important}
          .hero-title{font-size:42px !important}
          .hero-sub{font-size:17px !important}
          .section-pad{padding:60px 16px !important}
          .dest-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      {/* ═══════ HERO ═══════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 24px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(800px,150vw)", height: "min(800px,150vw)", background: "radial-gradient(circle, rgba(30,144,255,0.12) 0%, rgba(30,144,255,0.03) 40%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUp 1s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 24, padding: "6px 16px", marginBottom: 32, fontSize: 13, fontWeight: 600, color: "#22C55E" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "glow 2s infinite" }} />
              Offre parrainage — jusqu'au 8 juin 2026
            </div>
          </div>

          <h1 className="hero-title" style={{ fontSize: "clamp(48px,8vw,80px)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1, marginBottom: 20, animation: "fadeUp 1s 0.1s ease both" }}>
            AMEX<span style={{ color: "#1E90FF" }}>O</span>
          </h1>

          <p className="hero-sub" style={{ fontSize: "clamp(18px,3vw,24px)", fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px", animation: "fadeUp 1s 0.2s ease both", letterSpacing: "-0.3px" }}>
            Tes dépenses du quotidien deviennent des <strong style={{ color: "#fff" }}>voyages en Business</strong>. Simule, compare et passe à l'action.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s 0.3s ease both" }}>
            <a href="#simulator" className="btn-primary" style={{ textDecoration: "none" }}>Simuler mes miles ✈️</a>
            <a href="#cards" className="btn-secondary" style={{ textDecoration: "none" }}>Découvrir les cartes</a>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, marginTop: 60, background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", animation: "fadeUp 1s 0.4s ease both" }} className="grid-4">
            {[
              { v: "25k", l: "Miles offerts", c: "#1E90FF" },
              { v: "0 €", l: "Coût an 1", c: "#22C55E" },
              { v: "5:4", l: "Ratio MR→FB", c: "#FFD700" },
              { v: "1 300+", l: "Lounges", c: "#A78BFA" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 12px", textAlign: "center", background: "#0a0a0a" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: s.c, letterSpacing: "-1px" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CARDS SHOWCASE ═══════ */}
      <section id="cards" className="section-pad" style={{ padding: "80px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1E90FF", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Les cartes</p>
              <h2 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1 }}>
                Choisis ta combinaison<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>parfaite.</span>
              </h2>
            </div>
          </Section>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }} className="grid-2">
            {CARDS.map((card, i) => (
              <Section key={card.id}>
                <div className="card-hover" onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                  style={{ background: card.gradient, borderRadius: 24, padding: "28px 24px", cursor: "pointer", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", minHeight: expandedCard === card.id ? "auto" : 200 }}>
                  <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)", borderRadius: "50%" }} />

                  {(card.id === "gaf" || card.id === "gam") && (
                    <div className="tag" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", position: "absolute", top: 16, right: 16 }}>0€ AN 1</div>
                  )}
                  {(card.id === "paf" || card.id === "pam") && (
                    <div className="tag" style={{ background: "rgba(30,144,255,0.15)", color: "#4AABFF", position: "absolute", top: 16, right: 16 }}>UPGRADE</div>
                  )}

                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 2, paddingRight: 70 }}>{card.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{card.sub}</div>

                  <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>BONUS</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700, color: "#FFD700" }}>{card.bonus}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>COÛT</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700, color: "#22C55E" }}>{card.cost} <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{card.costLabel}</span></div>
                    </div>
                  </div>

                  {card.bonusUp && <div style={{ fontSize: 12, color: "#FFD700", fontWeight: 600, marginBottom: 12 }}>🎯 {card.bonusUp}</div>}

                  {expandedCard === card.id && (
                    <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Tous les avantages</div>
                      {card.benefits.map((b, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                          <span style={{ color: "#22C55E", fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {b}
                        </div>
                      ))}
                      {card.cost2 && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>{card.cost2}</div>}
                    </div>
                  )}

                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>{expandedCard === card.id ? "Réduire ↑" : "Voir tous les avantages →"}</div>
                </div>
              </Section>
            ))}
          </div>

          {/* CTA Parrainage after cards */}
          <Section>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }} className="grid-2">
              <a href="#parrainage-af" className="card-hover" style={{ display: "block", background: "linear-gradient(135deg,#001a4d,#003399)", borderRadius: 16, padding: "20px 24px", textDecoration: "none", color: "#fff", border: "1px solid rgba(30,144,255,0.3)", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><E e="🇫🇷" s={28} /></div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Gold Air France</div>
                <div style={{ fontSize: 13, color: "#4AABFF" }}>25 000 miles + 40 000 si upgrade Plat</div>
                <div style={{ fontSize: 12, color: "#22C55E", fontWeight: 600, marginTop: 8 }}>0 € la 1ère année →</div>
              </a>
              <a href="#parrainage-amex" className="card-hover" style={{ display: "block", background: "linear-gradient(135deg,#1a1510,#332a1a)", borderRadius: 16, padding: "20px 24px", textDecoration: "none", color: "#fff", border: "1px solid rgba(212,175,55,0.2)", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><E e="💳" s={28} /></div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Gold Amex</div>
                <div style={{ fontSize: 13, color: "#FFD700" }}>0€ an 1 + 80 000 pts MR si upgrade Plat</div>
                <div style={{ fontSize: 12, color: "#22C55E", fontWeight: 600, marginTop: 8 }}>Profiter du parrainage →</div>
              </a>
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════ VALUE EDUCATION ═══════ */}
      <section className="section-pad" style={{ padding: "80px 24px", background: "linear-gradient(180deg,rgba(30,144,255,0.03),transparent)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#FFD700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Comprendre</p>
              <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
                La vraie valeur de tes miles.
              </h2>
            </div>
          </Section>

          <Section>
            <div className="glass" style={{ overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: "rgba(255,215,0,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>Valeur par mile selon l'utilisation</div>
              </div>
              {[
                { use: "Business long courrier (Paris→NY)", ex: "60k miles = billet à ~3 800 €", val: "0,063", tag: "EXCELLENT", tc: "#22C55E" },
                { use: "Long courrier Éco (Paris→NY)", ex: "25k miles = billet à ~620 €", val: "0,024", tag: "OPTIMAL", tc: "#22C55E" },
                { use: "Promo Rewards -25% (Paris→NY)", ex: "18 750 miles au lieu de 25k", val: "0,033", tag: "OPTIMAL", tc: "#22C55E" },
                { use: "Moyen courrier (Paris→Marrakech)", ex: "15k miles = billet à ~280 €", val: "0,018", tag: "CORRECT", tc: "#F59E0B" },
                { use: "Court courrier (Paris→Barcelone)", ex: "8k miles = billet à ~140 €", val: "0,017", tag: "MOYEN", tc: "#F59E0B" },
                { use: "Pay with Miles (remboursement)", ex: "1 000 miles = 4 €", val: "0,004", tag: "FAIBLE", tc: "#EF4444" },
                { use: "Échange shopping/cadeaux", ex: "Valeur très faible", val: "~0,002", tag: "ÉVITER", tc: "#EF4444" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{r.use}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{r.ex}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: r.tc }}>{r.val}€</span>
                    <span className="tag" style={{ background: `${r.tc}15`, color: r.tc, fontSize: 9 }}>{r.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <div style={{ marginTop: 16, padding: "16px 20px", background: "rgba(30,144,255,0.06)", border: "1px solid rgba(30,144,255,0.12)", borderRadius: 16, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              💡 <strong style={{ color: "#fff" }}>La règle d'or :</strong> Réserve tes miles pour les vols long courrier ou Business. La valeur est <strong style={{ color: "#22C55E" }}>5× à 10× supérieure</strong> au Pay with Miles ou shopping.
            </div>
          </Section>
        </div>
      </section>

      {/* ═══════ SIMULATOR ═══════ */}
      <section id="simulator" className="section-pad" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1E90FF", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Simulateur</p>
              <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
                Calcule tes miles.<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>En 30 secondes.</span>
              </h2>
            </div>
          </Section>

          {/* Step 1: Expenses */}
          <Section>
            <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1E90FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>1</div>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Tes dépenses mensuelles</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="grid-2">
                {inp("Courses & supermarché", "🛒", "courses", "0,5 mile/€")}
                {inp("Restos & sorties", "🍽️", "restos", "0,5 mile/€")}
                {inp("Carburant & transport", "⛽", "transport", "0,5 mile/€")}
                {inp("Shopping & divers", "🛍️", "shopping", "0,5 mile/€")}
                {inp("Abonnements", "📱", "abos", "0,5 mile/€")}
                {inp("Hôtels Accor", "🏨", "hotels", "1 mile/€ double cumul")}
                {inp("Uber (×2 dès 4 courses/mois)", "🚗", "uber", "Jusqu'à 2 miles/€")}
                {inp("Achats directs AF/KLM", "✈️", "af", "1 mile/€")}
              </div>
            </div>
          </Section>

          {/* Step 2: Flights */}
          <Section>
            <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1E90FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>2</div>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Tes vols par an</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }} className="grid-3">
                {[{ k: "court", l: "Courts (Europe)", n: "~500 mi/vol" }, { k: "moyen", l: "Moyens (Afrique, MO)", n: "~2 000 mi/vol" }, { k: "long", l: "Longs (US, Asie)", n: "~5 000 mi/vol" }].map(f => (
                  <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>✈️ {f.l}</label>
                    <input type="number" value={flights[f.k]} min="0" max="50"
                      onChange={e => setFlights(p => ({ ...p, [f.k]: Number(e.target.value) || 0 }))}
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 14px", fontSize: 16, fontFamily: "'JetBrains Mono',monospace", color: "#fff", outline: "none", width: "100%", WebkitAppearance: "none" }} />
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{f.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Step 3: Cards */}
          <Section>
            <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1E90FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>3</div>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Carte(s) visée(s)</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="grid-2">
                {CARDS.map(c => (
                  <div key={c.id} onClick={() => setCards(p => ({ ...p, [c.id]: !p[c.id] }))}
                    style={{ padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${cards[c.id] ? "#1E90FF" : "rgba(255,255,255,0.08)"}`, background: cards[c.id] ? "rgba(30,144,255,0.08)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, paddingRight: 40 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: cards[c.id] ? "#4AABFF" : "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.bonus}</div>
                    {cards[c.id] && <div style={{ position: "absolute", top: 12, right: 12, width: 20, height: 20, borderRadius: "50%", background: "#1E90FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>✓</div>}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Step 4: Horizon + Parrainage */}
          <Section>
            <div className="glass" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1E90FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>4</div>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Horizon & Parrainage</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[1, 2, 3].map(h => (
                  <button key={h} onClick={() => setHorizon(h)}
                    style={{ flex: 1, padding: "10px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: horizon === h ? "#1E90FF" : "rgba(255,255,255,0.06)", border: `1px solid ${horizon === h ? "#1E90FF" : "rgba(255,255,255,0.08)"}`, color: "#fff", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                    {h} an{h > 1 ? "s" : ""}
                  </button>
                ))}
              </div>

              <div style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>🎁 Simulateur parrainage</span>
                  <span className="tag" style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}>Jusqu'au 8 juin</span>
                </div>
                {[{ k: "gaf", l: "Filleuls Gold AF", note: "25 000 mi / filleul" }, { k: "gam", l: "Filleuls Gold Amex", note: "12 000 pts / filleul" }].map(p => (
                  <div key={p.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{p.l}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{p.note}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button onClick={() => setParr(pr => ({ ...pr, [p.k]: Math.max(0, pr[p.k] - 1) }))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{parr[p.k]}</span>
                      <button onClick={() => setParr(pr => ({ ...pr, [p.k]: pr[p.k] + 1 }))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </div>
                ))}
                <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12, color: "#4AABFF", cursor: "pointer", fontWeight: 600 }}>
                  <input type="checkbox" checked={parr.include} onChange={e => setParr(p => ({ ...p, include: e.target.checked }))} style={{ accentColor: "#1E90FF", width: 16, height: 16 }} />
                  Inclure dans la simulation
                </label>
              </div>
            </div>
          </Section>

          <Section>
            <button className="btn-primary" onClick={handleCalc} style={{ width: "100%", fontSize: 17, padding: "18px", borderRadius: 16 }}>
              ✈️ Calculer ma simulation complète
            </button>
          </Section>
        </div>
      </section>

      {/* ═══════ RESULTS ═══════ */}
      {showResults && (
        <section id="results-section" className="section-pad" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Section>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#22C55E", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Résultats</p>
                <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px" }}>
                  Voilà ta puissance.<br /><span style={{ color: "#FFD700" }}>En miles.</span>
                </h2>
              </div>
            </Section>

            {/* Key metrics */}
            <Section>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }} className="grid-3">
                {[
                  { l: "MILES TOTAL", v: fm(totalFB), c: "#FFD700", sub: `sur ${horizon} an${horizon > 1 ? "s" : ""}` },
                  { l: "VALEUR ÉCO", v: fme(valFB), c: "#22C55E", sub: "à 0,015€/mile" },
                  { l: "VALEUR BUSINESS", v: fme(valBiz), c: "#1E90FF", sub: "à 0,045€/mile" },
                ].map((m, i) => (
                  <div key={i} className="glass" style={{ padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1, marginBottom: 6 }}>{m.l}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: m.c, letterSpacing: "-1px" }}>{m.v}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{m.sub}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Financial Balance */}
            <Section>
              <div className="glass" style={{ padding: 24, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>📊 Bilan financier</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="grid-2">
                  <div style={{ padding: 16, background: "rgba(239,68,68,0.06)", borderRadius: 14, border: "1px solid rgba(239,68,68,0.12)" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Cotisations totales</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#EF4444" }}>-{fme(totalCot)}</div>
                  </div>
                  <div style={{ padding: 16, background: "rgba(34,197,94,0.06)", borderRadius: 14, border: "1px solid rgba(34,197,94,0.12)" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Avantages obtenus</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: "#22C55E" }}>+{fme(totalAvantages)}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                      {bagVal > 0 && <div>Bagages: {fme(bagVal)}</div>}
                      {loungeVal > 0 && <div>Lounges: {fme(loungeVal)}</div>}
                      {diningVal > 0 && <div>Dining: {fme(diningVal)}</div>}
                      <div>Assurances: {fme(assurVal)}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px", background: roiNet >= 0 ? "rgba(34,197,94,0.08)" : "rgba(245,158,11,0.08)", borderRadius: 12, border: `1px solid ${roiNet >= 0 ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>ROI net (miles + avantages − cotisations)</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 700, color: roiNet >= 0 ? "#22C55E" : "#F59E0B" }}>{roiNet >= 0 ? "+" : ""}{fme(roiNet)}</span>
                </div>
              </div>
            </Section>

            {/* Destinations with photos */}
            <Section>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🌍 Destinations accessibles</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{fm(totalFB)} miles disponibles</span>
                </div>
                <div className="dest-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                  {DESTS.map((d, i) => {
                    const can = totalFB >= d.mE;
                    const canBiz = d.mB && totalFB >= d.mB;
                    const canPromo = d.promo && totalFB >= d.promo;
                    const moLeft = can ? 0 : Math.ceil((d.mE - totalFB) / Math.max(1, milesMois));
                    return (
                      <div key={i} className="card-hover" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#0a0a0a", opacity: can || canPromo ? 1 : 0.5 }}>
                        <div style={{ position: "relative", height: 120, overflow: "hidden" }}>
                          <img src={d.img} alt={d.n} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                          <div style={{ position: "absolute", bottom: 8, left: 10, display: "flex", alignItems: "center", gap: 6 }}>
                            <E e={d.f} s={20} />
                            <span style={{ fontSize: 14, fontWeight: 700 }}>{d.n}</span>
                          </div>
                          <div style={{ position: "absolute", top: 8, right: 8 }}>
                            <span className="tag" style={{ background: can ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.1)", color: can ? "#22C55E" : "rgba(255,255,255,0.4)" }}>
                              {can ? "✓" : `~${moLeft} mois`}
                            </span>
                          </div>
                        </div>
                        <div style={{ padding: "10px 12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>Éco</span>
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: can ? "#FFD700" : "rgba(255,255,255,0.4)" }}>{fm(d.mE)} mi</span>
                          </div>
                          {d.promo && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                            <span style={{ color: "#FFD700" }}>🔥 Promo</span>
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: "#FFD700" }}>{fm(d.promo)} mi</span>
                          </div>}
                          {d.mB && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>Business</span>
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, color: canBiz ? "#1E90FF" : "rgba(255,255,255,0.3)" }}>{fm(d.mB)} mi</span>
                          </div>}
                          {d.pB && canBiz && <div style={{ fontSize: 10, color: "#22C55E", marginTop: 6, fontWeight: 600 }}>
                            Biz = {fme(d.pB)} économisés
                          </div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Section>

            {/* Hacks */}
            <Section>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>⚡ Hacks & astuces 2026</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {HACKS.map((h, i) => (
                    <div key={i} className="glass card-hover" style={{ padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{h.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{h.title}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{h.desc}</div>
                        <span className="tag" style={{ background: `${h.tagColor}15`, color: h.tagColor, marginTop: 8 }}>{h.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </section>
      )}

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="section-pad" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
                Passe à l'action.<br /><span style={{ color: "#1E90FF" }}>Maintenant.</span>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
                L'offre parrainage avec <strong style={{ color: "#FFD700" }}>25 000 miles</strong> de bienvenue et <strong style={{ color: "#22C55E" }}>0€ la 1ère année</strong> expire le 8 juin 2026.
              </p>
            </div>
          </Section>

          <Section>
            <div style={{ display: "grid", gap: 14 }}>
              <a href="#parrainage-af" className="card-hover" style={{ display: "block", background: "linear-gradient(135deg,#001a4d,#003399)", borderRadius: 20, padding: "24px", textDecoration: "none", color: "#fff", border: "1px solid rgba(30,144,255,0.25)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)", borderRadius: "50%" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <E e="🇫🇷" s={32} />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>Gold Air France</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Flying Blue</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span className="tag" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}>0 € AN 1</span>
                  <span className="tag" style={{ background: "rgba(255,215,0,0.12)", color: "#FFD700" }}>+25 000 MILES</span>
                  <span className="tag" style={{ background: "rgba(167,139,250,0.12)", color: "#A78BFA" }}>+40 000 SI UPGRADE PLAT</span>
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>
                  Jusqu'à <strong style={{ color: "#FFD700" }}>65 000 miles par filleul</strong> · <strong style={{ color: "#22C55E" }}>120 000 miles</strong> pour 2 filleuls = un vol Business New York gratuit <E e="🇺🇸" s={14} />
                </div>
                <div style={{ background: "#1E90FF", borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 15, fontWeight: 700 }}>
                  ✈️ Souscrire Gold Air France →
                </div>
              </a>

              <a href="#parrainage-amex" className="card-hover" style={{ display: "block", background: "linear-gradient(135deg,#1a1510,#332a1a)", borderRadius: 20, padding: "24px", textDecoration: "none", color: "#fff", border: "1px solid rgba(212,175,55,0.15)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, background: "radial-gradient(circle, rgba(212,175,55,0.06), transparent 70%)", borderRadius: "50%" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>💳</span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>Gold Amex</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Membership Rewards</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span className="tag" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}>0 € AN 1</span>
                  <span className="tag" style={{ background: "rgba(255,215,0,0.12)", color: "#FFD700" }}>+80 000 PTS MR SI UPGRADE PLAT</span>
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12 }}>
                  Parrainage : jusqu'à <strong style={{ color: "#FFD700" }}>180 000 pts MR</strong> = <strong style={{ color: "#22C55E" }}>144 000 miles</strong> — un A/R Business Tokyo <E e="🇯🇵" s={14} />
                </div>
                <div style={{ background: "linear-gradient(135deg,#B8860B,#DAA520)", borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 15, fontWeight: 700, color: "#000" }}>
                  💳 Souscrire Gold Amex →
                </div>
              </a>
            </div>
          </Section>

          <Section>
            <div style={{ textAlign: "center", marginTop: 24, padding: "14px 20px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#EF4444" }}>⏰ Offre valable jusqu'au 08/06/2026 seulement</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Après cette date : bonus réduits ou supprimés</div>
            </div>
          </Section>

          {/* Cumul */}
          <Section>
            <div className="glass" style={{ padding: 24, marginTop: 24, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1, marginBottom: 8 }}>EN CUMULANT LES 2 PARRAINAGES</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 36, fontWeight: 700, color: "#FFD700", marginBottom: 4 }}>264 000 miles</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginTop: 8 }}>
                Un <strong style={{ color: "#1E90FF" }}>A/R Business Tokyo</strong> + un <strong style={{ color: "#1E90FF" }}>A/R Business New York</strong> — <strong style={{ color: "#22C55E" }}>gratuitement</strong> via le parrainage
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>AMEX<span style={{ color: "#1E90FF" }}>O</span></div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
          Miles & Voyages · Valeurs indicatives basées sur les prix moyens observés<br />
          Offres de parrainage valables jusqu'au 08/06/2026
        </div>
      </footer>
    </div>
  );
}
