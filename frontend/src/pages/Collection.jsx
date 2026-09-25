import { useEffect, useState } from "react";
import AnimalCard, { CARD_WIDTH } from "../components/AnimalCard";
import getCollection, { sellItem } from "../services/CollectionService.js";
import { getCurrentPlayer } from "../services/AuthService";
import { resolveAssetUrl } from "../services/apiClient";

const rarities = [
  {
    id: 1,
    color: "#B0B0B0",
    label: "Commun",
    sellPrice: 10,
  },
  {
    id: 2,
    color: "#3B82F6",
    label: "Rare",
    sellPrice: 50,
  },
  {
    id: 3,
    color: "#A855F7",
    label: "Épique",
    sellPrice: 200,
  },
  {
    id: 4,
    color: "#F59E0B",
    label: "Légendaire",
    sellPrice: 1000,
  },
];

// Fixed columns sized like the cards, so the block can be centered as a whole.
const LAYOUT_CSS = `
.collection-grid { grid-template-columns: repeat(4, ${CARD_WIDTH}); }
@media (max-width: 820px) {
  .collection-grid { grid-template-columns: repeat(2, 260px); }
}
@media (max-width: 640px) {
  .collection-grid { grid-template-columns: 260px; }
  .collection-page { padding: 28px 16px !important; }
  .collection-header { flex-direction: column; gap: 12px; }
  .collection-reset.is-hidden { display: none; }
  .collection-title { font-size: 24px !important; }
}
`;

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    height: "100%",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
  },
  content: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "0 auto",
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
    display: "grid",
    gap: "20px",
    justifyContent: "center",
  },
};

function getRaritySellPrice(rarityName) {
  const match = rarities.find((r) => r.label === rarityName);
  return match ? match.sellPrice : 0;
}

function getRarityColor(rarityName) {
  const match = rarities.find((r) => r.label === rarityName);
  return match ? match.color : "#9C9A93";
}

export default function Collection() {
  const [animals, setAnimals] = useState([]);
  const [activeRarity, setActiveRarity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const playerId = getCurrentPlayer()?.id ?? 1;

  async function handleSell(itemId) {
    const result = await sellItem(playerId, itemId);
    setAnimals((current) =>
      result.remainingQuantity > 0
        ? current.map((animal) =>
            animal.itemId === itemId
              ? { ...animal, quantity: result.remainingQuantity }
              : animal
          )
        : current.filter((animal) => animal.itemId !== itemId)
    );
    return result;
  }

  const filteredAnimals = activeRarity
    ? animals.filter((animal) => animal.rarityName === activeRarity)
    : animals;

  useEffect(() => {
    async function loadCollection() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCollection(playerId);
        const mapped = data.map((item) => {
          const color = item.rarityColorHex || getRarityColor(item.rarityName);
          return {
            itemId: item.itemId,
            name: item.itemName,
            image: resolveAssetUrl(item.itemImageUrl),
            description: item.itemDescription,
            wikipediaUrl: item.itemWikipediaUrl,
            quantity: item.quantity,
            sellPrice: item.sellPrice ?? getRaritySellPrice(item.rarityName),
            rarityName: item.rarityName,
            fallbackGradient: `linear-gradient(135deg, ${color}22, ${color})`,
            statusColor: color,
            statusLabel: item.rarityName,
          };
        });
        setAnimals(mapped);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCollection();
  }, [playerId]);

  if (isLoading) return <div style={styles.page}>Chargement…</div>;
  if (error) return <div style={styles.page}>Erreur de chargement de la collection.</div>;

  return (
    <div className="collection-page" style={styles.page}>
      <style>{LAYOUT_CSS}</style>
      <div style={styles.content}>
        <div className="collection-header" style={styles.headerRow}>
          <div>
            <h1 className="collection-title" style={styles.title}>Votre Ménagerie ({animals.length})</h1>
            <p style={styles.subtitle}>
              Consultez votre inventaire d'espèces collectées et triez par
              rareté.
            </p>
          </div>
          <button
            className={`collection-reset${activeRarity === null ? " is-hidden" : ""}`}
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

        <div className="collection-grid" style={styles.grid}>
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.itemId} animal={animal} onSell={handleSell} />
          ))}
        </div>
      </div>
    </div>
  );
}