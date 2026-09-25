import { useEffect, useState } from "react";
import { getCurrentPlayer, subscribePlayer } from "../services/AuthService";
import StatsService from "../services/StatsService";
import TotalTiragesCard from "../components/TotalTiragesCard";
import StatusDonutCard from "../components/StatusDonutCard";
import RarestSpeciesCard from "../components/RarestSpeciesCard";
import TopBoostersCard from "../components/TopBoostersCard";
import SalesCard from "../components/SalesCard";

const RESPONSIVE_CSS = `
@media (max-width: 1100px) {
  .stats-page { height: auto !important; min-height: 100%; }
  .stats-grid {
    grid-template-columns: 1fr 1fr !important;
    grid-template-rows: auto !important;
  }
  .stats-cell { grid-column: span 1 !important; min-height: 260px; }
  .stats-cell-wide { grid-column: 1 / -1 !important; }
}
@media (max-width: 640px) {
  .stats-page { padding: 28px 16px !important; }
  .stats-title { font-size: 24px !important; }
  .stats-subtitle { margin-bottom: 24px !important; }
  .stats-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
  .stats-cell { min-height: 0; }
}
`;

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    height: "100%",
    boxSizing: "border-box",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
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
    margin: "0 0 32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "1fr 1fr",
    gap: "24px",
    flex: 1,
    minHeight: 0,
  },
  cell: (span) => ({
    gridColumn: `span ${span}`,
    minWidth: 0,
    minHeight: 0,
  }),
  state: {
    color: "#9C9A93",
    fontSize: "14px",
  },
};

const RARITY_COLORS = {
  Commun: "#9C9A93",
  Rare: "#4F8FE8",
  Épique: "#A855F7",
  Légendaire: "#E8C77A",
};
const BOOSTER_COLORS = ["#D97A3D", "#4F8FE8", "#5FA05F", "#9B6BD9", "#E08A3C"];

function mapRarityColor(name, index) {
  return RARITY_COLORS[name] ?? BOOSTER_COLORS[index % BOOSTER_COLORS.length];
}

function mapBoosterColor(index) {
  return BOOSTER_COLORS[index % BOOSTER_COLORS.length];
}

export default function Stats() {
  // même pattern que Navbar.jsx
  const [player, setPlayer] = useState(getCurrentPlayer);
  // Result of the last request, tagged with the player it belongs to:
  // loading is derived from it instead of being set inside the effect.
  const [result, setResult] = useState({ playerId: null, stats: null, error: null });

  useEffect(() => subscribePlayer(() => setPlayer(getCurrentPlayer())), []);

  useEffect(() => {
    if (!player?.id) return;

    let cancelled = false;
    StatsService.getStats(player.id)
      .then((data) => {
        if (!cancelled) setResult({ playerId: player.id, stats: data, error: null });
      })
      .catch((err) => {
        if (!cancelled) setResult({ playerId: player.id, stats: null, error: err });
      });

    return () => {
      cancelled = true;
    };
  }, [player?.id]);

  const isCurrent = result.playerId === player?.id;
  const stats = isCurrent ? result.stats : null;
  const error = isCurrent ? result.error : null;
  const loading = Boolean(player?.id) && !isCurrent;

  const rarityData = stats
    ? Object.entries(stats.cardsByRarity).map(([label, value], i) => ({
        label,
        value,
        color: mapRarityColor(label, i),
      }))
    : [];

  const boosterData = stats
    ? Object.entries(stats.boxOpenedByType).map(([name, count], i) => ({
        name,
        count,
        color: mapBoosterColor(i),
      }))
    : [];

  return (
    <div className="stats-page" style={styles.page}>
      <style>{RESPONSIVE_CSS}</style>
      <h1 className="stats-title" style={styles.title}>Tableau de Bord &amp; Statistiques</h1>
      <p className="stats-subtitle" style={styles.subtitle}>
        Analysez vos performances de collection, vos tirages et visualisez la
        rareté de vos espèces.
      </p>

      {!player?.id && (
        <p style={styles.state}>
          Connectez-vous pour voir vos statistiques.
        </p>
      )}
      {loading && player?.id && (
        <p style={styles.state}>Chargement des statistiques...</p>
      )}
      {error && (
        <p style={styles.state}>
          Impossible de charger les statistiques. Réessayez plus tard.
        </p>
      )}

      {stats && (
        <div className="stats-grid" style={styles.grid}>
          <div className="stats-cell" style={styles.cell(2)}>
            <TotalTiragesCard total={stats.boxOpened} />
          </div>
          <div className="stats-cell" style={styles.cell(2)}>
            <SalesCard
              creditsEarned={stats.creditsEarned ?? 0}
              cardsSold={stats.cardsSold ?? 0}
            />
          </div>
          <div className="stats-cell stats-cell-wide" style={styles.cell(2)}>
            <RarestSpeciesCard cards={stats.rareCards ?? []} />
          </div>
          <div className="stats-cell" style={styles.cell(3)}>
            <StatusDonutCard
              title="RÉPARTITION PAR RARETÉ"
              emptyLabel="CARTES"
              data={rarityData}
            />
          </div>
          <div className="stats-cell" style={styles.cell(3)}>
            <TopBoostersCard boosters={boosterData} />
          </div>
        </div>
      )}
    </div>
  );
}