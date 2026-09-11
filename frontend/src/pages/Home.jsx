import BoosterCard from "../components/BoosterCard";

const BOOSTERS = [
  {
    id: "savane",
    name: "Booster Savane",
    price: 150,
    image: "/images/boosters/savane.png",
    fallbackGradient: "linear-gradient(135deg, #7A3B1E, #D97A3D, #F2B45A)",
  },
  {
    id: "ocean",
    name: "Booster Océan",
    price: 200,
    image: "/images/boosters/ocean.png",
    fallbackGradient: "linear-gradient(135deg, #0B2A4A, #14568C, #4FA8D8)",
  },
  {
    id: "foret",
    name: "Booster Forêt Tropicale",
    price: 250,
    image: "/images/boosters/foret.png",
    fallbackGradient: "linear-gradient(135deg, #0F2E1C, #1F5B37, #3E8B57)",
  },
];

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    maxHeight: "100%",
    padding: "64px 32px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    textAlign: "center",
    maxWidth: "640px",
    margin: "0 auto 48px",
  },
  eyebrow: {
    color: "#E8C77A",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    marginBottom: "16px",
  },
  title: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontWeight: 400,
    fontSize: "36px",
    color: "#F2F1EC",
    margin: "0 0 16px",
  },
  subtitle: {
    color: "#9C9A93",
    fontSize: "15px",
    lineHeight: 1.6,
    margin: 0,
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
  },
};

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>INVOCATIONS BESTIAIRES</p>
        <h1 style={styles.title}>Obtenez de nouvelles espèces</h1>
        <p style={styles.subtitle}>
          Dépensez vos Gemmes pour ouvrir des boosters thématiques et
          enrichir votre réserve d'animaux protégés.
        </p>
      </div>

      <div style={styles.grid}>
        {BOOSTERS.map((booster) => (
          <BoosterCard key={booster.id} booster={booster} />
        ))}
      </div>
    </div>
  );
}
