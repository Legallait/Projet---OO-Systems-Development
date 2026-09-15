import { useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import getCollection from "../services/collectionService.js";

const rarities = [
  {
    id: 1,
    color: "#B0B0B0",
    label: "Commun",
  },
  {
    id: 2,
    color: "#3B82F6",
    label: "Rare",
  },
  {
    id: 3,
    color: "#A855F7",
    label: "Épique",
  },
  {
    id: 4,
    color: "#F59E0B",
    label: "Légendaire",
  },
];

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    height: "100%",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  title: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontWeight: 400,
    fontSize: "28px",
    color: "#F2F1EC",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "#9C9A93",
    fontSize: "14px",
    margin: 0,
  },
  resetButton: (isVisible) => ({
    background: "transparent",
    border: "1px solid #C9A24B",
    color: "#E8C77A",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
    whiteSpace: "nowrap",
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? "auto" : "none",
  }),
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "32px",
  },
  filterPill: (isActive, color) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "9999px",
    border: isActive ? `1px solid ${color}` : "1px solid #24262E",
    backgroundColor: isActive ? "#1A1522" : "#14151B",
    color: isActive ? color : "#9C9A93",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
  }),
  filterDot: (color) => ({
    width: "8px",
    height: "8px",
    borderRadius: "9999px",
    backgroundColor: color,
    flexShrink: 0,
  }),
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};

function getRarityColor(rarityName) {
  const match = rarities.find((r) => r.label === rarityName);
  return match ? match.color : "#9C9A93";
}

export default function Collection() {
  const [animals, setAnimals] = useState([]);
  const [activeRarity, setActiveRarity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredAnimals = activeRarity
    ? animals.filter((animal) => animal.rarityName === activeRarity)
    : animals;

  useEffect(() => {
    async function loadCollection() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCollection(1);
        const mapped = data.map((animal) => ({
          ...animal,
          rarityColor: getRarityColor(animal.rarityName),
        }));
        setAnimals(mapped);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCollection();
  }, []);

  if (isLoading) return <div style={styles.page}>Chargement…</div>;
  if (error) return <div style={styles.page}>Erreur de chargement de la collection.</div>;

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Votre Ménagerie ({animals.length})</h1>
          <p style={styles.subtitle}>
            Consultez votre inventaire d'espèces collectées et triez par
            rareté.
          </p>
        </div>
        <button
          style={styles.resetButton(activeRarity !== null)}
          onClick={() => setActiveRarity(null)}
        >
          RÉINITIALISER LE FILTRE
        </button>
      </div>

      <div style={styles.filterRow}>
        {rarities.map((rarity) => (
          <button
            key={rarity.id}
            style={styles.filterPill(activeRarity === rarity.label, rarity.color)}
            onClick={() => setActiveRarity(rarity.label)}
          >
            <span style={styles.filterDot(rarity.color)} />
            {rarity.label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.itemId} animal={animal} />
        ))}
      </div>
    </div>
  );
}